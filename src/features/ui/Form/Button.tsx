'use client'

import React from 'react'

type ButtonProps = {
  children: React.ReactNode
  style?: 'solid' | 'outline'
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, style = 'solid' }, ref) => {
    if (style === 'outline') {
      return <Outline>{children}</Outline>
    }

    return (
      <button
        ref={ref}
        type="button"
        className="rounded-md bg-gray-300 px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-0 hover:bg-gray-50 cursor-pointer"
      >
        {children}
      </button>
    )
  }
)

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

Button.displayName = 'Button'
