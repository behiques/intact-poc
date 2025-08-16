import { useQuery } from '@tanstack/react-query'
import {
  BusinessUnitApiResponse,
  BusinessUnitsQueryParams,
  BusinessUnitsQueryParamsSchema,
} from '../types'
import { apiClient } from '@/lib/api'

/**
 * Constructs the business units endpoint URL based on environment
 */
const getBusinessUnitsEndpoint = (): string => {
  // Use the new backend endpoint structure
  return '/api/businessunits'
}

/**
 * Validates and sanitizes query parameters
 */
const validateQueryParams = (
  params?: BusinessUnitsQueryParams
): BusinessUnitsQueryParams | undefined => {
  if (!params) return undefined

  try {
    return BusinessUnitsQueryParamsSchema.parse(params)
  } catch (error) {
    console.warn('Invalid business units query parameters:', error)
    return undefined
  }
}

/**
 * Creates a query key for React Query caching based on parameters
 */
export const createBusinessUnitsQueryKey = (
  params?: BusinessUnitsQueryParams
): string[] => {
  const baseKey = 'fetchBusinessUnits'

  if (!params) {
    return [baseKey]
  }

  // Create a deterministic key based on parameters
  const keyParts = [baseKey]

  if (params.BusinessUnitId) {
    keyParts.push('businessUnitId', params.BusinessUnitId)
  }

  if (params.Fields) {
    keyParts.push('fields', params.Fields)
  }

  if (params.ReturnAll !== undefined) {
    keyParts.push('returnAll', params.ReturnAll.toString())
  }

  return keyParts
}

/**
 * Fetches business units from the API with optional query parameters
 * Enhanced to support BusinessUnitId, Fields, and ReturnAll parameters
 */
export const fetchBusinessUnits = async (
  params?: BusinessUnitsQueryParams
): Promise<BusinessUnitApiResponse> => {
  // Validate parameters before making the request
  const validatedParams = validateQueryParams(params)

  // Get the appropriate endpoint
  const endpoint = getBusinessUnitsEndpoint()

  try {
    // Make the API request with optional query parameters
    const response = await apiClient.get<BusinessUnitApiResponse>(endpoint, {
      params: validatedParams as Record<string, unknown>,
    })

    return response.data
  } catch (error) {
    // Enhanced error handling with context
    console.error('Failed to fetch business units:', {
      endpoint,
      params: validatedParams,
      error,
    })

    // Re-throw with additional context for upstream error handling
    throw new Error(
      `Failed to fetch business units: ${error instanceof Error ? error.message : 'Unknown error'}`
    )
  }
}

/**
 * Legacy function for backward compatibility (no parameters)
 */
export const fetchBusinessUnitsLegacy =
  async (): Promise<BusinessUnitApiResponse> => {
    return fetchBusinessUnits()
  }

/**
 * React Query hook for fetching business units with optional parameters
 * Includes proper caching, error handling, and loading states
 */
export const useBusinessUnitsQuery = (params?: BusinessUnitsQueryParams) => {
  return useQuery({
    queryKey: createBusinessUnitsQueryKey(params),
    queryFn: () => fetchBusinessUnits(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    // Enable the query by default, can be overridden by caller
    enabled: true,
    // Retry on failure with exponential backoff
    retry: (failureCount, error) => {
      // Don't retry on validation errors (4xx status codes)
      if (error instanceof Error && error.message.includes('400')) {
        return false
      }
      // Retry up to 3 times for other errors
      return failureCount < 3
    },
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  })
}

/**
 * React Query hook for fetching a specific business unit by ID
 */
export const useBusinessUnitQuery = (businessUnitId: string) => {
  return useBusinessUnitsQuery({ BusinessUnitId: businessUnitId })
}

/**
 * React Query hook for fetching business units with specific fields
 */
export const useBusinessUnitsWithFieldsQuery = (
  fields: string,
  params?: Omit<BusinessUnitsQueryParams, 'Fields'>
) => {
  return useBusinessUnitsQuery({ ...params, Fields: fields })
}

/**
 * React Query hook for fetching all business units (including inactive)
 */
export const useAllBusinessUnitsQuery = (
  params?: Omit<BusinessUnitsQueryParams, 'ReturnAll'>
) => {
  return useBusinessUnitsQuery({ ...params, ReturnAll: true })
}
