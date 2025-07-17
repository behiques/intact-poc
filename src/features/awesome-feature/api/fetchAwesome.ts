import { useQuery } from '@tanstack/react-query'
import { AwesomeApiResponse } from '../types'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'

// REST API call - bulletproof pattern keeps API logic in feature/api folder
export const fetchAwesomeItems = async (page = 1, limit = 10): Promise<AwesomeApiResponse> => {
  const response = await fetch(`${API_BASE_URL}/api/awesome?page=${page}&limit=${limit}`)
  
  if (!response.ok) {
    throw new Error(`Failed to fetch awesome items: ${response.statusText}`)
  }
  
  return response.json()
}

export const fetchAwesomeItemById = async (id: string) => {
  const response = await fetch(`${API_BASE_URL}/api/awesome/${id}`)
  
  if (!response.ok) {
    throw new Error(`Failed to fetch awesome item: ${response.statusText}`)
  }
  
  return response.json()
}

export const createAwesomeItem = async (data: any) => {
  const response = await fetch(`${API_BASE_URL}/api/awesome`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  
  if (!response.ok) {
    throw new Error(`Failed to create awesome item: ${response.statusText}`)
  }
  
  return response.json()
}

// React Query hooks for data fetching
export const useAwesomeQuery = (page = 1, limit = 10) => {
  return useQuery({
    queryKey: ['awesome', page, limit],
    queryFn: () => fetchAwesomeItems(page, limit),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  })
}

export const useAwesomeItemQuery = (id: string) => {
  return useQuery({
    queryKey: ['awesome', id],
    queryFn: () => fetchAwesomeItemById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  })
}

// Mock data for development
export const mockAwesomeData: AwesomeApiResponse = {
  data: [
    {
      id: '1',
      title: 'Awesome Task 1',
      description: 'This is a description for the first awesome task',
      createdAt: '2024-01-01T00:00:00Z',
      isActive: true,
      priority: 'high',
      tags: ['work', 'urgent'],
    },
    {
      id: '2',
      title: 'Awesome Task 2',
      description: 'This is a description for the second awesome task',
      createdAt: '2024-01-02T00:00:00Z',
      isActive: true,
      priority: 'medium',
      tags: ['personal', 'hobby'],
    },
    {
      id: '3',
      title: 'Awesome Task 3',
      description: 'This is a description for the third awesome task',
      createdAt: '2024-01-03T00:00:00Z',
      isActive: false,
      priority: 'low',
      tags: ['learning'],
    },
  ],
  total: 3,
  page: 1,
  limit: 10,
  totalPages: 1,
}
