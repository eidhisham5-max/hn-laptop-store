'use client'
import React, { useId } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/utils'

const inputVariants = cva(
  "flex w-full rounded-lg border-2 bg-white px-4 py-3 text-base transition-all duration-200 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "border-gray-200 focus:border-primary-500",
        error: "border-error-500 focus:border-error-500 focus-visible:ring-error-500",
        success: "border-success-500 focus:border-success-500 focus-visible:ring-success-500"
      },
      size: {
        sm: "h-9 px-3 py-2 text-sm",
        md: "h-11 px-4 py-3 text-base",
        lg: "h-12 px-4 py-3 text-lg"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "md"
    }
  }
)

export interface InputProps 
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {
  label?: string
  error?: string
  helperText?: string
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  required?: boolean
  fullWidth?: boolean
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ 
    className, 
    type = 'text',
    variant,
    size,
    label,
    error,
    helperText,
    leftIcon,
    rightIcon,
    required = false,
    fullWidth = true,
    id,
    ...props 
  }, ref) => {
    const autoId = useId()
    const inputId = id || autoId
    const inputVariant = error ? "error" : variant
    
    return (
      <div className={cn('space-y-2', fullWidth && 'w-full')}>
        {label && (
          <label 
            htmlFor={inputId}
            className={cn(
              'text-sm font-medium text-gray-900',
              required && "after:content-['*'] after:ml-0.5 after:text-error-500"
            )}
          >
            {label}
          </label>
        )}
        
        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              {leftIcon}
            </div>
          )}
          
          <input
            type={type}
            className={cn(
              inputVariants({ variant: inputVariant, size }),
              leftIcon && "pl-10",
              rightIcon && "pr-10",
              className
            )}
            ref={ref}
            id={inputId}
            {...props}
          />
          
          {rightIcon && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
              {rightIcon}
            </div>
          )}
        </div>
        
        {error && (
          <p className="text-sm text-error-500">{error}</p>
        )}
        
        {helperText && !error && (
          <p className="text-sm text-gray-500">{helperText}</p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

export { Input, inputVariants }
