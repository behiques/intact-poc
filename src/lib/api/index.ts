import { MockApiClient } from './mock-client'
import { ApiClient } from './api-client'
import { realTokenProvider } from '@/lib/auth/real-token-provider'
import type { ApiClientInterface } from './types'

/**
 * Determines if mock API should be used based on environment
 */
const shouldUseMockApi = (): boolean => {
  // Check environment variable first - this is the primary control
  if (process.env.NEXT_PUBLIC_USE_MOCK_API === 'true') {
    return true
  }

  // If explicitly set to false, use real API
  if (process.env.NEXT_PUBLIC_USE_MOCK_API === 'false') {
    return false
  }

  // Always use mock in test environment
  if (process.env.NODE_ENV === 'test') {
    return true
  }

  // Default to mock only if NEXT_PUBLIC_USE_MOCK_API is not set at all
  // This maintains backward compatibility for environments without the variable
  return process.env.NODE_ENV === 'development'
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
    baseUrl: process.env.NEXT_PUBLIC_API_URL || '',
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
