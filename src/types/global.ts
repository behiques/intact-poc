// Global types for the application
export interface ApiResponse<T> {
  data: T
  success: boolean
  message?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  totalPages: number
}

export interface User {
  id: string
  email: string
  name: string
  avatar?: string
  createdAt: string
  updatedAt: string
}

export interface AppError {
  message: string
  code?: string
  status?: number
}
