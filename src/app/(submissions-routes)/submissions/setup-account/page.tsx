'use client'

import { useContext } from 'react'
import {
  SubmissionContext,
  SubmissionContextType,
} from '@/providers/create-account-provider'
import { SetupAccount } from '@/features/submissions/components/SetupAccount'
import { CreateAccountPayload } from '@/features/submissions/types'
import { useCreateAccount } from '@/features/submissions/api/createAccount'

export default function SubmissionsPage() {
  const { steps } = useContext(SubmissionContext) as SubmissionContextType

  const activeStep = steps.find((s) => s.status === 'current') || steps[0]

  const { mutate: createAccount } = useCreateAccount()

  return (
    <div className="flex flex-col w-full">
      <header className="mb-4">
        <h5>{activeStep.name}</h5>
        <h2 className="text-2xl font-bold">{activeStep.description}</h2>
      </header>

      <SetupAccount onSubmit={handleSubmit} />
    </div>
  )

  function handleSubmit(data: CreateAccountPayload) {
    console.log({ data })
    // alert('Save functionality is not implemented yet.')

    const mockPayload: CreateAccountPayload = {
      defaultLegalEntityId: 5,
      sicCode: '9999',
      naicsCode: '999999',
      businessUnit: 'I',
      producerCode: '3104572',
      address: {
        city: 'Queens',
        country: 'US',
        state: 'NY',
        street: '123 Main St',
        zip: '10001',
        mailStop: 'Attn ABC',
      },
      doingBusinessAs: ['Agile Brains Consulting', 'ABC'],
      formerlyKnownAs: ['Agile Brains Consulting, LLC', 'ABC, LLC'],
      businessDescription: 'Consulting company',
      websiteUrl: 'https://agilebrainsconsulting.com',
      fein: '123456789',
      divisionId: '002',
      customerId: 2307283,
      name: {
        name1: 'ABC Test',
        name2: 'Agile Brains Consulting',
      },
      riskCode: '1',
      description: 'Acc description',
      dunsNumber: '',
      territory: '002',
    }

    createAccount.mutate(mockPayload, {
      onSuccess: (response: unknown) => {
        console.log('Account created successfully:', response)
      },
      onError: (error: unknown) => {
        console.error('Error creating account:', error)
      },
    })
  }
}
