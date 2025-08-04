import type {
  Producer,
  ProducerApiResponse,
} from '@/features/account-search/types'

/**
 * Mock data for producers
 */
export const mockProducersData: Producer[] = [
  {
    producerCode: 'PROD001',
    name: 'John Producer Agency',
    address1: '123 Insurance Ave',
    city: 'Los Angeles',
    stateCode: 'CA',
    zip: '90001',
    territoryId: 'WEST-1',
    territoryName: 'West Coast',
  },
  {
    producerCode: 'PROD002',
    name: 'Sarah Producer Associates',
    address1: '456 Coverage Blvd',
    city: 'New York',
    stateCode: 'NY',
    zip: '10001',
    territoryId: 'EAST-1',
    territoryName: 'East Coast',
  },
  {
    producerCode: 'PROD003',
    name: 'Michael Producer Group',
    address1: '789 Policy St',
    city: 'Chicago',
    stateCode: 'IL',
    zip: '60601',
    territoryId: 'MID-1',
    territoryName: 'Midwest',
  },
  {
    producerCode: 'PROD004',
    name: 'Emma Producer Services',
    address1: '321 Claims Dr',
    city: 'Houston',
    stateCode: 'TX',
    zip: '77001',
    territoryId: 'SOUTH-1',
    territoryName: 'South',
  },
  {
    producerCode: 'PROD005',
    name: 'David Producer Brokers',
    address1: '654 Premium Way',
    city: 'Seattle',
    stateCode: 'WA',
    zip: '98101',
    territoryId: 'WEST-2',
    territoryName: 'Pacific Northwest',
  },
]

/**
 * Helper to get mock producers API response
 */
export const getMockProducers = (): ProducerApiResponse => {
  return {
    data: mockProducersData,
  }
}
