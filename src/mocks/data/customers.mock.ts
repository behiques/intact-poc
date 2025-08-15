import {
  Customer,
  CustomerSearchApiResponse,
} from '@/features/submissions/types'

/**
 * Mock data for customer search API response
 * This data is used to simulate the response from the customer search API endpoint.
 */
export const mockCustomersData: Customer[] = [
  {
    customerId: 2307283,
    customerName1: 'Burch Chris',
    customerName2: '',
    businessUnitId: 'I',
    addressId: 3384019,
    addressDescription: '5684 Southern Hills Drive               ',
  },
  {
    customerId: 1981458,
    customerName1: 'Chris          Bruno',
    customerName2: '',
    businessUnitId: 'I',
    addressId: 2335991,
    addressDescription: '814 SOUTH SCOTT STREET                  ',
  },
  {
    customerId: 1981596,
    customerName1: 'Chris          Cozart',
    customerName2: '',
    businessUnitId: 'I',
    addressId: 2336114,
    addressDescription: '56 COURT ST                             ',
  },
  {
    customerId: 2073424,
    customerName1: 'Chris          Hoke',
    customerName2: '',
    businessUnitId: 'I',
    addressId: 2480089,
    addressDescription: '5721 Country Club Terrace               ',
  },
  {
    customerId: 28371490,
    customerName1: 'Chris Broyles',
    customerName2: '',
    businessUnitId: 'I',
    addressId: 6637230,
    addressDescription: '6333 Riverdale St                       ',
  },
  {
    customerId: 3002443,
    customerName1: 'CHRIS ELLIOTT',
    customerName2: '',
    businessUnitId: 'I',
    addressId: 3447947,
    addressDescription: '6508 EAST NORTH VIEW                    ',
  },
  {
    customerId: 1966970,
    customerName1: 'CHRIS HICKS DBA NORTH TEXAS BO',
    customerName2: '',
    businessUnitId: 'I',
    addressId: 2322560,
    addressDescription: '7 RIKER AVE                             ',
  },
  {
    customerId: 28393771,
    customerName1: 'Chris Ocean Marine',
    customerName2: '',
    businessUnitId: 'I',
    addressId: 6640761,
    addressDescription: '199 SCOTT SWAMP RD                      ',
  },
  {
    customerId: 1981717,
    customerName1: 'CHRIS TABOR & CHRIS HUCKABEE',
    customerName2: '',
    businessUnitId: 'I',
    addressId: 2336212,
    addressDescription: '80 MONROVIA BLVD                        ',
  },
  {
    customerId: 1981277,
    customerName1: 'CHRISTINA L SIMMIE AND PAUL D',
    customerName2: '',
    businessUnitId: 'I',
    addressId: 2335825,
    addressDescription: '18 MEADOWBANK RD                        ',
  },
  {
    customerId: 3002486,
    customerName1: 'CHRISTINE LOWE',
    customerName2: '',
    businessUnitId: 'I',
    addressId: 3447989,
    addressDescription: '1700 BISCAYNE AVE.                      ',
  },
  {
    customerId: 2057522,
    customerName1: 'CHRISTINE WELDON',
    customerName2: '',
    businessUnitId: 'I',
    addressId: 3247695,
    addressDescription: '90 E MESA VERDE LANE                    ',
  },
  {
    customerId: 1981795,
    customerName1: 'CHRISTOPHER A. & KATHLEEN ZAA',
    customerName2: '',
    businessUnitId: 'I',
    addressId: 2336277,
    addressDescription: '393 WARRENE ROAD                        ',
  },
  {
    customerId: 1981627,
    customerName1: 'MICHAEL R & CHRISTINA WOOD',
    customerName2: '',
    businessUnitId: 'I',
    addressId: 2336142,
    addressDescription: '6805 FOX RUN                            ',
  },
  {
    customerId: 1981353,
    customerName1: 'Paper Now, Inc.; Chris Harvey',
    customerName2: '',
    businessUnitId: 'I',
    addressId: 2752156,
    addressDescription: '1712 Throwbridge Lane                   ',
  },
  {
    customerId: 27657961,
    customerName1: 'Test 2 Chris',
    customerName2: '',
    businessUnitId: 'I',
    addressId: 3447703,
    addressDescription: '100 WALL ST                             ',
  },
  {
    customerId: 27657960,
    customerName1: 'Test Chris',
    customerName2: '',
    businessUnitId: 'I',
    addressId: 3447703,
    addressDescription: '100 WALL ST                             ',
  },
]

/**
 * Helper to get mock customer search API response
 * This data is used to simulate the response from the customer search API endpoint. API response
 */
export const getMockCustomers = (): CustomerSearchApiResponse => {
  return {
    data: mockCustomersData,
  }
}
