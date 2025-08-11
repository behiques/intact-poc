import { useProducersQuery } from '../api/fetchProducers'
import { ProducersQueryParams } from '../types'

/**
 * Custom hook for fetching producers with optional query parameters
 * Provides a simplified interface for components to access producers data
 *
 * @param businessUnitId - Required business unit ID for the API path parameter
 * @param params - Optional query parameters for filtering and customizing the response
 * @returns Object containing producers data, loading state, error state, and refetch function
 *
 * @example
 * // Fetch all active producers for a business unit (default behavior)
 * const { items, isLoading, error } = useProducers('D')
 *
 * @example
 * // Fetch producers filtered by territory
 * const { items, isLoading, error } = useProducers('D', { TerritoryId: '001' })
 *
 * @example
 * // Fetch all producers including inactive ones with specific fields
 * const { items, isLoading, error } = useProducers('D', {
 *   ReturnAll: true,
 *   Fields: 'producerCode,name,isActive'
 * })
 *
 * @example
 * // Fetch producers with all optional parameters
 * const { items, isLoading, error } = useProducers('D', {
 *   TerritoryId: '001',
 *   Fields: 'producerCode,name,territoryName',
 *   ReturnAll: true
 * })
 */
export const useProducers = (
  businessUnitId: string,
  params?: ProducersQueryParams
) => {
  const { data, isLoading, error, refetch, isError, isPending, isSuccess } =
    useProducersQuery(businessUnitId, params)

  return {
    /** Array of producers matching the query parameters */
    items: data?.data || [],
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
