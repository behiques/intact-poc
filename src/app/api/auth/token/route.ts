import { NextResponse } from 'next/server'

/**
 * Token API Route Handler
 *
 * Proxies token requests to the external microservices API to bypass CORS restrictions.
 * This follows the Next.js App Router pattern and bulletproof-react architecture principles.
 */

interface TokenResponse {
  token: string
  expiration: string
}

interface ErrorResponse {
  error: string
  message: string
  statusCode: number
}

export async function POST(): Promise<NextResponse> {
  console.log('🔐 Token API route called - POST /api/auth/token')

  try {
    // Get environment variables (server-side only - no NEXT_PUBLIC_ needed)
    const authTokenApiUrl = process.env.AUTH_TOKEN_API_URL
    const userSystemId = process.env.USER_SYSTEM_ID || process.env.USERNAME

    console.log('🌍 Environment check:', {
      authTokenApiUrl: authTokenApiUrl ? '✅ Set' : '❌ Missing',
      userSystemId: userSystemId ? '✅ Set' : '❌ Missing',
      nodeEnv: process.env.NODE_ENV,
      timestamp: new Date().toISOString(),
    })

    // Validate required environment variables
    if (!authTokenApiUrl) {
      console.error('❌ Missing AUTH_TOKEN_API_URL environment variable')
      return NextResponse.json(
        {
          error: 'CONFIGURATION_ERROR',
          message: 'Authentication service not configured',
          statusCode: 500,
        } as ErrorResponse,
        { status: 500 }
      )
    }

    if (!userSystemId) {
      console.error('❌ Missing USER_SYSTEM_ID environment variable')
      return NextResponse.json(
        {
          error: 'CONFIGURATION_ERROR',
          message: 'System ID not configured',
          statusCode: 500,
        } as ErrorResponse,
        { status: 500 }
      )
    }

    // Forward the request to the external API
    const response = await fetch(authTokenApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        usersystemid: userSystemId,
      },
    })

    // Handle non-OK responses
    if (!response.ok) {
      const errorText = await response.text().catch(() => 'Unknown error')

      console.error(
        `External API error: ${response.status} - ${response.statusText}`,
        errorText
      )

      return NextResponse.json(
        {
          error: 'EXTERNAL_API_ERROR',
          message: `Authentication service returned ${response.status}: ${response.statusText}`,
          statusCode: response.status,
        } as ErrorResponse,
        { status: response.status }
      )
    }

    // Parse and validate the response
    let responseData: unknown
    try {
      responseData = await response.json()
    } catch (parseError) {
      console.error(
        'Failed to parse external API response as JSON:',
        parseError
      )
      return NextResponse.json(
        {
          error: 'INVALID_RESPONSE',
          message: 'Invalid response format from authentication service',
          statusCode: 502,
        } as ErrorResponse,
        { status: 502 }
      )
    }

    // Validate response structure
    if (
      !responseData ||
      typeof responseData !== 'object' ||
      !('token' in responseData) ||
      !('expiration' in responseData)
    ) {
      console.error(
        'Invalid response structure from external API:',
        responseData
      )
      return NextResponse.json(
        {
          error: 'INVALID_RESPONSE',
          message: 'Authentication service returned invalid response format',
          statusCode: 502,
        } as ErrorResponse,
        { status: 502 }
      )
    }

    const tokenData = responseData as { token: unknown; expiration: unknown }

    // Validate token and expiration types
    if (typeof tokenData.token !== 'string' || !tokenData.token.trim()) {
      console.error('Invalid token in response:', tokenData.token)
      return NextResponse.json(
        {
          error: 'INVALID_RESPONSE',
          message: 'Authentication service returned invalid token',
          statusCode: 502,
        } as ErrorResponse,
        { status: 502 }
      )
    }

    if (
      typeof tokenData.expiration !== 'string' ||
      !tokenData.expiration.trim()
    ) {
      console.error('Invalid expiration in response:', tokenData.expiration)
      return NextResponse.json(
        {
          error: 'INVALID_RESPONSE',
          message: 'Authentication service returned invalid expiration',
          statusCode: 502,
        } as ErrorResponse,
        { status: 502 }
      )
    }

    // Return the successful response
    const tokenResponse: TokenResponse = {
      token: tokenData.token,
      expiration: tokenData.expiration,
    }

    return NextResponse.json(tokenResponse, { status: 200 })
  } catch (error) {
    console.error('Token API route error:', error)

    // Handle network errors and other unexpected errors
    return NextResponse.json(
      {
        error: 'NETWORK_ERROR',
        message: 'Failed to connect to authentication service',
        statusCode: 503,
      } as ErrorResponse,
      { status: 503 }
    )
  }
}

// Only allow POST method
export async function GET() {
  return NextResponse.json(
    {
      error: 'METHOD_NOT_ALLOWED',
      message: 'Only POST method is allowed',
      statusCode: 405,
    } as ErrorResponse,
    { status: 405 }
  )
}
