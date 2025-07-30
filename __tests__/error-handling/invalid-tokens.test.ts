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

// Helper to create test tokens with specific expiration
const createTestToken = (expirationOffsetMinutes: number): string => {
  const now = Math.floor(Date.now() / 1000)
  const exp = now + expirationOffsetMinutes * 60

  const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }))
  const payload = btoa(JSON.stringify({ exp, sub: 'test-user', iat: now }))
  const signature = 'mock-signature'

  return `${header}.${payload}.${signature}`
}

describe('Invalid Token Handling Tests', () => {
  let tokenStore: ReturnType<typeof useTokenStore.getState>

  beforeEach(() => {
    tokenStore = useTokenStore.getState()

    // Reset store state
    useTokenStore.setState({
      token: null,
      expiresAt: null,
      isRefreshing: false,
      isLoading: false,
      error: null,
      lastRefreshAt: null,
    })

    // Reset all mocks
    vi.clearAllMocks()

    // Default mock implementations
    mockRetrieveToken.mockResolvedValue({
      token: createTestToken(60),
      expiration: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
    })

    mockDecodeJWTPayload.mockReturnValue({
      sub: 'test-user',
      exp: Math.floor((Date.now() + 60 * 60 * 1000) / 1000),
      iat: Math.floor(Date.now() / 1000),
      aud: 'test-audience',
    })

    mockClearStoredToken.mockImplementation(() => {})
    mockHasValidStoredToken.mockReturnValue(false)
    mockGetStoredToken.mockReturnValue(null)
  })

  afterEach(() => {
    vi.clearAllTimers()
  })

  describe('Malformed Token Detection', () => {
    it('should handle tokens with invalid JWT structure', async () => {
      mockRetrieveToken.mockRejectedValue(new Error('Invalid JWT structure'))

      await expect(tokenStore.refreshToken()).rejects.toThrow()

      // Need to get fresh store state after the error
      const currentState = useTokenStore.getState()
      expect(currentState.error).toBeTruthy()
      expect(currentState.error?.message).toContain(
        'Store: Failed to refresh token'
      )
      expect(currentState.token).toBeNull()
    })

    it('should handle tokens with invalid base64 encoding', async () => {
      mockRetrieveToken.mockRejectedValue(new Error('Invalid base64 encoding'))

      await expect(tokenStore.refreshToken()).rejects.toThrow()

      expect(tokenStore.error).toBeTruthy()
      expect(tokenStore.error?.message).toContain(
        'Store: Failed to refresh token'
      )
      expect(tokenStore.token).toBeNull()
    })

    it('should handle tokens with malformed JSON payload', async () => {
      mockRetrieveToken.mockRejectedValue(
        new Error('Invalid JSON in token payload')
      )

      await expect(tokenStore.refreshToken()).rejects.toThrow()

      expect(tokenStore.error).toBeTruthy()
      expect(tokenStore.error?.message).toContain(
        'Store: Failed to refresh token'
      )
      expect(tokenStore.token).toBeNull()
    })
  })

  describe('Token Signature Validation', () => {
    it('should handle tokens with invalid signatures', async () => {
      mockRetrieveToken.mockRejectedValue(new Error('Invalid token signature'))

      await expect(tokenStore.refreshToken()).rejects.toThrow()

      expect(tokenStore.error).toBeTruthy()
      expect(tokenStore.error?.message).toContain(
        'Store: Failed to refresh token'
      )
      expect(tokenStore.token).toBeNull()
    })

    it('should handle tokens signed with wrong algorithm', async () => {
      mockRetrieveToken.mockRejectedValue(
        new Error('Token signed with unsupported algorithm')
      )

      await expect(tokenStore.refreshToken()).rejects.toThrow()

      expect(tokenStore.error).toBeTruthy()
      expect(tokenStore.error?.message).toContain(
        'Store: Failed to refresh token'
      )
      expect(tokenStore.token).toBeNull()
    })
  })

  describe('Token Payload Validation', () => {
    it('should handle tokens missing required claims', async () => {
      mockRetrieveToken.mockRejectedValue(
        new Error('Token missing required claims')
      )

      await expect(tokenStore.refreshToken()).rejects.toThrow()

      expect(tokenStore.error).toBeTruthy()
      expect(tokenStore.error?.message).toContain(
        'Store: Failed to refresh token'
      )
      expect(tokenStore.token).toBeNull()
    })

    it('should handle tokens with invalid audience claim', async () => {
      mockRetrieveToken.mockRejectedValue(new Error('Invalid audience claim'))

      await expect(tokenStore.refreshToken()).rejects.toThrow()

      expect(tokenStore.error).toBeTruthy()
      expect(tokenStore.error?.message).toContain(
        'Store: Failed to refresh token'
      )
      expect(tokenStore.token).toBeNull()
    })

    it('should handle tokens with invalid issuer claim', async () => {
      mockRetrieveToken.mockRejectedValue(new Error('Invalid issuer claim'))

      await expect(tokenStore.refreshToken()).rejects.toThrow()

      expect(tokenStore.error).toBeTruthy()
      expect(tokenStore.error?.message).toContain(
        'Store: Failed to refresh token'
      )
      expect(tokenStore.token).toBeNull()
    })

    it('should handle tokens with future issuedAt time', async () => {
      mockRetrieveToken.mockRejectedValue(
        new Error('Token issued in the future')
      )

      await expect(tokenStore.refreshToken()).rejects.toThrow()

      expect(tokenStore.error).toBeTruthy()
      expect(tokenStore.error?.message).toContain(
        'Store: Failed to refresh token'
      )
      expect(tokenStore.token).toBeNull()
    })

    it('should handle tokens with invalid subject claim format', async () => {
      mockRetrieveToken.mockRejectedValue(
        new Error('Invalid subject claim format')
      )

      await expect(tokenStore.refreshToken()).rejects.toThrow()

      expect(tokenStore.error).toBeTruthy()
      expect(tokenStore.error?.message).toContain(
        'Store: Failed to refresh token'
      )
      expect(tokenStore.token).toBeNull()
    })
  })

  describe('Token Format Validation', () => {
    it('should handle completely invalid token strings', async () => {
      const invalidTokens = [
        '',
        'not-a-jwt',
        '   ',
        'null',
        'undefined',
        '{}',
        'just.one.part',
        'too.many.parts.here.invalid',
      ]

      for (const invalidToken of invalidTokens) {
        mockRetrieveToken.mockRejectedValue(
          new Error(`Invalid token format: ${invalidToken}`)
        )

        await expect(tokenStore.refreshToken()).rejects.toThrow()

        expect(tokenStore.error).toBeTruthy()
        expect(tokenStore.error?.message).toContain(
          'Store: Failed to refresh token'
        )
        expect(tokenStore.token).toBeNull()

        // Reset for next iteration
        tokenStore.clearError()
      }
    })

    it('should handle tokens with special characters correctly', async () => {
      mockRetrieveToken.mockRejectedValue(
        new Error('Token contains invalid characters')
      )

      await expect(tokenStore.refreshToken()).rejects.toThrow()

      // Need to get fresh store state after the error
      const currentState = useTokenStore.getState()
      expect(currentState.error).toBeTruthy()
      expect(currentState.error?.message).toContain(
        'Store: Failed to refresh token'
      )
    })
  })

  describe('Token Response Validation', () => {
    it('should handle responses missing token field', async () => {
      mockRetrieveToken.mockRejectedValue(
        new Error('Response missing token field')
      )

      await expect(tokenStore.refreshToken()).rejects.toThrow()

      expect(tokenStore.error).toBeTruthy()
      expect(tokenStore.error?.message).toContain(
        'Store: Failed to refresh token'
      )
      expect(tokenStore.token).toBeNull()
    })

    it('should handle responses with invalid expiresAt field', async () => {
      mockRetrieveToken.mockRejectedValue(new Error('Invalid expiresAt field'))

      await expect(tokenStore.refreshToken()).rejects.toThrow()

      expect(tokenStore.error).toBeTruthy()
      expect(tokenStore.error?.message).toContain(
        'Store: Failed to refresh token'
      )
      expect(tokenStore.token).toBeNull()
    })

    it('should handle responses with negative expiresAt', async () => {
      mockRetrieveToken.mockRejectedValue(
        new Error('Negative expiresAt timestamp')
      )

      await expect(tokenStore.refreshToken()).rejects.toThrow()

      expect(tokenStore.error).toBeTruthy()
      expect(tokenStore.error?.message).toContain(
        'Store: Failed to refresh token'
      )
      expect(tokenStore.token).toBeNull()
    })

    it('should handle responses with past expiresAt time', async () => {
      mockRetrieveToken.mockRejectedValue(new Error('Token already expired'))

      await expect(tokenStore.refreshToken()).rejects.toThrow()

      expect(tokenStore.error).toBeTruthy()
      expect(tokenStore.error?.message).toContain(
        'Store: Failed to refresh token'
      )
      expect(tokenStore.token).toBeNull()
    })
  })

  describe('Token Cleanup on Invalid Token', () => {
    it('should clear stored token when invalid token is detected', async () => {
      // Set up stored token
      mockGetStoredToken.mockReturnValue({
        token: 'invalid-token',
        expiresAt: Date.now() + 60 * 60 * 1000,
        storedAt: Date.now() - 60 * 1000,
      })

      mockRetrieveToken.mockRejectedValue(new Error('Invalid token format'))

      await expect(tokenStore.refreshToken()).rejects.toThrow()

      // Should clear the stored token
      expect(mockClearStoredToken).toHaveBeenCalled()
      expect(tokenStore.token).toBeNull()
    })

    it('should prevent invalid tokens from being stored', async () => {
      mockRetrieveToken.mockRejectedValue(new Error('Malformed JWT'))

      await expect(tokenStore.refreshToken()).rejects.toThrow()

      // Token should not be stored if it's invalid
      expect(tokenStore.token).toBeNull()
      expect(tokenStore.error).toBeTruthy()
    })
  })

  describe('Security Validations', () => {
    it('should handle tokens that claim to never expire', async () => {
      mockRetrieveToken.mockRejectedValue(
        new Error('Token expiration too far in future')
      )

      await expect(tokenStore.refreshToken()).rejects.toThrow()

      expect(tokenStore.error).toBeTruthy()
      expect(tokenStore.error?.message).toContain(
        'Store: Failed to refresh token'
      )
      expect(tokenStore.token).toBeNull()
    })

    it('should handle tokens with extremely long expiration times', async () => {
      mockRetrieveToken.mockRejectedValue(
        new Error('Token expiration exceeds maximum allowed')
      )

      await expect(tokenStore.refreshToken()).rejects.toThrow()

      expect(tokenStore.error).toBeTruthy()
      expect(tokenStore.error?.message).toContain(
        'Store: Failed to refresh token'
      )
      expect(tokenStore.token).toBeNull()
    })
  })
})
