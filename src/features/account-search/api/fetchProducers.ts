import { useQuery } from '@tanstack/react-query'
import {
  ProducerApiResponse,
  ProducersQueryParams,
  ProducersQueryParamsSchema,
} from '../types'
import { apiClient } from '@/lib/api'

/**
 * Constructs the producers endpoint URL with businessUnitId as path parameter
 */
const getProducersEndpoint = (businessUnitId: string): string => {
  // Use the new backend endpoint structure with path parameter
  return `/common-api/api/v1/common/businessunits/${businessUnitId}/producers`
}

/**
 * Validates and sanitizes query parameters
 */
const validateQueryParams = (
  params?: ProducersQueryParams
): ProducersQueryParams | undefined => {
  if (!params) return undefined

  try {
    return ProducersQueryParamsSchema.parse(params)
  } catch (error) {
    console.warn('Invalid producers query parameters:', error)
    return undefined
  }
}

/**
 * Creates a query key for React Query caching based on businessUnitId and parameters
 */
export const createProducersQueryKey = (
  businessUnitId: string,
  params?: ProducersQueryParams
): string[] => {
  const baseKey = 'fetchProducers'

  // Start with base key and businessUnitId
  const keyParts = [baseKey, businessUnitId]

  if (!params) {
    return keyParts
  }

  // Create a deterministic key based on parameters
  if (params.TerritoryId) {
    keyParts.push('territoryId', params.TerritoryId)
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
 * Fetches producers from the API for a specific business unit with optional query parameters
 * Enhanced to support TerritoryId, Fields, and ReturnAll parameters
 */
export const fetchProducers = async (
  businessUnitId: string,
  params?: ProducersQueryParams
): Promise<ProducerApiResponse> => {
  // Validate businessUnitId
  if (!businessUnitId || businessUnitId.trim() === '') {
    throw new Error('BusinessUnitId is required and cannot be empty')
  }

  // Validate parameters before making the request
  const validatedParams = validateQueryParams(params)

  // Get the appropriate endpoint with path parameter
  const endpoint = getProducersEndpoint(businessUnitId)

  try {
    // Make the API request with optional query parameters
    const response = await apiClient.get<ProducerApiResponse>(endpoint, {
      params: validatedParams as Record<string, unknown>,
    })

    return response.data
  } catch (error) {
    // Enhanced error handling with context
    console.error('Failed to fetch producers:', {
      endpoint,
      businessUnitId,
      params: validatedParams,
      error,
    })

    // Re-throw with additional context for upstream error handling
    throw new Error(
      `Failed to fetch producers for business unit "${businessUnitId}": ${error instanceof Error ? error.message : 'Unknown error'}`
    )
  }
}

/**
 * React Query hook for fetching producers with optional parameters
 * Includes proper caching, error handling, and loading states
 */
export const useProducersQuery = (
  businessUnitId: string,
  params?: ProducersQueryParams
) => {
  return useQuery({
    queryKey: createProducersQueryKey(businessUnitId, params),
    queryFn: () => fetchProducers(businessUnitId, params),
    enabled: !!businessUnitId, // Only run query if businessUnitId is provided
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
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
