'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { TrustBadge } from '@/components/ui/TrustBadge'
import { formatPrice } from '@/lib/utils'

interface CartSummaryProps {
  items: {
    id: number
    name: string
    price: number
    originalPrice?: number
    quantity: number
  }[]
  onProceedToCheckout: () => void
}

const CartSummary: React.FC<CartSummaryProps> = ({ items, onProceedToCheckout }) => {
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const originalSubtotal = items.reduce((sum, item) => sum + ((item.originalPrice || item.price) * item.quantity), 0)
  const totalSavings = originalSubtotal - subtotal
  const shipping = subtotal >= 500 ? 0 : 50 // Free shipping over 500 SAR
  const tax = subtotal * 0.15 // 15% VAT
  const total = subtotal + shipping + tax

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <Card className="sticky top-24">
      <CardHeader>
        <CardTitle>ملخص الطلب</CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Order Summary */}
        <div className="space-y-4">
          <div className="flex justify-between">
            <span className="text-gray-600">عدد المنتجات:</span>
            <span className="font-medium">{itemCount} منتج</span>
          </div>
          
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
          
          <div className="border-t border-gray-200 pt-4">
            <div className="flex justify-between text-lg font-bold">
              <span>المجموع الكلي:</span>
              <span>{formatPrice(total)}</span>
            </div>
          </div>
        </div>

        {/* Free Shipping Progress */}
        {subtotal < 500 && (
          <div className="bg-primary-50 rounded-xl p-4">
            <div className="flex items-center space-x-2 space-x-reverse mb-2">
              <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
              <span className="text-sm font-medium text-primary-700">
                أضف {formatPrice(500 - subtotal)} للحصول على شحن مجاني
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-primary-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(subtotal / 500) * 100}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* Trust Badges */}
        <div className="space-y-3">
          <TrustBadge type="shipping" text="شحن مجاني للطلبات فوق 500 ريال" />
          <TrustBadge type="security" text="دفع آمن ومحمي" />
          <TrustBadge type="warranty" text="ضمان شامل لمدة سنتين" />
        </div>

        {/* Checkout Button */}
        <Button
          size="lg"
          className="w-full"
          onClick={onProceedToCheckout}
        >
          المتابعة للدفع
        </Button>

        {/* Continue Shopping */}
        <div className="text-center">
          <button
            onClick={() => window.location.href = '/products'}
            className="text-primary-500 hover:text-primary-600 font-medium transition-colors duration-200"
          >
            متابعة التسوق
          </button>
        </div>

        {/* Security Notice */}
        <div className="bg-gray-50 rounded-xl p-4">
          <div className="flex items-center space-x-2 space-x-reverse mb-2">
            <div className="w-5 h-5 text-success-500">
              <svg fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
            </div>
            <span className="text-sm font-medium text-gray-700">معلوماتك محمية</span>
          </div>
          <p className="text-xs text-gray-600">
            نستخدم أحدث تقنيات التشفير لحماية معلوماتك الشخصية وبيانات الدفع
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

export default CartSummary