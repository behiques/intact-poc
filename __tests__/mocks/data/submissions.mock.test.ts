import { describe, it, expect } from 'vitest'
import {
  mockSubmissionsData,
  filterSubmissions,
  selectSubmissionFields,
  getMockSubmissions,
} from '../../../src/mocks/data/submissions.mock'
import type { SubmissionsQueryParams } from '../../../src/features/account-search/types'

describe('Submissions Mock Data', () => {
  describe('mockSubmissionsData', () => {
    it('should contain array of submission objects', () => {
      expect(Array.isArray(mockSubmissionsData)).toBe(true)
      expect(mockSubmissionsData.length).toBeGreaterThan(0)
    })

    it('should have submissions with required properties', () => {
      mockSubmissionsData.forEach((submission) => {
        expect(submission).toHaveProperty('submissionId')
        expect(submission).toHaveProperty('accountId')
        expect(submission).toHaveProperty('assignedToId')
        expect(submission).toHaveProperty('assignedToName')
        expect(submission).toHaveProperty('businessUnitId')
        expect(submission).toHaveProperty('submissionStatusId')
        expect(submission).toHaveProperty('submissionStatusDescription')
        expect(submission).toHaveProperty('createdDate')
        expect(submission).toHaveProperty('emailDetails')

        // Verify types
        expect(typeof submission.submissionId).toBe('number')
        expect(typeof submission.accountId).toBe('number')
        expect(typeof submission.assignedToId).toBe('string')
        expect(typeof submission.assignedToName).toBe('string')
        expect(typeof submission.businessUnitId).toBe('string')
        expect(typeof submission.submissionStatusId).toBe('number')
        expect(typeof submission.submissionStatusDescription).toBe('string')
        expect(typeof submission.createdDate).toBe('string')
        expect(typeof submission.emailDetails).toBe('object')
      })
    })

    it('should have submissions with diverse data for testing scenarios', () => {
      // Check for different assigned users
      const assignedUsers = new Set(
        mockSubmissionsData.map((s) => s.assignedToId)
      )
      expect(assignedUsers.size).toBeGreaterThan(1)

      // Check for different business units
      const businessUnits = new Set(
        mockSubmissionsData.map((s) => s.businessUnitId)
      )
      expect(businessUnits.size).toBeGreaterThan(1)

      // Check for different statuses
      const statuses = new Set(
        mockSubmissionsData.map((s) => s.submissionStatusDescription)
      )
      expect(statuses.size).toBeGreaterThan(1)

      // Check for different rush statuses
      const rushStatuses = mockSubmissionsData.map((s) => s.isRush)
      expect(rushStatuses).toContain(true)
      expect(rushStatuses).toContain(false)
    })

    it('should have valid email details for all submissions', () => {
      mockSubmissionsData.forEach((submission) => {
        const { emailDetails } = submission
        expect(emailDetails).toHaveProperty('id')
        expect(emailDetails).toHaveProperty('externalId')
        expect(emailDetails).toHaveProperty('from')
        expect(emailDetails).toHaveProperty('subject')
        expect(emailDetails).toHaveProperty('receivedDate')
        expect(emailDetails).toHaveProperty('source')
        expect(emailDetails).toHaveProperty('isImportant')
        expect(emailDetails).toHaveProperty('tags')

        expect(typeof emailDetails.id).toBe('number')
        expect(typeof emailDetails.externalId).toBe('string')
        expect(typeof emailDetails.from).toBe('string')
        expect(typeof emailDetails.subject).toBe('string')
        expect(typeof emailDetails.receivedDate).toBe('string')
        expect(typeof emailDetails.source).toBe('string')
        expect(typeof emailDetails.isImportant).toBe('boolean')
        expect(Array.isArray(emailDetails.tags)).toBe(true)
      })
    })

    it('should have valid date formats', () => {
      mockSubmissionsData.forEach((submission) => {
        // Check submission dates
        expect(() => new Date(submission.createdDate)).not.toThrow()
        expect(() => new Date(submission.brokerTargetDate)).not.toThrow()
        expect(() => new Date(submission.underwriterTargetDate)).not.toThrow()

        // Check email received date
        expect(
          () => new Date(submission.emailDetails.receivedDate)
        ).not.toThrow()

        // Verify ISO format
        expect(submission.createdDate).toMatch(
          /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/
        )
        expect(submission.emailDetails.receivedDate).toMatch(
          /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/
        )
      })
    })
  })

  describe('filterSubmissions', () => {
    describe('AssignedToId filtering', () => {
      it('should filter by assigned user ID', () => {
        const targetUserId = 'user123'
        const params: SubmissionsQueryParams = { AssignedToId: targetUserId }
        const filtered = filterSubmissions(params)

        expect(filtered.length).toBeGreaterThan(0)
        filtered.forEach((submission) => {
          expect(submission.assignedToId).toBe(targetUserId)
        })
      })

      it('should return empty array for non-existent user ID', () => {
        const params: SubmissionsQueryParams = { AssignedToId: 'nonexistent' }
        const filtered = filterSubmissions(params)
        expect(filtered).toEqual([])
      })

      it('should handle empty user ID by returning all submissions', () => {
        const params: SubmissionsQueryParams = { AssignedToId: '' }
        const filtered = filterSubmissions(params)
        expect(filtered).toEqual(mockSubmissionsData)
      })
    })

    describe('BusinessUnitsId filtering', () => {
      it('should filter by business unit ID', () => {
        const targetBusinessUnit = 'E'
        const params: SubmissionsQueryParams = {
          BusinessUnitsId: targetBusinessUnit,
        }
        const filtered = filterSubmissions(params)

        expect(filtered.length).toBeGreaterThan(0)
        filtered.forEach((submission) => {
          expect(submission.businessUnitId).toBe(targetBusinessUnit)
        })
      })

      it('should return empty array for non-existent business unit', () => {
        const params: SubmissionsQueryParams = {
          BusinessUnitsId: 'NONEXISTENT',
        }
        const filtered = filterSubmissions(params)
        expect(filtered).toEqual([])
      })

      it('should handle multiple business units (comma-separated)', () => {
        const params: SubmissionsQueryParams = { BusinessUnitsId: 'E,D' }
        const filtered = filterSubmissions(params)

        // Note: Current implementation doesn't support comma-separated business units
        // This test documents the current behavior
        expect(filtered).toEqual([])
      })
    })

    describe('SubmissionStatuses filtering', () => {
      it('should filter by single submission status', () => {
        const targetStatus = 'Draft'
        const params: SubmissionsQueryParams = {
          SubmissionStatuses: targetStatus,
        }
        const filtered = filterSubmissions(params)

        expect(filtered.length).toBeGreaterThan(0)
        filtered.forEach((submission) => {
          expect(submission.submissionStatusDescription).toBe(targetStatus)
        })
      })

      it('should filter by multiple submission statuses', () => {
        const statuses = 'Draft,InProgress'
        const params: SubmissionsQueryParams = { SubmissionStatuses: statuses }
        const filtered = filterSubmissions(params)

        filtered.forEach((submission) => {
          expect(['Draft', 'InProgress']).toContain(
            submission.submissionStatusDescription
          )
        })
      })

      it('should return empty array for non-existent status', () => {
        const params: SubmissionsQueryParams = {
          SubmissionStatuses: 'NonExistentStatus',
        }
        const filtered = filterSubmissions(params)
        expect(filtered).toEqual([])
      })

      it('should handle mixed valid and invalid statuses', () => {
        const params: SubmissionsQueryParams = {
          SubmissionStatuses: 'Draft,InvalidStatus',
        }
        const filtered = filterSubmissions(params)

        // Should only return Draft submissions
        filtered.forEach((submission) => {
          expect(submission.submissionStatusDescription).toBe('Draft')
        })
      })
    })

    describe('Combined filtering', () => {
      it('should apply multiple filters simultaneously', () => {
        const params: SubmissionsQueryParams = {
          AssignedToId: 'user123',
          BusinessUnitsId: 'E',
          SubmissionStatuses: 'Draft',
        }
        const filtered = filterSubmissions(params)

        filtered.forEach((submission) => {
          expect(submission.assignedToId).toBe('user123')
          expect(submission.businessUnitId).toBe('E')
          expect(submission.submissionStatusDescription).toBe('Draft')
        })
      })

      it('should return empty array when no submissions match all criteria', () => {
        const params: SubmissionsQueryParams = {
          AssignedToId: 'user123',
          BusinessUnitsId: 'D', // Different business unit than user123's submissions
          SubmissionStatuses: 'Draft',
        }
        const filtered = filterSubmissions(params)
        expect(filtered).toEqual([])
      })

      it('should handle partial matches correctly', () => {
        // Test with a combination that should have some matches
        const userSubmissions = filterSubmissions({ AssignedToId: 'user456' })
        const targetBusinessUnit = userSubmissions[0]?.businessUnitId

        if (targetBusinessUnit) {
          const params: SubmissionsQueryParams = {
            AssignedToId: 'user456',
            BusinessUnitsId: targetBusinessUnit,
          }
          const filtered = filterSubmissions(params)
          expect(filtered.length).toBeGreaterThan(0)
        }
      })
    })

    describe('Edge cases', () => {
      it('should return all submissions when no params provided', () => {
        const filtered = filterSubmissions({})
        expect(filtered).toEqual(mockSubmissionsData)
      })

      it('should handle undefined params', () => {
        const filtered = filterSubmissions(undefined)
        expect(filtered).toEqual(mockSubmissionsData)
      })

      it('should handle null/undefined values in filter parameters', () => {
        const params: SubmissionsQueryParams = {
          AssignedToId: undefined,
          BusinessUnitsId: null as unknown as string,
          SubmissionStatuses: '',
        }
        const filtered = filterSubmissions(params)
        expect(filtered).toEqual(mockSubmissionsData)
      })
    })
  })

  describe('selectSubmissionFields', () => {
    const sampleSubmissions = [mockSubmissionsData[0]]

    it('should return full submissions when no fields specified', () => {
      const result = selectSubmissionFields(sampleSubmissions, undefined)
      expect(result).toEqual(sampleSubmissions)
    })

    it('should return full submissions when empty fields string provided', () => {
      const result = selectSubmissionFields(sampleSubmissions, '')
      expect(result).toEqual(sampleSubmissions)
    })

    it('should select single field correctly', () => {
      const result = selectSubmissionFields(sampleSubmissions, 'submissionId')
      expect(result).toEqual([
        {
          submissionId: sampleSubmissions[0].submissionId,
        },
      ])
    })

    it('should select multiple fields correctly', () => {
      const fields = 'submissionId,assignedToName,submissionStatusDescription'
      const result = selectSubmissionFields(sampleSubmissions, fields)
      expect(result).toEqual([
        {
          submissionId: sampleSubmissions[0].submissionId,
          assignedToName: sampleSubmissions[0].assignedToName,
          submissionStatusDescription:
            sampleSubmissions[0].submissionStatusDescription,
        },
      ])
    })

    it('should handle fields with spaces correctly', () => {
      const fields = 'submissionId, assignedToName, submissionStatusDescription'
      const result = selectSubmissionFields(sampleSubmissions, fields)
      expect(result).toEqual([
        {
          submissionId: sampleSubmissions[0].submissionId,
          assignedToName: sampleSubmissions[0].assignedToName,
          submissionStatusDescription:
            sampleSubmissions[0].submissionStatusDescription,
        },
      ])
    })

    it('should ignore non-existent fields', () => {
      const fields = 'submissionId,nonExistentField,assignedToName'
      const result = selectSubmissionFields(sampleSubmissions, fields)
      expect(result).toEqual([
        {
          submissionId: sampleSubmissions[0].submissionId,
          assignedToName: sampleSubmissions[0].assignedToName,
        },
      ])
    })

    it('should handle nested object fields', () => {
      const fields = 'submissionId,emailDetails'
      const result = selectSubmissionFields(sampleSubmissions, fields)
      expect(result).toEqual([
        {
          submissionId: sampleSubmissions[0].submissionId,
          emailDetails: sampleSubmissions[0].emailDetails,
        },
      ])
    })

    it('should handle all available submission fields', () => {
      const allFields = [
        'submissionId',
        'accountId',
        'assignedToId',
        'assignedToName',
        'businessUnitId',
        'submissionStatusId',
        'submissionStatusDescription',
        'createdDate',
        'brokerTargetDate',
        'underwriterTargetDate',
        'comment',
        'commentsForUnderwriter',
        'underwritingInstructions',
        'isRush',
        'isSendToRating',
        'rushReasonCode',
        'emailDetails',
      ].join(',')

      const result = selectSubmissionFields(sampleSubmissions, allFields)
      // Note: The function always includes submissionId, so result should match original
      expect(result).toEqual(sampleSubmissions)
    })

    it('should handle duplicate field names', () => {
      const fields = 'submissionId,submissionId,assignedToName'
      const result = selectSubmissionFields(sampleSubmissions, fields)
      expect(result).toEqual([
        {
          submissionId: sampleSubmissions[0].submissionId,
          assignedToName: sampleSubmissions[0].assignedToName,
        },
      ])
    })

    it('should return array with empty objects when only non-existent fields provided', () => {
      const fields = 'nonExistent1,nonExistent2'
      const result = selectSubmissionFields(sampleSubmissions, fields)
      // Function always includes submissionId
      expect(result).toEqual([
        {
          submissionId: sampleSubmissions[0].submissionId,
        },
      ])
    })

    it('should handle multiple submissions', () => {
      const multipleSubmissions = mockSubmissionsData.slice(0, 3)
      const fields = 'submissionId,assignedToName'
      const result = selectSubmissionFields(multipleSubmissions, fields)

      expect(result).toHaveLength(3)
      result.forEach((submission, index) => {
        expect(submission).toEqual({
          submissionId: multipleSubmissions[index].submissionId,
          assignedToName: multipleSubmissions[index].assignedToName,
        })
      })
    })
  })

  describe('getMockSubmissions', () => {
    it('should return submissions with default parameters', () => {
      const result = getMockSubmissions()
      expect(result.data).toEqual(mockSubmissionsData)
      expect(result.message).toBe('Submissions retrieved successfully')
      expect(result.statusCode).toBe(200)
      expect(result.paging.totalRecords).toBe(mockSubmissionsData.length)
    })

    it('should apply filtering based on parameters', () => {
      const params: SubmissionsQueryParams = { AssignedToId: 'user123' }
      const result = getMockSubmissions(params)

      const expectedFiltered = filterSubmissions(params)
      expect(result.data).toEqual(expectedFiltered)
      expect(result.paging.totalRecords).toBe(expectedFiltered.length)
    })

    it('should apply field selection', () => {
      const params: SubmissionsQueryParams = {
        Fields: 'submissionId,assignedToName',
      }
      const result = getMockSubmissions(params)

      result.data.forEach((submission) => {
        expect(Object.keys(submission)).toEqual([
          'submissionId',
          'assignedToName',
        ])
      })
    })

    it('should combine filtering and field selection', () => {
      const params: SubmissionsQueryParams = {
        AssignedToId: 'user123',
        Fields: 'submissionId,submissionStatusDescription',
      }
      const result = getMockSubmissions(params)

      const expectedFiltered = filterSubmissions(params)
      expect(result.data.length).toBe(expectedFiltered.length)

      result.data.forEach((submission) => {
        expect(Object.keys(submission)).toEqual([
          'submissionId',
          'submissionStatusDescription',
        ])
      })
    })

    it('should generate correct metadata', () => {
      const result = getMockSubmissions()

      expect(result).toHaveProperty('message')
      expect(result).toHaveProperty('statusCode')
      expect(result).toHaveProperty('timestamp')
      expect(result).toHaveProperty('paging')
      expect(result).toHaveProperty('performance')

      // Check paging structure
      expect(result.paging).toHaveProperty('page')
      expect(result.paging).toHaveProperty('pageSize')
      expect(result.paging).toHaveProperty('totalPages')
      expect(result.paging).toHaveProperty('totalRecords')

      // Check performance structure
      expect(result.performance).toHaveProperty('startTime')
      expect(result.performance).toHaveProperty('endTime')
      expect(result.performance).toHaveProperty('elapsedTime')

      // Verify types
      expect(typeof result.message).toBe('string')
      expect(typeof result.statusCode).toBe('number')
      expect(typeof result.timestamp).toBe('string')
      expect(typeof result.paging.page).toBe('number')
      expect(typeof result.paging.pageSize).toBe('number')
      expect(typeof result.paging.totalPages).toBe('number')
      expect(typeof result.paging.totalRecords).toBe('number')
      expect(typeof result.performance.startTime).toBe('string')
      expect(typeof result.performance.endTime).toBe('string')
      expect(typeof result.performance.elapsedTime).toBe('string')
    })

    it('should handle empty results correctly', () => {
      const params: SubmissionsQueryParams = { AssignedToId: 'nonexistent' }
      const result = getMockSubmissions(params)

      expect(result.data).toEqual([])
      expect(result.paging.totalRecords).toBe(0)
      expect(result.paging.totalPages).toBe(1) // Function always returns 1 page
      expect(result.statusCode).toBe(200)
    })

    it('should generate realistic timestamps', () => {
      const result = getMockSubmissions()

      // Check that timestamps are valid dates
      expect(() => new Date(result.timestamp)).not.toThrow()
      expect(() => new Date(result.performance.startTime)).not.toThrow()
      expect(() => new Date(result.performance.endTime)).not.toThrow()

      // Check that end time is after start time
      const startTime = new Date(result.performance.startTime)
      const endTime = new Date(result.performance.endTime)
      expect(endTime.getTime()).toBeGreaterThanOrEqual(startTime.getTime())
    })

    it('should maintain consistent data structure across multiple calls', () => {
      const result1 = getMockSubmissions()
      const result2 = getMockSubmissions()

      // Structure should be the same
      expect(Object.keys(result1)).toEqual(Object.keys(result2))
      expect(Object.keys(result1.paging)).toEqual(Object.keys(result2.paging))
      expect(Object.keys(result1.performance)).toEqual(
        Object.keys(result2.performance)
      )

      // Data should be the same (deterministic)
      expect(result1.data).toEqual(result2.data)
      expect(result1.statusCode).toBe(result2.statusCode)
      expect(result1.message).toBe(result2.message)
    })
  })

  describe('Integration tests', () => {
    it('should work correctly with complex real-world scenarios', () => {
      // Scenario 1: Manager wants to see all draft submissions for their team
      const draftParams: SubmissionsQueryParams = {
        SubmissionStatuses: 'Draft',
        Fields: 'submissionId,assignedToName,createdDate,comment',
      }
      const draftResult = getMockSubmissions(draftParams)

      draftResult.data.forEach((submission) => {
        expect(Object.keys(submission)).toEqual([
          'submissionId',
          'assignedToName',
          'createdDate',
          'comment',
        ])
      })

      // Scenario 2: Underwriter wants rush submissions for specific business unit
      const rushParams: SubmissionsQueryParams = {
        BusinessUnitsId: 'E',
        Fields: 'submissionId,isRush,rushReasonCode,underwriterTargetDate',
      }
      const rushResult = getMockSubmissions(rushParams)

      rushResult.data.forEach((submission) => {
        expect(Object.keys(submission)).toEqual([
          'submissionId',
          'isRush',
          'rushReasonCode',
          'underwriterTargetDate',
        ])
      })

      // Scenario 3: User wants their own submissions with email details
      const userParams: SubmissionsQueryParams = {
        AssignedToId: 'user123',
        Fields: 'submissionId,emailDetails,submissionStatusDescription',
      }
      const userResult = getMockSubmissions(userParams)

      userResult.data.forEach((submission) => {
        expect(Object.keys(submission)).toEqual([
          'submissionId',
          'emailDetails',
          'submissionStatusDescription',
        ])
        expect(submission.emailDetails).toBeDefined()
      })
    })

    it('should handle edge case parameter combinations', () => {
      // Empty strings and undefined combinations
      const edgeParams: SubmissionsQueryParams = {
        AssignedToId: '',
        BusinessUnitsId: undefined,
        SubmissionStatuses: '',
        Fields: '',
      }
      const result = getMockSubmissions(edgeParams)
      expect(result.data).toEqual(mockSubmissionsData)

      // Very specific filtering that should return no results
      const noResultsParams: SubmissionsQueryParams = {
        AssignedToId: 'user123',
        BusinessUnitsId: 'NONEXISTENT',
        SubmissionStatuses: 'Draft',
      }
      const noResults = getMockSubmissions(noResultsParams)
      expect(noResults.data).toEqual([])
      expect(noResults.paging.totalRecords).toBe(0)
    })
  })
})
