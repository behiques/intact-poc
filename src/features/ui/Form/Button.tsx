'use client'

import React from 'react'

export interface ButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  buttonStyle?: 'solid' | 'outline'
  intent?: 'primary' | 'secondary' | 'ghost' | 'warning'
  size?: 'lg' | 'sm'
  block?: boolean
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, buttonStyle = 'solid' }, ref) => {
    if (buttonStyle === 'outline') {
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
