import { useForm, Controller } from 'react-hook-form'
import { useEffect } from 'react'
import { SelectField, SelectOption } from '@/features/ui/Form/Select'
import { useBusinessUnits } from '../hooks/useBusinessUnits'
import {
  AccountSearchFormData,
  AccountSearchFormProps,
  BusinessUnit,
  PolicyContact,
  Producer,
} from '../types'
import { useProducers } from '../hooks/useProducers'
import { useContacts } from '../hooks/useContacts'

export const AccountSearchForm = ({ onSearch }: AccountSearchFormProps) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    formState: { errors },
  } = useForm<AccountSearchFormData>()

  const { items: businessUnits } = useBusinessUnits()

  const businessUnitsOptions: SelectOption[] =
    businessUnits?.map((bu: BusinessUnit) => ({
      value: bu.businessUnitId,
      label: bu.name,
    })) || []

  const selectedBusinessUnit = watch('businessUnit') as string
  const { items: producers } = useProducers(selectedBusinessUnit)

  const producersOptions: SelectOption[] =
    producers?.map((producer: Producer) => ({
      value: producer.producerCode,
      label: `${producer.producerCode} - ${producer.name} - ${producer.address1} ${producer.city}, ${producer.stateCode}`,
    })) || []

  const producerCode = watch('producer') as string
  const { items: contacts } = useContacts(producerCode)

  // Fix: ensure value is string for SelectOption
  const policyContactsOptions: SelectOption[] =
    contacts?.map((contact: PolicyContact) => ({
      value: String(contact.producerContactId),
      label: `${contact.firstName} - ${contact.lastName}`,
    })) || []

  const effectiveDate = watch('effectiveDate') as string | undefined

  useEffect(() => {
    if (!effectiveDate) return

    // Calculate expiration date as one year after effective date
    const expirationDate = new Date(effectiveDate)
    expirationDate.setFullYear(expirationDate.getFullYear() + 1)

    setValue(
      'expirationDate',
      new Date(expirationDate).toISOString().split('T')[0]
    )
  }, [effectiveDate, setValue])

  const onSubmit = handleSubmit((data: AccountSearchFormData) => {
    onSearch(data)
  })

  return (
    <div className="bg-[#d9f4f5] pb-10">
      <form onSubmit={onSubmit} className="mx-auto p-6">
        <h2 className="mb-4 text-xl font-bold">Who is the submission for?</h2>

        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-7 mb-4">
            <label className="block text-sm font-bold">Account Name</label>
            <input
              {...register('accountName', {
                required: { value: true, message: 'Account Name is required' },
                minLength: {
                  value: 4,
                  message: 'Minimum 4 characters required',
                },
              })}
              placeholder="Minimum 4 characters"
              autoFocus
              className="mt-1 w-full rounded border bg-white px-3 py-2"
            />
            {errors.accountName && (
              <span className="text-sm text-red-500">
                {errors.accountName.message}
              </span>
            )}
          </div>

          <div className="col-span-5 mb-4">
            <label className="block text-sm font-bold">For Business Unit</label>
            <Controller
              control={control}
              defaultValue={'I'}
              name="businessUnit"
              render={({ field: { onChange, value } }) => (
                <SelectField
                  value={businessUnitsOptions.find(
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
                  options={businessUnitsOptions}
                  isClearable={false}
                  isLoading={!businessUnitsOptions.length}
                />
              )}
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-bold">For Producer</label>
          <div className="flex justify-between space-x-4">
            <Controller
              control={control}
              name="producer"
              render={({ field: { onChange, value } }) => (
                <>
                  <SelectField
                    className="mr-2 w-full"
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
                    isLoading={!producersOptions.length}
                    isDisabled={!producersOptions.length}
                  />

                  <button
                    type="button"
                    className="cursor-pointer justify-self-end font-bold text-[#007b87] underline"
                    onClick={() => {
                      //   onChange('')
                      //   reset({ policyContact: '', producer: '' })
                    }}
                  >
                    Clear
                  </button>
                </>
              )}
            />
          </div>
        </div>
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-5 mb-4">
            <label className="block text-sm font-bold">Policy Contact</label>
            <Controller
              control={control}
              name="policyContact"
              render={({ field: { onChange, value } }) => (
                <SelectField
                  className="mr-2 w-full"
                  value={policyContactsOptions.find(
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
                  options={policyContactsOptions}
                  isClearable={false}
                  isLoading={!policyContactsOptions.length}
                  isDisabled={!policyContactsOptions.length}
                />
              )}
            />
          </div>

          <div className="col-span-7 mb-4 grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm font-bold">
                Proposed effective date
              </label>
              <input
                type="date"
                {...register('effectiveDate', { required: false })}
                className="mt-1 w-full rounded border bg-white px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-bold">
                Proposed expiration date
              </label>
              <input
                type="date"
                {...register('expirationDate', { required: false })}
                className="mt-1 w-full rounded border bg-white px-3 py-2"
              />
            </div>
          </div>
        </div>

        <button
          //   disabled={watch().accountName.length < 4}
          className={`float-end cursor-pointer rounded px-6 py-2 font-bold hover:bg-gray-700 ${
            false ? 'bg-gray-300 text-black' : 'bg-[#c60c30] text-white'
          } `}
        >
          Search
        </button>
      </form>
    </div>
  )
}
