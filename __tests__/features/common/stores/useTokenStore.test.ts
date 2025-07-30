import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { act, renderHook } from '@testing-library/react'
import { useTokenStore } from '@/features/common/stores/useTokenStore'

// Mock the token storage utility
vi.mock('@/features/common/utils/tokenStorage', () => ({
  storeToken: vi.fn(),
  getStoredToken: vi.fn(),
  clearStoredToken: vi.fn(),
  hasValidStoredToken: vi.fn(),
}))

// Mock the fetch token API
vi.mock('@/features/common/api/fetchToken', () => ({
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
      expect(result.current.lastRefreshAt).toBeNull()
      expect(result.current.expiresAt).toBeNull()
    })
  })

  describe('state management', () => {
    it('should update state directly via setState', () => {
      const { result } = renderHook(() => useTokenStore())
      const token = 'test.jwt.token'
      const expiresAt = Date.now() + 3600000

      act(() => {
        useTokenStore.setState({
          token,
          expiresAt,
          lastRefreshAt: Date.now(),
          error: null,
        })
      })

      expect(result.current.token).toBe(token)
      expect(result.current.expiresAt).toBe(expiresAt)
      expect(result.current.lastRefreshAt).toBeCloseTo(Date.now(), -2) // Within 100ms
      expect(result.current.error).toBeNull()
    })

    it('should clear error when setting new state', () => {
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

      // Then update state to clear error
      act(() => {
        useTokenStore.setState({
          token: 'new.token',
          expiresAt: Date.now() + 3600000,
          error: null,
        })
      })

      expect(result.current.error).toBeNull()
    })
  })

  describe('clearToken', () => {
    it('should clear all token-related state', () => {
      const { result } = renderHook(() => useTokenStore())

      // First set a token
      act(() => {
        useTokenStore.setState({
          token: 'test.token',
          expiresAt: Date.now() + 3600000,
          lastRefreshAt: Date.now(),
        })
      })

      expect(result.current.token).not.toBeNull()

      // Then clear it
      act(() => {
        result.current.clearToken()
      })

      expect(result.current.token).toBeNull()
      expect(result.current.expiresAt).toBeNull()
      expect(result.current.lastRefreshAt).toBeNull()
    })
  })

  describe('loading state', () => {
    it('should manage loading state via setState', () => {
      const { result } = renderHook(() => useTokenStore())

      expect(result.current.isLoading).toBe(false)

      act(() => {
        useTokenStore.setState({ isLoading: true })
      })

      expect(result.current.isLoading).toBe(true)

      act(() => {
        useTokenStore.setState({ isLoading: false })
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

  describe('isTokenValid', () => {
    it('should return true for valid unexpired token', () => {
      const { result } = renderHook(() => useTokenStore())
      const futureTime = Date.now() + 3600000 // 1 hour from now

      act(() => {
        useTokenStore.setState({ token: 'valid.token', expiresAt: futureTime })
      })

      expect(result.current.isTokenValid()).toBe(true)
    })

    it('should return false for expired token', () => {
      const { result } = renderHook(() => useTokenStore())
      const pastTime = Date.now() - 3600000 // 1 hour ago

      act(() => {
        useTokenStore.setState({ token: 'expired.token', expiresAt: pastTime })
      })

      expect(result.current.isTokenValid()).toBe(false)
    })

    it('should return false when no token exists', () => {
      const { result } = renderHook(() => useTokenStore())

      expect(result.current.isTokenValid()).toBe(false)
    })

    it('should consider buffer time via shouldRefresh', () => {
      const { result } = renderHook(() => useTokenStore())
      const soonToExpire = Date.now() + 30000 // 30 seconds from now

      act(() => {
        useTokenStore.setState({
          token: 'soon.to.expire',
          expiresAt: soonToExpire,
        })
      })

      // Token is still valid
      expect(result.current.isTokenValid()).toBe(true)

      // But should refresh with 1 minute buffer
      expect(result.current.shouldRefresh(60000)).toBe(true)
    })
  })

  describe('timeUntilExpiry', () => {
    it('should return time until expiration', () => {
      const { result } = renderHook(() => useTokenStore())
      const futureTime = Date.now() + 3600000 // 1 hour from now

      act(() => {
        useTokenStore.setState({ token: 'test.token', expiresAt: futureTime })
      })

      const timeUntilExpiration = result.current.timeUntilExpiry()
      expect(timeUntilExpiration).toBeCloseTo(3600000, -3) // Within 1 second
    })

    it('should return null when no token exists', () => {
      const { result } = renderHook(() => useTokenStore())

      expect(result.current.timeUntilExpiry()).toBeNull()
    })

    it('should return negative value for expired token', () => {
      const { result } = renderHook(() => useTokenStore())
      const pastTime = Date.now() - 3600000 // 1 hour ago

      act(() => {
        useTokenStore.setState({ token: 'expired.token', expiresAt: pastTime })
      })

      const timeUntilExpiration = result.current.timeUntilExpiry()
      expect(timeUntilExpiration).toBeLessThan(0)
    })
  })

  describe('shouldRefresh', () => {
    it('should return true when token expires within refresh window', () => {
      const { result } = renderHook(() => useTokenStore())
      const soonToExpire = Date.now() + 4 * 60 * 1000 // 4 minutes from now

      act(() => {
        useTokenStore.setState({
          token: 'soon.to.expire',
          expiresAt: soonToExpire,
        })
      })

      // Default refresh window is 5 minutes
      expect(result.current.shouldRefresh()).toBe(true)
    })

    it('should return false when token has plenty of time left', () => {
      const { result } = renderHook(() => useTokenStore())
      const futureTime = Date.now() + 10 * 60 * 1000 // 10 minutes from now

      act(() => {
        useTokenStore.setState({ token: 'valid.token', expiresAt: futureTime })
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
        useTokenStore.setState({
          token: 'soon.to.expire',
          expiresAt: soonToExpire,
        })
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
        useTokenStore.setState({ token, expiresAt })
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
        useTokenStore.setState({ isLoading: true })
        useTokenStore.setState({
          token: 'token1',
          expiresAt: Date.now() + 3600000,
        })
        useTokenStore.setState({ isLoading: false })
      })

      expect(result.current.isLoading).toBe(false)
      expect(result.current.token).toBe('token1')
      expect(result.current.error).toBeNull()
    })
  })
})
