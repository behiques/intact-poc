import type {
  BusinessUnit,
  BusinessUnitApiResponse,
} from '@/features/account-search/types'

/**
 * Mock data for business units
 */
export const mockBusinessUnitsData: BusinessUnit[] = [
  {
    abbreviation: 'ENT',
    businessUnitId: 'E',
    description: 'Entertainment and Media Division',
    groupTitle: 'Media Group',
    isActive: true,
    isEligibleForAdmitted: true,
    name: 'Entertainment',
    url: '/business-units/entertainment',
  },
  {
    abbreviation: 'HLT',
    businessUnitId: 'D',
    description: 'Healthcare Services Division',
    groupTitle: 'Healthcare Group',
    isActive: true,
    isEligibleForAdmitted: true,
    name: 'Healthcare',
    url: '/business-units/healthcare',
  },
  {
    abbreviation: 'CON',
    businessUnitId: 'C',
    description: 'Construction and Engineering Division',
    groupTitle: 'Construction Group',
    isActive: true,
    isEligibleForAdmitted: false,
    name: 'Construction',
    url: '/business-units/construction',
  },
  {
    abbreviation: 'FIN',
    businessUnitId: 'F',
    description: 'Financial and Banking Services',
    groupTitle: 'Financial Group',
    isActive: true,
    isEligibleForAdmitted: true,
    name: 'Financial Services',
    url: '/business-units/financial',
  },
  {
    abbreviation: 'TEC',
    businessUnitId: 'T',
    description: 'Technology and Software Division',
    groupTitle: 'Technology Group',
    isActive: true,
    isEligibleForAdmitted: true,
    name: 'Technology',
    url: '/business-units/technology',
  },
  {
    abbreviation: 'RET',
    businessUnitId: 'R',
    description: 'Retail and Consumer Services',
    groupTitle: 'Retail Group',
    isActive: true,
    isEligibleForAdmitted: true,
    name: 'Retail',
    url: '/business-units/retail',
  },
]

/**
 * Helper to get mock business units API response
 */
export const getMockBusinessUnits = (): BusinessUnitApiResponse => {
  return {
    data: mockBusinessUnitsData,
  }
}
