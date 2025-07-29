import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { act, renderHook } from '@testing-library/react'
import { useTokenStore } from './useTokenStore'

// Mock the token storage utility
vi.mock('../utils/tokenStorage', () => ({
  storeToken: vi.fn(),
  getStoredToken: vi.fn(),
  clearStoredToken: vi.fn(),
  hasValidStoredToken: vi.fn(),
}))

// Mock the fetch token API
vi.mock('../api/fetchToken', () => ({
  retrieveToken: vi.fn(),
}))

describe('useTokenStore', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    // Reset the store to initial state
    useTokenStore.getState().clearToken()
    useTokenStore.getState().clearError()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe('initial state', () => {
    it('should have correct initial state', () => {
      const { result } = renderHook(() => useTokenStore())

      expect(result.current.token).toBeNull()
      expect(result.current.isLoading).toBe(false)
      expect(result.current.error).toBeNull()
      expect(result.current.lastRefresh).toBeNull()
      expect(result.current.expiresAt).toBeNull()
    })
  })

  describe('setToken', () => {
    it('should set token and expiration', () => {
      const { result } = renderHook(() => useTokenStore())
      const token = 'test.jwt.token'
      const expiresAt = Date.now() + 3600000

      act(() => {
        result.current.setToken(token, expiresAt)
      })

      expect(result.current.token).toBe(token)
      expect(result.current.expiresAt).toBe(expiresAt)
      expect(result.current.lastRefresh).toBeCloseTo(Date.now(), -2) // Within 100ms
      expect(result.current.error).toBeNull()
    })

    it('should clear error when setting token', () => {
      const { result } = renderHook(() => useTokenStore())

      // First set an error
      act(() => {
        result.current.setError({
          type: 'NETWORK_ERROR',
          message: 'Test error',
          timestamp: Date.now(),
        })
      })

      expect(result.current.error).not.toBeNull()

      // Then set a token
      act(() => {
        result.current.setToken('new.token', Date.now() + 3600000)
      })

      expect(result.current.error).toBeNull()
    })
  })

  describe('clearToken', () => {
    it('should clear all token-related state', () => {
      const { result } = renderHook(() => useTokenStore())

      // First set a token
      act(() => {
        result.current.setToken('test.token', Date.now() + 3600000)
      })

      expect(result.current.token).not.toBeNull()

      // Then clear it
      act(() => {
        result.current.clearToken()
      })

      expect(result.current.token).toBeNull()
      expect(result.current.expiresAt).toBeNull()
      expect(result.current.lastRefresh).toBeNull()
    })
  })

  describe('setLoading', () => {
    it('should set loading state', () => {
      const { result } = renderHook(() => useTokenStore())

      expect(result.current.isLoading).toBe(false)

      act(() => {
        result.current.setLoading(true)
      })

      expect(result.current.isLoading).toBe(true)

      act(() => {
        result.current.setLoading(false)
      })

      expect(result.current.isLoading).toBe(false)
    })
  })

  describe('setError', () => {
    it('should set error state', () => {
      const { result } = renderHook(() => useTokenStore())
      const error = {
        type: 'NETWORK_ERROR' as const,
        message: 'Network connection failed',
        timestamp: Date.now(),
      }

      act(() => {
        result.current.setError(error)
      })

      expect(result.current.error).toEqual(error)
    })
  })

  describe('clearError', () => {
    it('should clear error state', () => {
      const { result } = renderHook(() => useTokenStore())
      const error = {
        type: 'NETWORK_ERROR' as const,
        message: 'Test error',
        timestamp: Date.now(),
      }

      // First set an error
      act(() => {
        result.current.setError(error)
      })

      expect(result.current.error).toEqual(error)

      // Then clear it
      act(() => {
        result.current.clearError()
      })

      expect(result.current.error).toBeNull()
    })
  })

  describe('hasValidToken', () => {
    it('should return true for valid unexpired token', () => {
      const { result } = renderHook(() => useTokenStore())
      const futureTime = Date.now() + 3600000 // 1 hour from now

      act(() => {
        result.current.setToken('valid.token', futureTime)
      })

      expect(result.current.hasValidToken()).toBe(true)
    })

    it('should return false for expired token', () => {
      const { result } = renderHook(() => useTokenStore())
      const pastTime = Date.now() - 3600000 // 1 hour ago

      act(() => {
        result.current.setToken('expired.token', pastTime)
      })

      expect(result.current.hasValidToken()).toBe(false)
    })

    it('should return false when no token exists', () => {
      const { result } = renderHook(() => useTokenStore())

      expect(result.current.hasValidToken()).toBe(false)
    })

    it('should consider buffer time', () => {
      const { result } = renderHook(() => useTokenStore())
      const soonToExpire = Date.now() + 30000 // 30 seconds from now

      act(() => {
        result.current.setToken('soon.to.expire', soonToExpire)
      })

      // Without buffer
      expect(result.current.hasValidToken()).toBe(true)

      // With 1 minute buffer
      expect(result.current.hasValidToken(60000)).toBe(false)
    })
  })

  describe('getTimeUntilExpiration', () => {
    it('should return time until expiration', () => {
      const { result } = renderHook(() => useTokenStore())
      const futureTime = Date.now() + 3600000 // 1 hour from now

      act(() => {
        result.current.setToken('test.token', futureTime)
      })

      const timeUntilExpiration = result.current.getTimeUntilExpiration()
      expect(timeUntilExpiration).toBeCloseTo(3600000, -3) // Within 1 second
    })

    it('should return null when no token exists', () => {
      const { result } = renderHook(() => useTokenStore())

      expect(result.current.getTimeUntilExpiration()).toBeNull()
    })

    it('should return negative value for expired token', () => {
      const { result } = renderHook(() => useTokenStore())
      const pastTime = Date.now() - 3600000 // 1 hour ago

      act(() => {
        result.current.setToken('expired.token', pastTime)
      })

      const timeUntilExpiration = result.current.getTimeUntilExpiration()
      expect(timeUntilExpiration).toBeLessThan(0)
    })
  })

  describe('shouldRefresh', () => {
    it('should return true when token expires within refresh window', () => {
      const { result } = renderHook(() => useTokenStore())
      const soonToExpire = Date.now() + 4 * 60 * 1000 // 4 minutes from now

      act(() => {
        result.current.setToken('soon.to.expire', soonToExpire)
      })

      // Default refresh window is 5 minutes
      expect(result.current.shouldRefresh()).toBe(true)
    })

    it('should return false when token has plenty of time left', () => {
      const { result } = renderHook(() => useTokenStore())
      const futureTime = Date.now() + 10 * 60 * 1000 // 10 minutes from now

      act(() => {
        result.current.setToken('valid.token', futureTime)
      })

      expect(result.current.shouldRefresh()).toBe(false)
    })

    it('should return false when no token exists', () => {
      const { result } = renderHook(() => useTokenStore())

      expect(result.current.shouldRefresh()).toBe(false)
    })

    it('should use custom refresh window', () => {
      const { result } = renderHook(() => useTokenStore())
      const soonToExpire = Date.now() + 2 * 60 * 1000 // 2 minutes from now

      act(() => {
        result.current.setToken('soon.to.expire', soonToExpire)
      })

      // With 1 minute refresh window
      expect(result.current.shouldRefresh(1 * 60 * 1000)).toBe(false)

      // With 3 minute refresh window
      expect(result.current.shouldRefresh(3 * 60 * 1000)).toBe(true)
    })
  })

  describe('state persistence', () => {
    it('should maintain state across multiple hook instances', () => {
      const { result: result1 } = renderHook(() => useTokenStore())
      const { result: result2 } = renderHook(() => useTokenStore())

      const token = 'shared.token'
      const expiresAt = Date.now() + 3600000

      act(() => {
        result1.current.setToken(token, expiresAt)
      })

      // Both hooks should see the same state
      expect(result1.current.token).toBe(token)
      expect(result2.current.token).toBe(token)
      expect(result1.current.expiresAt).toBe(expiresAt)
      expect(result2.current.expiresAt).toBe(expiresAt)
    })

    it('should handle concurrent updates correctly', () => {
      const { result } = renderHook(() => useTokenStore())

      act(() => {
        result.current.setLoading(true)
        result.current.setToken('token1', Date.now() + 3600000)
        result.current.setLoading(false)
      })

      expect(result.current.isLoading).toBe(false)
      expect(result.current.token).toBe('token1')
      expect(result.current.error).toBeNull()
    })
  })
})
