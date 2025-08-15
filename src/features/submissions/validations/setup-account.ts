import { z } from 'zod'

export const setupAccountSchema = z.object({
  name: z.object({
    name1: z.string({
      message: 'Account name is required',
    }),
  }),
  producerCode: z.string({
    message: 'Producer is required',
  }),
  address: z.object({
    street: z.string('Street is required'),
    city: z.string('City is required'),
    state: z.string('State is required'),
    zip: z.string('Zip code is required'),
    country: z.string('Country is required'),
  }),
  defaultLegalEntityId: z.string('Legal entity is required'),
})
