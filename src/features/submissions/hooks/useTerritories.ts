import { useTerritoriesQuery } from '../api/fetchTerritories'

export const useTerritories = () => {
  const { data, isLoading, error, refetch } = useTerritoriesQuery()

  return {
    items: data?.data,
    isLoading,
    error,
    refetch,
  }
}
