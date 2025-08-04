/**
 * @fileoverview Integration tests for Business Units mock client filtering logic
 * Tests various query parameter combinations with the mock data infrastructure
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { fetchBusinessUnits } from '@/features/account-search/api/fetchBusinessUnits'
import {
  BusinessUnitsQueryParams,
  BusinessUnit,
} from '@/features/account-search/types'
import { mockBusinessUnitsData } from '@/mocks/data/business-units.mock'
import type { ApiResponse } from '@/lib/api/types'

// Mock the API client to use mock data
vi.mock('@/lib/api', () => ({
  apiClient: {
    get: vi.fn(),
  },
}))

import { apiClient } from '@/lib/api'
const mockApiClient = vi.mocked(apiClient)

describe('Business Units Mock Integration Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks()

    // Setup mock to simulate the actual mock client behavior
    mockApiClient.get.mockImplementation(
      async (
        endpoint: string,
        options?: { params?: Record<string, unknown> }
      ) => {
        const params = options?.params || {}

        // Simulate the mock client filtering logic
        let filteredData = [...mockBusinessUnitsData]

        // Filter by BusinessUnitId if provided
        if (params.BusinessUnitId) {
          filteredData = filteredData.filter(
            (unit) => unit.businessUnitId === params.BusinessUnitId
          )
        }

        // Filter by isActive if ReturnAll is false (default behavior)
        if (params.ReturnAll !== true) {
          filteredData = filteredData.filter((unit) => unit.isActive === true)
        }

        // Apply field selection if Fields parameter is provided
        if (params.Fields) {
          const requestedFields = (params.Fields as string)
            .split(',')
            .map((field: string) => field.trim())
          filteredData = filteredData.map((unit) => {
            const filteredUnit: Partial<BusinessUnit> = {}
            requestedFields.forEach((field: string) => {
              if (field in unit) {
                ;(filteredUnit as Record<string, unknown>)[field] = (
                  unit as unknown as Record<string, unknown>
                )[field]
              }
            })
            return filteredUnit as BusinessUnit
          })
        }

        return {
          data: {
            data: filteredData,
          },
        } as ApiResponse<{ data: BusinessUnit[] }>
      }
    )
  })

  afterEach(() => {
    vi.resetAllMocks()
  })

  describe('Basic Query Parameter Combinations', () => {
    it('should return all active business units by default', async () => {
      const result = await fetchBusinessUnits()

      expect(mockApiClient.get).toHaveBeenCalledWith(
        '/common-api/api/v1/common/businessunits',
        {
          params: undefined,
        }
      )
      expect(result.data).toHaveLength(6) // Only active units (E, D, C, F, T, R)
      expect(result.data.every((unit) => unit.isActive === true)).toBe(true)
    })

    it('should return specific business unit when BusinessUnitId is provided', async () => {
      const params: BusinessUnitsQueryParams = { BusinessUnitId: 'E' }
      const result = await fetchBusinessUnits(params)

      expect(result.data).toHaveLength(1)
      expect(result.data[0].businessUnitId).toBe('E')
      expect(result.data[0].name).toBe('Entertainment')
    })

    it('should return all units including inactive when ReturnAll is true', async () => {
      const params: BusinessUnitsQueryParams = { ReturnAll: true }
      const result = await fetchBusinessUnits(params)

      expect(result.data).toHaveLength(8) // All units including inactive (E, D, C, F, T, R, L, Z)
      expect(result.data.some((unit) => unit.isActive === false)).toBe(true)
    })

    it('should return only requested fields when Fields is specified', async () => {
      const params: BusinessUnitsQueryParams = { Fields: 'businessUnitId,name' }
      const result = await fetchBusinessUnits(params)

      expect(result.data).toHaveLength(6) // Active units only
      result.data.forEach((unit) => {
        expect(Object.keys(unit)).toEqual(['businessUnitId', 'name'])
        expect(unit.businessUnitId).toBeDefined()
        expect(unit.name).toBeDefined()
        expect(
          (unit as unknown as Record<string, unknown>).description
        ).toBeUndefined()
        expect(
          (unit as unknown as Record<string, unknown>).isActive
        ).toBeUndefined()
      })
    })
  })

  describe('Complex Query Parameter Combinations', () => {
    it('should combine BusinessUnitId with Fields parameter', async () => {
      const params: BusinessUnitsQueryParams = {
        BusinessUnitId: 'T',
        Fields: 'businessUnitId,name,isActive',
      }
      const result = await fetchBusinessUnits(params)

      expect(result.data).toHaveLength(1)
      expect(result.data[0]).toEqual({
        businessUnitId: 'T',
        name: 'Technology',
        isActive: true,
      })
    })

    it('should combine BusinessUnitId with ReturnAll parameter', async () => {
      const params: BusinessUnitsQueryParams = {
        BusinessUnitId: 'L', // Inactive unit
        ReturnAll: true,
      }
      const result = await fetchBusinessUnits(params)

      expect(result.data).toHaveLength(1)
      expect(result.data[0].businessUnitId).toBe('L')
      expect(result.data[0].isActive).toBe(false)
    })

    it('should combine Fields with ReturnAll parameter', async () => {
      const params: BusinessUnitsQueryParams = {
        Fields: 'businessUnitId,isActive',
        ReturnAll: true,
      }
      const result = await fetchBusinessUnits(params)

      expect(result.data).toHaveLength(8) // All units
      expect(result.data.some((unit) => unit.isActive === false)).toBe(true)
      result.data.forEach((unit) => {
        expect(Object.keys(unit)).toEqual(['businessUnitId', 'isActive'])
      })
    })

    it('should combine all three parameters', async () => {
      const params: BusinessUnitsQueryParams = {
        BusinessUnitId: 'D',
        Fields: 'businessUnitId,name,description',
        ReturnAll: true,
      }
      const result = await fetchBusinessUnits(params)

      expect(result.data).toHaveLength(1)
      expect(result.data[0]).toEqual({
        businessUnitId: 'D',
        name: 'Healthcare',
        description: 'Healthcare Services Division',
      })
    })
  })

  describe('Edge Cases and Filtering Logic', () => {
    it('should return empty array for non-existent BusinessUnitId', async () => {
      const params: BusinessUnitsQueryParams = { BusinessUnitId: 'NONEXISTENT' }
      const result = await fetchBusinessUnits(params)

      expect(result.data).toHaveLength(0)
      expect(result.data).toEqual([])
    })

    it('should handle inactive unit filtering correctly', async () => {
      // Without ReturnAll, inactive unit should not be returned
      const params1: BusinessUnitsQueryParams = { BusinessUnitId: 'L' }
      const result1 = await fetchBusinessUnits(params1)
      expect(result1.data).toHaveLength(0)

      // With ReturnAll, inactive unit should be returned
      const params2: BusinessUnitsQueryParams = {
        BusinessUnitId: 'L',
        ReturnAll: true,
      }
      const result2 = await fetchBusinessUnits(params2)
      expect(result2.data).toHaveLength(1)
      expect(result2.data[0].isActive).toBe(false)
    })

    it('should handle field selection with non-existent fields gracefully', async () => {
      const params: BusinessUnitsQueryParams = {
        BusinessUnitId: 'E',
        Fields: 'businessUnitId,nonExistentField,name',
      }
      const result = await fetchBusinessUnits(params)

      expect(result.data).toHaveLength(1)
      expect(result.data[0]).toEqual({
        businessUnitId: 'E',
        name: 'Entertainment',
        // nonExistentField should not appear
      })
    })

    it('should handle multiple field selection scenarios', async () => {
      const fieldCombinations = [
        'businessUnitId',
        'businessUnitId,name',
        'businessUnitId,name,isActive',
        'businessUnitId,name,isActive,description',
        'businessUnitId,name,isActive,description,abbreviation,groupTitle,url,isEligibleForAdmitted',
      ]

      for (const fields of fieldCombinations) {
        const params: BusinessUnitsQueryParams = { Fields: fields }
        const result = await fetchBusinessUnits(params)

        const expectedFields = fields.split(',').map((f) => f.trim())
        expect(result.data).toHaveLength(6) // Active units only

        result.data.forEach((unit) => {
          const actualFields = Object.keys(unit)
          expect(actualFields).toEqual(expectedFields)
        })
      }
    })
  })

  describe('Performance and Large Dataset Scenarios', () => {
    it('should handle ReturnAll efficiently with all available fields', async () => {
      const params: BusinessUnitsQueryParams = {
        ReturnAll: true,
        Fields:
          'businessUnitId,name,description,abbreviation,groupTitle,isActive,isEligibleForAdmitted,url',
      }
      const result = await fetchBusinessUnits(params)

      expect(result.data).toHaveLength(8) // All units
      result.data.forEach((unit) => {
        expect(Object.keys(unit)).toHaveLength(8)
        expect(unit.businessUnitId).toBeDefined()
        expect(unit.name).toBeDefined()
        expect(typeof unit.isActive).toBe('boolean')
      })
    })

    it('should maintain data consistency across multiple queries', async () => {
      // First query
      const result1 = await fetchBusinessUnits({ BusinessUnitId: 'E' })

      // Second query with different parameters
      const result2 = await fetchBusinessUnits({ ReturnAll: true })

      // Third query with field selection
      const result3 = await fetchBusinessUnits({
        BusinessUnitId: 'E',
        Fields: 'businessUnitId,name',
      })

      // Verify consistency
      expect(result1.data[0].businessUnitId).toBe('E')
      expect(
        result2.data.find((unit) => unit.businessUnitId === 'E')
      ).toBeDefined()
      expect(result3.data[0].businessUnitId).toBe('E')
      expect(result3.data[0].name).toBe(result1.data[0].name)
    })
  })

  describe('Mock Data Integrity Validation', () => {
    it('should verify mock data structure matches expected schema', async () => {
      const result = await fetchBusinessUnits({ ReturnAll: true })

      result.data.forEach((unit) => {
        expect(unit).toHaveProperty('businessUnitId')
        expect(unit).toHaveProperty('name')
        expect(unit).toHaveProperty('description')
        expect(unit).toHaveProperty('abbreviation')
        expect(unit).toHaveProperty('groupTitle')
        expect(unit).toHaveProperty('isActive')
        expect(unit).toHaveProperty('isEligibleForAdmitted')
        expect(unit).toHaveProperty('url')

        expect(typeof unit.businessUnitId).toBe('string')
        expect(typeof unit.name).toBe('string')
        expect(typeof unit.isActive).toBe('boolean')
        expect(typeof unit.isEligibleForAdmitted).toBe('boolean')
        expect(unit.url === null || typeof unit.url === 'string').toBe(true)
      })
    })

    it('should have consistent business unit IDs across all test scenarios', async () => {
      const expectedIds = ['E', 'D', 'C', 'F', 'T', 'R', 'L', 'Z'] // All units including inactive
      const result = await fetchBusinessUnits({ ReturnAll: true })

      const actualIds = result.data.map((unit) => unit.businessUnitId).sort()
      expect(actualIds).toEqual(expectedIds.sort())
    })

    it('should validate active/inactive status distribution', async () => {
      const allUnits = await fetchBusinessUnits({ ReturnAll: true })
      const activeUnits = await fetchBusinessUnits()

      expect(allUnits.data).toHaveLength(8) // All units
      expect(activeUnits.data).toHaveLength(6) // Active units only

      const inactiveUnits = allUnits.data.filter((unit) => !unit.isActive)
      expect(inactiveUnits).toHaveLength(2) // L and Z are inactive
      expect(inactiveUnits.map((unit) => unit.businessUnitId).sort()).toEqual([
        'L',
        'Z',
      ])
    })
  })
})
