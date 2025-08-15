import { useCustomersQuery } from '../api/fetchCustomers'
import { CustomersQueryParams } from '../types/customer'

/**
 * Custom hook for fetching customers with BusinessUnitId and optional query parameters
 * Provides a simplified interface for components to access customers data
 *
 * @param params - Optional query parameters for filtering and customizing the response
 * @returns Object containing customers data, loading state, error state, and refetch function
 *
 * @example
 * // Fetch all customers for a BusinessUnitId
 * const { items, isLoading, error } = useCustomers('I')
 *
 * @example
 * // Fetch a specific customer by CustomerName
 * const { items, isLoading, error } = useCustomers({ BusinessUnitId: 'I', CustomerName: "Chris" })
 *
 * @example
 * // Fetch customers with specific fields only
 * const { items, isLoading, error } = useCustomers({ BusinessUnitId: 'I', Fields: 'customerName1,addressDescription' })
 *
 * @example
 * // Fetch specific customer with limited fields
 * const { items, isLoading, error } = useCustomers({ BusinessUnitId: 'I', CustomerName: "John",
 *   Fields: 'customerName1,addressDescription'
 * })
 */
export const useCustomers = (params?: CustomersQueryParams) => {
  const { data, isLoading, error, refetch, isError, isPending, isSuccess } =
    useCustomersQuery(params)

  return {
    /** Array of contacts matching the query parameters */
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
