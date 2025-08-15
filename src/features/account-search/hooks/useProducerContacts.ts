import { useProducerContactsQuery } from '../api/fetchProducerContacts'
import { ContactsQueryParams } from '../types'

/**
 * Custom hook for fetching contacts with producerCode and optional query parameters
 * Provides a simplified interface for components to access contacts data
 *
 * @param producerCode - Required producer code for fetching contacts
 * @param params - Optional query parameters for filtering and customizing the response
 * @returns Object containing contacts data, loading state, error state, and refetch function
 *
 * @example
 * // Fetch all contacts for a producer
 * const { items, isLoading, error } = useContacts('2092049')
 *
 * @example
 * // Fetch a specific contact by ID
 * const { items, isLoading, error } = useContacts('2092049', { ProducerContactId: 123456 })
 *
 * @example
 * // Fetch contacts with specific fields only
 * const { items, isLoading, error } = useContacts('2092049', {
 *   Fields: 'lastName,email'
 * })
 *
 * @example
 * // Fetch specific contact with limited fields
 * const { items, isLoading, error } = useContacts('2092049', {
 *   ProducerContactId: 123456,
 *   Fields: 'firstName,lastName,email'
 * })
 */
export const useContacts = (
  producerCode: string,
  params?: ContactsQueryParams
) => {
  const { data, isLoading, error, refetch, isError, isPending, isSuccess } =
    useProducerContactsQuery(producerCode, params)

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
