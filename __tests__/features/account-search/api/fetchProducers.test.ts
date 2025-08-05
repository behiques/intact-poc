import { describe, it, expect, beforeEach, vi } from 'vitest'
import {
  fetchProducers,
  createProducersQueryKey,
} from '../../../../src/features/account-search/api/fetchProducers'
import {
  ProducersQueryParams,
  ProducerApiResponse,
  Producer,
} from '../../../../src/features/account-search/types'
import type { ApiResponse } from '../../../../src/lib/api/types'

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
  data: Producer[]
): ApiResponse<ProducerApiResponse> => ({
  data: data,
  status: 200,
  headers: {},
  ok: true,
})

// Sample producer data matching the new interface
const sampleProducer: Producer = {
  producerCode: '0101010',
  businessUnitId: 'D',
  name: '@INSURANCE AGENCY, LLC',
  phone: '555277633',
  isActive: false,
  address1: '123 Main Ave',
  address2: '123 Main Ave ',
  city: 'Avon',
  stateCode: 'CT',
  zip: '06001',
  countryCode: null,
  mailAddress1: '123 Main Ave ',
  mailAddress2: '123 Main Ave ',
  mailCity: 'Avon',
  mailStateCode: 'CT',
  mailZip: '06001',
  mailCountryCode: null,
  billAddress1: '123 Main Ave ',
  billAddress2: '123 Main Ave ',
  billCity: 'Avon',
  billStateCode: 'CT',
  billZip: '06001',
  billCountryCode: null,
  territoryId: '001',
  territoryDescription: 'Lorem Ipsum',
  territoryName: 'Lorem Ipsum Group',
}

describe('fetchProducers', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Basic Functionality', () => {
    it('should fetch producers with only businessUnitId', async () => {
      const mockData = [sampleProducer]
      mockApiClient.get.mockResolvedValueOnce(createMockApiResponse(mockData))

      const result = await fetchProducers('D')

      expect(mockApiClient.get).toHaveBeenCalledWith(
        '/common-api/api/v1/businessunits/D/producers',
        { params: undefined }
      )
      expect(result).toEqual(mockData)
    })

    it('should fetch producers with TerritoryId parameter', async () => {
      const mockData = [sampleProducer]
      mockApiClient.get.mockResolvedValueOnce(createMockApiResponse(mockData))

      const params: ProducersQueryParams = { TerritoryId: '001' }
      const result = await fetchProducers('D', params)

      expect(mockApiClient.get).toHaveBeenCalledWith(
        '/common-api/api/v1/businessunits/D/producers',
        { params: { TerritoryId: '001' } }
      )
      expect(result).toEqual(mockData)
    })

    it('should fetch producers with Fields parameter', async () => {
      const mockData = [sampleProducer]
      mockApiClient.get.mockResolvedValueOnce(createMockApiResponse(mockData))

      const params: ProducersQueryParams = {
        Fields: 'producerCode,name,isActive',
      }
      const result = await fetchProducers('D', params)

      expect(mockApiClient.get).toHaveBeenCalledWith(
        '/common-api/api/v1/businessunits/D/producers',
        { params: { Fields: 'producerCode,name,isActive' } }
      )
      expect(result).toEqual(mockData)
    })

    it('should fetch producers with ReturnAll parameter', async () => {
      const mockData = [sampleProducer]
      mockApiClient.get.mockResolvedValueOnce(createMockApiResponse(mockData))

      const params: ProducersQueryParams = { ReturnAll: true }
      const result = await fetchProducers('D', params)

      expect(mockApiClient.get).toHaveBeenCalledWith(
        '/common-api/api/v1/businessunits/D/producers',
        { params: { ReturnAll: true } }
      )
      expect(result).toEqual(mockData)
    })

    it('should fetch producers with all parameters', async () => {
      const mockData = [sampleProducer]
      mockApiClient.get.mockResolvedValueOnce(createMockApiResponse(mockData))

      const params: ProducersQueryParams = {
        TerritoryId: '001',
        Fields: 'producerCode,name',
        ReturnAll: true,
      }
      const result = await fetchProducers('D', params)

      expect(mockApiClient.get).toHaveBeenCalledWith(
        '/common-api/api/v1/businessunits/D/producers',
        {
          params: {
            TerritoryId: '001',
            Fields: 'producerCode,name',
            ReturnAll: true,
          },
        }
      )
      expect(result).toEqual(mockData)
    })

    it('should return empty array when no producers found', async () => {
      const mockData: Producer[] = []
      mockApiClient.get.mockResolvedValueOnce(createMockApiResponse(mockData))

      const result = await fetchProducers('D')

      expect(result).toEqual([])
    })
  })

  describe('Parameter Validation', () => {
    it('should throw error when businessUnitId is empty', async () => {
      await expect(fetchProducers('')).rejects.toThrow(
        'BusinessUnitId is required and cannot be empty'
      )
      expect(mockApiClient.get).not.toHaveBeenCalled()
    })

    it('should throw error when businessUnitId is whitespace', async () => {
      await expect(fetchProducers('  ')).rejects.toThrow(
        'BusinessUnitId is required and cannot be empty'
      )
      expect(mockApiClient.get).not.toHaveBeenCalled()
    })

    it('should filter out invalid parameters and continue with valid ones', async () => {
      const mockData = [sampleProducer]
      mockApiClient.get.mockResolvedValueOnce(createMockApiResponse(mockData))

      // Invalid parameters (empty strings)
      const params = {
        TerritoryId: '',
        Fields: 'validField',
        ReturnAll: true,
      }

      const result = await fetchProducers('D', params)

      // Should call API with undefined params due to validation failure
      expect(mockApiClient.get).toHaveBeenCalledWith(
        '/common-api/api/v1/businessunits/D/producers',
        { params: undefined }
      )
      expect(result).toEqual(mockData)
    })
  })

  describe('Error Handling', () => {
    it('should handle API errors with context', async () => {
      const apiError = new Error('Network error')
      mockApiClient.get.mockRejectedValueOnce(apiError)

      await expect(fetchProducers('D')).rejects.toThrow(
        'Failed to fetch producers for business unit "D": Network error'
      )

      expect(mockApiClient.get).toHaveBeenCalledWith(
        '/common-api/api/v1/businessunits/D/producers',
        { params: undefined }
      )
    })

    it('should handle unknown errors', async () => {
      mockApiClient.get.mockRejectedValueOnce('Unknown error')

      await expect(fetchProducers('D')).rejects.toThrow(
        'Failed to fetch producers for business unit "D": Unknown error'
      )
    })

    it('should handle API errors with parameters', async () => {
      const apiError = new Error('Server error')
      mockApiClient.get.mockRejectedValueOnce(apiError)

      const params: ProducersQueryParams = { TerritoryId: '001' }

      await expect(fetchProducers('D', params)).rejects.toThrow(
        'Failed to fetch producers for business unit "D": Server error'
      )

      expect(mockApiClient.get).toHaveBeenCalledWith(
        '/common-api/api/v1/businessunits/D/producers',
        { params: { TerritoryId: '001' } }
      )
    })
  })

  describe('Endpoint URL Construction', () => {
    it('should construct correct endpoint for single character business unit ID', async () => {
      const mockData = [sampleProducer]
      mockApiClient.get.mockResolvedValueOnce(createMockApiResponse(mockData))

      await fetchProducers('D')

      expect(mockApiClient.get).toHaveBeenCalledWith(
        '/common-api/api/v1/businessunits/D/producers',
        { params: undefined }
      )
    })

    it('should construct correct endpoint for multi-character business unit ID', async () => {
      const mockData = [sampleProducer]
      mockApiClient.get.mockResolvedValueOnce(createMockApiResponse(mockData))

      await fetchProducers('ABC123')

      expect(mockApiClient.get).toHaveBeenCalledWith(
        '/common-api/api/v1/businessunits/ABC123/producers',
        { params: undefined }
      )
    })

    it('should handle special characters in business unit ID', async () => {
      const mockData = [sampleProducer]
      mockApiClient.get.mockResolvedValueOnce(createMockApiResponse(mockData))

      await fetchProducers('TEST-123')

      expect(mockApiClient.get).toHaveBeenCalledWith(
        '/common-api/api/v1/businessunits/TEST-123/producers',
        { params: undefined }
      )
    })
  })

  describe('Edge Cases', () => {
    it('should handle multiple producers in response', async () => {
      const mockData = [
        sampleProducer,
        {
          ...sampleProducer,
          producerCode: '0202020',
          name: 'Second Producer Agency',
          territoryId: '002',
        },
      ]
      mockApiClient.get.mockResolvedValueOnce(createMockApiResponse(mockData))

      const result = await fetchProducers('D')

      expect(result).toHaveLength(2)
      expect(result[0].producerCode).toBe('0101010')
      expect(result[1].producerCode).toBe('0202020')
    })

    it('should handle producer with minimal data', async () => {
      const minimalProducer: Producer = {
        producerCode: '0303030',
        businessUnitId: 'D',
        name: 'Minimal Producer',
        phone: '',
        isActive: true,
        address1: '',
        address2: '',
        city: '',
        stateCode: '',
        zip: '',
        countryCode: null,
        mailAddress1: '',
        mailAddress2: '',
        mailCity: '',
        mailStateCode: '',
        mailZip: '',
        mailCountryCode: null,
        billAddress1: '',
        billAddress2: '',
        billCity: '',
        billStateCode: '',
        billZip: '',
        billCountryCode: null,
        territoryId: '',
        territoryDescription: '',
        territoryName: '',
      }

      const mockData = [minimalProducer]
      mockApiClient.get.mockResolvedValueOnce(createMockApiResponse(mockData))

      const result = await fetchProducers('D')

      expect(result).toEqual(mockData)
      expect(result[0].name).toBe('Minimal Producer')
    })
  })
})

describe('createProducersQueryKey', () => {
  describe('Basic Query Key Generation', () => {
    it('should create query key with only businessUnitId', () => {
      const result = createProducersQueryKey('D')
      expect(result).toEqual(['fetchProducers', 'D'])
    })

    it('should create query key with TerritoryId', () => {
      const result = createProducersQueryKey('D', { TerritoryId: '001' })
      expect(result).toEqual(['fetchProducers', 'D', 'territoryId', '001'])
    })

    it('should create query key with Fields', () => {
      const result = createProducersQueryKey('D', {
        Fields: 'producerCode,name',
      })
      expect(result).toEqual([
        'fetchProducers',
        'D',
        'fields',
        'producerCode,name',
      ])
    })

    it('should create query key with ReturnAll true', () => {
      const result = createProducersQueryKey('D', { ReturnAll: true })
      expect(result).toEqual(['fetchProducers', 'D', 'returnAll', 'true'])
    })

    it('should create query key with ReturnAll false', () => {
      const result = createProducersQueryKey('D', { ReturnAll: false })
      expect(result).toEqual(['fetchProducers', 'D', 'returnAll', 'false'])
    })

    it('should create query key with all parameters', () => {
      const result = createProducersQueryKey('D', {
        TerritoryId: '001',
        Fields: 'producerCode,name',
        ReturnAll: true,
      })
      expect(result).toEqual([
        'fetchProducers',
        'D',
        'territoryId',
        '001',
        'fields',
        'producerCode,name',
        'returnAll',
        'true',
      ])
    })
  })

  describe('Query Key Consistency', () => {
    it('should create deterministic keys for same parameters', () => {
      const params = {
        TerritoryId: '001',
        Fields: 'name,code',
        ReturnAll: true,
      }
      const key1 = createProducersQueryKey('D', params)
      const key2 = createProducersQueryKey('D', params)
      expect(key1).toEqual(key2)
    })

    it('should create different keys for different businessUnitIds', () => {
      const params = { TerritoryId: '001' }
      const key1 = createProducersQueryKey('D', params)
      const key2 = createProducersQueryKey('E', params)
      expect(key1).not.toEqual(key2)
      expect(key1[1]).toBe('D')
      expect(key2[1]).toBe('E')
    })

    it('should create different keys for different parameters', () => {
      const key1 = createProducersQueryKey('D', { TerritoryId: '001' })
      const key2 = createProducersQueryKey('D', { TerritoryId: '002' })
      expect(key1).not.toEqual(key2)
    })
  })

  describe('Query Key Edge Cases', () => {
    it('should handle undefined parameters', () => {
      const result = createProducersQueryKey('D', undefined)
      expect(result).toEqual(['fetchProducers', 'D'])
    })

    it('should handle empty parameters object', () => {
      const result = createProducersQueryKey('D', {})
      expect(result).toEqual(['fetchProducers', 'D'])
    })

    it('should handle complex field names', () => {
      const result = createProducersQueryKey('D', {
        Fields:
          'producerCode,name,address1,mailAddress1,billAddress1,territoryName',
      })
      expect(result).toEqual([
        'fetchProducers',
        'D',
        'fields',
        'producerCode,name,address1,mailAddress1,billAddress1,territoryName',
      ])
    })

    it('should handle special characters in business unit ID', () => {
      const result = createProducersQueryKey('TEST-123', { TerritoryId: '001' })
      expect(result).toEqual([
        'fetchProducers',
        'TEST-123',
        'territoryId',
        '001',
      ])
    })

    it('should handle numeric territory IDs', () => {
      const result = createProducersQueryKey('D', { TerritoryId: '123456' })
      expect(result).toEqual(['fetchProducers', 'D', 'territoryId', '123456'])
    })
  })
})
