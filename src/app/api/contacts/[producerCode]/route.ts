import { NextResponse } from 'next/server'
import { z } from 'zod'
import { getMockContacts } from '../../../../mocks/data/contacts.mock'
import { ContactsQueryParamsSchema } from '../../../../features/account-search/types'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ producerCode: string }> }
) {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { producerCode } = await params
    const url = new URL(request.url)

    // Parse query parameters
    const queryParams = {
      ProducerContactId: url.searchParams.get('ProducerContactId')
        ? Number(url.searchParams.get('ProducerContactId'))
        : undefined,
      Fields: url.searchParams.get('Fields') || undefined,
    }

    // Validate query parameters
    const validatedParams = ContactsQueryParamsSchema.parse(queryParams)

    // Get mock data filtered by query parameters
    // Note: producerCode parameter is reserved for future API integration with:
    // /common-api/api/v1/common/producers/${producerCode}/contacts
    const mockResponse = getMockContacts(validatedParams)

    return NextResponse.json(mockResponse)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid query parameters', details: error.errors },
        { status: 400 }
      )
    }
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
