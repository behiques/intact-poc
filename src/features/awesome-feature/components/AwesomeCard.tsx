import { AwesomeItem } from '../types'
import { formatAwesome, getPriorityColor } from '../utils/formatAwesome'

// Feature-scoped component - bulletproof pattern avoids global components
interface AwesomeCardProps {
  item: AwesomeItem
  onSelect?: (id: string) => void
  onEdit?: (id: string) => void
  onDelete?: (id: string) => void
}

export const AwesomeCard = ({ item, onSelect, onEdit, onDelete }: AwesomeCardProps) => {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-all duration-200 hover:shadow-md">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
          <p className="mt-1 text-sm text-gray-600">{item.description}</p>
        </div>
        
        <div className="ml-4 flex items-center space-x-2">
          {onEdit && (
            <button
              onClick={() => onEdit(item.id)}
              className="text-blue-600 hover:text-blue-800"
              title="Edit item"
            >
              <EditIcon className="h-4 w-4" />
            </button>
          )}
          {onDelete && (
            <button
              onClick={() => onDelete(item.id)}
              className="text-red-600 hover:text-red-800"
              title="Delete item"
            >
              <DeleteIcon className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">
            {formatAwesome(item)}
          </span>
          <span
            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getPriorityColor(item.priority)}`}
          >
            {item.priority}
          </span>
        </div>
        
        <div className="flex items-center space-x-2">
          <span
            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
              item.isActive
                ? 'bg-green-100 text-green-800'
                : 'bg-gray-100 text-gray-800'
            }`}
          >
            {item.isActive ? 'Active' : 'Inactive'}
          </span>
          
          {onSelect && (
            <button
              onClick={() => onSelect(item.id)}
              className="rounded bg-blue-500 px-3 py-1 text-sm text-white transition-colors hover:bg-blue-600"
            >
              Select
            </button>
          )}
        </div>
      </div>

      {/* Tags */}
      {item.tags.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1">
          {item.tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center rounded-md bg-gray-100 px-2 py-1 text-xs text-gray-700"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}

// Simple icon components (in a real app, you'd use a proper icon library)
const EditIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
  </svg>
)

const DeleteIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
)
