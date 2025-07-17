import { renderHook, act } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { useAwesome } from '@/features/awesome-feature/hooks/useAwesome'

// Mock the API and store
vi.mock('@/features/awesome-feature/api/fetchAwesome', () => ({
  useAwesomeQuery: () => ({
    data: {
      data: [
        {
          id: '1',
          title: 'Test Item',
          description: 'Test description',
          createdAt: '2024-01-01T00:00:00Z',
          isActive: true,
          priority: 'high',
          tags: ['test', 'example'],
        },
      ],
      total: 1,
      page: 1,
      limit: 10,
      totalPages: 1,
    },
    isLoading: false,
    error: null,
    refetch: vi.fn(),
  }),
}))

vi.mock('@/features/awesome-feature/stores/useAwesomeStore', () => ({
  useAwesomeStore: () => ({
    selectedItem: null,
    filter: {
      tag: null,
      priority: 'all',
      showInactive: false,
    },
    setSelectedItem: vi.fn(),
    setFilter: vi.fn(),
    clearFilter: vi.fn(),
  }),
}))

describe('useAwesome', () => {
  it('should return items from API', () => {
    const { result } = renderHook(() => useAwesome())
    
    expect(result.current.items).toHaveLength(1)
    expect(result.current.items[0].title).toBe('Test Item')
    expect(result.current.isLoading).toBe(false)
  })

  it('should handle item selection', () => {
    const { result } = renderHook(() => useAwesome())
    
    expect(result.current.selectItem).toBeDefined()
    expect(typeof result.current.selectItem).toBe('function')
  })

  it('should provide filter functionality', () => {
    const { result } = renderHook(() => useAwesome())
    
    expect(result.current.filter).toBeDefined()
    expect(result.current.setFilter).toBeDefined()
    expect(result.current.clearFilter).toBeDefined()
  })

  it('should return available tags', () => {
    const { result } = renderHook(() => useAwesome())
    
    expect(result.current.availableTags).toEqual(['test', 'example'])
  })

  it('should provide pagination info', () => {
    const { result } = renderHook(() => useAwesome())
    
    expect(result.current.total).toBe(1)
    expect(result.current.page).toBe(1)
    expect(result.current.totalPages).toBe(1)
  })
})
