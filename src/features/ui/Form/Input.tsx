'use client'

import { Feedback } from './Feedback'

export const InputField = ({
  label,
  required,
  optional,
  isInvalid = false,
  feedback,
  ...rest
}: {
  label: string
  required?: boolean
  optional?: boolean
  isValid?: boolean
  isInvalid?: boolean
  feedback?: string

  [key: string]: unknown
}) => {
  return (
    <div>
      <label className="block text-sm/6 font-bold text-gray-900 relative">
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
      <div className="mt-2 grid grid-cols-1">
        <input
          className="block w-full rounded bg-white px-3 py-2.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-1 focus:-outline-offset-2 focus:outline-teal-600 sm:text-sm/6"
          {...rest}
        />
      </div>
      <Feedback isInvalid={isInvalid} feedback={feedback} />
    </div>
  )
}
