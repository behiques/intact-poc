import { useQuery } from '@tanstack/react-query'
import { BusinessUnitApiResponse } from '../types'
import { apiClient } from '@/lib/api'

// REST API call - bulletproof pattern keeps API logic in feature/api folder
export const fetchBusinessUnits =
  async (): Promise<BusinessUnitApiResponse> => {
    // Direct call to backend API (or mock based on environment)
    const response =
      await apiClient.get<BusinessUnitApiResponse>('/businessUnits')

    return response.data
  }

// React Query hooks for data fetching
export const useBusinessUnitsQuery = () => {
  return useQuery({
    queryKey: ['fetchBusinessUnits'],
    queryFn: () => fetchBusinessUnits(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  })
}
