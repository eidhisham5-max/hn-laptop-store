'use client'
import React from 'react'
import { cn } from '../../lib/utils'

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info'
  size?: 'sm' | 'md' | 'lg'
  rounded?: boolean
}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant = 'default', size = 'md', rounded = true, ...props }, ref) => {
    const baseClasses = 'inline-flex items-center font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2'
    
    const variants = {
      default: 'bg-gray-100 text-gray-800 hover:bg-gray-200',
      primary: 'bg-primary-100 text-primary-800 hover:bg-primary-200',
      secondary: 'bg-gray-100 text-gray-800 hover:bg-gray-200',
      success: 'bg-success-100 text-success-800 hover:bg-success-200',
      warning: 'bg-warning-100 text-warning-800 hover:bg-warning-200',
      error: 'bg-error-100 text-error-800 hover:bg-error-200',
      info: 'bg-info-100 text-info-800 hover:bg-info-200'
    }
    
    const sizes = {
      sm: 'px-2 py-0.5 text-xs',
      md: 'px-2.5 py-1 text-sm',
      lg: 'px-3 py-1.5 text-base'
    }
    
    const roundedClass = rounded ? 'rounded-full' : 'rounded-md'
    
    return (
      <div
        ref={ref}
        className={cn(
          baseClasses,
          variants[variant],
          sizes[size],
          roundedClass,
          className
        )}
        {...props}
      />
    )
  }
)

Badge.displayName = 'Badge'

export { Badge }
