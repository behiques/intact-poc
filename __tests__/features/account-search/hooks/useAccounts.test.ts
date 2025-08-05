import { describe, it, expect, beforeEach, vi } from 'vitest'
import { renderHook } from '@testing-library/react'
import {
  QueryClient,
  QueryClientProvider,
  UseQueryResult,
} from '@tanstack/react-query'
import React from 'react'
import { useAccountSearch } from '../../../../src/features/account-search/hooks/useAccounts'
import {
  AccountSearchFormData,
  AccountSearchApiResponse,
} from '../../../../src/features/account-search/types'

// Mock the fetchAccounts API module
vi.mock('../../../../src/features/account-search/api/fetchAccounts', () => ({
  useAccountSearchQuery: vi.fn(),
}))

// Mock the API client
vi.mock('../../../../src/lib/api', () => ({
  apiClient: {
    get: vi.fn(),
  },
}))

// Mock the token store
vi.mock('../../../../src/features/common/stores/useTokenStore', () => ({
  useTokenStore: {
    getState: vi.fn(() => ({
      token: 'mock-auth-token-useaccounts-12345',
      getValidToken: vi
        .fn()
        .mockResolvedValue('mock-auth-token-useaccounts-12345'),
      isTokenValid: vi.fn().mockReturnValue(true),
    })),
  },
}))

import { useAccountSearchQuery } from '../../../../src/features/account-search/api/fetchAccounts'

const mockUseAccountSearchQuery = vi.mocked(useAccountSearchQuery)

// Helper to create proper mock query result
const createMockQueryResult = (overrides: Record<string, unknown> = {}) =>
  ({
    data: undefined,
    isLoading: false,
    error: null,
    refetch: vi.fn(),
    isError: false,
    isPending: false,
    isLoadingError: false,
    isRefetchError: false,
    isSuccess: false,
    isPlaceholderData: false,
    isPaused: false,
    isStale: false,
    isFetching: false,
    isFetched: false,
    isFetchedAfterMount: false,
    isRefetching: false,
    dataUpdatedAt: 0,
    errorUpdatedAt: 0,
    failureCount: 0,
    failureReason: null,
    fetchStatus: 'idle' as const,
    status: 'pending' as const,
    errorUpdateCount: 0,
    ...overrides,
  }) as unknown as UseQueryResult<AccountSearchApiResponse, Error>

// Test wrapper component for React Query
const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        gcTime: 0,
      },
    },
  })

  // eslint-disable-next-line react/display-name
  return ({ children }: { children: React.ReactNode }) =>
    React.createElement(QueryClientProvider, { client: queryClient }, children)
}

describe('useAccountSearch Hook', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Parameter Mapping', () => {
    it('should correctly map form data to API query parameters', () => {
      const formData: AccountSearchFormData = {
        accountName: 'Test Account',
        businessUnitId: 'E',
        city: 'Los Angeles',
        state: 'CA',
        street: '123 Test St',
        zip: '90210',
        effectiveDate: '2024-01-01T00:00:00Z',
        expirationDate: '2024-12-31T23:59:59Z',
      }

      const mockQueryResult = createMockQueryResult({
        data: { data: [] },
        isSuccess: true,
        status: 'success' as const,
      })

      mockUseAccountSearchQuery.mockReturnValue(mockQueryResult)

      renderHook(() => useAccountSearch(formData), {
        wrapper: createWrapper(),
      })

      // Verify the hook was called with properly mapped parameters
      expect(mockUseAccountSearchQuery).toHaveBeenCalledWith({
        AccountName: 'Test Account',
        BusinessUnitId: 'E',
        City: 'Los Angeles',
        State: 'CA',
        Street: '123 Test St',
        Zip: '90210',
        EffectiveDate: '2024-01-01T00:00:00Z',
        ExpirationDate: '2024-12-31T23:59:59Z',
      })
    })

    it('should handle minimal form data with only required fields', () => {
      const formData: AccountSearchFormData = {
        accountName: 'Minimal Test',
      }

      const mockQueryResult = createMockQueryResult({
        data: { data: [] },
        isSuccess: true,
        status: 'success' as const,
      })

      mockUseAccountSearchQuery.mockReturnValue(mockQueryResult)

      renderHook(() => useAccountSearch(formData), {
        wrapper: createWrapper(),
      })

      expect(mockUseAccountSearchQuery).toHaveBeenCalledWith({
        AccountName: 'Minimal Test',
        BusinessUnitId: undefined,
        City: undefined,
        State: undefined,
        Street: undefined,
        Zip: undefined,
        EffectiveDate: undefined,
        ExpirationDate: undefined,
      })
    })

    it('should handle partial form data', () => {
      const formData: AccountSearchFormData = {
        accountName: 'Partial Test',
        businessUnitId: 'E',
        city: 'Los Angeles',
      }

      const mockQueryResult = createMockQueryResult({
        data: { data: [] },
        isSuccess: true,
        status: 'success' as const,
      })

      mockUseAccountSearchQuery.mockReturnValue(mockQueryResult)

      renderHook(() => useAccountSearch(formData), {
        wrapper: createWrapper(),
      })

      expect(mockUseAccountSearchQuery).toHaveBeenCalledWith({
        AccountName: 'Partial Test',
        BusinessUnitId: 'E',
        City: 'Los Angeles',
        State: undefined,
        Street: undefined,
        Zip: undefined,
        EffectiveDate: undefined,
        ExpirationDate: undefined,
      })
    })
  })

  describe('Return Interface', () => {
    it('should return items, isLoading, error, and refetch properties', () => {
      const formData: AccountSearchFormData = {
        accountName: 'Interface Test',
      }

      const mockRefetchFn = vi.fn()
      const mockQueryResult = createMockQueryResult({
        data: {
          data: [
            {
              account: {
                id: 123,
                businessUnitId: 'E',
                businessUnitName: 'Entertainment',
                name: 'Test Account',
                producerCode: 'TEST001',
                producerName: 'Test Producer',
                status: 'Active',
                address: {
                  street: '123 Test St',
                  city: 'Los Angeles',
                  state: 'CA',
                  zip: '90210',
                },
              },
              term: {
                address: {
                  street: '123 Test St',
                  city: 'Los Angeles',
                  state: 'CA',
                  zip: '90210',
                  country: null,
                },
                businessUnitId: 'E',
                businessUnitName: 'Entertainment',
                effectiveDate: '2024-01-01T00:00:00Z',
                expirationDate: '2024-12-31T23:59:59Z',
                producerCode: 'TEST001',
                producerName: 'Test Producer',
                programType: 'Standard',
                territory: '001',
              },
            },
          ],
        },
        isSuccess: true,
        status: 'success' as const,
        refetch: mockRefetchFn,
      })

      mockUseAccountSearchQuery.mockReturnValue(mockQueryResult)

      const { result } = renderHook(() => useAccountSearch(formData), {
        wrapper: createWrapper(),
      })

      expect(result.current.items).toEqual(mockQueryResult.data?.data)
      expect(result.current.isLoading).toBe(false)
      expect(result.current.error).toBe(null)
      expect(result.current.refetch).toBe(mockRefetchFn)
    })

    it('should handle loading state correctly', () => {
      const formData: AccountSearchFormData = {
        accountName: 'Loading Test',
      }

      const mockQueryResult = createMockQueryResult({
        data: undefined,
        isLoading: true,
        isPending: true,
        status: 'pending' as const,
      })

      mockUseAccountSearchQuery.mockReturnValue(mockQueryResult)

      const { result } = renderHook(() => useAccountSearch(formData), {
        wrapper: createWrapper(),
      })

      expect(result.current.items).toBeUndefined()
      expect(result.current.isLoading).toBe(true)
      expect(result.current.error).toBe(null)
    })

    it('should handle error state correctly', () => {
      const formData: AccountSearchFormData = {
        accountName: 'Error Test',
      }

      const mockError = new Error('Test error')
      const mockQueryResult = createMockQueryResult({
        data: undefined,
        isLoading: false,
        error: mockError,
        isError: true,
        status: 'error' as const,
      })

      mockUseAccountSearchQuery.mockReturnValue(mockQueryResult)

      const { result } = renderHook(() => useAccountSearch(formData), {
        wrapper: createWrapper(),
      })

      expect(result.current.items).toBeUndefined()
      expect(result.current.isLoading).toBe(false)
      expect(result.current.error).toBe(mockError)
    })
  })

  describe('Hook Integration', () => {
    it('should call refetch function when hook refetch is called', () => {
      const formData: AccountSearchFormData = {
        accountName: 'Refetch Test',
      }

      const mockRefetchFn = vi.fn()
      const mockQueryResult = createMockQueryResult({
        data: { data: [] },
        isSuccess: true,
        status: 'success' as const,
        refetch: mockRefetchFn,
      })

      mockUseAccountSearchQuery.mockReturnValue(mockQueryResult)

      const { result } = renderHook(() => useAccountSearch(formData), {
        wrapper: createWrapper(),
      })

      result.current.refetch()
      expect(mockRefetchFn).toHaveBeenCalledTimes(1)
    })

    it('should maintain interface consistency across different data states', () => {
      const formData: AccountSearchFormData = {
        accountName: 'Consistency Test',
      }

      const mockQueryResult = createMockQueryResult({
        data: { data: [] },
        isSuccess: true,
        status: 'success' as const,
      })

      mockUseAccountSearchQuery.mockReturnValue(mockQueryResult)

      const { result } = renderHook(() => useAccountSearch(formData), {
        wrapper: createWrapper(),
      })

      // Verify all expected properties are present
      expect(result.current).toHaveProperty('items')
      expect(result.current).toHaveProperty('isLoading')
      expect(result.current).toHaveProperty('error')
      expect(result.current).toHaveProperty('refetch')

      // Verify types
      expect(typeof result.current.isLoading).toBe('boolean')
      expect(typeof result.current.refetch).toBe('function')
    })
  })
})
