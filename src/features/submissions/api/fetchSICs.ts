import { useQuery } from '@tanstack/react-query'
import { TerritoryApiResponse } from '../types'
import { apiClient } from '@/lib/api'

// REST API call - bulletproof pattern keeps API logic in feature/api folder
export const fetchSICs = async (): Promise<TerritoryApiResponse> => {
  // Direct call to backend API (or mock based on environment)
  const response = await apiClient.get<TerritoryApiResponse>('/sics')
  console.log({ response })

  return response.data
}

// React Query hooks for data fetching
export const useSICsQuery = () => {
  return useQuery({
    queryKey: ['sics'],
    queryFn: () => fetchSICs(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  })
}
