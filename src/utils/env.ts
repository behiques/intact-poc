import { z } from 'zod'

// Environment validation schema following bulletproof-react pattern
const envSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
  NEXT_PUBLIC_API_URL: z.string().url().optional(),
  NEXT_PUBLIC_APP_URL: z.string().url().optional(),
  // Mock API Configuration
  NEXT_PUBLIC_USE_MOCK_API: z
    .string()
    .transform((val) => val === 'true')
    .default('false')
    .optional(),
  // Token Management Configuration
  AUTH_TOKEN_API_URL: z
    .string()
    .url('AUTH_TOKEN_API_URL must be a valid URL')
    .default('https://api.example.com/auth/token'),
  BACKEND_API_URL: z
    .string()
    .url('BACKEND_API_URL must be a valid URL')
    .default('https://api.example.com'),
  USER_SYSTEM_ID: z
    .string()
    .min(1, 'USER_SYSTEM_ID cannot be empty')
    .default('my-system-id'),
})

// Parse and validate environment variables
const parsedEnv = envSchema.safeParse(process.env)

if (!parsedEnv.success) {
  console.error('❌ Invalid environment variables:', parsedEnv.error.format())

  // In development, provide helpful guidance
  if (process.env.NODE_ENV === 'development') {
    console.error('\n💡 To fix this issue:')
    console.error('1. Copy .env.example to .env.local:')
    console.error('   cp .env.example .env.local')
    console.error('2. Update the values in .env.local with your configuration')
    console.error('\nRequired environment variables:')
    console.error('- AUTH_TOKEN_API_URL: URL for authentication token API')
    console.error('- BACKEND_API_URL: Base URL for backend API')
    console.error('- USER_SYSTEM_ID: System identifier for API requests\n')
  }

  throw new Error('Invalid environment variables')
}

export const env = parsedEnv.data || ({} as z.infer<typeof envSchema>)
