'use client'

import { ComponentProps } from 'react'
import dynamic from 'next/dynamic'
import { Feedback } from './Feedback'

const ReactSelect = dynamic(() => import('react-select'), { ssr: false })
const ReactAsyncSelect = dynamic(() => import('react-select/async'), {
  ssr: false,
})

export type SelectOption = {
  value: string
  label: string
  //   isDisabled?: boolean
}

type SelectProps = ComponentProps<typeof ReactSelect> & {
  isAsync?: boolean
  label?: string
  required?: boolean
  optional?: boolean
  feedback?: string
  isValid?: boolean
  isInvalid?: boolean
  isGroupOptions?: boolean
  overrideStyles?: Record<string, object>
}

export const SelectField: React.FC<SelectProps> = ({
  isAsync,
  label,
  required,
  optional,
  isClearable = true,
  isInvalid,
  feedback,
  ...props
}) => (
  <div className="grow">
    <label
      htmlFor="email"
      className="relative block text-sm/6 font-bold text-gray-900"
    >
      {label}
      {required && (
        <small className="absolute ml-1 text-xl font-bold text-red-600">
          *
        </small>
      )}
      {optional && (
        <small className="ml-1 text-xs font-bold text-gray-400">
          (optional)
        </small>
      )}
    </label>
    {isAsync ? (
      <ReactAsyncSelect {...props} />
    ) : (
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
    )}

    <Feedback isInvalid={isInvalid} feedback={feedback} />
  </div>
)
