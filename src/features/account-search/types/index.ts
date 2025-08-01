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
  businessUnitName: string
  programType: string
  effectiveDate: string
  expirationDate: string
  status: string
  producerCode: string
  producerName: string
  underwriter: string
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
