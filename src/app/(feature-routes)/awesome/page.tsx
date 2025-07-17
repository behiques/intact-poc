'use client'

import { AwesomeCard } from '@/features/awesome-feature/components/AwesomeCard'
import { useAwesome } from '@/features/awesome-feature/hooks/useAwesome'
import { mockAwesomeData } from '@/features/awesome-feature/api/fetchAwesome'

// App Router page using feature components - bulletproof pattern
export default function AwesomePage() {
  // For now, use mock data since we don't have a real API
  const mockHook = {
    items: mockAwesomeData.data.filter(item => item.isActive),
    allItems: mockAwesomeData.data,
    selectedItem: null,
    isLoading: false,
    error: null,
    filter: {
      tag: null,
      priority: 'all' as const,
      showInactive: false,
    },
    availableTags: ['work', 'personal', 'urgent', 'hobby', 'learning'],
    total: mockAwesomeData.total,
    page: mockAwesomeData.page,
    totalPages: mockAwesomeData.totalPages,
    selectItem: (id: string) => console.log('Selected:', id),
    setFilter: (filter: any) => console.log('Filter changed:', filter),
    clearFilter: () => console.log('Filter cleared'),
    refetch: () => console.log('Refetching...'),
  }

  const { items, selectedItem, isLoading, selectItem, filter, availableTags, setFilter, clearFilter } = mockHook

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Awesome Feature</h1>
          <p className="text-gray-600">
            Demonstrating bulletproof-react patterns with feature-based architecture
          </p>
        </div>

        {/* Filters */}
        <div className="mb-6 p-4 bg-white rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Filters</h2>
          <div className="flex flex-wrap gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Priority
              </label>
              <select
                value={filter.priority}
                onChange={(e) => setFilter({ priority: e.target.value as any })}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm"
              >
                <option value="all">All</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tag
              </label>
              <select
                value={filter.tag || ''}
                onChange={(e) => setFilter({ tag: e.target.value || null })}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm"
              >
                <option value="">All Tags</option>
                {availableTags.map((tag) => (
                  <option key={tag} value={tag}>
                    {tag}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="flex items-end">
              <button
                onClick={clearFilter}
                className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md text-sm hover:bg-gray-300 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          </div>
        </div>

        {/* Selected Item */}
        {selectedItem && (
          <div className="mb-6 p-4 bg-blue-50 rounded-lg">
            <h2 className="text-lg font-semibold text-blue-900 mb-2">Selected Item:</h2>
            <p className="text-blue-800">{(selectedItem as any).title}</p>
            <p className="text-blue-600 text-sm mt-1">{(selectedItem as any).description}</p>
          </div>
        )}

        {/* Items Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <AwesomeCard
              key={item.id}
              item={item}
              onSelect={selectItem}
              onEdit={(id) => console.log('Edit:', id)}
              onDelete={(id) => console.log('Delete:', id)}
            />
          ))}
        </div>

        {/* Empty State */}
        {items.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-500">
              <svg className="mx-auto h-12 w-12 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No items found</h3>
              <p className="text-gray-500">Try adjusting your filters or create a new item.</p>
            </div>
          </div>
        )}

        {/* Stats */}
        <div className="mt-8 p-4 bg-white rounded-lg shadow-sm">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-blue-600">{items.length}</div>
              <div className="text-sm text-gray-600">Filtered Items</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">
                {items.filter(item => item.isActive).length}
              </div>
              <div className="text-sm text-gray-600">Active Items</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-red-600">
                {items.filter(item => item.priority === 'high').length}
              </div>
              <div className="text-sm text-gray-600">High Priority</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-600">{availableTags.length}</div>
              <div className="text-sm text-gray-600">Available Tags</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
