'use client'
import React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/utils'

const progressVariants = cva(
  "w-full bg-gray-200 rounded-full overflow-hidden",
  {
    variants: {
      size: {
        sm: "h-2",
        md: "h-3",
        lg: "h-4"
      },
      variant: {
        default: "bg-gray-200",
        success: "bg-success-100",
        warning: "bg-warning-100",
        error: "bg-error-100",
        info: "bg-info-100"
      }
    },
    defaultVariants: {
      size: "md",
      variant: "default"
    }
  }
)

const progressBarVariants = cva(
  "h-full transition-all duration-300 ease-out rounded-full",
  {
    variants: {
      variant: {
        default: "bg-primary-500",
        success: "bg-success-500",
        warning: "bg-warning-500",
        error: "bg-error-500",
        info: "bg-info-500"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
)

export interface ProgressProps extends VariantProps<typeof progressVariants> {
  value: number
  max?: number
  showLabel?: boolean
  label?: string
  showPercentage?: boolean
  className?: string
  barClassName?: string
}

const Progress: React.FC<ProgressProps> = ({
  value,
  max = 100,
  size,
  variant,
  showLabel = false,
  label,
  showPercentage = false,
  className,
  barClassName
}) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100)
  
  return (
    <div className="w-full">
      {(showLabel || showPercentage) && (
        <div className="flex justify-between items-center mb-2">
          {showLabel && (
            <span className="text-sm font-medium text-gray-700">
              {label || 'Progress'}
            </span>
          )}
          {showPercentage && (
            <span className="text-sm text-gray-500">
              {Math.round(percentage)}%
            </span>
          )}
        </div>
      )}
      
      <div className={cn(progressVariants({ size, variant }), className)}>
        <div
          className={cn(progressBarVariants({ variant }), barClassName)}
          style={{ width: `${percentage}%` }}
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={max}
          aria-label={label || 'Progress'}
        />
      </div>
    </div>
  )
}

export { Progress, progressVariants, progressBarVariants }
