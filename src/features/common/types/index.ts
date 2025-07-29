/**
 * Token Management Types
 *
 * Comprehensive type definitions for the token management system
 * including API responses, state management, and error handling.
 */

// API Response Types
export interface TokenResponse {
  /** The authentication token */
  token: string
  /** Token expiration date string (e.g., "Monday, July 28, 2025 1:50 PM") */
  expiration: string
}

// Token State Management
export interface TokenState {
  /** Current authentication token */
  token: string | null
  /** Token expiration timestamp (Unix timestamp) */
  expiresAt: number | null
  /** Whether a token refresh is currently in progress */
  isRefreshing: boolean
  /** Whether initial token retrieval is in progress */
  isLoading: boolean
  /** Current error state, if any */
  error: AuthError | null
  /** Timestamp of last successful token retrieval */
  lastRefreshAt: number | null
}

// Error Types
export interface AuthError {
  /** Error type classification */
  type:
    | 'NETWORK_ERROR'
    | 'AUTH_FAILED'
    | 'TOKEN_EXPIRED'
    | 'INVALID_RESPONSE'
    | 'UNKNOWN_ERROR'
  /** Human-readable error message */
  message: string
  /** HTTP status code, if applicable */
  statusCode?: number
  /** Original error object for debugging */
  originalError?: unknown
  /** Timestamp when error occurred */
  timestamp: number
}

// Storage Types
export interface TokenStorageData {
  /** The stored token */
  token: string
  /** Token expiration timestamp */
  expiresAt: number
  /** Timestamp when token was stored */
  storedAt: number
}

// JWT Payload Types (for decoding)
export interface JWTPayload {
  /** Standard JWT expiration claim (Unix timestamp) */
  exp?: number
  /** Standard JWT issued at claim (Unix timestamp) */
  iat?: number
  /** Standard JWT issuer claim */
  iss?: string
  /** Standard JWT subject claim */
  sub?: string
  /** Any other custom claims */
  [key: string]: unknown
}

// API Client Types
export interface AuthenticatedRequestConfig {
  /** Request URL */
  url: string
  /** HTTP method */
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
  /** Request headers */
  headers?: Record<string, string>
  /** Request body */
  body?: unknown
  /** Whether to retry on token expiration */
  retry?: boolean
}

export interface AuthenticatedResponse<T = unknown> {
  /** Response data */
  data: T
  /** HTTP status code */
  status: number
  /** Response headers */
  headers: Record<string, string>
}

// Hook Return Types
export interface UseTokenReturn {
  /** Current token state */
  tokenState: TokenState
  /** Function to manually refresh token */
  refreshToken: () => Promise<void>
  /** Function to clear token and reset state */
  clearToken: () => void
  /** Whether token is valid and not expired */
  isTokenValid: boolean
  /** Time until token expires (in milliseconds) */
  timeUntilExpiry: number | null
}

export interface UseAuthenticatedApiReturn {
  /** Function to make authenticated API requests */
  request: <T = unknown>(
    config: AuthenticatedRequestConfig
  ) => Promise<AuthenticatedResponse<T>>
  /** Whether the API client is ready to make requests */
  isReady: boolean
  /** Current authentication error, if any */
  error: AuthError | null
}

// Environment Configuration Types
export interface TokenConfig {
  /** Authorization API URL */
  authTokenApiUrl: string
  /** Backend API URL */
  backendApiUrl: string
  /** User system identifier */
  userSystemId: string
}

// Constants
export const TOKEN_STORAGE_KEY = 'intact_auth_token'
export const TOKEN_REFRESH_THRESHOLD_MS = 5 * 60 * 1000 // 5 minutes before expiration
export const TOKEN_REFRESH_RETRY_ATTEMPTS = 3
export const TOKEN_REFRESH_RETRY_DELAY_MS = 1000 // 1 second

// Type Guards
export const isTokenResponse = (data: unknown): data is TokenResponse => {
  return (
    typeof data === 'object' &&
    data !== null &&
    typeof (data as TokenResponse).token === 'string' &&
    typeof (data as TokenResponse).expiration === 'string'
  )
}

export const isAuthError = (error: unknown): error is AuthError => {
  return (
    typeof error === 'object' &&
    error !== null &&
    typeof (error as AuthError).type === 'string' &&
    typeof (error as AuthError).message === 'string' &&
    typeof (error as AuthError).timestamp === 'number'
  )
}
