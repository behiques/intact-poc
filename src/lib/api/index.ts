import { MockApiClient } from './mock-client'
import { ApiClient } from './api-client'
import { realTokenProvider } from '@/lib/auth/real-token-provider'
import { env } from '@/utils/env'
import type { ApiClientInterface } from './types'

/**
 * Determines if mock API should be used based on environment
 */
const shouldUseMockApi = (): boolean => {
  // Check environment variable first
  if (process.env.NEXT_PUBLIC_USE_MOCK_API === 'true') {
    return true
  }

  // Use mock in development by default if backend is not accessible
  if (process.env.NODE_ENV === 'development') {
    // Could add additional logic here to check backend availability
    return true
  }

  // Always use mock in test environment
  if (process.env.NODE_ENV === 'test') {
    return true
  }

  return false
}

/**
 * Creates the appropriate API client based on environment
 */
const createApiClient = (): ApiClientInterface => {
  if (shouldUseMockApi()) {
    console.log('🔧 Using Mock API Client')
    return new MockApiClient({ delay: 200 }) // Add some delay to simulate network
  }

  console.log('🌐 Using Real API Client')
  return new ApiClient({
    baseUrl: env.BACKEND_API_URL,
    tokenProvider: realTokenProvider,
  })
}

/**
 * Singleton API client instance
 * Automatically switches between mock and real implementations based on environment
 */
export const apiClient: ApiClientInterface = createApiClient()

/**
 * Export types for use in features
 */
export type {
  ApiClientInterface,
  ApiResponse,
  ApiError,
  ApiRequestOptions,
} from './types'

/**
 * Export specific clients if needed for testing or special cases
 */
export { MockApiClient } from './mock-client'
export { ApiClient } from './api-client'

/**
 * Helper to check if using mock API
 */
export const isUsingMockApi = shouldUseMockApi
