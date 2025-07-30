import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import {
  storeToken,
  getStoredToken,
  clearStoredToken,
  hasValidStoredToken,
} from '@/features/common/utils/tokenStorage'

// Mock localStorage
const mockLocalStorage = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
}

Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage,
})

// Mock document for browser environment detection
Object.defineProperty(global, 'document', {
  value: {
    createElement: vi.fn(),
  },
})

describe('tokenStorage', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    // Reset all storage mocks
    mockLocalStorage.getItem.mockReturnValue(null)
    mockLocalStorage.setItem.mockImplementation(() => {})
    mockLocalStorage.removeItem.mockImplementation(() => {})
    mockLocalStorage.clear.mockImplementation(() => {})

    // Mock current time for consistent testing
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2024-01-01T12:00:00Z'))
  })

  afterEach(() => {
    vi.useRealTimers()
    vi.restoreAllMocks()
  })

  describe('storeToken', () => {
    it('should store token with expiration in localStorage', () => {
      const token = 'test.jwt.token'
      const expiresAt = Date.now() + 3600000 // 1 hour from now

      storeToken(token, expiresAt)

      expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
        'auth_token',
        JSON.stringify({
          token,
          expiresAt,
          storedAt: Date.now(),
        })
      )
    })

    it('should throw error for empty token', () => {
      const expiresAt = Date.now() + 3600000

      expect(() => storeToken('', expiresAt)).toThrow(
        'Token must be a non-empty string'
      )
    })

    it('should throw error for null token', () => {
      const expiresAt = Date.now() + 3600000

      expect(() => storeToken(null as unknown as string, expiresAt)).toThrow(
        'Token must be a non-empty string'
      )
    })

    it('should handle storage errors gracefully', () => {
      const token = 'test.jwt.token'
      const expiresAt = Date.now() + 3600000
      mockLocalStorage.setItem.mockImplementation(() => {
        throw new Error('Storage quota exceeded')
      })

      expect(() => storeToken(token, expiresAt)).toThrow('Storage error')
    })

    it('should validate expiration timestamp', () => {
      const token = 'test.jwt.token'
      const pastTime = Date.now() - 3600000 // 1 hour ago

      expect(() => storeToken(token, pastTime)).toThrow(
        'ExpiresAt must be a positive number'
      )
    })
  })

  describe('getStoredToken', () => {
    it('should retrieve stored token data', () => {
      const tokenData = {
        token: 'stored.jwt.token',
        expiresAt: Date.now() + 3600000,
        storedAt: Date.now() - 1000,
      }
      mockLocalStorage.getItem.mockReturnValue(JSON.stringify(tokenData))

      const result = getStoredToken()

      expect(mockLocalStorage.getItem).toHaveBeenCalledWith('auth_token')
      expect(result).toEqual(tokenData)
    })

    it('should return null when no token is stored', () => {
      mockLocalStorage.getItem.mockReturnValue(null)

      const result = getStoredToken()

      expect(result).toBeNull()
    })

    it('should return null for invalid JSON', () => {
      mockLocalStorage.getItem.mockReturnValue('invalid-json')

      const result = getStoredToken()

      expect(result).toBeNull()
    })

    it('should return null for expired token', () => {
      const expiredTokenData = {
        token: 'expired.jwt.token',
        expiresAt: Date.now() - 3600000, // 1 hour ago
        storedAt: Date.now() - 7200000, // 2 hours ago
      }
      mockLocalStorage.getItem.mockReturnValue(JSON.stringify(expiredTokenData))

      const result = getStoredToken()

      expect(result).toBeNull()
      expect(mockLocalStorage.removeItem).toHaveBeenCalledWith('auth_token')
    })

    it('should handle storage errors gracefully', () => {
      mockLocalStorage.getItem.mockImplementation(() => {
        throw new Error('Storage access denied')
      })

      const result = getStoredToken()

      expect(result).toBeNull()
    })
  })

  describe('clearStoredToken', () => {
    it('should clear token from localStorage', () => {
      clearStoredToken()

      expect(mockLocalStorage.removeItem).toHaveBeenCalledWith('auth_token')
    })

    it('should handle storage errors gracefully', () => {
      mockLocalStorage.removeItem.mockImplementation(() => {
        throw new Error('Storage access denied')
      })

      expect(() => clearStoredToken()).not.toThrow()
    })
  })

  describe('hasValidStoredToken', () => {
    it('should return true when valid token exists', () => {
      const validTokenData = {
        token: 'valid.jwt.token',
        expiresAt: Date.now() + 3600000, // 1 hour from now
        storedAt: Date.now() - 1000,
      }
      mockLocalStorage.getItem.mockReturnValue(JSON.stringify(validTokenData))

      const result = hasValidStoredToken()

      expect(result).toBe(true)
    })

    it('should return false when no token exists', () => {
      mockLocalStorage.getItem.mockReturnValue(null)

      const result = hasValidStoredToken()

      expect(result).toBe(false)
    })

    it('should return false when token is expired', () => {
      const expiredTokenData = {
        token: 'expired.jwt.token',
        expiresAt: Date.now() - 3600000, // 1 hour ago
        storedAt: Date.now() - 7200000,
      }
      mockLocalStorage.getItem.mockReturnValue(JSON.stringify(expiredTokenData))

      const result = hasValidStoredToken()

      expect(result).toBe(false)
    })

    it('should consider buffer time for expiration check', () => {
      const soonToExpireTokenData = {
        token: 'soon.to.expire.token',
        expiresAt: Date.now() + 30000, // 30 seconds from now
        storedAt: Date.now() - 1000,
      }
      mockLocalStorage.getItem.mockReturnValue(
        JSON.stringify(soonToExpireTokenData)
      )

      // Without buffer
      const resultWithoutBuffer = hasValidStoredToken()
      expect(resultWithoutBuffer).toBe(true)

      // With 1 minute buffer
      const resultWithBuffer = hasValidStoredToken(60000)
      expect(resultWithBuffer).toBe(false)
    })

    it('should handle storage errors gracefully', () => {
      mockLocalStorage.getItem.mockImplementation(() => {
        throw new Error('Storage access denied')
      })

      const result = hasValidStoredToken()

      expect(result).toBe(false)
    })
  })

  describe('error handling', () => {
    it('should handle scenario where localStorage is unavailable', () => {
      // Simulate localStorage being completely unavailable
      Object.defineProperty(window, 'localStorage', {
        value: undefined,
      })

      const token = 'test.token'
      const expiresAt = Date.now() + 3600000

      expect(() => storeToken(token, expiresAt)).toThrow(
        'localStorage is not available'
      )
    })
  })
})
