import type { TokenResponse, AuthError } from '../types/index'

/**
 * Authentication API Functions
 *
 * Core API functions for token retrieval and management
 * following the established patterns from the codebase.
 */

/**
 * Creates an AuthError object with proper error classification
 */
const createAuthError = (
  type: AuthError['type'],
  message: string,
  statusCode?: number,
  originalError?: unknown
): AuthError => ({
  type,
  message,
  statusCode,
  originalError,
  timestamp: Date.now(),
})

/**
 * Retrieves an authentication token from the authorization API
 *
 * @returns Promise<TokenResponse> The token and expiration data
 * @throws AuthError When token retrieval fails
 */
export const retrieveToken = async (): Promise<TokenResponse> => {
  try {
    // Use the Next.js API route proxy to avoid CORS issues
    const response = await fetch('/api/auth/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    // Handle HTTP error responses
    if (!response.ok) {
      const errorText = await response.text().catch(() => 'Unknown error')

      switch (response.status) {
        case 401:
          throw createAuthError(
            'AUTH_FAILED',
            'Authentication failed: Invalid credentials or system ID',
            response.status,
            { responseText: errorText }
          )
        case 403:
          throw createAuthError(
            'AUTH_FAILED',
            'Access forbidden: Insufficient permissions',
            response.status,
            { responseText: errorText }
          )
        case 404:
          throw createAuthError(
            'NETWORK_ERROR',
            'Authorization endpoint not found',
            response.status,
            { responseText: errorText }
          )
        case 500:
        case 502:
        case 503:
        case 504:
          throw createAuthError(
            'NETWORK_ERROR',
            `Server error: ${response.status} - ${response.statusText}`,
            response.status,
            { responseText: errorText }
          )
        default:
          throw createAuthError(
            'NETWORK_ERROR',
            `HTTP ${response.status}: ${response.statusText}`,
            response.status,
            { responseText: errorText }
          )
      }
    }

    // Parse response as JSON
    let responseData: unknown
    try {
      responseData = await response.json()
    } catch (parseError) {
      throw createAuthError(
        'INVALID_RESPONSE',
        'Failed to parse token response as JSON',
        response.status,
        parseError
      )
    }

    // Validate response structure
    if (
      !responseData ||
      typeof responseData !== 'object' ||
      !('token' in responseData) ||
      !('expiration' in responseData)
    ) {
      throw createAuthError(
        'INVALID_RESPONSE',
        'Invalid token response format: missing token or expiration fields',
        response.status,
        { responseData }
      )
    }

    const tokenData = responseData as { token: unknown; expiration: unknown }

    // Validate token and expiration types
    if (typeof tokenData.token !== 'string' || !tokenData.token.trim()) {
      throw createAuthError(
        'INVALID_RESPONSE',
        'Invalid token: expected non-empty string',
        response.status,
        { tokenData }
      )
    }

    if (
      typeof tokenData.expiration !== 'string' ||
      !tokenData.expiration.trim()
    ) {
      throw createAuthError(
        'INVALID_RESPONSE',
        'Invalid expiration: expected non-empty string',
        response.status,
        { tokenData }
      )
    }

    return {
      token: tokenData.token,
      expiration: tokenData.expiration,
    }
  } catch (error) {
    // Re-throw AuthError objects as-is
    if (error && typeof error === 'object' && 'type' in error) {
      throw error
    }

    // Handle network errors
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw createAuthError(
        'NETWORK_ERROR',
        'Network error: Unable to connect to authorization server',
        undefined,
        error
      )
    }

    // Handle other unknown errors
    throw createAuthError(
      'UNKNOWN_ERROR',
      `Unexpected error during token retrieval: ${error instanceof Error ? error.message : 'Unknown error'}`,
      undefined,
      error
    )
  }
}

/**
 * Type guard to check if an error is an AuthError
 */
export const isAuthError = (error: unknown): error is AuthError => {
  return (
    typeof error === 'object' &&
    error !== null &&
    'type' in error &&
    'message' in error &&
    'timestamp' in error &&
    typeof (error as AuthError).type === 'string' &&
    typeof (error as AuthError).message === 'string' &&
    typeof (error as AuthError).timestamp === 'number'
  )
}
