import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import {
  decodeJWTPayload,
  getTokenExpiration,
  isTokenExpired,
} from './tokenDecoder'

describe('tokenDecoder', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    // Reset current time for consistent testing
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2024-01-01T12:00:00Z'))
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  describe('decodeJWTPayload', () => {
    it('should decode a valid JWT token', () => {
      // Create a token with payload: { sub: "1234567890", name: "John Doe", exp: 1735718400 }
      // exp: 1735718400 = 2025-01-01T12:00:00Z (1 year from our fake current time)
      const payload = {
        sub: '1234567890',
        name: 'John Doe',
        exp: 1735718400, // January 1, 2025
      }
      const encodedPayload = btoa(JSON.stringify(payload))
      const token = `header.${encodedPayload}.signature`

      const result = decodeJWTPayload(token)

      expect(result).toEqual(payload)
    })

    it('should throw error for invalid token format', () => {
      const invalidToken = 'invalid.token'

      expect(() => decodeJWTPayload(invalidToken)).toThrow(
        'Invalid token format'
      )
    })

    it('should throw error for malformed JWT', () => {
      const malformedToken = 'header.invalid-base64.signature'

      expect(() => decodeJWTPayload(malformedToken)).toThrow(
        'Failed to decode token'
      )
    })

    it('should throw error for empty token', () => {
      expect(() => decodeJWTPayload('')).toThrow('Invalid token format')
    })

    it('should throw error for null token', () => {
      expect(() => decodeJWTPayload(null as unknown as string)).toThrow(
        'Invalid token format'
      )
    })

    it('should throw error for undefined token', () => {
      expect(() => decodeJWTPayload(undefined as unknown as string)).toThrow(
        'Invalid token format'
      )
    })

    it('should handle token with special characters in payload', () => {
      const payload = {
        sub: '1234567890',
        name: 'José María',
        email: 'test@example.com',
        exp: 1735718400,
      }
      const encodedPayload = btoa(JSON.stringify(payload))
      const token = `header.${encodedPayload}.signature`

      const result = decodeJWTPayload(token)

      expect(result).toEqual(payload)
    })
  })

  describe('getTokenExpiration', () => {
    it('should extract expiration time from token', () => {
      const expTime = 1735718400 // 2025-01-01T12:00:00Z in seconds
      const payload = {
        sub: '1234567890',
        exp: expTime,
      }
      const encodedPayload = btoa(JSON.stringify(payload))
      const token = `header.${encodedPayload}.signature`

      const result = getTokenExpiration(token)

      expect(result).toBe(expTime * 1000) // Function returns milliseconds
    })

    it('should return null for token without exp claim', () => {
      const payload = {
        sub: '1234567890',
        name: 'John Doe',
      }
      const encodedPayload = btoa(JSON.stringify(payload))
      const token = `header.${encodedPayload}.signature`

      const result = getTokenExpiration(token)

      expect(result).toBeNull()
    })

    it('should handle invalid token gracefully', () => {
      const invalidToken = 'invalid.token'

      expect(() => getTokenExpiration(invalidToken)).toThrow(
        'Invalid token format'
      )
    })

    it('should handle numeric exp as string', () => {
      const payload = {
        sub: '1234567890',
        exp: '1735718400', // String instead of number
      }
      const encodedPayload = btoa(JSON.stringify(payload))
      const token = `header.${encodedPayload}.signature`

      const result = getTokenExpiration(token)

      expect(result).toBeNull() // Function only accepts numbers for exp
    })
  })

  describe('isTokenExpired', () => {
    it('should return false for valid unexpired token', () => {
      const futureTime = 1735718400 // 2025-01-01T12:00:00Z (1 year from fake current time)
      const payload = {
        sub: '1234567890',
        exp: futureTime,
      }
      const encodedPayload = btoa(JSON.stringify(payload))
      const token = `header.${encodedPayload}.signature`

      const result = isTokenExpired(token)

      expect(result).toBe(false)
    })

    it('should return true for expired token', () => {
      const pastTime = 1672531200 // 2023-01-01T00:00:00Z (1 year before fake current time)
      const payload = {
        sub: '1234567890',
        exp: pastTime,
      }
      const encodedPayload = btoa(JSON.stringify(payload))
      const token = `header.${encodedPayload}.signature`

      const result = isTokenExpired(token)

      expect(result).toBe(true)
    })

    it('should return false for token without expiration', () => {
      const payload = {
        sub: '1234567890',
        name: 'John Doe',
      }
      const encodedPayload = btoa(JSON.stringify(payload))
      const token = `header.${encodedPayload}.signature`

      const result = isTokenExpired(token)

      expect(result).toBe(false)
    })

    it('should handle invalid token format', () => {
      const invalidToken = 'invalid.token'

      expect(() => isTokenExpired(invalidToken)).toThrow('Invalid token format')
    })

    it('should return true for token expiring exactly now', () => {
      const currentTime = Math.floor(Date.now() / 1000) // Current fake time: 1704110400
      const payload = {
        sub: '1234567890',
        exp: currentTime,
      }
      const encodedPayload = btoa(JSON.stringify(payload))
      const token = `header.${encodedPayload}.signature`

      const result = isTokenExpired(token)

      expect(result).toBe(true)
    })

    it('should consider buffer time for expiration check', () => {
      // Token expires in 30 seconds
      const soonToExpire = Math.floor(Date.now() / 1000) + 30
      const payload = {
        sub: '1234567890',
        exp: soonToExpire,
      }
      const encodedPayload = btoa(JSON.stringify(payload))
      const token = `header.${encodedPayload}.signature`

      // Without buffer (default behavior)
      const result = isTokenExpired(token)
      expect(result).toBe(false)

      // With 1 minute buffer (60000 ms)
      const resultWithBuffer = isTokenExpired(token, 60000)
      expect(resultWithBuffer).toBe(true)
    })
  })
})
