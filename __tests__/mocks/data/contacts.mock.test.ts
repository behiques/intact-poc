import { describe, it, expect } from 'vitest'
import {
  getMockContacts,
  filterContacts,
  selectContactFields,
  mockContactsData,
} from '../../../src/mocks/data/contacts.mock'
import type { ContactsQueryParams } from '../../../src/features/account-search/types'

describe('Contacts Mock Data', () => {
  describe('Basic Data Structure', () => {
    it('should have valid mock data with expected structure', () => {
      expect(mockContactsData).toBeDefined()
      expect(Array.isArray(mockContactsData)).toBe(true)
      expect(mockContactsData.length).toBeGreaterThan(0)

      // Check first contact has all required fields
      const firstContact = mockContactsData[0]
      expect(firstContact).toHaveProperty('producerContactId')
      expect(firstContact).toHaveProperty('firstName')
      expect(firstContact).toHaveProperty('lastName')
      expect(typeof firstContact.producerContactId).toBe('number')
      expect(typeof firstContact.firstName).toBe('string')
      expect(typeof firstContact.lastName).toBe('string')
    })

    it('should include contacts with various data patterns', () => {
      // Should have contacts with emails
      const withEmail = mockContactsData.filter((c) => c.email)
      expect(withEmail.length).toBeGreaterThan(0)

      // Should have contacts without emails
      const withoutEmail = mockContactsData.filter((c) => !c.email)
      expect(withoutEmail.length).toBeGreaterThan(0)

      // Should have contacts with phones
      const withPhone = mockContactsData.filter((c) => c.phone)
      expect(withPhone.length).toBeGreaterThan(0)

      // Should have contacts without phones
      const withoutPhone = mockContactsData.filter((c) => !c.phone)
      expect(withoutPhone.length).toBeGreaterThan(0)
    })
  })

  describe('filterContacts Function', () => {
    it('should return all contacts when no parameters provided', () => {
      const result = filterContacts()
      expect(result).toEqual(mockContactsData)
      expect(result.length).toBe(mockContactsData.length)
    })

    it('should return all contacts when empty parameters provided', () => {
      const result = filterContacts({})
      expect(result).toEqual(mockContactsData)
      expect(result.length).toBe(mockContactsData.length)
    })

    it('should filter by ProducerContactId correctly', () => {
      const params: ContactsQueryParams = { ProducerContactId: 2092049 }
      const result = filterContacts(params)

      expect(result.length).toBe(1)
      expect(result[0].producerContactId).toBe(2092049)
      expect(result[0].firstName).toBe('FRODO')
      expect(result[0].lastName).toBe('BAGGINS')
    })

    it('should return empty array for non-existent ProducerContactId', () => {
      const params: ContactsQueryParams = { ProducerContactId: 999999 }
      const result = filterContacts(params)

      expect(result.length).toBe(0)
      expect(Array.isArray(result)).toBe(true)
    })

    it('should handle multiple valid ProducerContactIds in separate calls', () => {
      const testIds = [2092049, 227910, 101995]

      testIds.forEach((id) => {
        const params: ContactsQueryParams = { ProducerContactId: id }
        const result = filterContacts(params)
        expect(result.length).toBe(1)
        expect(result[0].producerContactId).toBe(id)
      })
    })
  })

  describe('selectContactFields Function', () => {
    const testContacts = mockContactsData.slice(0, 3) // Use first 3 contacts for testing

    it('should return all contacts unchanged when no fields specified', () => {
      const result = selectContactFields(testContacts)
      expect(result).toEqual(testContacts)
    })

    it('should return all contacts unchanged when fields is undefined', () => {
      const result = selectContactFields(testContacts, undefined)
      expect(result).toEqual(testContacts)
    })

    it('should select only specified fields', () => {
      const result = selectContactFields(testContacts, 'lastName,email')

      result.forEach((contact, index) => {
        expect(Object.keys(contact)).toContain('lastName')
        expect(Object.keys(contact)).toContain('email')
        expect(Object.keys(contact)).toContain('producerContactId') // Always included
        expect(contact.lastName).toBe(testContacts[index].lastName)
        expect(contact.email).toBe(testContacts[index].email)
        expect(contact.producerContactId).toBe(
          testContacts[index].producerContactId
        )

        // Should not include other fields
        expect(Object.keys(contact)).not.toContain('firstName')
        expect(Object.keys(contact)).not.toContain('phone')
      })
    })

    it('should always include producerContactId even if not requested', () => {
      const result = selectContactFields(testContacts, 'firstName,lastName')

      result.forEach((contact) => {
        expect(Object.keys(contact)).toContain('producerContactId')
        expect(Object.keys(contact)).toContain('firstName')
        expect(Object.keys(contact)).toContain('lastName')
      })
    })

    it('should handle single field selection', () => {
      const result = selectContactFields(testContacts, 'email')

      result.forEach((contact, index) => {
        expect(Object.keys(contact)).toContain('email')
        expect(Object.keys(contact)).toContain('producerContactId') // Always included
        expect(contact.email).toBe(testContacts[index].email)
        expect(contact.producerContactId).toBe(
          testContacts[index].producerContactId
        )

        // Should not include other fields
        expect(Object.keys(contact)).not.toContain('firstName')
        expect(Object.keys(contact)).not.toContain('lastName')
        expect(Object.keys(contact)).not.toContain('phone')
      })
    })

    it('should handle whitespace in field names', () => {
      const result = selectContactFields(testContacts, ' firstName , lastName ')

      result.forEach((contact) => {
        expect(Object.keys(contact)).toContain('firstName')
        expect(Object.keys(contact)).toContain('lastName')
        expect(Object.keys(contact)).toContain('producerContactId') // Always included
      })
    })

    it('should ignore invalid field names', () => {
      const result = selectContactFields(
        testContacts,
        'firstName,invalidField,lastName'
      )

      result.forEach((contact) => {
        expect(Object.keys(contact)).toContain('firstName')
        expect(Object.keys(contact)).toContain('lastName')
        expect(Object.keys(contact)).toContain('producerContactId')
        expect(Object.keys(contact)).not.toContain('invalidField')
      })
    })
  })

  describe('getMockContacts Function', () => {
    it('should return all contacts with no parameters', () => {
      const result = getMockContacts()

      expect(result).toHaveProperty('data')
      expect(Array.isArray(result.data)).toBe(true)
      expect(result.data.length).toBe(mockContactsData.length)
      expect(result.data).toEqual(mockContactsData)
    })

    it('should return empty parameters result', () => {
      const result = getMockContacts({})

      expect(result).toHaveProperty('data')
      expect(Array.isArray(result.data)).toBe(true)
      expect(result.data.length).toBe(mockContactsData.length)
    })

    it('should filter by ProducerContactId', () => {
      const params: ContactsQueryParams = { ProducerContactId: 2092049 }
      const result = getMockContacts(params)

      expect(result.data.length).toBe(1)
      expect(result.data[0].producerContactId).toBe(2092049)
    })

    it('should apply field selection', () => {
      const params: ContactsQueryParams = { Fields: 'firstName,email' }
      const result = getMockContacts(params)

      expect(result.data.length).toBe(mockContactsData.length)
      result.data.forEach((contact) => {
        expect(Object.keys(contact)).toContain('firstName')
        expect(Object.keys(contact)).toContain('email')
        expect(Object.keys(contact)).toContain('producerContactId') // Always included
        expect(Object.keys(contact)).not.toContain('lastName')
        expect(Object.keys(contact)).not.toContain('phone')
      })
    })

    it('should combine ProducerContactId filtering and field selection', () => {
      const params: ContactsQueryParams = {
        ProducerContactId: 227910,
        Fields: 'lastName,email',
      }
      const result = getMockContacts(params)

      expect(result.data.length).toBe(1)
      expect(result.data[0].producerContactId).toBe(227910)
      expect(Object.keys(result.data[0])).toContain('lastName')
      expect(Object.keys(result.data[0])).toContain('email')
      expect(Object.keys(result.data[0])).toContain('producerContactId')
      expect(Object.keys(result.data[0])).not.toContain('firstName')
      expect(Object.keys(result.data[0])).not.toContain('phone')
    })

    it('should match expected API response structure', () => {
      const result = getMockContacts()

      expect(result).toMatchObject({
        data: expect.any(Array),
      })

      result.data.forEach((contact) => {
        expect(contact).toMatchObject({
          producerContactId: expect.any(Number),
          firstName: expect.any(String),
          lastName: expect.any(String),
        })
      })
    })
  })
})
