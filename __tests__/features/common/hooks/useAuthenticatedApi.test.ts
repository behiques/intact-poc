import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useAuthenticatedApi } from '@/features/common/hooks/useAuthenticatedApi'

// Mock the token hooks
const mockUseCurrentToken = vi.fn()
const mockUseToken = vi.fn()

vi.mock('@/features/common/hooks/useToken', () => ({
  useCurrentToken: () => mockUseCurrentToken(),
  useToken: () => mockUseToken(),
}))

// Mock the token store
const mockTokenStoreState = {
  token: 'valid-token',
  expiresAt: null,
  isRefreshing: false,
  isLoading: false,
  error: null,
  lastRefreshAt: null,
}

vi.mock('@/features/common/stores/useTokenStore', () => ({
  useTokenStore: {
    getState: vi.fn(() => mockTokenStoreState),
  },
}))

// Mock the token config
vi.mock('@/features/common/utils/config', () => ({
  tokenConfig: {
    backendApiUrl: 'https://api.backend.com',
    authTokenApiUrl: 'https://auth.api.com',
    userSystemId: 'test-system',
  },
}))

// Mock fetch globally
const mockFetch = vi.fn()
global.fetch = mockFetch

describe('useAuthenticatedApi hook', () => {
  const mockRefreshToken = vi.fn()
  const mockTokenState = {
    token: null as string | null,
    expiresAt: null as number | null,
    isRefreshing: false,
    isLoading: false,
    error: null as unknown,
    lastRefreshAt: null as number | null,
  }

  beforeEach(() => {
    vi.clearAllMocks()

    // Setup default mocks
    mockUseCurrentToken.mockReturnValue('valid-token')
    mockUseToken.mockReturnValue({
      refreshToken: mockRefreshToken,
      tokenState: mockTokenState,
    })
    mockRefreshToken.mockResolvedValue(undefined)

    // Reset token state
    mockTokenState.token = 'valid-token'
    mockTokenState.isLoading = false
    mockTokenState.isRefreshing = false
    mockTokenState.error = null

    // Reset store state
    mockTokenStoreState.token = 'valid-token'
    mockTokenStoreState.isRefreshing = false
    mockTokenStoreState.isLoading = false
    mockTokenStoreState.error = null
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe('isReady property', () => {
    it('should be true when token exists and not loading/refreshing', () => {
      const { result } = renderHook(() => useAuthenticatedApi())

      expect(result.current.isReady).toBe(true)
    })

    it('should be false when no token exists', () => {
      mockUseCurrentToken.mockReturnValue(null)

      const { result } = renderHook(() => useAuthenticatedApi())

      expect(result.current.isReady).toBe(false)
    })

    it('should be false when loading', () => {
      mockTokenState.isLoading = true

      const { result } = renderHook(() => useAuthenticatedApi())

      expect(result.current.isReady).toBe(false)
    })

    it('should be false when refreshing', () => {
      mockTokenState.isRefreshing = true

      const { result } = renderHook(() => useAuthenticatedApi())

      expect(result.current.isReady).toBe(false)
    })
  })

  describe('request function', () => {
    const mockResponse = {
      ok: true,
      status: 200,
      headers: new Headers({ 'content-type': 'application/json' }),
      json: vi.fn().mockResolvedValue({ data: 'test-data' }),
      text: vi.fn().mockResolvedValue('response text'),
    }

    beforeEach(() => {
      mockFetch.mockResolvedValue(mockResponse)
    })

    it('should make GET request with authorization header', async () => {
      const { result } = renderHook(() => useAuthenticatedApi())

      await act(async () => {
        await result.current.request({
          url: 'https://api.backend.com/test',
          method: 'GET',
        })
      })

      expect(mockFetch).toHaveBeenCalledWith('https://api.backend.com/test', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer valid-token',
        },
      })
    })

    it('should make POST request with body', async () => {
      const { result } = renderHook(() => useAuthenticatedApi())
      const testData = { name: 'test' }

      await act(async () => {
        await result.current.request({
          url: 'https://api.backend.com/test',
          method: 'POST',
          body: testData,
        })
      })

      expect(mockFetch).toHaveBeenCalledWith('https://api.backend.com/test', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer valid-token',
        },
        body: JSON.stringify(testData),
      })
    })

    it('should handle string body correctly', async () => {
      const { result } = renderHook(() => useAuthenticatedApi())

      await act(async () => {
        await result.current.request({
          url: 'https://api.backend.com/test',
          method: 'POST',
          body: 'raw-string-data',
        })
      })

      expect(mockFetch).toHaveBeenCalledWith(
        'https://api.backend.com/test',
        expect.objectContaining({
          body: 'raw-string-data',
        })
      )
    })

    it('should include custom headers', async () => {
      const { result } = renderHook(() => useAuthenticatedApi())

      await act(async () => {
        await result.current.request({
          url: 'https://api.backend.com/test',
          method: 'GET',
          headers: {
            'X-Custom-Header': 'custom-value',
          },
        })
      })

      expect(mockFetch).toHaveBeenCalledWith('https://api.backend.com/test', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer valid-token',
          'X-Custom-Header': 'custom-value',
        },
      })
    })

    it('should construct backend URL correctly for relative paths', async () => {
      const { result } = renderHook(() => useAuthenticatedApi())

      await act(async () => {
        await result.current.request({
          url: '/api/test',
          method: 'GET',
        })
      })

      expect(mockFetch).toHaveBeenCalledWith(
        'https://api.backend.com/api/test',
        expect.any(Object)
      )
    })

    it('should construct backend URL correctly for paths without leading slash', async () => {
      const { result } = renderHook(() => useAuthenticatedApi())

      await act(async () => {
        await result.current.request({
          url: 'api/test',
          method: 'GET',
        })
      })

      expect(mockFetch).toHaveBeenCalledWith(
        'https://api.backend.com/api/test',
        expect.any(Object)
      )
    })

    it('should use full URL when provided', async () => {
      const { result } = renderHook(() => useAuthenticatedApi())

      await act(async () => {
        await result.current.request({
          url: 'https://external-api.com/test',
          method: 'GET',
        })
      })

      expect(mockFetch).toHaveBeenCalledWith(
        'https://external-api.com/test',
        expect.any(Object)
      )
    })

    it('should return parsed response', async () => {
      const responseData = { id: 1, name: 'test' }
      mockResponse.json.mockResolvedValue(responseData)

      const { result } = renderHook(() => useAuthenticatedApi())

      let response
      await act(async () => {
        response = await result.current.request({
          url: 'https://api.backend.com/test',
          method: 'GET',
        })
      })

      expect(response).toEqual({
        data: responseData,
        status: 200,
        headers: expect.any(Object),
      })
    })

    it('should throw error when no token available', async () => {
      mockUseCurrentToken.mockReturnValue(null)

      const { result } = renderHook(() => useAuthenticatedApi())

      await expect(
        act(async () => {
          await result.current.request({
            url: 'https://api.backend.com/test',
            method: 'GET',
          })
        })
      ).rejects.toThrow('No valid authentication token available')
    })
  })

  describe('401 retry logic', () => {
    it('should retry request after token refresh on 401', async () => {
      const unauthorizedResponse = {
        ok: false,
        status: 401,
        statusText: 'Unauthorized',
        text: vi.fn().mockResolvedValue('Unauthorized'),
      }

      const successResponse = {
        ok: true,
        status: 200,
        headers: new Headers(),
        json: vi.fn().mockResolvedValue({ data: 'success' }),
        text: vi.fn().mockResolvedValue('Success'),
      }

      // First call returns 401, second call (after refresh) returns success
      mockFetch
        .mockResolvedValueOnce(unauthorizedResponse)
        .mockResolvedValueOnce(successResponse)

      // Mock token refresh updating the token
      mockUseCurrentToken.mockReturnValue('expired-token')

      // Simulate token change after refresh
      mockRefreshToken.mockImplementation(async () => {
        mockTokenStoreState.token = 'new-token'
      })

      const { result } = renderHook(() => useAuthenticatedApi())

      let response
      await act(async () => {
        response = await result.current.request({
          url: 'https://api.backend.com/test',
          method: 'GET',
        })
      })

      expect(mockRefreshToken).toHaveBeenCalledOnce()
      expect(mockFetch).toHaveBeenCalledTimes(2)
      expect(response).toEqual({
        data: { data: 'success' },
        status: 200,
        headers: expect.any(Object),
      })
    })

    it('should not retry when retry is disabled', async () => {
      const unauthorizedResponse = {
        ok: false,
        status: 401,
        statusText: 'Unauthorized',
        text: vi.fn().mockResolvedValue('Unauthorized'),
      }

      mockFetch.mockResolvedValue(unauthorizedResponse)

      const { result } = renderHook(() => useAuthenticatedApi())

      await expect(
        act(async () => {
          await result.current.request({
            url: 'https://api.backend.com/test',
            method: 'GET',
            retry: false,
          })
        })
      ).rejects.toThrow('HTTP 401: Unauthorized')

      expect(mockRefreshToken).not.toHaveBeenCalled()
      expect(mockFetch).toHaveBeenCalledTimes(1)
    })

    it('should throw error if token refresh fails', async () => {
      const unauthorizedResponse = {
        ok: false,
        status: 401,
        statusText: 'Unauthorized',
      }

      mockFetch.mockResolvedValue(unauthorizedResponse)
      mockRefreshToken.mockRejectedValue(new Error('Refresh failed'))

      const { result } = renderHook(() => useAuthenticatedApi())

      await expect(
        act(async () => {
          await result.current.request({
            url: 'https://api.backend.com/test',
            method: 'GET',
          })
        })
      ).rejects.toThrow('Token refresh failed during request retry')

      expect(mockRefreshToken).toHaveBeenCalledOnce()
      expect(mockFetch).toHaveBeenCalledTimes(1)
    })

    it('should handle token refresh errors during retry', async () => {
      const unauthorizedResponse = {
        ok: false,
        status: 401,
        statusText: 'Unauthorized',
        text: vi.fn().mockResolvedValue('Unauthorized'),
      }

      mockFetch.mockResolvedValue(unauthorizedResponse)
      mockUseCurrentToken.mockReturnValue('expired-token')

      // Don't change the token - this simulates a case where refresh doesn't work properly
      mockRefreshToken.mockImplementation(async () => {
        // Token doesn't change, or some other issue occurs
      })

      const { result } = renderHook(() => useAuthenticatedApi())

      await expect(
        act(async () => {
          await result.current.request({
            url: 'https://api.backend.com/test',
            method: 'GET',
          })
        })
      ).rejects.toThrow('Token refresh failed during request retry')

      expect(mockRefreshToken).toHaveBeenCalledOnce()
      expect(mockFetch).toHaveBeenCalledTimes(1)
    })
  })

  describe('error handling', () => {
    it('should handle non-401 HTTP errors', async () => {
      const errorResponse = {
        ok: false,
        status: 500,
        statusText: 'Internal Server Error',
        text: vi.fn().mockResolvedValue('Server error details'),
      }

      mockFetch.mockResolvedValue(errorResponse)

      const { result } = renderHook(() => useAuthenticatedApi())

      await expect(
        act(async () => {
          await result.current.request({
            url: 'https://api.backend.com/test',
            method: 'GET',
          })
        })
      ).rejects.toThrow('Server error: 500 - Server error details')
    })

    it('should handle network errors', async () => {
      mockFetch.mockRejectedValue(new Error('Network error'))

      const { result } = renderHook(() => useAuthenticatedApi())

      await expect(
        act(async () => {
          await result.current.request({
            url: 'https://api.backend.com/test',
            method: 'GET',
          })
        })
      ).rejects.toThrow('Network error')
    })

    it('should handle JSON parsing errors', async () => {
      const response = {
        ok: true,
        status: 200,
        headers: new Headers(),
        json: vi.fn().mockRejectedValue(new Error('Invalid JSON')),
      }

      mockFetch.mockResolvedValue(response)

      const { result } = renderHook(() => useAuthenticatedApi())

      await expect(
        act(async () => {
          await result.current.request({
            url: 'https://api.backend.com/test',
            method: 'GET',
          })
        })
      ).rejects.toThrow('Invalid JSON')
    })
  })

  describe('hook stability', () => {
    it('should maintain function reference stability', () => {
      const { result, rerender } = renderHook(() => useAuthenticatedApi())

      const firstRequest = result.current.request

      rerender()

      const secondRequest = result.current.request

      expect(firstRequest).toBe(secondRequest)
    })

    it('should update isReady when dependencies change', () => {
      const { result, rerender } = renderHook(() => useAuthenticatedApi())

      expect(result.current.isReady).toBe(true)

      // Change token state
      mockTokenState.isLoading = true
      rerender()

      expect(result.current.isReady).toBe(false)
    })
  })

  describe('edge cases', () => {
    beforeEach(() => {
      const successResponse = {
        ok: true,
        status: 200,
        headers: new Headers(),
        json: vi.fn().mockResolvedValue({ data: 'success' }),
        text: vi.fn().mockResolvedValue('Success'),
      }
      mockFetch.mockResolvedValue(successResponse)
    })

    it('should handle GET request with body (body should be ignored)', async () => {
      const { result } = renderHook(() => useAuthenticatedApi())

      await act(async () => {
        await result.current.request({
          url: 'https://api.backend.com/test',
          method: 'GET',
          body: { ignored: 'data' },
        })
      })

      expect(mockFetch).toHaveBeenCalledWith(
        'https://api.backend.com/test',
        expect.not.objectContaining({
          body: expect.anything(),
        })
      )
    })

    it('should handle empty response body', async () => {
      const response = {
        ok: true,
        status: 204,
        headers: new Headers(),
        json: vi.fn().mockResolvedValue(null),
        text: vi.fn().mockResolvedValue(''),
      }

      mockFetch.mockResolvedValue(response)

      const { result } = renderHook(() => useAuthenticatedApi())

      let apiResponse
      await act(async () => {
        apiResponse = await result.current.request({
          url: 'https://api.backend.com/test',
          method: 'DELETE',
        })
      })

      expect(apiResponse).toEqual({
        data: null,
        status: 204,
        headers: expect.any(Object),
      })
    })

    it('should handle undefined body', async () => {
      const { result } = renderHook(() => useAuthenticatedApi())

      await act(async () => {
        await result.current.request({
          url: 'https://api.backend.com/test',
          method: 'POST',
          body: undefined,
        })
      })

      expect(mockFetch).toHaveBeenCalledWith(
        'https://api.backend.com/test',
        expect.not.objectContaining({
          body: expect.anything(),
        })
      )
    })
  })
})
