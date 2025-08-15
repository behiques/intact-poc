import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { POST, GET } from '@/app/api/auth/token/route'

// Mock fetch globally
const mockFetch = vi.fn()
global.fetch = mockFetch

// Mock environment variables
vi.stubGlobal('process', {
  env: {
    NEXT_PUBLIC_AUTH_TOKEN_API_URL:
      'https://microservices.dev.droot.dmn/security-api/api/security',
    NEXT_PUBLIC_USER_SYSTEM_ID: 'IXDRAKE',
  },
})

describe('Token API Route', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe('POST /api/auth/token', () => {
    it('should successfully proxy token request to external API', async () => {
      const mockToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.test.token'
      const mockExpiration = '2025-08-14T20:00:00Z'

      // Mock successful external API response
      mockFetch.mockResolvedValue({
        ok: true,
        status: 200,
        json: vi.fn().mockResolvedValue({
          token: mockToken,
          expiration: mockExpiration,
        }),
      })

      const response = await POST()
      const responseData = await response.json()

      expect(mockFetch).toHaveBeenCalledWith(
        'https://microservices.dev.droot.dmn/security-api/api/security',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            usersystemid: 'IXDRAKE',
          },
        }
      )

      expect(response.status).toBe(200)
      expect(responseData).toEqual({
        token: mockToken,
        expiration: mockExpiration,
      })
    })

    it('should handle external API errors correctly', async () => {
      // Mock external API error response
      mockFetch.mockResolvedValue({
        ok: false,
        status: 401,
        statusText: 'Unauthorized',
        text: vi.fn().mockResolvedValue('Invalid credentials'),
      })

      const response = await POST()
      const responseData = await response.json()

      expect(response.status).toBe(401)
      expect(responseData).toMatchObject({
        error: 'EXTERNAL_API_ERROR',
        message: expect.stringContaining('401'),
        statusCode: 401,
      })
    })

    it('should handle missing environment variables', async () => {
      // Temporarily override environment variables
      vi.stubGlobal('process', {
        env: {
          // Missing required environment variables
        },
      })

      const response = await POST()
      const responseData = await response.json()

      expect(response.status).toBe(500)
      expect(responseData).toMatchObject({
        error: 'CONFIGURATION_ERROR',
        message: 'Authentication service not configured',
        statusCode: 500,
      })
    })

    it('should handle network errors', async () => {
      // Mock network error
      mockFetch.mockRejectedValue(new Error('Network connection failed'))

      const response = await POST()
      const responseData = await response.json()

      expect(response.status).toBe(503)
      expect(responseData).toMatchObject({
        error: 'NETWORK_ERROR',
        message: 'Failed to connect to authentication service',
        statusCode: 503,
      })
    })

    it('should handle invalid response format from external API', async () => {
      // Mock invalid response format
      mockFetch.mockResolvedValue({
        ok: true,
        status: 200,
        json: vi.fn().mockResolvedValue({
          // Missing required fields
          invalidField: 'value',
        }),
      })

      const response = await POST()
      const responseData = await response.json()

      expect(response.status).toBe(502)
      expect(responseData).toMatchObject({
        error: 'INVALID_RESPONSE',
        message: 'Authentication service returned invalid response format',
        statusCode: 502,
      })
    })
  })

  describe('GET /api/auth/token', () => {
    it('should return method not allowed error', async () => {
      const response = await GET()
      const responseData = await response.json()

      expect(response.status).toBe(405)
      expect(responseData).toMatchObject({
        error: 'METHOD_NOT_ALLOWED',
        message: 'Only POST method is allowed',
        statusCode: 405,
      })
    })
  })
})
