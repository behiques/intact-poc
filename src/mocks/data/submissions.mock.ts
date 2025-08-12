import type {
  Submission,
  SubmissionApiResponse,
  SubmissionsQueryParams,
} from '@/features/account-search/types'

/**
 * Mock data for submissions with diverse scenarios for comprehensive testing
 * Includes various statuses, business units, assigned users, and edge cases
 */
export const mockSubmissionsData: Submission[] = [
  {
    accountId: 1001,
    submissionId: 2001,
    assignedToId: 'user123',
    assignedToName: 'John Smith',
    businessUnitId: 'E',
    comment: 'Initial submission for entertainment industry client',
    submissionStatusId: 1,
    isRush: false,
    rushReasonCode: 0,
    brokerTargetDate: '2025-08-20T10:00:00Z',
    underwriterTargetDate: '2025-08-25T15:00:00Z',
    isSendToRating: true,
    underwritingInstructions: 'Standard underwriting process',
    commentsForUnderwriter: 'Client has clean loss history',
    submissionStatusDescription: 'Draft',
    emailDetails: {
      id: 3001,
      externalId: 'email-ext-001',
      from: 'broker@example.com',
      subject: 'New Entertainment Industry Submission',
      receivedDate: '2025-08-12T08:30:00Z',
      source: 'Outlook',
      sourceAddress: 'broker@example.com',
      isImportant: true,
      tags: [
        { documentId: 4001, name: 'entertainment' },
        { documentId: 4002, name: 'priority' },
      ],
    },
    createdDate: '2025-08-12T09:00:00Z',
  },
  {
    accountId: 1002,
    submissionId: 2002,
    assignedToId: 'user456',
    assignedToName: 'Sarah Johnson',
    businessUnitId: 'D',
    comment: 'Healthcare submission requiring special attention',
    submissionStatusId: 2,
    isRush: true,
    rushReasonCode: 101,
    brokerTargetDate: '2025-08-15T14:00:00Z',
    underwriterTargetDate: '2025-08-18T16:00:00Z',
    isSendToRating: false,
    underwritingInstructions: 'Review for regulatory compliance',
    commentsForUnderwriter: 'Previous claim in 2023, resolved favorably',
    submissionStatusDescription: 'InProgress',
    emailDetails: {
      id: 3002,
      externalId: 'email-ext-002',
      from: 'agent@healthcare.com',
      subject: 'URGENT: Healthcare Facility Coverage Request',
      receivedDate: '2025-08-11T16:45:00Z',
      source: 'Gmail',
      sourceAddress: 'agent@healthcare.com',
      isImportant: true,
      tags: [
        { documentId: 4003, name: 'healthcare' },
        { documentId: 4004, name: 'rush' },
        { documentId: 4005, name: 'compliance' },
      ],
    },
    createdDate: '2025-08-11T17:00:00Z',
  },
  {
    accountId: 1003,
    submissionId: 2003,
    assignedToId: 'user789',
    assignedToName: 'Michael Brown',
    businessUnitId: 'C',
    comment: 'Construction project with multiple locations',
    submissionStatusId: 3,
    isRush: false,
    rushReasonCode: 0,
    brokerTargetDate: '2025-08-30T12:00:00Z',
    underwriterTargetDate: '2025-09-05T10:00:00Z',
    isSendToRating: true,
    underwritingInstructions: 'Evaluate multi-location exposure',
    commentsForUnderwriter:
      'Large construction company with good safety record',
    submissionStatusDescription: 'UnderReview',
    emailDetails: {
      id: 3003,
      externalId: 'email-ext-003',
      from: 'construction@builders.com',
      subject: 'Multi-Site Construction Insurance Quote',
      receivedDate: '2025-08-10T11:20:00Z',
      source: 'Exchange',
      sourceAddress: 'construction@builders.com',
      isImportant: false,
      tags: [
        { documentId: 4006, name: 'construction' },
        { documentId: 4007, name: 'multi-location' },
      ],
    },
    createdDate: '2025-08-10T12:00:00Z',
  },
  {
    accountId: 1004,
    submissionId: 2004,
    assignedToId: 'user123',
    assignedToName: 'John Smith',
    businessUnitId: 'F',
    comment: 'Financial services liability coverage',
    submissionStatusId: 4,
    isRush: false,
    rushReasonCode: 0,
    brokerTargetDate: '2025-08-22T09:00:00Z',
    underwriterTargetDate: '2025-08-28T17:00:00Z',
    isSendToRating: true,
    underwritingInstructions: 'Standard financial services review',
    commentsForUnderwriter: 'Established firm with strong financials',
    submissionStatusDescription: 'Completed',
    emailDetails: {
      id: 3004,
      externalId: 'email-ext-004',
      from: 'finance@investment.com',
      subject: 'Professional Liability Quote Request',
      receivedDate: '2025-08-09T14:15:00Z',
      source: 'Outlook',
      sourceAddress: 'finance@investment.com',
      isImportant: false,
      tags: [
        { documentId: 4008, name: 'financial' },
        { documentId: 4009, name: 'liability' },
      ],
    },
    createdDate: '2025-08-09T15:00:00Z',
  },
  {
    accountId: 1005,
    submissionId: 2005,
    assignedToId: 'user456',
    assignedToName: 'Sarah Johnson',
    businessUnitId: 'T',
    comment: 'Technology startup requiring cyber coverage',
    submissionStatusId: 2,
    isRush: true,
    rushReasonCode: 102,
    brokerTargetDate: '2025-08-16T13:00:00Z',
    underwriterTargetDate: '2025-08-20T11:00:00Z',
    isSendToRating: false,
    underwritingInstructions: 'Focus on cyber security measures',
    commentsForUnderwriter: 'Startup with strong security protocols',
    submissionStatusDescription: 'InProgress',
    emailDetails: {
      id: 3005,
      externalId: 'email-ext-005',
      from: 'startup@techcompany.com',
      subject: 'Cyber Insurance for Growing Tech Company',
      receivedDate: '2025-08-12T10:30:00Z',
      source: 'Gmail',
      sourceAddress: 'startup@techcompany.com',
      isImportant: true,
      tags: [
        { documentId: 4010, name: 'technology' },
        { documentId: 4011, name: 'cyber' },
        { documentId: 4012, name: 'startup' },
      ],
    },
    createdDate: '2025-08-12T11:00:00Z',
  },
  {
    accountId: 1006,
    submissionId: 2006,
    assignedToId: 'user999',
    assignedToName: 'Lisa Wilson',
    businessUnitId: 'R',
    comment: 'Retail chain expansion coverage',
    submissionStatusId: 1,
    isRush: false,
    rushReasonCode: 0,
    brokerTargetDate: '2025-09-01T08:00:00Z',
    underwriterTargetDate: '2025-09-10T16:00:00Z',
    isSendToRating: true,
    underwritingInstructions: 'Evaluate expansion risk',
    commentsForUnderwriter: 'Expanding to new markets',
    submissionStatusDescription: 'Draft',
    emailDetails: {
      id: 3006,
      externalId: 'email-ext-006',
      from: 'retail@chain.com',
      subject: 'Insurance for Store Expansion Project',
      receivedDate: '2025-08-11T09:45:00Z',
      source: 'Exchange',
      sourceAddress: 'retail@chain.com',
      isImportant: false,
      tags: [
        { documentId: 4013, name: 'retail' },
        { documentId: 4014, name: 'expansion' },
      ],
    },
    createdDate: '2025-08-11T10:30:00Z',
  },
  {
    accountId: 1007,
    submissionId: 2007,
    assignedToId: 'user789',
    assignedToName: 'Michael Brown',
    businessUnitId: 'E',
    comment: 'Film production insurance - high value project',
    submissionStatusId: 5,
    isRush: false,
    rushReasonCode: 0,
    brokerTargetDate: '2025-08-25T15:00:00Z',
    underwriterTargetDate: '2025-08-30T12:00:00Z',
    isSendToRating: false,
    underwritingInstructions: 'High value production review',
    commentsForUnderwriter: 'Major studio production, experienced crew',
    submissionStatusDescription: 'Declined',
    emailDetails: {
      id: 3007,
      externalId: 'email-ext-007',
      from: 'studio@filmproduction.com',
      subject: 'High-Value Film Production Insurance',
      receivedDate: '2025-08-08T13:20:00Z',
      source: 'Outlook',
      sourceAddress: 'studio@filmproduction.com',
      isImportant: true,
      tags: [
        { documentId: 4015, name: 'entertainment' },
        { documentId: 4016, name: 'high-value' },
        { documentId: 4017, name: 'production' },
      ],
    },
    createdDate: '2025-08-08T14:00:00Z',
  },
  {
    accountId: 1008,
    submissionId: 2008,
    assignedToId: 'user123',
    assignedToName: 'John Smith',
    businessUnitId: 'D',
    comment: 'Medical practice group coverage',
    submissionStatusId: 3,
    isRush: false,
    rushReasonCode: 0,
    brokerTargetDate: '2025-08-28T11:00:00Z',
    underwriterTargetDate: '2025-09-02T14:00:00Z',
    isSendToRating: true,
    underwritingInstructions: 'Medical malpractice assessment',
    commentsForUnderwriter: 'Established practice with good reputation',
    submissionStatusDescription: 'UnderReview',
    emailDetails: {
      id: 3008,
      externalId: 'email-ext-008',
      from: 'medical@practicegroup.com',
      subject: 'Medical Malpractice Insurance Renewal',
      receivedDate: '2025-08-07T15:30:00Z',
      source: 'Gmail',
      sourceAddress: 'medical@practicegroup.com',
      isImportant: false,
      tags: [
        { documentId: 4018, name: 'healthcare' },
        { documentId: 4019, name: 'malpractice' },
        { documentId: 4020, name: 'renewal' },
      ],
    },
    createdDate: '2025-08-07T16:00:00Z',
  },
]

/**
 * Filters submissions based on query parameters
 */
export const filterSubmissions = (
  params?: SubmissionsQueryParams
): Submission[] => {
  let filtered = [...mockSubmissionsData]

  // Filter by AssignedToId if provided
  if (params?.AssignedToId) {
    filtered = filtered.filter(
      (submission) => submission.assignedToId === params.AssignedToId
    )
  }

  // Filter by BusinessUnitsId if provided
  if (params?.BusinessUnitsId) {
    filtered = filtered.filter(
      (submission) => submission.businessUnitId === params.BusinessUnitsId
    )
  }

  // Filter by SubmissionStatuses if provided
  if (params?.SubmissionStatuses) {
    const statusList = params.SubmissionStatuses.split(',').map((status) =>
      status.trim()
    )
    filtered = filtered.filter((submission) =>
      statusList.includes(submission.submissionStatusDescription)
    )
  }

  return filtered
}

/**
 * Applies field selection to submissions data
 */
export const selectSubmissionFields = (
  submissions: Submission[],
  fields?: string
): Array<Partial<Submission>> => {
  if (!fields) {
    return submissions
  }

  const fieldList = fields.split(',').map((field) => field.trim())

  return submissions.map((submission) => {
    const selected: Record<string, unknown> = {}

    fieldList.forEach((field) => {
      if (field in submission && typeof field === 'string') {
        const key = field as keyof Submission
        const value = submission[key]
        if (value !== undefined) {
          selected[field] = value
        }
      }
    })

    // Always include submissionId as it's the primary identifier
    if (!fieldList.includes('submissionId')) {
      selected.submissionId = submission.submissionId
    }

    return selected as Partial<Submission>
  })
}

/**
 * Helper to get mock submissions API response with query parameter support
 */
export const getMockSubmissions = (
  params?: SubmissionsQueryParams
): SubmissionApiResponse => {
  // Filter submissions based on query parameters
  const filteredSubmissions = filterSubmissions(params)

  // Apply field selection if Fields parameter is provided
  const finalSubmissions = selectSubmissionFields(
    filteredSubmissions,
    params?.Fields
  )

  return {
    data: finalSubmissions as Submission[],
    message: 'Submissions retrieved successfully',
    paging: {
      page: 1,
      pageSize: finalSubmissions.length,
      totalPages: 1,
      totalRecords: finalSubmissions.length,
    },
    performance: {
      elapsedTime: '125ms',
      endTime: new Date().toISOString(),
      startTime: new Date(Date.now() - 125).toISOString(),
    },
    statusCode: 200,
    timestamp: new Date().toISOString(),
  }
}
