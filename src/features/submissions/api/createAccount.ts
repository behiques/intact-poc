import { useMutation } from '@tanstack/react-query'
import { apiClient } from '@/lib/api'

import { CreateAccountApiResponse, CreateAccountPayload } from '../types'

const createAccount = async (
  accountData: CreateAccountPayload
): Promise<CreateAccountApiResponse> => {
  const response = await apiClient.post<CreateAccountApiResponse>(
    `/accounts`,
    accountData
  )

  return response.data
}

export const useCreateAccount = () => {
  return useMutation(createAccount)
}
