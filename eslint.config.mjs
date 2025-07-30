import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { FlatCompat } from '@eslint/eslintrc'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
})

const eslintConfig = [
  // Global ignores - applied to all configurations
  {
    ignores: [
      '.next/**',
      'out/**',
      'node_modules/**',
      'dist/**',
      'build/**',
      'coverage/**',
      'storybook-static/**',
      '*.tsbuildinfo',
      '.vscode/**',
      '.idea/**',
    ]
  },
  // Main Next.js configuration for source files
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  // Test files configuration
  {
    files: ['**/__tests__/**/*.{js,jsx,ts,tsx}', '**/*.{test,spec}.{js,jsx,ts,tsx}'],
    ...compat.extends('next/core-web-vitals', 'next/typescript')[0],
    rules: {
      // Allow some flexibility in test files while maintaining core standards
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/no-require-imports': 'error',
    }
  }
]

export default eslintConfig
