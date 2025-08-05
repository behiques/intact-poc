/**
 * Account Search API Implementation - Task 2.0 Complete
 *
 * This file implements the new fetchAccounts API function following the bulletproof-react pattern.
 * It provides comprehensive parameter validation, error handling, and React Query integration
 * for the new /samapi/api/clearance/v2/search endpoint.
 *
 * Key Features:
 * - Parameter validation with Zod schemas
 * - Deterministic query key generation for React Query caching
 * - Enhanced error handling with detailed logging
 * - Retry logic with exponential backoff
 * - Parameter sanitization (trim whitespace, remove empty strings)
 * - JSDoc documentation for all functions
 *
 * Implementation follows patterns established in fetchBusinessUnits.ts for consistency.
 */

import { useQuery } from '@tanstack/react-query'
import {
  AccountSearchApiResponse,
  AccountSearchQueryParams,
  AccountSearchQueryParamsSchema,
} from '../types'
import { apiClient } from '@/lib/api'

/**
 * Constructs the accounts search endpoint URL for the new clearance API
 * @returns The endpoint URL for account search
 */
const getAccountsEndpoint = (): string => {
  // Use the new backend clearance search endpoint structure
  return '/samapi/api/clearance/v2/search'
}

/**
 * Validates and sanitizes query parameters using Zod schema
 * Implements parameter sanitization (trim whitespace, remove empty strings)
 * @param params - The query parameters to validate
 * @returns Validated and sanitized parameters, or undefined if validation fails
 */
const validateQueryParams = (
  params?: AccountSearchQueryParams
): AccountSearchQueryParams | undefined => {
  if (!params) return undefined

  try {
    // First sanitize the raw input: trim whitespace and remove empty optional parameters
    const sanitizedParams: Record<string, unknown> = {}

    Object.entries(params).forEach(([key, value]) => {
      if (typeof value === 'string') {
        const trimmedValue = value.trim()
        // Keep AccountName even if empty (let Zod validation handle it)
        // Remove other parameters if they're empty after trimming
        if (key === 'AccountName' || trimmedValue.length > 0) {
          sanitizedParams[key] = trimmedValue
        }
      } else {
        sanitizedParams[key] = value
      }
    })

    // Validate the sanitized parameters with Zod schema
    return AccountSearchQueryParamsSchema.parse(sanitizedParams)
  } catch (error) {
    console.warn('Invalid account search query parameters:', error)
    return undefined
  }
}

/**
 * Creates a deterministic query key for React Query caching based on all provided parameters
 * Ensures consistent caching behavior across different parameter combinations
 * @param params - The account search query parameters
 * @returns Array of strings representing the cache key
 */
export const createAccountsQueryKey = (
  params?: AccountSearchQueryParams
): string[] => {
  const baseKey = 'fetchAccounts'

  if (!params) {
    return [baseKey]
  }

  // Create a deterministic key based on parameters
  const keyParts = [baseKey]

  // Always include AccountName first as it's required
  if (params.AccountName) {
    keyParts.push('accountName', params.AccountName)
  }

  // Add optional parameters in consistent order
  if (params.BusinessUnitId) {
    keyParts.push('businessUnitId', params.BusinessUnitId)
  }

  if (params.City) {
    keyParts.push('city', params.City)
  }

  if (params.EffectiveDate) {
    keyParts.push('effectiveDate', params.EffectiveDate)
  }

  if (params.ExpirationDate) {
    keyParts.push('expirationDate', params.ExpirationDate)
  }

  if (params.State) {
    keyParts.push('state', params.State)
  }

  if (params.Street) {
    keyParts.push('street', params.Street)
  }

  if (params.Zip) {
    keyParts.push('zip', params.Zip)
  }

  return keyParts
}

/**
 * Fetches account search results from the new clearance API endpoint
 * Enhanced to support comprehensive parameter validation, error handling, and logging
 * @param params - The account search query parameters
 * @returns Promise resolving to account search results
 */
export const fetchAccounts = async (
  params?: AccountSearchQueryParams
): Promise<AccountSearchApiResponse> => {
  // Validate parameters before making the request
  const validatedParams = validateQueryParams(params)

  // Get the appropriate endpoint
  const endpoint = getAccountsEndpoint()

  try {
    // Make the API request with validated query parameters
    const response = await apiClient.get<AccountSearchApiResponse>(endpoint, {
      params: validatedParams
        ? (validatedParams as unknown as Record<string, unknown>)
        : undefined,
    })

    return response.data
  } catch (error) {
    // Enhanced error handling with context
    console.error('Failed to fetch accounts:', {
      endpoint,
      params: validatedParams,
      error,
    })

    // Re-throw with additional context for upstream error handling
    throw new Error(
      `Failed to fetch accounts: ${error instanceof Error ? error.message : 'Unknown error'}`
    )
  }
}

/**
 * React Query hook for fetching account search results with proper caching and error handling
 * Includes AccountName requirement check, retry logic with exponential backoff, and deterministic caching
 * @param params - The account search query parameters
 * @returns React Query result with account search data
 */
export const useAccountSearchQuery = (params?: AccountSearchQueryParams) => {
  return useQuery({
    queryKey: createAccountsQueryKey(params),
    queryFn: () => fetchAccounts(params),
    // Only execute query if AccountName is provided (required parameter)
    enabled: !!params?.AccountName,
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
