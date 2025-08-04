import type {
  FinancialCloseDate,
  FinancialCloseDatesApiResponse,
} from '@/features/dashboard/types'

/**
 * Mock data for financial close dates
 */
export const mockFinancialCloseDateData: FinancialCloseDate[] = [
  {
    month: 'January',
    premium: '15',
    day: '15',
    loss: '20',
  },
  {
    month: 'February',
    premium: '15',
    day: '15',
    loss: '20',
  },
  {
    month: 'March',
    premium: '15',
    day: '15',
    loss: '20',
  },
  {
    month: 'December',
    premium: '31',
    day: '31',
    loss: '31',
  },
]

/**
 * Helper to get mock financial close dates API response
 */
export const getMockFinancialCloseDate = (): FinancialCloseDatesApiResponse => {
  return {
    data: mockFinancialCloseDateData,
  }
}
