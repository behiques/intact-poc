import { AwesomeItem } from '../types'

// Feature-specific utilities - bulletproof pattern keeps utils scoped
export const formatAwesome = (item: AwesomeItem): string => {
  const date = new Date(item.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
  return `${item.title} - ${date}`
}

export const getActiveItems = (items: AwesomeItem[]): AwesomeItem[] => {
  return items.filter((item) => item.isActive)
}

export const sortItemsByPriority = (items: AwesomeItem[]): AwesomeItem[] => {
  const priorityOrder = { high: 0, medium: 1, low: 2 }
  return [...items].sort((a, b) => {
    return priorityOrder[a.priority] - priorityOrder[b.priority]
  })
}

export const filterItemsByTag = (items: AwesomeItem[], tag: string): AwesomeItem[] => {
  return items.filter((item) => item.tags.includes(tag))
}

export const getPriorityColor = (priority: AwesomeItem['priority']): string => {
  switch (priority) {
    case 'high':
      return 'bg-red-100 text-red-800'
    case 'medium':
      return 'bg-yellow-100 text-yellow-800'
    case 'low':
      return 'bg-green-100 text-green-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}
