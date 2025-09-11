'use client'
import React, { useId } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/utils'

const selectVariants = cva(
  "flex w-full rounded-lg border-2 bg-white px-4 py-3 text-base transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 appearance-none cursor-pointer",
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

export interface SelectOption {
  value: string
  label: string
  disabled?: boolean
}

export interface SelectProps 
  extends React.SelectHTMLAttributes<HTMLSelectElement>,
    VariantProps<typeof selectVariants> {
  label?: string
  error?: string
  helperText?: string
  options: SelectOption[]
  placeholder?: string
  required?: boolean
  fullWidth?: boolean
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ 
    className, 
    variant,
    size,
    label,
    error,
    helperText,
    options,
    placeholder,
    required = false,
    fullWidth = true,
    id,
    ...props 
  }, ref) => {
    const autoId = useId()
    const selectId = id || autoId
    const selectVariant = error ? "error" : variant
    
    return (
      <div className={cn('space-y-2', fullWidth && 'w-full')}>
        {label && (
          <label 
            htmlFor={selectId}
            className={cn(
              'text-sm font-medium text-gray-900',
              required && "after:content-['*'] after:ml-0.5 after:text-error-500"
            )}
          >
            {label}
          </label>
        )}
        
        <div className="relative">
          <select
            className={cn(
              selectVariants({ variant: selectVariant, size }),
              className
            )}
            ref={ref}
            id={selectId}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((option) => (
              <option 
                key={option.value} 
                value={option.value}
                disabled={option.disabled}
              >
                {option.label}
              </option>
            ))}
          </select>
          
          {/* Custom dropdown arrow */}
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
            <svg
              className="w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
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

Select.displayName = 'Select'

export { Select, selectVariants }
