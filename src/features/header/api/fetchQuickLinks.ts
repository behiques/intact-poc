import { useQuery } from '@tanstack/react-query'
import { QuickLinksApiResponse } from '../types'
import { apiClient } from '@/lib/api'

// REST API call - bulletproof pattern keeps API logic in feature/api folder
export const fetchQuickLinks = async (): Promise<QuickLinksApiResponse> => {
  // Direct call to backend API (or mock based on environment)
  const response = await apiClient.get<QuickLinksApiResponse>('/quickLinks')

  return response.data
}

// React Query hooks for data fetching
export const useQuickLinksQuery = () => {
  return useQuery({
    queryKey: ['quickLinks'],
    queryFn: () => fetchQuickLinks(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  })
}
