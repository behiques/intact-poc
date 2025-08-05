import type {
  Contact,
  ContactApiResponse,
  ContactsQueryParams,
} from '@/features/account-search/types'

/**
 * Mock data for contacts with comprehensive test scenarios
 * Includes various data patterns for testing ProducerContactId filtering and Fields selection
 */
export const mockContactsData: Contact[] = [
  {
    producerContactId: 2092049,
    firstName: 'FRODO',
    lastName: 'BAGGINS',
    email: 'frodo.baggins@the-shire.com',
    phone: '5553244399',
  },
  {
    producerContactId: 227910,
    firstName: 'HARRY',
    lastName: 'TRUMAN',
    email: 'harryt@aon.com',
    phone: '5058896700',
  },
  {
    producerContactId: 101995,
    firstName: 'HIGGINS',
    lastName: 'MANKER',
    email: undefined,
    phone: '213-630-3200',
  },
  {
    producerContactId: 166845,
    firstName: 'IAN',
    lastName: 'BLACKBURN',
    email: 'Ian_Blackburn@aon.com',
    phone: '2067494859',
  },
  {
    producerContactId: 102019,
    firstName: 'IDA',
    lastName: 'HAVENS',
    email: undefined,
    phone: '415-486-7000',
  },
  {
    producerContactId: 185029,
    firstName: 'AARON',
    lastName: 'BAUM',
    email: 'aaron_baum@aon.com',
    phone: '3102346800',
  },
  {
    producerContactId: 101989,
    firstName: 'ADAM',
    lastName: 'GROSZ',
    email: 'adam_grosz@aon.com',
    phone: '213-630-3200',
  },
  {
    producerContactId: 227858,
    firstName: 'ADAM',
    lastName: 'WEST',
    email: 'batman@aon.com',
    phone: '3037584100',
  },
  {
    producerContactId: 149242,
    firstName: 'ALEX',
    lastName: 'EKIZIAN',
    email: 'alex.ekizian@aon.com',
    phone: '8187421415',
  },
  {
    producerContactId: 200127,
    firstName: 'ALICE',
    lastName: 'JOHNSON',
    email: 'alice.johnson@example.com',
    phone: '555-0101',
  },
  {
    producerContactId: 149250,
    firstName: 'ANDREW',
    lastName: 'CHEN',
    email: 'andrew_chen@aon.com',
    phone: undefined,
  },
  {
    producerContactId: 225285,
    firstName: 'JAYDE',
    lastName: 'GRAHAM',
    email: 'jayde.graham@aon.com',
    phone: '4085352804',
  },
  {
    producerContactId: 102001,
    firstName: 'JENNIFER',
    lastName: 'SMITH',
    email: undefined,
    phone: undefined,
  },
  {
    producerContactId: 156067,
    firstName: 'POLISEEK',
    lastName: 'USER',
    email: 'service@aon.com',
    phone: '8665007335',
  },
  {
    producerContactId: 197533,
    firstName: 'QUYNH',
    lastName: 'KHANG',
    email: 'quynh.khang@aon.com',
    phone: '8187420846',
  },
]

/**
 * Filters contacts based on query parameters
 */
export const filterContacts = (params?: ContactsQueryParams): Contact[] => {
  let filtered = [...mockContactsData]

  // Filter by ProducerContactId if provided
  if (params?.ProducerContactId) {
    filtered = filtered.filter(
      (contact) => contact.producerContactId === params.ProducerContactId
    )
  }

  return filtered
}

/**
 * Applies field selection to contacts
 */
export const selectContactFields = (
  contacts: Contact[],
  fields?: string
): Array<Partial<Contact>> => {
  if (!fields) {
    return contacts
  }

  const fieldList = fields.split(',').map((field) => field.trim())

  return contacts.map((contact) => {
    const selected: Record<string, unknown> = {}

    fieldList.forEach((field) => {
      if (field in contact && typeof field === 'string') {
        const key = field as keyof Contact
        const value = contact[key]
        // Include the field even if value is undefined/null
        selected[field] = value
      }
    })

    // Always include producerContactId as it's the primary identifier
    if (!fieldList.includes('producerContactId')) {
      selected.producerContactId = contact.producerContactId
    }

    return selected as Partial<Contact>
  })
}

/**
 * Helper to get mock contacts API response with query parameter support
 */
export const getMockContacts = (
  params?: ContactsQueryParams
): ContactApiResponse => {
  // Filter contacts based on query parameters
  const filteredContacts = filterContacts(params)

  // Apply field selection if Fields parameter is provided
  const finalContacts = selectContactFields(filteredContacts, params?.Fields)

  return {
    data: finalContacts as Contact[],
  }
}

/**
 * Legacy helper for backward compatibility (no parameters)
 */
export const getMockContactsLegacy = (): ContactApiResponse => {
  return {
    data: mockContactsData,
  }
}
