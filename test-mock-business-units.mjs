// Quick test file to validate mock business units functionality
// This will be deleted after testing

import { getMockBusinessUnits, filterBusinessUnits, selectBusinessUnitFields, mockBusinessUnitsData } from './src/mocks/data/business-units.mock.ts';

console.log('Testing mock business units functionality...\n');

// Test 1: Basic functionality (should return only active units)
console.log('Test 1: Basic getMockBusinessUnits (active only)...');
const basic = getMockBusinessUnits();
console.log(`✓ Basic response data count: ${basic.data.length} active units`);
console.log(`✓ All active: ${basic.data.every(unit => unit.isActive)}`);

// Test 2: ReturnAll = true (should include inactive units)
console.log('\nTest 2: getMockBusinessUnits with ReturnAll = true...');
const all = getMockBusinessUnits({ ReturnAll: true });
console.log(`✓ All units count (including inactive): ${all.data.length}`);
console.log(`✓ Has inactive units: ${all.data.some(unit => !unit.isActive)}`);

// Test 3: BusinessUnitId filter
console.log('\nTest 3: getMockBusinessUnits with BusinessUnitId filter...');
const filtered = getMockBusinessUnits({ BusinessUnitId: 'E' });
console.log(`✓ Filtered response data count: ${filtered.data.length}`);
console.log(`✓ Correct unit: ${filtered.data[0]?.businessUnitId === 'E'}`);

// Test 4: Fields selection
console.log('\nTest 4: getMockBusinessUnits with Fields selection...');
const selected = getMockBusinessUnits({ Fields: 'businessUnitId,name,isActive' });
console.log('✓ Selected fields response:');
console.log(JSON.stringify(selected.data[0], null, 2));

// Test 5: Combined parameters
console.log('\nTest 5: Combined parameters (BusinessUnitId + Fields)...');
const combined = getMockBusinessUnits({ 
  BusinessUnitId: 'T', 
  Fields: 'businessUnitId,name' 
});
console.log('✓ Combined response:');
console.log(JSON.stringify(combined.data[0], null, 2));

console.log('\n✅ All tests completed successfully!');
