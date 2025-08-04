import { useQuery } from '@tanstack/react-query'
import { PolicyContactApiResponse } from '../types'
import { apiClient } from '@/lib/api'

// REST API call - bulletproof pattern keeps API logic in feature/api folder
export const fetchPolicyContacts = async (
  producerCode: string
): Promise<PolicyContactApiResponse> => {
  // Direct call to backend API (or mock based on environment)
  const response = await apiClient.get<PolicyContactApiResponse>(
    '/policyContacts',
    {
      params: { producerCode },
    }
  )

  return response.data
}

// React Query hooks for data fetching
export const usePolicyContactsQuery = (producerCode: string) => {
  return useQuery({
    enabled: !!producerCode, // Only run query if producerCode is provided
    queryKey: ['fetchPolicyContacts', producerCode],
    queryFn: () => fetchPolicyContacts(producerCode),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  })
}
