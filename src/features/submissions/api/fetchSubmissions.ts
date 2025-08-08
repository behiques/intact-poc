import { useQuery } from '@tanstack/react-query'
import { SubmissionWorklistApiResponse } from '../types'
import { apiClient } from '@/lib/api'

// REST API call - bulletproof pattern keeps API logic in feature/api folder
export const fetchSubmissions = async ({
  query,
}: {
  query: 'inbox' | 'worklist'
}): Promise<SubmissionWorklistApiResponse> => {
  // Direct call to backend API (or mock based on environment)
  const response = await apiClient.get<SubmissionWorklistApiResponse>(
    `/submissions?query=${query}`
  )

  return response.data
}

// React Query hooks for data fetching
export const useSubmissionsQuery = (query: 'inbox' | 'worklist') => {
  return useQuery({
    queryKey: ['submissions', query],
    queryFn: () => fetchSubmissions({ query }),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  })
}
