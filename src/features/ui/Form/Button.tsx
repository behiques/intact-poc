'use client'

export const Button = ({
  children,
  type = 'solid',
}: {
  children: React.ReactNode
  type?: 'solid' | 'outline'
}) => {
  if (type === 'outline') {
    return <Outline>{children}</Outline>
  }

  return (
    <button
      type="button"
      className="rounded-md bg-gray-300 px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-0 hover:bg-gray-50 cursor-pointer"
    >
      {children}
    </button>
  )
}

const Outline = ({ children }: { children: React.ReactNode }) => {
  return (
    <button
      type="button"
      className="rounded border border-primary px-3 py-2 text-sm font-semibold text-primary shadow-xs ring-0 cursor-pointer"
    >
      {children}
    </button>
  )
}
