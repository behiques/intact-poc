import { useNAICsBySICQuery, useNAICsQuery } from '../api/fetchNAICs'
import { NAIC } from '../types'

export const useNAICs = () => {
  const { data, isLoading, error, refetch } = useNAICsQuery()

  return {
    items: data?.data as NAIC[],
    isLoading,
    error,
    refetch,
  }
}

export const useNAICsBySIC = (sicCode: string) => {
  const { data, isLoading, error, refetch } = useNAICsBySICQuery(sicCode)

  return {
    items: data?.data as NAIC[],
    isLoading,
    error,
    refetch,
  }
}
