'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { useState, useEffect } from 'react'
import { useToken } from '@/features/common/hooks/useToken'
import { useTokenStore } from '@/features/common/stores/useTokenStore'
import type { AuthError } from '@/features/common/types'
import { AxiosError } from 'axios'

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000, // 1 minute
            gcTime: 5 * 60 * 1000, // 5 minutes
            retry: (failureCount, error: Error | AuthError | AxiosError) => {
              // Don't retry on authentication errors (custom AuthError format)
              if ('type' in error && error.type === 'AUTH_FAILED') {
                return false
              }
              // Don't retry on 401 status (generic status check)
              if ('status' in error && error.status === 401) {
                return false
              }
              // Don't retry on axios 401 errors
              if (error instanceof Error && 'response' in error) {
                const axiosError = error as AxiosError
                if (axiosError.response?.status === 401) {
                  return false
                }
              }
              // Default retry logic for other errors
              return failureCount < 2
            },
            refetchOnWindowFocus: false,
          },
          mutations: {
            retry: (failureCount, error: Error | AuthError | AxiosError) => {
              // Don't retry mutations on authentication errors (custom AuthError format)
              if ('type' in error && error.type === 'AUTH_FAILED') {
                return false
              }
              // Don't retry on 401 status (generic status check)
              if ('status' in error && error.status === 401) {
                return false
              }
              // Don't retry on axios 401 errors
              if (error instanceof Error && 'response' in error) {
                const axiosError = error as AxiosError
                if (axiosError.response?.status === 401) {
                  return false
                }
              }
              // Default retry logic for other errors
              return failureCount < 1
            },
          },
        },
      })
  )

  return (
    <QueryClientProvider client={queryClient}>
      <TokenInitializer />
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

/**
 * Component to initialize token management when the app starts
 * This ensures tokens are loaded from storage and auto-refresh is set up
 */
function TokenInitializer() {
  // Using useToken automatically initializes the token management
  const { tokenState } = useToken()
  const { clearError } = useTokenStore()

  useEffect(() => {
    // Clear token errors after 5 seconds to prevent stale error states
    if (tokenState.error) {
      const timer = setTimeout(() => {
        clearError()
      }, 5000)

      return () => clearTimeout(timer)
    }
  }, [tokenState.error, clearError])

  // This component doesn't render anything, it just handles initialization
  return null
}
