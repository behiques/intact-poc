import { useQuery } from '@tanstack/react-query'
import { FinancialCloseDatesApiResponse } from '../types'
import { apiClient } from '@/lib/api'

// REST API call - bulletproof pattern keeps API logic in feature/api folder
export const fetchFinancialCloseDates =
  async (): Promise<FinancialCloseDatesApiResponse> => {
    // Direct call to backend API (or mock based on environment)
    const response = await apiClient.get<FinancialCloseDatesApiResponse>(
      '/financialCloseDates'
    )

    return response.data
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
