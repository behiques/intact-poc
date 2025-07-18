# 🛡️ Instructions

This file provides instructions for GitHub Copilot to understand the architecture, conventions, and expectations when suggesting code and refactoring within this repository. Follow these guidelines for consistency and project standards based on bulletproof-react principles.

---

## 1. General Guidance

- Always use TypeScript for new code with strict type checking enabled
- Follow bulletproof-react architectural patterns with feature-based organization
- Prioritize code readability, maintainability, and testability
- Generate comprehensive unit and integration tests for all new functionality
- Use proper error boundaries and error handling patterns
- Implement proper loading states and error states in UI components
- Follow security best practices for data validation and sanitization

## 2. Architecture & Project Structure

This project follows bulletproof-react principles with strict feature isolation:

```
src/
├── app/                          # Next.js App Router
│   ├── (feature-routes)/         # Feature-specific routes
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout with error boundary
│   └── page.tsx                  # Home page
├── features/                     # Feature-based modules (CORE PRINCIPLE)
│   └── feature-name/             # Self-contained feature
│       ├── api/                  # API calls & TanStack Query hooks
│       ├── assets/               # Feature-specific static files
│       ├── components/           # UI components scoped to feature
│       │   ├── ComponentName.tsx
│       │   ├── ComponentName.test.tsx
│       │   └── ComponentName.stories.tsx
│       ├── hooks/                # Feature-specific custom hooks
│       ├── stores/               # Feature-scoped state (Zustand)
│       ├── types/                # TypeScript interfaces & schemas
│       └── utils/                # Feature utilities & helpers
├── components/                   # Shared/reusable UI components only
│   └── ui/                       # Base UI components (Button, Input, etc.)
├── hooks/                        # Shared hooks across features
├── lib/                          # Shared utilities, configurations
├── stores/                       # Global state management
├── types/                        # Global types & schemas
└── test/                         # Test setup & utilities
```

### Key Architectural Rules:

1. **Feature Isolation**: Each feature must be completely self-contained
2. **No Barrel Exports**: Use direct imports to prevent bundling issues
3. **Colocation**: Keep related files (component, test, stories) together
4. **Shared vs Feature-Specific**: Only truly reusable code goes in shared folders

## 3. Component Development Standards

### Component Guidelines

- **Single Responsibility**: One component, one purpose
- **Props Interface**: Always define TypeScript interfaces with JSDoc
- **Error Boundaries**: Wrap feature components in error boundaries
- **Loading States**: Handle loading, error, and empty states explicitly
- **Accessibility**: Follow WCAG 2.1 AA guidelines
- **Performance**: Use React.memo, useMemo, useCallback appropriately

### Component Structure Pattern

```tsx
// types/index.ts - Define interfaces with validation schemas
export interface ComponentProps {
  /** Primary data for the component */
  data: DataType
  /** Optional callback for user interactions */
  onAction?: (id: string) => void
  /** Loading state indicator */
  isLoading?: boolean
}

// Component.tsx - Main component with error handling
interface ComponentProps {
  // ... props definition
}

export const Component = ({ data, onAction, isLoading }: ComponentProps) => {
  // Error boundary integration
  // Loading state handling
  // Accessibility attributes
  // Performance optimizations
}

// Component.test.tsx - Comprehensive testing
describe('Component', () => {
  it('handles loading state correctly', () => {})
  it('handles error state correctly', () => {})
  it('calls onAction with correct parameters', () => {})
  it('meets accessibility requirements', () => {})
})

// Component.stories.tsx - All component states
export default {
  title: 'Features/FeatureName/Component',
  component: Component,
} as Meta

export const Default: Story = {}
export const Loading: Story = {}
export const Error: Story = {}
export const Empty: Story = {}
```

## 4. API Layer Standards

### TanStack Query Implementation

```tsx
// api/endpoints.ts - API functions with error handling
export const fetchData = async (
  params: FetchParams
): Promise<ApiResponse<Data>> => {
  try {
    const response = await fetch(`/api/endpoint`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })

    if (!response.ok) {
      throw new ApiError(`Failed to fetch: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    throw new ApiError('Network error', error)
  }
}

// api/hooks.ts - Query hooks with proper error handling
export const useDataQuery = (params: FetchParams) => {
  return useQuery({
    queryKey: ['data', params],
    queryFn: () => fetchData(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: (failureCount, error) => {
      // Custom retry logic
      return failureCount < 3 && !isClientError(error)
    },
    throwOnError: true, // Let error boundaries handle errors
  })
}
```

### API Standards:

- Use TanStack Query for all server state
- Implement proper error handling with custom error classes
- Add retry logic for network failures
- Use optimistic updates for mutations
- Implement proper cache invalidation strategies

## 5. State Management Patterns

### Zustand for Feature-Scoped State

```tsx
// stores/useFeatureStore.ts - Feature-specific state
interface FeatureState {
  data: FeatureData[]
  selectedItem: FeatureData | null
  filters: FilterState
  // Actions
  setData: (data: FeatureData[]) => void
  selectItem: (item: FeatureData | null) => void
  updateFilters: (filters: Partial<FilterState>) => void
  reset: () => void
}

export const useFeatureStore = create<FeatureState>((set, get) => ({
  // Initial state
  data: [],
  selectedItem: null,
  filters: initialFilters,

  // Actions with immer for immutability
  setData: (data) => set({ data }),
  selectItem: (selectedItem) => set({ selectedItem }),
  updateFilters: (newFilters) =>
    set((state) => ({
      filters: { ...state.filters, ...newFilters },
    })),
  reset: () => set(initialState),
}))
```

### Global State Guidelines:

- Use Zustand for feature-scoped state management
- Use React Context only for dependency injection
- Implement proper state persistence when needed
- Follow immutability principles
- Add state devtools for debugging

## 6. Testing Strategy

- Unit tests for all hooks and utilities
- Component tests with proper mocking
- Integration tests for critical user flows
- Accessibility testing with jest-axe
- Error boundary testing
- Loading state testing

## 7. Error Handling & Performance

### Error Handling Pattern

```tsx
// lib/errors.ts - Custom error classes
export class ApiError extends Error {
  constructor(
    message: string,
    public status?: number,
    public originalError?: unknown
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

// components/ErrorBoundary.tsx - Feature error boundaries
export const FeatureErrorBoundary = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onError={(error, errorInfo) => {
        console.error('Feature error:', error, errorInfo)
        // Send to monitoring service
      }}
    >
      {children}
    </ErrorBoundary>
  )
}
```

### Performance Optimizations

- Use React.memo for expensive components
- Implement proper code splitting with React.lazy
- Use useMemo/useCallback for expensive calculations
- Implement virtual scrolling for large lists
- Optimize bundle size with proper imports

## 8. Security & Validation

### Data Validation with Zod

```tsx
// types/schemas.ts - Validation schemas
import { z } from 'zod'

export const UserSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  name: z.string().min(1).max(100),
})

export type User = z.infer<typeof UserSchema>

// Validate API responses
export const validateApiResponse = <T>(schema: z.ZodSchema<T>, data: unknown): T => {
  const result = schema.safeParse(data)
  if (!result.success) {
    throw new ApiError('Invalid API response', 422, result.error)
  }
  return result.data
}
```

### Security Guidelines:

- Validate all external data with Zod schemas
- Sanitize user inputs to prevent XSS
- Use HTTPS for all API calls
- Implement proper CORS policies
- Add CSP headers for security

## 9. Styling & UI Standards

### Tailwind CSS Guidelines

```tsx
// Use utility classes with proper organization
className="
  flex items-center justify-between
  w-full max-w-md
  px-4 py-2
  text-sm font-medium text-gray-900
  bg-white border border-gray-300 rounded-md
  hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500
  disabled:opacity-50 disabled:cursor-not-allowed
"

// Use CSS variables for theming
// Group related utilities together
// Follow responsive design patterns
```

### UI Component Standards:

- Build a consistent design system
- Use compound component patterns for complex UI
- Implement proper focus management
- Support dark mode when applicable
- Follow mobile-first responsive design

## 10. Import Strategy & Code Organization

### Import Guidelines

```tsx
// ✅ Good - Direct imports with proper grouping
// External libraries
import React from 'react'
import { useQuery } from '@tanstack/react-query'

// Internal shared utilities
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/Button'

// Feature-specific imports
import { useFeatureStore } from '../stores/useFeatureStore'
import { FeatureCard } from '../components/FeatureCard'
import type { FeatureData } from '../types'

// ❌ Bad - Barrel exports or circular dependencies
import { FeatureCard } from '../components' // Don't use barrel exports
```

## 11. Development Commands & Workflow

### Primary Commands

- `pnpm dev` - Start development server with hot reload
- `pnpm build` - Production build with optimization
- `pnpm test` - Run all tests with coverage
- `pnpm test:watch` - Watch mode for TDD
- `pnpm lint` - ESLint + TypeScript checking
- `pnpm format` - Prettier formatting
- `pnpm storybook` - Component documentation
- `pnpm type-check` - TypeScript validation

### Code Quality Standards

- Follow ESLint rules strictly
- Use Prettier for consistent formatting
- Implement Husky pre-commit hooks
- Maintain high test coverage (>80%)
- Use TypeScript strict mode
- Follow semantic commit messages

---

## Best Practices Summary

1. **Feature Isolation**: Keep features completely self-contained
2. **Error First**: Always handle loading, error, and empty states
3. **Type Safety**: Use TypeScript with strict configuration
4. **Testing**: Always use Vitest. Write tests for all components and features.
5. **Performance**: Optimize for Core Web Vitals
6. **Accessibility**: Follow WCAG 2.1 AA guidelines
7. **Security**: Validate and sanitize all data
8. **Documentation**: Document components in Storybook
9. **Consistency**: Follow established patterns and conventions
10. **Monitoring**: Implement proper error tracking and analytics

When generating code, always consider the full user experience including loading states, error handling, accessibility, and performance implications.

---

## Required File Checks

Before generating any of the following, you **MUST first check the specific instruction files:**

### Commit Messages

- **ALWAYS** read `.github/instructions/commit-message-instructions.md` before drafting any commit message
- Follow the exact format, type conventions, and Jira issue key requirements specified
- Ensure compliance with description length limits and imperative mood requirements

### Tests

- **ALWAYS** read `.github/instructions/test-instructions.md` before writing or modifying test code
- Follow the testing patterns, naming conventions, and coverage requirements specified
- Use the recommended testing frameworks and assertion styles as outlined

Failure to check these instruction files may result in non-compliant commit messages, pull requests, or tests that don't meet project standards.
