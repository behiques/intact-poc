import type { QueuedRequest, AuthError } from '../types'

/**
 * Token Request Queue Management
 *
 * Manages concurrent requests for tokens during refresh operations.
 * Ensures that multiple simultaneous API calls don't trigger multiple
 * token refresh operations and provides proper queue handling.
 */

// Internal queue state
let requestQueue: QueuedRequest[] = []
let requestIdCounter = 0

/**
 * Generates unique request ID
 */
const generateRequestId = (): string => {
  return `token-request-${++requestIdCounter}-${Date.now()}`
}

/**
 * Adds a request to the token queue
 *
 * @returns Promise that resolves with a valid token or rejects with an error
 */
export const enqueueTokenRequest = (): Promise<string> => {
  return new Promise<string>((resolve, reject) => {
    const request: QueuedRequest = {
      id: generateRequestId(),
      resolve,
      reject,
      queuedAt: Date.now(),
    }

    requestQueue.push(request)
  })
}

/**
 * Resolves all queued requests with a valid token
 *
 * @param token - The valid token to provide to all queued requests
 */
export const resolveQueuedRequests = (token: string): void => {
  const requests = [...requestQueue]
  requestQueue = []

  requests.forEach((request) => {
    try {
      request.resolve(token)
    } catch (error) {
      console.error(`Failed to resolve queued request ${request.id}:`, error)
    }
  })
}

/**
 * Rejects all queued requests with an error
 *
 * @param error - The error to provide to all queued requests
 */
export const rejectQueuedRequests = (error: AuthError): void => {
  const requests = [...requestQueue]
  requestQueue = []

  requests.forEach((request) => {
    try {
      request.reject(error)
    } catch (rejectionError) {
      console.error(
        `Failed to reject queued request ${request.id}:`,
        rejectionError
      )
    }
  })
}

/**
 * Gets the current queue status
 *
 * @returns Object with queue information
 */
export const getQueueStatus = () => {
  return {
    queueLength: requestQueue.length,
    hasQueuedRequests: requestQueue.length > 0,
    oldestRequestAge:
      requestQueue.length > 0
        ? Date.now() - Math.min(...requestQueue.map((r) => r.queuedAt))
        : 0,
  }
}

/**
 * Clears the entire request queue
 * This should only be used in error scenarios or cleanup
 */
export const clearQueue = (): void => {
  const requests = [...requestQueue]
  requestQueue = []

  // Reject any remaining requests with a cancellation error
  const cancellationError: AuthError = {
    type: 'UNKNOWN_ERROR',
    message: 'Token request queue was cleared',
    timestamp: Date.now(),
  }

  requests.forEach((request) => {
    try {
      request.reject(cancellationError)
    } catch (error) {
      console.error(`Failed to reject cleared request ${request.id}:`, error)
    }
  })
}

/**
 * Cleanup function for expired requests
 * Removes requests that have been queued for too long
 *
 * @param maxAgeMs - Maximum age in milliseconds (default: 30 seconds)
 */
export const cleanupExpiredRequests = (maxAgeMs: number = 30 * 1000): void => {
  const now = Date.now()
  const expiredRequests: QueuedRequest[] = []

  requestQueue = requestQueue.filter((request) => {
    const age = now - request.queuedAt
    if (age > maxAgeMs) {
      expiredRequests.push(request)
      return false
    }
    return true
  })

  // Reject expired requests
  const timeoutError: AuthError = {
    type: 'NETWORK_ERROR',
    message: 'Token request timed out in queue',
    timestamp: now,
  }

  expiredRequests.forEach((request) => {
    try {
      request.reject(timeoutError)
    } catch (error) {
      console.error(`Failed to reject expired request ${request.id}:`, error)
    }
  })
}
