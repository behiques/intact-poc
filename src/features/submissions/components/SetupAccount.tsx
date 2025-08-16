import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'

import { SelectField, SelectOption } from '@/features/ui/Form/Select'
import { FormGroup } from '@/features/ui/Form/FormGroup'
import { Button } from '@/features/ui/Form/Button'
import { Field } from '@/features/ui/Form'
import { useBusinessUnits } from '@/features/account-search/hooks/useBusinessUnits'
import { BusinessUnit, Producer } from '@/features/account-search/types'
import { useProducers } from '@/features/account-search/hooks/useProducers'
import { useTerritories } from '../hooks/useTerritories'
import { CreateAccountPayload, Customer, NAIC, SIC, Territory } from '../types'
import { useSICs } from '../hooks/useSICs'
import { useLegalEntities } from '../hooks/useLegalEntities'
import { Alert } from '@/features/ui/Alert'
import { useCustomers } from '@/features/common/hooks/useCustomers'
import { setupAccountSchema } from '../validations/setup-account'
import { useNAICsBySICQuery } from '../api/fetchNAICs'

export const SetupAccount = ({
  onSubmit,
}: {
  onSubmit: (data: CreateAccountPayload) => void
}) => {
  const {
    register,
    setValue,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<z.input<typeof setupAccountSchema>>({
    // resolver: zodResolver(setupAccountSchema),
  })

  // Fetch business units
  const { items: businessUnits, isLoading: loadingBusinessUnits } =
    useBusinessUnits()

  // Map business units to SelectField options
  const businessUnitsOptions: SelectOption[] =
    businessUnits?.map((bu: BusinessUnit) => ({
      value: bu.businessUnitId,
      label: bu.name,
    })) || []

  const selectedBusinessUnit = watch('businessUnit') as string

  // Fetch producers based on selected business unit
  const { items: producers, isLoading: loadingProducers } =
    useProducers(selectedBusinessUnit)

  // Map producers to SelectField options
  const producersOptions: SelectOption[] =
    producers?.map((producer: Producer) => ({
      value: producer.producerCode,
      label: `${producer.producerCode} - ${producer.name} - ${producer.address1} ${producer.city}, ${producer.stateCode}`,
    })) || []

  // Fetch territories
  const { items: territories, isLoading: loadingTerritories } = useTerritories()

  // Map territories to SelectField options
  const territoryOptions: SelectOption[] =
    territories?.map((territory: Territory) => ({
      value: territory.value,
      label: territory.name,
    })) || []

  // Fetch SICs
  const { items: sics, isLoading: loadingSICs } = useSICs()
  // Map SICs to SelectField options
  const sicsOptions: SelectOption[] =
    sics?.map((sic: SIC) => ({
      value: sic.sicCode.toString(),
      label: sic.description,
    })) || []

  // Fetch NAICs by SIC code
  const { items: naics, isLoading: loadingNAICs } = useNAICsBySICQuery(
    watch('sicCode')
  )
  // Map NAICs to SelectField options
  const naicsOptions: SelectOption[] =
    naics?.map((naic: NAIC) => ({
      value: naic.naicsCode.toString(),
      label: naic.description,
    })) || []

  // Fetch legal entities
  const { items: legalEntities, isLoading: loadingLegalEntities } =
    useLegalEntities()
  // Map legal entities to SelectField options
  const legalEntitiesOptions: SelectOption[] =
    legalEntities?.map((entity) => ({
      value: entity.value,
      label: entity.label,
    })) || []

  // Fetch customers for the selected business unit
  const { items: customers, isLoading: loadingCustomers } = useCustomers({
    BusinessUnitId: selectedBusinessUnit,
    CustomerName: watch('CustomerName'),
  })

  // Map legal entities to SelectField options
  const customerOptions: SelectOption[] =
    customers?.map((customer: Customer) => ({
      value: customer.customerId,
      label: customer.customerName1 + ' - ' + customer.addressDescription,
    })) || []

  return (
    <form onSubmit={handleSubmit((data) => onSubmit(data))}>
      {Object.keys(errors).length > 0 && (
        <div className="mb-6">
          <Alert
            type="error"
            message="Please correct all fields outlined in red."
          />
        </div>
      )}

      <div className="overflow-x-auto min-h-screen">
        <FormGroup headerText="Specialty Business Unit">
          <div className="grid grid-cols-2 gap-7">
            <Controller
              control={control}
              name="businessUnit"
              defaultValue={'I'}
              render={({ field: { onChange, value } }) => (
                <SelectField
                  label="Business Unit"
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
                  required
                  isClearable={false}
                  isLoading={
                    loadingBusinessUnits || !businessUnitsOptions.length
                  }
                />
              )}
            />
            <Controller
              control={control}
              name="territory"
              render={({ field: { onChange, value } }) => (
                <SelectField
                  label="Territory"
                  value={territoryOptions.find(
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
                  options={territoryOptions}
                  isClearable={false}
                  isLoading={loadingTerritories || !territoryOptions.length}
                />
              )}
            />
          </div>
        </FormGroup>

        <FormGroup headerText="Create Account">
          <Field.Checkbox
            label="Select existing customer?"
            {...register('existingCustomer')}
          />

          {watch('existingCustomer') && (
            <>
              <Controller
                control={control}
                name="CustomerName"
                render={({ field: { onChange, value } }) => (
                  <SelectField
                    label="Customer name"
                    placeholder="Minimum 4 characters"
                    value={customerOptions.find(
                      (option: SelectOption) => option.value === value
                    )}
                    onInputChange={(newValue) =>
                      setValue('CustomerName', newValue)
                    }
                    onChange={(newValue) => {
                      if (
                        newValue &&
                        typeof newValue === 'object' &&
                        'value' in newValue
                      ) {
                        onChange((newValue as SelectOption).value)
                        setValue('customerId', (newValue as SelectOption).value)
                      } else {
                        onChange('')
                      }
                    }}
                    options={customerOptions}
                    required
                    isClearable={false}
                    isLoading={loadingCustomers}
                    isInvalid={!!errors.CustomerName}
                    feedback={errors.CustomerName?.message}
                  />
                )}
                rules={{
                  minLength: {
                    value: 4,
                    message: 'Customer name must be at least 4 characters',
                  },
                }}
              />
              <input type="hidden" {...register('customerId')} />
            </>
          )}

          <div className="grid grid-cols-2 gap-7 items-start">
            <Field.Input
              label="Account name"
              type="text"
              required
              {...register('name.name1', {
                required: {
                  value: true,
                  message: 'Account name is required',
                },
              })}
              isInvalid={!!errors.name?.name1}
              feedback={errors.name?.name1?.message}
            />
            <div className="grid grid-cols-2 items-end gap-4">
              <Field.Input
                label="DUNS #"
                type="text"
                {...register('dunsNumber')}
              />
              <Button>D&B Lookup</Button>
            </div>
          </div>

          <Field.Input
            label="Additional name"
            type="text"
            {...register('name.name2')}
          />

          <Controller
            control={control}
            name="producerCode"
            render={({ field: { onChange, value } }) => (
              <SelectField
                label="Producer"
                required
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
                isInvalid={!!errors.producerCode}
                feedback={errors.producerCode?.message}
              />
            )}
            rules={{
              required: {
                value: true,
                message: 'Producer is required',
              },
            }}
          />

          <Field.Checkbox
            label="Is International?"
            {...register('isInternational')}
          />

          <SelectField label="Address Search" />
          <Field.Input
            label="Street"
            required
            {...register('address.street', {
              required: {
                value: true,
                message: 'Street is required',
              },
            })}
            isInvalid={!!errors.address?.street}
            feedback={errors.address?.street?.message}
          />
          <div className="grid grid-cols-3 gap-4">
            <Field.Input
              label="City"
              required
              {...register('address.city', {
                required: {
                  value: true,
                  message: 'City is required',
                },
              })}
              isInvalid={!!errors.address?.city}
              feedback={errors.address?.city?.message}
            />
            <Field.Input
              label="State"
              required
              {...register('address.state', {
                required: {
                  value: true,
                  message: 'State is required',
                },
              })}
              isInvalid={!!errors.address?.state}
              feedback={errors.address?.state?.message}
            />
            <Field.Input
              label="Zip Code"
              required
              {...register('address.zip', {
                required: {
                  value: true,
                  message: 'Zip code is required',
                },
              })}
              isInvalid={!!errors.address?.zip}
              feedback={errors.address?.zip?.message}
            />
          </div>

          {watch('isInternational') && (
            <Field.Input
              label="Country"
              required
              {...register('address.country', {
                required: {
                  value: true,
                  message: 'Country is required',
                },
              })}
              isInvalid={!!errors.address?.country}
              feedback={errors.address?.country?.message}
            />
          )}

          <Field.Input label="Attn or C/O" {...register('address.mailStop')} />
        </FormGroup>

        <FormGroup headerText="Account Details">
          <div className="grid grid-cols-2 gap-7 items-end">
            <Field.Input
              label="Doing business as (DBA)"
              optional
              {...register('doingBusinessAs')}
            />
            <Button buttonStyle="outline" onClick={() => {}}>
              Add DBA
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-7 items-end">
            <Field.Input
              label="Formerly known as (FKA)"
              optional
              {...register('formerlyKnownAs')}
            />
            <Button buttonStyle="outline" onClick={() => {}}>
              Add FKA
            </Button>
          </div>

          <Controller
            control={control}
            name="sicCode"
            defaultValue={'9999'}
            render={({ field: { onChange, value } }) => (
              <SelectField
                label="SIC"
                value={sicsOptions.find(
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
                options={sicsOptions}
                isClearable={false}
                isLoading={loadingSICs || !sicsOptions.length}
              />
            )}
          />

          <div className="grid grid-cols-3 gap-7">
            <Controller
              control={control}
              name="naicsCode"
              defaultValue={watch('sicCode') || 9999}
              render={({ field: { onChange, value } }) => (
                <SelectField
                  label="NAICS"
                  value={naicsOptions.find(
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
                  options={naicsOptions}
                  isClearable={false}
                  isLoading={loadingNAICs || !naicsOptions.length}
                />
              )}
            />

            <Field.Input label="FEIN" optional {...register('fein')} />

            <Controller
              control={control}
              name="defaultLegalEntityId"
              render={({ field: { onChange, value } }) => (
                <SelectField
                  label="Legal Entity"
                  required
                  value={legalEntitiesOptions.find(
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
                  options={legalEntitiesOptions}
                  isClearable={false}
                  isLoading={
                    loadingLegalEntities || !legalEntitiesOptions.length
                  }
                  isInvalid={!!errors.defaultLegalEntityId}
                  feedback={errors.defaultLegalEntityId?.message}
                />
              )}
              rules={{
                required: {
                  value: true,
                  message: 'Legal entity is required',
                },
              }}
            />
          </div>

          <Field.Input
            label="Business description"
            {...register('businessDescription')}
          />
          <Field.Input
            label="Account description/Production title"
            {...register('description')}
          />
          <Field.Input label="Website" {...register('websiteUrl')} />
        </FormGroup>
      </div>
      <footer className="fixed start-0 bottom-0 p-3 bg-teal-50 w-full text-right space-x-7">
        <button
          onClick={() => {}}
          className="font-bold text-teal-800 bg-transparent py-2 px-4 rounded-sm text-sm cursor-pointer"
          type="button"
        >
          Save
        </button>

        <button
          className="font-bold text-white bg-teal-800 py-2 px-4 rounded-sm text-sm cursor-pointer"
          type="submit"
        >
          Setup Submission
        </button>
      </footer>
    </form>
  )
}
