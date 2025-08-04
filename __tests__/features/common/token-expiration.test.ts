import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { useTokenStore } from '@/features/common/stores/useTokenStore'
import { retrieveToken } from '@/features/common/api/fetchToken'
import { decodeJWTPayload } from '@/features/common/utils/tokenDecoder'
import {
  clearStoredToken,
  hasValidStoredToken,
  getStoredToken,
} from '@/features/common/utils/tokenStorage'

// Mock environment variables
vi.mock('@/utils/env', () => ({
  env: {
    AUTH_TOKEN_API_URL: 'https://auth.api.com',
    BACKEND_API_URL: 'https://api.backend.com',
    USER_SYSTEM_ID: 'test-system',
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

// Helper to create test tokens with specific expiration
const createTestToken = (expirationOffsetMinutes: number): string => {
  const now = Math.floor(Date.now() / 1000)
  const exp = now + expirationOffsetMinutes * 60

  const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }))
  const payload = btoa(JSON.stringify({ exp, sub: 'test-user', iat: now }))
  const signature = 'mock-signature'

  return `${header}.${payload}.${signature}`
}

describe('Token Expiration Tests', () => {
  let tokenStore: ReturnType<typeof useTokenStore.getState>

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
      const almostExpiredToken = createTestToken(3) // Expires in 3 minutes
      const almostExpiredTime = Date.now() + 3 * 60 * 1000

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

      // Token should be considered invalid due to safety margin (5 minutes)
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

  describe('Automatic Token Refresh', () => {
    it('should refresh expired tokens when requested', async () => {
      const expiredToken = createTestToken(-10) // Expired 10 minutes ago
      const newToken = createTestToken(60) // New token valid for 60 minutes

      useTokenStore.setState({
        token: expiredToken,
        expiresAt: Date.now() - 10 * 60 * 1000,
      })

      mockRetrieveToken.mockResolvedValue({
        token: newToken,
        expiration: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
      })

      await tokenStore.refreshToken()

      expect(mockRetrieveToken).toHaveBeenCalledOnce()
      const state = useTokenStore.getState()
      expect(state.token).toBe(newToken)
      expect(state.error).toBeNull()
    })

    it('should handle refresh failures gracefully', async () => {
      const expiredToken = createTestToken(-10)

      useTokenStore.setState({
        token: expiredToken,
        expiresAt: Date.now() - 10 * 60 * 1000,
      })

      mockRetrieveToken.mockRejectedValue(
        new Error('Authentication service unavailable')
      )

      await expect(tokenStore.refreshToken()).rejects.toThrow()

      const currentState = useTokenStore.getState()
      expect(currentState.error).toBeTruthy()
      expect(currentState.error?.message).toContain('Failed to refresh token')
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

  describe('Token Lifetime Management', () => {
    it('should calculate time until expiry correctly', async () => {
      const futureTime = Date.now() + 30 * 60 * 1000 // 30 minutes from now
      const token = createTestToken(30)

      useTokenStore.setState({
        token,
        expiresAt: futureTime,
      })

      const timeUntilExpiry = tokenStore.timeUntilExpiry()
      expect(timeUntilExpiry).toBeLessThanOrEqual(30 * 60 * 1000)
      expect(timeUntilExpiry).toBeGreaterThan(29 * 60 * 1000)
    })

    it('should return null for missing tokens', async () => {
      useTokenStore.setState({
        token: null,
        expiresAt: null,
      })

      const timeUntilExpiry = tokenStore.timeUntilExpiry()
      expect(timeUntilExpiry).toBeNull()
    })

    it('should handle negative time for expired tokens', async () => {
      const pastTime = Date.now() - 10 * 60 * 1000 // 10 minutes ago
      const expiredToken = createTestToken(-10)

      useTokenStore.setState({
        token: expiredToken,
        expiresAt: pastTime,
      })

      const timeUntilExpiry = tokenStore.timeUntilExpiry()
      expect(timeUntilExpiry).toBeLessThanOrEqual(0)
    })
  })

  describe('Proactive Token Refresh', () => {
    it('should trigger refresh for tokens nearing expiration', async () => {
      const nearExpiryToken = createTestToken(4) // Expires in 4 minutes
      const newToken = createTestToken(60)

      useTokenStore.setState({
        token: nearExpiryToken,
        expiresAt: Date.now() + 4 * 60 * 1000,
      })

      mockRetrieveToken.mockResolvedValue({
        token: newToken,
        expiration: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
      })

      // Check if should refresh
      const shouldRefresh = tokenStore.shouldRefresh()
      expect(shouldRefresh).toBe(true)

      // Perform refresh
      await tokenStore.refreshToken()

      const state = useTokenStore.getState()
      expect(state.token).toBe(newToken)
    })

    it('should prevent concurrent refresh attempts', async () => {
      const nearExpiryToken = createTestToken(3) // Expires in 3 minutes
      const newToken = createTestToken(60)

      useTokenStore.setState({
        token: nearExpiryToken,
        expiresAt: Date.now() + 3 * 60 * 1000,
      })

      let refreshPromiseResolve: (value: unknown) => void = () => {}
      const refreshPromise = new Promise((resolve) => {
        refreshPromiseResolve = resolve
      })

      // Mock a slow token refresh
      mockRetrieveToken.mockImplementation(async () => {
        await refreshPromise
        return {
          token: newToken,
          expiration: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
        }
      })

      // Start multiple concurrent refresh attempts
      const attempt1 = tokenStore.refreshToken()
      const attempt2 = tokenStore.refreshToken()
      const attempt3 = tokenStore.refreshToken()

      // Verify that isRefreshing is true
      expect(useTokenStore.getState().isRefreshing).toBe(true)

      // Resolve the refresh
      refreshPromiseResolve({})

      await Promise.all([attempt1, attempt2, attempt3])

      // Should only call retrieve token once
      expect(mockRetrieveToken).toHaveBeenCalledTimes(1)
      const state = useTokenStore.getState()
      expect(state.token).toBe(newToken)
      expect(state.isRefreshing).toBe(false)
    })
  })

  describe('Storage Cleanup', () => {
    it('should clean up expired tokens on initialization', async () => {
      const expiredToken = createTestToken(-30)
      const expiredTime = Date.now() - 30 * 60 * 1000

      mockGetStoredToken.mockReturnValue({
        token: expiredToken,
        expiresAt: expiredTime,
        storedAt: expiredTime - 2 * 60 * 60 * 1000,
      })
      mockHasValidStoredToken.mockReturnValue(false)

      await tokenStore.initialize()

      expect(mockClearStoredToken).toHaveBeenCalled()
      const state = useTokenStore.getState()
      expect(state.token).toBeNull()
      expect(state.expiresAt).toBeNull()
    })
  })
})
