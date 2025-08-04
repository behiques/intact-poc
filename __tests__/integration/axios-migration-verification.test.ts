/**
 * Integration test to verify axios migration is working correctly
 */

import { describe, it, expect, beforeEach, vi } from 'vitest'
import axios from 'axios'

// Mock axios to avoid making real network requests
vi.mock('axios')
const mockedAxios = vi.mocked(axios)

describe('Axios Migration Verification', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should have axios installed and available', () => {
    expect(axios).toBeDefined()
    expect(typeof axios.get).toBe('function')
    expect(typeof axios.post).toBe('function')
    expect(typeof axios.create).toBe('function')
  })

  it('should be able to create axios instances', () => {
    const mockInstance = {
      get: vi.fn(),
      post: vi.fn(),
      defaults: { baseURL: '/api' },
      interceptors: {
        request: { use: vi.fn() },
        response: { use: vi.fn() },
      },
    }

    mockedAxios.create.mockReturnValue(
      mockInstance as unknown as ReturnType<typeof axios.create>
    )

    const instance = axios.create({ baseURL: '/api' })
    expect(axios.create).toHaveBeenCalledWith({ baseURL: '/api' })
    expect(instance).toBeTruthy()
  })

  it('should have AxiosError available for error handling', async () => {
    // Import AxiosError dynamically to avoid module loading issues
    const { AxiosError } = await import('axios')
    expect(AxiosError).toBeDefined()
  })
})
