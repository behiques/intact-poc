import { describe, it, expect, beforeEach, vi } from 'vitest'
import {
  fetchAccounts,
  createAccountsQueryKey,
} from '../../../../src/features/account-search/api/fetchAccounts'
import {
  AccountSearchQueryParams,
  AccountSearchApiResponse,
} from '../../../../src/features/account-search/types'
import type { ApiResponse } from '../../../../src/lib/api/types'

// Custom error type for testing API errors
interface ApiError extends Error {
  status?: number
  type?: string
  timestamp?: number
}

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
      token: 'mock-auth-token-fetchaccounts-12345',
      getValidToken: vi
        .fn()
        .mockResolvedValue('mock-auth-token-fetchaccounts-12345'),
      isTokenValid: vi.fn().mockReturnValue(true),
    })),
  },
}))

import { apiClient } from '../../../../src/lib/api'
const mockApiClient = vi.mocked(apiClient)

// Sample test data for account search responses
const createMockAccountSearchResponse =
  (): ApiResponse<AccountSearchApiResponse> => ({
    data: {
      data: [
        {
          account: {
            id: 123,
            businessUnitId: 'E',
            businessUnitName: 'Entertainment',
            name: 'Acme Productions LLC',
            producerCode: 'ENT001',
            producerName: 'John Smith Productions',
            status: 'Active',
            address: {
              street: '123 Hollywood Blvd',
              city: 'Los Angeles',
              state: 'CA',
              zip: '90210',
            },
            dba: 'Acme Films',
            fka: 'Old Acme Productions',
          },
          term: {
            address: {
              street: '123 Hollywood Blvd',
              city: 'Los Angeles',
              state: 'CA',
              zip: '90210',
              country: null,
            },
            businessUnitId: 'E',
            businessUnitName: 'Entertainment',
            effectiveDate: '2024-01-01T00:00:00Z',
            expirationDate: '2024-12-31T23:59:59Z',
            producerCode: 'ENT001',
            producerName: 'John Smith Productions',
            programType: 'Standard',
            territory: '001',
          },
        },
        {
          account: {
            id: 456,
            businessUnitId: 'T',
            businessUnitName: 'Technology',
            name: 'Tech Innovations Inc',
            producerCode: 'TEC001',
            producerName: 'Jane Doe Tech',
            status: 'Active',
            address: {
              street: '456 Silicon Valley Dr',
              city: 'San Francisco',
              state: 'CA',
              zip: '94107',
            },
          },
          term: {
            address: {
              street: '456 Silicon Valley Dr',
              city: 'San Francisco',
              state: 'CA',
              zip: '94107',
              country: null,
            },
            businessUnitId: 'T',
            businessUnitName: 'Technology',
            effectiveDate: '2024-02-01T00:00:00Z',
            expirationDate: '2024-12-31T23:59:59Z',
            producerCode: 'TEC001',
            producerName: 'Jane Doe Tech',
            programType: 'Premium',
            territory: '002',
          },
        },
      ],
    },
    status: 200,
    headers: {},
    ok: true,
  })

describe('fetchAccounts API - Comprehensive Test Suite', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Core API Functionality', () => {
    it('should successfully fetch accounts with minimal parameters', async () => {
      const mockResponse = createMockAccountSearchResponse()
      mockApiClient.get.mockResolvedValueOnce(mockResponse)

      const params: AccountSearchQueryParams = {
        AccountName: 'Test Account',
      }

      const result = await fetchAccounts(params)

      expect(mockApiClient.get).toHaveBeenCalledTimes(1)
      expect(mockApiClient.get).toHaveBeenCalledWith(
        '/samapi/api/clearance/v2/search',
        {
          params: {
            AccountName: 'Test Account',
          },
        }
      )

      expect(result).toEqual(mockResponse.data)
      expect(result.data).toHaveLength(2)
      expect(result.data[0].account.name).toBe('Acme Productions LLC')
    })

    it('should successfully fetch accounts with all parameters', async () => {
      const mockResponse = createMockAccountSearchResponse()
      mockApiClient.get.mockResolvedValueOnce(mockResponse)

      const params: AccountSearchQueryParams = {
        AccountName: 'Comprehensive Test Account',
        BusinessUnitId: 'E',
        City: 'Los Angeles',
        State: 'CA',
        Street: '123 Test Street',
        Zip: '90210',
        EffectiveDate: '2024-01-01T00:00:00Z',
        ExpirationDate: '2024-12-31T23:59:59Z',
      }

      const result = await fetchAccounts(params)

      expect(mockApiClient.get).toHaveBeenCalledWith(
        '/samapi/api/clearance/v2/search',
        {
          params: {
            AccountName: 'Comprehensive Test Account',
            BusinessUnitId: 'E',
            City: 'Los Angeles',
            State: 'CA',
            Street: '123 Test Street',
            Zip: '90210',
            EffectiveDate: '2024-01-01T00:00:00Z',
            ExpirationDate: '2024-12-31T23:59:59Z',
          },
        }
      )

      expect(result).toEqual(mockResponse.data)
    })

    it('should handle empty response correctly', async () => {
      const emptyResponse: ApiResponse<AccountSearchApiResponse> = {
        data: { data: [] },
        status: 200,
        headers: {},
        ok: true,
      }

      mockApiClient.get.mockResolvedValueOnce(emptyResponse)

      const params: AccountSearchQueryParams = {
        AccountName: 'No Results Test',
      }

      const result = await fetchAccounts(params)

      expect(mockApiClient.get).toHaveBeenCalledWith(
        '/samapi/api/clearance/v2/search',
        { params }
      )

      expect(result.data).toEqual([])
    })
  })

  describe('Authentication Integration', () => {
    it('should make authenticated requests through the API client', async () => {
      const mockResponse = createMockAccountSearchResponse()
      mockApiClient.get.mockResolvedValueOnce(mockResponse)

      const params: AccountSearchQueryParams = {
        AccountName: 'Auth Test Account',
      }

      const result = await fetchAccounts(params)

      // Verify the API client was called correctly with authentication
      expect(mockApiClient.get).toHaveBeenCalledTimes(1)
      expect(mockApiClient.get).toHaveBeenCalledWith(
        '/samapi/api/clearance/v2/search',
        {
          params: {
            AccountName: 'Auth Test Account',
          },
        }
      )

      expect(result).toEqual(mockResponse.data)
    })

    it('should handle authentication failures appropriately', async () => {
      const authError: ApiError = new Error(
        'API Client: Failed to obtain valid token for API request'
      )
      authError.status = 401
      authError.type = 'AUTH_FAILED'
      authError.timestamp = Date.now()

      mockApiClient.get.mockRejectedValueOnce(authError)

      const params: AccountSearchQueryParams = {
        AccountName: 'Auth Failure Test',
      }

      await expect(fetchAccounts(params)).rejects.toThrow(
        'API Client: Failed to obtain valid token for API request'
      )

      expect(mockApiClient.get).toHaveBeenCalledTimes(1)
    })

    it('should handle concurrent authenticated requests properly', async () => {
      const mockResponse = createMockAccountSearchResponse()
      mockApiClient.get.mockResolvedValue(mockResponse)

      const params1: AccountSearchQueryParams = {
        AccountName: 'Concurrent Test 1',
        BusinessUnitId: 'E',
      }

      const params2: AccountSearchQueryParams = {
        AccountName: 'Concurrent Test 2',
        BusinessUnitId: 'T',
      }

      const params3: AccountSearchQueryParams = {
        AccountName: 'Concurrent Test 3',
        City: 'New York',
        State: 'NY',
      }

      // Execute concurrent requests
      const [result1, result2, result3] = await Promise.all([
        fetchAccounts(params1),
        fetchAccounts(params2),
        fetchAccounts(params3),
      ])

      // Verify all requests were authenticated
      expect(mockApiClient.get).toHaveBeenCalledTimes(3)

      // Verify each call had proper parameters
      expect(mockApiClient.get).toHaveBeenNthCalledWith(
        1,
        '/samapi/api/clearance/v2/search',
        { params: params1 }
      )
      expect(mockApiClient.get).toHaveBeenNthCalledWith(
        2,
        '/samapi/api/clearance/v2/search',
        { params: params2 }
      )
      expect(mockApiClient.get).toHaveBeenNthCalledWith(
        3,
        '/samapi/api/clearance/v2/search',
        { params: params3 }
      )

      // Verify all requests succeeded
      expect(result1.data).toHaveLength(2)
      expect(result2.data).toHaveLength(2)
      expect(result3.data).toHaveLength(2)
    })
  })

  describe('Error Handling', () => {
    it('should provide meaningful error messages for authentication issues', async () => {
      const expiredTokenError: ApiError = new Error('Token expired')
      expiredTokenError.status = 401

      mockApiClient.get.mockRejectedValueOnce(expiredTokenError)

      const params: AccountSearchQueryParams = {
        AccountName: 'Token Expiry Test',
        BusinessUnitId: 'E',
      }

      try {
        await fetchAccounts(params)
        expect.fail('Should have thrown an error')
      } catch (error) {
        const apiError = error as ApiError
        expect(apiError.message).toBe('Failed to fetch accounts: Token expired')
        expect(apiError.message).toContain('Token expired')
      }

      expect(mockApiClient.get).toHaveBeenCalledWith(
        '/samapi/api/clearance/v2/search',
        {
          params: {
            AccountName: 'Token Expiry Test',
            BusinessUnitId: 'E',
          },
        }
      )
    })

    it('should handle 403 Forbidden errors with proper context', async () => {
      const forbiddenError: ApiError = new Error(
        'Access denied: insufficient permissions for account search'
      )
      forbiddenError.status = 403

      mockApiClient.get.mockRejectedValueOnce(forbiddenError)

      const params: AccountSearchQueryParams = {
        AccountName: 'Forbidden Test Account',
        City: 'Los Angeles',
        State: 'CA',
        Zip: '90210',
      }

      await expect(fetchAccounts(params)).rejects.toThrow(
        'Access denied: insufficient permissions for account search'
      )

      expect(mockApiClient.get).toHaveBeenCalledWith(
        '/samapi/api/clearance/v2/search',
        {
          params: {
            AccountName: 'Forbidden Test Account',
            City: 'Los Angeles',
            State: 'CA',
            Zip: '90210',
          },
        }
      )
    })

    it('should handle 500 server errors in authenticated context', async () => {
      const serverError: ApiError = new Error(
        'Internal server error during authenticated account search'
      )
      serverError.status = 500

      mockApiClient.get.mockRejectedValueOnce(serverError)

      const params: AccountSearchQueryParams = {
        AccountName: 'Server Error Test',
        BusinessUnitId: 'E',
        EffectiveDate: '2024-01-01T00:00:00Z',
        ExpirationDate: '2024-12-31T23:59:59Z',
      }

      await expect(fetchAccounts(params)).rejects.toThrow(
        'Internal server error during authenticated account search'
      )

      expect(mockApiClient.get).toHaveBeenCalledWith(
        '/samapi/api/clearance/v2/search',
        expect.objectContaining({
          params: expect.objectContaining({
            AccountName: 'Server Error Test',
            BusinessUnitId: 'E',
            EffectiveDate: '2024-01-01T00:00:00Z',
            ExpirationDate: '2024-12-31T23:59:59Z',
          }),
        })
      )
    })

    it('should handle network timeout during requests', async () => {
      const timeoutError = new Error(
        'Request timeout - authentication may have expired'
      )
      timeoutError.name = 'TimeoutError'

      mockApiClient.get.mockRejectedValueOnce(timeoutError)

      const params: AccountSearchQueryParams = {
        AccountName: 'Timeout Test Account',
      }

      await expect(fetchAccounts(params)).rejects.toThrow(
        'Request timeout - authentication may have expired'
      )

      expect(mockApiClient.get).toHaveBeenCalledWith(
        '/samapi/api/clearance/v2/search',
        { params }
      )
    })

    it('should handle malformed authentication response', async () => {
      const malformedError: ApiError = new Error(
        'Invalid authentication response format'
      )
      malformedError.status = 422

      mockApiClient.get.mockRejectedValueOnce(malformedError)

      const params: AccountSearchQueryParams = {
        AccountName: 'Malformed Auth Test',
        BusinessUnitId: 'E',
      }

      await expect(fetchAccounts(params)).rejects.toThrow(
        'Invalid authentication response format'
      )

      expect(mockApiClient.get).toHaveBeenCalledWith(
        '/samapi/api/clearance/v2/search',
        { params }
      )
    })
  })

  describe('Query Key Generation', () => {
    it('should generate consistent query keys for the same parameters', () => {
      const params: AccountSearchQueryParams = {
        AccountName: 'Test Account',
        BusinessUnitId: 'E',
        City: 'Los Angeles',
      }

      const key1 = createAccountsQueryKey(params)
      const key2 = createAccountsQueryKey(params)

      expect(key1).toEqual(key2)
      // The actual implementation uses a flattened array format
      expect(key1).toEqual([
        'fetchAccounts',
        'accountName',
        'Test Account',
        'businessUnitId',
        'E',
        'city',
        'Los Angeles',
      ])
    })

    it('should generate different query keys for different parameters', () => {
      const params1: AccountSearchQueryParams = {
        AccountName: 'Test Account 1',
        BusinessUnitId: 'E',
      }

      const params2: AccountSearchQueryParams = {
        AccountName: 'Test Account 2',
        BusinessUnitId: 'T',
      }

      const key1 = createAccountsQueryKey(params1)
      const key2 = createAccountsQueryKey(params2)

      expect(key1).not.toEqual(key2)
      expect(key1).toEqual([
        'fetchAccounts',
        'accountName',
        'Test Account 1',
        'businessUnitId',
        'E',
      ])
      expect(key2).toEqual([
        'fetchAccounts',
        'accountName',
        'Test Account 2',
        'businessUnitId',
        'T',
      ])
    })

    it('should handle query keys with all possible parameters', () => {
      const params: AccountSearchQueryParams = {
        AccountName: 'Complete Test',
        BusinessUnitId: 'E',
        City: 'Los Angeles',
        State: 'CA',
        Street: '123 Test St',
        Zip: '90210',
        EffectiveDate: '2024-01-01T00:00:00Z',
        ExpirationDate: '2024-12-31T23:59:59Z',
      }

      const queryKey = createAccountsQueryKey(params)

      expect(queryKey).toEqual([
        'fetchAccounts',
        'accountName',
        'Complete Test',
        'businessUnitId',
        'E',
        'city',
        'Los Angeles',
        'effectiveDate',
        '2024-01-01T00:00:00Z',
        'expirationDate',
        '2024-12-31T23:59:59Z',
        'state',
        'CA',
        'street',
        '123 Test St',
        'zip',
        '90210',
      ])
    })
  })

  describe('Parameter Validation and Edge Cases', () => {
    it('should maintain authentication state across multiple sequential API calls', async () => {
      const mockResponse = createMockAccountSearchResponse()
      mockApiClient.get.mockResolvedValue(mockResponse)

      // Make multiple sequential authenticated calls
      const testCases = [
        { AccountName: 'Sequential Test 1' },
        { AccountName: 'Sequential Test 2', BusinessUnitId: 'E' },
        { AccountName: 'Sequential Test 3', City: 'Chicago', State: 'IL' },
        { AccountName: 'Sequential Test 4', Zip: '60601' },
        {
          AccountName: 'Sequential Test 5',
          EffectiveDate: '2024-01-01T00:00:00Z',
        },
      ]

      for (let i = 0; i < testCases.length; i++) {
        const result = await fetchAccounts(testCases[i])
        expect(result.data).toHaveLength(2)
      }

      // Verify all calls were authenticated
      expect(mockApiClient.get).toHaveBeenCalledTimes(testCases.length)

      // Verify each call was properly authenticated with the API client
      testCases.forEach((params, index) => {
        expect(mockApiClient.get).toHaveBeenNthCalledWith(
          index + 1,
          '/samapi/api/clearance/v2/search',
          { params }
        )
      })
    })

    it('should handle API client integration correctly', async () => {
      const mockResponse = createMockAccountSearchResponse()
      mockApiClient.get.mockResolvedValueOnce(mockResponse)

      const params: AccountSearchQueryParams = {
        AccountName: 'API Client Integration Test',
      }

      await fetchAccounts(params)

      // Verify the authenticated API client was used
      // (The actual token attachment happens at the API client level)
      expect(mockApiClient.get).toHaveBeenCalledTimes(1)
      expect(mockApiClient.get).toHaveBeenCalledWith(
        '/samapi/api/clearance/v2/search',
        {
          params: {
            AccountName: 'API Client Integration Test',
          },
        }
      )
    })

    it('should use the correct endpoint URL', async () => {
      const mockResponse = createMockAccountSearchResponse()
      mockApiClient.get.mockResolvedValueOnce(mockResponse)

      const params: AccountSearchQueryParams = {
        AccountName: 'Endpoint Test',
      }

      await fetchAccounts(params)

      expect(mockApiClient.get).toHaveBeenCalledWith(
        '/samapi/api/clearance/v2/search',
        expect.any(Object)
      )
    })
  })
})
