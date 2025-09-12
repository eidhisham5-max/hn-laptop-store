'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { formatPrice, formatDate } from '@/lib/utils'
import { Eye, MoreHorizontal } from 'lucide-react'

interface Order {
  id: string
  customerName: string
  customerEmail: string
  total: number
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  date: Date
  items: number
}

const RecentOrders: React.FC = () => {
  const orders: Order[] = [
    {
      id: 'HN001234',
      customerName: 'أحمد محمد',
      customerEmail: 'ahmed@example.com',
      total: 12999,
      status: 'processing',
      date: new Date('2024-01-15'),
      items: 2
    },
    {
      id: 'HN001235',
      customerName: 'فاطمة علي',
      customerEmail: 'fatima@example.com',
      total: 8999,
      status: 'shipped',
      date: new Date('2024-01-14'),
      items: 1
    },
    {
      id: 'HN001236',
      customerName: 'خالد السعد',
      customerEmail: 'khalid@example.com',
      total: 6999,
      status: 'delivered',
      date: new Date('2024-01-13'),
      items: 1
    },
    {
      id: 'HN001237',
      customerName: 'نورا أحمد',
      customerEmail: 'nora@example.com',
      total: 15999,
      status: 'pending',
      date: new Date('2024-01-12'),
      items: 3
    },
    {
      id: 'HN001238',
      customerName: 'محمد العلي',
      customerEmail: 'mohammed@example.com',
      total: 11999,
      status: 'cancelled',
      date: new Date('2024-01-11'),
      items: 1
    }
  ]

  const getStatusBadge = (status: Order['status']) => {
    const statusConfig = {
      pending: { variant: 'warning' as const, label: 'في الانتظار' },
      processing: { variant: 'primary' as const, label: 'قيد المعالجة' },
      shipped: { variant: 'primary' as const, label: 'تم الشحن' },
      delivered: { variant: 'success' as const, label: 'تم التسليم' },
      cancelled: { variant: 'error' as const, label: 'ملغي' }
    }

    const config = statusConfig[status]
    return <Badge variant={config.variant}>{config.label}</Badge>
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>الطلبات الأخيرة</CardTitle>
          <Button variant="outline" size="sm">
            عرض الكل
          </Button>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors duration-200"
            >
              <div className="flex items-center space-x-4 space-x-reverse">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                  <span className="text-primary-600 font-semibold text-sm">
                    {order.customerName.charAt(0)}
                  </span>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-800">{order.customerName}</h4>
                  <p className="text-sm text-gray-500">{order.customerEmail}</p>
                  <p className="text-xs text-gray-400">{formatDate(order.date)}</p>
                </div>
              </div>

              <div className="flex items-center space-x-4 space-x-reverse">
                <div className="text-right">
                  <p className="font-semibold text-gray-800">{formatPrice(order.total)}</p>
                  <p className="text-sm text-gray-500">{order.items} منتج</p>
                </div>
                
                <div className="flex items-center space-x-2 space-x-reverse">
                  {getStatusBadge(order.status)}
                  
                  <div className="flex items-center space-x-1 space-x-reverse">
                    <Button variant="ghost" size="sm">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default RecentOrders