import { useBusinessUnitsQuery } from '../api/fetchBusinessUnits'

export const useBusinessUnits = () => {
  const { data, isLoading, error, refetch } = useBusinessUnitsQuery()

  return {
    items: data?.data,
    isLoading,
    error,
    refetch,
  }
}
