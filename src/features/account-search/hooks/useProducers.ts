import { useProducersQuery } from '../api/fetchProducers'

export const useProducers = (businessUnitId: string) => {
  const { data, isLoading, error, refetch } = useProducersQuery(businessUnitId)

  return {
    items: data?.data,
    isLoading,
    error,
    refetch,
  }
}
