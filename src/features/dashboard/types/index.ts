export interface FinancialCloseDate {
  month: string
  premium: string
  day: string
  loss: string
}

export interface FinancialCloseDatesApiResponse {
  data: FinancialCloseDate[]
}
