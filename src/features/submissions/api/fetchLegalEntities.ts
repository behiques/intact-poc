import { useQuery } from '@tanstack/react-query'
import { LegalEntityApiResponse } from '../types'
import { apiClient } from '@/lib/api'

// REST API call - bulletproof pattern keeps API logic in feature/api folder
export const fetchLegalEntities = async (): Promise<LegalEntityApiResponse> => {
  // Direct call to backend API (or mock based on environment)
  const response =
    await apiClient.get<LegalEntityApiResponse>('/legal-entities')

  return response.data
}

// React Query hooks for data fetching
export const useLegalEntitiesQuery = () => {
  return useQuery({
    queryKey: ['legal-entities'],
    queryFn: () => fetchLegalEntities(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  })
}
