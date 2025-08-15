import { useQuery } from '@tanstack/react-query'
import {
  CustomersApiResponse,
  CustomersQueryParams,
  CustomersQueryParamsSchema,
} from '../types/customer'
import { apiClient } from '@/lib/api'

/**
 * Constructs the customers endpoint URL based on environment and BusinessUniId
 */
const getCustomersEndpoint = (): string => {
  // Use the new backend endpoint structure with BusinessUniId path parameter
  return `/common-api/api/v1/common/customers`
}

/**
 * Validates and sanitizes query parameters
 */
const validateQueryParams = (
  params?: CustomersQueryParams
): CustomersQueryParams | undefined => {
  if (!params) return undefined

  try {
    return CustomersQueryParamsSchema.parse(params)
  } catch (error) {
    console.warn('Invalid Customers query parameters:', error)
    return undefined
  }
}

/**
 * Creates a query key for React Query caching based on BusinessUniId and parameters
 */
export const createCustomersQueryKey = (
  params?: CustomersQueryParams
): string[] => {
  const baseKey = 'fetchCustomers'

  // Always include BusinessUnitId as it's required
  const keyParts = [baseKey, 'BusinessUnitId', params?.BusinessUnitId || '']

  if (!params) {
    return keyParts
  }
  // Create a deterministic key based on parameters
  if (params?.BusinessUnitId !== undefined) {
    keyParts.push('BusinessUnitId', params.BusinessUnitId.toString())
  }

  if (params?.CustomerName !== undefined) {
    keyParts.push('CustomerName', params.CustomerName.toString())
  }

  if (params?.Fields) {
    keyParts.push('fields', params.Fields)
  }

  return keyParts
}

/**
 * Fetches Customers from the API with BusinessUniId and optional query parameters
 * Enhanced to support BusinessUniId and Fields parameters
 */
export const fetchCustomers = async (
  params?: CustomersQueryParams
): Promise<CustomersApiResponse> => {
  // Validate required BusinessUnitId parameter
  if (
    !params?.BusinessUnitId ||
    typeof params.BusinessUnitId !== 'string' ||
    params.BusinessUnitId.trim() === ''
  ) {
    // Return empty array for invalid BusinessUnitId as per PRD requirement
    console.warn('Invalid BusinessUnitId provided:', params?.BusinessUnitId)
    return { data: [] }
  }

  // Validate optional query parameters
  const validatedParams = validateQueryParams(params)

  // Get the appropriate endpoint
  const endpoint = getCustomersEndpoint()

  try {
    // Make the API request with optional query parameters
    const response = await apiClient.get<CustomersApiResponse>(endpoint, {
      params: validatedParams as Record<string, unknown>,
    })

    // Return the data structure as expected by React Query and components
    return response.data
  } catch (error) {
    // Enhanced error handling with context
    console.error('Failed to fetch Customers:', {
      endpoint,
      params: validatedParams,
      error,
    })

    // Return empty array for 404 (BusinessUniId not found) as per PRD requirement
    if (
      error instanceof Error &&
      ((error as Error & { status?: number }).status === 404 ||
        error.message.includes('not found'))
    ) {
      console.warn(
        `BusinessUnitId "${params?.BusinessUnitId}" not found, returning empty results`
      )
      return { data: [] }
    }

    // Re-throw with additional context for upstream error handling
    throw new Error(
      `Failed to fetch Customers: ${error instanceof Error ? error.message : 'Unknown error'}`
    )
  }
}

/**
 * React Query hook for fetching Customers with BusinessUniId and optional parameters
 * Includes proper caching, error handling, and loading states
 */
export const useCustomersQuery = (params?: CustomersQueryParams) => {
  return useQuery({
    queryKey: createCustomersQueryKey(params),
    queryFn: () => fetchCustomers(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    // Only enable the query if BusinessUnitId is provided
    enabled: !!params?.BusinessUnitId && !!params?.CustomerName,
    // Retry on failure with exponential backoff
    retry: (failureCount, error) => {
      // Don't retry on validation errors (4xx status codes)
      if (
        error instanceof Error &&
        (error.message.includes('400') || error.message.includes('404'))
      ) {
        return false
      }
      // Retry up to 3 times for other errors
      return failureCount < 3
    },
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  })
}
