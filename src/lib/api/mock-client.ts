import type { ApiClient, ApiRequestOptions, ApiResponse } from './types'
import {
  getMockAccountsForSearch,
  getMockBusinessUnits,
  getMockProducers,
  getMockPolicyContacts,
  getMockFinancialCloseDate,
  getMockQuickLinks,
} from '@/mocks/data'

/**
 * Mock API Client for development and testing
 * Simulates API responses without making actual network requests
 */
export class MockApiClient implements ApiClient {
  private delay: number

  constructor(options: { delay?: number } = {}) {
    this.delay = options.delay ?? 300 // Default 300ms delay to simulate network
  }

  /**
   * Simulates network delay
   */
  private async simulateDelay(): Promise<void> {
    if (this.delay > 0) {
      await new Promise((resolve) => setTimeout(resolve, this.delay))
    }
  }

  /**
   * Main request method that routes to appropriate mock handler
   */
  async request<T = unknown>(
    endpoint: string,
    options: ApiRequestOptions = {}
  ): Promise<ApiResponse<T>> {
    await this.simulateDelay()

    try {
      // Route based on endpoint
      const data = await this.routeRequest<T>(endpoint, options)

      return {
        data,
        status: 200,
        headers: {
          'content-type': 'application/json',
          'x-mock-response': 'true',
        },
        ok: true,
      }
    } catch (error) {
      // Simulate error response
      const message = error instanceof Error ? error.message : 'Mock API Error'
      const status = (error as { status?: number })?.status || 500

      throw {
        type: 'NETWORK_ERROR',
        message,
        statusCode: status,
        timestamp: Date.now(),
      }
    }
  }

  /**
   * Routes requests to appropriate mock handlers
   */
  private async routeRequest<T>(
    endpoint: string,
    options: ApiRequestOptions
  ): Promise<T> {
    const method = options.method?.toUpperCase() || 'GET'
    const params = options.params || {}

    // Account Search endpoints
    if (endpoint === '/accounts' && method === 'GET') {
      return getMockAccountsForSearch(params) as T
    }

    // Business Units endpoints - support both legacy and new backend paths
    if (
      (endpoint === '/businessUnits' ||
        endpoint === '/common-api/api/v1/common/businessunits') &&
      method === 'GET'
    ) {
      return getMockBusinessUnits(params) as T
    }

    if (endpoint === '/producers' && method === 'GET') {
      return getMockProducers() as T
    }

    if (endpoint === '/policyContacts' && method === 'GET') {
      return getMockPolicyContacts() as T
    }

    // Dashboard endpoints
    if (endpoint === '/financialCloseDates' && method === 'GET') {
      return getMockFinancialCloseDate() as T
    }

    // Header endpoints
    if (endpoint === '/quickLinks' && method === 'GET') {
      return getMockQuickLinks() as T
    }

    // Token endpoint (for auth flow testing)
    if (endpoint === '/api/token' && method === 'POST') {
      return {
        token: 'mock-jwt-token-' + Date.now(),
        expiration: new Date(Date.now() + 3600000).toISOString(), // 1 hour
      } as T
    }

    // Default: endpoint not found
    throw {
      status: 404,
      message: `Mock endpoint not found: ${method} ${endpoint}`,
    }
  }

  // Convenience methods matching the interface
  async get<T = unknown>(
    endpoint: string,
    options?: Omit<ApiRequestOptions, 'method' | 'data'>
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...options, method: 'GET' })
  }

  async post<T = unknown>(
    endpoint: string,
    data?: unknown,
    options?: Omit<ApiRequestOptions, 'method' | 'data'>
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...options, method: 'POST', data })
  }

  async put<T = unknown>(
    endpoint: string,
    data?: unknown,
    options?: Omit<ApiRequestOptions, 'method' | 'data'>
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...options, method: 'PUT', data })
  }

  async patch<T = unknown>(
    endpoint: string,
    data?: unknown,
    options?: Omit<ApiRequestOptions, 'method' | 'data'>
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...options, method: 'PATCH', data })
  }

  async delete<T = unknown>(
    endpoint: string,
    options?: Omit<ApiRequestOptions, 'method' | 'data'>
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...options, method: 'DELETE' })
  }
}
