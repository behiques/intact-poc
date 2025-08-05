import { useAccountSearchQuery } from '../api/fetchAccounts'
import { AccountSearchFormData, AccountSearchQueryParams } from '../types'

/**
 * Converts form data to API query parameters
 * Maps camelCase form fields to PascalCase API fields
 */
const mapFormDataToQueryParams = (
  formData: AccountSearchFormData
): AccountSearchQueryParams => {
  return {
    AccountName: formData.accountName,
    BusinessUnitId: formData.businessUnitId,
    City: formData.city,
    EffectiveDate: formData.effectiveDate,
    ExpirationDate: formData.expirationDate,
    State: formData.state,
    Street: formData.street,
    Zip: formData.zip,
  }
}

export const useAccountSearch = (searchParams: AccountSearchFormData) => {
  // Convert form data to API parameters
  const apiParams = mapFormDataToQueryParams(searchParams)

  const { data, isLoading, error, refetch } = useAccountSearchQuery(apiParams)

  return {
    items: data?.data,
    isLoading,
    error,
    refetch,
  }
}
