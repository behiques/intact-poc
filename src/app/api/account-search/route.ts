import { NextRequest, NextResponse } from 'next/server'
import axios from 'axios'

export async function GET(request: NextRequest) {
  const token = request.headers.get('Authorization')

  const { searchParams } = new URL(request.url)
  const AccountName = searchParams.get('AccountName')

  try {
    const response = await axios.get(
      `${process.env.BACKEND_API_URL}/samapi/api/clearance/v2/search?AccountName=${AccountName}`,
      {
        headers: {
          Authorization: token,
        },
      }
    )

    return NextResponse.json({ data: response.data })
  } catch (error) {
    return NextResponse.json(
      { error: error, message: 'Internal Server Error' },
      { status: 500 }
    )
  }
}
