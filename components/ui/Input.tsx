import React from 'react'
import { cn } from '@/lib/utils'
import { Eye, EyeOff } from 'lucide-react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string | undefined
  helperText?: string
  icon?: React.ReactNode
  iconPosition?: 'left' | 'right'
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = 'text', label, error, helperText, icon, iconPosition = 'right', ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false)
    const isPassword = type === 'password'
    const inputType = isPassword && showPassword ? 'text' : type
    
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {label}
          </label>
        )}
        
        <div className="relative">
          {icon && iconPosition === 'left' && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <div className="w-5 h-5 text-gray-400">
                {icon}
              </div>
            </div>
          )}
          
          <input
            type={inputType}
            className={cn(
              'input-field',
              icon && iconPosition === 'left' && 'pr-10',
              (icon && iconPosition === 'right') || isPassword ? 'pl-10' : '',
              error && 'input-error',
              className
            )}
            ref={ref}
            {...props}
          />
          
          {(icon && iconPosition === 'right') && !isPassword && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <div className="w-5 h-5 text-gray-400">
                {icon}
              </div>
            </div>
          )}
          
          {isPassword && (
            <button
              type="button"
              className="absolute inset-y-0 left-0 pl-3 flex items-center"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5 text-gray-400 hover:text-gray-600" />
              ) : (
                <Eye className="w-5 h-5 text-gray-400 hover:text-gray-600" />
              )}
            </button>
          )}
        </div>
        
        {error && (
          <p className="mt-1 text-sm text-error-500">{error}</p>
        )}
        
        {helperText && !error && (
          <p className="mt-1 text-sm text-gray-500">{helperText}</p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

export { Input }