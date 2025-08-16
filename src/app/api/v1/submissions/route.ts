import { NextRequest, NextResponse } from 'next/server'
import axios from 'axios'

export async function GET(request: NextRequest) {
  const token = request.headers.get('Authorization')

  const { searchParams } = new URL(request.url)

  // Extract query parameters that the fetchSubmissions.ts expects
  const AssignedToId = searchParams.get('AssignedToId')
  const Fields = searchParams.get('Fields')
  const BusinessUnitsId = searchParams.get('BusinessUnitsId')
  const SubmissionStatuses = searchParams.get('SubmissionStatuses')

  try {
    // Build the query string for the backend API
    const queryParams = new URLSearchParams()

    if (AssignedToId) {
      queryParams.append('AssignedToId', AssignedToId)
    }

    if (Fields) {
      queryParams.append('Fields', Fields)
    }

    if (BusinessUnitsId) {
      queryParams.append('BusinessUnitsId', BusinessUnitsId)
    }

    if (SubmissionStatuses) {
      queryParams.append('SubmissionStatuses', SubmissionStatuses)
    }

    const queryString = queryParams.toString()
    const backendUrl = `${process.env.BACKEND_API_URL}/submissions-api/api/v1/submissions${queryString ? `?${queryString}` : ''}`

    const response = await axios.get(backendUrl, {
      headers: {
        Authorization: token,
      },
    })

    return NextResponse.json({ data: response.data })
  } catch (error) {
    return NextResponse.json(
      { error: error, message: 'Internal Server Error' },
      { status: 500 }
    )
  }
}
