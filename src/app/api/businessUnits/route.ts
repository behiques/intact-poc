import { NextResponse } from 'next/server'

const mockBusinessUnits = [
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
    businessUnitId: 'ANY',
    abbreviation: 'ANYBU',
    description: 'ANY BUSINESS UNIT',
    groupTitle: 'Any Business Unit',
    isActive: true,
    isEligibleForAdmitted: false,
    name: 'ANY BUSINESS UNIT',
    url: null,
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

export async function GET() {
  try {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Return mock data
    return NextResponse.json({ data: mockBusinessUnits })
  } catch (error) {
    return NextResponse.json(
      { error: error, message: 'Internal Server Error' },
      { status: 500 }
    )
  }
}
