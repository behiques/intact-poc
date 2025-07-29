import { env } from '@/utils/env'
import { useTokenStore } from '@/features/common/stores/useTokenStore'
import type { AuthError } from '@/features/common/types'

/**
 * API Client Configuration
 */
interface ApiClientConfig {
  /** Base URL for the API */
  baseUrl: string
  /** Default headers to include with every request */
  defaultHeaders?: Record<string, string>
  /** Request timeout in milliseconds */
  timeout?: number
  /** Whether to automatically attach authentication tokens */
  requiresAuth?: boolean
}

/**
 * API Request Options
 */
interface ApiRequestOptions extends RequestInit {
  /** Whether to bypass automatic token attachment for this request */
  skipAuth?: boolean
  /** Custom timeout for this request */
  timeout?: number
  /** Whether to retry on 401 errors */
  retryOn401?: boolean
}

/**
 * API Response Wrapper
 */
interface ApiResponse<T = unknown> {
  /** Response data */
  data: T
  /** HTTP status code */
  status: number
  /** Response headers */
  headers: Record<string, string>
  /** Whether the request was successful */
  ok: boolean
}

/**
 * Request Context for Interceptors
 */
interface RequestContext {
  /** The URL being requested */
  url: string
  /** Request options */
  options: ApiRequestOptions
  /** Unique request ID for tracking */
  requestId: string
  /** Timestamp when request was initiated */
  timestamp: number
}

/**
 * Response Context for Interceptors
 */
interface ResponseContext<T = unknown> {
  /** The original request context */
  request: RequestContext
  /** The response data */
  response: ApiResponse<T>
  /** Time taken for the request in milliseconds */
  duration: number
}

/**
 * Request Interceptor Function Type
 */
type RequestInterceptor = (
  context: RequestContext
) => Promise<RequestContext> | RequestContext

/**
 * Response Interceptor Function Type
 */
type ResponseInterceptor = <T>(
  context: ResponseContext<T>
) => Promise<ResponseContext<T>> | ResponseContext<T>

/**
 * Error Interceptor Function Type
 */
type ErrorInterceptor = (
  error: AuthError,
  context: RequestContext
) => Promise<never> | never

/**
 * Creates an AuthError for API client operations
 */
const createApiError = (
  type: AuthError['type'],
  message: string,
  statusCode?: number,
  originalError?: unknown
): AuthError => ({
  type,
  message: `API Client: ${message}`,
  timestamp: Date.now(),
  statusCode,
  originalError,
})

/**
 * Enhanced API Client with Automatic Token Management
 *
 * Provides a centralized HTTP client with automatic token attachment,
 * request/response interceptors, retry logic, and environment-based routing.
 * Follows the bulletproof-react patterns and integrates with our token management system.
 */
export class ApiClient {
  private config: Required<ApiClientConfig>
  private requestInterceptors: RequestInterceptor[] = []
  private responseInterceptors: ResponseInterceptor[] = []
  private errorInterceptors: ErrorInterceptor[] = []
  private requestIdCounter = 0

  constructor(config: ApiClientConfig) {
    this.config = {
      timeout: 30000, // 30 seconds default
      requiresAuth: true,
      defaultHeaders: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      ...config,
    }

    // Add default interceptors
    this.addDefaultInterceptors()
  }

  /**
   * Adds default request and response interceptors
   */
  private addDefaultInterceptors(): void {
    // Request interceptor for token attachment
    this.addRequestInterceptor(async (context) => {
      if (this.config.requiresAuth && !context.options.skipAuth) {
        try {
          const token = await useTokenStore.getState().getValidToken()
          context.options.headers = {
            ...context.options.headers,
            Authorization: `Bearer ${token}`,
          }
        } catch (error) {
          throw createApiError(
            'AUTH_FAILED',
            'Failed to obtain valid token for API request',
            401,
            error
          )
        }
      }
      return context
    })

    // Response interceptor for 401 handling
    this.addResponseInterceptor(async <T>(context: ResponseContext<T>) => {
      if (
        context.response.status === 401 &&
        context.request.options.retryOn401 !== false
      ) {
        // Token might be expired, try to refresh and retry
        try {
          await useTokenStore.getState().refreshToken()

          // Retry the original request with the new token
          const retryResponse = await this.request<T>(context.request.url, {
            ...context.request.options,
            retryOn401: false, // Prevent infinite retry loop
          })

          return {
            ...context,
            response: retryResponse,
            duration: Date.now() - context.request.timestamp,
          }
        } catch (refreshError) {
          throw createApiError(
            'AUTH_FAILED',
            'Token refresh failed during 401 retry',
            401,
            refreshError
          )
        }
      }

      return context
    })

    // Error interceptor for network errors
    this.addErrorInterceptor((error, context) => {
      // Add request context to error for better debugging
      throw {
        ...error,
        requestUrl: context.url,
        requestId: context.requestId,
        message: `${error.message} (Request ID: ${context.requestId})`,
      }
    })
  }

  /**
   * Generates a unique request ID
   */
  private generateRequestId(): string {
    return `api-request-${++this.requestIdCounter}-${Date.now()}`
  }

  /**
   * Adds a request interceptor
   */
  addRequestInterceptor(interceptor: RequestInterceptor): void {
    this.requestInterceptors.push(interceptor)
  }

  /**
   * Adds a response interceptor
   */
  addResponseInterceptor(interceptor: ResponseInterceptor): void {
    this.responseInterceptors.push(interceptor)
  }

  /**
   * Adds an error interceptor
   */
  addErrorInterceptor(interceptor: ErrorInterceptor): void {
    this.errorInterceptors.push(interceptor)
  }

  /**
   * Processes request through interceptors
   */
  private async processRequestInterceptors(
    context: RequestContext
  ): Promise<RequestContext> {
    let processedContext = context

    for (const interceptor of this.requestInterceptors) {
      processedContext = await interceptor(processedContext)
    }

    return processedContext
  }

  /**
   * Processes response through interceptors
   */
  private async processResponseInterceptors<T>(
    context: ResponseContext<T>
  ): Promise<ResponseContext<T>> {
    let processedContext = context

    for (const interceptor of this.responseInterceptors) {
      processedContext = await interceptor(processedContext)
    }

    return processedContext
  }

  /**
   * Processes errors through interceptors
   */
  private async processErrorInterceptors(
    error: AuthError,
    context: RequestContext
  ): Promise<never> {
    let processedError = error

    for (const interceptor of this.errorInterceptors) {
      try {
        await interceptor(processedError, context)
      } catch (interceptorError) {
        processedError = interceptorError as AuthError
      }
    }

    throw processedError
  }

  /**
   * Makes an HTTP request with automatic token attachment and error handling
   */
  async request<T = unknown>(
    endpoint: string,
    options: ApiRequestOptions = {}
  ): Promise<ApiResponse<T>> {
    const startTime = Date.now()
    const requestId = this.generateRequestId()

    // Build full URL
    const url = endpoint.startsWith('http')
      ? endpoint
      : `${this.config.baseUrl}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`

    // Prepare request context
    let requestContext: RequestContext = {
      url,
      options: {
        ...options,
        headers: {
          ...this.config.defaultHeaders,
          ...options.headers,
        },
      },
      requestId,
      timestamp: startTime,
    }

    try {
      // Process request interceptors
      requestContext = await this.processRequestInterceptors(requestContext)

      // Set up timeout
      const timeout = options.timeout || this.config.timeout
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), timeout)

      // Make the actual request
      const response = await fetch(requestContext.url, {
        ...requestContext.options,
        signal: controller.signal,
      })

      clearTimeout(timeoutId)

      // Parse response
      let data: T
      const contentType = response.headers.get('content-type')

      if (contentType && contentType.includes('application/json')) {
        data = await response.json()
      } else {
        data = (await response.text()) as unknown as T
      }

      // Create response object
      const apiResponse: ApiResponse<T> = {
        data,
        status: response.status,
        headers: Object.fromEntries(response.headers.entries()),
        ok: response.ok,
      }

      // Handle non-ok responses
      if (!response.ok) {
        throw createApiError(
          response.status === 401
            ? 'AUTH_FAILED'
            : response.status >= 500
              ? 'NETWORK_ERROR'
              : 'INVALID_RESPONSE',
          `HTTP ${response.status}: ${response.statusText}`,
          response.status
        )
      }

      // Process response interceptors
      const responseContext = await this.processResponseInterceptors({
        request: requestContext,
        response: apiResponse,
        duration: Date.now() - startTime,
      })

      return responseContext.response
    } catch (error) {
      // Handle different types of errors
      let apiError: AuthError

      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          apiError = createApiError(
            'NETWORK_ERROR',
            'Request timeout',
            408,
            error
          )
        } else if (error.message.includes('fetch')) {
          apiError = createApiError(
            'NETWORK_ERROR',
            'Network request failed',
            undefined,
            error
          )
        } else if ('type' in error && 'timestamp' in error) {
          // Already an AuthError
          apiError = error as AuthError
        } else {
          apiError = createApiError(
            'UNKNOWN_ERROR',
            error.message || 'Unknown error occurred',
            undefined,
            error
          )
        }
      } else {
        apiError = error as AuthError
      }

      // Process error interceptors
      return await this.processErrorInterceptors(apiError, requestContext)
    }
  }

  /**
   * Convenience method for GET requests
   */
  async get<T = unknown>(
    endpoint: string,
    options?: Omit<ApiRequestOptions, 'method' | 'body'>
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...options, method: 'GET' })
  }

  /**
   * Convenience method for POST requests
   */
  async post<T = unknown>(
    endpoint: string,
    data?: unknown,
    options?: Omit<ApiRequestOptions, 'method' | 'body'>
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    })
  }

  /**
   * Convenience method for PUT requests
   */
  async put<T = unknown>(
    endpoint: string,
    data?: unknown,
    options?: Omit<ApiRequestOptions, 'method' | 'body'>
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    })
  }

  /**
   * Convenience method for PATCH requests
   */
  async patch<T = unknown>(
    endpoint: string,
    data?: unknown,
    options?: Omit<ApiRequestOptions, 'method' | 'body'>
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'PATCH',
      body: data ? JSON.stringify(data) : undefined,
    })
  }

  /**
   * Convenience method for DELETE requests
   */
  async delete<T = unknown>(
    endpoint: string,
    options?: Omit<ApiRequestOptions, 'method' | 'body'>
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...options, method: 'DELETE' })
  }
}

/**
 * Pre-configured API client for backend services
 * Uses BACKEND_API_URL and includes automatic token attachment
 */
export const backendApiClient = new ApiClient({
  baseUrl: env.BACKEND_API_URL,
  requiresAuth: true,
  defaultHeaders: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    usersystemid: env.USER_SYSTEM_ID,
  },
})

/**
 * Pre-configured API client for local/public APIs
 * Uses NEXT_PUBLIC_API_URL and doesn't require authentication
 */
export const localApiClient = new ApiClient({
  baseUrl: env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
  requiresAuth: false,
})

/**
 * Default export is the backend API client for authenticated requests
 */
export default backendApiClient
