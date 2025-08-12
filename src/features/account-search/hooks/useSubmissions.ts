import { useSubmissionsQuery } from '../api/fetchSubmissions'
import { SubmissionsQueryParams } from '../types'

/**
 * Custom hook for fetching submissions with optional query parameters
 * Provides a simplified interface for components to access submissions data
 *
 * @param params - Optional query parameters for filtering and customizing the response
 * @returns Object containing submissions data, loading state, error state, and refetch function
 *
 * @example
 * // Fetch all submissions (default behavior)
 * const { items, isLoading, error } = useSubmissions()
 *
 * @example
 * // Fetch submissions assigned to a specific user
 * const { items, isLoading, error } = useSubmissions({ AssignedToId: 'user123' })
 *
 * @example
 * // Fetch submissions for a specific business unit with specific fields
 * const { items, isLoading, error } = useSubmissions({
 *   BusinessUnitsId: 'E',
 *   Fields: 'submissionId,assignedToName,submissionStatusDescription'
 * })
 *
 * @example
 * // Fetch submissions with specific statuses
 * const { items, isLoading, error } = useSubmissions({
 *   SubmissionStatuses: 'Draft,InProgress'
 * })
 *
 * @example
 * // Complex filtering example
 * const { items, isLoading, error, refetch } = useSubmissions({
 *   AssignedToId: 'user456',
 *   BusinessUnitsId: 'D',
 *   SubmissionStatuses: 'InProgress,UnderReview',
 *   Fields: 'submissionId,comment,brokerTargetDate,submissionStatusDescription'
 * })
 */
export const useSubmissions = (params?: SubmissionsQueryParams) => {
  const { data, isLoading, error, refetch, isError, isPending, isSuccess } =
    useSubmissionsQuery(params)

  return {
    /** Array of submissions matching the query parameters */
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
