import { useQuery } from '@tanstack/react-query'
import { FinancialCloseDatesApiResponse } from '../types'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'

// REST API call - bulletproof pattern keeps API logic in feature/api folder
export const fetchFinancialCloseDates =
  async (): Promise<FinancialCloseDatesApiResponse> => {
    const response = await fetch(`${API_BASE_URL}/api/financialCloseDates`)

    if (!response.ok) {
      throw new Error(
        `Failed to fetch financial close dates: ${response.statusText}`
      )
    }

    return response.json()
  }

// React Query hooks for data fetching
export const useFinancialCloseDatesQuery = () => {
  return useQuery({
    queryKey: ['financialCloseDates'],
    queryFn: () => fetchFinancialCloseDates(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  })
}
