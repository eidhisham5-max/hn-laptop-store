'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowLeft,
  Loader2,
  AlertCircle,
  User,
  Phone,
  CheckCircle
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Separator } from '@/components/ui/separator'
import { useAuth } from '@/contexts/auth-context'
import { cn } from '@/lib/utils'
import { toast } from 'react-hot-toast'

export default function RegisterPage() {
  const router = useRouter()
  const { register } = useAuth()
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false,
    acceptMarketing: false
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  // Handle form input changes
  const handleChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  // Validate form
  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'الاسم الأول مطلوب'
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'اسم العائلة مطلوب'
    }

    if (!formData.email) {
      newErrors.email = 'البريد الإلكتروني مطلوب'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'البريد الإلكتروني غير صحيح'
    }

    if (!formData.phone) {
      newErrors.phone = 'رقم الهاتف مطلوب'
    } else if (!/^(\+966|0)?[5-9][0-9]{8}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'رقم الهاتف غير صحيح'
    }

    if (!formData.password) {
      newErrors.password = 'كلمة المرور مطلوبة'
    } else if (formData.password.length < 8) {
      newErrors.password = 'كلمة المرور يجب أن تكون 8 أحرف على الأقل'
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'كلمة المرور يجب أن تحتوي على حرف كبير وصغير ورقم'
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'تأكيد كلمة المرور مطلوب'
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'كلمة المرور غير متطابقة'
    }

    if (!formData.acceptTerms) {
      newErrors.acceptTerms = 'يجب الموافقة على الشروط والأحكام'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }
    
    setLoading(true)
    try {
      await register({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        confirmPassword: formData.password,
        acceptTerms: true,
      })
      toast.success('تم إنشاء الحساب بنجاح')
      router.push('/')
    } catch (error: any) {
      toast.error(error.message || 'فشل في إنشاء الحساب')
    } finally {
      setLoading(false)
    }
  }

  // Handle social register
  const handleSocialRegister = (provider: string) => {
    toast(`التسجيل عبر ${provider} قريباً`)
  }

  // Password strength indicator
  const getPasswordStrength = (password: string) => {
    let strength = 0
    if (password.length >= 8) strength++
    if (/[a-z]/.test(password)) strength++
    if (/[A-Z]/.test(password)) strength++
    if (/\d/.test(password)) strength++
    if (/[^A-Za-z0-9]/.test(password)) strength++
    return strength
  }

  const passwordStrength = getPasswordStrength(formData.password)

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="w-full max-w-md">
        {/* Back Button */}
        <div className="mb-6">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/">
              <ArrowLeft className="w-4 h-4 ml-2" />
              العودة للرئيسية
            </Link>
          </Button>
          </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold">إنشاء حساب جديد</CardTitle>
              <p className="text-muted-foreground">
                انضم إلينا وابدأ رحلة التسوق المميزة
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Fields */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">الاسم الأول</Label>
                    <div className="relative">
                      <User className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                        id="firstName"
                    type="text"
                        placeholder="الاسم الأول"
                    value={formData.firstName}
                        onChange={(e) => handleChange('firstName', e.target.value)}
                        className={cn(
                          'pr-10',
                          errors.firstName && 'border-red-500 focus:border-red-500'
                        )}
                      />
                    </div>
                    {errors.firstName && (
                      <div className="flex items-center space-x-1 space-x-reverse text-red-500 text-sm">
                        <AlertCircle className="w-4 h-4" />
                        <span>{errors.firstName}</span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="lastName">اسم العائلة</Label>
                    <div className="relative">
                      <User className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                        id="lastName"
                    type="text"
                        placeholder="اسم العائلة"
                    value={formData.lastName}
                        onChange={(e) => handleChange('lastName', e.target.value)}
                        className={cn(
                          'pr-10',
                          errors.lastName && 'border-red-500 focus:border-red-500'
                        )}
                      />
                    </div>
                    {errors.lastName && (
                      <div className="flex items-center space-x-1 space-x-reverse text-red-500 text-sm">
                        <AlertCircle className="w-4 h-4" />
                        <span>{errors.lastName}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Email Field */}
                <div className="space-y-2">
                  <Label htmlFor="email">البريد الإلكتروني</Label>
                  <div className="relative">
                    <Mail className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                      id="email"
                  type="email"
                      placeholder="أدخل بريدك الإلكتروني"
                  value={formData.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      className={cn(
                        'pr-10',
                        errors.email && 'border-red-500 focus:border-red-500'
                      )}
                    />
                  </div>
                  {errors.email && (
                    <div className="flex items-center space-x-1 space-x-reverse text-red-500 text-sm">
                      <AlertCircle className="w-4 h-4" />
                      <span>{errors.email}</span>
                    </div>
                  )}
                </div>

                {/* Phone Field */}
                <div className="space-y-2">
                  <Label htmlFor="phone">رقم الهاتف</Label>
                  <div className="relative">
                    <Phone className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                      id="phone"
                  type="tel"
                      placeholder="05xxxxxxxx"
                  value={formData.phone}
                      onChange={(e) => handleChange('phone', e.target.value)}
                      className={cn(
                        'pr-10',
                        errors.phone && 'border-red-500 focus:border-red-500'
                      )}
                    />
                  </div>
                  {errors.phone && (
                    <div className="flex items-center space-x-1 space-x-reverse text-red-500 text-sm">
                      <AlertCircle className="w-4 h-4" />
                      <span>{errors.phone}</span>
                    </div>
                  )}
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <Label htmlFor="password">كلمة المرور</Label>
                  <div className="relative">
                    <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="أدخل كلمة المرور"
                  value={formData.password}
                      onChange={(e) => handleChange('password', e.target.value)}
                      className={cn(
                        'pr-10 pl-10',
                        errors.password && 'border-red-500 focus:border-red-500'
                      )}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute left-0 top-0 h-full px-3 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4 text-muted-foreground" />
                      ) : (
                        <Eye className="w-4 h-4 text-muted-foreground" />
                      )}
                    </Button>
                  </div>
                  
                  {/* Password Strength Indicator */}
                  {formData.password && (
                    <div className="space-y-2">
                      <div className="flex space-x-1 space-x-reverse">
                        {[1, 2, 3, 4, 5].map((level) => (
                          <div
                            key={level}
                            className={cn(
                              'h-1 flex-1 rounded',
                              level <= passwordStrength
                                ? passwordStrength <= 2
                                  ? 'bg-red-500'
                                  : passwordStrength <= 3
                                  ? 'bg-yellow-500'
                                  : 'bg-green-500'
                                : 'bg-muted'
                            )}
                          />
                        ))}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        قوة كلمة المرور: {
                          passwordStrength <= 2 ? 'ضعيفة' :
                          passwordStrength <= 3 ? 'متوسطة' : 'قوية'
                        }
                      </div>
                    </div>
                  )}

                  {errors.password && (
                    <div className="flex items-center space-x-1 space-x-reverse text-red-500 text-sm">
                      <AlertCircle className="w-4 h-4" />
                      <span>{errors.password}</span>
                    </div>
                  )}
                </div>

                {/* Confirm Password Field */}
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">تأكيد كلمة المرور</Label>
                  <div className="relative">
                    <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder="أعد إدخال كلمة المرور"
                  value={formData.confirmPassword}
                      onChange={(e) => handleChange('confirmPassword', e.target.value)}
                      className={cn(
                        'pr-10 pl-10',
                        errors.confirmPassword && 'border-red-500 focus:border-red-500'
                      )}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute left-0 top-0 h-full px-3 hover:bg-transparent"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="w-4 h-4 text-muted-foreground" />
                      ) : (
                        <Eye className="w-4 h-4 text-muted-foreground" />
                      )}
                    </Button>
                  </div>
                  {errors.confirmPassword && (
                    <div className="flex items-center space-x-1 space-x-reverse text-red-500 text-sm">
                      <AlertCircle className="w-4 h-4" />
                      <span>{errors.confirmPassword}</span>
                    </div>
                  )}
                </div>

                {/* Terms and Marketing */}
                <div className="space-y-4">
                  <div className="flex items-start space-x-2 space-x-reverse">
                    <Checkbox
                      id="acceptTerms"
                      checked={formData.acceptTerms}
                      onCheckedChange={(checked: boolean) => handleChange('acceptTerms', checked)}
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
                  {errors.acceptTerms && (
                    <div className="flex items-center space-x-1 space-x-reverse text-red-500 text-sm">
                      <AlertCircle className="w-4 h-4" />
                      <span>{errors.acceptTerms}</span>
                    </div>
                  )}

                  <div className="flex items-start space-x-2 space-x-reverse">
                    <Checkbox
                      id="acceptMarketing"
                      checked={formData.acceptMarketing}
                      onCheckedChange={(checked: boolean) => handleChange('acceptMarketing', checked)}
                    />
                    <Label htmlFor="acceptMarketing" className="text-sm">
                      أريد تلقي العروض والمنتجات الجديدة عبر البريد الإلكتروني
                    </Label>
                  </div>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 ml-2 animate-spin" />
                      جاري إنشاء الحساب...
                    </>
                  ) : (
                    'إنشاء الحساب'
                  )}
                </Button>

                {/* Divider */}
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <Separator className="w-full" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                      أو
                    </span>
                  </div>
                </div>

                {/* Social Register */}
                <div className="space-y-3">
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={() => handleSocialRegister('Google')}
                  >
                    <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="currentColor"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                    التسجيل عبر Google
                  </Button>
                  
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={() => handleSocialRegister('Apple')}
                  >
                    <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"
                      />
                    </svg>
                    التسجيل عبر Apple
                  </Button>
              </div>

                {/* Login Link */}
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">
                  لديك حساب بالفعل؟{' '}
                    <Button variant="link" size="sm" asChild>
                      <Link href="/auth/login">
                        تسجيل الدخول
                  </Link>
                    </Button>
                </p>
              </div>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
