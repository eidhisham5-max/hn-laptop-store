'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
// import { Badge } from '@/components/ui/Badge'
import { CreditCard, MapPin, User, Phone, Mail, Lock } from 'lucide-react'

interface CheckoutFormProps {
  onComplete: (orderData: any) => void
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    // Shipping Information
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'Saudi Arabia',
    
    // Payment Information
    paymentMethod: 'credit-card',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: '',
    
    // Additional Options
    saveInfo: false,
    newsletter: false
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const steps = [
    { id: 1, title: 'معلومات الشحن', icon: MapPin },
    { id: 2, title: 'طريقة الدفع', icon: CreditCard },
    { id: 3, title: 'مراجعة الطلب', icon: User }
  ]

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {}

    if (step === 1) {
      if (!formData.firstName) newErrors.firstName = 'الاسم الأول مطلوب'
      if (!formData.lastName) newErrors.lastName = 'الاسم الأخير مطلوب'
      if (!formData.email) newErrors.email = 'البريد الإلكتروني مطلوب'
      if (!formData.phone) newErrors.phone = 'رقم الهاتف مطلوب'
      if (!formData.address) newErrors.address = 'العنوان مطلوب'
      if (!formData.city) newErrors.city = 'المدينة مطلوبة'
      if (!formData.postalCode) newErrors.postalCode = 'الرمز البريدي مطلوب'
    }

    if (step === 2) {
      if (formData.paymentMethod === 'credit-card') {
        if (!formData.cardNumber) newErrors.cardNumber = 'رقم البطاقة مطلوب'
        if (!formData.expiryDate) newErrors.expiryDate = 'تاريخ الانتهاء مطلوب'
        if (!formData.cvv) newErrors.cvv = 'رمز الأمان مطلوب'
        if (!formData.cardName) newErrors.cardName = 'اسم حامل البطاقة مطلوب'
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1)
    }
  }

  const handlePrevious = () => {
    setCurrentStep(prev => prev - 1)
  }

  const handleSubmit = () => {
    if (validateStep(currentStep)) {
      onComplete(formData)
    }
  }

  const renderShippingStep = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="الاسم الأول"
          value={formData.firstName}
          onChange={(e) => handleInputChange('firstName', e.target.value)}
          error={errors.firstName}
          icon={<User className="w-5 h-5" />}
          iconPosition="right"
          required
        />
        
        <Input
          label="الاسم الأخير"
          value={formData.lastName}
          onChange={(e) => handleInputChange('lastName', e.target.value)}
          error={errors.lastName}
          icon={<User className="w-5 h-5" />}
          iconPosition="right"
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="البريد الإلكتروني"
          type="email"
          value={formData.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
          error={errors.email}
          icon={<Mail className="w-5 h-5" />}
          iconPosition="right"
          required
        />
        
        <Input
          label="رقم الهاتف"
          type="tel"
          value={formData.phone}
          onChange={(e) => handleInputChange('phone', e.target.value)}
          error={errors.phone}
          icon={<Phone className="w-5 h-5" />}
          iconPosition="right"
          required
        />
      </div>

      <Input
        label="العنوان"
        value={formData.address}
        onChange={(e) => handleInputChange('address', e.target.value)}
        error={errors.address}
        icon={<MapPin className="w-5 h-5" />}
        iconPosition="right"
        required
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="المدينة"
          value={formData.city}
          onChange={(e) => handleInputChange('city', e.target.value)}
          error={errors.city}
          required
        />
        
        <Input
          label="الرمز البريدي"
          value={formData.postalCode}
          onChange={(e) => handleInputChange('postalCode', e.target.value)}
          error={errors.postalCode}
          required
        />
      </div>

      <div className="flex items-center space-x-3 space-x-reverse">
        <input
          type="checkbox"
          id="saveInfo"
          checked={formData.saveInfo}
          onChange={(e) => handleInputChange('saveInfo', e.target.checked)}
          className="w-4 h-4 text-primary-500 bg-gray-100 border-gray-300 rounded focus:ring-primary-500 focus:ring-2"
        />
        <label htmlFor="saveInfo" className="text-sm text-gray-600">
          حفظ هذه المعلومات للمرات القادمة
        </label>
      </div>
    </div>
  )

  const renderPaymentStep = () => (
    <div className="space-y-6">
      {/* Payment Method Selection */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">طريقة الدفع</h3>
        <div className="space-y-3">
          <label className="flex items-center p-4 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50">
            <input
              type="radio"
              name="paymentMethod"
              value="credit-card"
              checked={formData.paymentMethod === 'credit-card'}
              onChange={(e) => handleInputChange('paymentMethod', e.target.value)}
              className="w-4 h-4 text-primary-500 bg-gray-100 border-gray-300 focus:ring-primary-500 focus:ring-2"
            />
            <div className="mr-3">
              <div className="flex items-center space-x-2 space-x-reverse">
                <CreditCard className="w-5 h-5 text-gray-600" />
                <span className="font-medium">بطاقة ائتمان/خصم</span>
              </div>
              <p className="text-sm text-gray-500">Visa, Mastercard, American Express</p>
            </div>
          </label>

          <label className="flex items-center p-4 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50">
            <input
              type="radio"
              name="paymentMethod"
              value="apple-pay"
              checked={formData.paymentMethod === 'apple-pay'}
              onChange={(e) => handleInputChange('paymentMethod', e.target.value)}
              className="w-4 h-4 text-primary-500 bg-gray-100 border-gray-300 focus:ring-primary-500 focus:ring-2"
            />
            <div className="mr-3">
              <div className="flex items-center space-x-2 space-x-reverse">
                <div className="w-5 h-5 bg-black rounded text-white flex items-center justify-center text-xs font-bold">
                  🍎
                </div>
                <span className="font-medium">Apple Pay</span>
              </div>
              <p className="text-sm text-gray-500">دفع سريع وآمن</p>
            </div>
          </label>

          <label className="flex items-center p-4 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50">
            <input
              type="radio"
              name="paymentMethod"
              value="bank-transfer"
              checked={formData.paymentMethod === 'bank-transfer'}
              onChange={(e) => handleInputChange('paymentMethod', e.target.value)}
              className="w-4 h-4 text-primary-500 bg-gray-100 border-gray-300 focus:ring-primary-500 focus:ring-2"
            />
            <div className="mr-3">
              <div className="flex items-center space-x-2 space-x-reverse">
                <div className="w-5 h-5 bg-green-600 rounded text-white flex items-center justify-center text-xs font-bold">
                  💳
                </div>
                <span className="font-medium">تحويل بنكي</span>
              </div>
              <p className="text-sm text-gray-500">تحويل مباشر من البنك</p>
            </div>
          </label>
        </div>
      </div>

      {/* Credit Card Form */}
      {formData.paymentMethod === 'credit-card' && (
        <div className="space-y-6">
          <Input
            label="رقم البطاقة"
            value={formData.cardNumber}
            onChange={(e) => handleInputChange('cardNumber', e.target.value)}
            error={errors.cardNumber}
            icon={<CreditCard className="w-5 h-5" />}
            iconPosition="right"
            placeholder="1234 5678 9012 3456"
            required
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="تاريخ الانتهاء"
              value={formData.expiryDate}
              onChange={(e) => handleInputChange('expiryDate', e.target.value)}
              error={errors.expiryDate}
              placeholder="MM/YY"
              required
            />
            
            <Input
              label="رمز الأمان (CVV)"
              value={formData.cvv}
              onChange={(e) => handleInputChange('cvv', e.target.value)}
              error={errors.cvv}
              icon={<Lock className="w-5 h-5" />}
              iconPosition="right"
              placeholder="123"
              required
            />
          </div>

          <Input
            label="اسم حامل البطاقة"
            value={formData.cardName}
            onChange={(e) => handleInputChange('cardName', e.target.value)}
            error={errors.cardName}
            required
          />
        </div>
      )}

      {/* Security Notice */}
      <div className="bg-green-50 border border-green-200 rounded-xl p-4">
        <div className="flex items-center space-x-2 space-x-reverse">
          <Lock className="w-5 h-5 text-green-600" />
          <span className="text-sm font-medium text-green-800">دفع آمن ومحمي</span>
        </div>
        <p className="text-sm text-green-700 mt-1">
          معلوماتك محمية بتشفير SSL 256-bit. لن نشارك بياناتك مع أي طرف ثالث.
        </p>
      </div>
    </div>
  )

  const renderReviewStep = () => (
    <div className="space-y-6">
      {/* Order Summary */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">ملخص الطلب</h3>
        <div className="bg-gray-50 rounded-xl p-6 space-y-4">
          <div className="flex justify-between">
            <span className="text-gray-600">المجموع الفرعي:</span>
            <span className="font-medium">12,999 ريال</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">الشحن:</span>
            <span className="font-medium text-green-600">مجاني</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">ضريبة القيمة المضافة (15%):</span>
            <span className="font-medium">1,950 ريال</span>
          </div>
          <div className="border-t border-gray-200 pt-4">
            <div className="flex justify-between text-lg font-bold">
              <span>المجموع الكلي:</span>
              <span>14,949 ريال</span>
            </div>
          </div>
        </div>
      </div>

      {/* Shipping Information Review */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">معلومات الشحن</h3>
        <div className="bg-gray-50 rounded-xl p-6">
          <p className="font-medium">{formData.firstName} {formData.lastName}</p>
          <p className="text-gray-600">{formData.address}</p>
          <p className="text-gray-600">{formData.city}, {formData.postalCode}</p>
          <p className="text-gray-600">{formData.country}</p>
          <p className="text-gray-600">{formData.phone}</p>
          <p className="text-gray-600">{formData.email}</p>
        </div>
      </div>

      {/* Payment Method Review */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">طريقة الدفع</h3>
        <div className="bg-gray-50 rounded-xl p-6">
          {formData.paymentMethod === 'credit-card' && (
            <div>
              <p className="font-medium">بطاقة ائتمان/خصم</p>
              <p className="text-gray-600">**** **** **** {formData.cardNumber.slice(-4)}</p>
              <p className="text-gray-600">{formData.cardName}</p>
            </div>
          )}
          {formData.paymentMethod === 'apple-pay' && (
            <p className="font-medium">Apple Pay</p>
          )}
          {formData.paymentMethod === 'bank-transfer' && (
            <p className="font-medium">تحويل بنكي</p>
          )}
        </div>
      </div>

      {/* Terms and Conditions */}
      <div className="flex items-start space-x-3 space-x-reverse">
        <input
          type="checkbox"
          id="terms"
          required
          className="w-4 h-4 text-primary-500 bg-gray-100 border-gray-300 rounded focus:ring-primary-500 focus:ring-2 mt-1"
        />
        <label htmlFor="terms" className="text-sm text-gray-600">
          أوافق على{' '}
          <a href="/terms" className="text-primary-500 hover:text-primary-600 underline">
            الشروط والأحكام
          </a>
          {' '}و{' '}
          <a href="/privacy" className="text-primary-500 hover:text-primary-600 underline">
            سياسة الخصوصية
          </a>
        </label>
      </div>

      <div className="flex items-start space-x-3 space-x-reverse">
        <input
          type="checkbox"
          id="newsletter"
          checked={formData.newsletter}
          onChange={(e) => handleInputChange('newsletter', e.target.checked)}
          className="w-4 h-4 text-primary-500 bg-gray-100 border-gray-300 rounded focus:ring-primary-500 focus:ring-2 mt-1"
        />
        <label htmlFor="newsletter" className="text-sm text-gray-600">
          أريد تلقي العروض والأخبار عبر البريد الإلكتروني
        </label>
      </div>
    </div>
  )

  return (
    <div className="space-y-8">
      {/* Progress Steps */}
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const Icon = step.icon
          const isActive = currentStep === step.id
          const isCompleted = currentStep > step.id
          
          return (
            <div key={step.id} className="flex items-center">
              <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-200 ${
                isCompleted 
                  ? 'bg-primary-500 border-primary-500 text-white' 
                  : isActive 
                    ? 'border-primary-500 text-primary-500' 
                    : 'border-gray-300 text-gray-400'
              }`}>
                {isCompleted ? (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <Icon className="w-5 h-5" />
                )}
              </div>
              <div className="mr-3">
                <p className={`text-sm font-medium ${isActive ? 'text-primary-600' : 'text-gray-500'}`}>
                  {step.title}
                </p>
              </div>
              {index < steps.length - 1 && (
                <div className={`w-16 h-0.5 mx-4 ${isCompleted ? 'bg-primary-500' : 'bg-gray-300'}`} />
              )}
            </div>
          )
        })}
      </div>

      {/* Form Content */}
      <Card>
        <CardHeader>
          <CardTitle>{steps[currentStep - 1]?.title}</CardTitle>
        </CardHeader>
        <CardContent>
          {currentStep === 1 && renderShippingStep()}
          {currentStep === 2 && renderPaymentStep()}
          {currentStep === 3 && renderReviewStep()}
        </CardContent>
      </Card>

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentStep === 1}
        >
          السابق
        </Button>
        
        {currentStep < 3 ? (
          <Button onClick={handleNext}>
            التالي
          </Button>
        ) : (
          <Button onClick={handleSubmit}>
            تأكيد الطلب
          </Button>
        )}
      </div>
    </div>
  )
}

export default CheckoutForm