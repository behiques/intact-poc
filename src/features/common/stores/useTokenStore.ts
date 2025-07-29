import { create } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'
import type { TokenState, AuthError } from '../types'
import {
  storeToken,
  getStoredToken,
  clearStoredToken,
  hasValidStoredToken,
} from '../utils/tokenStorage'
import { getTokenExpiration } from '../utils/tokenDecoder'
import { retrieveToken, isAuthError } from '../api/fetchToken'
import {
  enqueueTokenRequest,
  resolveQueuedRequests,
  rejectQueuedRequests,
  clearQueue,
  cleanupExpiredRequests,
} from '../utils/tokenQueue'

/**
 * Token Store Interface
 *
 * Defines the complete token management state and actions
 * following Zustand patterns from the existing codebase.
 */
interface TokenStore extends TokenState {
  // Actions
  initialize: () => Promise<void>
  refreshToken: () => Promise<void>
  clearToken: () => void
  setError: (error: AuthError | null) => void
  clearError: () => void
  reset: () => void

  // Queue management
  getValidToken: () => Promise<string>

  // Computed properties
  isTokenValid: () => boolean
  timeUntilExpiry: () => number | null
  shouldRefresh: (thresholdMs?: number) => boolean
}

/**
 * Initial token state
 */
const initialState: TokenState = {
  token: null,
  expiresAt: null,
  isRefreshing: false,
  isLoading: false,
  error: null,
  lastRefreshAt: null,
}

/**
 * Creates an AuthError for store operations
 */
const createStoreError = (
  type: AuthError['type'],
  message: string,
  originalError?: unknown
): AuthError => ({
  type,
  message: `Store: ${message}`,
  timestamp: Date.now(),
  originalError,
})

/**
 * Token management store using Zustand
 *
 * Provides centralized state management for authentication tokens
 * with automatic persistence, error handling, and queue management
 * for concurrent requests during token refresh.
 */
export const useTokenStore = create<TokenStore>()(
  subscribeWithSelector((set, get) => ({
    // Initial state
    ...initialState,

    // Initialize store from stored token
    initialize: async () => {
      const state = get() as TokenStore

      // Don't initialize if already loading or has token
      if (state.isLoading || state.token) {
        return
      }

      set({ isLoading: true, error: null })

      try {
        const storedData = getStoredToken()

        if (storedData && hasValidStoredToken()) {
          // Use stored token
          set({
            token: storedData.token,
            expiresAt: storedData.expiresAt,
            isLoading: false,
            lastRefreshAt: storedData.storedAt,
          })
        } else {
          // Clear any invalid stored token and fetch new one
          if (storedData) {
            clearStoredToken()
          }

          await (get() as TokenStore).refreshToken()
        }
      } catch (error) {
        const authError = isAuthError(error)
          ? error
          : createStoreError(
              'UNKNOWN_ERROR',
              'Failed to initialize token store',
              error
            )

        set({
          isLoading: false,
          error: authError,
        })
      }
    },

    // Refresh token from API with queue management
    refreshToken: async () => {
      const state = get() as TokenStore

      // Prevent concurrent refresh operations
      if (state.isRefreshing) {
        return
      }

      set({ isRefreshing: true, error: null })

      try {
        // Clean up any expired requests before starting
        cleanupExpiredRequests()

        const tokenResponse = await retrieveToken()

        // Parse expiration from response
        const expirationDate = new Date(tokenResponse.expiration)
        const expiresAt = expirationDate.getTime()

        // Validate expiration
        if (isNaN(expiresAt) || expiresAt <= Date.now()) {
          throw createStoreError(
            'INVALID_RESPONSE',
            'Invalid or expired token received from server'
          )
        }

        // Try to get expiration from token itself (if JWT)
        let tokenExpiresAt = expiresAt
        try {
          const jwtExpiration = getTokenExpiration(tokenResponse.token)
          if (jwtExpiration) {
            tokenExpiresAt = jwtExpiration
          }
        } catch {
          // If JWT parsing fails, use response expiration
        }

        // Store token
        storeToken(tokenResponse.token, tokenExpiresAt)

        // Update state
        set({
          token: tokenResponse.token,
          expiresAt: tokenExpiresAt,
          isRefreshing: false,
          isLoading: false,
          error: null,
          lastRefreshAt: Date.now(),
        })

        // Resolve all queued requests with the new token
        resolveQueuedRequests(tokenResponse.token)
      } catch (error) {
        const authError = isAuthError(error)
          ? error
          : createStoreError('UNKNOWN_ERROR', 'Failed to refresh token', error)

        set({
          isRefreshing: false,
          isLoading: false,
          error: authError,
        })

        // Clear stored token on error
        try {
          clearStoredToken()
        } catch {
          // Ignore storage cleanup errors
        }

        // Reject all queued requests
        rejectQueuedRequests(authError)

        throw authError
      }
    },

    // Clear token and reset state
    clearToken: () => {
      try {
        clearStoredToken()
      } catch {
        // Ignore storage cleanup errors
      }

      // Clear any pending queue
      clearQueue()

      set({
        token: null,
        expiresAt: null,
        isRefreshing: false,
        isLoading: false,
        error: null,
        lastRefreshAt: null,
      })
    },

    // Set error state
    setError: (error: AuthError | null) => {
      set({ error })
    },

    // Clear error state
    clearError: () => {
      set({ error: null })
    },

    // Reset to initial state
    reset: () => {
      ;(get() as TokenStore).clearToken()
      set(initialState)
    },

    // Get a valid token, refreshing if necessary
    getValidToken: async (): Promise<string> => {
      const state = get() as TokenStore

      // If we have a valid token, return it immediately
      if (state.token && (get() as TokenStore).isTokenValid()) {
        return state.token
      }

      // If refresh is already in progress, enqueue this request
      if (state.isRefreshing) {
        return enqueueTokenRequest()
      }

      // Otherwise, start a refresh
      await (get() as TokenStore).refreshToken()

      // After refresh, return the token if available
      const newState = get() as TokenStore
      if (newState.token && (get() as TokenStore).isTokenValid()) {
        return newState.token
      }

      // If we still don't have a valid token, throw an error
      throw createStoreError(
        'AUTH_FAILED',
        'Unable to obtain valid token after refresh'
      )
    },

    // Check if current token is valid and not expired
    isTokenValid: () => {
      const state = get() as TokenStore

      if (!state.token || !state.expiresAt) {
        return false
      }

      return Date.now() < state.expiresAt
    },

    // Get time until token expiration
    timeUntilExpiry: () => {
      const state = get() as TokenStore

      if (!state.expiresAt) {
        return null
      }

      const timeRemaining = state.expiresAt - Date.now()
      return Math.max(0, timeRemaining)
    },

    // Check if token should be refreshed
    shouldRefresh: (thresholdMs: number = 5 * 60 * 1000) => {
      const state = get() as TokenStore

      if (!state.token || !state.expiresAt) {
        return true
      }

      const timeUntilExpiry = state.expiresAt - Date.now()
      return timeUntilExpiry <= thresholdMs
    },
  }))
)

// Set up automatic token refresh based on expiration
let refreshTimeoutId: NodeJS.Timeout | null = null

// Subscribe to token state changes to set up auto-refresh
useTokenStore.subscribe(
  (state: TokenState) => state,
  (state: TokenState) => {
    // Clear existing timeout
    if (refreshTimeoutId) {
      clearTimeout(refreshTimeoutId)
      refreshTimeoutId = null
    }

    // Set up auto-refresh if we have a valid token
    if (state.token && state.expiresAt && !state.isRefreshing) {
      const timeUntilRefresh = state.expiresAt - Date.now() - 5 * 60 * 1000 // 5 minutes before expiration

      if (timeUntilRefresh > 0) {
        refreshTimeoutId = setTimeout(() => {
          const currentState = useTokenStore.getState()
          if (currentState.token && !currentState.isRefreshing) {
            currentState.refreshToken().catch((error: unknown) => {
              console.error('Auto token refresh failed:', error)
            })
          }
        }, timeUntilRefresh)
      }
    }
  }
)
