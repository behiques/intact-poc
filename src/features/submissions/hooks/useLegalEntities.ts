import { useLegalEntitiesQuery } from '../api/fetchLegalEntities'
import { LegalEntity } from '../types'

export const useLegalEntities = () => {
  const { data, isLoading, error, refetch } = useLegalEntitiesQuery()

  return {
    items: data?.data as LegalEntity[],
    isLoading,
    error,
    refetch,
  }
}
