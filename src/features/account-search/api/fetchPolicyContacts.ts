import { useQuery } from '@tanstack/react-query'
import { PolicyContactApiResponse } from '../types'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'

// REST API call - bulletproof pattern keeps API logic in feature/api folder
export const fetchPolicyContacts = async (
  producerCode: string
): Promise<PolicyContactApiResponse> => {
  const response = await fetch(
    `${API_BASE_URL}/api/policyContacts?producerCode=${producerCode}`
  )

  if (!response.ok)
    throw new Error(`Failed to fetch policy contacts: ${response.statusText}`)

  return response.json()
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
