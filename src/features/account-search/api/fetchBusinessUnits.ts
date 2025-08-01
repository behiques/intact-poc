import { useQuery } from '@tanstack/react-query'
import { BusinessUnitApiResponse } from '../types'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'

// REST API call - bulletproof pattern keeps API logic in feature/api folder
export const fetchBusinessUnits =
  async (): Promise<BusinessUnitApiResponse> => {
    const response = await fetch(`${API_BASE_URL}/api/businessUnits`)

    if (!response.ok)
      throw new Error(`Failed to fetch business units: ${response.statusText}`)

    return response.json()
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
