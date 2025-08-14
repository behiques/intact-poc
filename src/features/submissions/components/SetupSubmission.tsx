import { Button } from '@/features/ui/Form/Button'
import { FormGroup } from '@/features/ui/Form/FormGroup'
import { Field, SelectOption } from '@/features/ui/Form'
import { BriefcaseIcon, HomeIcon, UserIcon } from '@heroicons/react/20/solid'
import { Controller, useForm } from 'react-hook-form'
import { useProducers } from '@/features/account-search/hooks/useProducers'
import { Producer } from '@/features/account-search/types'

export const SetupSubmission = () => {
  const { register, handleSubmit, control } = useForm()

  // Fetch producers based on selected business unit
  const { items: producers, isLoading: loadingProducers } = useProducers('I')

  // Map producers to SelectField options
  const producersOptions: SelectOption[] =
    producers?.map((producer: Producer) => ({
      value: producer.producerCode,
      label: `${producer.producerCode} - ${producer.name} - ${producer.address1} ${producer.city}, ${producer.stateCode}`,
    })) || []

  return (
    <form
      onSubmit={handleSubmit((data) => console.log(data))}
      className="flex flex-col w-full space-y-6"
    >
      <FormGroup headerText="Account 6235731">
        <ul className="grid grid-cols-2 text-sm text-gray-700 space-y-4">
          <li className="flex">
            <UserIcon width={20} className="fill-gray-300 mr-2" />
            bier demo 7.8.25{' '}
          </li>
          <li className="flex items-center">
            <BriefcaseIcon width={20} className="fill-gray-300 mr-2" />{' '}
            Financial Institutions
          </li>
          <li className="flex items-start">
            <HomeIcon width={20} className="fill-gray-300 mr-2" />
            1051 TEXAS ST, SALEM, Virginia, 241535402
          </li>
        </ul>
      </FormGroup>

      <FormGroup headerText="Program">
        <div className="grid grid-cols-2 gap-4">
          <Field.Radio
            defaultChecked
            label="Domestic"
            {...register('IsInternational')}
          />
          <Field.Radio label="International" {...register('IsInternational')} />
        </div>
        <Field.Input
          label="Business Description"
          {...register('BusinessDescription')}
        />

        <Controller
          control={control}
          name="BusinessType"
          render={({ field: { onChange, value } }) => (
            <Field.Select
              label="Business Type"
              required
              value={value}
              placeholder=""
              onChange={(newValue) => {
                if (
                  newValue &&
                  typeof newValue === 'object' &&
                  'value' in newValue
                ) {
                  onChange((newValue as SelectOption).value)
                } else {
                  onChange('')
                }
              }}
              options={[]}
              isClearable={false}
              isLoading={false}
            />
          )}
        />
      </FormGroup>

      <FormGroup headerText="Assignments & Contacts">
        <h2 className="font-bold text-xl">Producer Contacts</h2>

        <Controller
          control={control}
          name="producer"
          render={({ field: { onChange, value } }) => (
            <Field.Select
              label="Producer"
              value={producersOptions.find(
                (option: SelectOption) => option.value === value
              )}
              onChange={(newValue) => {
                if (
                  newValue &&
                  typeof newValue === 'object' &&
                  'value' in newValue
                ) {
                  onChange((newValue as SelectOption).value)
                } else {
                  onChange('')
                }
              }}
              options={producersOptions}
              isClearable={false}
              isLoading={loadingProducers || !producersOptions.length}
            />
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <Controller
            control={control}
            name="ElectronicPolicyDeliveryContact"
            render={({ field: { onChange, value } }) => (
              <Field.Select
                label="Electronic policy delivery contact"
                required
                value={value}
                placeholder=""
                onChange={(newValue) => {
                  if (
                    newValue &&
                    typeof newValue === 'object' &&
                    'value' in newValue
                  ) {
                    onChange((newValue as SelectOption).value)
                  } else {
                    onChange('')
                  }
                }}
                options={[]}
                isClearable={false}
                isLoading={false}
              />
            )}
          />

          <Controller
            control={control}
            name="CorrespondenceContact"
            render={({ field: { onChange, value } }) => (
              <Field.Select
                label="Correspondence contact"
                required
                value={value}
                placeholder=""
                onChange={(newValue) => {
                  if (
                    newValue &&
                    typeof newValue === 'object' &&
                    'value' in newValue
                  ) {
                    onChange((newValue as SelectOption).value)
                  } else {
                    onChange('')
                  }
                }}
                options={[]}
                isClearable={false}
                isLoading={false}
              />
            )}
          />
        </div>

        <Field.Checkbox
          label="Use for correspondence contact"
          {...register('UseForCorrespondenceContact')}
        />

        <Button style="outline">Add Contacts</Button>
        <h3 className="font-bold text-xl mb-2">Additional Custom Contacts</h3>
        <Button style="outline">Add Custom Contacts</Button>

        <Field.Input
          label="Electronic policy delivery contact *"
          {...register('ElectronicPolicyDeliveryContact', { required: true })}
        />
      </FormGroup>
    </form>
  )
}
