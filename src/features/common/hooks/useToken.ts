import { useEffect, useRef } from 'react'
import { useTokenStore } from '../stores/useTokenStore'
import { setupSessionCleanup } from '../utils/tokenStorage'
import type { UseTokenReturn } from '../types'

/**
 * Custom React Hook for Token Management
 *
 * Provides a clean interface for components to interact with token management,
 * including automatic initialization, refresh logic, and session cleanup.
 * Follows the patterns established in the existing codebase.
 */
export const useToken = (): UseTokenReturn => {
  const store = useTokenStore()
  const cleanupRef = useRef<(() => void) | null>(null)
  const initializedRef = useRef(false)

  // Initialize token management and set up session cleanup
  useEffect(() => {
    if (!initializedRef.current) {
      // Initialize the token store
      store.initialize().catch((error) => {
        console.error('Failed to initialize token store:', error)
      })

      // Set up session cleanup
      const cleanup = setupSessionCleanup()
      cleanupRef.current = cleanup

      initializedRef.current = true
    }

    // Cleanup on unmount
    return () => {
      if (cleanupRef.current) {
        cleanupRef.current()
        cleanupRef.current = null
      }
    }
  }, [store])

  // Manual refresh with error handling
  const refreshToken = async (): Promise<void> => {
    try {
      await store.refreshToken()
    } catch (error) {
      // Error is already handled by the store, just re-throw for caller
      throw error
    }
  }

  // Clear token with cleanup
  const clearToken = (): void => {
    store.clearToken()
  }

  return {
    // Current token state
    tokenState: {
      token: store.token,
      expiresAt: store.expiresAt,
      isRefreshing: store.isRefreshing,
      isLoading: store.isLoading,
      error: store.error,
      lastRefreshAt: store.lastRefreshAt,
    },

    // Actions
    refreshToken,
    clearToken,

    // Computed properties
    isTokenValid: store.isTokenValid(),
    timeUntilExpiry: store.timeUntilExpiry(),
  }
}

/**
 * Hook for components that need to ensure a valid token exists
 * Automatically initializes and refreshes tokens as needed
 *
 * @param autoRefresh - Whether to automatically refresh expired tokens (default: true)
 * @returns Token state and management functions
 */
export const useValidToken = (autoRefresh: boolean = true): UseTokenReturn => {
  const tokenData = useToken()

  // Auto-refresh if token is invalid and auto-refresh is enabled
  useEffect(() => {
    if (
      autoRefresh &&
      !tokenData.isTokenValid &&
      !tokenData.tokenState.isRefreshing
    ) {
      tokenData.refreshToken().catch((error) => {
        console.error('Auto token refresh failed:', error)
      })
    }
  }, [
    autoRefresh,
    tokenData.isTokenValid,
    tokenData.tokenState.isRefreshing,
    tokenData,
  ])

  return tokenData
}

/**
 * Hook that provides only the current token string for API calls
 * Returns null if no valid token is available
 *
 * @returns Current valid token string or null
 */
export const useCurrentToken = (): string | null => {
  const { tokenState, isTokenValid } = useToken()

  return isTokenValid ? tokenState.token : null
}

/**
 * Hook that provides token status information
 * Useful for UI components that need to display token state
 *
 * @returns Object with token status flags
 */
export const useTokenStatus = () => {
  const { tokenState, isTokenValid, timeUntilExpiry } = useToken()

  return {
    hasToken: !!tokenState.token,
    isValid: isTokenValid,
    isLoading: tokenState.isLoading,
    isRefreshing: tokenState.isRefreshing,
    hasError: !!tokenState.error,
    error: tokenState.error,
    timeUntilExpiry,
    needsRefresh: timeUntilExpiry !== null && timeUntilExpiry <= 5 * 60 * 1000, // 5 minutes
  }
}
