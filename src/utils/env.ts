import { z } from 'zod'

// Environment validation schema following bulletproof-react pattern
const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  NEXT_PUBLIC_API_URL: z.string().url().optional(),
  NEXT_PUBLIC_APP_URL: z.string().url().optional(),
})

// Parse and validate environment variables
const parsedEnv = envSchema.safeParse(process.env)

if (!parsedEnv.success) {
  console.error('❌ Invalid environment variables:', parsedEnv.error.format())
  throw new Error('Invalid environment variables')
}

export const env = parsedEnv.data
