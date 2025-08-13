import { useQuery } from '@tanstack/react-query'
import {
  SubmissionApiResponse,
  SubmissionsQueryParams,
  SubmissionsQueryParamsSchema,
} from '../types'
import { apiClient } from '@/lib/api'

// Enhanced error interface for better error handling
interface EnhancedError extends Error {
  originalError?: Error
  errorType?: string
  context?: Record<string, unknown>
}

/**
 * Constructs the submissions endpoint URL based on environment
 */
const getSubmissionsEndpoint = (): string => {
  // Use the new backend endpoint structure
  return '/api/v1/submissions'
}

/**
 * Validates and sanitizes query parameters
 */
const validateQueryParams = (
  params?: SubmissionsQueryParams
): SubmissionsQueryParams | undefined => {
  if (!params) return undefined

  try {
    return SubmissionsQueryParamsSchema.parse(params)
  } catch (error) {
    console.warn('Invalid submissions query parameters:', {
      providedParams: params,
      validationError: error,
      timestamp: new Date().toISOString(),
    })
    return undefined
  }
}

/**
 * Creates a query key for React Query caching based on parameters
 */
export const createSubmissionsQueryKey = (
  params?: SubmissionsQueryParams
): string[] => {
  const baseKey = 'fetchSubmissions'

  if (!params) {
    return [baseKey]
  }

  // Create a deterministic key based on parameters
  const keyParts = [baseKey]

  if (params.AssignedToId) {
    keyParts.push('assignedToId', params.AssignedToId)
  }

  if (params.Fields) {
    keyParts.push('fields', params.Fields)
  }

  if (params.BusinessUnitsId) {
    keyParts.push('businessUnitsId', params.BusinessUnitsId)
  }

  if (params.SubmissionStatuses) {
    keyParts.push('submissionStatuses', params.SubmissionStatuses)
  }

  return keyParts
}

/**
 * Fetches submissions from the API with optional query parameters
 * Enhanced to support AssignedToId, Fields, BusinessUnitsId, and SubmissionStatuses parameters
 */
export const fetchSubmissions = async (
  params?: SubmissionsQueryParams
): Promise<SubmissionApiResponse> => {
  // Validate parameters before making the request
  const validatedParams = validateQueryParams(params)

  // Get the appropriate endpoint
  const endpoint = getSubmissionsEndpoint()

  try {
    // Make the API request with optional query parameters
    const response = await apiClient.get<SubmissionApiResponse>(endpoint, {
      params: validatedParams as Record<string, unknown>,
    })

    return response.data
  } catch (error) {
    // Enhanced error handling with comprehensive context and categorization
    const errorContext = {
      endpoint,
      params: validatedParams,
      timestamp: new Date().toISOString(),
      userAgent:
        typeof navigator !== 'undefined' ? navigator.userAgent : 'server',
    }

    // Categorize error types for better debugging and monitoring
    let errorType = 'UNKNOWN_ERROR'
    let enhancedMessage = 'Unknown error occurred'

    if (error instanceof Error) {
      // Network or timeout errors
      if (
        error.message.includes('timeout') ||
        error.message.includes('ECONNREFUSED')
      ) {
        errorType = 'NETWORK_ERROR'
        enhancedMessage =
          'Network connection failed or timed out while fetching submissions'
      }
      // Authentication/authorization errors
      else if (error.message.includes('401') || error.message.includes('403')) {
        errorType = 'AUTH_ERROR'
        enhancedMessage =
          'Authentication failed or insufficient permissions to access submissions'
      }
      // Validation/client errors
      else if (error.message.includes('400') || error.message.includes('422')) {
        errorType = 'VALIDATION_ERROR'
        enhancedMessage = 'Invalid request parameters for submissions API'
      }
      // Server errors
      else if (
        error.message.includes('500') ||
        error.message.includes('502') ||
        error.message.includes('503')
      ) {
        errorType = 'SERVER_ERROR'
        enhancedMessage =
          'Server error occurred while processing submissions request'
      }
      // Rate limiting
      else if (error.message.includes('429')) {
        errorType = 'RATE_LIMIT_ERROR'
        enhancedMessage =
          'Too many requests - rate limit exceeded for submissions API'
      } else {
        enhancedMessage = error.message
      }
    }

    // Comprehensive error logging for debugging and monitoring
    console.error('Failed to fetch submissions:', {
      ...errorContext,
      errorType,
      originalError: error,
      errorMessage: enhancedMessage,
    })

    // Re-throw with enhanced context for upstream error handling
    const enhancedError: EnhancedError = new Error(
      `Failed to fetch submissions: ${enhancedMessage}`
    )

    // Preserve original error properties for debugging
    if (error instanceof Error) {
      enhancedError.originalError = error
      enhancedError.errorType = errorType
      enhancedError.context = errorContext
    }

    throw enhancedError
  }
}

/**
 * React Query hook for fetching submissions with optional parameters
 * Includes proper caching, error handling, and loading states
 */
export const useSubmissionsQuery = (params?: SubmissionsQueryParams) => {
  return useQuery({
    queryKey: createSubmissionsQueryKey(params),
    queryFn: () => fetchSubmissions(params),
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
 * React Query hook for fetching submissions by assigned user ID
 */
export const useSubmissionsByAssignedUserQuery = (assignedToId: string) => {
  return useSubmissionsQuery({ AssignedToId: assignedToId })
}

/**
 * React Query hook for fetching submissions by business unit ID
 */
export const useSubmissionsByBusinessUnitQuery = (businessUnitsId: string) => {
  return useSubmissionsQuery({ BusinessUnitsId: businessUnitsId })
}

/**
 * React Query hook for fetching submissions with specific fields
 */
export const useSubmissionsWithFieldsQuery = (
  fields: string,
  params?: Omit<SubmissionsQueryParams, 'Fields'>
) => {
  return useSubmissionsQuery({ ...params, Fields: fields })
}

/**
 * React Query hook for fetching submissions by status
 */
export const useSubmissionsByStatusQuery = (
  submissionStatuses: string,
  params?: Omit<SubmissionsQueryParams, 'SubmissionStatuses'>
) => {
  return useSubmissionsQuery({
    ...params,
    SubmissionStatuses: submissionStatuses,
  })
}
