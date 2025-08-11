'use client'

import { useContext } from 'react'
import {
  SubmissionContext,
  SubmissionContextType,
} from '@/providers/create-account-provider'
import { StepOne } from '@/features/submissions/components/CreateAccount1'
import { Step } from '@/features/submissions/types'

export default function SubmissionsPage() {
  const { steps, updateSteps } = useContext(
    SubmissionContext
  ) as SubmissionContextType

  const activeStep = steps.find((s) => s.status === 'current') || steps[0]
  const nextStep = steps.find((s) => s.index === activeStep.index + 1)

  return (
    <div className="flex flex-col w-full">
      <header className="mb-4">
        <h5>{activeStep.name}</h5>
        <h2 className="text-2xl font-bold">{activeStep.description}</h2>
      </header>

      {activeStep.index === 1 && (
        <div className="overflow-x-auto min-h-screen">
          <StepOne />
        </div>
      )}
      {activeStep.index === 2 && <div>Step 2 Content</div>}
      {activeStep.index === 3 && <div>Step 3 Content</div>}
      {activeStep.index === 4 && <div>Step 4 Content</div>}
      {activeStep.index === 5 && <div>Step 5 Content</div>}

      <footer className="fixed start-0 bottom-0 p-3 bg-teal-50 w-full text-right space-x-7">
        {activeStep.index > 1 && (
          <button
            onClick={handleSave}
            className="font-bold text-teal-800 bg-transparent py-2 px-4 rounded-sm text-sm cursor-pointer"
            type="submit"
          >
            Save
          </button>
        )}

        {activeStep.index < 6 && (
          <button
            onClick={handleNext}
            className="font-bold text-white bg-teal-800 py-2 px-4 rounded-sm text-sm cursor-pointer"
            type="submit"
          >
            {nextStep?.description}
          </button>
        )}
      </footer>
    </div>
  )

  function handleNext() {
    const newSteps = steps.map((s) => {
      if (s.index === activeStep.index)
        return { ...activeStep, status: 'complete' }
      if (s.index === activeStep.index + 1) return { ...s, status: 'current' }
      if (s.index > activeStep.index + 1) return { ...s, status: 'upcoming' }

      return s
    })

    updateSteps(newSteps as Step[])
  }

  function handleSave() {
    alert('Save functionality is not implemented yet.')
  }
}
