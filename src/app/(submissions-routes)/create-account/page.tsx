'use client'

import { useContext } from 'react'
import {
  SubmissionContext,
  SubmissionContextType,
} from '@/providers/create-account-provider'
import { SetupAccount } from '@/features/submissions/components/SetupAccount'
import { Step } from '@/features/submissions/types'
import { Summary } from '@/features/submissions/components/Summary'
import Link from 'next/link'
import { SetupSubmission } from '@/features/submissions/components/SetupSubmission'

export default function SubmissionsPage() {
  const { steps, updateSteps } = useContext(
    SubmissionContext
  ) as SubmissionContextType

  const activeStep = steps.find((s) => s.status === 'current') || steps[0]
  const nextStep = steps.find((s) => s.index === activeStep.index + 1)

  return (
    <div className="flex w-full flex-col">
      <header className="mb-4">
        <h5>{activeStep.name}</h5>
        <h2 className="text-2xl font-bold">{activeStep.description}</h2>
      </header>

      {activeStep.index === 1 && (
        <div className="min-h-screen overflow-x-auto">
          <SetupAccount />
        </div>
      )}
      {activeStep.index === 2 && <SetupSubmission />}
      {activeStep.index === 3 && <Summary />}
      {activeStep.index === 4 && <div>Step 4 Content</div>}
      {activeStep.index === 5 && <div>Step 5 Content</div>}

      <footer className="fixed start-0 bottom-0 w-full space-x-7 bg-teal-50 p-3 text-right">
        {activeStep.index > 1 && activeStep.index !== 3 && (
          <button
            onClick={handleSave}
            className="cursor-pointer rounded-sm bg-transparent px-4 py-2 text-sm font-bold text-teal-800"
            type="submit"
          >
            Save
          </button>
        )}

        {activeStep.index < 3 && (
          <button
            onClick={handleNext}
            className="cursor-pointer rounded-sm bg-teal-800 px-4 py-2 text-sm font-bold text-white"
            type="submit"
          >
            {nextStep?.description}
          </button>
        )}

        {activeStep.index === 3 && (
          <Link
            className="cursor-pointer rounded-sm bg-transparent px-4 py-2 text-sm font-bold text-teal-800"
            href="/submissions"
          >
            View Submissions
          </Link>
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
