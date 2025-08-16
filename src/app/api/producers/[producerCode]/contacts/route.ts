import { NextRequest, NextResponse } from 'next/server'
import axios from 'axios'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ producerCode: string }> }
) {
  const token = request.headers.get('Authorization')

  const { producerCode } = await params

  try {
    const response = await axios.get(
      `${process.env.BACKEND_API_URL}/common-api/api/v1/common/producers/${producerCode}/contacts`,
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
