import type { AccountSearchApiResponse } from '@/features/account-search/types'

/**
 * Mock data for account search responses
 * Organized by different scenarios for testing
 */
export const mockAccountsData = {
  search: {
    default: {
      data: [
        {
          account: {
            address: {
              street: '123 Mock Street',
              city: 'Mock City',
              state: 'California',
              zip: '90210',
              country: 'USA',
            },
            businessUnitId: 'E',
            businessUnitName: 'Entertainment',
            id: 1001,
            name: 'Acme Productions',
            name2: 'Film Division',
            producerCode: 'PROD001',
            producerName: 'John Producer',
            status: 'Active',
            dba: 'Acme Films',
            fka: 'Old Acme Studios',
          },
          term: {
            address: {
              street: '123 Mock Street',
              city: 'Mock City',
              state: 'California',
              zip: '90210',
              country: 'USA',
            },
            businessUnitId: 'E',
            businessUnitName: 'Entertainment',
            effectiveDate: '2024-01-01',
            expirationDate: '2024-12-31',
            producerCode: 'PROD001',
            producerName: 'John Producer',
            programType: 'Standard',
            territory: 'North America',
            status: 'Active',
            underwriter: 'Jane Underwriter',
            schedule: 'Annual',
            cyberCovExists: true,
            eandOCovExists: true,
          },
        },
        {
          account: {
            address: {
              street: '456 Test Avenue',
              city: 'Test Town',
              state: 'New York',
              zip: '10001',
              country: 'USA',
            },
            businessUnitId: 'D',
            businessUnitName: 'Healthcare',
            id: 1002,
            name: 'Beta Healthcare Systems',
            name2: '',
            producerCode: 'PROD002',
            producerName: 'Sarah Producer',
            status: 'Active',
            dba: undefined,
            fka: undefined,
          },
          term: {
            address: {
              street: '456 Test Avenue',
              city: 'Test Town',
              state: 'New York',
              zip: '10001',
              country: 'USA',
            },
            businessUnitId: 'D',
            businessUnitName: 'Healthcare',
            effectiveDate: '2024-03-01',
            expirationDate: '2025-02-28',
            producerCode: 'PROD002',
            producerName: 'Sarah Producer',
            programType: 'Premium',
            territory: 'Northeast',
            status: 'Active',
            underwriter: 'Bob Underwriter',
            schedule: 'Quarterly',
            cyberCovExists: true,
            eandOCovExists: false,
          },
        },
      ],
    } as AccountSearchApiResponse,

    empty: {
      data: [],
    } as AccountSearchApiResponse,

    error: null, // Will throw error when accessed

    inactive: {
      data: [
        {
          account: {
            address: {
              street: '789 Inactive Lane',
              city: 'Old Town',
              state: 'Texas',
              zip: '75001',
              country: 'USA',
            },
            businessUnitId: 'C',
            businessUnitName: 'Construction',
            id: 1003,
            name: 'Defunct Builders Inc',
            name2: '',
            producerCode: 'PROD003',
            producerName: 'Former Producer',
            status: 'Inactive',
            dba: undefined,
            fka: 'Active Builders LLC',
          },
          term: {
            address: {
              street: null,
              city: null,
              state: null,
              zip: null,
              country: null,
            },
            businessUnitId: '',
            businessUnitName: '',
            effectiveDate: '',
            expirationDate: '',
            producerCode: '',
            producerName: '',
            programType: '',
            territory: null,
            status: '',
            underwriter: '',
            schedule: '',
            cyberCovExists: false,
            eandOCovExists: false,
          },
        },
      ],
    } as AccountSearchApiResponse,
  },
}

/**
 * Helper to get mock data based on search parameters
 * Can be extended to return different data based on search criteria
 */
export const getMockAccountsForSearch = (params: {
  AccountName?: string
  ProducerCode?: string
  BusinessUnitId?: string
  AccountId?: string
}): AccountSearchApiResponse => {
  // Return empty if no search criteria

  if (
    !params.AccountName &&
    !params.ProducerCode &&
    !params.BusinessUnitId &&
    !params.AccountId
  ) {
    return { data: [] }
  }

  // Return error scenario for specific test account
  if (params.accountName === 'ERROR_TEST') {
    throw new Error('Mock API Error: Failed to fetch accounts')
  }

  // Return empty for no results scenario
  if (params.accountName === 'NO_RESULTS') {
    return { data: [] }
  }

  // Return inactive accounts for specific search
  if (params.accountName === 'INACTIVE') {
    return mockAccountsData.search.inactive
  }

  // Default: return standard mock data
  // In a real implementation, you might filter based on params
  return mockAccountsData.search.default
}
