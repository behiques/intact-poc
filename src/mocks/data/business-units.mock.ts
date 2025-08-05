import type {
  BusinessUnit,
  BusinessUnitApiResponse,
  BusinessUnitsQueryParams,
} from '@/features/account-search/types'

/**
 * Mock data for business units with both active and inactive units for testing
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
    url: 'https://business-units.api.example.com/entertainment',
  },
  {
    abbreviation: 'HLT',
    businessUnitId: 'D',
    description: 'Healthcare Services Division',
    groupTitle: 'Healthcare Group',
    isActive: true,
    isEligibleForAdmitted: true,
    name: 'Healthcare',
    url: 'https://business-units.api.example.com/healthcare',
  },
  {
    abbreviation: 'CON',
    businessUnitId: 'C',
    description: 'Construction and Engineering Division',
    groupTitle: 'Construction Group',
    isActive: true,
    isEligibleForAdmitted: false,
    name: 'Construction',
    url: 'https://business-units.api.example.com/construction',
  },
  {
    abbreviation: 'FIN',
    businessUnitId: 'F',
    description: 'Financial and Banking Services',
    groupTitle: 'Financial Group',
    isActive: true,
    isEligibleForAdmitted: true,
    name: 'Financial Services',
    url: 'https://business-units.api.example.com/financial',
  },
  {
    abbreviation: 'TEC',
    businessUnitId: 'T',
    description: 'Technology and Software Division',
    groupTitle: 'Technology Group',
    isActive: true,
    isEligibleForAdmitted: true,
    name: 'Technology',
    url: 'https://business-units.api.example.com/technology',
  },
  {
    abbreviation: 'RET',
    businessUnitId: 'R',
    description: 'Retail and Consumer Services',
    groupTitle: 'Retail Group',
    isActive: true,
    isEligibleForAdmitted: true,
    name: 'Retail',
    url: 'https://business-units.api.example.com/retail',
  },
  // Inactive business units for testing ReturnAll parameter
  {
    abbreviation: 'LEG',
    businessUnitId: 'L',
    description: 'Legacy Systems Division (Deprecated)',
    groupTitle: 'Legacy Group',
    isActive: false,
    isEligibleForAdmitted: false,
    name: 'Legacy Systems',
    url: 'https://business-units.api.example.com/legacy',
  },
  {
    abbreviation: 'TST',
    businessUnitId: 'Z',
    description: 'Test Division (Internal Use)',
    groupTitle: 'Test Group',
    isActive: false,
    isEligibleForAdmitted: false,
    name: 'Test Division',
    url: 'https://business-units.api.example.com/test',
  },
]

/**
 * Filters business units based on query parameters
 */
export const filterBusinessUnits = (
  params?: BusinessUnitsQueryParams
): BusinessUnit[] => {
  let filtered = [...mockBusinessUnitsData]

  // Filter by BusinessUnitId if provided
  if (params?.BusinessUnitId) {
    filtered = filtered.filter(
      (unit) => unit.businessUnitId === params.BusinessUnitId
    )
  }

  // Filter by active status (ReturnAll parameter)
  if (!params?.ReturnAll) {
    filtered = filtered.filter((unit) => unit.isActive === true)
  }

  return filtered
}

/**
 * Applies field selection to business units
 */
export const selectBusinessUnitFields = (
  units: BusinessUnit[],
  fields?: string
): Array<Partial<BusinessUnit>> => {
  if (!fields) {
    return units
  }

  const fieldList = fields.split(',').map((field) => field.trim())

  return units.map((unit) => {
    const selected: Record<string, unknown> = {}

    fieldList.forEach((field) => {
      if (field in unit && typeof field === 'string') {
        const key = field as keyof BusinessUnit
        const value = unit[key]
        if (value !== undefined) {
          selected[field] = value
        }
      }
    })

    // Always include businessUnitId as it's the primary identifier
    if (!fieldList.includes('businessUnitId')) {
      selected.businessUnitId = unit.businessUnitId
    }

    return selected as Partial<BusinessUnit>
  })
}

/**
 * Helper to get mock business units API response with query parameter support
 */
export const getMockBusinessUnits = (
  params?: BusinessUnitsQueryParams
): BusinessUnitApiResponse => {
  // Filter business units based on query parameters
  const filteredUnits = filterBusinessUnits(params)

  // Apply field selection if Fields parameter is provided
  const finalUnits = selectBusinessUnitFields(filteredUnits, params?.Fields)

  return {
    data: finalUnits as BusinessUnit[],
  }
}

/**
 * Legacy helper for backward compatibility (no parameters)
 */
export const getMockBusinessUnitsLegacy = (): BusinessUnitApiResponse => {
  return {
    data: mockBusinessUnitsData.filter((unit) => unit.isActive === true),
  }
}
