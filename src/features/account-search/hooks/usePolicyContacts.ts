import { usePolicyContactsQuery } from '../api/fetchPolicyContacts'

export const usePolicyContacts = (producerCode: string) => {
  const { data, isLoading, error, refetch } =
    usePolicyContactsQuery(producerCode)

  return {
    items: data?.data,
    isLoading,
    error,
    refetch,
  }
}
