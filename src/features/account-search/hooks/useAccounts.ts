import { useAccountSearchQuery } from '../api/fetchAccounts'
import { AccountSearchFormData } from '../types'

export const useAccountSearch = (searchParams: AccountSearchFormData) => {
  const { data, isLoading, error, refetch } =
    useAccountSearchQuery(searchParams)

  return {
    items: data?.data,
    isLoading,
    error,
    refetch,
  }
}
