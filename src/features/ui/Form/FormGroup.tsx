'use client'

export const FormGroup = ({
  headerText,
  children,
}: {
  headerText: string
  children: React.ReactNode
}) => {
  return (
    <div className="mb-7 w-full divide-y divide-gray-200 rounded bg-white shadow-sm">
      <div className="bg-teal-50 px-4 py-3 font-bold sm:px-6">{headerText}</div>
      <div className="space-y-7 px-4 py-5 sm:p-6">{children}</div>
    </div>
  )
}
