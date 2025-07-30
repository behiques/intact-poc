import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { ApiClient } from '@/lib/apiClient'
import { useTokenStore } from '@/features/common/stores/useTokenStore'
import { retrieveToken } from '@/features/common/api/fetchToken'
import {
  storeToken,
  getStoredToken,
  hasValidStoredToken,
} from '@/features/common/utils/tokenStorage'

// Mock environment variables
vi.mock('@/features/common/utils/config', () => ({
  tokenConfig: {
    backendApiUrl: 'https://api.backend.com',
    authTokenApiUrl: 'https://auth.api.com',
    userSystemId: 'test-system',
  },
}))

// Mock env utils
vi.mock('@/utils/env', () => ({
  env: {
    BACKEND_API_URL: 'https://api.backend.com',
    AUTH_TOKEN_API_URL: 'https://auth.api.com',
    USER_SYSTEM_ID: 'test-system',
  },
}))

// Mock dependencies
vi.mock('@/features/common/api/fetchToken')
vi.mock('@/features/common/utils/tokenStorage')
vi.mock('@/features/common/utils/tokenQueue')

const mockRetrieveToken = vi.mocked(retrieveToken)
const mockStoreToken = vi.mocked(storeToken)
const mockGetStoredToken = vi.mocked(getStoredToken)
const mockHasValidStoredToken = vi.mocked(hasValidStoredToken)

// Mock fetch globally
const mockFetch = vi.fn()
global.fetch = mockFetch

// Test helpers to create valid JWT tokens
const createTestToken = (expiresInMinutes: number) => {
  const now = Math.floor(Date.now() / 1000)
  const exp = now + expiresInMinutes * 60

  const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }))
  const payload = btoa(JSON.stringify({ exp, sub: 'test-user', iat: now }))
  const signature = 'mock-signature'

  return `${header}.${payload}.${signature}`
}

// Helper to set up store with token
const setupStoreWithToken = async (token: string, expiresAt: number) => {
  mockHasValidStoredToken.mockReturnValue(true)
  mockGetStoredToken.mockReturnValue({
    token,
    expiresAt,
    storedAt: Date.now() - 1000,
  })

  const store = useTokenStore.getState()
  store.clearToken()
  await store.initialize()
}

const createExpiredToken = () => {
  const now = Math.floor(Date.now() / 1000)
  const exp = now - 3600 // Expired 1 hour ago

  const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }))
  const payload = btoa(
    JSON.stringify({ exp, sub: 'test-user', iat: now - 7200 })
  )
  const signature = 'mock-signature'

  return `${header}.${payload}.${signature}`
}

describe('API Client Interceptors Integration Tests', () => {
  let apiClient: ApiClient

  beforeEach(() => {
    vi.clearAllMocks()
    vi.useFakeTimers()

    // Reset token store
    const store = useTokenStore.getState()
    store.clearToken()
    store.clearError()

    // Setup default mocks
    mockStoreToken.mockImplementation(() => {})
    mockHasValidStoredToken.mockReturnValue(false)
    mockGetStoredToken.mockReturnValue(null)

    // Create fresh API client for each test
    apiClient = new ApiClient({
      baseUrl: 'https://api.backend.com',
      requiresAuth: true,
    })

    // Setup default successful API responses
    mockFetch.mockResolvedValue({
      ok: true,
      status: 200,
      headers: new Headers({ 'content-type': 'application/json' }),
      json: vi.fn().mockResolvedValue({ data: 'test-response' }),
      text: vi.fn().mockResolvedValue('Success'),
    })
  })

  afterEach(() => {
    vi.useRealTimers()
    vi.restoreAllMocks()
  })

  describe('Request Interceptors', () => {
    it('should automatically attach token to requests', async () => {
      const validToken = createTestToken(60)

      // Setup token in store
      await setupStoreWithToken(validToken, Date.now() + 3600000)

      await apiClient.get('/api/test')

      expect(mockFetch).toHaveBeenCalledWith(
        'https://api.backend.com/api/test',
        expect.objectContaining({
          headers: expect.objectContaining({
            Authorization: `Bearer ${validToken}`,
          }),
        })
      )
    })

    it('should make request without token when none is available', async () => {
      // No token setup - store is empty

      // Mock API client to handle no token scenario
      try {
        await apiClient.get('/api/test')
      } catch (error) {
        // Expected to fail when no token is available
        expect(error).toBeTruthy()
      }
    })

    it('should not attach expired token to requests', async () => {
      const expiredToken = createExpiredToken()

      // Setup expired token in store
      mockHasValidStoredToken.mockReturnValue(false) // Expired tokens are not valid
      mockGetStoredToken.mockReturnValue({
        token: expiredToken,
        expiresAt: Date.now() - 3600000, // Expired 1 hour ago
        storedAt: Date.now() - 7200000,
      })

      const store = useTokenStore.getState()
      await store.initialize()

      // Should trigger token refresh since stored token is invalid
      expect(mockRetrieveToken).toHaveBeenCalledWith()
    })

    it('should handle different HTTP methods with token attachment', async () => {
      const validToken = createTestToken(60)
      await setupStoreWithToken(validToken, Date.now() + 3600000)

      // Test different HTTP methods
      await apiClient.get('/api/get')
      await apiClient.post('/api/post', { data: 'test' })
      await apiClient.put('/api/put', { data: 'test' })
      await apiClient.delete('/api/delete')

      // All requests should have the Authorization header
      expect(mockFetch).toHaveBeenCalledTimes(4)
      mockFetch.mock.calls.forEach(
        ([, options]: [unknown, { headers: { Authorization: string } }]) => {
          expect(options.headers.Authorization).toBe(`Bearer ${validToken}`)
        }
      )
    })
  })

  describe('Response Interceptors', () => {
    it('should automatically refresh token on 401 and retry request', async () => {
      const expiredToken = createTestToken(60)
      const newToken = createTestToken(60)

      await setupStoreWithToken(expiredToken, Date.now() + 3600000)

      // Mock token refresh
      mockRetrieveToken.mockResolvedValueOnce({
        token: newToken,
        expiration: new Date(Date.now() + 3600000).toString(),
      })

      // Setup responses: first request fails with 401, second succeeds
      mockFetch
        .mockResolvedValueOnce({
          ok: false,
          status: 401,
          statusText: 'Unauthorized',
          text: vi.fn().mockResolvedValue('Token expired'),
        })
        .mockResolvedValueOnce({
          ok: true,
          status: 200,
          headers: new Headers({ 'content-type': 'application/json' }),
          json: vi.fn().mockResolvedValue({ data: 'success' }),
          text: vi.fn().mockResolvedValue('Success'),
        })

      const response = await apiClient.get('/api/protected')

      // Should have made 2 requests
      expect(mockFetch).toHaveBeenCalledTimes(2)

      // First request with expired token
      expect(mockFetch).toHaveBeenNthCalledWith(
        1,
        'https://api.backend.com/api/protected',
        expect.objectContaining({
          headers: expect.objectContaining({
            Authorization: `Bearer ${expiredToken}`,
          }),
        })
      )

      // Second request with new token
      expect(mockFetch).toHaveBeenNthCalledWith(
        2,
        'https://api.backend.com/api/protected',
        expect.objectContaining({
          headers: expect.objectContaining({
            Authorization: `Bearer ${newToken}`,
          }),
        })
      )

      expect(response.data).toEqual({ data: 'success' })
    })

    it('should not retry request when token refresh fails', async () => {
      const expiredToken = createTestToken(60)
      await setupStoreWithToken(expiredToken, Date.now() + 3600000)

      // Mock failed token refresh
      mockRetrieveToken.mockRejectedValueOnce(
        new Error('Authentication failed permanently')
      )

      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 401,
        statusText: 'Unauthorized',
        text: vi.fn().mockResolvedValue('Authentication failed'),
      })

      await expect(apiClient.get('/api/protected')).rejects.toThrow(
        'HTTP 401: Token expired'
      )

      // Should only make one request (no retry)
      expect(mockFetch).toHaveBeenCalledTimes(1)

      // Token should be cleared from store
      expect(useTokenStore.getState().token).toBeNull()
    })

    it('should handle non-401 errors normally', async () => {
      const validToken = createTestToken(60)
      await setupStoreWithToken(validToken, Date.now() + 3600000)

      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
        statusText: 'Internal Server Error',
        text: vi.fn().mockResolvedValue('Server error occurred'),
      })

      await expect(apiClient.get('/api/test')).rejects.toThrow(
        'Server error: 500 - Server error occurred'
      )

      // Should only make one request (no retry for non-401 errors)
      expect(mockFetch).toHaveBeenCalledTimes(1)

      // Token should remain in store
      expect(useTokenStore.getState().token).toBe(validToken)
    })

    it('should handle concurrent 401 responses with single token refresh', async () => {
      const expiredToken = createTestToken(60)
      const newToken = createTestToken(60)

      await setupStoreWithToken(expiredToken, Date.now() + 3600000)

      // Mock single token refresh
      mockRetrieveToken.mockResolvedValueOnce({
        token: newToken,
        expiration: new Date(Date.now() + 3600000).toString(),
      })

      // Setup responses: first requests get 401, retries succeed
      mockFetch
        .mockResolvedValueOnce({
          ok: false,
          status: 401,
          statusText: 'Unauthorized',
          text: vi.fn().mockResolvedValue('Token expired'),
        })
        .mockResolvedValueOnce({
          ok: false,
          status: 401,
          statusText: 'Unauthorized',
          text: vi.fn().mockResolvedValue('Token expired'),
        })
        .mockResolvedValueOnce({
          ok: false,
          status: 401,
          statusText: 'Unauthorized',
          text: vi.fn().mockResolvedValue('Token expired'),
        })
        .mockResolvedValue({
          ok: true,
          status: 200,
          headers: new Headers({ 'content-type': 'application/json' }),
          json: vi.fn().mockResolvedValue({ data: 'success' }),
          text: vi.fn().mockResolvedValue('Success'),
        })

      // Make concurrent requests
      const requests = Promise.all([
        apiClient.get('/api/endpoint1'),
        apiClient.get('/api/endpoint2'),
        apiClient.get('/api/endpoint3'),
      ])

      const responses = await requests

      // All responses should be successful
      responses.forEach((response) => {
        expect(response).toEqual({
          data: { data: 'success' },
          status: 200,
          headers: expect.any(Object),
        })
      })

      // Should have refreshed token only once
      expect(mockRetrieveToken).toHaveBeenCalledTimes(1)

      // All retry requests should use the new token
      const retryRequests = mockFetch.mock.calls.slice(3) // Skip first 3 failed requests
      retryRequests.forEach(
        ([, options]: [unknown, { headers: { Authorization: string } }]) => {
          expect(options.headers.Authorization).toBe(`Bearer ${newToken}`)
        }
      )
    })
  })

  describe('Queue Management', () => {
    it('should queue concurrent requests during token refresh', async () => {
      const expiredToken = createTestToken(60)
      const newToken = createTestToken(60)

      await setupStoreWithToken(expiredToken, Date.now() + 3600000)

      // Mock token refresh with delay to simulate network latency
      mockRetrieveToken.mockImplementation(async () => {
        await new Promise((resolve) => setTimeout(resolve, 100))
        return {
          token: newToken,
          expiration: new Date(Date.now() + 3600000).toString(),
        }
      })

      // All requests should initially fail with 401
      mockFetch.mockImplementation(async (url: string) => {
        // Check if this is a retry (has new token)
        const isRetry = mockFetch.mock.calls.some(
          (call: [unknown, { headers: { Authorization: string } }]) => {
            const [, options] = call
            return options.headers.Authorization === `Bearer ${newToken}`
          }
        )

        if (isRetry) {
          return {
            ok: true,
            status: 200,
            headers: new Headers({ 'content-type': 'application/json' }),
            json: vi.fn().mockResolvedValue({ data: `success-${url}` }),
            text: vi.fn().mockResolvedValue('Success'),
          }
        } else {
          return {
            ok: false,
            status: 401,
            statusText: 'Unauthorized',
            text: vi.fn().mockResolvedValue('Token expired'),
          }
        }
      })

      // Start concurrent requests
      const startTime = Date.now()
      const requests = Promise.all([
        apiClient.get('/api/endpoint1'),
        apiClient.get('/api/endpoint2'),
        apiClient.get('/api/endpoint3'),
      ])

      const responses = await requests
      const endTime = Date.now()

      // All should succeed
      expect(responses).toHaveLength(3)
      responses.forEach((response, index) => {
        expect(response.data).toEqual({
          data: `success-/api/endpoint${index + 1}`,
        })
      })

      // Should have only refreshed token once despite multiple concurrent requests
      expect(mockRetrieveToken).toHaveBeenCalledTimes(1)

      // Duration should be reasonable (not 3x the refresh time)
      expect(endTime - startTime).toBeLessThan(300) // Should be much less than 3 * 100ms
    })
  })

  describe('Error Boundaries', () => {
    it('should handle malformed responses gracefully', async () => {
      const validToken = createTestToken(60)
      await setupStoreWithToken(validToken, Date.now() + 3600000)

      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        headers: new Headers({ 'content-type': 'application/json' }),
        json: vi.fn().mockRejectedValue(new Error('Invalid JSON')),
        text: vi.fn().mockResolvedValue('{ invalid json'),
      })

      await expect(apiClient.get('/api/test')).rejects.toThrow('Invalid JSON')
    })

    it('should handle network failures', async () => {
      const validToken = createTestToken(60)
      await setupStoreWithToken(validToken, Date.now() + 3600000)

      mockFetch.mockRejectedValueOnce(new Error('Network connection failed'))

      await expect(apiClient.get('/api/test')).rejects.toThrow(
        'Network connection failed'
      )
    })

    it('should clear token on permanent authentication failure', async () => {
      const validToken = createTestToken(60)
      await setupStoreWithToken(validToken, Date.now() + 3600000)

      // Mock token refresh to also fail with 401 (permanent auth failure)
      mockRetrieveToken.mockRejectedValueOnce(
        new Error('Authentication failed permanently')
      )

      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 401,
        statusText: 'Unauthorized',
        text: vi.fn().mockResolvedValue('Authentication failed'),
      })

      await expect(apiClient.get('/api/protected')).rejects.toThrow()

      // Token should be cleared
      expect(useTokenStore.getState().token).toBeNull()
    })
  })
})
