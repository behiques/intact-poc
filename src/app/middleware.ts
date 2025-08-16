import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (pathname.startsWith('/api')) {
    const token = request.headers.get('Authorization')

    if (!token) {
      return NextResponse.json(
        {
          error: 'UNAUTHORIZED',
          message: 'No token provided',
          statusCode: 401,
        },
        { status: 401 }
      )
    }
  }

  // Optionally, you can verify the token here

  return NextResponse.next()
}
