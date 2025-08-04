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
