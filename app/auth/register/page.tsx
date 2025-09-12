'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Card, CardContent } from '@/components/ui/Card'
import { Mail, Lock, User, Phone, Eye, EyeOff } from 'lucide-react'

const RegisterPage: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [agreedToTerms, setAgreedToTerms] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (formData.password !== formData.confirmPassword) {
      alert('كلمات المرور غير متطابقة')
      return
    }
    
    if (!agreedToTerms) {
      alert('يجب الموافقة على الشروط والأحكام')
      return
    }
    
    setIsLoading(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsLoading(false)
    // Handle registration logic here
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Hero Image */}
      <div className="hidden lg:flex lg:w-1/2 relative">
        <div className="absolute inset-0 gradient-primary opacity-90"></div>
        <Image
          src="https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1964&q=80"
          alt="Laptop Store"
          fill
          className="object-cover"
          priority
        />
        
        {/* Overlay Content */}
        <div className="relative z-10 flex flex-col justify-center items-center text-white p-12 text-center">
          <div className="mb-8">
            <div className="w-20 h-20 bg-white bg-opacity-20 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-sm">
              <span className="text-3xl font-bold">HN</span>
            </div>
            <h1 className="text-4xl font-bold mb-4">انضم إلى عائلة H.N</h1>
            <p className="text-xl text-blue-100 leading-relaxed">
              ابدأ رحلتك التقنية معنا اليوم
            </p>
          </div>
          
          <div className="space-y-4 text-blue-100">
            <div className="flex items-center space-x-3 space-x-reverse">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <span>عروض حصرية للأعضاء الجدد</span>
            </div>
            <div className="flex items-center space-x-3 space-x-reverse">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <span>تتبع طلباتك بسهولة</span>
            </div>
            <div className="flex items-center space-x-3 space-x-reverse">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <span>دعم فني متميز</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Register Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-50">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-8">
            <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-2xl">HN</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-800">H.N Laptop Store</h1>
          </div>

          <Card className="shadow-strong">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">أنشئ حسابك الجديد</h2>
                <p className="text-gray-600">انضم إلى آلاف العملاء الراضين</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="الاسم الأول"
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="الاسم الأول"
                    icon={<User className="w-5 h-5" />}
                    iconPosition="right"
                    required
                  />
                  
                  <Input
                    label="الاسم الأخير"
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="الاسم الأخير"
                    icon={<User className="w-5 h-5" />}
                    iconPosition="right"
                    required
                  />
                </div>

                <Input
                  label="البريد الإلكتروني"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="أدخل بريدك الإلكتروني"
                  icon={<Mail className="w-5 h-5" />}
                  iconPosition="right"
                  required
                />

                <Input
                  label="رقم الهاتف"
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+966 50 123 4567"
                  icon={<Phone className="w-5 h-5" />}
                  iconPosition="right"
                  required
                />

                <Input
                  label="كلمة المرور"
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="أدخل كلمة المرور"
                  icon={<Lock className="w-5 h-5" />}
                  iconPosition="right"
                  required
                />

                <Input
                  label="تأكيد كلمة المرور"
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="أعد إدخال كلمة المرور"
                  icon={<Lock className="w-5 h-5" />}
                  iconPosition="right"
                  required
                />

                <div className="flex items-start space-x-3 space-x-reverse">
                  <input
                    type="checkbox"
                    id="terms"
                    checked={agreedToTerms}
                    onChange={(e) => setAgreedToTerms(e.target.checked)}
                    className="w-4 h-4 text-primary-500 bg-gray-100 border-gray-300 rounded focus:ring-primary-500 focus:ring-2 mt-1"
                  />
                  <label htmlFor="terms" className="text-sm text-gray-600">
                    أوافق على{' '}
                    <Link href="/terms" className="text-primary-500 hover:text-primary-600">
                      الشروط والأحكام
                    </Link>
                    {' '}و{' '}
                    <Link href="/privacy" className="text-primary-500 hover:text-primary-600">
                      سياسة الخصوصية
                    </Link>
                  </label>
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  loading={isLoading}
                >
                  إنشاء الحساب
                </Button>
              </form>

              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">أو</span>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-3">
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => {/* Handle Google registration */}}
                  >
                    <svg className="w-5 h-5 ml-2" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    Google
                  </Button>
                  
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => {/* Handle Facebook registration */}}
                  >
                    <svg className="w-5 h-5 ml-2" fill="#1877F2" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                    Facebook
                  </Button>
                </div>
              </div>

              <div className="mt-6 text-center">
                <p className="text-gray-600">
                  لديك حساب بالفعل؟{' '}
                  <Link
                    href="/auth/login"
                    className="text-primary-500 hover:text-primary-600 font-medium transition-colors duration-200"
                  >
                    سجل دخولك هنا
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default RegisterPage