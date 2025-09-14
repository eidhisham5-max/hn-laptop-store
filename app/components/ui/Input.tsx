'use client'
import React, { useId } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/utils'

const inputVariants = cva(
  "flex w-full rounded-md border-2 bg-background-primary px-4 py-3 text-body-md font-arabic transition-all duration-normal ease-out file:border-0 file:bg-transparent file:text-body-sm file:font-medium placeholder:text-text-disabled focus-visible:outline-none focus-visible:border-primary-500 focus-visible:shadow-[0_0_0_3px_rgba(11,109,243,0.1)] disabled:cursor-not-allowed disabled:bg-neutral-100 disabled:text-text-disabled hover:border-border-strong",
  {
    variants: {
      variant: {
        default: "border-border-default text-text-primary",
        error: "border-error-500 text-text-primary focus-visible:border-error-500 focus-visible:shadow-[0_0_0_3px_rgba(231,76,60,0.1)]",
        success: "border-success-500 text-text-primary focus-visible:border-success-500 focus-visible:shadow-[0_0_0_3px_rgba(32,201,151,0.1)]"
      },
      size: {
        sm: "h-10 px-3 py-2 text-body-sm min-h-[40px]",
        md: "h-12 px-4 py-3 text-body-md min-h-[48px]", // Touch target compliance
        lg: "h-14 px-4 py-3 text-body-lg min-h-[56px]"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "md"
    }
  }
)

export interface InputProps 
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
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
              'text-body-sm font-medium text-text-primary block',
              required && "after:content-['*'] after:mr-0.5 after:text-error-500"
            )}
          >
            {label}
          </label>
        )}
        
        <div className="relative">
          {leftIcon && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-text-disabled"> {/* RTL: left becomes right */}
              {leftIcon}
            </div>
          )}
          
          <input
            type={type}
            className={cn(
              inputVariants({ variant: inputVariant, size }),
              leftIcon && "pr-10", /* RTL: pl becomes pr */
              rightIcon && "pl-10", /* RTL: pr becomes pl */
              className
            )}
            ref={ref}
            id={inputId}
            dir="auto" // Auto-detect text direction
            {...props}
          />
          
          {rightIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-text-disabled"> {/* RTL: right becomes left */}
              {rightIcon}
            </div>
          )}
        </div>
        
        {error && (
          <p className="text-body-sm text-error-500 font-medium" role="alert" aria-live="polite">
            {error}
          </p>
        )}
        
        {helperText && !error && (
          <p className="text-body-sm text-text-secondary">
            {helperText}
          </p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

export { Input, inputVariants }
