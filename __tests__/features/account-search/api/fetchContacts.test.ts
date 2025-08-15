import { describe, it, expect, beforeEach, vi } from 'vitest'
import {
  fetchContacts,
  createContactsQueryKey,
  useContactsQuery,
} from '../../../../src/features/account-search/api/fetchProducerContacts'
import {
  ContactsQueryParams,
  ContactApiResponse,
  Contact,
} from '../../../../src/features/account-search/types'
import type { ApiResponse } from '../../../../src/lib/api/types'
import { renderHook, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'

// Mock the API client
vi.mock('../../../../src/lib/api', () => ({
  apiClient: {
    get: vi.fn(),
  },
}))

import { apiClient } from '../../../../src/lib/api'
const mockApiClient = vi.mocked(apiClient)

// Helper function to create mock API responses
const createMockApiResponse = (
  data: Contact[]
): ApiResponse<ContactApiResponse> => ({
  data: {
    data: data,
  },
  status: 200,
  headers: {},
  ok: true,
})

// Test wrapper component for React Query
const createTestWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        gcTime: 0,
      },
    },
  })

  const TestWrapper = ({ children }: { children: React.ReactNode }) =>
    React.createElement(QueryClientProvider, { client: queryClient }, children)

  return { TestWrapper }
}

describe('fetchContacts', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Basic Functionality', () => {
    it('should fetch contacts without parameters', async () => {
      const producerCode = '2092049'
      const contactsData: Contact[] = [
        {
          producerContactId: 2092049,
          firstName: 'FRODO',
          lastName: 'BAGGINS',
          email: 'frodo.baggins@the-shire.com',
          phone: '5553244399',
        },
      ]
      const mockResponse = createMockApiResponse(contactsData)
      mockApiClient.get.mockResolvedValueOnce(mockResponse)

      const result = await fetchContacts(producerCode)

      expect(mockApiClient.get).toHaveBeenCalledWith(
        `/common-api/api/v1/common/producers/${producerCode}/contacts`,
        {
          params: undefined,
        }
      )
      expect(result).toEqual({ data: contactsData })
    })

    it('should fetch contacts with ProducerContactId parameter', async () => {
      const producerCode = '2092049'
      const params: ContactsQueryParams = { ProducerContactId: 123456 }
      const contactsData: Contact[] = [
        {
          producerContactId: 123456,
          firstName: 'JOHN',
          lastName: 'DOE',
          email: 'john.doe@example.com',
          phone: '555-1234',
        },
      ]
      const mockResponse = createMockApiResponse(contactsData)
      mockApiClient.get.mockResolvedValueOnce(mockResponse)

      const result = await fetchContacts(producerCode, params)

      expect(mockApiClient.get).toHaveBeenCalledWith(
        `/common-api/api/v1/common/producers/${producerCode}/contacts`,
        {
          params: { ProducerContactId: 123456 },
        }
      )
      expect(result).toEqual({ data: contactsData })
    })

    it('should fetch contacts with Fields parameter', async () => {
      const producerCode = '2092049'
      const params: ContactsQueryParams = { Fields: 'lastName,email' }
      const contactsData: Contact[] = [
        {
          producerContactId: 2092049,
          firstName: 'FRODO',
          lastName: 'BAGGINS',
          email: 'frodo.baggins@the-shire.com',
          phone: '5553244399',
        },
      ]
      const mockResponse = createMockApiResponse(contactsData)
      mockApiClient.get.mockResolvedValueOnce(mockResponse)

      const result = await fetchContacts(producerCode, params)

      expect(mockApiClient.get).toHaveBeenCalledWith(
        `/common-api/api/v1/common/producers/${producerCode}/contacts`,
        {
          params: { Fields: 'lastName,email' },
        }
      )
      expect(result).toEqual({ data: contactsData })
    })

    it('should fetch contacts with multiple parameters', async () => {
      const producerCode = '2092049'
      const params: ContactsQueryParams = {
        ProducerContactId: 123456,
        Fields: 'firstName,lastName,email',
      }
      const contactsData: Contact[] = [
        {
          producerContactId: 123456,
          firstName: 'JANE',
          lastName: 'SMITH',
          email: 'jane.smith@example.com',
          phone: '555-5678',
        },
      ]
      const mockResponse = createMockApiResponse(contactsData)
      mockApiClient.get.mockResolvedValueOnce(mockResponse)

      const result = await fetchContacts(producerCode, params)

      expect(mockApiClient.get).toHaveBeenCalledWith(
        `/common-api/api/v1/common/producers/${producerCode}/contacts`,
        {
          params: {
            ProducerContactId: 123456,
            Fields: 'firstName,lastName,email',
          },
        }
      )
      expect(result).toEqual({ data: contactsData })
    })
  })

  describe('ProducerCode Validation', () => {
    it('should return empty array for empty producer code', async () => {
      const result = await fetchContacts('')

      expect(result).toEqual({ data: [] })
      expect(mockApiClient.get).not.toHaveBeenCalled()
    })

    it('should return empty array for null producer code', async () => {
      const result = await fetchContacts(null as unknown as string)

      expect(result).toEqual({ data: [] })
      expect(mockApiClient.get).not.toHaveBeenCalled()
    })

    it('should return empty array for undefined producer code', async () => {
      const result = await fetchContacts(undefined as unknown as string)

      expect(result).toEqual({ data: [] })
      expect(mockApiClient.get).not.toHaveBeenCalled()
    })

    it('should return empty array for whitespace-only producer code', async () => {
      const result = await fetchContacts('   ')

      expect(result).toEqual({ data: [] })
      expect(mockApiClient.get).not.toHaveBeenCalled()
    })

    it('should trim whitespace from valid producer code', async () => {
      const producerCode = '  2092049  '
      const contactsData: Contact[] = []
      const mockResponse = createMockApiResponse(contactsData)
      mockApiClient.get.mockResolvedValueOnce(mockResponse)

      await fetchContacts(producerCode)

      expect(mockApiClient.get).toHaveBeenCalledWith(
        '/common-api/api/v1/common/producers/2092049/contacts',
        {
          params: undefined,
        }
      )
    })
  })

  describe('Parameter Validation', () => {
    it('should handle invalid ProducerContactId by filtering out invalid params', async () => {
      const producerCode = '2092049'
      const params: ContactsQueryParams = { ProducerContactId: -1 }
      const contactsData: Contact[] = []
      const mockResponse = createMockApiResponse(contactsData)
      mockApiClient.get.mockResolvedValueOnce(mockResponse)

      const result = await fetchContacts(producerCode, params)

      expect(mockApiClient.get).toHaveBeenCalledWith(
        `/common-api/api/v1/common/producers/${producerCode}/contacts`,
        {
          params: undefined,
        }
      )
      expect(result).toEqual({ data: [] })
    })

    it('should handle invalid Fields format by not making API request', async () => {
      const producerCode = '2092049'
      const params: ContactsQueryParams = { Fields: '  ,  ,  ' }

      const contactsData: Contact[] = []
      const mockResponse = createMockApiResponse(contactsData)
      mockApiClient.get.mockResolvedValueOnce(mockResponse)

      const result = await fetchContacts(producerCode, params)

      expect(mockApiClient.get).toHaveBeenCalledWith(
        `/common-api/api/v1/common/producers/${producerCode}/contacts`,
        {
          params: undefined,
        }
      )
      expect(result).toEqual({ data: [] })
    })

    it('should accept valid ProducerContactId values', async () => {
      const producerCode = '2092049'
      const validIds = [1, 123456, 999999999]
      const contactsData: Contact[] = []
      const mockResponse = createMockApiResponse(contactsData)

      for (const id of validIds) {
        mockApiClient.get.mockResolvedValueOnce(mockResponse)

        await expect(
          fetchContacts(producerCode, { ProducerContactId: id })
        ).resolves.toEqual({ data: contactsData })

        expect(mockApiClient.get).toHaveBeenCalledWith(
          `/common-api/api/v1/common/producers/${producerCode}/contacts`,
          {
            params: { ProducerContactId: id },
          }
        )
      }
    })

    it('should accept valid Fields formats', async () => {
      const producerCode = '2092049'
      const validFields = [
        'firstName',
        'firstName,lastName',
        'firstName,lastName,email,phone',
        'ProducerContactId,FirstName,LastName,Email,Phone',
      ]
      const contactsData: Contact[] = []
      const mockResponse = createMockApiResponse(contactsData)

      for (const fields of validFields) {
        mockApiClient.get.mockResolvedValueOnce(mockResponse)

        await expect(
          fetchContacts(producerCode, { Fields: fields })
        ).resolves.toEqual({ data: contactsData })

        expect(mockApiClient.get).toHaveBeenCalledWith(
          `/common-api/api/v1/common/producers/${producerCode}/contacts`,
          {
            params: { Fields: fields },
          }
        )
      }
    })

    it('should handle empty object parameters', async () => {
      const producerCode = '2092049'
      const params: ContactsQueryParams = {}

      const contactsData: Contact[] = []
      const mockResponse = createMockApiResponse(contactsData)
      mockApiClient.get.mockResolvedValueOnce(mockResponse)

      const result = await fetchContacts(producerCode, params)

      expect(mockApiClient.get).toHaveBeenCalledWith(
        `/common-api/api/v1/common/producers/${producerCode}/contacts`,
        {
          params: {},
        }
      )
      expect(result).toEqual({ data: [] })
    })
  })

  describe('Error Handling Scenarios', () => {
    it('should return empty array for 404 error (producer not found)', async () => {
      const producerCode = 'INVALID'
      const error = new Error('Producer not found')
      Object.assign(error, { status: 404 })

      mockApiClient.get.mockRejectedValueOnce(error)

      const result = await fetchContacts(producerCode)

      expect(result).toEqual({ data: [] })
    })

    it('should return empty array for 400 error (bad request)', async () => {
      const producerCode = '2092049'
      const error = new Error('Invalid request parameters')
      Object.assign(error, { status: 400 })

      mockApiClient.get.mockRejectedValueOnce(error)

      await expect(fetchContacts(producerCode)).rejects.toThrow(
        'Failed to fetch contacts: Invalid request parameters'
      )
    })

    it('should throw error for 500 server error', async () => {
      const producerCode = '2092049'
      const error = new Error('Internal server error')
      Object.assign(error, { status: 500 })

      mockApiClient.get.mockRejectedValueOnce(error)

      await expect(fetchContacts(producerCode)).rejects.toThrow(
        'Failed to fetch contacts: Internal server error'
      )
    })

    it('should throw error for network errors', async () => {
      const producerCode = '2092049'
      const error = new Error('Network error')

      mockApiClient.get.mockRejectedValueOnce(error)

      await expect(fetchContacts(producerCode)).rejects.toThrow(
        'Failed to fetch contacts: Network error'
      )
    })
  })

  describe('Response Data Validation', () => {
    it('should handle successful response with valid data structure', async () => {
      const producerCode = '2092049'
      const contactsData: Contact[] = [
        {
          producerContactId: 2092049,
          firstName: 'FRODO',
          lastName: 'BAGGINS',
          email: 'frodo.baggins@the-shire.com',
          phone: '5553244399',
        },
      ]
      const validResponse = createMockApiResponse(contactsData)

      mockApiClient.get.mockResolvedValueOnce(validResponse)

      const result = await fetchContacts(producerCode)

      expect(result).toEqual({ data: contactsData })
      expect(result.data).toEqual(contactsData)
      expect(Array.isArray(result.data)).toBe(true)
      expect(result.data[0]).toHaveProperty('producerContactId')
      expect(result.data[0]).toHaveProperty('firstName')
      expect(result.data[0]).toHaveProperty('lastName')
    })

    it('should handle empty response data', async () => {
      const producerCode = '2092049'
      const emptyData: Contact[] = []
      const emptyResponse = createMockApiResponse(emptyData)

      mockApiClient.get.mockResolvedValueOnce(emptyResponse)

      const result = await fetchContacts(producerCode)

      expect(result).toEqual({ data: [] })
      expect(Array.isArray(result.data)).toBe(true)
    })
  })
})

describe('createContactsQueryKey', () => {
  it('should generate query key with only producerCode', () => {
    const key = createContactsQueryKey('2092049')
    expect(key).toEqual(['fetchContacts', 'producerCode', '2092049'])
  })

  it('should generate query key with ProducerContactId', () => {
    const key = createContactsQueryKey('2092049', { ProducerContactId: 123456 })
    expect(key).toEqual([
      'fetchContacts',
      'producerCode',
      '2092049',
      'producerContactId',
      '123456',
    ])
  })

  it('should generate query key with Fields', () => {
    const key = createContactsQueryKey('2092049', { Fields: 'lastName,email' })
    expect(key).toEqual([
      'fetchContacts',
      'producerCode',
      '2092049',
      'fields',
      'lastName,email',
    ])
  })

  it('should generate query key with multiple parameters', () => {
    const key = createContactsQueryKey('2092049', {
      ProducerContactId: 123456,
      Fields: 'firstName,lastName',
    })
    expect(key).toEqual([
      'fetchContacts',
      'producerCode',
      '2092049',
      'producerContactId',
      '123456',
      'fields',
      'firstName,lastName',
    ])
  })

  it('should generate deterministic keys for same parameters', () => {
    const params: ContactsQueryParams = {
      ProducerContactId: 123456,
      Fields: 'firstName,lastName',
    }
    const key1 = createContactsQueryKey('2092049', params)
    const key2 = createContactsQueryKey('2092049', params)
    expect(key1).toEqual(key2)
  })

  it('should generate different keys for different producer codes', () => {
    const params: ContactsQueryParams = { ProducerContactId: 123456 }
    const key1 = createContactsQueryKey('2092049', params)
    const key2 = createContactsQueryKey('1234567', params)
    expect(key1).not.toEqual(key2)
  })
})

describe('useContactsQuery Hook', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should be enabled with valid producer code', async () => {
    const { TestWrapper } = createTestWrapper()
    const producerCode = '2092049'
    const contactsData: Contact[] = []
    const mockResponse = createMockApiResponse(contactsData)
    mockApiClient.get.mockResolvedValueOnce(mockResponse)

    const { result } = renderHook(() => useContactsQuery(producerCode), {
      wrapper: TestWrapper,
    })

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false)
    })

    expect(result.current.isSuccess).toBe(true)
    expect(mockApiClient.get).toHaveBeenCalledWith(
      `/common-api/api/v1/common/producers/${producerCode}/contacts`,
      {
        params: undefined,
      }
    )
  })

  it('should be disabled with empty producer code', () => {
    const { TestWrapper } = createTestWrapper()

    const { result } = renderHook(() => useContactsQuery(''), {
      wrapper: TestWrapper,
    })

    expect(result.current.isLoading).toBe(false)
    expect(result.current.data).toBeUndefined()
    expect(mockApiClient.get).not.toHaveBeenCalled()
  })

  it('should be disabled with invalid producer code', () => {
    const { TestWrapper } = createTestWrapper()

    const { result } = renderHook(
      () => useContactsQuery(null as unknown as string),
      {
        wrapper: TestWrapper,
      }
    )

    expect(result.current.isLoading).toBe(false)
    expect(result.current.data).toBeUndefined()
    expect(mockApiClient.get).not.toHaveBeenCalled()
  })

  it('should pass parameters correctly', async () => {
    const { TestWrapper } = createTestWrapper()
    const producerCode = '2092049'
    const params: ContactsQueryParams = { ProducerContactId: 123456 }
    const contactsData: Contact[] = []
    const mockResponse = createMockApiResponse(contactsData)
    mockApiClient.get.mockResolvedValueOnce(mockResponse)

    const { result } = renderHook(
      () => useContactsQuery(producerCode, params),
      {
        wrapper: TestWrapper,
      }
    )

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false)
    })

    expect(result.current.isSuccess).toBe(true)
    expect(mockApiClient.get).toHaveBeenCalledWith(
      `/common-api/api/v1/common/producers/${producerCode}/contacts`,
      {
        params: { ProducerContactId: 123456 },
      }
    )
  })
})
