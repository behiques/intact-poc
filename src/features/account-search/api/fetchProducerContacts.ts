import { useQuery } from '@tanstack/react-query'
import {
  ContactApiResponse,
  ContactsQueryParams,
  ContactsQueryParamsSchema,
} from '../types'
import { apiClient } from '@/lib/api'

/**
 * Constructs the contacts endpoint URL based on environment and producer code
 */
const getProducerContactsEndpoint = (producerCode: string): string => {
  // Use the new backend endpoint structure with producerCode path parameter
  return `/api/producers/${producerCode}/contacts`
}

/**
 * Validates and sanitizes query parameters
 */
const validateQueryParams = (
  params?: ContactsQueryParams
): ContactsQueryParams | undefined => {
  if (!params) return undefined

  try {
    return ContactsQueryParamsSchema.parse(params)
  } catch (error) {
    console.warn('Invalid contacts query parameters:', error)
    return undefined
  }
}

/**
 * Creates a query key for React Query caching based on producerCode and parameters
 */
export const createProducerContactsQueryKey = (
  producerCode: string,
  params?: ContactsQueryParams
): string[] => {
  const baseKey = 'fetchContacts'

  // Always include producerCode as it's required
  const keyParts = [baseKey, 'producerCode', producerCode]

  if (!params) {
    return keyParts
  }

  // Create a deterministic key based on parameters
  if (params.ProducerContactId !== undefined) {
    keyParts.push('producerContactId', params.ProducerContactId.toString())
  }

  if (params.Fields) {
    keyParts.push('fields', params.Fields)
  }

  return keyParts
}

/**
 * Fetches contacts from the API with producerCode and optional query parameters
 * Enhanced to support ProducerContactId and Fields parameters
 */
export const fetchProducerContacts = async (
  producerCode: string,
  params?: ContactsQueryParams
): Promise<ContactApiResponse> => {
  // Validate required producerCode parameter
  if (
    !producerCode ||
    typeof producerCode !== 'string' ||
    producerCode.trim() === ''
  ) {
    // Return empty array for invalid producer codes as per PRD requirement
    console.warn('Invalid producer code provided:', producerCode)
    return { data: [] }
  }

  // Validate optional query parameters
  const validatedParams = validateQueryParams(params)

  // Get the appropriate endpoint
  const endpoint = getProducerContactsEndpoint(producerCode.trim())

  try {
    // Make the API request with optional query parameters
    const response = await apiClient.get<ContactApiResponse>(endpoint, {
      params: validatedParams as Record<string, unknown>,
    })

    // Return the data structure as expected by React Query and components
    return response.data
  } catch (error) {
    // Enhanced error handling with context
    console.error('Failed to fetch contacts:', {
      endpoint,
      producerCode,
      params: validatedParams,
      error,
    })

    // Return empty array for 404 (producer not found) as per PRD requirement
    if (
      error instanceof Error &&
      ((error as Error & { status?: number }).status === 404 ||
        error.message.includes('not found'))
    ) {
      console.warn(
        `Producer code "${producerCode}" not found, returning empty results`
      )
      return { data: [] }
    }

    // Re-throw with additional context for upstream error handling
    throw new Error(
      `Failed to fetch contacts: ${error instanceof Error ? error.message : 'Unknown error'}`
    )
  }
}

/**
 * React Query hook for fetching contacts with producerCode and optional parameters
 * Includes proper caching, error handling, and loading states
 */
export const useProducerContactsQuery = (
  producerCode: string,
  params?: ContactsQueryParams
) => {
  return useQuery({
    queryKey: createProducerContactsQueryKey(producerCode, params),
    queryFn: () => fetchProducerContacts(producerCode, params),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    // Only enable the query if producerCode is provided
    enabled:
      !!producerCode &&
      typeof producerCode === 'string' &&
      producerCode.trim() !== '',
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
