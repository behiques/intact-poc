import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { useTokenStore } from '@/features/common/stores/useTokenStore'
import {
  storeToken,
  clearStoredToken,
  hasValidStoredToken,
} from '@/features/common/utils/tokenStorage'
import { retrieveToken } from '@/features/common/api/fetchToken'

// Mock environment variables
vi.mock('@/utils/env', () => ({
  env: {
    AUTH_TOKEN_API_URL: 'https://auth.api.com',
    BACKEND_API_URL: 'https://api.backend.com',
    USER_SYSTEM_ID: 'test-system',
  },
}))

// Mock config module to avoid validation errors
vi.mock('@/features/common/utils/config', () => ({
  tokenConfig: {
    authTokenApiUrl: 'https://auth.api.com',
    backendApiUrl: 'https://api.backend.com',
    userSystemId: 'test-system',
  },
}))

// Mock dependencies
vi.mock('@/features/common/utils/tokenStorage')
vi.mock('@/features/common/api/fetchToken')
vi.mock('@/features/common/utils/tokenQueue')

const mockStoreToken = vi.mocked(storeToken)
const mockClearStoredToken = vi.mocked(clearStoredToken)
const mockHasValidStoredToken = vi.mocked(hasValidStoredToken)
const mockRetrieveToken = vi.mocked(retrieveToken)

// Mock JWT token creation
const createTestToken = (durationMinutes: number): string => {
  const now = Math.floor(Date.now() / 1000)
  const exp = now + durationMinutes * 60

  // Create a mock JWT token with proper structure
  const header = Buffer.from(
    JSON.stringify({ alg: 'HS256', typ: 'JWT' })
  ).toString('base64')
  const payload = Buffer.from(
    JSON.stringify({
      sub: 'test-user',
      iat: now,
      exp: exp,
      aud: 'test-audience',
    })
  ).toString('base64')
  const signature = 'mock-signature'

  return `${header}.${payload}.${signature}`
}

describe('Token Refresh Flow Integration Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks()

    // Reset store state
    const store = useTokenStore.getState()
    store.clearToken()
    store.clearError()

    // Setup default mocks
    mockStoreToken.mockImplementation(() => {})
    mockClearStoredToken.mockImplementation(() => {})
    mockHasValidStoredToken.mockReturnValue(false)

    // Mock successful token retrieval by default
    mockRetrieveToken.mockResolvedValue({
      token: createTestToken(60),
      expiration: new Date(Date.now() + 3600000).toString(),
    })
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe('Automatic Token Refresh', () => {
    it('should automatically refresh token on initialization when no valid token exists', async () => {
      mockHasValidStoredToken.mockReturnValue(false)

      const store = useTokenStore.getState()
      await store.initialize()

      expect(mockRetrieveToken).toHaveBeenCalledOnce()
      expect(store.token).toBeTruthy()
      expect(store.error).toBeNull()
      expect(store.isLoading).toBe(false)
    })

    it('should use existing valid token on initialization', async () => {
      const existingToken = createTestToken(30)
      const existingExpiry = Date.now() + 1800000 // 30 minutes

      mockHasValidStoredToken.mockReturnValue(true)
      const { getStoredToken } = await import(
        '@/features/common/utils/tokenStorage'
      )
      vi.mocked(getStoredToken).mockReturnValue({
        token: existingToken,
        expiresAt: existingExpiry,
        storedAt: Date.now() - 1000,
      })

      const store = useTokenStore.getState()
      await store.initialize()

      expect(mockRetrieveToken).not.toHaveBeenCalled()
      expect(store.token).toBe(existingToken)
      expect(store.expiresAt).toBe(existingExpiry)
    })

    it('should refresh token when explicitly requested', async () => {
      const newToken = createTestToken(60)
      mockRetrieveToken.mockResolvedValue({
        token: newToken,
        expiration: new Date(Date.now() + 3600000).toString(),
      })

      const store = useTokenStore.getState()
      await store.refreshToken()

      expect(mockRetrieveToken).toHaveBeenCalledOnce()
      expect(store.token).toBe(newToken)
      expect(store.isLoading).toBe(false)
      expect(store.isRefreshing).toBe(false)
    })

    it('should handle refresh errors gracefully', async () => {
      const error = new Error('Token refresh failed')
      mockRetrieveToken.mockRejectedValue(error)

      const store = useTokenStore.getState()

      await expect(store.refreshToken()).rejects.toThrow('Token refresh failed')

      expect(store.token).toBeNull()
      expect(store.error).toBeTruthy()
      expect(store.isRefreshing).toBe(false)
    })
  })

  describe('Token Persistence', () => {
    it('should store token after successful refresh', async () => {
      const newToken = createTestToken(60)
      const expirationTime = Date.now() + 3600000

      mockRetrieveToken.mockResolvedValue({
        token: newToken,
        expiration: new Date(expirationTime).toString(),
      })

      const store = useTokenStore.getState()
      await store.refreshToken()

      expect(mockStoreToken).toHaveBeenCalledWith(newToken, expect.any(Number))
      expect(store.token).toBe(newToken)
    })

    it('should clear stored token on refresh failure', async () => {
      mockRetrieveToken.mockRejectedValue(new Error('Network error'))

      const store = useTokenStore.getState()

      try {
        await store.refreshToken()
      } catch {
        // Expected to fail
      }

      expect(mockClearStoredToken).toHaveBeenCalled()
      expect(store.token).toBeNull()
    })

    it('should clear token and storage when explicitly cleared', () => {
      const store = useTokenStore.getState()
      store.clearToken()

      expect(mockClearStoredToken).toHaveBeenCalled()
      expect(store.token).toBeNull()
      expect(store.expiresAt).toBeNull()
      expect(store.error).toBeNull()
    })
  })

  describe('Token Validation', () => {
    it('should correctly identify valid tokens', async () => {
      const validToken = createTestToken(60)
      mockRetrieveToken.mockResolvedValue({
        token: validToken,
        expiration: new Date(Date.now() + 3600000).toString(),
      })

      const store = useTokenStore.getState()
      await store.refreshToken()

      expect(store.isTokenValid()).toBe(true)
      expect(store.timeUntilExpiry()).toBeGreaterThan(3500000) // Should be close to 1 hour
    })

    it('should correctly identify expired tokens', async () => {
      const expiredToken = createTestToken(-1) // Expired 1 minute ago
      mockRetrieveToken.mockResolvedValue({
        token: expiredToken,
        expiration: new Date(Date.now() - 60000).toString(),
      })

      const store = useTokenStore.getState()
      await store.refreshToken()

      expect(store.isTokenValid()).toBe(false)
      expect(store.timeUntilExpiry()).toBe(0)
    })

    it('should handle tokens without expiration gracefully', () => {
      const store = useTokenStore.getState()

      // Manually set state without expiration (edge case)
      store.clearToken()

      expect(store.isTokenValid()).toBe(false)
      expect(store.timeUntilExpiry()).toBeNull()
    })
  })

  describe('Concurrent Refresh Prevention', () => {
    it('should prevent multiple concurrent refresh operations', async () => {
      mockRetrieveToken.mockImplementation(async () => {
        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 100))
        return {
          token: createTestToken(60),
          expiration: new Date(Date.now() + 3600000).toString(),
        }
      })

      const store = useTokenStore.getState()

      // Start multiple refresh operations concurrently
      const refreshPromises = [
        store.refreshToken(),
        store.refreshToken(),
        store.refreshToken(),
      ]

      await Promise.all(refreshPromises)

      // Should only make one API call despite multiple concurrent requests
      expect(mockRetrieveToken).toHaveBeenCalledTimes(1)
      expect(store.token).toBeTruthy()
      expect(store.isRefreshing).toBe(false)
    })

    it('should handle refresh state correctly during operation', async () => {
      let resolveRefresh:
        | ((value: { token: string; expiresAt: number }) => void)
        | undefined

      mockRetrieveToken.mockImplementation(() => {
        return new Promise((resolve) => {
          resolveRefresh = resolve
        })
      })

      const store = useTokenStore.getState()

      // Start refresh
      const refreshPromise = store.refreshToken()

      // Check state during refresh
      expect(store.isRefreshing).toBe(true)
      expect(store.error).toBeNull()

      // Complete the refresh
      resolveRefresh?.({
        token: createTestToken(60),
        expiresAt: Date.now() + 3600000,
      })

      await refreshPromise

      // Check state after refresh
      expect(store.isRefreshing).toBe(false)
      expect(store.token).toBeTruthy()
    })
  })

  describe('Error Recovery', () => {
    it('should recover from network errors on subsequent refresh', async () => {
      // First refresh fails
      mockRetrieveToken.mockRejectedValueOnce(new Error('Network error'))

      const store = useTokenStore.getState()

      await expect(store.refreshToken()).rejects.toThrow('Network error')
      expect(store.error).toBeTruthy()
      expect(store.token).toBeNull()

      // Second refresh succeeds
      const newToken = createTestToken(60)
      mockRetrieveToken.mockResolvedValue({
        token: newToken,
        expiration: new Date(Date.now() + 3600000).toString(),
      })

      await store.refreshToken()

      expect(store.error).toBeNull()
      expect(store.token).toBe(newToken)
    })

    it('should handle malformed token responses', async () => {
      mockRetrieveToken.mockResolvedValue({
        token: '',
        expiration: 'invalid-date',
      })

      const store = useTokenStore.getState()

      await expect(store.refreshToken()).rejects.toThrow()
      expect(store.error).toBeTruthy()
      expect(store.token).toBeNull()
    })
  })

  describe('Background Refresh', () => {
    it('should handle background refresh scenarios', async () => {
      const store = useTokenStore.getState()

      // Setup a token that will expire soon (but not yet)
      const soonToExpireToken = createTestToken(4) // 4 minutes
      mockRetrieveToken.mockResolvedValue({
        token: soonToExpireToken,
        expiration: new Date(Date.now() + 240000).toString(), // 4 minutes
      })

      await store.refreshToken()

      // Check that token should be refreshed (less than 5 minute threshold)
      expect(store.shouldRefresh()).toBe(true)
      expect(store.timeUntilExpiry()).toBeLessThan(5 * 60 * 1000)
    })

    it('should not require refresh for fresh tokens', async () => {
      const store = useTokenStore.getState()

      // Setup a fresh token
      const freshToken = createTestToken(30) // 30 minutes
      mockRetrieveToken.mockResolvedValue({
        token: freshToken,
        expiration: new Date(Date.now() + 1800000).toString(), // 30 minutes
      })

      await store.refreshToken()

      // Check that token should not be refreshed yet
      expect(store.shouldRefresh()).toBe(false)
      expect(store.timeUntilExpiry()).toBeGreaterThan(25 * 60 * 1000) // More than 25 minutes
    })
  })
})
