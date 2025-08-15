'use client'

export const InputField = ({
  label,
  required,
  optional,
  ...rest
}: {
  label: string
  required?: boolean
  optional?: boolean
  [key: string]: unknown
}) => {
  return (
    <div>
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
      <div className="mt-2 grid grid-cols-1">
        <input
          className="block w-full rounded bg-white px-3 py-2.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-1 focus:-outline-offset-2 focus:outline-teal-600 sm:text-sm/6"
          {...rest}
        />

        {/* <input
          defaultValue="adamwathan"
          id="email"
          name="email"
          type="email"
          placeholder="you@example.com"
          aria-invalid="true"
          aria-describedby="email-error"
          className="col-start-1 row-start-1 block w-full rounded-md bg-white py-1.5 pr-10 pl-3 text-base text-red-900 outline-1 -outline-offset-1 outline-red-300 placeholder:text-red-300 focus:outline-2 focus:-outline-offset-2 focus:outline-red-600 sm:pr-9 sm:text-sm/6"
          {...rest}
        /> */}
        {/* <ExclamationCircleIcon
            aria-hidden="true"
            className="pointer-events-none col-start-1 row-start-1 mr-3 size-5 self-center justify-self-end text-red-500 sm:size-4"
          /> */}
      </div>
      {/* <p id="email-error" className="mt-2 text-sm text-red-600">
          Not a valid email address.
        </p> */}
    </div>
  )
}
