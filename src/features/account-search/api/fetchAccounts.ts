import { useQuery } from '@tanstack/react-query'
import { AccountSearchApiResponse, AccountSearchFormData } from '../types'
import { removeBlankAttributes } from '@/utils/objectFormatter'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'

// REST API call - bulletproof pattern keeps API logic in feature/api folder
export const fetchAccounts = async (
  searchParams: AccountSearchFormData
): Promise<AccountSearchApiResponse> => {
  const url = new URL(`${API_BASE_URL}/api/accounts`)
  url.search = new URLSearchParams(
    removeBlankAttributes(searchParams)
  ).toString()

  const response = await fetch(url)

  if (!response.ok)
    throw new Error(`Failed to fetch accounts: ${response.statusText}`)

  return response.json()
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
