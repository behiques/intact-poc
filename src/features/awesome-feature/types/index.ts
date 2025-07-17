// Feature-specific types - bulletproof pattern isolates types per feature
export interface AwesomeItem {
  id: string
  title: string
  description: string
  createdAt: string
  isActive: boolean
  priority: 'low' | 'medium' | 'high'
  tags: string[]
}

export interface AwesomeApiResponse {
  data: AwesomeItem[]
  total: number
  page: number
  limit: number
  totalPages: number
}

export interface CreateAwesomeItemRequest {
  title: string
  description: string
  priority: 'low' | 'medium' | 'high'
  tags: string[]
}

export interface UpdateAwesomeItemRequest {
  id: string
  title?: string
  description?: string
  priority?: 'low' | 'medium' | 'high'
  tags?: string[]
  isActive?: boolean
}
