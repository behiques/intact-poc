import { useQuery } from '@tanstack/react-query'
import { SubmissionWorklistApiResponse } from '../types'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'

// REST API call - bulletproof pattern keeps API logic in feature/api folder
export const fetchSubmissions = async ({
  query,
}: {
  query: string
}): Promise<SubmissionWorklistApiResponse> => {
  const response = await fetch(`${API_BASE_URL}/api/submissions?query=${query}`)

  if (!response.ok) {
    throw new Error(`Failed to fetch submissions: ${response.statusText}`)
  }

  return response.json()
}

// React Query hooks for data fetching
export const useSubmissionsQuery = (query: string) => {
  return useQuery({
    queryKey: ['submissions', query],
    queryFn: () => fetchSubmissions({ query }),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  })
}
