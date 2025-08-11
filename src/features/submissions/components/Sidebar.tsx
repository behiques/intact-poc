'use client'

import { CheckIcon } from '@heroicons/react/20/solid'
import { useContext } from 'react'
import { SubmissionContext } from '@/providers/create-account-provider'
import { Step } from '../types'

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}
export const Sidebar = () => {
  const context = useContext(SubmissionContext)
  if (!context)
    throw new Error('Sidebar must be used within a SubmissionProvider')

  const { steps } = context

  return (
    <nav aria-label="Progress" className="bg-white h-screen">
      <ol role="list" className="overflow-hidden">
        {steps?.map((step: Step, stepIdx: number) => (
          <li
            key={step.name}
            className={classNames(
              stepIdx !== steps.length - 1 ? 'pb-10' : '',
              'relative'
            )}
          >
            {step.status === 'complete' ? (
              <>
                {stepIdx !== steps.length - 1 ? (
                  <div
                    aria-hidden="true"
                    className="absolute top-4 left-4 mt-0.5 -ml-px h-full w-0.5 bg-teal-600"
                  />
                ) : null}
                <button
                  onClick={() => {}}
                  className="group relative flex items-start text-start"
                >
                  <span className="flex h-9 items-center">
                    <span className="relative z-10 flex size-8 items-center justify-center rounded-full bg-teal-600 group-hover:bg-teal-800">
                      <CheckIcon
                        aria-hidden="true"
                        className="size-5 text-white"
                      />
                    </span>
                  </span>
                  <span className="ml-4 flex min-w-0 flex-col">
                    <span className="text-sm font-bold uppercase">
                      {step.name}
                    </span>
                    <span className="text-sm text-gray-500 font-bold">
                      {step.description}
                    </span>
                  </span>
                </button>
              </>
            ) : step.status === 'current' ? (
              <>
                {stepIdx !== steps.length - 1 ? (
                  <div
                    aria-hidden="true"
                    className="absolute top-4 left-4 mt-0.5 -ml-px h-full w-0.5 bg-gray-300"
                  />
                ) : null}
                <button
                  onClick={() => {}}
                  aria-current="step"
                  className="group relative flex items-start text-start"
                >
                  <span aria-hidden="true" className="flex h-9 items-center">
                    <span className="relative z-10 flex size-8 items-center justify-center rounded-full border-2 border-teal-600 bg-white">
                      <span className="size-2.5 rounded-full bg-teal-600" />
                    </span>
                  </span>
                  <span className="ml-4 flex min-w-0 flex-col">
                    <span className="text-sm font-bold uppercase text-teal-600">
                      {step.name}
                    </span>
                    <span className="text-sm text-gray-500">
                      {step.description}
                    </span>
                  </span>
                </button>
              </>
            ) : (
              <>
                {stepIdx !== steps.length - 1 ? (
                  <div
                    aria-hidden="true"
                    className="absolute top-4 left-4 mt-0.5 -ml-px h-full w-0.5 bg-gray-300"
                  />
                ) : null}
                <button
                  onClick={() => {}}
                  className="group relative flex items-start text-start"
                >
                  <span aria-hidden="true" className="flex h-9 items-center">
                    <span className="relative z-10 flex size-8 items-center justify-center rounded-full border-2 border-gray-300 bg-white">
                      <span className="size-2.5 rounded-full bg-transparent" />
                    </span>
                  </span>
                  <span className="ml-4 flex min-w-0 flex-col">
                    <span className="text-sm font-bold uppercase text-gray-500">
                      {step.name}
                    </span>
                    <span className="text-sm text-gray-500">
                      {step.description}
                    </span>
                  </span>
                </button>
              </>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
