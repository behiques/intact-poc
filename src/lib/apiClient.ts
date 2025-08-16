import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
  InternalAxiosRequestConfig,
  CancelTokenSource,
  isAxiosError,
} from 'axios'
import { useTokenStore } from '@/features/auth/stores/useTokenStore'
import type { AuthError } from '@/features/auth/types'

// Extend axios request config to include our custom properties
declare module 'axios' {
  interface InternalAxiosRequestConfig {
    skipAuth?: boolean
    retryOn401?: boolean
    'X-Request-Timestamp'?: string
  }
}

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
 * API Request Options - Extends AxiosRequestConfig for axios compatibility
 */
interface ApiRequestOptions
  extends Omit<AxiosRequestConfig, 'url' | 'baseURL'> {
  /** Whether to bypass automatic token attachment for this request */
  skipAuth?: boolean
  /** Whether to retry on 401 errors */
  retryOn401?: boolean
  /** Cancel token source for request cancellation */
  cancelTokenSource?: CancelTokenSource
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
  /** The axios request config */
  config: InternalAxiosRequestConfig
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
  /** The axios response */
  response: AxiosResponse<T>
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
 * Uses axios for enhanced HTTP capabilities.
 */
export class ApiClient {
  private axiosInstance: AxiosInstance
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

    // Create axios instance with base configuration
    this.axiosInstance = axios.create({
      baseURL: this.config.baseUrl,
      timeout: this.config.timeout,
      headers: this.config.defaultHeaders,
    })

    // Add default interceptors
    this.addDefaultInterceptors()
  }

  /**
   * Adds default request and response interceptors using axios interceptors
   */
  private addDefaultInterceptors(): void {
    // Axios request interceptor for token attachment
    this.axiosInstance.interceptors.request.use(
      async (config: InternalAxiosRequestConfig) => {
        const requestId = this.generateRequestId()
        const timestamp = Date.now()

        // Add request ID to headers for tracking
        config.headers['X-Request-ID'] = requestId

        // Create request context for custom interceptors
        const requestContext: RequestContext = {
          config,
          requestId,
          timestamp,
        }

        // Process through custom request interceptors
        const processedContext =
          await this.processRequestInterceptors(requestContext)

        // Handle token attachment if required
        if (this.config.requiresAuth && !config.skipAuth) {
          try {
            const token = await useTokenStore.getState().getValidToken()
            processedContext.config.headers.Authorization = `Bearer ${token}`
          } catch (error) {
            throw createApiError(
              'AUTH_FAILED',
              'Failed to obtain valid token for API request',
              401,
              error
            )
          }
        }

        return processedContext.config
      },
      (error) => {
        return Promise.reject(this.transformError(error))
      }
    )

    // Axios response interceptor for success handling and 401 retry
    this.axiosInstance.interceptors.response.use(
      async (response: AxiosResponse) => {
        const requestId = response.config.headers['X-Request-ID'] as string
        const timestamp = parseInt(
          (response.config.headers['X-Request-Timestamp'] as string) || '0'
        )

        // Create response context for custom interceptors
        const responseContext: ResponseContext = {
          request: {
            config: response.config,
            requestId,
            timestamp,
          },
          response,
          duration: Date.now() - timestamp,
        }

        // Process through custom response interceptors
        const processedContext =
          await this.processResponseInterceptors(responseContext)

        return processedContext.response
      },
      async (error: AxiosError) => {
        // Handle 401 errors with token refresh and retry
        if (
          error.response?.status === 401 &&
          !error.config?.retryOn401 === false
        ) {
          try {
            await useTokenStore.getState().refreshToken()

            // Clone the config for retry
            const retryConfig = { ...error.config, retryOn401: false }
            return this.axiosInstance.request(retryConfig)
          } catch (refreshError) {
            throw createApiError(
              'AUTH_FAILED',
              'Token refresh failed during 401 retry',
              401,
              refreshError
            )
          }
        }

        // Transform and process other errors
        const transformedError = this.transformError(error)

        if (error.config) {
          const requestContext: RequestContext = {
            config: error.config,
            requestId:
              (error.config.headers?.['X-Request-ID'] as string) || 'unknown',
            timestamp: Date.now(),
          }

          return await this.processErrorInterceptors(
            transformedError,
            requestContext
          )
        }

        throw transformedError
      }
    )
  }

  /**
   * Transforms axios errors to our AuthError format
   */
  private transformError(error: unknown): AuthError {
    if (isAxiosError(error)) {
      if (error.response) {
        // HTTP error response
        return createApiError(
          error.response.status === 401
            ? 'AUTH_FAILED'
            : error.response.status >= 500
              ? 'NETWORK_ERROR'
              : 'INVALID_RESPONSE',
          `HTTP ${error.response.status}: ${error.response.statusText}`,
          error.response.status
        )
      } else if (error.request) {
        // Network error
        return createApiError(
          'NETWORK_ERROR',
          'Network request failed',
          undefined,
          error
        )
      } else if (error.code === 'ECONNABORTED') {
        // Timeout error
        return createApiError('NETWORK_ERROR', 'Request timeout', 408, error)
      }
    }

    // Check if it's already an AuthError
    if (
      error &&
      typeof error === 'object' &&
      'type' in error &&
      'timestamp' in error
    ) {
      return error as AuthError
    }

    // Unknown error
    return createApiError(
      'UNKNOWN_ERROR',
      error instanceof Error ? error.message : 'Unknown error occurred',
      undefined,
      error
    )
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
   * Makes an HTTP request using axios with automatic token attachment and error handling
   */
  async request<T = unknown>(
    endpoint: string,
    options: ApiRequestOptions = {}
  ): Promise<ApiResponse<T>> {
    try {
      // Prepare axios config
      const axiosConfig: AxiosRequestConfig = {
        url: endpoint,
        ...options,
        // Add timestamp for request tracking
        headers: {
          ...options.headers,
          'X-Request-Timestamp': Date.now().toString(),
        },
      }

      // Make the request using axios
      const response = await this.axiosInstance.request<T>(axiosConfig)

      // Transform axios response to our ApiResponse format
      const apiResponse: ApiResponse<T> = {
        data: response.data,
        status: response.status,
        headers: Object.fromEntries(
          Object.entries(response.headers).map(([key, value]) => [
            key,
            Array.isArray(value) ? value.join(', ') : String(value),
          ])
        ),
        ok: response.status >= 200 && response.status < 300,
      }

      return apiResponse
    } catch (error) {
      // Transform and throw the error
      throw this.transformError(error)
    }
  }

  /**
   * Convenience method for GET requests
   */
  async get<T = unknown>(
    endpoint: string,
    options?: Omit<ApiRequestOptions, 'method' | 'data'>
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...options, method: 'GET' })
  }

  /**
   * Convenience method for POST requests
   */
  async post<T = unknown>(
    endpoint: string,
    data?: unknown,
    options?: Omit<ApiRequestOptions, 'method' | 'data'>
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'POST',
      data,
    })
  }

  /**
   * Convenience method for PUT requests
   */
  async put<T = unknown>(
    endpoint: string,
    data?: unknown,
    options?: Omit<ApiRequestOptions, 'method' | 'data'>
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'PUT',
      data,
    })
  }

  /**
   * Convenience method for PATCH requests
   */
  async patch<T = unknown>(
    endpoint: string,
    data?: unknown,
    options?: Omit<ApiRequestOptions, 'method' | 'data'>
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'PATCH',
      data,
    })
  }

  /**
   * Convenience method for DELETE requests
   */
  async delete<T = unknown>(
    endpoint: string,
    options?: Omit<ApiRequestOptions, 'method' | 'data'>
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...options, method: 'DELETE' })
  }
}

/**
 * Pre-configured API client for backend services
 * Uses BACKEND_API_URL and includes automatic token attachment
 */
export const backendApiClient = new ApiClient({
  baseUrl: process.env.NEXT_PUBLIC_BACKEND_API_URL || '',
  requiresAuth: true,
  defaultHeaders: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    usersystemid: process.env.NEXT_PUBLIC_USER_SYSTEM_ID || '',
  },
})

/**
 * Pre-configured API client for local/public APIs
 * Uses NEXT_PUBLIC_API_URL and doesn't require authentication
 */
export const localApiClient = new ApiClient({
  baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
  requiresAuth: false,
})

/**
 * Default export is the backend API client for authenticated requests
 */
export default backendApiClient
