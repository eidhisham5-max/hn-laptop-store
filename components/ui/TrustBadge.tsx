import React from 'react'
import { Shield, Truck, Headphones, Award } from 'lucide-react'
import { cn } from '@/lib/utils'

interface TrustBadgeProps {
  type: 'shipping' | 'security' | 'support' | 'warranty'
  text: string
  className?: string
}

const TrustBadge: React.FC<TrustBadgeProps> = ({ type, text, className }) => {
  const icons = {
    shipping: Truck,
    security: Shield,
    support: Headphones,
    warranty: Award
  }
  
  const Icon = icons[type]
  
  return (
    <div className={cn('trust-badge', className)}>
      <Icon className="w-5 h-5 text-success-500" />
      <span className="text-sm text-gray-600">{text}</span>
    </div>
  )
}

export { TrustBadge }