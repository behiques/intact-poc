import { z } from 'zod'

export interface BusinessUnit {
  abbreviation: string
  businessUnitId: string
  description: string
  groupTitle: string
  isActive: boolean
  isEligibleForAdmitted: boolean // Indicates if the business unit is eligible for admitted insurance
  name: string
  url: string
}

export interface BusinessUnitApiResponse {
  data: BusinessUnit[]
}

/**
 * Query parameters for Business Units API
 * All parameters are optional to maintain backward compatibility
 */
export interface BusinessUnitsQueryParams {
  /** Filter to a specific business unit by ID (e.g., "R", "H") */
  BusinessUnitId?: string
  /** Comma-separated list of fields to return (e.g., "BusinessUnitId,Abbreviation") */
  Fields?: string
  /** Whether to include inactive business units. Defaults to false (active only) */
  ReturnAll?: boolean
}

/**
 * Zod schema for validating Business Units query parameters
 */
export const BusinessUnitsQueryParamsSchema = z
  .object({
    BusinessUnitId: z
      .string()
      .min(1, 'BusinessUnitId cannot be empty')
      .optional(),
    Fields: z
      .string()
      .min(1, 'Fields cannot be empty')
      .regex(
        /^[a-zA-Z]+(,[a-zA-Z]+)*$/,
        'Fields must be comma-separated field names'
      )
      .optional(),
    ReturnAll: z
      .union([z.boolean(), z.string().transform((val) => val === 'true')])
      .optional(),
  })
  .strict()

/**
 * Zod schema for validating individual Business Unit objects
 */
export const BusinessUnitSchema = z.object({
  abbreviation: z.string().min(1, 'Abbreviation cannot be empty'),
  businessUnitId: z.string().min(1, 'BusinessUnitId cannot be empty'),
  description: z.string().min(1, 'Description cannot be empty'),
  groupTitle: z.string().min(1, 'GroupTitle cannot be empty'),
  isActive: z.boolean(),
  isEligibleForAdmitted: z.boolean(),
  name: z.string().min(1, 'Name cannot be empty'),
  url: z.string().nullable(),
})

/**
 * Zod schema for validating Business Unit API response structure
 */
export const BusinessUnitApiResponseSchema = z.object({
  data: z.array(BusinessUnitSchema),
})

/**
 * Tag interface for email details within submissions
 */
export interface Tag {
  documentId: number
  name: string
}

/**
 * Email details interface for submissions
 */
export interface EmailDetails {
  id: number
  externalId: string
  from: string
  subject: string
  receivedDate: string
  source: string
  sourceAddress: string
  isImportant: boolean
  tags: Tag[]
}

/**
 * Submission interface representing the complete submission data structure
 * Based on the API response specification from /api/v1/submissions
 */
export interface Submission {
  /** Unique identifier for the account */
  accountId: number
  /** Unique identifier for the submission */
  submissionId: number
  /** ID of the user assigned to this submission */
  assignedToId: string
  /** Name of the user assigned to this submission */
  assignedToName: string
  /** Business unit identifier */
  businessUnitId: string
  /** Comments associated with the submission */
  comment: string
  /** Status identifier for the submission */
  submissionStatusId: number
  /** Indicates if this is a rush submission */
  isRush: boolean
  /** Code indicating the reason for rush processing */
  rushReasonCode: number
  /** Target date for broker actions (ISO date-time format) */
  brokerTargetDate: string
  /** Target date for underwriter actions (ISO date-time format) */
  underwriterTargetDate: string
  /** Indicates if submission should be sent to rating */
  isSendToRating: boolean
  /** Instructions for underwriting */
  underwritingInstructions: string
  /** Comments specifically for the underwriter */
  commentsForUnderwriter: string
  /** Human-readable description of the submission status */
  submissionStatusDescription: string
  /** Email details associated with the submission */
  emailDetails: EmailDetails
  /** Date when the submission was created (ISO date-time format) */
  createdDate: string
}

/**
 * Query parameters for Submissions API
 * All parameters are optional to provide flexible filtering options
 */
export interface SubmissionsQueryParams {
  /** Filter submissions by assigned user ID (e.g., "user123") */
  AssignedToId?: string
  /** Comma-separated list of fields to return (e.g., "BusinessUnitId,submissionStatusDescription") */
  Fields?: string
  /** Filter submissions by business unit ID (e.g., "R", "H") */
  BusinessUnitsId?: string
  /** Comma-separated list of submission statuses to filter by (e.g., "Draft,InProgress,Completed") */
  SubmissionStatuses?: string
}

/**
 * Zod schema for validating Submissions query parameters
 */
export const SubmissionsQueryParamsSchema = z
  .object({
    AssignedToId: z.string().min(1, 'AssignedToId cannot be empty').optional(),
    Fields: z
      .string()
      .min(1, 'Fields cannot be empty')
      .regex(
        /^[a-zA-Z]+(,[a-zA-Z]+)*$/,
        'Fields must be comma-separated field names'
      )
      .optional(),
    BusinessUnitsId: z
      .string()
      .min(1, 'BusinessUnitsId cannot be empty')
      .optional(),
    SubmissionStatuses: z
      .string()
      .min(1, 'SubmissionStatuses cannot be empty')
      .regex(
        /^[a-zA-Z]+(,[a-zA-Z]+)*$/,
        'SubmissionStatuses must be comma-separated status names'
      )
      .optional(),
  })
  .strict()

/**
 * Zod schema for validating Tag objects
 */
export const TagSchema = z.object({
  documentId: z
    .number()
    .int()
    .nonnegative('DocumentId must be a non-negative integer'),
  name: z.string().min(1, 'Tag name cannot be empty'),
})

/**
 * Zod schema for validating EmailDetails objects
 */
export const EmailDetailsSchema = z.object({
  id: z.number().int().nonnegative('Email ID must be a non-negative integer'),
  externalId: z.string().min(1, 'ExternalId cannot be empty'),
  from: z.string().min(1, 'From field cannot be empty'),
  subject: z.string().min(1, 'Subject cannot be empty'),
  receivedDate: z
    .string()
    .regex(
      /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z?$/,
      'ReceivedDate must be in ISO date-time format'
    ),
  source: z.string().min(1, 'Source cannot be empty'),
  sourceAddress: z.string().min(1, 'SourceAddress cannot be empty'),
  isImportant: z.boolean(),
  tags: z.array(TagSchema),
})

/**
 * Zod schema for validating individual Submission objects
 */
export const SubmissionSchema = z.object({
  accountId: z
    .number()
    .int()
    .nonnegative('AccountId must be a non-negative integer'),
  submissionId: z
    .number()
    .int()
    .nonnegative('SubmissionId must be a non-negative integer'),
  assignedToId: z.string().min(1, 'AssignedToId cannot be empty'),
  assignedToName: z.string().min(1, 'AssignedToName cannot be empty'),
  businessUnitId: z.string().min(1, 'BusinessUnitId cannot be empty'),
  comment: z.string(),
  submissionStatusId: z
    .number()
    .int()
    .nonnegative('SubmissionStatusId must be a non-negative integer'),
  isRush: z.boolean(),
  rushReasonCode: z
    .number()
    .int()
    .nonnegative('RushReasonCode must be a non-negative integer'),
  brokerTargetDate: z
    .string()
    .regex(
      /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z?$/,
      'BrokerTargetDate must be in ISO date-time format'
    ),
  underwriterTargetDate: z
    .string()
    .regex(
      /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z?$/,
      'UnderwriterTargetDate must be in ISO date-time format'
    ),
  isSendToRating: z.boolean(),
  underwritingInstructions: z.string(),
  commentsForUnderwriter: z.string(),
  submissionStatusDescription: z
    .string()
    .min(1, 'SubmissionStatusDescription cannot be empty'),
  emailDetails: EmailDetailsSchema,
  createdDate: z
    .string()
    .regex(
      /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z?$/,
      'CreatedDate must be in ISO date-time format'
    ),
})

/**
 * Zod schema for validating PagingInfo objects
 */
export const PagingInfoSchema = z.object({
  page: z.number().int().nonnegative('Page must be a non-negative integer'),
  pageSize: z.number().int().positive('PageSize must be a positive integer'),
  totalPages: z
    .number()
    .int()
    .nonnegative('TotalPages must be a non-negative integer'),
  totalRecords: z
    .number()
    .int()
    .nonnegative('TotalRecords must be a non-negative integer'),
})

/**
 * Zod schema for validating PerformanceInfo objects
 */
export const PerformanceInfoSchema = z.object({
  elapsedTime: z.string().min(1, 'ElapsedTime cannot be empty'),
  endTime: z
    .string()
    .regex(
      /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z?$/,
      'EndTime must be in ISO date-time format'
    ),
  startTime: z
    .string()
    .regex(
      /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z?$/,
      'StartTime must be in ISO date-time format'
    ),
})

/**
 * Zod schema for validating SubmissionApiResponse structure
 */
export const SubmissionApiResponseSchema = z.object({
  data: z.array(SubmissionSchema),
  message: z.string(),
  paging: PagingInfoSchema,
  performance: PerformanceInfoSchema,
  statusCode: z
    .number()
    .int()
    .positive('StatusCode must be a positive integer'),
  timestamp: z
    .string()
    .regex(
      /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z?$/,
      'Timestamp must be in ISO date-time format'
    ),
})

/**
 * Paging information interface for API responses
 */
export interface PagingInfo {
  page: number
  pageSize: number
  totalPages: number
  totalRecords: number
}

/**
 * Performance information interface for API responses
 */
export interface PerformanceInfo {
  elapsedTime: string
  endTime: string
  startTime: string
}

/**
 * Complete API response interface for submissions following the standard backend pattern
 * Includes data payload and metadata information
 */
export interface SubmissionApiResponse {
  /** Array of submission objects */
  data: Submission[]
  /** Response message from the server */
  message: string
  /** Pagination information */
  paging: PagingInfo
  /** Performance metrics for the request */
  performance: PerformanceInfo
  /** HTTP status code */
  statusCode: number
  /** Response timestamp (ISO date-time format) */
  timestamp: string
}

export interface PolicyContact {
  producerContactId: number
  firstName: string
  lastName: string
  email?: string
  phone?: string
}
export interface PolicyContactApiResponse {
  data: PolicyContact[]
}

/**
 * Contact interface for the new contacts API
 * Maintains the same structure as PolicyContact for compatibility
 */
export interface Contact {
  producerContactId: number
  firstName: string
  lastName: string
  email?: string
  phone?: string
}

/**
 * API response interface for contacts
 */
export interface ContactApiResponse {
  data: Contact[]
}

/**
 * Query parameters for Contacts API
 * All parameters are optional to provide flexible filtering options
 */
export interface ContactsQueryParams {
  /** Filter to a specific contact by producer contact ID (e.g., 123) */
  ProducerContactId?: number
  /** Comma-separated list of fields to return (e.g., "LastName,Email", "ProducerContactId,FirstName,LastName,Email,Phone") */
  Fields?: string
}

/**
 * Zod schema for validating Contacts query parameters
 */
export const ContactsQueryParamsSchema = z
  .object({
    ProducerContactId: z
      .number()
      .int()
      .positive('ProducerContactId must be a positive integer')
      .optional(),
    Fields: z
      .string()
      .min(1, 'Fields cannot be empty')
      .regex(
        /^[a-zA-Z]+(,[a-zA-Z]+)*$/,
        'Fields must be comma-separated field names'
      )
      .optional(),
  })
  .strict()

/**
 * Zod schema for validating individual Contact objects
 */
export const ContactSchema = z.object({
  producerContactId: z
    .number()
    .int()
    .positive('ProducerContactId must be a positive integer'),
  firstName: z.string().min(1, 'FirstName cannot be empty'),
  lastName: z.string().min(1, 'LastName cannot be empty'),
  email: z.string().email('Invalid email format').optional().nullable(),
  phone: z.string().min(1, 'Phone cannot be empty').optional().nullable(),
})

/**
 * Zod schema for validating Contact API responses
 */
export const ContactApiResponseSchema = z.object({
  data: z.array(ContactSchema),
})

export interface Producer {
  producerCode: string
  name: string
  address1: string
  city: string
  stateCode: string
  zip: string
  territoryId: string
  territoryName: string
  businessUnitId: string
  phone: string
  isActive: boolean
  address2: string
  countryCode: string | null
  mailAddress1: string
  mailAddress2: string
  mailCity: string
  mailStateCode: string
  mailZip: string
  mailCountryCode: string | null
  billAddress1: string
  billAddress2: string
  billCity: string
  billStateCode: string
  billZip: string
  billCountryCode: string | null
  territoryDescription: string
}

/**
 * Query parameters for Producers API
 * All parameters are optional to allow flexible querying
 */
export interface ProducersQueryParams {
  /** Filter to a specific territory by ID (e.g., "001") */
  TerritoryId?: string
  /** Comma-separated list of fields to return (e.g., "producerCode,name,isActive") */
  Fields?: string
  /** Whether to include inactive producers. Defaults to false (active only) */
  ReturnAll?: boolean
}

export type ProducerApiResponse = {
  data: Producer[]
}

/**
 * Zod schema for validating Producers query parameters
 */
export const ProducersQueryParamsSchema = z
  .object({
    TerritoryId: z.string().min(1, 'TerritoryId cannot be empty').optional(),
    Fields: z
      .string()
      .min(1, 'Fields cannot be empty')
      .regex(
        /^[a-zA-Z]+(,[a-zA-Z]+)*$/,
        'Fields must be comma-separated field names'
      )
      .optional(),
    ReturnAll: z
      .union([z.boolean(), z.string().transform((val) => val === 'true')])
      .optional(),
  })
  .strict()

/**
 * Query parameters for Account Search API
 * Maps to the clearance/v2/search endpoint parameters
 */
export interface AccountSearchQueryParams {
  /** The account name to search for (required) */
  AccountName: string
  /** Filter to a specific business unit by ID (e.g., "R", "H") */
  BusinessUnitId?: string
  /** Filter by city name */
  City?: string
  /** Filter by effective date (ISO date-time format) */
  EffectiveDate?: string
  /** Filter by expiration date (ISO date-time format) */
  ExpirationDate?: string
  /** Filter by state */
  State?: string
  /** Filter by street address */
  Street?: string
  /** Filter by ZIP code */
  Zip?: string
}

/**
 * Zod schema for validating Account Search query parameters
 */
export const AccountSearchQueryParamsSchema = z
  .object({
    AccountName: z
      .string()
      .min(1, 'AccountName is required and cannot be empty')
      .trim(),
    BusinessUnitId: z
      .string()
      .min(1, 'BusinessUnitId cannot be empty')
      .trim()
      .optional(),
    City: z.string().min(1, 'City cannot be empty').trim().optional(),
    EffectiveDate: z
      .string()
      .regex(
        /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z?$/,
        'EffectiveDate must be in ISO date-time format (e.g., 2024-01-01T00:00:00Z)'
      )
      .trim()
      .optional(),
    ExpirationDate: z
      .string()
      .regex(
        /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z?$/,
        'ExpirationDate must be in ISO date-time format (e.g., 2024-12-31T23:59:59Z)'
      )
      .trim()
      .optional(),
    State: z.string().min(1, 'State cannot be empty').trim().optional(),
    Street: z.string().min(1, 'Street cannot be empty').trim().optional(),
    Zip: z
      .string()
      .min(1, 'Zip cannot be empty')
      .trim()
      .regex(
        /^\d{5}(-\d{4})?$/,
        'Zip must be in valid format (e.g., 12345 or 12345-6789)'
      )
      .optional(),
  })
  .strict()

export type AccountSearchResultProp = {
  item: AccountSearchResult
  showing: boolean
  onClick: () => void
}

export type AccountSearchResult = {
  account: Account
  term: Term
}

export type Account = {
  id: number
  businessUnitId: string
  businessUnitName: string
  name: string
  name2?: string
  producerCode: string
  producerName: string
  status: string
  address: Address
  dba?: string
  fka?: string
}

type Address = {
  street: string
  city: string
  state: string
  zip: string
  country?: string
}

export type Term = {
  address: {
    street: string | null
    city: string | null
    state: string | null
    zip: string | null
    country?: string | null
  }
  businessUnitId: string
  businessUnitName: string
  effectiveDate: string
  expirationDate: string
  producerCode: string
  producerName: string
  programType: string
  territory: string | null
  status?: string
  underwriter?: string
  schedule?: string
  cyberCovExists?: boolean
  eandOCovExists?: boolean
}

export type AccountSearchFormProps = {
  onSearch: (data: AccountSearchFormData) => void
}
export type AccountSearchFormData = {
  accountName: string
  businessUnit?: string
  producer?: string
  policyContact?: string
  effectiveDate?: string
  expirationDate?: string
  // New API parameters for clearance/v2/search endpoint
  businessUnitId?: string
  city?: string
  state?: string
  street?: string
  zip?: string
}

/**
 * API response for account search queries from /samapi/api/clearance/v2/search
 * Follows the standard API response pattern with data wrapper
 */
export interface AccountSearchApiResponse {
  data: AccountSearchResult[]
}
