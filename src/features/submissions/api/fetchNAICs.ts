import { useQuery } from '@tanstack/react-query'
import { NAICApiResponse } from '../types'
import { apiClient } from '@/lib/api'

/**
 * Constructs the business units endpoint URL based on params
 */
const getEndpoint = (sicCode?: string): string => {
  // Use the new backend endpoint structure
  let endpoint = '/common-api/api/v1/common/naicscodes'
  if (sicCode) {
    endpoint = `/common-api/api/v1/common/siccodes/${sicCode}/naicscodes`
  }
  return endpoint
}

// REST API call - bulletproof pattern keeps API logic in feature/api folder
export const fetchNAICs = async (
  sicCode?: string
): Promise<NAICApiResponse> => {
  // Get the appropriate endpoint
  const endpoint = getEndpoint(sicCode)

  // Direct call to backend API (or mock based on environment)
  const response = await apiClient.get<NAICApiResponse>(endpoint)
  console.log({ naicsData: response.data })

  return response.data
}

// React Query hooks for data fetching
export const useNAICsQuery = () => {
  console.log({ useNAICsQuery: 'Fetching all NAICs' })
  return useQuery({
    queryKey: ['naics'],
    queryFn: () => fetchNAICs(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  })
}

export const useNAICsBySICQuery = (sicCode: string) => {
  return useQuery({
    enabled: !!sicCode,
    queryKey: ['naics', sicCode],
    queryFn: () => async () => {
      console.log({ useNAICsBySICQuery: 'Fetching NAICs by SIC code', sicCode })
      const res = await fetchNAICs(sicCode)
      console.log({ res })
      return res.data
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  })
}
