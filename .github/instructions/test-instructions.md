# Test Generation Instructions

Guide to generate consistent, maintainable tests using TypeScript and Vitest.

---

## Goals

1. Generate **unit**, **integration**, or **e2e** tests as specified.
2. Cover: happy paths, edge cases, error conditions, boundary values.
3. Adhere to naming conventions and folder structure.

---

## Test Context

- Tech stack: **NextJS**, **TypeScript**, **Vitest**.
- Test files use `.spec.ts` or `.test.ts`.
- Ensure `vitest.config.ts` supports path aliases.
- All unit and integration tests must use **Vitest** (`import { describe, it, expect } from "vitest"`).
- Exactly one top-level `describe()` per spec file.

---

### Testing Standards

```tsx
// Component.test.tsx - Comprehensive component testing
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Component } from './Component'

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: { queries: { retry: false } },
  })

const renderWithProviders = (ui: React.ReactElement) => {
  const queryClient = createTestQueryClient()
  return render(
    <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>
  )
}

describe('Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders loading state correctly', () => {
    renderWithProviders(<Component isLoading={true} />)
    expect(screen.getByRole('progressbar')).toBeInTheDocument()
  })

  it('handles user interactions', async () => {
    const onAction = vi.fn()
    renderWithProviders(<Component onAction={onAction} />)

    fireEvent.click(screen.getByRole('button'))
    await waitFor(() => {
      expect(onAction).toHaveBeenCalledWith(expectedId)
    })
  })

  it('meets accessibility requirements', () => {
    renderWithProviders(<Component />)
    expect(screen.getByRole('button')).toHaveAccessibleName()
  })
})
```

### Testing Requirements:

- Unit tests for all hooks and utilities
- Component tests with proper mocking
- Integration tests for critical user flows
- Accessibility testing with jest-axe
- Error boundary testing
- Loading state testing

---

## Best Practices

- Be specific: input types, expected outputs, status codes, exceptions
- Cover edge cases: null, invalid values, missing params
- Use descriptive test names: `"should return 400 when email is missing"`
- Mock dependencies in unit tests; use real Nest app context in integration/e2e.
- Proper lifecycle handling: `beforeEach`, `afterEach` or `afterAll`, close app, reset DB
- Ensure coverage for each code path (happy + edge cases)
- Use `describe` blocks to group related tests, e.g. `describe('UserController')`
- Use `it` blocks for individual test cases, e.g. `it('should create a user successfully')`
- Use `expect` assertions for clarity, e.g. `expect(response.status).toBe(201)`
- Use `beforeAll` for setup that only needs to run once, e.g. database connection
- Use `afterAll` for cleanup that only needs to run once, e.g. closing database connections
- Use `beforeEach` for setup that needs to run before each test, e.g. resetting mocks
- Use `afterEach` for cleanup that needs to run after each test
