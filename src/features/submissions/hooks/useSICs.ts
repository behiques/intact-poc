import { useSICsQuery } from '../api/fetchSICs'
import { SIC } from '../types'

export const useSICs = () => {
  const { data, isLoading, error, refetch } = useSICsQuery()

  return {
    items: data?.data as SIC[],
    isLoading,
    error,
    refetch,
  }
}
