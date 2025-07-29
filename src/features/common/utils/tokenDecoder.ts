import type { JWTPayload, AuthError } from '../types'

/**
 * JWT Token Decoder Utilities
 *
 * Provides functionality to decode JWT tokens for expiration detection
 * without signature verification, as we only need to extract expiration
 * information for auto-refresh timing.
 */

/**
 * Creates an AuthError for token decoding issues
 */
const createTokenDecodeError = (
  message: string,
  originalError?: unknown
): AuthError => ({
  type: 'INVALID_RESPONSE',
  message: `Token decode error: ${message}`,
  timestamp: Date.now(),
  originalError,
})

/**
 * Base64 URL decode utility
 * Converts base64url encoded string to regular string
 */
const base64UrlDecode = (str: string): string => {
  try {
    // Add padding if needed
    const padded = str + '='.repeat((4 - (str.length % 4)) % 4)
    // Replace URL-safe characters
    const base64 = padded.replace(/-/g, '+').replace(/_/g, '/')
    // Decode and return
    return atob(base64)
  } catch (error) {
    throw createTokenDecodeError('Failed to decode base64url string', error)
  }
}

/**
 * Decodes a JWT token payload without signature verification
 *
 * @param token - The JWT token string
 * @returns The decoded JWT payload
 * @throws AuthError if token format is invalid or decoding fails
 */
export const decodeJWTPayload = (token: string): JWTPayload => {
  if (!token || typeof token !== 'string') {
    throw createTokenDecodeError('Token must be a non-empty string')
  }

  // JWT tokens have 3 parts separated by dots: header.payload.signature
  const parts = token.split('.')

  if (parts.length !== 3) {
    throw createTokenDecodeError(
      `Invalid JWT format: expected 3 parts separated by dots, got ${parts.length}`
    )
  }

  const [, payloadPart] = parts

  if (!payloadPart) {
    throw createTokenDecodeError('Missing or empty payload section')
  }

  try {
    // Decode the payload
    const decodedPayload = base64UrlDecode(payloadPart)

    // Parse JSON
    const payload = JSON.parse(decodedPayload) as unknown

    // Validate that payload is an object
    if (!payload || typeof payload !== 'object') {
      throw createTokenDecodeError('Payload is not a valid JSON object')
    }

    return payload as JWTPayload
  } catch (error) {
    if (error && typeof error === 'object' && 'type' in error) {
      // Re-throw AuthError objects
      throw error
    }

    throw createTokenDecodeError('Failed to parse JWT payload as JSON', error)
  }
}

/**
 * Extracts expiration timestamp from a JWT token
 *
 * @param token - The JWT token string
 * @returns Unix timestamp when token expires, or null if no expiration found
 * @throws AuthError if token cannot be decoded
 */
export const getTokenExpiration = (token: string): number | null => {
  try {
    const payload = decodeJWTPayload(token)

    // Check for standard 'exp' claim
    if (typeof payload.exp === 'number') {
      return payload.exp * 1000 // Convert to milliseconds
    }

    // No expiration found
    return null
  } catch (error) {
    // Re-throw decoding errors
    throw error
  }
}

/**
 * Checks if a JWT token is expired
 *
 * @param token - The JWT token string
 * @param bufferMs - Additional buffer time in milliseconds (default: 0)
 * @returns true if token is expired (or will expire within buffer time)
 * @throws AuthError if token cannot be decoded
 */
export const isTokenExpired = (
  token: string,
  bufferMs: number = 0
): boolean => {
  try {
    const expirationMs = getTokenExpiration(token)

    // If no expiration claim, consider token as never expiring
    if (expirationMs === null) {
      return false
    }

    const now = Date.now()
    return now + bufferMs >= expirationMs
  } catch (error) {
    // Re-throw decoding errors
    throw error
  }
}

/**
 * Gets time remaining until token expiration
 *
 * @param token - The JWT token string
 * @returns Milliseconds until expiration, or null if no expiration found
 * @throws AuthError if token cannot be decoded
 */
export const getTimeUntilExpiration = (token: string): number | null => {
  try {
    const expirationMs = getTokenExpiration(token)

    if (expirationMs === null) {
      return null
    }

    const now = Date.now()
    const timeRemaining = expirationMs - now

    // Return 0 if already expired, otherwise return remaining time
    return Math.max(0, timeRemaining)
  } catch (error) {
    // Re-throw decoding errors
    throw error
  }
}

/**
 * Checks if token should be refreshed based on configured threshold
 *
 * @param token - The JWT token string
 * @param refreshThresholdMs - Time before expiration to trigger refresh (default: 5 minutes)
 * @returns true if token should be refreshed
 * @throws AuthError if token cannot be decoded
 */
export const shouldRefreshToken = (
  token: string,
  refreshThresholdMs: number = 5 * 60 * 1000 // 5 minutes default
): boolean => {
  try {
    return isTokenExpired(token, refreshThresholdMs)
  } catch (error) {
    // Re-throw decoding errors
    throw error
  }
}
