'use client'
import React from 'react'
import { cn } from '../../lib/utils'

export interface LoadingSpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  variant?: 'primary' | 'secondary' | 'white'
  text?: string
}

const LoadingSpinner = React.forwardRef<HTMLDivElement, LoadingSpinnerProps>(
  ({ className, size = 'md', variant = 'primary', text, ...props }, ref) => {
    const sizes = {
      sm: 'w-4 h-4',
      md: 'w-6 h-6',
      lg: 'w-8 h-8',
      xl: 'w-12 h-12'
    }
    
    const variants = {
      primary: 'border-primary-500',
      secondary: 'border-gray-500',
      white: 'border-white'
    }
    
    return (
      <div
        ref={ref}
        className={cn('flex flex-col items-center justify-center gap-2', className)}
        {...props}
      >
        <div
          className={cn(
            'animate-spin rounded-full border-2 border-transparent border-t-current',
            sizes[size],
            variants[variant]
          )}
        />
        {text && (
          <p className="text-sm text-gray-600 animate-pulse">{text}</p>
        )}
      </div>
    )
  }
)

LoadingSpinner.displayName = 'LoadingSpinner'

export { LoadingSpinner }
