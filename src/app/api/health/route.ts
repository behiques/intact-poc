import { NextResponse } from 'next/server'

/**
 * Health Check API Route
 * Simple endpoint to verify the API router is working
 */
export async function GET() {
  return NextResponse.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    routes: {
      health: '/api/health',
      token: '/api/auth/token',
    },
  })
}
