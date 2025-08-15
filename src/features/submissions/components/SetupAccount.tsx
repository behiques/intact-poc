import { Controller, useForm } from 'react-hook-form'

import { InputField } from '@/features/ui/Form/Input'
import { SelectField, SelectOption } from '@/features/ui/Form/Select'
import { FormGroup } from '@/features/ui/Form/FormGroup'
import { Button } from '@/features/ui/Form/Button'
import { CheckboxField } from '@/features/ui/Form/Checkbox'
import { useBusinessUnits } from '@/features/account-search/hooks/useBusinessUnits'
import { BusinessUnit, Producer } from '@/features/account-search/types'
import { useProducers } from '@/features/account-search/hooks/useProducers'
import { useTerritories } from '../hooks/useTerritories'
import { SIC, Territory } from '../types'
import { useSICs } from '../hooks/useSICs'
import { useLegalEntities } from '../hooks/useLegalEntities'

export const SetupAccount = () => {
  const { register, handleSubmit, watch, control } = useForm()

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

  // Fetch legal entities
  const { items: legalEntities, isLoading: loadingLegalEntities } =
    useLegalEntities()
  // Map legal entities to SelectField options
  const legalEntitiesOptions: SelectOption[] =
    legalEntities?.map((entity) => ({
      value: entity.value,
      label: entity.label,
    })) || []

  return (
    <form onSubmit={handleSubmit((data) => console.log(data))}>
      <FormGroup headerText="Specialty Business Unit">
        <div className="grid grid-cols-2 gap-7">
          <Controller
            control={control}
            name="businessUnit"
            defaultValue={'I'}
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
                isLoading={loadingBusinessUnits || !businessUnitsOptions.length}
              />
            )}
          />
          <Controller
            control={control}
            name="territory"
            render={({ field: { onChange, value } }) => (
              <SelectField
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
        <CheckboxField
          label="Select existing customer?"
          {...register('existingCustomer')}
        />

        {watch('existingCustomer') && (
          <InputField label="Customer name" required />
        )}

        <div className="grid grid-cols-2 gap-7">
          <InputField
            label="Account name"
            id="accountName"
            name="accountName"
            type="text"
            required
          />
          <div className="grid grid-cols-2 items-end gap-4">
            <InputField
              label="DUNS #"
              id="accountName"
              name="accountName"
              type="text"
            />
            <Button>D&B Lookup</Button>
          </div>
        </div>

        <InputField label="Additional name" />
        <Controller
          control={control}
          name="producer"
          render={({ field: { onChange, value } }) => (
            <SelectField
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

        <CheckboxField
          label="Is International?"
          {...register('isInternational')}
        />

        <SelectField label="Address Search" />
        <InputField label="Street" required />
        <div className="grid grid-cols-3 gap-4">
          <InputField label="City" required />
          <InputField label="State" required />
          <InputField label="Zip Code" required />
        </div>

        {watch('isInternational') && <InputField label="Country" required />}

        <InputField label="Attn or C/O" />
      </FormGroup>

      <FormGroup headerText="Account Details">
        <div className="grid grid-cols-2 gap-7">
          <InputField label="Doing business as (DBA)" optional />
        </div>

        <Controller
          control={control}
          name="sic"
          defaultValue={9999}
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
            name="naics"
            defaultValue={watch('sic') || 9999}
            render={({ field: { onChange, value } }) => (
              <SelectField
                label="NAICS"
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

          <InputField label="FEIN" optional />

          <Controller
            control={control}
            name="legalEntity"
            render={({ field: { onChange, value } }) => (
              <SelectField
                label="Legal Entity"
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
                isLoading={loadingLegalEntities || !legalEntitiesOptions.length}
              />
            )}
          />
        </div>

        <InputField
          label="Account description/Production title"
          {...register('accountDescription')}
        />
        <InputField label="Website" {...register('website')} />
      </FormGroup>
    </form>
  )
}
