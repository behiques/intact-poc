import { useQuery } from '@tanstack/react-query'
import { ProducerApiResponse } from '../types'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'

// REST API call - bulletproof pattern keeps API logic in feature/api folder
export const fetchProducers = async (
  businessUnitId: string
): Promise<ProducerApiResponse> => {
  const response = await fetch(
    `${API_BASE_URL}/api/producers?businessUnitId=${businessUnitId}`
  )

  if (!response.ok)
    throw new Error(`Failed to fetch producers: ${response.statusText}`)

  return response.json()
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
