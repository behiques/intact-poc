import '@testing-library/jest-dom'
import { vi } from 'vitest'

// Mock IntersectionObserver
Object.defineProperty(global, 'IntersectionObserver', {
  writable: true,
  value: class IntersectionObserver {
    constructor() {}
    disconnect() {}
    observe() {}
    unobserve() {}
  },
})

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})

// Mock ResizeObserver
Object.defineProperty(global, 'ResizeObserver', {
  writable: true,
  value: class ResizeObserver {
    constructor() {}
    disconnect() {}
    observe() {}
    unobserve() {}
  },
})
