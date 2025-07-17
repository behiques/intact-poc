import { useAwesomeQuery } from '../api/fetchAwesome'
import { useAwesomeStore } from '../stores/useAwesomeStore'
import { getActiveItems, sortItemsByPriority, filterItemsByTag } from '../utils/formatAwesome'

// Feature-specific custom hook - bulletproof pattern encapsulates logic
export const useAwesome = () => {
  const { data, isLoading, error, refetch } = useAwesomeQuery()
  const { selectedItem, filter, setSelectedItem, setFilter, clearFilter } = useAwesomeStore()

  const selectItem = (id: string) => {
    const item = data?.data.find((item) => item.id === id)
    setSelectedItem(item || null)
  }

  // Apply filters to the data
  const filteredItems = data?.data ? (() => {
    let items = data.data

    // Filter by active/inactive
    if (!filter.showInactive) {
      items = getActiveItems(items)
    }

    // Filter by priority
    if (filter.priority !== 'all') {
      items = items.filter((item) => item.priority === filter.priority)
    }

    // Filter by tag
    if (filter.tag) {
      items = filterItemsByTag(items, filter.tag)
    }

    return sortItemsByPriority(items)
  })() : []

  // Get unique tags for filter dropdown
  const availableTags = data?.data 
    ? Array.from(new Set(data.data.flatMap((item) => item.tags)))
    : []

  return {
    items: filteredItems,
    allItems: data?.data || [],
    selectedItem,
    isLoading,
    error,
    filter,
    availableTags,
    total: data?.total || 0,
    page: data?.page || 1,
    totalPages: data?.totalPages || 1,
    selectItem,
    setFilter,
    clearFilter,
    refetch,
  }
}
