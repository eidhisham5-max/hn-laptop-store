'use client'
import React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/utils'

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: 'bg-primary-500 text-white hover:bg-primary-600 active:bg-primary-700 shadow-button hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 active:shadow-sm',
        secondary: 'bg-transparent text-primary-500 border-2 border-primary-500 hover:bg-primary-50 hover:border-primary-600 hover:text-primary-600',
        outline: 'bg-transparent text-gray-900 border border-gray-300 hover:bg-gray-50 hover:border-gray-400',
        ghost: 'bg-transparent text-gray-900 hover:bg-gray-100',
        destructive: 'bg-error-500 text-white hover:bg-error-600 active:bg-error-700 shadow-button hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 active:shadow-sm'
      },
      size: {
        sm: 'h-8 px-3 text-sm rounded-lg',
        md: 'h-10 px-4 text-base rounded-lg',
        lg: 'h-12 px-6 text-lg rounded-xl',
        xl: 'h-14 px-8 text-xl rounded-xl',
        icon: 'h-10 w-10 rounded-lg'
      },
      fullWidth: {
        true: 'w-full',
        false: ''
      }
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
      fullWidth: false
    }
  }
)

export interface ButtonProps 
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className, 
    variant, 
    size, 
    fullWidth,
    loading = false,
    leftIcon,
    rightIcon,
    children, 
    disabled,
    ...props 
  }, ref) => {
    return (
      <button
        type={props.type || 'button'}
        className={cn(buttonVariants({ variant, size, fullWidth, className }))}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <svg
            className="w-4 h-4 animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {!loading && leftIcon && (
          <span className="flex-shrink-0">{leftIcon}</span>
        )}
        {children && (
          <span className={loading ? 'opacity-0' : 'opacity-100'}>
            {children}
          </span>
        )}
        {!loading && rightIcon && (
          <span className="flex-shrink-0">{rightIcon}</span>
        )}
      </button>
    )
  }
)

Button.displayName = 'Button'

export { Button, buttonVariants }
