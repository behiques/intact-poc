import { NAIC, NAICApiResponse } from '@/features/submissions/types'

/**
 * Mock data for NAICs
 */
export const mockNAICsData: NAIC[] = [
  {
    sicCode: '9999',
    naicsCode: '999999',
    description: '9999 1 Nonclassifiable Establishments',
  },
]

/**
 * Helper to get mock NAICs API response
 */
export const getMockNAICsBySIC = (): NAICApiResponse => {
  return {
    data: mockNAICsData,
  }
}
