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

export interface Producer {
  producerCode: string
  name: string
  address1: string
  city: string
  stateCode: string
  zip?: string
  territoryId?: string
  territoryName?: string
}

export interface ProducerApiResponse {
  data: Producer[]
}

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
    country: string | null
  }
  businessUnitId: string
  businessUnitName: string
  effectiveDate: string
  expirationDate: string
  producerCode: string
  producerName: string
  programType: string
  territory: string | null
  status: string
  underwriter: string
  schedule: string
  cyberCovExists: boolean
  eandOCovExists: boolean
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
}

export interface AccountSearchApiResponse {
  data: AccountSearchResult[]
}
