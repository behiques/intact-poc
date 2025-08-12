import { describe, it, expect } from 'vitest'
import {
  SubmissionsQueryParamsSchema,
  SubmissionSchema,
  type SubmissionsQueryParams,
  type Submission,
} from '../../../../src/features/account-search/types'

// Valid test data for schema validation
const validSubmission: Submission = {
  accountId: 12345,
  submissionId: 67890,
  assignedToId: 'user123',
  assignedToName: 'John Doe',
  businessUnitId: 'E',
  comment: 'Test submission comment',
  submissionStatusId: 1,
  isRush: false,
  rushReasonCode: 0,
  brokerTargetDate: '2025-12-31T23:59:59Z',
  underwriterTargetDate: '2025-11-30T23:59:59Z',
  isSendToRating: true,
  underwritingInstructions: 'Standard underwriting process',
  commentsForUnderwriter: 'Please expedite review',
  submissionStatusDescription: 'Draft',
  createdDate: '2025-08-20T10:30:00Z',
  emailDetails: {
    id: 123,
    externalId: 'ext-123',
    from: 'broker@example.com',
    subject: 'New Submission Request',
    receivedDate: '2025-08-20T09:00:00Z',
    source: 'Email',
    sourceAddress: 'submissions@company.com',
    isImportant: true,
    tags: [
      {
        documentId: 456,
        name: 'Insurance Application',
      },
    ],
  },
}

describe('Submissions Schema Validation Tests', () => {
  describe('SubmissionsQueryParamsSchema', () => {
    describe('Valid Parameters', () => {
      it('should accept valid query parameters', () => {
        const params: SubmissionsQueryParams = {
          AssignedToId: 'user123',
          BusinessUnitsId: 'E',
          SubmissionStatuses: 'Draft,InProgress',
          Fields: 'submissionId,assignedToName',
        }

        const result = SubmissionsQueryParamsSchema.safeParse(params)
        expect(result.success).toBe(true)

        if (result.success) {
          expect(result.data).toEqual(params)
        }
      })

      it('should accept minimal valid parameters', () => {
        const params = {
          AssignedToId: 'user456',
        }

        const result = SubmissionsQueryParamsSchema.safeParse(params)
        expect(result.success).toBe(true)

        if (result.success) {
          expect(result.data.AssignedToId).toBe('user456')
        }
      })
    })

    describe('Invalid Parameters', () => {
      it('should reject invalid parameter types', () => {
        const params = {
          AssignedToId: 123, // should be string
          BusinessUnitsId: [], // should be string
          SubmissionStatuses: {}, // should be string
          Fields: null, // should be string
        }

        const result = SubmissionsQueryParamsSchema.safeParse(params)
        expect(result.success).toBe(false)
      })

      it('should reject empty strings due to minimum length validation', () => {
        const params = {
          AssignedToId: '',
          BusinessUnitsId: '',
          SubmissionStatuses: '',
          Fields: '',
        }
        const result = SubmissionsQueryParamsSchema.safeParse(params)

        expect(result.success).toBe(false)
      })

      it('should reject invalid field patterns', () => {
        const params = {
          Fields: 'field1,field_2,field-3', // Contains numbers, underscores, hyphens
        }
        const result = SubmissionsQueryParamsSchema.safeParse(params)

        expect(result.success).toBe(false)
      })
    })
  })

  describe('SubmissionSchema', () => {
    describe('Valid Submission Objects', () => {
      it('should accept a valid submission object', () => {
        const result = SubmissionSchema.safeParse(validSubmission)
        expect(result.success).toBe(true)

        if (result.success) {
          expect(result.data).toEqual(validSubmission)
        }
      })
    })

    describe('Invalid Submission Objects', () => {
      it('should reject submissions with missing required fields', () => {
        const incompleteSubmission = {
          accountId: 12345,
          submissionId: 67890,
          // Missing many required fields
        }

        const result = SubmissionSchema.safeParse(incompleteSubmission)
        expect(result.success).toBe(false)
      })

      it('should reject submissions with invalid field types', () => {
        const invalidSubmission = {
          ...validSubmission,
          accountId: 'should-be-number',
          submissionId: 'should-be-number',
          isRush: 'should-be-boolean',
        }

        const result = SubmissionSchema.safeParse(invalidSubmission)
        expect(result.success).toBe(false)
      })
    })
  })
})
