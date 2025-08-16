import axios from 'axios'
import { NextResponse } from 'next/server'

export const POST = async (request: Request) => {
  const token = request.headers.get('Authorization')
  const payload = await request.json()

  // Simple validation
  if (!payload.name.name1 || !payload.producerCode) {
    return new Response(
      JSON.stringify({ message: 'Missing required fields' }),
      { status: 400 }
    )
  }

  try {
    const response = await axios.post(
      `${process.env.BACKEND_API_URL}/t/account-api/api/accountmanagement/v2/accounts`,
      payload,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    )

    return new NextResponse(response.data, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { message: 'Failed to create account', error },
      { status: 500 }
    )
  }
}
