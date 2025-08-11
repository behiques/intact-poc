import {
  LegalEntity,
  LegalEntityApiResponse,
} from '@/features/submissions/types'

/**
 * Mock data for legal entities
 */
export const mockLegalEntitiesData: LegalEntity[] = [
  {
    value: '7',
    label: 'Assn, Labor, Religious Org.',
  },
  {
    value: '1',
    label: 'Corporation',
  },
  {
    value: '14',
    label: 'Executor or Trustee',
  },
  {
    value: '16',
    label: 'Governmental Entity',
  },
  {
    value: '3',
    label: 'Individual',
  },
  {
    value: '12',
    label: 'Joint Employers',
  },
  {
    value: '4',
    label: 'Joint Venture',
  },
  {
    value: '5',
    label: 'Limited Liability Company',
  },
  {
    value: '15',
    label: 'Limited Liability Partnership',
  },
  {
    value: '8',
    label: 'Limited Partnership',
  },
  {
    value: '99',
    label: 'Other',
  },
  {
    value: '2',
    label: 'Partnership',
  },
  {
    value: '13',
    label: 'Trust or Estate',
  },
]

/**
 * Helper to get mock legal entities API response
 */
export const getMockLegalEntities = (): LegalEntityApiResponse => {
  return {
    data: mockLegalEntitiesData,
  }
}
