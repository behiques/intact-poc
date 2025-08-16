import type {
  ApiClientInterface,
  ApiClientConfig,
  ApiRequestOptions,
  ApiResponse,
  ApiError,
} from './types'

/**
 * API Client for production use
 * Makes actual HTTP requests to the backend API
 */
export class ApiClient implements ApiClientInterface {
  private config: Required<ApiClientConfig>

  constructor(config: ApiClientConfig) {
    this.config = {
      timeout: 30000, // 30 seconds default
      defaultHeaders: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        usersystemid: process.env.NEXT_PUBLIC_USER_SYSTEM_ID || '',
      },
      ...config,
      tokenProvider: config.tokenProvider || undefined,
    } as Required<ApiClientConfig>
  }

  /**
   * Creates an API error object
   */
  private createError(
    type: ApiError['type'],
    message: string,
    statusCode?: number,
    originalError?: unknown
  ): ApiError {
    return {
      type,
      message,
      statusCode,
      timestamp: Date.now(),
      originalError,
    }
  }

  /**
   * Main request method
   */
  async request<T = unknown>(
    endpoint: string,
    options: ApiRequestOptions = {}
  ): Promise<ApiResponse<T>> {
    const { skipAuth = false, signal } = options

    // Build URL with params
    const url = new URL(endpoint, this.config.baseUrl)
    if (options.params) {
      Object.entries(options.params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          url.searchParams.set(key, String(value))
        }
      })
    }

    // Prepare headers
    const headers: Record<string, string> = {
      ...this.config.defaultHeaders,
      ...options.headers,
    }

    // Add auth token if needed
    if (!skipAuth && this.config.tokenProvider) {
      try {
        const token = await this.config.tokenProvider.getToken()
        headers.Authorization = `Bearer ${token}`
      } catch (error) {
        throw this.createError(
          'AUTH_FAILED',
          'Failed to obtain authentication token',
          401,
          error
        )
      }
    }

    // Create abort controller for timeout
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), this.config.timeout)

    try {
      const response = await fetch(url.toString(), {
        method: options.method || 'GET',
        headers,
        body: options.data ? JSON.stringify(options.data) : undefined,
        signal: signal || controller.signal,
      })

      clearTimeout(timeoutId)

      // Handle non-OK responses
      if (!response.ok) {
        let errorMessage = `HTTP ${response.status}: ${response.statusText}`

        try {
          const errorData = await response.json()
          errorMessage = errorData.message || errorData.error || errorMessage
        } catch {
          // Ignore JSON parse errors for error response
        }

        throw this.createError(
          response.status === 401
            ? 'AUTH_FAILED'
            : response.status >= 500
              ? 'NETWORK_ERROR'
              : 'INVALID_RESPONSE',
          errorMessage,
          response.status
        )
      }

      // Parse response
      let data: T
      const contentType = response.headers.get('content-type')

      if (contentType?.includes('application/json')) {
        try {
          data = await response.json()
        } catch (error) {
          throw this.createError(
            'INVALID_RESPONSE',
            'Failed to parse JSON response',
            response.status,
            error
          )
        }
      } else {
        // For non-JSON responses, return text
        data = (await response.text()) as T
      }

      // Return formatted response
      return {
        data,
        status: response.status,
        headers: Object.fromEntries(response.headers.entries()),
        ok: true,
      }
    } catch (error) {
      clearTimeout(timeoutId)

      // Handle abort/timeout
      if (error instanceof Error && error.name === 'AbortError') {
        throw this.createError('NETWORK_ERROR', 'Request timeout', 408)
      }

      // Re-throw API errors
      if (error && typeof error === 'object' && 'type' in error) {
        throw error
      }

      // Handle other errors
      throw this.createError(
        'NETWORK_ERROR',
        error instanceof Error ? error.message : 'Unknown error occurred',
        undefined,
        error
      )
    }
  }

  // Convenience methods
  async get<T = unknown>(
    endpoint: string,
    options?: Omit<ApiRequestOptions, 'method' | 'data'>
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...options, method: 'GET' })
  }

  async post<T = unknown>(
    endpoint: string,
    data?: unknown,
    options?: Omit<ApiRequestOptions, 'method' | 'data'>
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...options, method: 'POST', data })
  }

  async put<T = unknown>(
    endpoint: string,
    data?: unknown,
    options?: Omit<ApiRequestOptions, 'method' | 'data'>
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...options, method: 'PUT', data })
  }

  async patch<T = unknown>(
    endpoint: string,
    data?: unknown,
    options?: Omit<ApiRequestOptions, 'method' | 'data'>
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...options, method: 'PATCH', data })
  }

  async delete<T = unknown>(
    endpoint: string,
    options?: Omit<ApiRequestOptions, 'method' | 'data'>
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...options, method: 'DELETE' })
  }
}
