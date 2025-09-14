'use client'

import React, { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { 
  CheckCircle, 
  Download, 
  Share2, 
  ArrowLeft, 
  Truck, 
  CreditCard,
  MapPin,
  Calendar,
  Package,
  Star,
  Heart
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { formatPrice, formatDate } from '@/lib/utils'
import { useCart } from '@/contexts/cart-context'

function CheckoutSuccessContent() {
  const searchParams = useSearchParams()
  const { clearCart } = useCart()
  const orderId = searchParams.get('orderId') || '12345'
  
  const [orderDetails, setOrderDetails] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  // Mock order details
  useEffect(() => {
    const loadOrderDetails = async () => {
      try {
        setLoading(true)
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500))
        
        const mockOrderDetails = {
          orderId: orderId,
          orderNumber: `HN-${orderId}`,
          orderDate: new Date(),
          status: 'confirmed',
          paymentStatus: 'paid',
          shippingStatus: 'preparing',
          totalAmount: 12999,
          items: [
            {
              id: 1,
              name: 'MacBook Pro 16" M3 Max',
              brand: 'Apple',
              price: 12999,
              quantity: 1,
              image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=200&h=200&fit=crop',
              specifications: 'Apple M3 Max, 32GB RAM, 1TB SSD',
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
          shippingMethod: {
            name: 'الشحن السريع',
            estimatedDelivery: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days
            cost: 50
          },
          trackingNumber: 'TRK123456789',
          notes: 'يرجى الاتصال قبل التوصيل'
        }
        
        setOrderDetails(mockOrderDetails)
        
        // Clear cart after successful order
        clearCart()
        
      } catch (error) {
        console.error('Failed to load order details:', error)
      } finally {
        setLoading(false)
      }
    }

    loadOrderDetails()
  }, [orderId, clearCart])

  // Handle download invoice
  const handleDownloadInvoice = () => {
    // Simulate invoice download
    const link = document.createElement('a')
    link.href = '#'
    link.download = `invoice-${orderId}.pdf`
    link.click()
  }

  // Handle share order
  const handleShareOrder = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'طلب جديد من H.N Store',
          text: `تم تأكيد طلبي رقم ${orderDetails?.orderNumber}`,
          url: window.location.href,
        })
      } catch (error) {
        console.log('Error sharing:', error)
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground font-medium">جاري تحميل تفاصيل الطلب...</p>
        </div>
      </div>
    )
  }

  if (!orderDetails) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">❌</div>
          <h1 className="text-2xl font-bold mb-4">خطأ في تحميل الطلب</h1>
          <p className="text-muted-foreground mb-6">لم نتمكن من تحميل تفاصيل الطلب</p>
          <Button asChild>
            <Link href="/">العودة للرئيسية</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container-custom py-16">
        <div className="max-w-4xl mx-auto">
          {/* Success Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg">
              <CheckCircle className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              تم تأكيد طلبك بنجاح!
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              شكراً لك على ثقتك بنا. سنقوم بإرسال رسالة تأكيد إلى بريدك الإلكتروني قريباً.
            </p>
            <div className="bg-primary/10 border border-primary/20 rounded-lg p-6 mb-8">
              <p className="text-lg text-primary font-medium">
                رقم الطلب: <span className="font-bold">{orderDetails.orderNumber}</span>
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                تاريخ الطلب: {formatDate(orderDetails.orderDate)}
              </p>
            </div>
          </motion.div>

          {/* Order Status Timeline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-12"
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Package className="w-5 h-5 ml-2" />
                  حالة الطلب
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4 space-x-reverse">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <div className="font-medium">تم تأكيد الطلب</div>
                      <div className="text-sm text-muted-foreground">
                        {formatDate(orderDetails.orderDate)}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 space-x-reverse">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                      <Package className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <div className="font-medium">جاري التحضير</div>
                      <div className="text-sm text-muted-foreground">
                        سيتم تحضير طلبك قريباً
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 space-x-reverse">
                    <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                      <Truck className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <div>
                      <div className="font-medium text-muted-foreground">جاري الشحن</div>
                      <div className="text-sm text-muted-foreground">
                        متوقع: {formatDate(orderDetails.shippingMethod.estimatedDelivery)}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Order Items */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>تفاصيل الطلب</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {orderDetails.items.map((item: any) => (
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
                          <h3 className="font-semibold text-lg">{item.name}</h3>
                          <p className="text-muted-foreground text-sm">{item.brand}</p>
                          <p className="text-muted-foreground text-sm">{item.specifications}</p>
                          <p className="text-muted-foreground text-sm">الكمية: {item.quantity}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-primary">
                            {formatPrice(item.price)}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <Separator className="my-6" />
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>المجموع الفرعي:</span>
                      <span className="font-medium">{formatPrice(orderDetails.totalAmount)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>الشحن:</span>
                      <span className="text-green-600">
                        {orderDetails.shippingMethod.cost === 0 ? 'مجاني' : formatPrice(orderDetails.shippingMethod.cost)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>ضريبة القيمة المضافة (15%):</span>
                      <span>{formatPrice(orderDetails.totalAmount * 0.15)}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between text-lg font-bold">
                      <span>المجموع:</span>
                      <span className="text-primary">{formatPrice(orderDetails.totalAmount + orderDetails.shippingMethod.cost + (orderDetails.totalAmount * 0.15))}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Shipping Information */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MapPin className="w-5 h-5 ml-2" />
                    معلومات الشحن
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">العنوان:</h3>
                    <div className="text-muted-foreground space-y-1">
                      <div>{orderDetails.shippingAddress.name}</div>
                      <div>{orderDetails.shippingAddress.street}</div>
                      <div>
                        {orderDetails.shippingAddress.city}, {orderDetails.shippingAddress.state} {orderDetails.shippingAddress.postalCode}
                      </div>
                      <div>{orderDetails.shippingAddress.country}</div>
                      <div>{orderDetails.shippingAddress.phone}</div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="font-semibold mb-2">طريقة الدفع:</h3>
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <CreditCard className="w-5 h-5" />
                      <span>
                        {orderDetails.paymentMethod.brand} •••• {orderDetails.paymentMethod.last4}
                      </span>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="font-semibold mb-2">طريقة الشحن:</h3>
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <Truck className="w-5 h-5" />
                      <span>{orderDetails.shippingMethod.name}</span>
                    </div>
                    <div className="text-sm text-muted-foreground mt-1">
                      تاريخ التسليم المتوقع: {formatDate(orderDetails.shippingMethod.estimatedDelivery)}
                    </div>
                  </div>
                  
                  {orderDetails.trackingNumber && (
                    <>
                      <Separator />
                      <div>
                        <h3 className="font-semibold mb-2">رقم التتبع:</h3>
                        <div className="flex items-center space-x-2 space-x-reverse">
                          <code className="bg-muted px-2 py-1 rounded text-sm">
                            {orderDetails.trackingNumber}
                          </code>
                          <Button variant="outline" size="sm">
                            تتبع
                          </Button>
                        </div>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-center space-y-4"
          >
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/orders">
                  عرض طلباتي
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/products">
                  متابعة التسوق
                </Link>
              </Button>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="outline" onClick={handleDownloadInvoice}>
                <Download className="w-4 h-4 ml-2" />
                تحميل الفاتورة
              </Button>
              <Button variant="outline" onClick={handleShareOrder}>
                <Share2 className="w-4 h-4 ml-2" />
                مشاركة الطلب
              </Button>
            </div>
            
            <p className="text-muted-foreground text-sm">
              إذا كان لديك أي استفسارات، لا تتردد في{' '}
              <Link href="/contact" className="text-primary hover:underline font-medium">
                التواصل معنا
              </Link>
            </p>
          </motion.div>

          {/* Recommended Products */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-16"
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Heart className="w-5 h-5 ml-2" />
                  منتجات قد تعجبك
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[1, 2, 3].map((item) => (
                    <div key={item} className="text-center">
                      <div className="w-full h-32 bg-muted rounded-lg mb-4"></div>
                      <h4 className="font-medium mb-2">منتج مقترح {item}</h4>
                      <p className="text-sm text-muted-foreground mb-2">وصف المنتج</p>
                      <div className="flex items-center justify-center space-x-1 space-x-reverse mb-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star key={star} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <div className="text-lg font-bold text-primary mb-2">1,999 ريال</div>
                      <Button size="sm" className="w-full">
                        عرض المنتج
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground font-medium">جاري التحميل...</p>
        </div>
      </div>
    }>
      <CheckoutSuccessContent />
    </Suspense>
  )
}