'use client'
import React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/utils'

const textareaVariants = cva(
  "flex w-full rounded-lg border-2 bg-white px-4 py-3 text-base transition-all duration-200 placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none",
  {
    variants: {
      variant: {
        default: "border-gray-200 focus:border-primary-500",
        error: "border-error-500 focus:border-error-500 focus-visible:ring-error-500",
        success: "border-success-500 focus:border-success-500 focus-visible:ring-success-500"
      },
      size: {
        sm: "min-h-[80px] px-3 py-2 text-sm",
        md: "min-h-[100px] px-4 py-3 text-base",
        lg: "min-h-[120px] px-4 py-3 text-lg"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "md"
    }
  }
)

export interface TextareaProps 
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    VariantProps<typeof textareaVariants> {
  label?: string
  error?: string
  helperText?: string
  required?: boolean
  fullWidth?: boolean
  showCharCount?: boolean
  maxLength?: number
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ 
    className, 
    variant,
    size,
    label,
    error,
    helperText,
    required = false,
    fullWidth = true,
    showCharCount = false,
    maxLength,
    id,
    value,
    ...props 
  }, ref) => {
    const textareaId = id || `textarea-${Math.random().toString(36).substr(2, 9)}`
    const textareaVariant = error ? "error" : variant
    const currentLength = typeof value === 'string' ? value.length : 0
    
    return (
      <div className={cn('space-y-2', fullWidth && 'w-full')}>
        {label && (
          <label 
            htmlFor={textareaId}
            className={cn(
              'text-sm font-medium text-gray-900',
              required && "after:content-['*'] after:ml-0.5 after:text-error-500"
            )}
          >
            {label}
          </label>
        )}
        
        <div className="relative">
          <textarea
            className={cn(
              textareaVariants({ variant: textareaVariant, size }),
              className
            )}
            ref={ref}
            id={textareaId}
            value={value}
            maxLength={maxLength}
            {...props}
          />
          
          {showCharCount && maxLength && (
            <div className="absolute bottom-2 right-2 text-xs text-gray-400">
              {currentLength}/{maxLength}
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

Textarea.displayName = 'Textarea'

export { Textarea, textareaVariants }
