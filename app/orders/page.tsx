'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { 
  Search, 
  Package, 
  Truck, 
  CheckCircle, 
  Clock, 
  XCircle,
  Eye,
  Download,
  RefreshCw,
  ArrowLeft,
  Calendar,
  CreditCard,
  MapPin,
  Phone,
  Mail
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useAuth } from '@/contexts/auth-context'
import { formatPrice, formatDate } from '@/lib/utils'

export default function OrdersPage() {
  const { state: authState } = useAuth()
  const [orders, setOrders] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [sortBy, setSortBy] = useState('newest')

  // Mock orders data
  const mockOrders = [
    {
      id: 'ORD-001',
      orderNumber: 'HN-001',
      date: '2024-01-15',
      status: 'completed',
      paymentStatus: 'paid',
      shippingStatus: 'delivered',
      total: 12999,
      items: [
        {
          id: 1,
          name: 'MacBook Pro 16" M3 Max',
          brand: 'Apple',
          price: 12999,
          quantity: 1,
          image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=200&h=200&fit=crop',
          specifications: 'Apple M3 Max, 32GB RAM, 1TB SSD'
        }
      ],
      shippingAddress: {
        name: 'أحمد محمد العلي',
        street: 'شارع الملك فهد، حي النخيل',
        city: 'الرياض',
        state: 'منطقة الرياض',
        postalCode: '12345',
        country: 'المملكة العربية السعودية',
        phone: '+966501234567'
      },
      paymentMethod: {
        type: 'card',
        last4: '1234',
        brand: 'Visa'
      },
      trackingNumber: 'TRK123456789',
      estimatedDelivery: '2024-01-17',
      actualDelivery: '2024-01-16'
    },
    {
      id: 'ORD-002',
      orderNumber: 'HN-002',
      date: '2024-01-14',
      status: 'shipped',
      paymentStatus: 'paid',
      shippingStatus: 'in_transit',
      total: 8999,
      items: [
        {
          id: 2,
          name: 'Dell XPS 15 OLED',
          brand: 'Dell',
          price: 8999,
          quantity: 1,
          image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=200&h=200&fit=crop',
          specifications: 'Intel i7, 16GB RAM, 512GB SSD'
        }
      ],
      shippingAddress: {
        name: 'فاطمة أحمد السعيد',
        street: 'شارع التحلية، حي الزهراء',
        city: 'جدة',
        state: 'منطقة مكة المكرمة',
        postalCode: '21432',
        country: 'المملكة العربية السعودية',
        phone: '+966507654321'
      },
      paymentMethod: {
        type: 'card',
        last4: '5678',
        brand: 'Mastercard'
      },
      trackingNumber: 'TRK987654321',
      estimatedDelivery: '2024-01-18'
    },
    {
      id: 'ORD-003',
      orderNumber: 'HN-003',
      date: '2024-01-13',
      status: 'pending',
      paymentStatus: 'pending',
      shippingStatus: 'preparing',
      total: 6500,
      items: [
        {
          id: 3,
          name: 'ASUS ROG Strix G15',
          brand: 'ASUS',
          price: 6500,
          quantity: 1,
          image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=200&h=200&fit=crop',
          specifications: 'AMD Ryzen 7, 16GB RAM, RTX 4060'
        }
      ],
      shippingAddress: {
        name: 'محمد العلي الأحمد',
        street: 'شارع الملك عبدالعزيز، حي الفيصلية',
        city: 'الدمام',
        state: 'المنطقة الشرقية',
        postalCode: '31421',
        country: 'المملكة العربية السعودية',
        phone: '+966509876543'
      },
      paymentMethod: {
        type: 'bank_transfer',
        last4: '',
        brand: 'Bank Transfer'
      },
      estimatedDelivery: '2024-01-20'
    }
  ]

  // Load orders
  useEffect(() => {
    const loadOrders = async () => {
      try {
        setLoading(true)
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000))
        setOrders(mockOrders)
      } catch (error) {
        console.error('Failed to load orders:', error)
      } finally {
        setLoading(false)
      }
    }

    loadOrders()
  }, [])

  // Filter and sort orders
  const filteredOrders = orders
    .filter(order => {
      if (statusFilter !== 'all' && order.status !== statusFilter) return false
      if (searchQuery && !order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase())) return false
      return true
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.date).getTime() - new Date(a.date).getTime()
        case 'oldest':
          return new Date(a.date).getTime() - new Date(b.date).getTime()
        case 'amount-high':
          return b.total - a.total
        case 'amount-low':
          return a.total - b.total
        default:
          return 0
      }
    })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800'
      case 'shipped':
        return 'bg-blue-100 text-blue-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'cancelled':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'مكتمل'
      case 'shipped':
        return 'تم الشحن'
      case 'pending':
        return 'في الانتظار'
      case 'cancelled':
        return 'ملغي'
      default:
        return status
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return CheckCircle
      case 'shipped':
        return Truck
      case 'pending':
        return Clock
      case 'cancelled':
        return XCircle
      default:
        return Package
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container-custom py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-6">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/">
                <ArrowLeft className="w-4 h-4" />
              </Link>
            </Button>
            <div>
              <h1 className="text-3xl font-bold mb-2">طلباتي</h1>
              <p className="text-muted-foreground">
                تتبع وإدارة جميع طلباتك في مكان واحد
              </p>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="البحث برقم الطلب..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pr-10"
                />
              </div>
            </div>
            <div className="flex gap-4">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="فلترة حسب الحالة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">جميع الطلبات</SelectItem>
                  <SelectItem value="pending">في الانتظار</SelectItem>
                  <SelectItem value="shipped">تم الشحن</SelectItem>
                  <SelectItem value="completed">مكتمل</SelectItem>
                  <SelectItem value="cancelled">ملغي</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="ترتيب حسب" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">الأحدث</SelectItem>
                  <SelectItem value="oldest">الأقدم</SelectItem>
                  <SelectItem value="amount-high">أعلى مبلغ</SelectItem>
                  <SelectItem value="amount-low">أقل مبلغ</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Orders List */}
        {loading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, index) => (
              <Card key={index} className="animate-pulse">
                <CardContent className="p-6">
                  <div className="h-4 bg-muted rounded mb-2 w-1/4" />
                  <div className="h-4 bg-muted rounded mb-4 w-1/2" />
                  <div className="h-6 bg-muted rounded w-1/3" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : filteredOrders.length > 0 ? (
          <div className="space-y-6">
            {filteredOrders.map((order, index) => {
              const StatusIcon = getStatusIcon(order.status)
              return (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 space-x-reverse">
                          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                            <StatusIcon className="w-6 h-6 text-primary" />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold">{order.orderNumber}</h3>
                            <p className="text-sm text-muted-foreground">
                              {formatDate(order.date)}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge className={getStatusColor(order.status)}>
                            {getStatusText(order.status)}
                          </Badge>
                          <p className="text-lg font-bold mt-2">
                            {formatPrice(order.total)}
                          </p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {/* Order Items */}
                        <div>
                          <h4 className="font-medium mb-3">المنتجات</h4>
                          <div className="space-y-3">
                            {order.items.map((item: any) => (
                              <div key={item.id} className="flex items-center space-x-4 space-x-reverse">
                                <div className="relative w-16 h-16 flex-shrink-0">
                                  <Image
                                    src={item.image}
                                    alt={item.name}
                                    fill
                                    className="object-cover rounded-lg"
                                  />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <h5 className="font-medium line-clamp-1">{item.name}</h5>
                                  <p className="text-sm text-muted-foreground">{item.brand}</p>
                                  <p className="text-sm text-muted-foreground">{item.specifications}</p>
                                </div>
                                <div className="text-right">
                                  <p className="font-medium">{formatPrice(item.price)}</p>
                                  <p className="text-sm text-muted-foreground">الكمية: {item.quantity}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Order Details */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t">
                          <div>
                            <h5 className="font-medium mb-2 flex items-center">
                              <MapPin className="w-4 h-4 ml-2" />
                              عنوان الشحن
                            </h5>
                            <div className="text-sm text-muted-foreground">
                              <p>{order.shippingAddress.name}</p>
                              <p>{order.shippingAddress.street}</p>
                              <p>{order.shippingAddress.city}, {order.shippingAddress.state}</p>
                              <p>{order.shippingAddress.phone}</p>
                            </div>
                          </div>
                          
                          <div>
                            <h5 className="font-medium mb-2 flex items-center">
                              <CreditCard className="w-4 h-4 ml-2" />
                              طريقة الدفع
                            </h5>
                            <div className="text-sm text-muted-foreground">
                              <p>{order.paymentMethod.brand}</p>
                              {order.paymentMethod.last4 && (
                                <p>•••• {order.paymentMethod.last4}</p>
                              )}
                              <Badge variant="outline" className="mt-1">
                                {order.paymentStatus === 'paid' ? 'مدفوع' : 'في الانتظار'}
                              </Badge>
                            </div>
                          </div>
                          
                          <div>
                            <h5 className="font-medium mb-2 flex items-center">
                              <Truck className="w-4 h-4 ml-2" />
                              معلومات الشحن
                            </h5>
                            <div className="text-sm text-muted-foreground">
                              {order.trackingNumber && (
                                <p>رقم التتبع: {order.trackingNumber}</p>
                              )}
                              {order.estimatedDelivery && (
                                <p>التسليم المتوقع: {formatDate(order.estimatedDelivery)}</p>
                              )}
                              {order.actualDelivery && (
                                <p>تم التسليم: {formatDate(order.actualDelivery)}</p>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-wrap gap-2 pt-4 border-t">
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4 ml-2" />
                            عرض التفاصيل
                          </Button>
                          <Button variant="outline" size="sm">
                            <Download className="w-4 h-4 ml-2" />
                            تحميل الفاتورة
                          </Button>
                          {order.status === 'completed' && (
                            <Button variant="outline" size="sm">
                              <RefreshCw className="w-4 h-4 ml-2" />
                              إعادة الطلب
                            </Button>
                          )}
                          {order.status === 'pending' && (
                            <Button variant="outline" size="sm" className="text-red-600">
                              إلغاء الطلب
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        ) : (
          <Card className="p-12 text-center">
            <div className="text-6xl mb-4">📦</div>
            <h3 className="text-xl font-semibold mb-2">لا توجد طلبات</h3>
            <p className="text-muted-foreground mb-6">
              لم تقم بإجراء أي طلبات بعد. ابدأ التسوق الآن!
            </p>
            <Button asChild>
              <Link href="/products">
                ابدأ التسوق
              </Link>
            </Button>
          </Card>
        )}
      </div>
    </div>
  )
}
