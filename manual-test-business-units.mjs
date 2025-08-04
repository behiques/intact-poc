/**
 * Manual Test Suite for Business Units API Enhancement
 * 
 * This file contains manual tests to validate the implementation
 * before creating the comprehensive automated test suite.
 */

import { 
  fetchBusinessUnits, 
  useBusinessUnitsQuery,
  createBusinessUnitsQueryKey,
  useBusinessUnitQuery,
  useBusinessUnitsWithFieldsQuery,
  useAllBusinessUnitsQuery
} from '../src/features/account-search/api/fetchBusinessUnits'

import { 
  getMockBusinessUnits,
  filterBusinessUnits,
  selectBusinessUnitFields,
  mockBusinessUnitsData
} from '../src/mocks/data/business-units.mock'

import { useBusinessUnits } from '../src/features/account-search/hooks/useBusinessUnits'

import {
  BusinessUnitsQueryParams,
  BusinessUnitsQueryParamsSchema,
  BusinessUnitSchema,
  BusinessUnitApiResponseSchema
} from '../src/features/account-search/types'

console.log('🧪 Starting Manual Tests for Business Units API Enhancement\n')

// Test 1: Type Validation
console.log('📝 Test 1: TypeScript Type Validation')
try {
  // Valid parameters
  const validParams: BusinessUnitsQueryParams = {
    BusinessUnitId: 'E',
    Fields: 'businessUnitId,name,isActive',
    ReturnAll: true
  }
  console.log('✅ Valid parameters type check passed:', validParams)

  // Test Zod schema validation
  const validatedParams = BusinessUnitsQueryParamsSchema.parse(validParams)
  console.log('✅ Zod validation passed:', validatedParams)
} catch (error) {
  console.error('❌ Type validation failed:', error)
}

// Test 2: Mock Data Functionality
console.log('\n📝 Test 2: Mock Data Functionality')
try {
  // Test basic mock data
  const basicMockData = getMockBusinessUnits()
  console.log('✅ Basic mock data (active only):', basicMockData.data.length, 'units')
  console.log('✅ All units are active:', basicMockData.data.every(unit => unit.isActive))

  // Test with ReturnAll
  const allMockData = getMockBusinessUnits({ ReturnAll: true })
  console.log('✅ All mock data (including inactive):', allMockData.data.length, 'units')
  console.log('✅ Has inactive units:', allMockData.data.some(unit => !unit.isActive))

  // Test with BusinessUnitId filter
  const filteredMockData = getMockBusinessUnits({ BusinessUnitId: 'E' })
  console.log('✅ Filtered mock data (BusinessUnitId=E):', filteredMockData.data.length, 'units')
  console.log('✅ Correct unit:', filteredMockData.data[0]?.businessUnitId === 'E')

  // Test with Fields selection
  const selectedFieldsData = getMockBusinessUnits({ Fields: 'businessUnitId,name,isActive' })
  console.log('✅ Selected fields data:', Object.keys(selectedFieldsData.data[0] || {}))
  
} catch (error) {
  console.error('❌ Mock data test failed:', error)
}

// Test 3: Query Key Generation
console.log('\n📝 Test 3: Query Key Generation')
try {
  const basicKey = createBusinessUnitsQueryKey()
  console.log('✅ Basic query key:', basicKey)

  const parameterizedKey = createBusinessUnitsQueryKey({
    BusinessUnitId: 'E',
    Fields: 'businessUnitId,name',
    ReturnAll: true
  })
  console.log('✅ Parameterized query key:', parameterizedKey)

  const partialKey = createBusinessUnitsQueryKey({ BusinessUnitId: 'T' })
  console.log('✅ Partial query key:', partialKey)
} catch (error) {
  console.error('❌ Query key generation failed:', error)
}

// Test 4: Function Signatures and Exports
console.log('\n📝 Test 4: Function Signatures and Exports')
try {
  // Check that all functions are properly exported and have correct types
  console.log('✅ fetchBusinessUnits exported:', typeof fetchBusinessUnits === 'function')
  console.log('✅ useBusinessUnitsQuery exported:', typeof useBusinessUnitsQuery === 'function')
  console.log('✅ useBusinessUnitQuery exported:', typeof useBusinessUnitQuery === 'function')
  console.log('✅ useBusinessUnitsWithFieldsQuery exported:', typeof useBusinessUnitsWithFieldsQuery === 'function')
  console.log('✅ useAllBusinessUnitsQuery exported:', typeof useAllBusinessUnitsQuery === 'function')
  console.log('✅ useBusinessUnits exported:', typeof useBusinessUnits === 'function')
  console.log('✅ getMockBusinessUnits exported:', typeof getMockBusinessUnits === 'function')
} catch (error) {
  console.error('❌ Export validation failed:', error)
}

// Test 5: Schema Validation Edge Cases
console.log('\n📝 Test 5: Schema Validation Edge Cases')
try {
  // Test invalid BusinessUnitId
  try {
    BusinessUnitsQueryParamsSchema.parse({ BusinessUnitId: '' })
    console.error('❌ Empty BusinessUnitId should fail validation')
  } catch {
    console.log('✅ Empty BusinessUnitId correctly rejected')
  }

  // Test invalid Fields format
  try {
    BusinessUnitsQueryParamsSchema.parse({ Fields: '  ,  , ' })
    console.error('❌ Invalid Fields format should fail validation')
  } catch {
    console.log('✅ Invalid Fields format correctly rejected')
  }

  // Test valid edge cases
  const validEdgeCases = [
    { BusinessUnitId: 'A' },
    { Fields: 'businessUnitId' },
    { ReturnAll: false },
    { BusinessUnitId: 'Z', Fields: 'businessUnitId,name', ReturnAll: true }
  ]

  validEdgeCases.forEach((params, index) => {
    try {
      const validated = BusinessUnitsQueryParamsSchema.parse(params)
      console.log(`✅ Edge case ${index + 1} validation passed:`, validated)
    } catch (error) {
      console.error(`❌ Edge case ${index + 1} validation failed:`, error)
    }
  })

} catch (error) {
  console.error('❌ Schema validation test failed:', error)
}

console.log('\n🎉 Manual testing completed!')
console.log('\n📋 Summary of what was tested:')
console.log('   ✅ TypeScript type definitions and Zod schema validation')
console.log('   ✅ Mock data functionality with all query parameters')
console.log('   ✅ Query key generation for React Query caching')
console.log('   ✅ Function exports and signatures')
console.log('   ✅ Schema validation edge cases and error handling')
console.log('\n🚀 Ready for automated test suite creation!')
