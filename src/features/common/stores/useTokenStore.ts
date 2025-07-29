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
  reset: () => void

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
 * with automatic persistence and error handling.
 */
export const useTokenStore = create<TokenStore>()(
  subscribeWithSelector((set, get) => ({
    // Initial state
    ...initialState,

    // Initialize store from stored token
    initialize: async () => {
      const state = get()

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

          await get().refreshToken()
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

    // Refresh token from API
    refreshToken: async () => {
      const state = get()

      // Prevent concurrent refresh operations
      if (state.isRefreshing) {
        return
      }

      set({ isRefreshing: true, error: null })

      try {
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

    // Reset to initial state
    reset: () => {
      get().clearToken()
      set(initialState)
    },

    // Check if current token is valid and not expired
    isTokenValid: () => {
      const state = get()

      if (!state.token || !state.expiresAt) {
        return false
      }

      return Date.now() < state.expiresAt
    },

    // Get time until token expiration
    timeUntilExpiry: () => {
      const state = get()

      if (!state.expiresAt) {
        return null
      }

      const timeRemaining = state.expiresAt - Date.now()
      return Math.max(0, timeRemaining)
    },

    // Check if token should be refreshed
    shouldRefresh: (thresholdMs: number = 5 * 60 * 1000) => {
      const state = get()

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
  (state) => state,
  (state) => {
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
            currentState.refreshToken().catch((error) => {
              console.error('Auto token refresh failed:', error)
            })
          }
        }, timeUntilRefresh)
      }
    }
  }
)

/**
 * Hook to get token store state and actions
 * Provides a clean interface for components to interact with token management
 */
export const useToken = () => {
  const store = useTokenStore()

  return {
    // State
    tokenState: {
      token: store.token,
      expiresAt: store.expiresAt,
      isRefreshing: store.isRefreshing,
      isLoading: store.isLoading,
      error: store.error,
      lastRefreshAt: store.lastRefreshAt,
    },

    // Actions
    initialize: store.initialize,
    refreshToken: store.refreshToken,
    clearToken: store.clearToken,

    // Computed
    isTokenValid: store.isTokenValid(),
    timeUntilExpiry: store.timeUntilExpiry(),
  }
}
