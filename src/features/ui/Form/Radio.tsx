import React, { useContext } from 'react'
import { CheckCircleIcon } from '@heroicons/react/20/solid'
import { FieldContext } from '.'

export interface Props
  extends Omit<React.ComponentPropsWithRef<'input'>, 'size'> {
  size?: InputSizes
  checked?: boolean
  disabled?: boolean
  label?: string
}

export declare type InputSizes = 'sm' | 'lg'

export const RadioField = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement> & Props
>(({ label, ...props }, ref) => {
  const id = useContext(FieldContext)

  return (
    <fieldset>
      <div>
        <label className="group relative flex rounded-lg border border-gray-300 bg-white p-4 has-checked:outline-2 has-checked:-outline-offset-2 has-checked:bg-primary-lightest has-checked:outline-primary has-focus-visible:outline-3 has-focus-visible:-outline-offset-1 has-disabled:border-gray-400 has-disabled:bg-gray-200 has-disabled:opacity-25">
          <input
            ref={ref}
            id={id}
            {...props}
            type="radio"
            className="absolute inset-0 appearance-none focus:outline-none"
          />
          <CheckCircleIcon
            aria-hidden="true"
            className="mr-2 invisible size-5 text-primary group-has-checked:visible"
          />

          <div className="flex-1">
            <span className="block text-sm font-medium text-gray-900">
              {label}
            </span>
          </div>
        </label>
      </div>
    </fieldset>
  )
})
RadioField.displayName = 'RadioField'
