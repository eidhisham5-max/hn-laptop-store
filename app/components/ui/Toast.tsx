'use client'
import React, { useEffect, useState } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/utils'

const toastVariants = cva(
  "flex items-center gap-3 p-4 rounded-lg shadow-lg border transition-all duration-300 ease-in-out",
  {
    variants: {
      variant: {
        success: "bg-success-50 border-success-200 text-success-800",
        error: "bg-error-50 border-error-200 text-error-800",
        warning: "bg-warning-50 border-warning-200 text-warning-800",
        info: "bg-info-50 border-info-200 text-info-800"
      },
      position: {
        'top-right': 'fixed top-4 right-4 z-50',
        'top-left': 'fixed top-4 left-4 z-50',
        'bottom-right': 'fixed bottom-4 right-4 z-50',
        'bottom-left': 'fixed bottom-4 left-4 z-50',
        'top-center': 'fixed top-4 left-1/2 transform -translate-x-1/2 z-50',
        'bottom-center': 'fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50'
      }
    },
    defaultVariants: {
      variant: 'info',
      position: 'top-right'
    }
  }
)

export interface ToastProps extends VariantProps<typeof toastVariants> {
  id?: string
  title?: string
  message: string
  duration?: number
  onClose?: () => void
  showCloseButton?: boolean
  className?: string
}

const Toast: React.FC<ToastProps> = ({
  id,
  title,
  message,
  variant = 'info',
  position = 'top-right',
  duration = 5000,
  onClose,
  showCloseButton = true,
  className
}) => {
  const [isVisible, setIsVisible] = useState(true)
  const [isLeaving, setIsLeaving] = useState(false)

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        handleClose()
      }, duration)

      return () => clearTimeout(timer)
    }
  }, [duration])

  const handleClose = () => {
    setIsLeaving(true)
    setTimeout(() => {
      setIsVisible(false)
      onClose?.()
    }, 300)
  }

  if (!isVisible) return null

  const icons = {
    success: (
      <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
      </svg>
    ),
    error: (
      <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
      </svg>
    ),
    warning: (
      <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
      </svg>
    ),
    info: (
      <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
      </svg>
    )
  }

  return (
    <div
      className={cn(
        toastVariants({ variant, position }),
        isLeaving && 'opacity-0 translate-x-full',
        className
      )}
      role="alert"
      aria-live="polite"
    >
      {icons[variant]}
      
      <div className="flex-1 min-w-0">
        {title && (
          <p className="font-medium text-sm">{title}</p>
        )}
        <p className="text-sm opacity-90">{message}</p>
      </div>
      
      {showCloseButton && (
        <button
          onClick={handleClose}
          className="flex-shrink-0 p-1 hover:bg-black/10 rounded transition-colors"
          aria-label="Close notification"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  )
}

export { Toast, toastVariants }
