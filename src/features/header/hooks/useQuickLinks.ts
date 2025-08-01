import { useQuickLinksQuery } from '../api/fetchQuickLinks'

export const useQuickLinks = () => {
  const { data, isLoading, error, refetch } = useQuickLinksQuery()

  return {
    items: data?.data,
    isLoading,
    error,
    refetch,
  }
}
