import { useQuery } from '@tanstack/react-query'
import { AccountSearchApiResponse, AccountSearchFormData } from '../types'
import { removeBlankAttributes } from '@/utils/objectFormatter'
import { apiClient } from '@/lib/api'

// REST API call - bulletproof pattern keeps API logic in feature/api folder
export const fetchAccounts = async (
  searchParams: AccountSearchFormData
): Promise<AccountSearchApiResponse> => {
  // Clean search params
  const cleanParams = removeBlankAttributes(searchParams)

  // Direct call to backend API (or mock based on environment)
  const response = await apiClient.get<AccountSearchApiResponse>('/accounts', {
    params: cleanParams,
  })

  return response.data
}

// React Query hooks for data fetching
export const useAccountSearchQuery = (searchParams: AccountSearchFormData) => {
  return useQuery({
    enabled: !!searchParams.accountName, // Only run query if accountName is provided
    queryKey: ['fetchAccounts', searchParams],
    queryFn: () => fetchAccounts(searchParams),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  })
}
