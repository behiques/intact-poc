import { useCallback, useMemo } from 'react'
import { useCurrentToken, useToken } from './useToken'
import { useTokenStore } from '../stores/useTokenStore'
import { tokenConfig } from '../utils/config'
import type {
  AuthenticatedRequestConfig,
  AuthenticatedResponse,
  UseAuthenticatedApiReturn,
  AuthError,
} from '../types'

/**
 * Custom React Hook for Authenticated API Requests
 *
 * Provides utilities for making authenticated API requests with automatic
 * token attachment, retry logic, and error handling.
 */

/**
 * Creates an AuthError for API-related issues
 */
const createApiError = (
  type: AuthError['type'],
  message: string,
  statusCode?: number,
  originalError?: unknown
): AuthError => ({
  type,
  message: `API: ${message}`,
  statusCode,
  timestamp: Date.now(),
  originalError,
})

/**
 * Main hook for authenticated API requests
 */
export const useAuthenticatedApi = (): UseAuthenticatedApiReturn => {
  const token = useCurrentToken()
  const { refreshToken, tokenState } = useToken()

  // Check if the API client is ready to make requests
  const isReady = useMemo(() => {
    return !!token && !tokenState.isLoading && !tokenState.isRefreshing
  }, [token, tokenState.isLoading, tokenState.isRefreshing])

  // Main request function with retry logic
  const request = useCallback(
    async <T = unknown>(
      config: AuthenticatedRequestConfig
    ): Promise<AuthenticatedResponse<T>> => {
      const currentToken = token

      if (!currentToken) {
        throw createApiError(
          'AUTH_FAILED',
          'No valid authentication token available'
        )
      }

      const { url, method = 'GET', headers = {}, body, retry = true } = config

      // Determine if this is a backend API call
      const isBackendCall =
        url.startsWith(tokenConfig.backendApiUrl) ||
        url.startsWith('/api/backend') ||
        !url.startsWith('http')

      // Prepare request options
      const requestOptions: RequestInit = {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${currentToken}`,
          ...headers,
        },
      }

      // Add body for non-GET requests
      if (body && method !== 'GET') {
        requestOptions.body =
          typeof body === 'string' ? body : JSON.stringify(body)
      }

      // Determine full URL
      const fullUrl =
        isBackendCall && !url.startsWith('http')
          ? `${tokenConfig.backendApiUrl}${url.startsWith('/') ? url : `/${url}`}`
          : url

      try {
        const response = await fetch(fullUrl, requestOptions)

        // Handle 401 Unauthorized - token might be expired
        if (response.status === 401 && retry) {
          try {
            // Try to refresh the token
            await refreshToken()

            // Get the updated token from the store state
            const newToken = useTokenStore.getState().token
            if (newToken && newToken !== currentToken) {
              const retryOptions = {
                ...requestOptions,
                headers: {
                  ...requestOptions.headers,
                  Authorization: `Bearer ${newToken}`,
                },
              }

              const retryResponse = await fetch(fullUrl, retryOptions)

              if (!retryResponse.ok) {
                throw createApiError(
                  'AUTH_FAILED',
                  `Request failed after token refresh: ${retryResponse.status} ${retryResponse.statusText}`,
                  retryResponse.status
                )
              }

              const retryData = await retryResponse.json()

              return {
                data: retryData,
                status: retryResponse.status,
                headers: Object.fromEntries(retryResponse.headers.entries()),
              }
            }
          } catch (refreshError) {
            throw createApiError(
              'AUTH_FAILED',
              'Token refresh failed during request retry',
              401,
              refreshError
            )
          }
        }

        // Handle other HTTP errors
        if (!response.ok) {
          const errorText = await response.text().catch(() => 'Unknown error')

          switch (response.status) {
            case 400:
              throw createApiError(
                'INVALID_RESPONSE',
                `Bad request: ${errorText}`,
                response.status
              )
            case 403:
              throw createApiError(
                'AUTH_FAILED',
                `Forbidden: ${errorText}`,
                response.status
              )
            case 404:
              throw createApiError(
                'NETWORK_ERROR',
                `Not found: ${errorText}`,
                response.status
              )
            case 500:
            case 502:
            case 503:
            case 504:
              throw createApiError(
                'NETWORK_ERROR',
                `Server error: ${response.status} - ${errorText}`,
                response.status
              )
            default:
              throw createApiError(
                'NETWORK_ERROR',
                `HTTP ${response.status}: ${errorText}`,
                response.status
              )
          }
        }

        // Parse successful response
        const data = await response.json()

        return {
          data,
          status: response.status,
          headers: Object.fromEntries(response.headers.entries()),
        }
      } catch (error) {
        // Re-throw our custom errors
        if (error && typeof error === 'object' && 'type' in error) {
          throw error
        }

        // Handle network errors
        if (error instanceof TypeError && error.message.includes('fetch')) {
          throw createApiError(
            'NETWORK_ERROR',
            'Network error: Unable to connect to server',
            undefined,
            error
          )
        }

        // Handle other unknown errors
        throw createApiError(
          'UNKNOWN_ERROR',
          `Unexpected error during API request: ${error instanceof Error ? error.message : 'Unknown error'}`,
          undefined,
          error
        )
      }
    },
    [token, refreshToken]
  )

  return {
    request,
    isReady,
    error: tokenState.error,
  }
}

/**
 * Hook for making GET requests to backend APIs
 */
export const useAuthenticatedGet = () => {
  const { request } = useAuthenticatedApi()

  return useCallback(
    async <T = unknown>(
      url: string,
      headers?: Record<string, string>
    ): Promise<AuthenticatedResponse<T>> => {
      return request<T>({
        url,
        method: 'GET',
        headers,
      })
    },
    [request]
  )
}

/**
 * Hook for making POST requests to backend APIs
 */
export const useAuthenticatedPost = () => {
  const { request } = useAuthenticatedApi()

  return useCallback(
    async <T = unknown>(
      url: string,
      body?: unknown,
      headers?: Record<string, string>
    ): Promise<AuthenticatedResponse<T>> => {
      return request<T>({
        url,
        method: 'POST',
        body,
        headers,
      })
    },
    [request]
  )
}

/**
 * Hook for making PUT requests to backend APIs
 */
export const useAuthenticatedPut = () => {
  const { request } = useAuthenticatedApi()

  return useCallback(
    async <T = unknown>(
      url: string,
      body?: unknown,
      headers?: Record<string, string>
    ): Promise<AuthenticatedResponse<T>> => {
      return request<T>({
        url,
        method: 'PUT',
        body,
        headers,
      })
    },
    [request]
  )
}

/**
 * Hook for making DELETE requests to backend APIs
 */
export const useAuthenticatedDelete = () => {
  const { request } = useAuthenticatedApi()

  return useCallback(
    async <T = unknown>(
      url: string,
      headers?: Record<string, string>
    ): Promise<AuthenticatedResponse<T>> => {
      return request<T>({
        url,
        method: 'DELETE',
        headers,
      })
    },
    [request]
  )
}

/**
 * Hook for checking if authenticated API is available
 * Useful for conditional rendering based on authentication state
 */
export const useAuthenticatedApiStatus = () => {
  const { isReady, error } = useAuthenticatedApi()
  const { tokenState } = useToken()

  return {
    isReady,
    isLoading: tokenState.isLoading,
    isRefreshing: tokenState.isRefreshing,
    hasToken: !!tokenState.token,
    hasError: !!error,
    error,
  }
}
