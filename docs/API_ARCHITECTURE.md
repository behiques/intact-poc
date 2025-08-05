# Simplified API Architecture

This document describes the simplified API architecture that enables easy switching between mock and real backend APIs for development and testing.

## Overview

The new architecture provides:

- **Environment-based API switching** - Use mock or real APIs based on configuration
- **Centralized mock data** - All mock responses in one organized location
- **Direct API communication** - Removed unnecessary Next.js API route layer
- **Simplified token management** - Mock tokens for development, real tokens for production

## Quick Start

### 1. Enable Mock API Mode

Set the environment variable in your `.env.local`:

```bash
NEXT_PUBLIC_USE_MOCK_API=true
```

### 2. Start Development

```bash
pnpm dev
```

The application will now use mock data instead of requiring a backend connection.

## Architecture Components

### API Client (`/src/lib/api/`)

The unified API client automatically switches between mock and real implementations:

```typescript
import { apiClient } from '@/lib/api'

// Works with both mock and real APIs
const response = await apiClient.get('/accounts', {
  params: { accountName: 'test' },
})
```

#### Files:

- `index.ts` - Main entry point with environment detection
- `types.ts` - TypeScript interfaces for API client
- `mock-client.ts` - Mock API implementation
- `api-client.ts` - Real API implementation with fetch

### Token Providers (`/src/lib/auth/`)

Simplified token management with separate providers:

- **Mock Token Provider** - Returns dummy JWT tokens for development
- **Real Token Provider** - Integrates with existing token store

### Mock Data (`/src/mocks/data/`)

Centralized mock data organized by feature:

```
src/mocks/data/
├── accounts.mock.ts         # Account search results
├── business-units.mock.ts   # Business unit list
├── producers.mock.ts        # Producer list
├── policy-contacts.mock.ts  # Policy contacts
├── financial-close-date.mock.ts  # Dashboard data
└── quick-links.mock.ts      # Header links
```

## Usage in Features

### Before (Old Architecture)

```typescript
// Feature calls local API client → Next.js route → Backend API client → Backend
import { localApiClient } from '@/lib/apiClient'

export const fetchAccounts = async (params) => {
  const response = await localApiClient.get('/api/accounts', { params })
  return response.data
}
```

### After (New Architecture)

```typescript
// Feature calls unified API client → Backend (or Mock)
import { apiClient } from '@/lib/api'

export const fetchAccounts = async (params) => {
  const response = await apiClient.get('/accounts', { params })
  return response.data
}
```

## Mock Data Scenarios

The mock API supports different scenarios for testing:

### Account Search

- Default results: Search with any account name
- Empty results: Search for "NO_RESULTS"
- Error simulation: Search for "ERROR_TEST"
- Inactive accounts: Search for "INACTIVE"

### Example:

```typescript
// Returns mock accounts
await fetchAccounts({ accountName: 'Acme' })

// Returns empty array
await fetchAccounts({ accountName: 'NO_RESULTS' })

// Throws error
await fetchAccounts({ accountName: 'ERROR_TEST' })
```

## Environment Detection

The API client determines which implementation to use based on:

1. `NEXT_PUBLIC_USE_MOCK_API=true` - Explicitly use mock
2. `NODE_ENV=development` - Default to mock in development
3. `NODE_ENV=test` - Always use mock in tests
4. Production - Always use real API

## Benefits

1. **Faster Development** - No backend setup required
2. **Consistent Testing** - Same mock data in dev and test
3. **Simpler Architecture** - Fewer layers, direct communication
4. **Easy Switching** - Toggle between mock/real with env variable
5. **Type Safety** - Full TypeScript support throughout

## Migration Guide

### Updating Features

1. Replace imports:

   ```typescript
   // Old
   import { localApiClient } from '@/lib/apiClient'

   // New
   import { apiClient } from '@/lib/api'
   ```

2. Update API calls:

   ```typescript
   // Old
   const response = await localApiClient.get('/api/accounts', { params })

   // New
   const response = await apiClient.get('/accounts', { params })
   ```

3. Remove `/api` prefix from all endpoints

### Adding New Mock Data

1. Create mock data file in `/src/mocks/data/`
2. Export data and helper function
3. Update mock client to handle new endpoint

Example:

```typescript
// src/mocks/data/new-feature.mock.ts
export const mockNewFeatureData = { ... }

export const getMockNewFeature = () => ({
  data: mockNewFeatureData
})

// src/lib/api/mock-client.ts
if (endpoint === '/new-feature') {
  return getMockNewFeature() as T
}
```

## Current Status: Task 5.0 - Create Comprehensive Test Suite

### Completed Tasks

- ✅ Task 2.1: Create mock data infrastructure for business units
- ✅ Task 2.2: Create mock data for business unit testing scenarios
- ✅ Task 2.3: Create mock data integration tests
- ✅ Task 5.1: Create fetchBusinessUnits.test.ts with comprehensive API function testing (27 tests passing)
- ✅ Task 5.2: Add additional parameter validation scenarios
- ✅ Task 5.3: Add error handling scenarios
- ✅ Task 5.4: Add response data validation and schema compliance testing
- ✅ Task 5.5: Create useBusinessUnits.test.ts with React hook testing (10 tests passing, 2 skipped for complex error scenarios)
- ✅ Task 5.6: Add integration tests for mock client filtering logic with various query parameter combinations (17 tests passing)

### In Progress

- 🔄 Task 5.7: Add tests for backward compatibility ensuring existing code continues to work

### Next Steps

- ⏳ Task 5.8: Create performance and edge case tests for large datasets
- ⏳ Task 5.9: Add end-to-end testing scenarios with multiple parameters
- ⏳ Task 5.10: Create comprehensive test documentation and coverage reports

## Next Steps

1. Remove unnecessary Next.js API routes in `/src/app/api/`
2. Update remaining tests to use mock API client
3. Add more sophisticated mock scenarios as needed
4. Consider adding MSW for advanced mocking requirements
