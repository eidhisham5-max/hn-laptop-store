'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Users, 
  Package, 
  ShoppingCart, 
  DollarSign, 
  TrendingUp, 
  TrendingDown,
  Eye,
  Edit,
  Trash2,
  Plus,
  Search,
  Filter,
  Download,
  Upload,
  BarChart3,
  PieChart,
  Activity,
  Calendar,
  Clock,
  Star,
  AlertCircle,
  CheckCircle,
  XCircle
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { cn } from '@/lib/utils'

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
    monthlyGrowth: 0,
    conversionRate: 0,
    averageOrderValue: 0,
    returnRate: 0
  })

  // Mock data
  const mockStats = {
    totalUsers: 1250,
    totalProducts: 450,
    totalOrders: 320,
    totalRevenue: 125000,
    monthlyGrowth: 15.5,
    conversionRate: 3.2,
    averageOrderValue: 390,
    returnRate: 2.1
  }

  const mockOrders = [
    {
      id: 'ORD-001',
      customer: 'أحمد محمد',
      product: 'MacBook Pro 16"',
      amount: 12999,
      status: 'completed',
      date: '2024-01-15',
      paymentMethod: 'Visa',
      shippingAddress: 'الرياض، حي النخيل'
    },
    {
      id: 'ORD-002',
      customer: 'فاطمة أحمد',
      product: 'Dell XPS 15',
      amount: 8999,
      status: 'pending',
      date: '2024-01-14',
      paymentMethod: 'Mastercard',
      shippingAddress: 'جدة، حي الزهراء'
    },
    {
      id: 'ORD-003',
      customer: 'محمد العلي',
      product: 'ASUS ROG Strix',
      amount: 6500,
      status: 'shipped',
      date: '2024-01-13',
      paymentMethod: 'PayPal',
      shippingAddress: 'الدمام، حي الفيصلية'
    }
  ]

  const mockProducts = [
    {
      id: 1,
      name: 'MacBook Pro 16" M3 Max',
      category: 'laptops',
      price: 12999,
      stock: 15,
      status: 'active',
      sales: 25,
      rating: 4.8,
      views: 1250
    },
    {
      id: 2,
      name: 'Dell XPS 15 OLED',
      category: 'laptops',
      price: 8999,
      stock: 8,
      status: 'active',
      sales: 18,
      rating: 4.6,
      views: 980
    },
    {
      id: 3,
      name: 'ASUS ROG Strix G15',
      category: 'gaming',
      price: 6500,
      stock: 0,
      status: 'out_of_stock',
      sales: 12,
      rating: 4.4,
      views: 750
    }
  ]

  const mockUsers = [
    {
      id: 1,
      name: 'أحمد محمد العلي',
      email: 'ahmed@example.com',
      phone: '+966501234567',
      joinDate: '2024-01-10',
      totalOrders: 5,
      totalSpent: 25000,
      status: 'active'
    },
    {
      id: 2,
      name: 'فاطمة أحمد السعيد',
      email: 'fatima@example.com',
      phone: '+966507654321',
      joinDate: '2024-01-08',
      totalOrders: 3,
      totalSpent: 15000,
      status: 'active'
    },
    {
      id: 3,
      name: 'محمد العلي الأحمد',
      email: 'mohammed@example.com',
      phone: '+966509876543',
      joinDate: '2024-01-05',
      totalOrders: 2,
      totalSpent: 8000,
      status: 'inactive'
    }
  ]

  const mockAnalytics = {
    salesData: [
      { month: 'يناير', sales: 45000 },
      { month: 'فبراير', sales: 52000 },
      { month: 'مارس', sales: 48000 },
      { month: 'أبريل', sales: 61000 },
      { month: 'مايو', sales: 58000 },
      { month: 'يونيو', sales: 67000 }
    ],
    categoryData: [
      { category: 'اللابتوبات', percentage: 45, value: 56250 },
      { category: 'الجيمنج', percentage: 25, value: 31250 },
      { category: 'الإكسسوارات', percentage: 20, value: 25000 },
      { category: 'الشاشات', percentage: 10, value: 12500 }
    ],
    topProducts: [
      { name: 'MacBook Pro 16"', sales: 25, revenue: 324975 },
      { name: 'Dell XPS 15', sales: 18, revenue: 161982 },
      { name: 'ASUS ROG Strix', sales: 12, revenue: 78000 }
    ]
  }

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setStats(mockStats)
      setLoading(false)
    }, 1000)
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'shipped':
        return 'bg-blue-100 text-blue-800'
      case 'cancelled':
        return 'bg-red-100 text-red-800'
      case 'active':
        return 'bg-green-100 text-green-800'
      case 'out_of_stock':
        return 'bg-red-100 text-red-800'
      case 'inactive':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'مكتمل'
      case 'pending':
        return 'في الانتظار'
      case 'shipped':
        return 'تم الشحن'
      case 'cancelled':
        return 'ملغي'
      case 'active':
        return 'نشط'
      case 'out_of_stock':
        return 'نفد المخزون'
      case 'inactive':
        return 'غير نشط'
      default:
        return status
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground font-medium">جاري تحميل لوحة التحكم...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container-custom py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">لوحة التحكم الإدارية</h1>
          <p className="text-muted-foreground">مرحباً بك في لوحة تحكم H.N Store</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">إجمالي المستخدمين</p>
                    <p className="text-2xl font-bold">{stats.totalUsers.toLocaleString()}</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
                <div className="flex items-center mt-2">
                  <TrendingUp className="w-4 h-4 text-green-500 ml-1" />
                  <span className="text-sm text-green-500">+12%</span>
                  <span className="text-sm text-muted-foreground mr-2">من الشهر الماضي</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">إجمالي المنتجات</p>
                    <p className="text-2xl font-bold">{stats.totalProducts.toLocaleString()}</p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <Package className="w-6 h-6 text-green-600" />
                  </div>
                </div>
                <div className="flex items-center mt-2">
                  <TrendingUp className="w-4 h-4 text-green-500 ml-1" />
                  <span className="text-sm text-green-500">+8%</span>
                  <span className="text-sm text-muted-foreground mr-2">من الشهر الماضي</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">إجمالي الطلبات</p>
                    <p className="text-2xl font-bold">{stats.totalOrders.toLocaleString()}</p>
                  </div>
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                    <ShoppingCart className="w-6 h-6 text-orange-600" />
                  </div>
                </div>
                <div className="flex items-center mt-2">
                  <TrendingUp className="w-4 h-4 text-green-500 ml-1" />
                  <span className="text-sm text-green-500">+15%</span>
                  <span className="text-sm text-muted-foreground mr-2">من الشهر الماضي</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">إجمالي الإيرادات</p>
                    <p className="text-2xl font-bold">{stats.totalRevenue.toLocaleString()} ريال</p>
                  </div>
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <DollarSign className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
                <div className="flex items-center mt-2">
                  <TrendingUp className="w-4 h-4 text-green-500 ml-1" />
                  <span className="text-sm text-green-500">+{stats.monthlyGrowth}%</span>
                  <span className="text-sm text-muted-foreground mr-2">من الشهر الماضي</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Additional Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">متوسط قيمة الطلب</p>
                  <p className="text-2xl font-bold">{stats.averageOrderValue} ريال</p>
                </div>
                <div className="w-12 h-12 bg-cyan-100 rounded-full flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-cyan-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">معدل التحويل</p>
                  <p className="text-2xl font-bold">{stats.conversionRate}%</p>
                </div>
                <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
                  <Activity className="w-6 h-6 text-indigo-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">معدل الإرجاع</p>
                  <p className="text-2xl font-bold">{stats.returnRate}%</p>
                </div>
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <XCircle className="w-6 h-6 text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
            <TabsTrigger value="orders">الطلبات</TabsTrigger>
            <TabsTrigger value="products">المنتجات</TabsTrigger>
            <TabsTrigger value="customers">العملاء</TabsTrigger>
            <TabsTrigger value="analytics">التحليلات</TabsTrigger>
            <TabsTrigger value="settings">الإعدادات</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Orders */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <ShoppingCart className="w-5 h-5 ml-2" />
                    الطلبات الأخيرة
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockOrders.slice(0, 5).map((order) => (
                      <div key={order.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">{order.customer}</p>
                          <p className="text-sm text-muted-foreground">{order.product}</p>
                          <p className="text-xs text-muted-foreground">{order.date}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{order.amount.toLocaleString()} ريال</p>
                          <Badge className={cn('text-xs', getStatusColor(order.status))}>
                            {getStatusText(order.status)}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Top Products */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Package className="w-5 h-5 ml-2" />
                    المنتجات الأكثر مبيعاً
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockProducts.slice(0, 5).map((product) => (
                      <div key={product.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">{product.name}</p>
                          <p className="text-sm text-muted-foreground">{product.category}</p>
                          <div className="flex items-center space-x-1 space-x-reverse mt-1">
                            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                            <span className="text-xs text-muted-foreground">{product.rating}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{product.sales} مبيع</p>
                          <p className="text-sm text-muted-foreground">{product.stock} متوفر</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>إجراءات سريعة</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Button className="h-20 flex-col space-y-2">
                    <Plus className="w-6 h-6" />
                    <span>منتج جديد</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex-col space-y-2">
                    <Users className="w-6 h-6" />
                    <span>عميل جديد</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex-col space-y-2">
                    <Download className="w-6 h-6" />
                    <span>تصدير البيانات</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex-col space-y-2">
                    <Upload className="w-6 h-6" />
                    <span>استيراد البيانات</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Orders Tab */}
          <TabsContent value="orders" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>إدارة الطلبات</CardTitle>
                  <div className="flex space-x-2 space-x-reverse">
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 ml-2" />
                      تصدير
                    </Button>
                    <Button size="sm">
                      <Plus className="w-4 h-4 ml-2" />
                      طلب جديد
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Filters */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Input placeholder="البحث في الطلبات..." className="flex-1" />
                    <Select>
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
                  </div>

                  {/* Orders Table */}
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-right p-3">رقم الطلب</th>
                          <th className="text-right p-3">العميل</th>
                          <th className="text-right p-3">المنتج</th>
                          <th className="text-right p-3">المبلغ</th>
                          <th className="text-right p-3">الحالة</th>
                          <th className="text-right p-3">التاريخ</th>
                          <th className="text-right p-3">الإجراءات</th>
                        </tr>
                      </thead>
                      <tbody>
                        {mockOrders.map((order) => (
                          <tr key={order.id} className="border-b">
                            <td className="p-3 font-medium">{order.id}</td>
                            <td className="p-3">{order.customer}</td>
                            <td className="p-3">{order.product}</td>
                            <td className="p-3">{order.amount.toLocaleString()} ريال</td>
                            <td className="p-3">
                              <Badge className={getStatusColor(order.status)}>
                                {getStatusText(order.status)}
                              </Badge>
                            </td>
                            <td className="p-3">{order.date}</td>
                            <td className="p-3">
                              <div className="flex space-x-2 space-x-reverse">
                                <Button variant="outline" size="sm">
                                  <Eye className="w-4 h-4" />
                                </Button>
                                <Button variant="outline" size="sm">
                                  <Edit className="w-4 h-4" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart3 className="w-5 h-5 ml-2" />
                    إحصائيات المبيعات
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center text-muted-foreground">
                    <div className="text-center">
                      <BarChart3 className="w-12 h-12 mx-auto mb-4" />
                      <p>رسم بياني للمبيعات</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <PieChart className="w-5 h-5 ml-2" />
                    توزيع الفئات
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center text-muted-foreground">
                    <div className="text-center">
                      <PieChart className="w-12 h-12 mx-auto mb-4" />
                      <p>رسم بياني للفئات</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
