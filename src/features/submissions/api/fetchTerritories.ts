import { useQuery } from '@tanstack/react-query'
import { TerritoryApiResponse } from '../types'
import { apiClient } from '@/lib/api'

// REST API call - bulletproof pattern keeps API logic in feature/api folder
export const fetchTerritories = async (): Promise<TerritoryApiResponse> => {
  // Direct call to backend API (or mock based on environment)
  const response = await apiClient.get<TerritoryApiResponse>('/territories')

  return response.data
}

// React Query hooks for data fetching
export const useTerritoriesQuery = () => {
  return useQuery({
    queryKey: ['territories'],
    queryFn: () => fetchTerritories(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  })
}
