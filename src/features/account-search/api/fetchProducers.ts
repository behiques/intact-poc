import { useQuery } from '@tanstack/react-query'
import { ProducerApiResponse } from '../types'
import { apiClient } from '@/lib/api'

// REST API call - bulletproof pattern keeps API logic in feature/api folder
export const fetchProducers = async (
  businessUnitId: string
): Promise<ProducerApiResponse> => {
  // Direct call to backend API (or mock based on environment)
  const response = await apiClient.get<ProducerApiResponse>('/producers', {
    params: { businessUnitId },
  })

  return response.data
}

// React Query hooks for data fetching
export const useProducersQuery = (businessUnitId: string) => {
  return useQuery({
    enabled: !!businessUnitId, // Only run query if businessUnitId is provided
    queryKey: ['fetchProducers', businessUnitId],
    queryFn: () => fetchProducers(businessUnitId),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  })
}
