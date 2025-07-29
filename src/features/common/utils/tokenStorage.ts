import type { TokenStorageData, AuthError } from '../types'
import { TOKEN_STORAGE_KEY } from '../types'

/**
 * Token Storage Utilities
 *
 * Provides secure token storage, retrieval, and session management
 * using browser storage with proper error handling and validation.
 */

/**
 * Creates an AuthError for storage-related issues
 */
const createStorageError = (
  message: string,
  originalError?: unknown
): AuthError => ({
  type: 'UNKNOWN_ERROR',
  message: `Storage error: ${message}`,
  timestamp: Date.now(),
  originalError,
})

/**
 * Checks if we're running in a browser environment
 */
const isBrowser = (): boolean => {
  return (
    typeof window !== 'undefined' && typeof window.localStorage !== 'undefined'
  )
}

/**
 * Stores token data securely in localStorage
 *
 * @param token - The authentication token
 * @param expiresAt - Token expiration timestamp (Unix timestamp in milliseconds)
 * @throws AuthError if storage fails
 */
export const storeToken = (token: string, expiresAt: number): void => {
  if (!isBrowser()) {
    throw createStorageError(
      'localStorage is not available (not in browser environment)'
    )
  }

  if (!token || typeof token !== 'string') {
    throw createStorageError('Token must be a non-empty string')
  }

  if (typeof expiresAt !== 'number' || expiresAt <= 0) {
    throw createStorageError(
      'ExpiresAt must be a positive number (Unix timestamp)'
    )
  }

  const storageData: TokenStorageData = {
    token,
    expiresAt,
    storedAt: Date.now(),
  }

  try {
    const serializedData = JSON.stringify(storageData)
    localStorage.setItem(TOKEN_STORAGE_KEY, serializedData)
  } catch (error) {
    throw createStorageError('Failed to store token in localStorage', error)
  }
}

/**
 * Retrieves stored token data from localStorage
 *
 * @returns TokenStorageData if valid token exists, null otherwise
 * @throws AuthError if storage access fails
 */
export const getStoredToken = (): TokenStorageData | null => {
  if (!isBrowser()) {
    // In SSR environment, return null (no stored token)
    return null
  }

  try {
    const serializedData = localStorage.getItem(TOKEN_STORAGE_KEY)

    if (!serializedData) {
      return null
    }

    const data = JSON.parse(serializedData) as unknown

    // Validate stored data structure
    if (!isValidTokenStorageData(data)) {
      // Clear invalid data
      clearStoredToken()
      return null
    }

    return data as TokenStorageData
  } catch (error) {
    // Clear corrupted data and return null
    try {
      clearStoredToken()
    } catch {
      // Ignore cleanup errors
    }

    throw createStorageError(
      'Failed to retrieve token from localStorage',
      error
    )
  }
}

/**
 * Clears stored token data from localStorage
 *
 * @throws AuthError if storage access fails
 */
export const clearStoredToken = (): void => {
  if (!isBrowser()) {
    return
  }

  try {
    localStorage.removeItem(TOKEN_STORAGE_KEY)
  } catch (error) {
    throw createStorageError('Failed to clear token from localStorage', error)
  }
}

/**
 * Checks if stored token exists and is not expired
 *
 * @param bufferMs - Additional buffer time in milliseconds (default: 0)
 * @returns true if valid non-expired token exists
 */
export const hasValidStoredToken = (bufferMs: number = 0): boolean => {
  try {
    const storedData = getStoredToken()

    if (!storedData) {
      return false
    }

    const now = Date.now()
    return now + bufferMs < storedData.expiresAt
  } catch {
    // If any error occurs, consider no valid token exists
    return false
  }
}

/**
 * Sets up automatic token cleanup on session end
 * This should be called once during app initialization
 *
 * @returns Cleanup function to remove event listeners
 */
export const setupSessionCleanup = (): (() => void) => {
  if (!isBrowser()) {
    return () => {} // Return no-op function for SSR
  }

  // Clear token when browser window is closed
  const handleBeforeUnload = () => {
    try {
      clearStoredToken()
    } catch {
      // Ignore cleanup errors during page unload
    }
  }

  // Clear token when user navigates away or closes tab
  const handleVisibilityChange = () => {
    if (document.visibilityState === 'hidden') {
      try {
        clearStoredToken()
      } catch {
        // Ignore cleanup errors
      }
    }
  }

  // Set up event listeners
  window.addEventListener('beforeunload', handleBeforeUnload)
  document.addEventListener('visibilitychange', handleVisibilityChange)

  // Return cleanup function
  return () => {
    window.removeEventListener('beforeunload', handleBeforeUnload)
    document.removeEventListener('visibilitychange', handleVisibilityChange)
  }
}

/**
 * Type guard to validate TokenStorageData structure
 */
const isValidTokenStorageData = (data: unknown): data is TokenStorageData => {
  return (
    typeof data === 'object' &&
    data !== null &&
    typeof (data as TokenStorageData).token === 'string' &&
    typeof (data as TokenStorageData).expiresAt === 'number' &&
    typeof (data as TokenStorageData).storedAt === 'number' &&
    (data as TokenStorageData).token.length > 0 &&
    (data as TokenStorageData).expiresAt > 0 &&
    (data as TokenStorageData).storedAt > 0
  )
}

/**
 * Gets time remaining until stored token expiration
 *
 * @returns Milliseconds until expiration, or null if no valid token stored
 */
export const getStoredTokenTimeRemaining = (): number | null => {
  try {
    const storedData = getStoredToken()

    if (!storedData) {
      return null
    }

    const now = Date.now()
    const timeRemaining = storedData.expiresAt - now

    return Math.max(0, timeRemaining)
  } catch {
    return null
  }
}

/**
 * Updates stored token expiration time without changing the token itself
 * Useful when token expiration is updated from server response
 *
 * @param newExpiresAt - New expiration timestamp
 * @throws AuthError if no token is stored or update fails
 */
export const updateStoredTokenExpiration = (newExpiresAt: number): void => {
  const storedData = getStoredToken()

  if (!storedData) {
    throw createStorageError('No token stored to update')
  }

  if (typeof newExpiresAt !== 'number' || newExpiresAt <= 0) {
    throw createStorageError('New expiration must be a positive number')
  }

  // Store updated token with new expiration
  storeToken(storedData.token, newExpiresAt)
}
