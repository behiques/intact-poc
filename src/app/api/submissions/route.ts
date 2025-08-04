import { NextRequest, NextResponse } from 'next/server'
import { mockWorklist, mockInbox } from '@/data/submissions'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('query') || 'inbox'

  try {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Return mock data
    return NextResponse.json({
      data: query === 'inbox' ? mockInbox : mockWorklist,
    })
  } catch (error) {
    return NextResponse.json(
      { error: error, message: 'Internal Server Error' },
      { status: 500 }
    )
  }
}
