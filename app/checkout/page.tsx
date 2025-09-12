'use client'

import React, { useState, useEffect } from 'react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import CheckoutForm from '@/components/checkout/CheckoutForm'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { TrustBadge } from '@/components/ui/TrustBadge'
import { formatPrice } from '@/lib/utils'
import Image from 'next/image'

interface OrderItem {
  id: number
  name: string
  brand: string
  price: number
  originalPrice?: number
  image: string
  quantity: number
  selectedColor?: string
  selectedStorage?: string
}

const CheckoutPage: React.FC = () => {
  const [orderItems, setOrderItems] = useState<OrderItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [orderComplete, setOrderComplete] = useState(false)
  const [orderNumber, setOrderNumber] = useState('')

  // Mock data - في التطبيق الحقيقي سيتم جلبها من API
  const mockOrderItems: OrderItem[] = [
    {
      id: 1,
      name: 'MacBook Pro 16" M3 Max',
      brand: 'Apple',
      price: 12999,
      originalPrice: 14999,
      image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2026&q=80',
      quantity: 1,
      selectedColor: '#C0C0C0',
      selectedStorage: '1 TB'
    },
    {
      id: 2,
      name: 'Dell XPS 15 OLED',
      brand: 'Dell',
      price: 8999,
      image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80',
      quantity: 2,
      selectedColor: '#696969'
    }
  ]

  useEffect(() => {
    const loadOrderItems = async () => {
      setIsLoading(true)
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      setOrderItems(mockOrderItems)
      setIsLoading(false)
    }
    
    loadOrderItems()
  }, [])

  const handleOrderComplete = async (orderData: any) => {
    // Simulate order processing
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Generate order number
    const newOrderNumber = `HN${Date.now().toString().slice(-8)}`
    setOrderNumber(newOrderNumber)
    setOrderComplete(true)
    
    // In real app, this would send data to backend
    console.log('Order completed:', { orderData, orderItems, orderNumber: newOrderNumber })
  }

  const subtotal = orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const originalSubtotal = orderItems.reduce((sum, item) => sum + ((item.originalPrice || item.price) * item.quantity), 0)
  const totalSavings = originalSubtotal - subtotal
  const shipping = subtotal >= 500 ? 0 : 50
  const tax = subtotal * 0.15
  const total = subtotal + shipping + tax

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="container-custom py-16">
          <div className="flex items-center justify-center">
            <div className="spinner"></div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  if (orderComplete) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        
        <main className="container-custom py-16">
          <div className="max-w-2xl mx-auto text-center">
            {/* Success Icon */}
            <div className="w-20 h-20 bg-success-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-success-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>

            <h1 className="text-3xl font-bold text-gray-800 mb-4">تم تأكيد طلبك بنجاح!</h1>
            <p className="text-lg text-gray-600 mb-8">
              شكراً لك على ثقتك في H.N Laptop Store. سنقوم بإرسال تفاصيل الطلب إلى بريدك الإلكتروني قريباً.
            </p>

            {/* Order Details */}
            <Card className="mb-8">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">رقم الطلب:</span>
                    <span className="font-bold text-primary-600">{orderNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">المجموع الكلي:</span>
                    <span className="font-bold">{formatPrice(total)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">تاريخ الطلب:</span>
                    <span className="font-medium">{new Date().toLocaleDateString('ar-SA')}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Next Steps */}
            <div className="bg-gray-50 rounded-2xl p-6 mb-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">الخطوات التالية:</h3>
              <div className="space-y-3 text-right">
                <div className="flex items-center space-x-3 space-x-reverse">
                  <div className="w-6 h-6 bg-primary-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
                  <span className="text-gray-700">ستتلقى رسالة تأكيد عبر البريد الإلكتروني</span>
                </div>
                <div className="flex items-center space-x-3 space-x-reverse">
                  <div className="w-6 h-6 bg-primary-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
                  <span className="text-gray-700">سنقوم بتحضير طلبك خلال 24 ساعة</span>
                </div>
                <div className="flex items-center space-x-3 space-x-reverse">
                  <div className="w-6 h-6 bg-primary-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
                  <span className="text-gray-700">ستتلقى رقم التتبع عند الشحن</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => window.location.href = '/products'}
                className="btn-primary"
              >
                متابعة التسوق
              </button>
              
              <button
                onClick={() => window.location.href = '/orders'}
                className="btn-outline"
              >
                تتبع طلباتي
              </button>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    )
  }

  if (orderItems.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        
        <main className="container-custom py-16">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">عربة التسوق فارغة</h1>
            <p className="text-gray-600 mb-8">
              لا يمكنك المتابعة للدفع بدون منتجات في عربة التسوق
            </p>
            <button
              onClick={() => window.location.href = '/products'}
              className="btn-primary"
            >
              ابدأ التسوق
            </button>
          </div>
        </main>
        
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container-custom py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">إتمام الطلب</h1>
          <p className="text-gray-600">
            أكمل طلبك بأمان وسهولة
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <CheckoutForm onComplete={handleOrderComplete} />
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>ملخص الطلب</CardTitle>
              </CardHeader>
              
              <CardContent className="space-y-6">
                {/* Order Items */}
                <div className="space-y-4">
                  {orderItems.map((item) => (
                    <div key={item.id} className="flex space-x-4 space-x-reverse">
                      <div className="w-16 h-16 flex-shrink-0">
                        <div className="relative w-full h-full rounded-lg overflow-hidden bg-gray-100">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-gray-800 truncate">{item.name}</h4>
                        <p className="text-sm text-gray-500">{item.brand}</p>
                        {item.selectedColor && (
                          <div className="flex items-center space-x-2 space-x-reverse mt-1">
                            <div 
                              className="w-3 h-3 rounded-full border border-gray-300"
                              style={{ backgroundColor: item.selectedColor }}
                            ></div>
                            <span className="text-xs text-gray-500">اللون</span>
                          </div>
                        )}
                        {item.selectedStorage && (
                          <p className="text-xs text-gray-500 mt-1">التخزين: {item.selectedStorage}</p>
                        )}
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-sm text-gray-600">الكمية: {item.quantity}</span>
                          <span className="font-medium">
                            {formatPrice(item.price * item.quantity)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Order Summary */}
                <div className="border-t border-gray-200 pt-4 space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">المجموع الفرعي:</span>
                    <span className="font-medium">{formatPrice(subtotal)}</span>
                  </div>
                  
                  {totalSavings > 0 && (
                    <div className="flex justify-between text-success-600">
                      <span>الخصم:</span>
                      <span className="font-medium">-{formatPrice(totalSavings)}</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">الشحن:</span>
                    <span className="font-medium">
                      {shipping === 0 ? (
                        <span className="text-success-600">مجاني</span>
                      ) : (
                        formatPrice(shipping)
                      )}
                    </span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">ضريبة القيمة المضافة (15%):</span>
                    <span className="font-medium">{formatPrice(tax)}</span>
                  </div>
                  
                  <div className="border-t border-gray-200 pt-3">
                    <div className="flex justify-between text-lg font-bold">
                      <span>المجموع الكلي:</span>
                      <span>{formatPrice(total)}</span>
                    </div>
                  </div>
                </div>

                {/* Trust Badges */}
                <div className="space-y-3 pt-4 border-t border-gray-200">
                  <TrustBadge type="shipping" text="شحن مجاني للطلبات فوق 500 ريال" />
                  <TrustBadge type="security" text="دفع آمن ومحمي" />
                  <TrustBadge type="warranty" text="ضمان شامل لمدة سنتين" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}

export default CheckoutPage