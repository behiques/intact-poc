'use client'

import { Step } from '@/features/submissions/types'
import React, { createContext, useState } from 'react'

const initSteps: Step[] = [
  {
    name: 'Step 1',
    description: 'Set Up Account',
    index: 1,
    status: 'current',
  },
  {
    name: 'Step 2',
    description: 'Set Up Submission',
    index: 2,
    status: 'upcoming',
  },
  {
    name: 'Step 3',
    description: 'Summary',
    index: 3,
    status: 'upcoming',
  },
  {
    name: 'Step 4',
    description: 'Submission Details',
    index: 4,
    status: 'upcoming',
  },
  {
    name: 'Step 5',
    description: 'Request Reports',
    index: 5,
    status: 'upcoming',
  },
  {
    name: 'Step 6',
    description: 'Quote',
    index: 6,
    status: 'upcoming',
  },
]

export const SubmissionContext = createContext<SubmissionContextType | null>(
  null
)

export const SubmissionProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [steps, setSteps] = useState<Step[]>(initSteps)

  const updateSteps = (newSteps: Step[]) => {
    setSteps(newSteps)
  }

  const value = { steps, updateSteps }

  return (
    <SubmissionContext.Provider value={value}>
      {children}
    </SubmissionContext.Provider>
  )
}

export type SubmissionContextType = {
  steps: Step[]
  updateSteps: (newSteps: Step[]) => void
}
