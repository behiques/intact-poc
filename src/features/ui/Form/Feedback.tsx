import { ExclamationCircleIcon } from '@heroicons/react/20/solid'

export const Feedback = ({
  isInvalid = false,
  feedback,
}: {
  isInvalid?: boolean
  feedback?: string
}) =>
  isInvalid ? (
    <div className="flex items-center mt-2">
      <ExclamationCircleIcon
        aria-hidden="true"
        className="mr-2 size-5 text-red-500 sm:size-4"
      />
      <p id="email-error" className="text-sm font-bold text-red-700">
        {feedback}
      </p>
    </div>
  ) : (
    ''
  )
