'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  Edit,
  Save,
  X,
  Camera,
  Shield,
  CreditCard,
  ShoppingBag,
  Heart,
  Settings,
  LogOut,
  Eye
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useAuth } from '@/contexts/auth-context'
import { cn } from '@/lib/utils'
import { toast } from 'react-hot-toast'

export default function ProfilePage() {
  const { state: authState, logout } = useAuth()
  const updateProfile = (data: any) => {
    // Mock update profile function
    console.log('Updating profile:', data)
  }
  const [editing, setEditing] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    firstName: authState.user?.firstName || '',
    lastName: authState.user?.lastName || '',
    email: authState.user?.email || '',
    phone: authState.user?.phone || '',
    address: (authState.user as any)?.address || '',
    city: (authState.user as any)?.city || '',
    dateOfBirth: authState.user?.dateOfBirth || ''
  })

  // Mock data
  const mockOrders = [
    {
      id: 'ORD-001',
      date: '2024-01-15',
      status: 'completed',
      total: 12999,
      items: ['MacBook Pro 16" M3 Max']
    },
    {
      id: 'ORD-002',
      date: '2024-01-10',
      status: 'shipped',
      total: 8999,
      items: ['Dell XPS 15 OLED']
    },
    {
      id: 'ORD-003',
      date: '2024-01-05',
      status: 'pending',
      total: 6500,
      items: ['ASUS ROG Strix G15']
    }
  ]

  const mockWishlist = [
    {
      id: 1,
      name: 'MacBook Air M2',
      price: 8999,
      image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=200&h=200&fit=crop'
    },
    {
      id: 2,
      name: 'iPad Pro 12.9"',
      price: 4999,
      image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=200&h=200&fit=crop'
    }
  ]

  // Handle form input changes
  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  // Handle save profile
  const handleSave = async () => {
    setLoading(true)
    try {
      await updateProfile(formData)
      setEditing(false)
      toast.success('تم تحديث الملف الشخصي بنجاح')
    } catch (error: any) {
      toast.error(error.message || 'فشل في تحديث الملف الشخصي')
    } finally {
      setLoading(false)
    }
  }

  // Handle cancel editing
  const handleCancel = () => {
    setFormData({
      firstName: authState.user?.firstName || '',
      lastName: authState.user?.lastName || '',
      email: authState.user?.email || '',
      phone: authState.user?.phone || '',
      address: (authState.user as any)?.address || '',
      city: (authState.user as any)?.city || '',
      dateOfBirth: authState.user?.dateOfBirth || ''
    })
    setEditing(false)
  }

  // Handle logout
  const handleLogout = () => {
    logout()
    toast.success('تم تسجيل الخروج بنجاح')
  }

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

  return (
    <div className="min-h-screen bg-background">
      <div className="container-custom py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">الملف الشخصي</h1>
          <p className="text-muted-foreground">إدارة معلوماتك الشخصية وطلباتك</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-6">
                <div className="text-center">
                  <div className="relative inline-block mb-4">
                    <Avatar className="w-24 h-24">
                      <AvatarImage src={authState.user?.avatar} />
                      <AvatarFallback>
                        {authState.user?.firstName?.[0]}{authState.user?.lastName?.[0]}
                      </AvatarFallback>
                    </Avatar>
                    <Button
                      size="icon"
                      className="absolute bottom-0 right-0 w-8 h-8 rounded-full"
                      onClick={() => toast('تحديث الصورة قريباً')}
                    >
                      <Camera className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  <h2 className="text-xl font-semibold mb-1">
                    {authState.user?.firstName} {authState.user?.lastName}
                  </h2>
                  <p className="text-muted-foreground mb-4">{authState.user?.email}</p>
                  
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center justify-center space-x-2 space-x-reverse">
                      <Phone className="w-4 h-4" />
                      <span>{authState.user?.phone || 'لم يتم إضافة رقم الهاتف'}</span>
                    </div>
                    <div className="flex items-center justify-center space-x-2 space-x-reverse">
                      <MapPin className="w-4 h-4" />
                      <span>{(authState.user as any)?.city || 'لم يتم إضافة المدينة'}</span>
                    </div>
                    <div className="flex items-center justify-center space-x-2 space-x-reverse">
                      <Calendar className="w-4 h-4" />
                      <span>عضو منذ يناير 2024</span>
                    </div>
                  </div>

                  <div className="mt-6 space-y-2">
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => setEditing(!editing)}
                    >
                      <Edit className="w-4 h-4 ml-2" />
                      {editing ? 'إلغاء التعديل' : 'تعديل الملف الشخصي'}
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full text-red-600 hover:text-red-700"
                      onClick={handleLogout}
                    >
                      <LogOut className="w-4 h-4 ml-2" />
                      تسجيل الخروج
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="profile" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="profile">الملف الشخصي</TabsTrigger>
                <TabsTrigger value="orders">الطلبات</TabsTrigger>
                <TabsTrigger value="wishlist">قائمة الأمنيات</TabsTrigger>
                <TabsTrigger value="settings">الإعدادات</TabsTrigger>
              </TabsList>

              {/* Profile Tab */}
              <TabsContent value="profile" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>معلومات شخصية</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="firstName">الاسم الأول</Label>
                        <Input
                          id="firstName"
                          value={formData.firstName}
                          onChange={(e) => handleChange('firstName', e.target.value)}
                          disabled={!editing}
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName">اسم العائلة</Label>
                        <Input
                          id="lastName"
                          value={formData.lastName}
                          onChange={(e) => handleChange('lastName', e.target.value)}
                          disabled={!editing}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="email">البريد الإلكتروني</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleChange('email', e.target.value)}
                          disabled={!editing}
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">رقم الهاتف</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => handleChange('phone', e.target.value)}
                          disabled={!editing}
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="address">العنوان</Label>
                      <Input
                        id="address"
                        value={formData.address}
                        onChange={(e) => handleChange('address', e.target.value)}
                        disabled={!editing}
                        placeholder="أدخل عنوانك الكامل"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="city">المدينة</Label>
                        <Input
                          id="city"
                          value={formData.city}
                          onChange={(e) => handleChange('city', e.target.value)}
                          disabled={!editing}
                        />
                      </div>
                      <div>
                        <Label htmlFor="dateOfBirth">تاريخ الميلاد</Label>
                        <Input
                          id="dateOfBirth"
                          type="date"
                          value={formData.dateOfBirth instanceof Date ? formData.dateOfBirth.toISOString().split('T')[0] : formData.dateOfBirth}
                          onChange={(e) => handleChange('dateOfBirth', e.target.value)}
                          disabled={!editing}
                        />
                      </div>
                    </div>

                    {editing && (
                      <div className="flex space-x-4 space-x-reverse">
                        <Button onClick={handleSave} disabled={loading}>
                          <Save className="w-4 h-4 ml-2" />
                          {loading ? 'جاري الحفظ...' : 'حفظ التغييرات'}
                        </Button>
                        <Button variant="outline" onClick={handleCancel}>
                          <X className="w-4 h-4 ml-2" />
                          إلغاء
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Orders Tab */}
              <TabsContent value="orders" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>طلباتي</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mockOrders.map((order) => (
                        <div key={order.id} className="border rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <div>
                              <h3 className="font-semibold">طلب #{order.id}</h3>
                              <p className="text-sm text-muted-foreground">{order.date}</p>
                            </div>
                            <div className="text-right">
                              <p className="font-semibold">{order.total.toLocaleString()} ريال</p>
                              <Badge className={getStatusColor(order.status)}>
                                {getStatusText(order.status)}
                              </Badge>
                            </div>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {order.items.join(', ')}
                          </div>
                          <div className="mt-3 flex space-x-2 space-x-reverse">
                            <Button variant="outline" size="sm">
                              <Eye className="w-4 h-4 ml-2" />
                              عرض التفاصيل
                            </Button>
                            {order.status === 'completed' && (
                              <Button variant="outline" size="sm">
                                إعادة الطلب
                              </Button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Wishlist Tab */}
              <TabsContent value="wishlist" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>قائمة الأمنيات</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {mockWishlist.map((item) => (
                        <div key={item.id} className="border rounded-lg p-4">
                          <div className="flex space-x-4 space-x-reverse">
                            <div className="w-20 h-20 bg-muted rounded-lg flex-shrink-0">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-full h-full object-cover rounded-lg"
                              />
                            </div>
                            <div className="flex-1">
                              <h3 className="font-semibold mb-1">{item.name}</h3>
                              <p className="text-lg font-bold text-primary mb-2">
                                {item.price.toLocaleString()} ريال
                              </p>
                              <div className="flex space-x-2 space-x-reverse">
                                <Button size="sm">
                                  <ShoppingBag className="w-4 h-4 ml-2" />
                                  أضف للسلة
                                </Button>
                                <Button variant="outline" size="sm">
                                  <X className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Settings Tab */}
              <TabsContent value="settings" className="mt-6">
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Shield className="w-5 h-5 ml-2" />
                        الأمان
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">تغيير كلمة المرور</h3>
                          <p className="text-sm text-muted-foreground">
                            قم بتحديث كلمة المرور لحماية حسابك
                          </p>
                        </div>
                        <Button variant="outline">
                          تغيير
                        </Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">المصادقة الثنائية</h3>
                          <p className="text-sm text-muted-foreground">
                            إضافة طبقة حماية إضافية لحسابك
                          </p>
                        </div>
                        <Button variant="outline">
                          تفعيل
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <CreditCard className="w-5 h-5 ml-2" />
                        طرق الدفع
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center py-8">
                        <CreditCard className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                        <p className="text-muted-foreground mb-4">
                          لم تقم بإضافة أي بطاقات دفع بعد
                        </p>
                        <Button>
                          إضافة بطاقة دفع
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Settings className="w-5 h-5 ml-2" />
                        الإشعارات
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">إشعارات البريد الإلكتروني</h3>
                          <p className="text-sm text-muted-foreground">
                            تلقي تحديثات حول طلباتك وعروضنا
                          </p>
                        </div>
                        <Button variant="outline" size="sm">
                          تفعيل
                        </Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">إشعارات SMS</h3>
                          <p className="text-sm text-muted-foreground">
                            تلقي تحديثات مهمة عبر الرسائل النصية
                          </p>
                        </div>
                        <Button variant="outline" size="sm">
                          تفعيل
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
