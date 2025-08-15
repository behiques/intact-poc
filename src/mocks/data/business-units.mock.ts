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
    businessUnitId: 'H',
    abbreviation: 'OBA',
    description: 'ACCIDENT & HEALTH',
    groupTitle: 'OneBeacon Accident Group',
    isActive: true,
    isEligibleForAdmitted: false,
    name: 'ACCIDENT & HEALTH',
    url: 'https://www.intactspecialty.com/accident-health',
  },
  {
    businessUnitId: '4',
    abbreviation: 'Canada',
    description: 'CANADA CROSS BORDER',
    groupTitle: 'OneBeacon Cross Border',
    isActive: true,
    isEligibleForAdmitted: false,
    name: 'CANADA CROSS BORDER',
    url: null,
  },
  {
    businessUnitId: 'E',
    abbreviation: 'OBE',
    description: 'ENTERTAINMENT',
    groupTitle: 'OneBeacon Entertainment',
    isActive: true,
    isEligibleForAdmitted: true,
    name: 'ENTERTAINMENT',
    url: 'https://www.intactspecialty.com/entertainment',
  },
  {
    businessUnitId: 'U',
    abbreviation: 'Enviro',
    description: 'ENVIRONMENTAL',
    groupTitle: 'OneBeacon Environmental',
    isActive: true,
    isEligibleForAdmitted: false,
    name: 'ENVIRONMENTAL',
    url: 'https://www.intactspecialty.com/environmental',
  },
  {
    businessUnitId: 'Y',
    abbreviation: 'FI',
    description: 'FINANCIAL INSTITUTIONS',
    groupTitle: 'OneBeacon Financial Institutions',
    isActive: true,
    isEligibleForAdmitted: true,
    name: 'FINANCIAL INSTITUTIONS',
    url: 'https://www.intactspecialty.com/financial-institutions',
  },
  {
    businessUnitId: 'F',
    abbreviation: 'FS',
    description: 'FINANCIAL SERVICES',
    groupTitle: 'OneBeacon Financial Services',
    isActive: true,
    isEligibleForAdmitted: false,
    name: 'FINANCIAL SERVICES',
    url: 'https://www.intactspecialty.com/financial-services',
  },
  {
    businessUnitId: 'GN',
    abbreviation: 'GNUS',
    description: 'GLOBAL NETWORK US SERVICING',
    groupTitle: 'Global Network US Servicing',
    isActive: true,
    isEligibleForAdmitted: false,
    name: 'GLOBAL NETWORK US SERVICING',
    url: null,
  },
  {
    businessUnitId: 'O',
    abbreviation: 'IM',
    description: 'INLAND MARINE',
    groupTitle: 'OneBeacon PIM',
    isActive: true,
    isEligibleForAdmitted: false,
    name: 'INLAND MARINE',
    url: 'https://www.intactspecialty.com/inland-marine',
  },
  {
    businessUnitId: 'V',
    abbreviation: 'ML',
    description: 'MANAGEMENT LIABILITY',
    groupTitle: 'OneBeacon Management Liability',
    isActive: true,
    isEligibleForAdmitted: false,
    name: 'MANAGEMENT LIABILITY',
    url: 'https://www.intactspecialty.com/management-liability',
  },
  {
    businessUnitId: 'I',
    abbreviation: 'IMU',
    description: 'OCEAN MARINE',
    groupTitle: 'OneBeacon Specialty IMU',
    isActive: true,
    isEligibleForAdmitted: false,
    name: 'OCEAN MARINE',
    url: 'https://www.intactspecialty.com/ocean-marine',
  },
  {
    businessUnitId: 'RE',
    abbreviation: 'RenEng',
    description: 'RENEWABLE ENERGY',
    groupTitle: 'Renewable Energy',
    isActive: true,
    isEligibleForAdmitted: false,
    name: 'RENEWABLE ENERGY',
    url: null,
  },
  {
    businessUnitId: 'R',
    abbreviation: 'OBSP',
    description: 'SPECIALTY PROPERTY',
    groupTitle: 'OneBeacon Specialty Property',
    isActive: true,
    isEligibleForAdmitted: true,
    name: 'SPECIALTY PROPERTY',
    url: 'https://www.intactspecialty.com/specialty-property',
  },
  {
    businessUnitId: 'K',
    abbreviation: 'Surety',
    description: 'SURETY',
    groupTitle: 'OneBeacon Surety Group',
    isActive: true,
    isEligibleForAdmitted: false,
    name: 'SURETY',
    url: 'https://www.intactspecialty.com/surety',
  },
  {
    businessUnitId: 'T',
    abbreviation: 'Tech',
    description: 'TECHNOLOGY',
    groupTitle: 'OneBeacon Technology Insurance',
    isActive: true,
    isEligibleForAdmitted: true,
    name: 'TECHNOLOGY',
    url: 'https://www.intactspecialty.com/technology',
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
