import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default:
          'border-transparent bg-primary text-primary-foreground hover:bg-primary/80',
        secondary:
          'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
        destructive:
          'border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80',
        outline: 'text-foreground',
        success:
          'border-transparent bg-success text-white hover:bg-success/80',
        warning:
          'border-transparent bg-warning text-white hover:bg-warning/80',
        error:
          'border-transparent bg-error text-white hover:bg-error/80',
        info:
          'border-transparent bg-info text-white hover:bg-info/80',
        new:
          'border-transparent bg-green-100 text-green-800 hover:bg-green-200',
        refurbished:
          'border-transparent bg-yellow-100 text-yellow-800 hover:bg-yellow-200',
        used:
          'border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200',
        sale:
          'border-transparent bg-red-100 text-red-800 hover:bg-red-200',
        featured:
          'border-transparent bg-purple-100 text-purple-800 hover:bg-purple-200',
        trending:
          'border-transparent bg-blue-100 text-blue-800 hover:bg-blue-200',
        limited:
          'border-transparent bg-orange-100 text-orange-800 hover:bg-orange-200',
      },
      size: {
        sm: 'px-2 py-0.5 text-xs',
        default: 'px-2.5 py-0.5 text-xs',
        lg: 'px-3 py-1 text-sm',
        xl: 'px-4 py-1.5 text-base',
      },
      shape: {
        default: 'rounded-full',
        rounded: 'rounded-md',
        square: 'rounded-none',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      shape: 'default',
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  asChild?: boolean
  icon?: React.ReactNode
  removable?: boolean
  onRemove?: () => void
}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  (
    {
      className,
      variant,
      size,
      shape,
      asChild = false,
      icon,
      removable = false,
      onRemove,
      children,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? 'div' : 'div'
    
    return (
      <Comp
        ref={ref}
        className={cn(badgeVariants({ variant, size, shape, className }))}
        {...props}
      >
        {icon && <span className="mr-1">{icon}</span>}
        {children}
        {removable && (
          <button
            type="button"
            onClick={onRemove}
            className="ml-1 inline-flex h-4 w-4 items-center justify-center rounded-full hover:bg-black/10 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            aria-label="Remove badge"
          >
            <svg
              className="h-3 w-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </Comp>
    )
  }
)
Badge.displayName = 'Badge'

export { Badge, badgeVariants }