import { describe, it, expect, beforeEach, vi } from 'vitest'
import {
  fetchSubmissions,
  createSubmissionsQueryKey,
} from '../../../../src/features/account-search/api/fetchSubmissions'
import {
  SubmissionsQueryParams,
  SubmissionApiResponse,
  Submission,
} from '../../../../src/features/account-search/types'
import type { ApiResponse } from '../../../../src/lib/api/types'

// Mock the API client
vi.mock('../../../../src/lib/api', () => ({
  apiClient: {
    get: vi.fn(),
  },
}))

import { apiClient } from '../../../../src/lib/api'
const mockApiClient = vi.mocked(apiClient)

// Helper function to create mock API responses
const createMockApiResponse = (
  data: Submission[]
): ApiResponse<SubmissionApiResponse> => ({
  data: {
    data: data,
    message: 'Submissions retrieved successfully',
    statusCode: 200,
    timestamp: '2025-08-12T20:48:54.940Z',
    paging: {
      page: 1,
      pageSize: data.length,
      totalPages: 1,
      totalRecords: data.length,
    },
    performance: {
      startTime: '2025-08-12T20:48:54.815Z',
      endTime: '2025-08-12T20:48:54.940Z',
      elapsedTime: '125ms',
    },
  },
  status: 200,
  headers: {},
  ok: true,
})

// Sample submissions data for testing
const sampleSubmissionsData: Submission[] = [
  {
    submissionId: 2001,
    accountId: 1001,
    assignedToId: 'user123',
    assignedToName: 'John Doe',
    businessUnitId: 'E',
    submissionStatusId: 1,
    submissionStatusDescription: 'Draft',
    createdDate: '2025-08-12T10:00:00Z',
    brokerTargetDate: '2025-08-25T16:00:00Z',
    underwriterTargetDate: '2025-08-30T16:00:00Z',
    comment: 'Initial submission for entertainment venue',
    commentsForUnderwriter: 'High-risk venue, requires detailed review',
    underwritingInstructions: 'Focus on safety measures and crowd control',
    isRush: false,
    isSendToRating: true,
    rushReasonCode: 0,
    emailDetails: {
      id: 3001,
      externalId: 'email-ext-001',
      from: 'broker@entertainment.com',
      sourceAddress: 'broker@entertainment.com',
      subject: 'Entertainment Venue Insurance Application',
      receivedDate: '2025-08-12T09:30:00Z',
      source: 'Outlook',
      isImportant: true,
      tags: [
        {
          documentId: 4001,
          name: 'entertainment',
        },
        {
          documentId: 4002,
          name: 'venue',
        },
      ],
    },
  },
]

describe('fetchSubmissions', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Basic Functionality', () => {
    it('should fetch submissions without parameters', async () => {
      const mockResponse = createMockApiResponse(sampleSubmissionsData)
      mockApiClient.get.mockResolvedValue(mockResponse)

      const result = await fetchSubmissions()

      expect(mockApiClient.get).toHaveBeenCalledWith('/api/v1/submissions', {
        params: undefined,
      })
      expect(result).toEqual(mockResponse.data)
    })

    it('should fetch submissions with AssignedToId parameter', async () => {
      const params: SubmissionsQueryParams = { AssignedToId: 'user123' }
      const mockResponse = createMockApiResponse(sampleSubmissionsData)
      mockApiClient.get.mockResolvedValue(mockResponse)

      const result = await fetchSubmissions(params)

      expect(mockApiClient.get).toHaveBeenCalledWith('/api/v1/submissions', {
        params: { AssignedToId: 'user123' },
      })
      expect(result).toEqual(mockResponse.data)
    })

    it('should fetch submissions with BusinessUnitsId parameter', async () => {
      const params: SubmissionsQueryParams = { BusinessUnitsId: 'E' }
      const mockResponse = createMockApiResponse(sampleSubmissionsData)
      mockApiClient.get.mockResolvedValue(mockResponse)

      const result = await fetchSubmissions(params)

      expect(mockApiClient.get).toHaveBeenCalledWith('/api/v1/submissions', {
        params: { BusinessUnitsId: 'E' },
      })
      expect(result).toEqual(mockResponse.data)
    })

    it('should fetch submissions with SubmissionStatuses parameter', async () => {
      const params: SubmissionsQueryParams = {
        SubmissionStatuses: 'Draft,InProgress',
      }
      const mockResponse = createMockApiResponse(sampleSubmissionsData)
      mockApiClient.get.mockResolvedValue(mockResponse)

      const result = await fetchSubmissions(params)

      expect(mockApiClient.get).toHaveBeenCalledWith('/api/v1/submissions', {
        params: { SubmissionStatuses: 'Draft,InProgress' },
      })
      expect(result).toEqual(mockResponse.data)
    })

    it('should fetch submissions with Fields parameter', async () => {
      const params: SubmissionsQueryParams = {
        Fields: 'submissionId,assignedToName',
      }
      const mockResponse = createMockApiResponse(sampleSubmissionsData)
      mockApiClient.get.mockResolvedValue(mockResponse)

      const result = await fetchSubmissions(params)

      expect(mockApiClient.get).toHaveBeenCalledWith('/api/v1/submissions', {
        params: { Fields: 'submissionId,assignedToName' },
      })
      expect(result).toEqual(mockResponse.data)
    })

    it('should fetch submissions with multiple parameters', async () => {
      const params: SubmissionsQueryParams = {
        AssignedToId: 'user456',
        BusinessUnitsId: 'D',
        SubmissionStatuses: 'InProgress,UnderReview',
        Fields: 'submissionId,comment,submissionStatusDescription',
      }
      const mockResponse = createMockApiResponse(sampleSubmissionsData)
      mockApiClient.get.mockResolvedValue(mockResponse)

      const result = await fetchSubmissions(params)

      expect(mockApiClient.get).toHaveBeenCalledWith('/api/v1/submissions', {
        params: {
          AssignedToId: 'user456',
          BusinessUnitsId: 'D',
          SubmissionStatuses: 'InProgress,UnderReview',
          Fields: 'submissionId,comment,submissionStatusDescription',
        },
      })
      expect(result).toEqual(mockResponse.data)
    })
  })

  describe('Parameter Validation', () => {
    it('should handle empty AssignedToId by calling API with undefined params', async () => {
      const params: SubmissionsQueryParams = { AssignedToId: '' }
      const mockResponse = createMockApiResponse(sampleSubmissionsData)
      mockApiClient.get.mockResolvedValue(mockResponse)

      const result = await fetchSubmissions(params)

      expect(mockApiClient.get).toHaveBeenCalledWith('/api/v1/submissions', {
        params: undefined,
      })
      expect(result).toEqual(mockResponse.data)
    })

    it('should handle empty BusinessUnitsId by calling API with undefined params', async () => {
      const params: SubmissionsQueryParams = { BusinessUnitsId: '' }
      const mockResponse = createMockApiResponse(sampleSubmissionsData)
      mockApiClient.get.mockResolvedValue(mockResponse)

      const result = await fetchSubmissions(params)

      expect(mockApiClient.get).toHaveBeenCalledWith('/api/v1/submissions', {
        params: undefined,
      })
      expect(result).toEqual(mockResponse.data)
    })

    it('should handle empty SubmissionStatuses by calling API with undefined params', async () => {
      const params: SubmissionsQueryParams = { SubmissionStatuses: '' }
      const mockResponse = createMockApiResponse(sampleSubmissionsData)
      mockApiClient.get.mockResolvedValue(mockResponse)

      const result = await fetchSubmissions(params)

      expect(mockApiClient.get).toHaveBeenCalledWith('/api/v1/submissions', {
        params: undefined,
      })
      expect(result).toEqual(mockResponse.data)
    })

    it('should handle empty Fields by calling API with undefined params', async () => {
      const params: SubmissionsQueryParams = { Fields: '' }
      const mockResponse = createMockApiResponse(sampleSubmissionsData)
      mockApiClient.get.mockResolvedValue(mockResponse)

      const result = await fetchSubmissions(params)

      expect(mockApiClient.get).toHaveBeenCalledWith('/api/v1/submissions', {
        params: undefined,
      })
      expect(result).toEqual(mockResponse.data)
    })

    it('should handle invalid Fields format by calling API with undefined params', async () => {
      const params: SubmissionsQueryParams = { Fields: 'field1,field2,' }
      const mockResponse = createMockApiResponse(sampleSubmissionsData)
      mockApiClient.get.mockResolvedValue(mockResponse)

      const result = await fetchSubmissions(params)

      expect(mockApiClient.get).toHaveBeenCalledWith('/api/v1/submissions', {
        params: undefined,
      })
      expect(result).toEqual(mockResponse.data)
    })

    it('should handle invalid SubmissionStatuses format by calling API with undefined params', async () => {
      const params: SubmissionsQueryParams = {
        SubmissionStatuses: 'Draft,InProgress,',
      }
      const mockResponse = createMockApiResponse(sampleSubmissionsData)
      mockApiClient.get.mockResolvedValue(mockResponse)

      const result = await fetchSubmissions(params)

      expect(mockApiClient.get).toHaveBeenCalledWith('/api/v1/submissions', {
        params: undefined,
      })
      expect(result).toEqual(mockResponse.data)
    })
  })

  describe('Error Handling', () => {
    it('should handle network errors', async () => {
      const networkError = new Error('Network error')
      mockApiClient.get.mockRejectedValue(networkError)

      await expect(fetchSubmissions()).rejects.toThrow(
        'Failed to fetch submissions: Network error'
      )
    })

    it('should handle authentication errors', async () => {
      const authError = new Error('401 Unauthorized')
      mockApiClient.get.mockRejectedValue(authError)

      await expect(fetchSubmissions()).rejects.toThrow(
        'Failed to fetch submissions: Authentication failed or insufficient permissions to access submissions'
      )

      expect(mockApiClient.get).toHaveBeenCalledWith('/api/v1/submissions', {
        params: undefined,
      })
    })

    it('should handle validation errors', async () => {
      const validationError = new Error('400 Bad Request')
      mockApiClient.get.mockRejectedValue(validationError)

      await expect(fetchSubmissions()).rejects.toThrow(
        'Failed to fetch submissions: Invalid request parameters for submissions API'
      )

      expect(mockApiClient.get).toHaveBeenCalledWith('/api/v1/submissions', {
        params: undefined,
      })
    })

    it('should handle server errors', async () => {
      const serverError = new Error('500 Internal Server Error')
      mockApiClient.get.mockRejectedValue(serverError)

      await expect(fetchSubmissions()).rejects.toThrow(
        'Failed to fetch submissions: Server error occurred while processing submissions request'
      )

      expect(mockApiClient.get).toHaveBeenCalledWith('/api/v1/submissions', {
        params: undefined,
      })
    })

    it('should handle rate limiting errors', async () => {
      const rateLimitError = new Error('429 Too Many Requests')
      mockApiClient.get.mockRejectedValue(rateLimitError)

      await expect(fetchSubmissions()).rejects.toThrow(
        'Failed to fetch submissions: Too many requests - rate limit exceeded for submissions API'
      )

      expect(mockApiClient.get).toHaveBeenCalledWith('/api/v1/submissions', {
        params: undefined,
      })
    })

    it('should handle unknown errors', async () => {
      const unknownError = new Error('Some unknown error')
      mockApiClient.get.mockRejectedValue(unknownError)

      await expect(fetchSubmissions()).rejects.toThrow(
        'Failed to fetch submissions: Some unknown error'
      )

      expect(mockApiClient.get).toHaveBeenCalledWith('/api/v1/submissions', {
        params: undefined,
      })
    })

    it('should handle API errors with parameters', async () => {
      const params: SubmissionsQueryParams = { AssignedToId: 'user123' }
      const serverError = new Error('500 Internal Server Error')
      mockApiClient.get.mockRejectedValue(serverError)

      await expect(fetchSubmissions(params)).rejects.toThrow(
        'Failed to fetch submissions: Server error occurred while processing submissions request'
      )

      expect(mockApiClient.get).toHaveBeenCalledWith('/api/v1/submissions', {
        params: { AssignedToId: 'user123' },
      })
    })
  })

  describe('Query Key Generation', () => {
    it('should generate correct query key without parameters', () => {
      const queryKey = createSubmissionsQueryKey()
      expect(queryKey).toEqual(['fetchSubmissions'])
    })

    it('should generate correct query key with AssignedToId', () => {
      const params: SubmissionsQueryParams = { AssignedToId: 'user123' }
      const queryKey = createSubmissionsQueryKey(params)
      expect(queryKey).toEqual(['fetchSubmissions', 'assignedToId', 'user123'])
    })

    it('should generate correct query key with BusinessUnitsId', () => {
      const params: SubmissionsQueryParams = { BusinessUnitsId: 'E' }
      const queryKey = createSubmissionsQueryKey(params)
      expect(queryKey).toEqual(['fetchSubmissions', 'businessUnitsId', 'E'])
    })

    it('should generate correct query key with SubmissionStatuses', () => {
      const params: SubmissionsQueryParams = {
        SubmissionStatuses: 'Draft,InProgress',
      }
      const queryKey = createSubmissionsQueryKey(params)
      expect(queryKey).toEqual([
        'fetchSubmissions',
        'submissionStatuses',
        'Draft,InProgress',
      ])
    })

    it('should generate correct query key with Fields', () => {
      const params: SubmissionsQueryParams = {
        Fields: 'submissionId,assignedToName',
      }
      const queryKey = createSubmissionsQueryKey(params)
      expect(queryKey).toEqual([
        'fetchSubmissions',
        'fields',
        'submissionId,assignedToName',
      ])
    })

    it('should generate correct query key with multiple parameters', () => {
      const params: SubmissionsQueryParams = {
        AssignedToId: 'user456',
        BusinessUnitsId: 'D',
        SubmissionStatuses: 'InProgress,UnderReview',
        Fields: 'submissionId,comment,submissionStatusDescription',
      }
      const queryKey = createSubmissionsQueryKey(params)
      expect(queryKey).toEqual([
        'fetchSubmissions',
        'assignedToId',
        'user456',
        'fields',
        'submissionId,comment,submissionStatusDescription',
        'businessUnitsId',
        'D',
        'submissionStatuses',
        'InProgress,UnderReview',
      ])
    })

    it('should generate different query keys for different parameters', () => {
      const params1: SubmissionsQueryParams = { AssignedToId: 'user123' }
      const params2: SubmissionsQueryParams = { AssignedToId: 'user456' }

      const queryKey1 = createSubmissionsQueryKey(params1)
      const queryKey2 = createSubmissionsQueryKey(params2)

      expect(queryKey1).not.toEqual(queryKey2)
      expect(queryKey1).toEqual(['fetchSubmissions', 'assignedToId', 'user123'])
      expect(queryKey2).toEqual(['fetchSubmissions', 'assignedToId', 'user456'])
    })
  })
})
