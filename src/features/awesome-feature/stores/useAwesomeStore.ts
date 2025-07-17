import { create } from 'zustand'
import { AwesomeItem } from '../types'

// Zustand store for feature-specific state - bulletproof pattern
interface AwesomeStore {
  selectedItem: AwesomeItem | null
  isLoading: boolean
  filter: {
    tag: string | null
    priority: 'all' | 'high' | 'medium' | 'low'
    showInactive: boolean
  }
  setSelectedItem: (item: AwesomeItem | null) => void
  setLoading: (loading: boolean) => void
  setFilter: (filter: Partial<AwesomeStore['filter']>) => void
  clearFilter: () => void
}

export const useAwesomeStore = create<AwesomeStore>((set) => ({
  selectedItem: null,
  isLoading: false,
  filter: {
    tag: null,
    priority: 'all',
    showInactive: false,
  },
  setSelectedItem: (item) => set({ selectedItem: item }),
  setLoading: (loading) => set({ isLoading: loading }),
  setFilter: (newFilter) =>
    set((state) => ({
      filter: { ...state.filter, ...newFilter },
    })),
  clearFilter: () =>
    set({
      filter: {
        tag: null,
        priority: 'all',
        showInactive: false,
      },
    }),
}))
