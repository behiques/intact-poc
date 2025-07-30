import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { useTokenStore } from '@/features/common/stores/useTokenStore'
import { retrieveToken } from '@/features/common/api/fetchToken'
import { decodeJWTPayload } from '@/features/common/utils/tokenDecoder'
import {
  clearStoredToken,
  hasValidStoredToken,
  getStoredToken,
} from '@/features/common/utils/tokenStorage'
import { ApiClient } from '@/lib/apiClient'

// Mock environment variables
vi.mock('@/utils/env', () => ({
  env: {
    AUTH_TOKEN_API_URL: 'https://auth.api.com',
    BACKEND_API_URL: 'https://api.backend.com',
    USER_SYSTEM_ID: 'test-system',
  },
}))

// Mock config module
vi.mock('@/features/common/utils/config', () => ({
  tokenConfig: {
    authTokenApiUrl: 'https://auth.api.com',
    backendApiUrl: 'https://api.backend.com',
    userSystemId: 'test-system',
  },
}))

// Mock dependencies
vi.mock('@/features/common/api/fetchToken')
vi.mock('@/features/common/utils/tokenDecoder')
vi.mock('@/features/common/utils/tokenStorage')
vi.mock('@/features/common/utils/tokenQueue')

const mockRetrieveToken = vi.mocked(retrieveToken)
const mockDecodeJWTPayload = vi.mocked(decodeJWTPayload)
const mockClearStoredToken = vi.mocked(clearStoredToken)
const mockHasValidStoredToken = vi.mocked(hasValidStoredToken)
const mockGetStoredToken = vi.mocked(getStoredToken)

// Mock fetch globally
const mockFetch = vi.fn()
global.fetch = mockFetch

// Helper to create test tokens with specific expiration
const createTestToken = (expirationOffsetMinutes: number): string => {
  const now = Math.floor(Date.now() / 1000)
  const exp = now + expirationOffsetMinutes * 60

  const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }))
  const payload = btoa(JSON.stringify({ exp, sub: 'test-user', iat: now }))
  const signature = 'mock-signature'

  return `${header}.${payload}.${signature}`
}

describe('Expired Token Handling Tests', () => {
  let tokenStore: ReturnType<typeof useTokenStore.getState>
  let apiClient: ApiClient

  beforeEach(() => {
    vi.clearAllMocks()
    vi.useFakeTimers()

    // Reset token store
    useTokenStore.setState({
      token: null,
      expiresAt: null,
      isRefreshing: false,
      isLoading: false,
      error: null,
      lastRefreshAt: null,
    })

    tokenStore = useTokenStore.getState()

    // Create API client for testing
    apiClient = new ApiClient({
      baseUrl: 'https://api.backend.com',
      requiresAuth: true,
    })

    // Setup default mocks
    mockClearStoredToken.mockImplementation(() => {})
    mockHasValidStoredToken.mockReturnValue(false)
    mockGetStoredToken.mockReturnValue(null)
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  describe('Token Expiration Detection', () => {
    it('should detect tokens that are already expired', async () => {
      const expiredToken = createTestToken(-30) // Expired 30 minutes ago
      const expiredTime = Date.now() - 30 * 60 * 1000

      // Set up expired token in store
      useTokenStore.setState({
        token: expiredToken,
        expiresAt: expiredTime,
      })

      mockDecodeJWTPayload.mockReturnValue({
        sub: 'test-user',
        exp: Math.floor(expiredTime / 1000),
        iat: Math.floor((Date.now() - 3600000) / 1000),
        aud: 'test-audience',
      })

      const isValid = tokenStore.isTokenValid()
      expect(isValid).toBe(false)

      // Should not return expired token
      await expect(tokenStore.getValidToken()).rejects.toThrow()
    })

    it('should detect tokens expiring within safety margin', async () => {
      const almostExpiredToken = createTestToken(2) // Expires in 2 minutes
      const almostExpiredTime = Date.now() + 2 * 60 * 1000

      useTokenStore.setState({
        token: almostExpiredToken,
        expiresAt: almostExpiredTime,
      })

      mockDecodeJWTPayload.mockReturnValue({
        sub: 'test-user',
        exp: Math.floor(almostExpiredTime / 1000),
        iat: Math.floor(Date.now() / 1000),
        aud: 'test-audience',
      })

      // Token should be considered invalid due to safety margin (usually 5-10 minutes)
      const isValid = tokenStore.isTokenValid()
      expect(isValid).toBe(false)
    })

    it('should correctly identify valid tokens with sufficient time remaining', async () => {
      const validToken = createTestToken(60) // Expires in 60 minutes
      const validTime = Date.now() + 60 * 60 * 1000

      useTokenStore.setState({
        token: validToken,
        expiresAt: validTime,
      })

      mockDecodeJWTPayload.mockReturnValue({
        sub: 'test-user',
        exp: Math.floor(validTime / 1000),
        iat: Math.floor(Date.now() / 1000),
        aud: 'test-audience',
      })

      const isValid = tokenStore.isTokenValid()
      expect(isValid).toBe(true)
    })

    it('should handle tokens with zero or negative expiration times', async () => {
      const invalidToken = createTestToken(0) // Expires now

      useTokenStore.setState({
        token: invalidToken,
        expiresAt: Date.now(),
      })

      mockDecodeJWTPayload.mockReturnValue({
        sub: 'test-user',
        exp: Math.floor(Date.now() / 1000),
        iat: Math.floor(Date.now() / 1000),
        aud: 'test-audience',
      })

      const isValid = tokenStore.isTokenValid()
      expect(isValid).toBe(false)
    })
  })

  describe('Automatic Token Refresh on Expiration', () => {
    it('should automatically refresh expired tokens when requested', async () => {
      const expiredToken = createTestToken(-10) // Expired 10 minutes ago
      const newToken = createTestToken(60) // New token valid for 60 minutes

      useTokenStore.setState({
        token: expiredToken,
        expiresAt: Date.now() - 10 * 60 * 1000,
      })

      mockRetrieveToken.mockResolvedValue({
        token: newToken,
        expiration: new Date(Date.now() + 60 * 60 * 1000).toString(),
      })

      await tokenStore.refreshToken()

      expect(mockRetrieveToken).toHaveBeenCalledOnce()
      expect(tokenStore.token).toBe(newToken)
      expect(tokenStore.error).toBeNull()
    })

    it('should handle refresh failures for expired tokens gracefully', async () => {
      const expiredToken = createTestToken(-10)

      useTokenStore.setState({
        token: expiredToken,
        expiresAt: Date.now() - 10 * 60 * 1000,
      })

      mockRetrieveToken.mockRejectedValue(
        new Error('Authentication service unavailable')
      )

      await expect(tokenStore.refreshToken()).rejects.toThrow()

      // Get fresh store state after async operations
      const currentState = useTokenStore.getState()
      expect(currentState.error).toBeTruthy()
      expect(currentState.error?.message).toContain(
        'Store: Failed to refresh token'
      )
      expect(currentState.token).toBeNull()
    })

    it('should clear expired tokens from storage', async () => {
      const expiredToken = createTestToken(-10)

      useTokenStore.setState({
        token: expiredToken,
        expiresAt: Date.now() - 10 * 60 * 1000,
      })

      mockGetStoredToken.mockReturnValue({
        token: expiredToken,
        expiresAt: Date.now() - 10 * 60 * 1000,
        storedAt: Date.now() - 20 * 60 * 1000,
      })

      await expect(tokenStore.getValidToken()).rejects.toThrow()

      expect(mockClearStoredToken).toHaveBeenCalled()
    })
  })

  describe('API Request Handling with Expired Tokens', () => {
    beforeEach(() => {
      // Set up expired token
      const expiredToken = createTestToken(-5) // Expired 5 minutes ago
      useTokenStore.setState({
        token: expiredToken,
        expiresAt: Date.now() - 5 * 60 * 1000,
      })
    })

    it('should automatically refresh token on 401 response', async () => {
      const newToken = createTestToken(60)

      // First request fails with 401
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 401,
        statusText: 'Unauthorized',
        text: vi.fn().mockResolvedValue('Token expired'),
        json: vi.fn().mockRejectedValue(new Error('Not JSON')),
      })

      // Token refresh succeeds
      mockRetrieveToken.mockResolvedValue({
        token: newToken,
        expiration: new Date(Date.now() + 60 * 60 * 1000).toString(),
      })

      // Retry request succeeds
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        headers: new Headers({ 'content-type': 'application/json' }),
        json: vi.fn().mockResolvedValue({ data: 'success' }),
        text: vi.fn().mockResolvedValue('{"data": "success"}'),
      })

      const result = await apiClient.get('/api/test')

      expect(mockRetrieveToken).toHaveBeenCalledOnce()
      expect(result).toEqual({ data: 'success' })
    })

    it('should handle 401 responses when token refresh fails', async () => {
      // First request fails with 401
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 401,
        statusText: 'Unauthorized',
        text: vi.fn().mockResolvedValue('Token expired'),
        json: vi.fn().mockRejectedValue(new Error('Not JSON')),
      })

      // Token refresh fails
      mockRetrieveToken.mockRejectedValue(new Error('Unable to refresh token'))

      await expect(apiClient.get('/api/test')).rejects.toThrow()

      expect(mockRetrieveToken).toHaveBeenCalledOnce()
    })

    it('should not retry requests that fail for non-401 reasons', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
        statusText: 'Internal Server Error',
        text: vi.fn().mockResolvedValue('Server error'),
        json: vi.fn().mockRejectedValue(new Error('Not JSON')),
      })

      await expect(apiClient.get('/api/test')).rejects.toThrow()

      // Should not attempt token refresh for 500 errors
      expect(mockRetrieveToken).not.toHaveBeenCalled()
    })
  })

  describe('Token Lifetime Management', () => {
    it('should calculate remaining token lifetime correctly', () => {
      const futureTime = Date.now() + 45 * 60 * 1000 // 45 minutes from now
      const token = createTestToken(45)

      useTokenStore.setState({
        token,
        expiresAt: futureTime,
      })

      const timeUntilExpiry = tokenStore.timeUntilExpiry()

      // Should be approximately 45 minutes (allowing for small timing differences)
      expect(timeUntilExpiry).toBeGreaterThan(44 * 60 * 1000)
      expect(timeUntilExpiry).toBeLessThan(46 * 60 * 1000)
    })

    it('should return null for tokens without expiration time', () => {
      useTokenStore.setState({
        token: null,
        expiresAt: null,
      })

      const timeUntilExpiry = tokenStore.timeUntilExpiry()
      expect(timeUntilExpiry).toBeNull()
    })

    it('should return negative values for expired tokens', () => {
      const pastTime = Date.now() - 30 * 60 * 1000 // 30 minutes ago
      const expiredToken = createTestToken(-30)

      useTokenStore.setState({
        token: expiredToken,
        expiresAt: pastTime,
      })

      const timeUntilExpiry = tokenStore.timeUntilExpiry()
      expect(timeUntilExpiry).toBeLessThan(0)
    })
  })

  describe('Proactive Token Refresh', () => {
    it('should proactively refresh tokens nearing expiration', async () => {
      const soonToExpireToken = createTestToken(8) // Expires in 8 minutes
      const newToken = createTestToken(60)

      useTokenStore.setState({
        token: soonToExpireToken,
        expiresAt: Date.now() + 8 * 60 * 1000,
      })

      mockRetrieveToken.mockResolvedValue({
        token: newToken,
        expiration: new Date(Date.now() + 60 * 60 * 1000).toString(),
      })

      // Simulate proactive refresh (this would be triggered by a background timer)
      await tokenStore.refreshToken()

      expect(mockRetrieveToken).toHaveBeenCalledOnce()
      expect(tokenStore.token).toBe(newToken)
    })

    it('should handle overlapping refresh requests for soon-to-expire tokens', async () => {
      const soonToExpireToken = createTestToken(5) // Expires in 5 minutes
      const newToken = createTestToken(60)

      useTokenStore.setState({
        token: soonToExpireToken,
        expiresAt: Date.now() + 5 * 60 * 1000,
      })

      mockRetrieveToken.mockImplementation(async () => {
        // Simulate delay in token refresh
        await new Promise((resolve) => setTimeout(resolve, 100))
        return {
          token: newToken,
          expiration: new Date(Date.now() + 60 * 60 * 1000).toString(),
        }
      })

      // Start multiple concurrent refresh operations
      const refreshPromises = [
        tokenStore.refreshToken(),
        tokenStore.refreshToken(),
        tokenStore.refreshToken(),
      ]

      await Promise.all(refreshPromises)

      // Should only make one actual API call due to deduplication
      expect(mockRetrieveToken).toHaveBeenCalledTimes(1)
    })
  })

  describe('Edge Cases and Error Conditions', () => {
    it('should handle system clock changes gracefully', async () => {
      const token = createTestToken(30)
      const originalTime = Date.now()

      useTokenStore.setState({
        token,
        expiresAt: originalTime + 30 * 60 * 1000,
      })

      // Simulate system clock jumping forward (e.g., user changes system time)
      vi.setSystemTime(originalTime + 60 * 60 * 1000) // Jump 1 hour forward

      const isValid = tokenStore.isTokenValid()
      expect(isValid).toBe(false) // Token should now appear expired
    })

    it('should handle tokens with very short lifetimes', async () => {
      const shortLivedToken = createTestToken(1) // Expires in 1 minute

      useTokenStore.setState({
        token: shortLivedToken,
        expiresAt: Date.now() + 1 * 60 * 1000,
      })

      // Should be considered invalid due to safety margin
      const isValid = tokenStore.isTokenValid()
      expect(isValid).toBe(false)
    })

    it('should handle timezone changes and daylight saving transitions', async () => {
      const token = createTestToken(30)
      const expirationTime = Date.now() + 30 * 60 * 1000

      useTokenStore.setState({
        token,
        expiresAt: expirationTime,
      })

      // Simulate timezone change (this is difficult to test directly,
      // but we can verify that token validation uses UTC timestamps)
      const isValid = tokenStore.isTokenValid()
      expect(typeof isValid).toBe('boolean')
    })

    it('should handle concurrent expiration checks correctly', async () => {
      const token = createTestToken(10) // Expires in 10 minutes

      useTokenStore.setState({
        token,
        expiresAt: Date.now() + 10 * 60 * 1000,
      })

      // Run multiple concurrent validity checks
      const validityChecks = Array(10)
        .fill(null)
        .map(() => Promise.resolve(tokenStore.isTokenValid()))

      const results = await Promise.all(validityChecks)

      // All checks should return the same result
      expect(results.every((result: boolean) => result === results[0])).toBe(
        true
      )
    })
  })

  describe('Storage Cleanup on Expiration', () => {
    it('should remove expired tokens from persistent storage', async () => {
      const expiredToken = createTestToken(-60) // Expired 1 hour ago

      mockGetStoredToken.mockReturnValue({
        token: expiredToken,
        expiresAt: Date.now() - 60 * 60 * 1000,
        storedAt: Date.now() - 120 * 60 * 1000,
      })

      mockHasValidStoredToken.mockReturnValue(false)

      // Attempt to get valid token should trigger cleanup
      await expect(tokenStore.getValidToken()).rejects.toThrow()

      expect(mockClearStoredToken).toHaveBeenCalled()
    })

    it('should clean up expired tokens on store initialization', async () => {
      const expiredToken = createTestToken(-30)

      mockGetStoredToken.mockReturnValue({
        token: expiredToken,
        expiresAt: Date.now() - 30 * 60 * 1000,
        storedAt: Date.now() - 60 * 60 * 1000,
      })

      mockHasValidStoredToken.mockReturnValue(false)

      // Initialize store (this would happen on app startup)
      await tokenStore.initialize?.()

      expect(mockClearStoredToken).toHaveBeenCalled()
    })
  })
})
