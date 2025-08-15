import type { TokenConfig } from '../types'

/**
 * Token management configuration
 *
 * Provides environment variables for token management
 * with proper TypeScript types.
 */
export const tokenConfig: TokenConfig = {
  authTokenApiUrl: process.env.NEXT_PUBLIC_AUTH_TOKEN_API_URL,
  backendApiUrl: process.env.NEXT_PUBLIC_BACKEND_API_URL,
  userSystemId: process.env.NEXT_PUBLIC_USER_SYSTEM_ID,
}
