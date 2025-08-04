/**
 * Common types for API client implementations
 */

/**
 * API Request Options
 */
export interface ApiRequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
  headers?: Record<string, string>
  params?: Record<string, unknown>
  data?: unknown
  skipAuth?: boolean
  signal?: AbortSignal
}

/**
 * API Response wrapper
 */
export interface ApiResponse<T = unknown> {
  data: T
  status: number
  headers: Record<string, string>
  ok: boolean
}

/**
 * API Error structure
 */
export interface ApiError {
  type: 'AUTH_FAILED' | 'NETWORK_ERROR' | 'INVALID_RESPONSE' | 'UNKNOWN_ERROR'
  message: string
  statusCode?: number
  timestamp: number
  originalError?: unknown
}

/**
 * Token Provider Interface
 */
export interface TokenProvider {
  getToken(): Promise<string>
  isValid(): boolean
  refresh(): Promise<string>
}

/**
 * API Client Interface
 */
export interface ApiClient {
  request<T = unknown>(
    endpoint: string,
    options?: ApiRequestOptions
  ): Promise<ApiResponse<T>>

  get<T = unknown>(
    endpoint: string,
    options?: Omit<ApiRequestOptions, 'method' | 'data'>
  ): Promise<ApiResponse<T>>

  post<T = unknown>(
    endpoint: string,
    data?: unknown,
    options?: Omit<ApiRequestOptions, 'method' | 'data'>
  ): Promise<ApiResponse<T>>

  put<T = unknown>(
    endpoint: string,
    data?: unknown,
    options?: Omit<ApiRequestOptions, 'method' | 'data'>
  ): Promise<ApiResponse<T>>

  patch<T = unknown>(
    endpoint: string,
    data?: unknown,
    options?: Omit<ApiRequestOptions, 'method' | 'data'>
  ): Promise<ApiResponse<T>>

  delete<T = unknown>(
    endpoint: string,
    options?: Omit<ApiRequestOptions, 'method' | 'data'>
  ): Promise<ApiResponse<T>>
}

/**
 * API Client Configuration
 */
export interface ApiClientConfig {
  baseUrl: string
  tokenProvider?: TokenProvider
  defaultHeaders?: Record<string, string>
  timeout?: number
}
