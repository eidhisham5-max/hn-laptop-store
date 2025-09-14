'use client'

import React, { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { 
  CreditCard, 
  Banknote, 
  Building2, 
  Shield, 
  Lock, 
  CheckCircle, 
  AlertCircle,
  Loader2,
  ArrowLeft,
  User,
  Phone,
  MapPin,
  Package,
  Truck,
  Clock,
  Star,
  Gift,
  Percent
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { ResponsiveContainer } from '@/components/ui/responsive-container'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { ErrorBoundary } from '@/components/ui/error-boundary'
import { getCart, clearCart } from '../data/products'
import { fetchProductsByIds, createOrder } from '../data/db'

interface CartItem {
  productId: number
  qty: number
  product?: {
    id: number
    name: string
    price: number
    image: string
    brand: string
  }
}

interface PaymentForm {
  name: string
  phone: string
  email: string
  address: string
  city: string
  zipCode: string
  paymentMethod: 'cod' | 'card' | 'bank' | 'wallet'
  cardNumber: string
  expiryDate: string
  cvv: string
  cardName: string
  bankAccount: string
  walletType: string
}

interface PaymentErrors {
  name?: string
  phone?: string
  email?: string
  address?: string
  city?: string
  zipCode?: string
  cardNumber?: string
  expiryDate?: string
  cvv?: string
  cardName?: string
  bankAccount?: string
  general?: string
}

const paymentMethods = [
  {
    id: 'cod',
    name: 'Cash on Delivery',
    description: 'Pay when you receive your order',
    icon: Banknote,
    color: 'text-green-600',
    bgColor: 'bg-green-100',
    available: true
  },
  {
    id: 'card',
    name: 'Credit/Debit Card',
    description: 'Secure online payment with Visa, Mastercard',
    icon: CreditCard,
    color: 'text-blue-600',
    bgColor: 'bg-blue-100',
    available: true
  },
  {
    id: 'bank',
    name: 'Bank Transfer',
    description: 'Direct bank transfer to our account',
    icon: Building2,
    color: 'text-purple-600',
    bgColor: 'bg-purple-100',
    available: true
  },
  {
    id: 'wallet',
    name: 'Digital Wallet',
    description: 'Pay with Apple Pay, Google Pay',
    icon: Phone,
    color: 'text-orange-600',
    bgColor: 'bg-orange-100',
    available: false
  }
]

export default function PaymentPage() {
  const router = useRouter()
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [loading, setLoading] = useState(true)
  const [isProcessing, setIsProcessing] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [errors, setErrors] = useState<PaymentErrors>({})
  
  const [form, setForm] = useState<PaymentForm>({
    name: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    zipCode: '',
    paymentMethod: 'cod',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: '',
    bankAccount: '',
    walletType: ''
  })

  useEffect(() => {
    loadCartItems()
  }, [])

  const loadCartItems = async () => {
      setLoading(true)
    try {
      const cart = getCart()
      if (cart.length === 0) {
        router.push('/cart')
        return
      }
      
      const ids = cart.map(item => item.productId)
      const products = await fetchProductsByIds(ids)
      const detailedItems = cart.map(item => ({
        ...item,
        product: products.find(p => p.id === item.productId)
      })).filter(item => item.product)
      
      setCartItems(detailedItems.map(item => ({
        productId: item.productId,
        qty: item.qty,
        product: {
          id: item.product!.id,
          name: item.product!.name,
          price: item.product!.price,
          image: item.product!.images[0] || '/placeholder.jpg',
          brand: (item.product as any)?.brand?.name || 'Unknown'
        }
      })))
    } catch (error) {
      console.error('Error loading cart items:', error)
      } finally {
        setLoading(false)
      }
    }

  const subtotal = useMemo(() => 
    cartItems.reduce((sum, item) => sum + (item.product?.price || 0) * item.qty, 0), 
    [cartItems]
  )

  const shipping = 0 // Free shipping
  const tax = subtotal * 0.1 // 10% tax
  const total = subtotal + shipping + tax

  const validateForm = (): boolean => {
    const newErrors: PaymentErrors = {}

    // Basic validation
    if (!form.name.trim()) newErrors.name = 'Name is required'
    if (!form.phone.trim()) newErrors.phone = 'Phone is required'
    if (!form.email.trim()) newErrors.email = 'Email is required'
    if (!form.address.trim()) newErrors.address = 'Address is required'
    if (!form.city.trim()) newErrors.city = 'City is required'
    if (!form.zipCode.trim()) newErrors.zipCode = 'ZIP code is required'

    // Email validation
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    // Phone validation
    if (form.phone && !/^[\+]?[1-9][\d]{0,15}$/.test(form.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Please enter a valid phone number'
    }

    // Card validation
    if (form.paymentMethod === 'card') {
      if (!form.cardNumber.trim()) newErrors.cardNumber = 'Card number is required'
      if (!form.expiryDate.trim()) newErrors.expiryDate = 'Expiry date is required'
      if (!form.cvv.trim()) newErrors.cvv = 'CVV is required'
      if (!form.cardName.trim()) newErrors.cardName = 'Cardholder name is required'
    }

    // Bank validation
    if (form.paymentMethod === 'bank') {
      if (!form.bankAccount.trim()) newErrors.bankAccount = 'Bank account is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsProcessing(true)
    setErrors({})

    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 3000))
      
      // Create order
        const order = await createOrder({
        customer_name: form.name,
        phone: form.phone,
        address: `${form.address}, ${form.city}, ${form.zipCode}`,
        items: cartItems.map(item => ({
          product_id: item.product!.id,
          qty: item.qty,
          price: item.product!.price
        }))
      })

      // Clear cart
        clearCart()
      setIsSuccess(true)
      
      setTimeout(() => {
        router.push(`/checkout/success?orderId=${order.id}`)
      }, 2000)
    } catch (error) {
      setErrors({ general: 'Payment failed. Please try again.' })
    } finally {
      setIsProcessing(false)
    }
  }

  const handleInputChange = (field: keyof PaymentForm, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field as keyof PaymentErrors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment Successful!</h2>
          <p className="text-gray-600">Your order has been placed successfully</p>
          <LoadingSpinner size="sm" className="mt-4" />
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <ResponsiveContainer>
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16 mb-8"
        >
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Complete Your Order
            </h1>
            <p className="text-xl text-blue-100">
              Secure payment and fast delivery
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Payment Form */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <ErrorBoundary>
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Customer Information */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <User className="h-5 w-5" />
                      Customer Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Full Name *</Label>
                        <Input
                          id="name"
                          value={form.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          className={errors.name ? 'border-red-500' : ''}
                          disabled={isProcessing}
                        />
                        {errors.name && (
                          <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone Number *</Label>
                        <Input
                          id="phone"
                          value={form.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          className={errors.phone ? 'border-red-500' : ''}
                          disabled={isProcessing}
                        />
                        {errors.phone && (
                          <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                        )}
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={form.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className={errors.email ? 'border-red-500' : ''}
                        disabled={isProcessing}
                      />
                      {errors.email && (
                        <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Shipping Address */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MapPin className="h-5 w-5" />
                      Shipping Address
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="address">Street Address *</Label>
                      <Textarea
                        id="address"
                        value={form.address}
                        onChange={(e) => handleInputChange('address', e.target.value)}
                        className={errors.address ? 'border-red-500' : ''}
                        disabled={isProcessing}
                      />
                      {errors.address && (
                        <p className="text-red-500 text-xs mt-1">{errors.address}</p>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="city">City *</Label>
                        <Input
                          id="city"
                          value={form.city}
                          onChange={(e) => handleInputChange('city', e.target.value)}
                          className={errors.city ? 'border-red-500' : ''}
                          disabled={isProcessing}
                        />
                        {errors.city && (
                          <p className="text-red-500 text-xs mt-1">{errors.city}</p>
                        )}
                    </div>
                    <div>
                        <Label htmlFor="zipCode">ZIP Code *</Label>
                        <Input
                          id="zipCode"
                          value={form.zipCode}
                          onChange={(e) => handleInputChange('zipCode', e.target.value)}
                          className={errors.zipCode ? 'border-red-500' : ''}
                          disabled={isProcessing}
                        />
                        {errors.zipCode && (
                          <p className="text-red-500 text-xs mt-1">{errors.zipCode}</p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Payment Method */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CreditCard className="h-5 w-5" />
                      Payment Method
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <RadioGroup
                      value={form.paymentMethod}
                      onValueChange={(value: string) => handleInputChange('paymentMethod', value)}
                      className="space-y-4"
                    >
                      {paymentMethods.map((method) => (
                        <div key={method.id} className="flex items-center space-x-3">
                          <RadioGroupItem 
                            value={method.id} 
                            id={method.id}
                            disabled={!method.available || isProcessing}
                          />
                          <Label 
                            htmlFor={method.id} 
                            className={`flex-1 p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors ${
                              !method.available ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                          >
                            <div className="flex items-center gap-4">
                              <div className={`w-12 h-12 ${method.bgColor} rounded-lg flex items-center justify-center`}>
                                <method.icon className={`h-6 w-6 ${method.color}`} />
                  </div>
                              <div className="flex-1">
                                <div className="font-semibold">{method.name}</div>
                                <div className="text-sm text-gray-600">{method.description}</div>
                                {!method.available && (
                                  <Badge variant="secondary" className="mt-1">Coming Soon</Badge>
                                )}
              </div>
                              {method.available && (
                                <Shield className="h-5 w-5 text-green-500" />
                              )}
              </div>
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </CardContent>
                </Card>

                {/* Card Details (if card payment selected) */}
                {form.paymentMethod === 'card' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Lock className="h-5 w-5" />
                          Card Details
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <Label htmlFor="cardNumber">Card Number *</Label>
                          <Input
                            id="cardNumber"
                            value={form.cardNumber}
                            onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                            className={errors.cardNumber ? 'border-red-500' : ''}
                            disabled={isProcessing}
                            placeholder="1234 5678 9012 3456"
                          />
                          {errors.cardNumber && (
                            <p className="text-red-500 text-xs mt-1">{errors.cardNumber}</p>
                          )}
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <Label htmlFor="expiryDate">Expiry Date *</Label>
                            <Input
                              id="expiryDate"
                              value={form.expiryDate}
                              onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                              className={errors.expiryDate ? 'border-red-500' : ''}
                              disabled={isProcessing}
                              placeholder="MM/YY"
                            />
                            {errors.expiryDate && (
                              <p className="text-red-500 text-xs mt-1">{errors.expiryDate}</p>
                            )}
                          </div>
                          <div>
                            <Label htmlFor="cvv">CVV *</Label>
                            <Input
                              id="cvv"
                              value={form.cvv}
                              onChange={(e) => handleInputChange('cvv', e.target.value)}
                              className={errors.cvv ? 'border-red-500' : ''}
                              disabled={isProcessing}
                              placeholder="123"
                            />
                            {errors.cvv && (
                              <p className="text-red-500 text-xs mt-1">{errors.cvv}</p>
                            )}
                          </div>
                          <div>
                            <Label htmlFor="cardName">Cardholder Name *</Label>
                            <Input
                              id="cardName"
                              value={form.cardName}
                              onChange={(e) => handleInputChange('cardName', e.target.value)}
                              className={errors.cardName ? 'border-red-500' : ''}
                              disabled={isProcessing}
                            />
                            {errors.cardName && (
                              <p className="text-red-500 text-xs mt-1">{errors.cardName}</p>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )}

                {/* General Error */}
                {errors.general && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3"
                  >
                    <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
                    <p className="text-red-700 text-sm">{errors.general}</p>
                  </motion.div>
                )}

                {/* Submit Button */}
                <div className="flex gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.back()}
                    className="flex-1"
                    disabled={isProcessing}
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Cart
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1"
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Processing Payment...
                      </>
                    ) : (
                      <>
                        <Lock className="h-4 w-4 mr-2" />
                        Complete Order - ${total.toFixed(2)}
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </ErrorBoundary>
          </motion.div>

          {/* Order Summary */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-6"
          >
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Cart Items */}
                  <div className="space-y-3">
                    {cartItems.map((item) => (
                      <div key={item.productId} className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                          <Package className="h-6 w-6 text-gray-600" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-sm">{item.product?.name}</p>
                          <p className="text-xs text-gray-600">Qty: {item.qty}</p>
                        </div>
                        <p className="font-semibold">
                          ${((item.product?.price || 0) * item.qty).toFixed(2)}
                        </p>
                        </div>
                      ))}
                    </div>

                  {/* Totals */}
                  <div className="space-y-2 pt-4 border-t">
                    <div className="flex justify-between text-sm">
                      <span>Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Shipping</span>
                      <span className="text-green-600">Free</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Tax</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between font-semibold text-lg pt-2 border-t">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>
              </div>
              </CardContent>
            </Card>

            {/* Security Features */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Security Features
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3">
                  <Lock className="h-5 w-5 text-green-500" />
                  <span className="text-sm">SSL Encrypted</span>
                    </div>
                <div className="flex items-center gap-3">
                  <Shield className="h-5 w-5 text-green-500" />
                  <span className="text-sm">PCI Compliant</span>
              </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-sm">Secure Payment</span>
            </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </ResponsiveContainer>
    </div>
  )
}

