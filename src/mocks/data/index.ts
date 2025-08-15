/**
 * Central export for all mock data
 * Note: Not using barrel exports per project guidelines,
 * but this index is specifically for mock data organization
 */

export { getMockAccountsForSearch, mockAccountsData } from './accounts.mock'
export {
  getMockBusinessUnits,
  mockBusinessUnitsData,
} from './business-units.mock'
export { getMockProducers, mockProducersData } from './producers.mock'
export { getMockContacts, mockContactsData } from './contacts.mock'
export {
  getMockFinancialCloseDate,
  mockFinancialCloseDateData,
} from './financial-close-date.mock'
export { getMockQuickLinks, mockQuickLinksData } from './quick-links.mock'
export { getMockSubmissions, mockSubmissionsData } from './submissions.mock'
export {
  getMockSubmissionsInbox,
  mockSubmissionsInboxData,
} from './submissions-inbox.mock'
export {
  getMockSubmissionsWorklist,
  mockSubmissionsWorklistData,
} from './submissions-worklist.mock'

export { getMockTerritories, mockTerritoriesData } from './territories.mock'
export { getMockSICs, mockSICsData } from './sics.mock'
export {
  getMockLegalEntities,
  mockLegalEntitiesData,
} from './legal-entities.mock'
