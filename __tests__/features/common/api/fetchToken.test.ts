import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { retrieveToken } from '@/features/common/api/fetchToken'
import { env } from '@/utils/env'

// Mock the env utility
vi.mock('@/utils/env', () => ({
  env: {
    BACKEND_API_URL: 'https://api.test.com',
  },
}))

// Mock fetch globally
const mockFetch = vi.fn()
global.fetch = mockFetch

describe('fetchToken', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe('retrieveToken', () => {
    it('should successfully retrieve a token', async () => {
      const mockToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.test.token'
      const mockResponse = {
        ok: true,
        json: vi.fn().mockResolvedValue({ token: mockToken }),
      }

      mockFetch.mockResolvedValue(mockResponse)

      const result = await retrieveToken()

      expect(mockFetch).toHaveBeenCalledWith(
        `${env.BACKEND_API_URL}/api/token`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      expect(result.token).toBe(mockToken)
    })

    it('should throw an error when response is not ok', async () => {
      const mockResponse = {
        ok: false,
        status: 401,
        statusText: 'Unauthorized',
        json: vi.fn().mockResolvedValue({ error: 'Invalid credentials' }),
      }

      mockFetch.mockResolvedValue(mockResponse)

      await expect(retrieveToken()).rejects.toThrow(
        'Failed to retrieve token: 401 Unauthorized'
      )
    })

    it('should handle network errors', async () => {
      const networkError = new Error('Network connection failed')
      mockFetch.mockRejectedValue(networkError)

      await expect(retrieveToken()).rejects.toThrow('Network connection failed')
    })

    it('should handle response without token property', async () => {
      const mockResponse = {
        ok: true,
        json: vi.fn().mockResolvedValue({ data: 'no token here' }),
      }

      mockFetch.mockResolvedValue(mockResponse)

      await expect(retrieveToken()).rejects.toThrow(
        'No token received from server'
      )
    })

    it('should handle invalid JSON response', async () => {
      const mockResponse = {
        ok: true,
        json: vi.fn().mockRejectedValue(new Error('Invalid JSON')),
      }

      mockFetch.mockResolvedValue(mockResponse)

      await expect(retrieveToken()).rejects.toThrow('Invalid JSON')
    })

    it('should use correct headers for the request', async () => {
      const mockToken = 'test.token.here'
      const mockResponse = {
        ok: true,
        json: vi.fn().mockResolvedValue({ token: mockToken }),
      }

      mockFetch.mockResolvedValue(mockResponse)

      await retrieveToken()

      expect(mockFetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        })
      )
    })

    it('should handle 500 server errors', async () => {
      const mockResponse = {
        ok: false,
        status: 500,
        statusText: 'Internal Server Error',
        json: vi.fn().mockResolvedValue({ error: 'Server error' }),
      }

      mockFetch.mockResolvedValue(mockResponse)

      await expect(retrieveToken()).rejects.toThrow(
        'Failed to retrieve token: 500 Internal Server Error'
      )
    })

    it('should handle 403 forbidden errors', async () => {
      const mockResponse = {
        ok: false,
        status: 403,
        statusText: 'Forbidden',
        json: vi.fn().mockResolvedValue({ error: 'Access denied' }),
      }

      mockFetch.mockResolvedValue(mockResponse)

      await expect(retrieveToken()).rejects.toThrow(
        'Failed to retrieve token: 403 Forbidden'
      )
    })
  })
})
