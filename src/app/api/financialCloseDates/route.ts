import { NextResponse } from 'next/server'

const mockData = [
  {
    month: 'January',
    premium: '01/27/2025',
    day: 'Monday',
    loss: '01/28/2025',
  },
  {
    month: 'February',
    premium: '02/24/2025',
    day: 'Monday',
    loss: '02/25/2025',
  },
  {
    month: 'March (3)',
    premium: '03/25/2025',
    day: 'Tuesday',
    loss: '03/25/2025',
  },
  {
    month: 'April',
    premium: '04/24/2025',
    day: 'Thursday',
    loss: '04/25/2025',
  },
  { month: 'May', premium: '05/23/2025', day: 'Friday', loss: '05/27/2025' },
  {
    month: 'June (3)',
    premium: '06/23/2025',
    day: 'Tuesday',
    loss: '06/24/2025',
  },
  { month: 'July', premium: '07/25/2025', day: 'Friday', loss: '07/28/2025' },
  { month: 'August', premium: '08/25/2025', day: 'Monday', loss: '08/26/2025' },
]

export async function GET() {
  try {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Return mock data
    return NextResponse.json({ data: mockData })
  } catch (error) {
    return NextResponse.json(
      { error: error, message: 'Internal Server Error' },
      { status: 500 }
    )
  }
}
