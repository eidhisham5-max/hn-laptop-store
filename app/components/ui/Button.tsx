'use client'
import React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/utils'

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 font-medium transition-all duration-normal ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        primary: 'bg-primary-500 text-text-inverse border-transparent shadow-button hover:bg-primary-600 hover:shadow-lg hover:-translate-y-0.5 active:bg-primary-700 active:translate-y-0 active:shadow-sm disabled:bg-neutral-300 disabled:text-text-disabled disabled:shadow-none disabled:transform-none',
        secondary: 'bg-transparent text-primary-500 border-2 border-primary-500 hover:bg-primary-50 hover:border-primary-600 hover:text-primary-600 active:bg-primary-100 disabled:bg-neutral-100 disabled:border-neutral-300 disabled:text-text-disabled',
        ghost: 'bg-transparent text-text-secondary border-transparent hover:bg-neutral-100 hover:text-text-primary active:bg-neutral-200',
        outline: 'bg-transparent text-text-primary border border-border-default hover:bg-neutral-50 hover:border-border-strong active:bg-neutral-100',
        destructive: 'bg-error-500 text-text-inverse border-transparent shadow-button hover:bg-error-600 hover:shadow-lg hover:-translate-y-0.5 active:bg-error-700 active:translate-y-0 active:shadow-sm'
      },
      size: {
        sm: 'h-8 px-4 text-body-sm rounded-md min-w-[64px]',
        md: 'h-12 px-6 text-body-md rounded-md min-w-[96px]', // 48px height for touch targets
        lg: 'h-14 px-8 text-body-lg rounded-lg min-w-[128px]',
        xl: 'h-16 px-10 text-body-xl rounded-lg min-w-[160px]',
        icon: 'h-12 w-12 rounded-md' // 48px for touch targets
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
