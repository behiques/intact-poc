'use client'

export const FormGroup = ({
  headerText,
  children,
}: {
  headerText: string
  children: React.ReactNode
}) => {
  return (
    <div className="divide-y divide-gray-200 rounded bg-white shadow-sm w-full mb-7">
      <div className="px-4 py-3 sm:px-6 font-bold bg-teal-50">{headerText}</div>
      <div className="px-4 py-5 sm:p-6 space-y-7">{children}</div>
    </div>
  )
}
