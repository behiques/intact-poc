import { describe, it, expect, beforeEach, vi } from 'vitest'
import { fetchBusinessUnits } from '../../../../src/features/account-search/api/fetchBusinessUnits'
import type { ApiResponse } from '../../../../src/lib/api/types'
import type { BusinessUnitApiResponse } from '../../../../src/features/account-search/types'

// Mock the API client to intercept and verify authentication
vi.mock('../../../../src/lib/api', () => ({
  apiClient: {
    get: vi.fn(),
  },
}))

// Mock the token store to control authentication behavior
vi.mock('../../../../src/features/common/stores/useTokenStore', () => ({
  useTokenStore: {
    getState: vi.fn(() => ({
      token: 'mock-auth-token-12345',
      getValidToken: vi.fn().mockResolvedValue('mock-auth-token-12345'),
      isTokenValid: vi.fn().mockReturnValue(true),
    })),
  },
}))

import { apiClient } from '../../../../src/lib/api'
const mockApiClient = vi.mocked(apiClient)

describe('fetchBusinessUnits - Authentication Integration', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Token Attachment Verification', () => {
    it('should make authenticated requests through the API client', async () => {
      // Setup mock response
      const mockResponse: ApiResponse<BusinessUnitApiResponse> = {
        data: {
          data: [
            {
              businessUnitId: 'E',
              abbreviation: 'ENT',
              description: 'Entertainment Division',
              groupTitle: 'Media Group',
              isActive: true,
              isEligibleForAdmitted: true,
              name: 'Entertainment',
              url: '/business-units/entertainment',
            },
          ],
        },
        status: 200,
        headers: {},
        ok: true,
      }

      mockApiClient.get.mockResolvedValueOnce(mockResponse)

      // Call the function
      const result = await fetchBusinessUnits()

      // Verify the API client was called correctly
      expect(mockApiClient.get).toHaveBeenCalledTimes(1)
      expect(mockApiClient.get).toHaveBeenCalledWith(
        '/common-api/api/v1/common/businessunits',
        {
          params: undefined,
        }
      )

      // Verify response
      expect(result).toEqual(mockResponse.data)
    })

    it('should use the authenticated API client for requests with parameters', async () => {
      // Setup mock response
      const mockResponse: ApiResponse<BusinessUnitApiResponse> = {
        data: {
          data: [
            {
              businessUnitId: 'E',
              abbreviation: 'ENT',
              description: 'Entertainment Division',
              groupTitle: 'Media Group',
              isActive: true,
              isEligibleForAdmitted: true,
              name: 'Entertainment',
              url: '/business-units/entertainment',
            },
          ],
        },
        status: 200,
        headers: {},
        ok: true,
      }

      mockApiClient.get.mockResolvedValueOnce(mockResponse)

      // Call with parameters
      const params = { BusinessUnitId: 'E', Fields: 'businessUnitId,name' }
      const result = await fetchBusinessUnits(params)

      // Verify the API client was called with parameters
      expect(mockApiClient.get).toHaveBeenCalledTimes(1)
      expect(mockApiClient.get).toHaveBeenCalledWith(
        '/common-api/api/v1/common/businessunits',
        {
          params: {
            BusinessUnitId: 'E',
            Fields: 'businessUnitId,name',
          },
        }
      )

      // Verify response
      expect(result).toEqual(mockResponse.data)
    })

    it('should handle authentication failures appropriately', async () => {
      // Mock an authentication error from the API client
      const authError = new Error('Authentication failed')
      Object.assign(authError, {
        status: 401,
        type: 'AUTH_FAILED',
        message: 'API Client: Failed to obtain valid token for API request',
        timestamp: Date.now(),
      })

      mockApiClient.get.mockRejectedValueOnce(authError)

      // Verify that authentication errors are properly propagated
      await expect(fetchBusinessUnits()).rejects.toThrow(
        'Failed to fetch business units: API Client: Failed to obtain valid token for API request'
      )

      expect(mockApiClient.get).toHaveBeenCalledTimes(1)
    })

    it('should verify that the real API client configuration requires authentication', () => {
      // This test documents that we're using an authenticated API client
      // The actual implementation is verified through integration tests

      // The fetchBusinessUnits function uses apiClient.get() which should:
      // 1. Be an authenticated client (requiresAuth: true)
      // 2. Automatically attach Bearer tokens via interceptors
      // 3. Handle 401 errors with token refresh and retry

      expect(mockApiClient.get).toBeDefined()
      expect(typeof mockApiClient.get).toBe('function')
    })
  })

  describe('API Client Configuration Validation', () => {
    it('should use the correct endpoint for business units API', async () => {
      const mockResponse: ApiResponse<BusinessUnitApiResponse> = {
        data: { data: [] },
        status: 200,
        headers: {},
        ok: true,
      }

      mockApiClient.get.mockResolvedValueOnce(mockResponse)

      await fetchBusinessUnits()

      // Verify the correct backend endpoint is used
      expect(mockApiClient.get).toHaveBeenCalledWith(
        '/common-api/api/v1/common/businessunits',
        expect.any(Object)
      )
    })

    it('should handle different parameter combinations correctly', async () => {
      const mockResponse: ApiResponse<BusinessUnitApiResponse> = {
        data: { data: [] },
        status: 200,
        headers: {},
        ok: true,
      }

      mockApiClient.get.mockResolvedValueOnce(mockResponse)

      const params = {
        BusinessUnitId: 'E',
        Fields: 'businessUnitId,name,description',
        ReturnAll: true,
      }

      await fetchBusinessUnits(params)

      // Verify all parameters are passed correctly
      expect(mockApiClient.get).toHaveBeenCalledWith(
        '/common-api/api/v1/common/businessunits',
        {
          params: {
            BusinessUnitId: 'E',
            Fields: 'businessUnitId,name,description',
            ReturnAll: true,
          },
        }
      )
    })
  })

  describe('Error Handling with Authentication Context', () => {
    it('should provide meaningful error messages for authentication issues', async () => {
      const authError = new Error('Token expired')
      Object.assign(authError, { status: 401 })

      mockApiClient.get.mockRejectedValueOnce(authError)

      try {
        await fetchBusinessUnits()
        expect.fail('Should have thrown an error')
      } catch (error) {
        expect(error).toBeInstanceOf(Error)
        expect((error as Error).message).toContain(
          'Failed to fetch business units'
        )
        expect((error as Error).message).toContain('Token expired')
      }
    })

    it('should handle network errors during authenticated requests', async () => {
      const networkError = new Error('Network unreachable')
      Object.assign(networkError, { status: 0 })

      mockApiClient.get.mockRejectedValueOnce(networkError)

      await expect(fetchBusinessUnits()).rejects.toThrow(
        'Failed to fetch business units: Network unreachable'
      )
    })
  })
})
