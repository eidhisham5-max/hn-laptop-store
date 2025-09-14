'use client'

import React from 'react'
import { Card, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  ShoppingCart,
  Users,
  Package,
  Eye,
  Star
} from 'lucide-react'

interface StatsCardProps {
  title: string
  value: string | number
  change?: {
    value: number
    type: 'increase' | 'decrease'
    period: string
  }
  icon: React.ElementType
  color: 'primary' | 'success' | 'warning' | 'error'
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, change, icon: Icon, color }) => {
  const colorClasses = {
    primary: 'bg-primary-50 text-primary-600',
    success: 'bg-success-50 text-success-600',
    warning: 'bg-yellow-50 text-yellow-600',
    error: 'bg-error-50 text-error-600'
  }

  const badgeColors = {
    increase: 'success',
    decrease: 'error'
  } as const

  return (
    <Card className="hover:shadow-medium transition-all duration-200">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
            <p className="text-2xl font-bold text-gray-800 mb-2">{value}</p>
            
            {change && (
              <div className="flex items-center space-x-2 space-x-reverse">
                <Badge 
                  variant={badgeColors[change.type]}
                  size="sm"
                >
                  {change.type === 'increase' ? (
                    <TrendingUp className="w-3 h-3 ml-1" />
                  ) : (
                    <TrendingDown className="w-3 h-3 ml-1" />
                  )}
                  {Math.abs(change.value)}%
                </Badge>
                <span className="text-sm text-gray-500">{change.period}</span>
              </div>
            )}
          </div>
          
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${colorClasses[color]}`}>
            <Icon className="w-6 h-6" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

const StatsCards: React.FC = () => {
  const stats = [
    {
      title: 'إجمالي المبيعات',
      value: '2,450,000 ريال',
      change: { value: 12.5, type: 'increase' as const, period: 'من الشهر الماضي' },
      icon: DollarSign,
      color: 'success' as const
    },
    {
      title: 'عدد الطلبات',
      value: '1,234',
      change: { value: 8.2, type: 'increase' as const, period: 'من الشهر الماضي' },
      icon: ShoppingCart,
      color: 'primary' as const
    },
    {
      title: 'العملاء الجدد',
      value: '456',
      change: { value: 3.1, type: 'decrease' as const, period: 'من الشهر الماضي' },
      icon: Users,
      color: 'warning' as const
    },
    {
      title: 'المنتجات المباعة',
      value: '3,789',
      change: { value: 15.7, type: 'increase' as const, period: 'من الشهر الماضي' },
      icon: Package,
      color: 'success' as const
    },
    {
      title: 'معدل التحويل',
      value: '3.2%',
      change: { value: 2.4, type: 'increase' as const, period: 'من الشهر الماضي' },
      icon: TrendingUp,
      color: 'primary' as const
    },
    {
      title: 'متوسط قيمة الطلب',
      value: '1,985 ريال',
      change: { value: 5.8, type: 'increase' as const, period: 'من الشهر الماضي' },
      icon: DollarSign,
      color: 'success' as const
    },
    {
      title: 'زوار الموقع',
      value: '45,678',
      change: { value: 7.3, type: 'increase' as const, period: 'من الشهر الماضي' },
      icon: Eye,
      color: 'warning' as const
    },
    {
      title: 'تقييم العملاء',
      value: '4.8/5',
      change: { value: 0.2, type: 'increase' as const, period: 'من الشهر الماضي' },
      icon: Star,
      color: 'success' as const
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <StatsCard
          key={index}
          title={stat.title}
          value={stat.value}
          change={stat.change}
          icon={stat.icon}
          color={stat.color}
        />
      ))}
    </div>
  )
}

export default StatsCards