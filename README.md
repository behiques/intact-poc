# Intact POC - Bulletproof React Architecture

A Next.js TypeScript application implementing the [bulletproof-react](https://github.com/alan2207/bulletproof-react) feature-based architecture patterns.

## 🏗️ Architecture Overview

This project follows the bulletproof-react principles with a feature-based folder structure:

```
src/
├── app/                          # Next.js App Router
│   ├── (feature-routes)/         # Feature-specific routes
│   │   └── awesome/              # Awesome feature page
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Home page
├── features/                     # Feature-based modules
│   └── awesome-feature/          # Example feature
│       ├── api/                  # REST endpoints & react-query hooks
│       ├── assets/               # Static files
│       ├── components/           # UI components scoped to feature
│       ├── hooks/                # Feature-specific hooks
│       ├── stores/               # Local state (Zustand)
│       ├── types/                # TypeScript interfaces
│       └── utils/                # Feature utilities
├── hooks/                        # Shared hooks
├── types/                        # Global types
├── utils/                        # Shared utilities
└── test/                         # Test setup
```

## 🚀 Technologies Used

- **Package Manager**: pnpm (fast, efficient, disk space friendly)
- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand (feature-level)
- **Data Fetching**: TanStack Query (React Query)
- **Testing**: Vitest + Testing Library
- **Storybook**: Component documentation
- **Code Quality**: ESLint, Prettier, Stylelint, Husky
- **CSS Tooling**: Custom VS Code settings for Tailwind CSS intellisense

## 📋 Features

### ✅ Implemented

- 🏗️ **Feature-based architecture** following bulletproof-react patterns
- 📱 **Responsive design** with Tailwind CSS
- 🔧 **TypeScript configuration** with strict type checking
- 📚 **Storybook integration** for component documentation
- 🧪 **Testing setup** with Vitest and Testing Library
- 🎨 **Code quality tools** (ESLint, Prettier, Husky)
- 🔍 **Environment validation** with Zod
- 📦 **No barrel exports** to avoid SSR/CSR bundling issues

### 🎯 Key Architectural Decisions

1. **Feature Isolation**: Each feature is self-contained with its own API, components, hooks, stores, types, and utilities
2. **Direct Imports**: No barrel exports to prevent Next.js SSR/CSR issues
3. **Type Safety**: Comprehensive TypeScript setup with strict configuration
4. **Testing Strategy**: Unit tests for hooks and components with proper mocking
5. **State Management**: Zustand for lightweight, feature-scoped state
6. **API Layer**: TanStack Query for server state management with proper error handling
7. **Package Management**: pnpm for fast, efficient dependency management

### 📦 Why pnpm?

- **Fast**: Up to 2x faster installations than npm/yarn
- **Efficient**: Uses hard links and symlinks to save disk space
- **Strict**: Better dependency resolution and security
- **Workspace Support**: Built-in monorepo capabilities

## 🛠️ Installation

```bash
# Install dependencies
pnpm install

# Set up Husky hooks
pnpm prepare
```

## 🔧 Development

```bash
# Start development server
pnpm dev

# Run tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run Storybook
pnpm storybook

# Type checking
pnpm type-check

# Linting
pnpm lint
pnpm lint:fix

# CSS Linting (Stylelint)
pnpm lint:css
pnpm lint:css:fix

# Formatting
pnpm format
```

## 🎨 CSS & Styling

This project uses Tailwind CSS with proper tooling support:

### VS Code Configuration

- **CSS validation disabled** for built-in CSS language server
- **Tailwind CSS IntelliSense** enabled with custom data
- **Custom CSS directives** recognized (`@tailwind`, `@apply`, `@layer`)

### Stylelint

- **CSS linting** with Tailwind-aware rules
- **Auto-fixing** available with `pnpm lint:css:fix`
- **Pre-commit hooks** ensure code quality

The `.vscode/settings.json` file configures VS Code to properly handle Tailwind directives without showing "unknown at-rule" warnings.

## 📖 Storybook

Component documentation is available in Storybook:

```bash
pnpm storybook
```

Stories are automatically loaded from:

- `src/features/**/components/**/*.stories.@(js|jsx|ts|tsx|mdx)`

## 🧪 Testing

The project uses Vitest for testing with:

- **Unit tests** for hooks and utilities
- **Component tests** with Testing Library
- **Mocking** for external dependencies
- **Coverage reports** available

```bash
# Run all tests
npm run test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch
```

## 📁 Project Structure Deep Dive

### Feature Structure (`src/features/awesome-feature/`)

```
awesome-feature/
├── api/                          # REST API calls and React Query hooks
│   └── fetchAwesome.ts           # API functions + useAwesomeQuery hook
├── assets/                       # Feature-specific static files
├── components/                   # UI components scoped to this feature
│   ├── AwesomeCard.tsx          # Main component
│   └── AwesomeCard.stories.tsx  # Storybook stories
├── hooks/                        # Feature-specific custom hooks
│   └── useAwesome.ts            # Main hook combining API + state
├── stores/                       # Local state management
│   └── useAwesomeStore.ts       # Zustand store
├── types/                        # TypeScript interfaces
│   └── index.ts                 # Feature-specific types
└── utils/                        # Feature utilities
    └── formatAwesome.ts         # Formatting functions
```

### Benefits of This Structure

1. **Scalability**: Easy to add new features without affecting existing ones
2. **Maintainability**: Clear separation of concerns
3. **Testability**: Isolated features are easier to test
4. **Team Development**: Multiple developers can work on different features
5. **Bundle Optimization**: Features can be code-split effectively

## 🎨 Component Development

### Component Guidelines

1. **Feature-Scoped**: Components should be specific to their feature
2. **Props Interface**: Always define TypeScript interfaces for props
3. **Storybook Stories**: Every component should have stories
4. **Testing**: Unit tests for component logic
5. **Accessibility**: Follow WCAG guidelines

### Example Component Structure

```typescript
// Component definition
interface AwesomeCardProps {
  item: AwesomeItem
  onSelect?: (id: string) => void
}

export const AwesomeCard = ({ item, onSelect }: AwesomeCardProps) => {
  // Component implementation
}

// Storybook story
export default {
  title: 'Features/AwesomeFeature/AwesomeCard',
  component: AwesomeCard,
} as Meta

// Test file
describe('AwesomeCard', () => {
  it('renders correctly', () => {
    // Test implementation
  })
})
```

## 🔧 Configuration Files

- **`next.config.js`**: Next.js configuration with typed routes
- **`tailwind.config.js`**: Tailwind CSS configuration
- **`tsconfig.json`**: TypeScript configuration with path aliases
- **`vitest.config.ts`**: Test configuration
- **`.eslintrc.json`**: ESLint rules
- **`.prettierrc`**: Prettier configuration
- **`.storybook/`**: Storybook configuration

## 📝 Best Practices

### 1. Import Strategy

```typescript
// ✅ Good - Direct imports
import { AwesomeCard } from '@/features/awesome-feature/components/AwesomeCard'

// ❌ Bad - Barrel exports (causes SSR issues)
import { AwesomeCard } from '@/features/awesome-feature'
```

### 2. State Management

```typescript
// ✅ Good - Feature-scoped state
const useAwesomeStore = create<AwesomeStore>((set) => ({
  // Feature-specific state
}))

// ❌ Bad - Global state for feature-specific data
```

### 3. API Layer

```typescript
// ✅ Good - Combined API + hooks
export const useAwesomeQuery = () => {
  return useQuery({
    queryKey: ['awesome'],
    queryFn: fetchAwesome,
  })
}

// ❌ Bad - Separate API and hooks files
```

## 🚀 Deployment

The project is ready for deployment on platforms like:

- **Vercel** (recommended for Next.js)
- **Netlify**
- **AWS**
- **Docker**

Build the project:

```bash
npm run build
```

## 🤝 Contributing

1. Follow the established feature-based architecture
2. Write tests for new features
3. Add Storybook stories for components
4. Update documentation
5. Follow the code style (ESLint + Prettier)

## 📚 Additional Resources

- [Bulletproof React](https://github.com/alan2207/bulletproof-react)
- [Next.js Documentation](https://nextjs.org/docs)
- [TanStack Query](https://tanstack.com/query/latest)
- [Zustand](https://github.com/pmndrs/zustand)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vitest](https://vitest.dev/)
- [Storybook](https://storybook.js.org/)

## 📄 License

This project is for demonstration purposes of the bulletproof-react architecture pattern.
