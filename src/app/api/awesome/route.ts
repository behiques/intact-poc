import { NextRequest, NextResponse } from 'next/server'
import { mockAwesomeData } from '@/features/awesome-feature/api/fetchAwesome'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 100))

    // Return mock data with pagination
    return NextResponse.json({
      ...mockAwesomeData,
      page,
      limit,
    })
  } catch (error) {
    console.log({ error })
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Simulate creating a new item
    const newItem = {
      id: Date.now().toString(),
      title: body.title,
      description: body.description,
      createdAt: new Date().toISOString(),
      isActive: true,
      priority: body.priority || 'medium',
      tags: body.tags || [],
    }

    return NextResponse.json(newItem, { status: 201 })
  } catch (error) {
    console.log({ error })
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}
