import type {
  PolicyContact,
  PolicyContactApiResponse,
} from '@/features/account-search/types'

/**
 * Mock data for policy contacts
 */
export const mockPolicyContactsData: PolicyContact[] = [
  {
    producerContactId: 1001,
    firstName: 'Alice',
    lastName: 'Johnson',
    email: 'alice.johnson@example.com',
    phone: '555-0101',
  },
  {
    producerContactId: 1002,
    firstName: 'Bob',
    lastName: 'Smith',
    email: 'bob.smith@example.com',
    phone: '555-0102',
  },
  {
    producerContactId: 1003,
    firstName: 'Carol',
    lastName: 'Davis',
    email: 'carol.davis@example.com',
    phone: '555-0103',
  },
  {
    producerContactId: 1004,
    firstName: 'Dan',
    lastName: 'Wilson',
    email: 'dan.wilson@example.com',
    phone: '555-0104',
  },
]

/**
 * Helper to get mock policy contacts API response
 */
export const getMockPolicyContacts = (): PolicyContactApiResponse => {
  return {
    data: mockPolicyContactsData,
  }
}
