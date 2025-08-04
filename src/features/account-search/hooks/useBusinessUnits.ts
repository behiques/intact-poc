import { useBusinessUnitsQuery } from '../api/fetchBusinessUnits'
import { BusinessUnitsQueryParams } from '../types'

/**
 * Custom hook for fetching business units with optional query parameters
 * Provides a simplified interface for components to access business units data
 *
 * @param params - Optional query parameters for filtering and customizing the response
 * @returns Object containing business units data, loading state, error state, and refetch function
 *
 * @example
 * // Fetch all active business units (default behavior)
 * const { items, isLoading, error } = useBusinessUnits()
 *
 * @example
 * // Fetch a specific business unit
 * const { items, isLoading, error } = useBusinessUnits({ BusinessUnitId: 'E' })
 *
 * @example
 * // Fetch all business units including inactive ones with specific fields
 * const { items, isLoading, error } = useBusinessUnits({
 *   ReturnAll: true,
 *   Fields: 'businessUnitId,name,isActive'
 * })
 */
export const useBusinessUnits = (params?: BusinessUnitsQueryParams) => {
  const { data, isLoading, error, refetch, isError, isPending, isSuccess } =
    useBusinessUnitsQuery(params)

  return {
    /** Array of business units matching the query parameters */
    items: data?.data,
    /** Loading state - true when the query is in progress */
    isLoading,
    /** Error object if the query failed */
    error,
    /** Function to manually refetch the data */
    refetch,
    /** Boolean indicating if the query is in an error state */
    isError,
    /** Boolean indicating if the query is pending (initial loading) */
    isPending,
    /** Boolean indicating if the query completed successfully */
    isSuccess,
    /** The complete response data including metadata (for advanced use cases) */
    response: data,
  }
}
