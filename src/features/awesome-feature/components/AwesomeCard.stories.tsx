import type { Meta, StoryObj } from '@storybook/react'
import { AwesomeCard } from './AwesomeCard'
import { AwesomeItem } from '../types'

// Mock data for stories
const mockItem: AwesomeItem = {
  id: '1',
  title: 'Awesome Task',
  description: 'This is an awesome task description that shows how the component renders',
  createdAt: '2024-01-01T00:00:00Z',
  isActive: true,
  priority: 'high',
  tags: ['work', 'urgent', 'important'],
}

const inactiveItem: AwesomeItem = {
  id: '2',
  title: 'Inactive Task',
  description: 'This task is not active and shows how inactive items are displayed',
  createdAt: '2024-01-02T00:00:00Z',
  isActive: false,
  priority: 'low',
  tags: ['personal'],
}

// Storybook story following bulletproof pattern
const meta: Meta<typeof AwesomeCard> = {
  title: 'Features/AwesomeFeature/AwesomeCard',
  component: AwesomeCard,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A card component for displaying awesome items with various states and actions.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    onSelect: { action: 'selected' },
    onEdit: { action: 'edited' },
    onDelete: { action: 'deleted' },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    item: mockItem,
    onSelect: (id: string) => console.log('Selected:', id),
    onEdit: (id: string) => console.log('Edit:', id),
    onDelete: (id: string) => console.log('Delete:', id),
  },
}

export const WithoutActions: Story = {
  args: {
    item: mockItem,
  },
}

export const HighPriority: Story = {
  args: {
    item: {
      ...mockItem,
      priority: 'high',
      title: 'High Priority Task',
    },
    onSelect: (id: string) => console.log('Selected:', id),
  },
}

export const MediumPriority: Story = {
  args: {
    item: {
      ...mockItem,
      priority: 'medium',
      title: 'Medium Priority Task',
    },
    onSelect: (id: string) => console.log('Selected:', id),
  },
}

export const LowPriority: Story = {
  args: {
    item: {
      ...mockItem,
      priority: 'low',
      title: 'Low Priority Task',
    },
    onSelect: (id: string) => console.log('Selected:', id),
  },
}

export const Inactive: Story = {
  args: {
    item: inactiveItem,
    onSelect: (id: string) => console.log('Selected:', id),
    onEdit: (id: string) => console.log('Edit:', id),
    onDelete: (id: string) => console.log('Delete:', id),
  },
}

export const NoTags: Story = {
  args: {
    item: {
      ...mockItem,
      tags: [],
      title: 'Task Without Tags',
    },
    onSelect: (id: string) => console.log('Selected:', id),
  },
}

export const LongDescription: Story = {
  args: {
    item: {
      ...mockItem,
      title: 'Task with Long Description',
      description: 'This is a very long description that demonstrates how the component handles longer text content. It should wrap properly and maintain good readability while keeping the card layout intact.',
    },
    onSelect: (id: string) => console.log('Selected:', id),
  },
}
