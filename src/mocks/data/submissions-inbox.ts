import {
  Submission,
  SubmissionWorklistApiResponse,
} from '@/features/submissions/types'

/**
 * Mock data for submissions inbox
 */
export const mockSubmissionsInboxData: Submission[] = [
  {
    AccountId: 6235830,
    SubmissionId: 19877,
    AssignedToId: 'AXDALAL',
    AssignedToName: 'Akhill Dalal',
    BusinessUnitId: 'I',
    Comment: null,
    SubmissionStatusId: 1,
    IsRush: null,
    RushReasonCode: null,
    BrokerTargetDate: null,
    UnderwriterTargetDate: null,
    IsSendToRating: null,
    UnderwritingInstructions: null,
    CommentsForUnderwriter: null,
    SubmissionStatusDescription: 'In Progress',
    EmailDetails: null,
    CreatedDate: '2025-07-29T11:43:49.67',
  },
]

/**
 * Helper to get mock submissions inbox API response
 */
export const getMockSubmissionsInbox = (): SubmissionWorklistApiResponse => {
  return {
    data: mockSubmissionsInboxData,
  }
}
