import { useCallback, useMemo } from 'react'
import { useCurrentToken, useToken } from './useToken'
import { apiClient } from '@/lib/api'
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
 * token attachment, retry logic, and error handling using the axios-based API client.
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
  const { tokenState } = useToken()

  // Check if the API client is ready to make requests
  const isReady = useMemo(() => {
    return !!token && !tokenState.isLoading && !tokenState.isRefreshing
  }, [token, tokenState.isLoading, tokenState.isRefreshing])

  // Main request function using axios-based client
  const request = useCallback(
    async <T = unknown>(
      config: AuthenticatedRequestConfig
    ): Promise<AuthenticatedResponse<T>> => {
      if (!token) {
        throw createApiError(
          'AUTH_FAILED',
          'No valid authentication token available'
        )
      }

      const { url, method = 'GET', headers = {}, body } = config

      try {
        // Make request using the unified API client
        const response = await apiClient.request<T>(url, {
          method,
          headers,
          data: body,
          skipAuth: false, // Always use auth for this hook
        })

        // Transform to AuthenticatedResponse format for backward compatibility
        return {
          data: response.data,
          status: response.status,
          headers: response.headers,
        }
      } catch (error) {
        // Re-throw API client errors directly since they're already properly formatted
        if (error && typeof error === 'object' && 'type' in error) {
          throw error
        }

        // Handle unexpected errors
        throw createApiError(
          'UNKNOWN_ERROR',
          `Unexpected error during API request: ${error instanceof Error ? error.message : 'Unknown error'}`,
          undefined,
          error
        )
      }
    },
    [token]
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
