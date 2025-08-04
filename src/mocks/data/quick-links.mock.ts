import type { QuickLink, QuickLinksApiResponse } from '@/features/header/types'

/**
 * Mock data for quick links
 */
export const mockQuickLinksData: QuickLink[] = [
  {
    name: 'Dashboard',
    url: '/',
  },
  {
    name: 'Account Search',
    url: '/account-search',
  },
  {
    name: 'Reports',
    url: '/reports',
  },
  {
    name: 'Settings',
    url: '/settings',
  },
  {
    name: 'Help',
    url: '/help',
  },
]

/**
 * Helper to get mock quick links API response
 */
export const getMockQuickLinks = (): QuickLinksApiResponse => {
  return {
    data: mockQuickLinksData,
  }
}
