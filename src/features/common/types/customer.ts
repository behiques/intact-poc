import { z } from 'zod'

/**
 * Represents a customer in the system.
 * This type is used to define the structure of customer data.
 */
export type Customer = {
  customerId: number
  customerName1: string
  customerName2: string
  businessUnitId: string
  addressId: number
  addressDescription: string
}

/**
 * API response structure for fetching customers.
 * This type is used to define the expected response from the customers API.
 */
export interface CustomersApiResponse {
  data: Customer[]
}

/**
 * Query parameters for Customers API
 * All parameters are optional to provide flexible filtering options
 */
export interface CustomersQueryParams {
  /** Filter to a specific customer by business unit ID (e.g., "R", "H") */
  BusinessUnitId?: string
  /** Filter to a specific customer by Customer Name (e.g., "Chris", "John") */
  CustomerName?: string
  /** Comma-separated list of fields to return (e.g., "customerId,customerName1,addressDescription") */
  Fields?: string
  ReturnAll?: boolean
}

/**
 * Zod schema for validating Business Units query parameters
 */
export const CustomersQueryParamsSchema = z
  .object({
    BusinessUnitId: z
      .string()
      .min(1, 'BusinessUnitId cannot be empty')
      .optional(),
    CustomerName: z.string().min(1, 'CustomerName cannot be empty').optional(),
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
