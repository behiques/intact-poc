import { useFinancialCloseDatesQuery } from '../api/fetchFinancialCloseDate'

export const useFinancialCloseDates = () => {
  const { data, isLoading, error, refetch } = useFinancialCloseDatesQuery()

  return {
    items: data?.data,
    isLoading,
    error,
    refetch,
  }
}
