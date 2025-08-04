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
  businessUnitId: string
  name: string
  phone: string
  isActive: boolean
  address1: string
  address2: string
  city: string
  stateCode: string
  zip: string
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
  territoryId: string
  territoryDescription: string
  territoryName: string
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

export type ProducerApiResponse = Producer[]

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
