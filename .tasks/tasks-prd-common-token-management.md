## Relevant Files

- `src/features/common/api/fetchToken.ts` - Core API functions for token retrieval and management
- `__tests__/features/common/api/fetchToken.test.ts` - Unit tests for token API functions
- `src/features/common/hooks/useToken.ts` - React hooks for token management and auto-refresh
- `__tests__/features/common/hooks/useToken.test.ts` - Unit tests for token hooks
- `src/features/common/hooks/useAuthenticatedApi.ts` - Hook for making authenticated API calls
- `__tests__/features/common/hooks/useAuthenticatedApi.test.ts` - Unit tests for authenticated API hook
- `src/features/common/types/index.ts` - TypeScript interfaces for token and API types
- `src/features/common/utils/tokenDecoder.ts` - JWT token decoding utilities for expiration detection
- `__tests__/features/common/utils/tokenDecoder.test.ts` - Unit tests for token decoder
- `src/features/common/utils/tokenStorage.ts` - Secure token storage utilities
- `__tests__/features/common/utils/tokenStorage.test.ts` - Unit tests for token storage
- `src/features/common/utils/tokenQueue.ts` - Queue management for concurrent token requests
- `__tests__/features/common/utils/tokenQueue.test.ts` - Unit tests for token queue
- `src/features/common/stores/useTokenStore.ts` - Zustand store for token state management
- `__tests__/features/common/stores/useTokenStore.test.ts` - Unit tests for token store
- `src/lib/apiClient.ts` - Enhanced API client with automatic token attachment
- `__tests__/lib/apiClient.test.ts` - Unit tests for API client
- `.env.example` - Updated environment variables configuration

### Notes

- Unit tests are located in the `__tests__` directory mirroring the `src` structure (e.g., `src/features/common/api/fetchToken.ts` has tests in `__tests__/features/common/api/fetchToken.test.ts`).
- Use `pnpm test [optional/path/to/test/file]` to run tests. Running without a path executes all tests found by Vitest configuration.

## Tasks

- [x] 1.0 Environment Configuration and Setup
  - [x] 1.1 Add AUTH_TOKEN_API_URL, BACKEND_API_URL, and USER_SYSTEM_ID environment variables to .env.example
  - [x] 1.2 Create src/features/common directory with complete feature structure (api/, hooks/, types/, utils/, stores/ folders)
  - [x] 1.3 Create src/features/common/types/index.ts with TokenResponse, TokenState, AuthError, and TokenStorageData interfaces
  - [x] 1.4 Set up src/lib/env.ts to validate and export the new environment variables with proper TypeScript types
- [x] 2.0 Core Token Management Implementation
  - [x] 2.1 Implement src/features/common/api/fetchToken.ts with retrieveToken function including proper headers and error handling
  - [x] 2.2 Create src/features/common/utils/tokenDecoder.ts with JWT decode functionality to extract expiration without signature verification
  - [x] 2.3 Implement src/features/common/utils/tokenStorage.ts with secure storage, retrieval, and session clearing functions
  - [x] 2.4 Create src/features/common/stores/useTokenStore.ts with Zustand store for token state, loading states, and error management
  - [x] 2.5 Add token expiration checking logic and automatic refresh timing calculations
- [x] 3.0 React Hooks and Integration Layer
  - [x] 3.1 Implement src/features/common/hooks/useToken.ts with auto-refresh logic, expiration detection, and error handling
  - [x] 3.2 Create src/features/common/hooks/useAuthenticatedApi.ts for making authenticated requests with automatic token attachment
  - [x] 3.3 Add token management integration to existing TanStack Query setup in src/providers/react-query-provider.tsx
  - [x] 3.4 Implement proactive token refresh (5 minutes before expiration) with queue management for concurrent requests
- [x] 4.0 API Client Enhancement
  - [x] 4.1 [Create a comprehensive HTTP client with interceptors and automatic token attachment]
  - [x] 4.2 [Implement request interceptors to automatically attach tokens]
  - [x] 4.3 [Implement response interceptors for 401 error handling]
  - [x] 4.4 [Integrate the queue system for handling concurrent requests]
  - [x] 4.5 [Create environment-based API client instances]
- [ ] 5.0 Testing and Documentation
  - [x] 5.1 Write unit tests for token retrieval, decoding, storage, and store functionality
  - [ ] 5.2 Create unit tests for useToken and useAuthenticatedApi hooks with mock scenarios
  - [ ] 5.3 Implement integration tests for token refresh flow and API client interceptors
  - [ ] 5.4 Add error handling tests for network failures, invalid tokens, and expired tokens
  - [ ] 5.5 Create mock token provider for development/testing environments with configurable responses
  - [ ] 5.6 Add tests for session clearing on browser close and proper cleanup
