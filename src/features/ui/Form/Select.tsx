'use client'

import { ComponentProps } from 'react'
import dynamic from 'next/dynamic'

const ReactSelect = dynamic(() => import('react-select'), { ssr: false })

export type SelectOption = {
  value: string
  label: string
  //   isDisabled?: boolean
}

type SelectProps = ComponentProps<typeof ReactSelect> & {
  feedback?: string
  isValid?: boolean
  isInvalid?: boolean
  isGroupOptions?: boolean
  overrideStyles?: Record<string, object>
}

export const SelectField: React.FC<SelectProps> = ({
  isClearable = true,
  isInvalid,
  ...props
}) => (
  <ReactSelect
    className={isInvalid ? 'error-picker-class' : ''}
    isClearable={isClearable}
    styles={{
      control: (baseStyles, state) => ({
        ...baseStyles,
        marginTop: 3,
        paddingTop: 3,
        paddingBottom: 3,
        borderColor: state.isFocused ? '#007b87' : '#007b87',
      }),
      dropdownIndicator: (baseStyles) => ({
        ...baseStyles,
        color: '#007b87',
      }),
    }}
    {...props}
  />
)
