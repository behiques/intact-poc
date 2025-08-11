export type Worklist = {
  AccountId: number
  SubmissionId: number
  AssignedToId: string
  AssignedToName: string
  BusinessUnitId: string
  Comment: string | null
  SubmissionStatusId: number
  IsRush: boolean | null
  RushReasonCode: string | null
  BrokerTargetDate: string | null
  UnderwriterTargetDate: string | null
  IsSendToRating: boolean | null
  UnderwritingInstructions: string | null
  CommentsForUnderwriter: string | null
  SubmissionStatusDescription: string
  EmailDetails: EmailDetails | null
  CreatedDate: string | number
}

type EmailDetails = {
  id: number
  externalId: string
  from: string
  subject: string
  receivedDate: string
  source: string
  sourceAddress: string
  isImportant: boolean
  tags: string[] | null
}

export type SubmissionWorklistApiResponse = {
  data: Worklist[]
}

export type Step = {
  name: string
  description: string
  index: number
  status: 'current' | 'upcoming' | 'complete'
}

export type Territory = {
  businessUnitId: string
  description: string
  groupOrder: number
  isActive: boolean
  name: string
  value: string
}

export type TerritoryApiResponse = {
  data: Territory[]
}

export type SIC = {
  sicCode: number
  riskCode: number
  description: string
}

export type SICApiResponse = {
  data: SIC[]
}

export type LegalEntity = {
  value: string
  label: string
}

export type LegalEntityApiResponse = {
  data: LegalEntity[]
}
