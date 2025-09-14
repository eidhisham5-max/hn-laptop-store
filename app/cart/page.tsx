'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { 
  ShoppingCart, 
  Plus, 
  Minus, 
  Trash2, 
  Heart, 
  ArrowLeft,
  CreditCard,
  Truck,
  Shield,
  Gift,
  Percent
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { useCart } from '@/contexts/cart-context'
import { formatPrice } from '@/lib/utils'
import { toast } from 'react-hot-toast'

export default function CartPage() {
  const { state, updateQuantity, removeItem, clearCart, applyDiscount } = useCart()
  const [discountCode, setDiscountCode] = useState('')
  const [applyingDiscount, setApplyingDiscount] = useState(false)

  // Handle quantity update
  const handleQuantityUpdate = (productId: string, quantity: number) => {
    if (quantity < 1) {
      removeItem(productId)
      toast.error('تم حذف المنتج من العربة')
    } else {
      updateQuantity(productId, quantity)
      toast.success('تم تحديث الكمية')
    }
  }

  // Handle remove item
  const handleRemoveItem = (productId: string) => {
    removeItem(productId)
    toast.success('تم حذف المنتج من العربة')
  }

  // Handle apply discount
  const handleApplyDiscount = async () => {
    if (!discountCode.trim()) {
      toast.error('يرجى إدخال كود الخصم')
      return
    }

    setApplyingDiscount(true)
    try {
      const success = await applyDiscount(discountCode)
      if (success) {
        toast.success('تم تطبيق كود الخصم بنجاح')
        setDiscountCode('')
      } else {
        toast.error('كود الخصم غير صحيح')
      }
    } catch (error) {
      toast.error('حدث خطأ في تطبيق كود الخصم')
    } finally {
      setApplyingDiscount(false)
    }
  }

  // Handle clear cart
  const handleClearCart = () => {
    clearCart()
    toast.success('تم مسح العربة')
  }

  // Calculate totals
  const subtotal = state.subtotal
  const discount = state.discount
  const shipping = state.shipping
  const tax = state.tax
  const total = state.total

  // Shipping options
  const shippingOptions = [
    {
      id: 'standard',
      name: 'الشحن العادي',
      description: '3-5 أيام عمل',
      cost: 0,
      free: true,
    },
    {
      id: 'express',
      name: 'الشحن السريع',
      description: '1-2 أيام عمل',
      cost: 50,
      free: false,
    },
    {
      id: 'same-day',
      name: 'الشحن في نفس اليوم',
      description: 'في نفس اليوم',
      cost: 100,
      free: false,
    },
  ]

  // Trust badges
  const trustBadges = [
    { icon: Shield, text: 'دفع آمن' },
    { icon: Truck, text: 'شحن سريع' },
    { icon: Gift, text: 'إرجاع مجاني' },
  ]

  if (state.items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container-custom py-16">
          <div className="max-w-md mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-8">
                <ShoppingCart className="w-12 h-12 text-muted-foreground" />
              </div>
              <h1 className="text-3xl font-bold mb-4">عربتك فارغة</h1>
              <p className="text-muted-foreground mb-8">
                لم تقم بإضافة أي منتجات إلى العربة بعد. ابدأ التسوق الآن!
              </p>
              <div className="space-y-4">
                <Button size="lg" asChild>
                  <Link href="/products">
                    ابدأ التسوق
                  </Link>
                </Button>
                <div>
                  <Button variant="outline" asChild>
                    <Link href="/">
                      العودة للرئيسية
                    </Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container-custom py-8">
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/products">
              <ArrowLeft className="w-4 h-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold">عربة التسوق</h1>
            <p className="text-muted-foreground">
              {state.totalItems} منتج في العربة
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {state.items.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card>
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      {/* Product Image */}
                      <div className="relative w-24 h-24 flex-shrink-0">
                        <Image
                          src={item.product.images[0]?.url || '/placeholder.jpg'}
                          alt={item.product.name}
                          fill
                          className="object-cover rounded-lg"
                        />
                        {item.product.isOnSale && (
                          <Badge variant="destructive" className="absolute -top-2 -right-2 text-xs">
                            -{item.product.discount}%
                          </Badge>
                        )}
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div className="flex-1 min-w-0">
                            <Link href={`/products/${item.product.slug}`}>
                              <h3 className="font-semibold text-lg hover:text-primary transition-colors line-clamp-2">
                                {item.product.name}
                              </h3>
                            </Link>
                            <p className="text-sm text-muted-foreground mb-2">
                              {item.product.brand}
                            </p>
                            
                            {/* Selected Options */}
                            {Object.keys(item.selectedOptions).length > 0 && (
                              <div className="space-y-1 mb-3">
                                {Object.entries(item.selectedOptions).map(([key, value]) => (
                                  <div key={key} className="text-sm text-muted-foreground">
                                    <span className="font-medium">{key}:</span> {value}
                                  </div>
                                ))}
                              </div>
                            )}

                            {/* Price */}
                            <div className="flex items-center space-x-2 space-x-reverse mb-3">
                              <span className="text-xl font-bold text-primary">
                                {formatPrice(item.product.price)}
                              </span>
                              {item.product.originalPrice && (
                                <span className="text-sm text-muted-foreground line-through">
                                  {formatPrice(item.product.originalPrice)}
                                </span>
                              )}
                            </div>

                            {/* Stock Status */}
                            <div className="flex items-center space-x-2 space-x-reverse">
                              <div className={`w-2 h-2 rounded-full ${item.product.stock > 0 ? 'bg-green-500' : 'bg-red-500'}`} />
                              <span className={`text-sm ${item.product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                {item.product.stock > 0 ? 'متوفر' : 'نفد المخزون'}
                              </span>
                            </div>
                          </div>

                          {/* Actions */}
                          <div className="flex flex-col items-end space-y-3">
                            {/* Quantity Controls */}
                            <div className="flex items-center space-x-2 space-x-reverse">
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => handleQuantityUpdate(item.productId, item.quantity - 1)}
                                disabled={item.quantity <= 1}
                              >
                                <Minus className="w-4 h-4" />
                              </Button>
                              <span className="w-12 text-center font-medium">
                                {item.quantity}
                              </span>
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => handleQuantityUpdate(item.productId, item.quantity + 1)}
                                disabled={item.quantity >= item.product.stock}
                              >
                                <Plus className="w-4 h-4" />
                              </Button>
                            </div>

                            {/* Item Total */}
                            <div className="text-right">
                              <div className="text-lg font-bold">
                                {formatPrice(item.product.price * item.quantity)}
                              </div>
                              {item.product.originalPrice && (
                                <div className="text-sm text-muted-foreground line-through">
                                  {formatPrice(item.product.originalPrice * item.quantity)}
                                </div>
                              )}
                            </div>

                            {/* Action Buttons */}
                            <div className="flex space-x-2 space-x-reverse">
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => {/* Add to wishlist */}}
                              >
                                <Heart className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8 text-destructive hover:text-destructive"
                                onClick={() => handleRemoveItem(item.productId)}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}

            {/* Clear Cart Button */}
            <div className="flex justify-end">
              <Button
                variant="outline"
                onClick={handleClearCart}
                className="text-destructive hover:text-destructive"
              >
                مسح العربة
              </Button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            {/* Summary Card */}
            <Card>
              <CardHeader>
                <CardTitle>ملخص الطلب</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Subtotal */}
                <div className="flex justify-between">
                  <span>المجموع الفرعي</span>
                  <span className="font-medium">{formatPrice(subtotal)}</span>
                </div>

                {/* Discount */}
                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>الخصم</span>
                    <span>-{formatPrice(discount)}</span>
                  </div>
                )}

                {/* Shipping */}
                <div className="flex justify-between">
                  <span>الشحن</span>
                  <span className="text-green-600">
                    {shipping === 0 ? 'مجاني' : formatPrice(shipping)}
                  </span>
                </div>

                {/* Tax */}
                <div className="flex justify-between">
                  <span>ضريبة القيمة المضافة (15%)</span>
                  <span>{formatPrice(tax)}</span>
                </div>

                <Separator />

                {/* Total */}
                <div className="flex justify-between text-lg font-bold">
                  <span>المجموع</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </CardContent>
            </Card>

            {/* Discount Code */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Percent className="w-5 h-5 ml-2" />
                  كود الخصم
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex gap-2">
                    <Input
                      placeholder="أدخل كود الخصم"
                      value={discountCode}
                      onChange={(e) => setDiscountCode(e.target.value)}
                    />
                    <Button
                      onClick={handleApplyDiscount}
                      disabled={applyingDiscount || !discountCode.trim()}
                    >
                      {applyingDiscount ? 'جاري التطبيق...' : 'تطبيق'}
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    أمثلة: WELCOME10, SAVE20, NEWUSER
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Shipping Options */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Truck className="w-5 h-5 ml-2" />
                  خيارات الشحن
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {shippingOptions.map((option) => (
                    <div
                      key={option.id}
                      className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                        option.free ? 'border-green-200 bg-green-50' : 'border-border'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">{option.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {option.description}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium">
                            {option.cost === 0 ? 'مجاني' : formatPrice(option.cost)}
                          </div>
                          {option.free && (
                            <div className="text-xs text-green-600">للطلبات أكثر من 500 ريال</div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Checkout Button */}
            <Button size="lg" className="w-full" asChild>
              <Link href="/checkout">
                <CreditCard className="w-5 h-5 ml-2" />
                المتابعة للدفع
              </Link>
            </Button>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4">
              {trustBadges.map((badge, index) => (
                <div key={index} className="text-center p-3 bg-muted/50 rounded-lg">
                  <badge.icon className="w-6 h-6 mx-auto mb-2 text-primary" />
                  <div className="text-xs font-medium">{badge.text}</div>
                </div>
              ))}
            </div>

            {/* Continue Shopping */}
            <Button variant="outline" className="w-full" asChild>
              <Link href="/products">
                متابعة التسوق
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}