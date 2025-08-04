import { env } from '@/utils/env'
import type { TokenConfig } from '../types'

/**
 * Token management configuration
 *
 * Provides validated environment variables for token management
 * with proper TypeScript types and runtime validation.
 */
export const tokenConfig: TokenConfig = {
  authTokenApiUrl: env.AUTH_TOKEN_API_URL,
  backendApiUrl: env.BACKEND_API_URL,
  userSystemId: env.USER_SYSTEM_ID,
}

/**
 * Validates that all required token management environment variables are available
 * @throws Error if any required environment variables are missing
 */
export const validateTokenConfig = (): void => {
  const missingVars: string[] = []

  if (!tokenConfig.authTokenApiUrl) missingVars.push('AUTH_TOKEN_API_URL')
  if (!tokenConfig.backendApiUrl) missingVars.push('BACKEND_API_URL')
  if (!tokenConfig.userSystemId) missingVars.push('USER_SYSTEM_ID')

  if (missingVars.length > 0) {
    throw new Error(
      `Missing required environment variables for token management: ${missingVars.join(', ')}`
    )
  }
}

// Validate configuration on module load
validateTokenConfig()
