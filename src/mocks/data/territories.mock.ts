import { Territory, TerritoryApiResponse } from '@/features/submissions/types'

/**
 * Mock data for territories
 */
export const mockTerritoriesData: Territory[] = [
  {
    businessUnitId: 'O',
    description: 'ACCEPTANCE TESTING',
    groupOrder: 0,
    isActive: true,
    name: 'ACCEPTANCE TESTING',
    value: '098',
  },
  {
    businessUnitId: 'O',
    description: 'MID AMERICA',
    groupOrder: 0,
    isActive: true,
    name: 'MID AMERICA',
    value: '128',
  },
  {
    businessUnitId: 'O',
    description: 'NMTC',
    groupOrder: 0,
    isActive: true,
    name: 'NMTC',
    value: '155',
  },
  {
    businessUnitId: 'O',
    description: 'NORTH',
    groupOrder: 0,
    isActive: true,
    name: 'NORTH',
    value: '126',
  },
  {
    businessUnitId: 'O',
    description: 'ROCKY MOUNTAIN',
    groupOrder: 0,
    isActive: true,
    name: 'ROCKY MOUNTAIN',
    value: '153',
  },
  {
    businessUnitId: 'O',
    description: 'SOUTH',
    groupOrder: 0,
    isActive: true,
    name: 'SOUTH',
    value: '154',
  },
  {
    businessUnitId: 'O',
    description: 'WEST COAST',
    groupOrder: 0,
    isActive: true,
    name: 'WEST COAST',
    value: '124',
  },
]

/**
 * Helper to get mock territories API response
 */
export const getMockTerritories = (): TerritoryApiResponse => {
  return {
    data: mockTerritoriesData,
  }
}
