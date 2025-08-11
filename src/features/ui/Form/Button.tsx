'use client'

export const Button = ({ children }: { children: React.ReactNode }) => {
  return (
    <button
      type="button"
      className="rounded-md bg-gray-300 px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50 cursor-pointer"
    >
      {children}
    </button>
  )
}
