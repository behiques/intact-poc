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
      className="block text-sm/6 font-bold text-gray-900 relative"
    >
      {label}
      {required && (
        <small className="text-red-600 font-bold text-xl ml-1 absolute">
          *
        </small>
      )}
      {optional && (
        <small className="text-gray-400 font-bold text-xs ml-1">
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
