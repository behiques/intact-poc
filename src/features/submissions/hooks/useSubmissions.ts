import { useSubmissionsQuery } from '../api/fetchSubmissions'

export const useSubmissions = (query: 'inbox' | 'worklist') => {
  const { data, isLoading, error, refetch } = useSubmissionsQuery(query)

  return {
    items: data?.data,
    isLoading,
    error,
    refetch,
  }
}
