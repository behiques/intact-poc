import type { TokenProvider } from '@/lib/api/types'
import { useTokenStore } from '@/features/common/stores/useTokenStore'

/**
 * Real Token Provider that integrates with the existing token store
 * Used in production and when connecting to real backend APIs
 */
export class RealTokenProvider implements TokenProvider {
  /**
   * Gets a valid token from the token store
   * Will automatically refresh if needed
   */
  async getToken(): Promise<string> {
    const tokenStore = useTokenStore.getState()
    return await tokenStore.getValidToken()
  }

  /**
   * Checks if the current token is valid
   */
  isValid(): boolean {
    const tokenStore = useTokenStore.getState()
    return tokenStore.isTokenValid()
  }

  /**
   * Refreshes the token
   */
  async refresh(): Promise<string> {
    const tokenStore = useTokenStore.getState()
    await tokenStore.refreshToken()

    const token = tokenStore.token
    if (!token) {
      throw new Error('Failed to refresh token')
    }

    return token
  }
}

/**
 * Singleton instance for use across the application
 */
export const realTokenProvider = new RealTokenProvider()
