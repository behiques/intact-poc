import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import {
  useToken,
  useValidToken,
  useCurrentToken,
  useTokenStatus,
} from './useToken'

// Mock the token store
const mockTokenStore = {
  token: null as string | null,
  expiresAt: null as number | null,
  isRefreshing: false,
  isLoading: false,
  error: null as unknown,
  lastRefreshAt: null as number | null,
  initialize: vi.fn(),
  refreshToken: vi.fn(),
  clearToken: vi.fn(),
  isTokenValid: vi.fn(),
  timeUntilExpiry: vi.fn(),
}

vi.mock('../stores/useTokenStore', () => ({
  useTokenStore: () => mockTokenStore,
}))

// Mock session cleanup
const mockCleanupFunction = vi.fn()
vi.mock('../utils/tokenStorage', () => ({
  setupSessionCleanup: vi.fn(() => mockCleanupFunction),
}))

describe('useToken hook', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    // Reset mock implementations
    mockTokenStore.initialize.mockResolvedValue(undefined)
    mockTokenStore.refreshToken.mockResolvedValue(undefined)
    mockTokenStore.clearToken.mockImplementation(() => {})
    mockTokenStore.isTokenValid.mockReturnValue(false)
    mockTokenStore.timeUntilExpiry.mockReturnValue(null)

    // Reset state
    mockTokenStore.token = null
    mockTokenStore.expiresAt = null
    mockTokenStore.isRefreshing = false
    mockTokenStore.isLoading = false
    mockTokenStore.error = null
    mockTokenStore.lastRefreshAt = null
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe('useToken', () => {
    it('should initialize token store on mount', async () => {
      renderHook(() => useToken())

      expect(mockTokenStore.initialize).toHaveBeenCalledOnce()
    })

    it('should set up session cleanup on mount', () => {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const { setupSessionCleanup } = require('../utils/tokenStorage')

      renderHook(() => useToken())

      expect(setupSessionCleanup).toHaveBeenCalledOnce()
    })

    it('should call cleanup function on unmount', () => {
      const { unmount } = renderHook(() => useToken())

      unmount()

      expect(mockCleanupFunction).toHaveBeenCalledOnce()
    })

    it('should return correct token state', () => {
      mockTokenStore.token = 'test-token'
      mockTokenStore.expiresAt = Date.now() + 3600000
      mockTokenStore.isLoading = true
      mockTokenStore.isRefreshing = false
      mockTokenStore.error = null
      mockTokenStore.lastRefreshAt = Date.now() - 1000

      const { result } = renderHook(() => useToken())

      expect(result.current.tokenState).toEqual({
        token: 'test-token',
        expiresAt: mockTokenStore.expiresAt,
        isRefreshing: false,
        isLoading: true,
        error: null,
        lastRefreshAt: mockTokenStore.lastRefreshAt,
      })
    })

    it('should return computed properties from store', () => {
      mockTokenStore.isTokenValid.mockReturnValue(true)
      mockTokenStore.timeUntilExpiry.mockReturnValue(3600000)

      const { result } = renderHook(() => useToken())

      expect(result.current.isTokenValid).toBe(true)
      expect(result.current.timeUntilExpiry).toBe(3600000)
    })

    it('should provide refreshToken function', async () => {
      const { result } = renderHook(() => useToken())

      await act(async () => {
        await result.current.refreshToken()
      })

      expect(mockTokenStore.refreshToken).toHaveBeenCalledOnce()
    })

    it('should provide clearToken function', () => {
      const { result } = renderHook(() => useToken())

      act(() => {
        result.current.clearToken()
      })

      expect(mockTokenStore.clearToken).toHaveBeenCalledOnce()
    })

    it('should handle initialization errors gracefully', async () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
      mockTokenStore.initialize.mockRejectedValue(new Error('Init failed'))

      renderHook(() => useToken())

      // Wait for async effect to complete
      await new Promise((resolve) => setTimeout(resolve, 0))

      expect(consoleSpy).toHaveBeenCalledWith(
        'Failed to initialize token store:',
        expect.any(Error)
      )

      consoleSpy.mockRestore()
    })

    it('should re-throw errors from refreshToken', async () => {
      const error = new Error('Refresh failed')
      mockTokenStore.refreshToken.mockRejectedValue(error)

      const { result } = renderHook(() => useToken())

      await expect(result.current.refreshToken()).rejects.toThrow(
        'Refresh failed'
      )
    })

    it('should not initialize multiple times on re-renders', () => {
      const { rerender } = renderHook(() => useToken())

      // Force re-render
      rerender()
      rerender()

      expect(mockTokenStore.initialize).toHaveBeenCalledOnce()
    })
  })

  describe('useValidToken', () => {
    it('should return same data as useToken', () => {
      mockTokenStore.isTokenValid.mockReturnValue(true)
      mockTokenStore.token = 'valid-token'

      const { result } = renderHook(() => useValidToken())

      expect(result.current.tokenState.token).toBe('valid-token')
      expect(result.current.isTokenValid).toBe(true)
    })

    it('should auto-refresh when token is invalid and autoRefresh is true', async () => {
      mockTokenStore.isTokenValid.mockReturnValue(false)
      mockTokenStore.isRefreshing = false

      renderHook(() => useValidToken(true))

      // Wait for effect to trigger
      await new Promise((resolve) => setTimeout(resolve, 0))

      expect(mockTokenStore.refreshToken).toHaveBeenCalledOnce()
    })

    it('should not auto-refresh when autoRefresh is false', async () => {
      mockTokenStore.isTokenValid.mockReturnValue(false)
      mockTokenStore.isRefreshing = false

      renderHook(() => useValidToken(false))

      // Wait for effect to potentially trigger
      await new Promise((resolve) => setTimeout(resolve, 0))

      expect(mockTokenStore.refreshToken).not.toHaveBeenCalled()
    })

    it('should not auto-refresh when already refreshing', async () => {
      mockTokenStore.isTokenValid.mockReturnValue(false)
      mockTokenStore.isRefreshing = true

      renderHook(() => useValidToken(true))

      // Wait for effect to potentially trigger
      await new Promise((resolve) => setTimeout(resolve, 0))

      expect(mockTokenStore.refreshToken).not.toHaveBeenCalled()
    })

    it('should handle auto-refresh errors gracefully', async () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
      mockTokenStore.isTokenValid.mockReturnValue(false)
      mockTokenStore.isRefreshing = false
      mockTokenStore.refreshToken.mockRejectedValue(
        new Error('Auto refresh failed')
      )

      renderHook(() => useValidToken(true))

      // Wait for effect to complete
      await new Promise((resolve) => setTimeout(resolve, 0))

      expect(consoleSpy).toHaveBeenCalledWith(
        'Auto token refresh failed:',
        expect.any(Error)
      )

      consoleSpy.mockRestore()
    })

    it('should default autoRefresh to true', async () => {
      mockTokenStore.isTokenValid.mockReturnValue(false)
      mockTokenStore.isRefreshing = false

      renderHook(() => useValidToken())

      // Wait for effect to trigger
      await new Promise((resolve) => setTimeout(resolve, 0))

      expect(mockTokenStore.refreshToken).toHaveBeenCalledOnce()
    })
  })

  describe('useCurrentToken', () => {
    it('should return token when valid', () => {
      mockTokenStore.token = 'valid-token'
      mockTokenStore.isTokenValid.mockReturnValue(true)

      const { result } = renderHook(() => useCurrentToken())

      expect(result.current).toBe('valid-token')
    })

    it('should return null when token is invalid', () => {
      mockTokenStore.token = 'invalid-token'
      mockTokenStore.isTokenValid.mockReturnValue(false)

      const { result } = renderHook(() => useCurrentToken())

      expect(result.current).toBeNull()
    })

    it('should return null when no token exists', () => {
      mockTokenStore.token = null
      mockTokenStore.isTokenValid.mockReturnValue(false)

      const { result } = renderHook(() => useCurrentToken())

      expect(result.current).toBeNull()
    })
  })

  describe('useTokenStatus', () => {
    it('should return correct status when token exists and is valid', () => {
      mockTokenStore.token = 'valid-token'
      mockTokenStore.isLoading = false
      mockTokenStore.isRefreshing = false
      mockTokenStore.error = null
      mockTokenStore.isTokenValid.mockReturnValue(true)
      mockTokenStore.timeUntilExpiry.mockReturnValue(10 * 60 * 1000) // 10 minutes

      const { result } = renderHook(() => useTokenStatus())

      expect(result.current).toEqual({
        hasToken: true,
        isValid: true,
        isLoading: false,
        isRefreshing: false,
        hasError: false,
        error: null,
        timeUntilExpiry: 10 * 60 * 1000,
        needsRefresh: false,
      })
    })

    it('should return correct status when token needs refresh', () => {
      mockTokenStore.token = 'expiring-token'
      mockTokenStore.isTokenValid.mockReturnValue(true)
      mockTokenStore.timeUntilExpiry.mockReturnValue(4 * 60 * 1000) // 4 minutes (less than 5 minute threshold)

      const { result } = renderHook(() => useTokenStatus())

      expect(result.current.needsRefresh).toBe(true)
      expect(result.current.timeUntilExpiry).toBe(4 * 60 * 1000)
    })

    it('should return correct status when token is loading', () => {
      mockTokenStore.token = null
      mockTokenStore.isLoading = true
      mockTokenStore.isRefreshing = false
      mockTokenStore.error = null
      mockTokenStore.isTokenValid.mockReturnValue(false)
      mockTokenStore.timeUntilExpiry.mockReturnValue(null)

      const { result } = renderHook(() => useTokenStatus())

      expect(result.current).toEqual({
        hasToken: false,
        isValid: false,
        isLoading: true,
        isRefreshing: false,
        hasError: false,
        error: null,
        timeUntilExpiry: null,
        needsRefresh: false,
      })
    })

    it('should return correct status when there is an error', () => {
      const error = {
        type: 'NETWORK_ERROR' as const,
        message: 'Network failed',
        timestamp: Date.now(),
      }
      mockTokenStore.token = null
      mockTokenStore.error = error
      mockTokenStore.isTokenValid.mockReturnValue(false)

      const { result } = renderHook(() => useTokenStatus())

      expect(result.current.hasError).toBe(true)
      expect(result.current.error).toEqual(error)
    })

    it('should handle null timeUntilExpiry correctly', () => {
      mockTokenStore.token = 'some-token'
      mockTokenStore.isTokenValid.mockReturnValue(true)
      mockTokenStore.timeUntilExpiry.mockReturnValue(null)

      const { result } = renderHook(() => useTokenStatus())

      expect(result.current.needsRefresh).toBe(false)
      expect(result.current.timeUntilExpiry).toBeNull()
    })
  })

  describe('error handling and edge cases', () => {
    it('should handle store method failures gracefully', () => {
      mockTokenStore.isTokenValid.mockImplementation(() => {
        throw new Error('Store method failed')
      })

      expect(() => renderHook(() => useToken())).toThrow('Store method failed')
    })

    it('should handle cleanup function being null', () => {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const { setupSessionCleanup } = require('../utils/tokenStorage')
      setupSessionCleanup.mockReturnValue(null)

      const { unmount } = renderHook(() => useToken())

      expect(() => unmount()).not.toThrow()
    })
  })
})
