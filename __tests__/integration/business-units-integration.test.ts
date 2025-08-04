/**
 * Integration test for Business Units API Enhancement
 * This tests the complete functionality without mocking to ensure everything works together
 */

import { describe, it, expect } from 'vitest'
import {
  getMockBusinessUnits,
  filterBusinessUnits,
  selectBusinessUnitFields,
  mockBusinessUnitsData,
} from '../../src/mocks/data/business-units.mock'
import {
  BusinessUnitsQueryParams,
  BusinessUnitsQueryParamsSchema,
  BusinessUnitSchema,
  BusinessUnitApiResponseSchema,
} from '../../src/features/account-search/types'
import { createBusinessUnitsQueryKey } from '../../src/features/account-search/api/fetchBusinessUnits'

describe('Business Units API Enhancement Integration Tests', () => {
  describe('Type Validation', () => {
    it('should validate valid query parameters', () => {
      const validParams: BusinessUnitsQueryParams = {
        BusinessUnitId: 'E',
        Fields: 'businessUnitId,name,isActive',
        ReturnAll: true,
      }

      const result = BusinessUnitsQueryParamsSchema.safeParse(validParams)
      expect(result.success).toBe(true)
      if (result.success) {
        expect(result.data).toEqual(validParams)
      }
    })

    it('should reject invalid query parameters', () => {
      const invalidParams = {
        BusinessUnitId: '', // Empty string should fail
        Fields: '  ,  ,  ', // Invalid fields format
        ReturnAll: 'yes', // Should be boolean
      }

      const result = BusinessUnitsQueryParamsSchema.safeParse(invalidParams)
      expect(result.success).toBe(false)
    })

    it('should validate business unit response schema', () => {
      const validUnit = {
        abbreviation: 'ENT',
        businessUnitId: 'E',
        description: 'Entertainment and Media Division',
        groupTitle: 'Media Group',
        isActive: true,
        isEligibleForAdmitted: true,
        name: 'Entertainment',
        url: '/business-units/entertainment',
      }

      const result = BusinessUnitSchema.safeParse(validUnit)
      expect(result.success).toBe(true)
    })

    it('should validate API response schema', () => {
      const response = getMockBusinessUnits()
      const result = BusinessUnitApiResponseSchema.safeParse(response)
      expect(result.success).toBe(true)
    })
  })

  describe('Mock Data Functionality', () => {
    it('should return only active business units by default', () => {
      const response = getMockBusinessUnits()

      expect(response.data).toBeDefined()
      expect(response.data.length).toBeGreaterThan(0)
      expect(response.data.every((unit) => unit.isActive)).toBe(true)
    })

    it('should filter by BusinessUnitId', () => {
      const response = getMockBusinessUnits({ BusinessUnitId: 'E' })

      expect(response.data).toBeDefined()
      expect(response.data.length).toBe(1)
      expect(response.data[0].businessUnitId).toBe('E')
    })

    it('should include inactive units when ReturnAll is true', () => {
      const response = getMockBusinessUnits({ ReturnAll: true })

      expect(response.data.length).toBeGreaterThan(
        getMockBusinessUnits().data.length
      )
      expect(response.data.some((unit) => !unit.isActive)).toBe(true)
    })

    it('should filter fields when Fields parameter is provided', () => {
      const fields = 'businessUnitId,name,isActive'
      const response = getMockBusinessUnits({ Fields: fields })

      expect(response.data.length).toBeGreaterThan(0)

      const firstUnit = response.data[0]
      const expectedFields = ['businessUnitId', 'name', 'isActive']
      const actualFields = Object.keys(firstUnit)

      // Should contain the requested fields
      expectedFields.forEach((field) => {
        expect(actualFields).toContain(field)
      })

      // Should not contain extra fields
      const unwantedFields = [
        'abbreviation',
        'description',
        'groupTitle',
        'url',
        'isEligibleForAdmitted',
      ]
      unwantedFields.forEach((field) => {
        expect(actualFields).not.toContain(field)
      })
    })

    it('should handle multiple parameters together', () => {
      const response = getMockBusinessUnits({
        ReturnAll: true,
        Fields: 'businessUnitId,name',
      })

      expect(response.data.length).toBeGreaterThan(0)
      expect(response.data.some((unit) => !unit.isActive)).toBe(true)

      const firstUnit = response.data[0]
      const fields = Object.keys(firstUnit)
      expect(fields).toContain('businessUnitId')
      expect(fields).toContain('name')
      expect(fields).not.toContain('description')
    })
  })

  describe('Query Key Generation', () => {
    it('should generate basic query key without parameters', () => {
      const key = createBusinessUnitsQueryKey()
      expect(key).toEqual(['fetchBusinessUnits'])
    })

    it('should generate parameterized query key', () => {
      const params: BusinessUnitsQueryParams = {
        BusinessUnitId: 'E',
        Fields: 'businessUnitId,name',
        ReturnAll: true,
      }

      const key = createBusinessUnitsQueryKey(params)
      expect(key).toEqual([
        'fetchBusinessUnits',
        'businessUnitId',
        'E',
        'fields',
        'businessUnitId,name',
        'returnAll',
        'true',
      ])
    })

    it('should generate different keys for different parameters', () => {
      const key1 = createBusinessUnitsQueryKey({ BusinessUnitId: 'E' })
      const key2 = createBusinessUnitsQueryKey({ BusinessUnitId: 'T' })
      const key3 = createBusinessUnitsQueryKey({
        Fields: 'businessUnitId,name',
      })

      expect(key1).not.toEqual(key2)
      expect(key1).not.toEqual(key3)
      expect(key2).not.toEqual(key3)
    })
  })

  describe('Filtering Functions', () => {
    it('should filter by BusinessUnitId correctly', () => {
      const filtered = filterBusinessUnits({ BusinessUnitId: 'E' })

      expect(filtered.length).toBe(1)
      expect(filtered[0].businessUnitId).toBe('E')
    })

    it('should return all units including inactive when ReturnAll is true', () => {
      const activeOnly = filterBusinessUnits()
      const includeInactive = filterBusinessUnits({ ReturnAll: true })

      expect(includeInactive.length).toBeGreaterThan(activeOnly.length)
    })

    it('should select fields correctly', () => {
      const units = mockBusinessUnitsData.slice(0, 2) // Take first 2 units
      const selected = selectBusinessUnitFields(units, 'businessUnitId,name')

      expect(selected.length).toBe(2)
      selected.forEach((unit) => {
        expect(Object.keys(unit)).toContain('businessUnitId')
        expect(Object.keys(unit)).toContain('name')
        expect(Object.keys(unit)).not.toContain('description')
      })
    })
  })

  describe('Error Handling', () => {
    it('should handle empty BusinessUnitId gracefully', () => {
      const response = getMockBusinessUnits({ BusinessUnitId: 'NONEXISTENT' })
      expect(response.data).toEqual([])
    })

    it('should handle invalid field names gracefully', () => {
      const response = getMockBusinessUnits({
        Fields: 'invalidField,anotherInvalidField',
      })

      // Should still return data, but with only businessUnitId (always included)
      expect(response.data.length).toBeGreaterThan(0)
      expect(response.data[0]).toHaveProperty('businessUnitId')
    })

    it('should handle malformed Fields parameter', () => {
      const response = getMockBusinessUnits({ Fields: '  ,  ,  ' })

      // Should still work and return at least businessUnitId
      expect(response.data.length).toBeGreaterThan(0)
      expect(response.data[0]).toHaveProperty('businessUnitId')
    })
  })
})
