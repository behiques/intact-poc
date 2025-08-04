import type { TokenProvider } from '@/lib/api/types'

/**
 * Mock Token Provider for development
 * Provides a consistent mock token without requiring actual authentication
 */
export class MockTokenProvider implements TokenProvider {
  private mockToken: string
  private tokenCounter: number = 0

  constructor() {
    this.mockToken = this.generateMockToken()
  }

  /**
   * Generates a mock JWT-like token
   */
  private generateMockToken(): string {
    const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }))
    const payload = btoa(
      JSON.stringify({
        sub: 'mock-user-123',
        name: 'Mock User',
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000) + 3600, // 1 hour
        jti: `mock-token-${++this.tokenCounter}`,
      })
    )
    const signature = btoa('mock-signature')

    return `${header}.${payload}.${signature}`
  }

  /**
   * Returns the mock token
   */
  async getToken(): Promise<string> {
    // Simulate async behavior
    await new Promise((resolve) => setTimeout(resolve, 10))
    return this.mockToken
  }

  /**
   * Always returns true for mock tokens
   */
  isValid(): boolean {
    return true
  }

  /**
   * Generates a new mock token
   */
  async refresh(): Promise<string> {
    // Simulate refresh delay
    await new Promise((resolve) => setTimeout(resolve, 100))
    this.mockToken = this.generateMockToken()
    return this.mockToken
  }
}

/**
 * Singleton instance for use across the application
 */
export const mockTokenProvider = new MockTokenProvider()
