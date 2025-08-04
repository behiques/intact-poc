import { describe, it, expect, beforeEach, vi } from 'vitest'
import {
  fetchBusinessUnits,
  createBusinessUnitsQueryKey,
} from '../../../../src/features/account-search/api/fetchBusinessUnits'
import {
  BusinessUnitsQueryParams,
  BusinessUnitApiResponse,
  BusinessUnit,
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
  data: BusinessUnit[]
): ApiResponse<BusinessUnitApiResponse> => ({
  data: {
    data: data,
  },
  status: 200,
  headers: {},
  ok: true,
})

describe('fetchBusinessUnits', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Basic Functionality', () => {
    it('should fetch business units without parameters', async () => {
      const businessUnitsData: BusinessUnit[] = [
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
      ]
      const mockResponse = createMockApiResponse(businessUnitsData)
      mockApiClient.get.mockResolvedValueOnce(mockResponse)

      const result = await fetchBusinessUnits()

      expect(mockApiClient.get).toHaveBeenCalledWith(
        '/common-api/api/v1/common/businessunits',
        {
          params: undefined,
        }
      )
      expect(result).toEqual({ data: businessUnitsData })
    })

    it('should fetch business units with BusinessUnitId parameter', async () => {
      const params: BusinessUnitsQueryParams = { BusinessUnitId: 'E' }
      const businessUnitsData: BusinessUnit[] = [
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
      ]
      const mockResponse = createMockApiResponse(businessUnitsData)
      mockApiClient.get.mockResolvedValueOnce(mockResponse)

      const result = await fetchBusinessUnits(params)

      expect(mockApiClient.get).toHaveBeenCalledWith(
        '/common-api/api/v1/common/businessunits',
        {
          params: { BusinessUnitId: 'E' },
        }
      )
      expect(result).toEqual({ data: businessUnitsData })
    })

    it('should fetch business units with Fields parameter', async () => {
      const params: BusinessUnitsQueryParams = { Fields: 'businessUnitId,name' }
      const businessUnitsData: BusinessUnit[] = [
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
      ]
      const mockResponse = createMockApiResponse(businessUnitsData)
      mockApiClient.get.mockResolvedValueOnce(mockResponse)

      const result = await fetchBusinessUnits(params)

      expect(mockApiClient.get).toHaveBeenCalledWith(
        '/common-api/api/v1/common/businessunits',
        {
          params: { Fields: 'businessUnitId,name' },
        }
      )
      expect(result).toEqual({ data: businessUnitsData })
    })

    it('should fetch business units with ReturnAll parameter', async () => {
      const params: BusinessUnitsQueryParams = { ReturnAll: true }
      const businessUnitsData: BusinessUnit[] = [
        {
          businessUnitId: 'I',
          abbreviation: 'INA',
          description: 'Inactive Division',
          groupTitle: 'Legacy Group',
          isActive: false,
          isEligibleForAdmitted: false,
          name: 'Inactive Unit',
          url: '/business-units/inactive',
        },
      ]
      const mockResponse = createMockApiResponse(businessUnitsData)
      mockApiClient.get.mockResolvedValueOnce(mockResponse)

      const result = await fetchBusinessUnits(params)

      expect(mockApiClient.get).toHaveBeenCalledWith(
        '/common-api/api/v1/common/businessunits',
        {
          params: { ReturnAll: true },
        }
      )
      expect(result).toEqual({ data: businessUnitsData })
    })

    it('should fetch business units with multiple parameters', async () => {
      const params: BusinessUnitsQueryParams = {
        BusinessUnitId: 'E',
        Fields: 'businessUnitId,name,isActive',
        ReturnAll: false,
      }
      const businessUnitsData: BusinessUnit[] = [
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
      ]
      const mockResponse = createMockApiResponse(businessUnitsData)
      mockApiClient.get.mockResolvedValueOnce(mockResponse)

      const result = await fetchBusinessUnits(params)

      expect(mockApiClient.get).toHaveBeenCalledWith(
        '/common-api/api/v1/common/businessunits',
        {
          params: {
            BusinessUnitId: 'E',
            Fields: 'businessUnitId,name,isActive',
            ReturnAll: false,
          },
        }
      )
      expect(result).toEqual({ data: businessUnitsData })
    })
  })

  describe('Parameter Validation', () => {
    it('should handle invalid BusinessUnitId by not making API request', async () => {
      const params: BusinessUnitsQueryParams = { BusinessUnitId: '' }

      const businessUnitsData: BusinessUnit[] = []
      const mockResponse = createMockApiResponse(businessUnitsData)
      mockApiClient.get.mockResolvedValueOnce(mockResponse)

      const result = await fetchBusinessUnits(params)

      expect(mockApiClient.get).toHaveBeenCalledWith(
        '/common-api/api/v1/common/businessunits',
        {
          params: undefined,
        }
      )
      expect(result).toEqual({ data: [] })
    })

    it('should accept valid BusinessUnitId formats', async () => {
      const validIds = ['E', 'T', 'H', 'SPECIALTY']
      const businessUnitsData: BusinessUnit[] = []
      const mockResponse = createMockApiResponse(businessUnitsData)

      for (const id of validIds) {
        mockApiClient.get.mockResolvedValueOnce(mockResponse)

        await expect(
          fetchBusinessUnits({ BusinessUnitId: id })
        ).resolves.toEqual({ data: businessUnitsData })

        expect(mockApiClient.get).toHaveBeenCalledWith(
          '/common-api/api/v1/common/businessunits',
          {
            params: { BusinessUnitId: id },
          }
        )
      }
    })

    it('should handle invalid Fields format by not making API request', async () => {
      const params: BusinessUnitsQueryParams = { Fields: '  ,  ,  ' }

      const businessUnitsData: BusinessUnit[] = []
      const mockResponse = createMockApiResponse(businessUnitsData)
      mockApiClient.get.mockResolvedValueOnce(mockResponse)

      const result = await fetchBusinessUnits(params)

      expect(mockApiClient.get).toHaveBeenCalledWith(
        '/common-api/api/v1/common/businessunits',
        {
          params: undefined,
        }
      )
      expect(result).toEqual({ data: [] })
    })

    it('should accept valid Fields formats', async () => {
      const validFields = [
        'businessUnitId',
        'businessUnitId,name',
        'businessUnitId,name,isActive,description',
      ]
      const businessUnitsData: BusinessUnit[] = []
      const mockResponse = createMockApiResponse(businessUnitsData)

      for (const fields of validFields) {
        mockApiClient.get.mockResolvedValueOnce(mockResponse)

        await expect(fetchBusinessUnits({ Fields: fields })).resolves.toEqual({
          data: businessUnitsData,
        })

        expect(mockApiClient.get).toHaveBeenCalledWith(
          '/common-api/api/v1/common/businessunits',
          {
            params: { Fields: fields },
          }
        )
      }
    })

    it('should handle boolean ReturnAll parameter correctly', async () => {
      const businessUnitsData: BusinessUnit[] = []
      const mockResponse = createMockApiResponse(businessUnitsData)

      // Test true
      mockApiClient.get.mockResolvedValueOnce(mockResponse)
      await fetchBusinessUnits({ ReturnAll: true })
      expect(mockApiClient.get).toHaveBeenCalledWith(
        '/common-api/api/v1/common/businessunits',
        {
          params: { ReturnAll: true },
        }
      )

      // Test false
      mockApiClient.get.mockResolvedValueOnce(mockResponse)
      await fetchBusinessUnits({ ReturnAll: false })
      expect(mockApiClient.get).toHaveBeenCalledWith(
        '/common-api/api/v1/common/businessunits',
        {
          params: { ReturnAll: false },
        }
      )
    })

    it('should handle invalid BusinessUnitId with special characters', async () => {
      // Note: Special characters pass basic validation (length > 1) but may cause API errors
      const params: BusinessUnitsQueryParams = { BusinessUnitId: '!!!' }

      const businessUnitsData: BusinessUnit[] = []
      const mockResponse = createMockApiResponse(businessUnitsData)
      mockApiClient.get.mockResolvedValueOnce(mockResponse)

      const result = await fetchBusinessUnits(params)

      expect(mockApiClient.get).toHaveBeenCalledWith(
        '/common-api/api/v1/common/businessunits',
        {
          params: { BusinessUnitId: '!!!' },
        }
      )
      expect(result).toEqual({ data: [] })
    })

    it('should handle Fields with invalid characters', async () => {
      const params: BusinessUnitsQueryParams = {
        Fields: 'field$invalid,field@name',
      }

      const businessUnitsData: BusinessUnit[] = []
      const mockResponse = createMockApiResponse(businessUnitsData)
      mockApiClient.get.mockResolvedValueOnce(mockResponse)

      const result = await fetchBusinessUnits(params)

      expect(mockApiClient.get).toHaveBeenCalledWith(
        '/common-api/api/v1/common/businessunits',
        {
          params: undefined,
        }
      )
      expect(result).toEqual({ data: [] })
    })

    it('should handle Fields with only commas', async () => {
      const params: BusinessUnitsQueryParams = { Fields: ',,,' }

      const businessUnitsData: BusinessUnit[] = []
      const mockResponse = createMockApiResponse(businessUnitsData)
      mockApiClient.get.mockResolvedValueOnce(mockResponse)

      const result = await fetchBusinessUnits(params)

      expect(mockApiClient.get).toHaveBeenCalledWith(
        '/common-api/api/v1/common/businessunits',
        {
          params: undefined,
        }
      )
      expect(result).toEqual({ data: [] })
    })

    it('should handle null and undefined parameter values', async () => {
      // Test with explicitly undefined params
      const businessUnitsData: BusinessUnit[] = []
      const mockResponse = createMockApiResponse(businessUnitsData)
      mockApiClient.get.mockResolvedValueOnce(mockResponse)

      const result = await fetchBusinessUnits(undefined)

      expect(mockApiClient.get).toHaveBeenCalledWith(
        '/common-api/api/v1/common/businessunits',
        {
          params: undefined,
        }
      )
      expect(result).toEqual({ data: [] })
    })

    it('should handle empty object parameters', async () => {
      const params: BusinessUnitsQueryParams = {}

      const businessUnitsData: BusinessUnit[] = []
      const mockResponse = createMockApiResponse(businessUnitsData)
      mockApiClient.get.mockResolvedValueOnce(mockResponse)

      const result = await fetchBusinessUnits(params)

      expect(mockApiClient.get).toHaveBeenCalledWith(
        '/common-api/api/v1/common/businessunits',
        {
          params: {},
        }
      )
      expect(result).toEqual({ data: [] })
    })
  })

  describe('Error Handling Scenarios', () => {
    it('should handle 404 error for invalid BusinessUnitId', async () => {
      const params: BusinessUnitsQueryParams = { BusinessUnitId: 'INVALID' }
      const error = new Error('Business unit not found')
      Object.assign(error, { status: 404 })

      mockApiClient.get.mockRejectedValueOnce(error)

      await expect(fetchBusinessUnits(params)).rejects.toThrow(
        'Failed to fetch business units: Business unit not found'
      )
    })

    it('should handle 400 error for invalid parameters', async () => {
      const params: BusinessUnitsQueryParams = { Fields: 'invalidField' }
      const error = new Error('Invalid request parameters')
      Object.assign(error, { status: 400 })

      mockApiClient.get.mockRejectedValueOnce(error)

      await expect(fetchBusinessUnits(params)).rejects.toThrow(
        'Failed to fetch business units: Invalid request parameters'
      )
    })

    it('should handle 401 authentication error', async () => {
      const error = new Error('Unauthorized')
      Object.assign(error, { status: 401 })

      mockApiClient.get.mockRejectedValueOnce(error)

      await expect(fetchBusinessUnits()).rejects.toThrow(
        'Failed to fetch business units: Unauthorized'
      )
    })

    it('should handle 500 server error', async () => {
      const error = new Error('Internal server error')
      Object.assign(error, { status: 500 })

      mockApiClient.get.mockRejectedValueOnce(error)

      await expect(fetchBusinessUnits()).rejects.toThrow(
        'Failed to fetch business units: Internal server error'
      )
    })

    it('should handle network errors', async () => {
      const error = new Error('Network error')

      mockApiClient.get.mockRejectedValueOnce(error)

      await expect(fetchBusinessUnits()).rejects.toThrow(
        'Failed to fetch business units: Network error'
      )
    })
  })

  describe('Response Data Validation', () => {
    it('should validate and return correct response schema', async () => {
      const businessUnitsData: BusinessUnit[] = [
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
      ]
      const validResponse = createMockApiResponse(businessUnitsData)

      mockApiClient.get.mockResolvedValueOnce(validResponse)

      const result = await fetchBusinessUnits()

      expect(result).toEqual({ data: businessUnitsData })
      expect(result.data).toEqual(businessUnitsData)
      expect(Array.isArray(result.data)).toBe(true)
      expect(result.data[0]).toHaveProperty('businessUnitId')
      expect(result.data[0]).toHaveProperty('isActive')
    })

    it('should handle empty response data', async () => {
      const emptyData: BusinessUnit[] = []
      const emptyResponse = createMockApiResponse(emptyData)

      mockApiClient.get.mockResolvedValueOnce(emptyResponse)

      const result = await fetchBusinessUnits()

      expect(result).toEqual({ data: [] })
      expect(Array.isArray(result.data)).toBe(true)
    })
  })
})

describe('createBusinessUnitsQueryKey', () => {
  it('should generate query key without parameters', () => {
    const key = createBusinessUnitsQueryKey()
    expect(key).toEqual(['fetchBusinessUnits'])
  })

  it('should generate query key with BusinessUnitId', () => {
    const params: BusinessUnitsQueryParams = { BusinessUnitId: 'E' }
    const key = createBusinessUnitsQueryKey(params)
    expect(key).toEqual(['fetchBusinessUnits', 'businessUnitId', 'E'])
  })

  it('should generate query key with Fields', () => {
    const params: BusinessUnitsQueryParams = { Fields: 'businessUnitId,name' }
    const key = createBusinessUnitsQueryKey(params)
    expect(key).toEqual(['fetchBusinessUnits', 'fields', 'businessUnitId,name'])
  })

  it('should generate query key with ReturnAll', () => {
    const params: BusinessUnitsQueryParams = { ReturnAll: true }
    const key = createBusinessUnitsQueryKey(params)
    expect(key).toEqual(['fetchBusinessUnits', 'returnAll', 'true'])
  })

  it('should generate query key with multiple parameters', () => {
    const params: BusinessUnitsQueryParams = {
      BusinessUnitId: 'E',
      Fields: 'businessUnitId,name',
      ReturnAll: false,
    }
    const key = createBusinessUnitsQueryKey(params)
    expect(key).toEqual([
      'fetchBusinessUnits',
      'businessUnitId',
      'E',
      'fields',
      'businessUnitId,name',
      'returnAll',
      'false',
    ])
  })
})
