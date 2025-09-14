'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  ArrowLeft, 
  CreditCard, 
  Truck, 
  Shield, 
  CheckCircle,
  User,
  MapPin,
  Phone,
  Mail,
  Lock,
  Eye,
  EyeOff
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Checkbox } from '@/components/ui/checkbox'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { useCart } from '@/contexts/cart-context'
import { useAuth } from '@/contexts/auth-context'
import { formatPrice, cn } from '@/lib/utils'
import { toast } from 'react-hot-toast'

export default function CheckoutPage() {
  const router = useRouter()
  const { state: cartState } = useCart()
  const { state: authState } = useAuth()
  
  // Form state
  const [currentStep, setCurrentStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  
  // Shipping form
  const [shippingForm, setShippingForm] = useState({
    firstName: authState.user?.firstName || '',
    lastName: authState.user?.lastName || '',
    email: authState.user?.email || '',
    phone: authState.user?.phone || '',
    address: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'SA',
    useSameAddress: true,
  })

  // Billing form
  const [billingForm, setBillingForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'SA',
  })

  // Payment form
  const [paymentForm, setPaymentForm] = useState({
    method: 'card',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: '',
    saveCard: false,
  })

  // Shipping method
  const [shippingMethod, setShippingMethod] = useState('standard')

  // Terms and conditions
  const [acceptTerms, setAcceptTerms] = useState(false)
  const [acceptMarketing, setAcceptMarketing] = useState(false)

  // Steps configuration
  const steps = [
    { id: 1, title: 'الشحن', description: 'معلومات الشحن' },
    { id: 2, title: 'الدفع', description: 'طريقة الدفع' },
    { id: 3, title: 'التأكيد', description: 'مراجعة الطلب' },
  ]

  // Shipping methods
  const shippingMethods = [
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

  // Payment methods
  const paymentMethods = [
    {
      id: 'card',
      name: 'بطاقة ائتمان',
      description: 'Visa, Mastercard, American Express',
      icon: CreditCard,
    },
    {
      id: 'bank_transfer',
      name: 'تحويل بنكي',
      description: 'تحويل مباشر من البنك',
      icon: CreditCard,
    },
    {
      id: 'cash_on_delivery',
      name: 'الدفع عند الاستلام',
      description: 'ادفع عند استلام الطلب',
      icon: CreditCard,
    },
  ]

  // Handle form input changes
  const handleShippingChange = (field: string, value: any) => {
    setShippingForm(prev => ({ ...prev, [field]: value }))
  }

  const handleBillingChange = (field: string, value: any) => {
    setBillingForm(prev => ({ ...prev, [field]: value }))
  }

  const handlePaymentChange = (field: string, value: any) => {
    setPaymentForm(prev => ({ ...prev, [field]: value }))
  }

  // Handle step navigation
  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(prev => prev + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1)
    }
  }

  // Handle form submission
  const handleSubmit = async () => {
    if (!acceptTerms) {
      toast.error('يرجى الموافقة على الشروط والأحكام')
      return
    }

    setLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Redirect to success page
      router.push('/checkout/success?orderId=12345')
    } catch (error) {
      toast.error('حدث خطأ في معالجة الطلب')
    } finally {
      setLoading(false)
    }
  }

  // Calculate totals
  const selectedShipping = shippingMethods.find(method => method.id === shippingMethod)
  const shippingCost = selectedShipping?.cost || 0
  const subtotal = cartState.subtotal
  const discount = cartState.discount
  const tax = subtotal * 0.15
  const total = subtotal - discount + shippingCost + tax

  return (
    <div className="min-h-screen bg-background">
      <div className="container-custom py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold">إتمام الطلب</h1>
            <p className="text-muted-foreground">
              أكمل طلبك في 3 خطوات بسيطة
            </p>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={cn(
                  'flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors',
                  currentStep >= step.id
                    ? 'bg-primary border-primary text-primary-foreground'
                    : 'border-muted-foreground text-muted-foreground'
                )}>
                  {currentStep > step.id ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : (
                    <span className="font-semibold">{step.id}</span>
                  )}
                </div>
                <div className="mr-4">
                  <div className="font-medium">{step.title}</div>
                  <div className="text-sm text-muted-foreground">{step.description}</div>
                </div>
                {index < steps.length - 1 && (
                  <div className="w-16 h-0.5 bg-muted-foreground/20 mx-4" />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Step 1: Shipping Information */}
            {currentStep === 1 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Truck className="w-5 h-5 ml-2" />
                      معلومات الشحن
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Personal Information */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">الاسم الأول *</Label>
                        <Input
                          id="firstName"
                          value={shippingForm.firstName}
                          onChange={(e) => handleShippingChange('firstName', e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName">اسم العائلة *</Label>
                        <Input
                          id="lastName"
                          value={shippingForm.lastName}
                          onChange={(e) => handleShippingChange('lastName', e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="email">البريد الإلكتروني *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={shippingForm.email}
                          onChange={(e) => handleShippingChange('email', e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">رقم الهاتف *</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={shippingForm.phone}
                          onChange={(e) => handleShippingChange('phone', e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    {/* Address Information */}
                    <div>
                      <Label htmlFor="address">العنوان *</Label>
                      <Input
                        id="address"
                        value={shippingForm.address}
                        onChange={(e) => handleShippingChange('address', e.target.value)}
                        placeholder="الشارع، رقم المبنى، اسم الحي"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="city">المدينة *</Label>
                        <Input
                          id="city"
                          value={shippingForm.city}
                          onChange={(e) => handleShippingChange('city', e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="state">المنطقة *</Label>
                        <Input
                          id="state"
                          value={shippingForm.state}
                          onChange={(e) => handleShippingChange('state', e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="postalCode">الرمز البريدي *</Label>
                        <Input
                          id="postalCode"
                          value={shippingForm.postalCode}
                          onChange={(e) => handleShippingChange('postalCode', e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    {/* Shipping Method */}
                    <div>
                      <Label className="text-base font-semibold mb-4 block">طريقة الشحن</Label>
                      <RadioGroup
                        value={shippingMethod}
                        onValueChange={setShippingMethod}
                        className="space-y-3"
                      >
                        {shippingMethods.map((method) => (
                          <div key={method.id} className="flex items-center space-x-3 space-x-reverse">
                            <RadioGroupItem value={method.id} id={method.id} />
                            <Label
                              htmlFor={method.id}
                              className="flex-1 p-4 border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors"
                            >
                              <div className="flex items-center justify-between">
                                <div>
                                  <div className="font-medium">{method.name}</div>
                                  <div className="text-sm text-muted-foreground">
                                    {method.description}
                                  </div>
                                </div>
                                <div className="text-right">
                                  <div className="font-medium">
                                    {method.cost === 0 ? 'مجاني' : formatPrice(method.cost)}
                                  </div>
                                  {method.free && (
                                    <div className="text-xs text-green-600">
                                      للطلبات أكثر من 500 ريال
                                    </div>
                                  )}
                                </div>
                              </div>
                            </Label>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Step 2: Payment Information */}
            {currentStep === 2 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <CreditCard className="w-5 h-5 ml-2" />
                      طريقة الدفع
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Payment Method Selection */}
                    <div>
                      <Label className="text-base font-semibold mb-4 block">اختر طريقة الدفع</Label>
                      <RadioGroup
                        value={paymentForm.method}
                        onValueChange={(value: string) => handlePaymentChange('method', value)}
                        className="space-y-3"
                      >
                        {paymentMethods.map((method) => (
                          <div key={method.id} className="flex items-center space-x-3 space-x-reverse">
                            <RadioGroupItem value={method.id} id={method.id} />
                            <Label
                              htmlFor={method.id}
                              className="flex-1 p-4 border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors"
                            >
                              <div className="flex items-center space-x-3 space-x-reverse">
                                <method.icon className="w-5 h-5" />
                                <div>
                                  <div className="font-medium">{method.name}</div>
                                  <div className="text-sm text-muted-foreground">
                                    {method.description}
                                  </div>
                                </div>
                              </div>
                            </Label>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>

                    {/* Card Information */}
                    {paymentForm.method === 'card' && (
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="cardNumber">رقم البطاقة *</Label>
                          <Input
                            id="cardNumber"
                            placeholder="1234 5678 9012 3456"
                            value={paymentForm.cardNumber}
                            onChange={(e) => handlePaymentChange('cardNumber', e.target.value)}
                            required
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="expiryDate">تاريخ الانتهاء *</Label>
                            <Input
                              id="expiryDate"
                              placeholder="MM/YY"
                              value={paymentForm.expiryDate}
                              onChange={(e) => handlePaymentChange('expiryDate', e.target.value)}
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="cvv">CVV *</Label>
                            <div className="relative">
                              <Input
                                id="cvv"
                                type={showPassword ? 'text' : 'password'}
                                placeholder="123"
                                value={paymentForm.cvv}
                                onChange={(e) => handlePaymentChange('cvv', e.target.value)}
                                required
                              />
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="absolute left-0 top-0 h-full px-3"
                                onClick={() => setShowPassword(!showPassword)}
                              >
                                {showPassword ? (
                                  <EyeOff className="w-4 h-4" />
                                ) : (
                                  <Eye className="w-4 h-4" />
                                )}
                              </Button>
                            </div>
                          </div>
                        </div>

                        <div>
                          <Label htmlFor="cardName">اسم حامل البطاقة *</Label>
                          <Input
                            id="cardName"
                            placeholder="الاسم كما هو مكتوب على البطاقة"
                            value={paymentForm.cardName}
                            onChange={(e) => handlePaymentChange('cardName', e.target.value)}
                            required
                          />
                        </div>

                        <div className="flex items-center space-x-2 space-x-reverse">
                          <Checkbox
                            id="saveCard"
                            checked={paymentForm.saveCard}
                            onCheckedChange={(checked: boolean) => handlePaymentChange('saveCard', checked)}
                          />
                          <Label htmlFor="saveCard" className="text-sm">
                            حفظ البطاقة للمرات القادمة
                          </Label>
                        </div>
                      </div>
                    )}

                    {/* Billing Address */}
                    <div>
                      <div className="flex items-center space-x-2 space-x-reverse mb-4">
                        <Checkbox
                          id="useSameAddress"
                          checked={shippingForm.useSameAddress}
                          onCheckedChange={(checked: boolean) => handleShippingChange('useSameAddress', checked)}
                        />
                        <Label htmlFor="useSameAddress">
                          استخدام نفس عنوان الشحن للفوترة
                        </Label>
                      </div>

                      {!shippingForm.useSameAddress && (
                        <div className="space-y-4 p-4 border rounded-lg bg-muted/50">
                          <h4 className="font-semibold">عنوان الفوترة</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="billingFirstName">الاسم الأول *</Label>
                              <Input
                                id="billingFirstName"
                                value={billingForm.firstName}
                                onChange={(e) => handleBillingChange('firstName', e.target.value)}
                                required
                              />
                            </div>
                            <div>
                              <Label htmlFor="billingLastName">اسم العائلة *</Label>
                              <Input
                                id="billingLastName"
                                value={billingForm.lastName}
                                onChange={(e) => handleBillingChange('lastName', e.target.value)}
                                required
                              />
                            </div>
                          </div>
                          <div>
                            <Label htmlFor="billingAddress">العنوان *</Label>
                            <Input
                              id="billingAddress"
                              value={billingForm.address}
                              onChange={(e) => handleBillingChange('address', e.target.value)}
                              required
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Step 3: Order Confirmation */}
            {currentStep === 3 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <CheckCircle className="w-5 h-5 ml-2" />
                      تأكيد الطلب
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Order Summary */}
                    <div>
                      <h4 className="font-semibold mb-4">ملخص الطلب</h4>
                      <div className="space-y-3">
                        {cartState.items.map((item) => (
                          <div key={item.id} className="flex items-center justify-between py-2 border-b">
                            <div className="flex items-center space-x-3 space-x-reverse">
                              <div className="w-12 h-12 bg-muted rounded-lg" />
                              <div>
                                <div className="font-medium">{item.product.name}</div>
                                <div className="text-sm text-muted-foreground">
                                  الكمية: {item.quantity}
                                </div>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="font-medium">
                                {formatPrice(item.product.price * item.quantity)}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Shipping Information */}
                    <div>
                      <h4 className="font-semibold mb-4">معلومات الشحن</h4>
                      <div className="p-4 bg-muted/50 rounded-lg">
                        <div className="space-y-2">
                          <div>
                            <strong>{shippingForm.firstName} {shippingForm.lastName}</strong>
                          </div>
                          <div>{shippingForm.address}</div>
                          <div>
                            {shippingForm.city}, {shippingForm.state} {shippingForm.postalCode}
                          </div>
                          <div>{shippingForm.phone}</div>
                        </div>
                      </div>
                    </div>

                    {/* Payment Information */}
                    <div>
                      <h4 className="font-semibold mb-4">طريقة الدفع</h4>
                      <div className="p-4 bg-muted/50 rounded-lg">
                        <div className="flex items-center space-x-2 space-x-reverse">
                          <CreditCard className="w-5 h-5" />
                          <span>
                            {paymentMethods.find(m => m.id === paymentForm.method)?.name}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Terms and Conditions */}
                    <div className="space-y-4">
                      <div className="flex items-start space-x-2 space-x-reverse">
                        <Checkbox
                          id="acceptTerms"
                          checked={acceptTerms}
                          onCheckedChange={(checked) => setAcceptTerms(checked === true)}
                          required
                        />
                        <Label htmlFor="acceptTerms" className="text-sm">
                          أوافق على{' '}
                          <Link href="/terms" className="text-primary hover:underline">
                            الشروط والأحكام
                          </Link>{' '}
                          و{' '}
                          <Link href="/privacy" className="text-primary hover:underline">
                            سياسة الخصوصية
                          </Link>
                        </Label>
                      </div>

                      <div className="flex items-start space-x-2 space-x-reverse">
                        <Checkbox
                          id="acceptMarketing"
                          checked={acceptMarketing}
                          onCheckedChange={(checked) => setAcceptMarketing(checked === true)}
                        />
                        <Label htmlFor="acceptMarketing" className="text-sm">
                          أريد تلقي العروض والمنتجات الجديدة عبر البريد الإلكتروني
                        </Label>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between">
              <Button
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 1}
              >
                السابق
              </Button>
              
              {currentStep < 3 ? (
                <Button onClick={nextStep}>
                  التالي
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  disabled={loading || !acceptTerms}
                  className="min-w-32"
                >
                  {loading ? 'جاري المعالجة...' : 'تأكيد الطلب'}
                </Button>
              )}
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>ملخص الطلب</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>المجموع الفرعي</span>
                  <span className="font-medium">{formatPrice(subtotal)}</span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>الخصم</span>
                    <span>-{formatPrice(discount)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>الشحن</span>
                  <span className="text-green-600">
                    {shippingCost === 0 ? 'مجاني' : formatPrice(shippingCost)}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>ضريبة القيمة المضافة (15%)</span>
                  <span>{formatPrice(tax)}</span>
                </div>

                <Separator />

                <div className="flex justify-between text-lg font-bold">
                  <span>المجموع</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </CardContent>
            </Card>

            {/* Security Badges */}
            <Card>
              <CardContent className="p-6">
                <div className="text-center space-y-4">
                  <div className="flex items-center justify-center space-x-2 space-x-reverse">
                    <Shield className="w-5 h-5 text-green-600" />
                    <span className="text-sm font-medium">دفع آمن ومحمي</span>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    جميع المعاملات محمية بتشفير SSL
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}