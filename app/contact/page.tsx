'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  MessageCircle,
  Send,
  CheckCircle,
  AlertCircle,
  Loader2
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { cn } from '@/lib/utils'
import { toast } from 'react-hot-toast'

export default function ContactPage() {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    inquiryType: ''
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  // Handle form input changes
  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  // Validate form
  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = 'الاسم مطلوب'
    }

    if (!formData.email) {
      newErrors.email = 'البريد الإلكتروني مطلوب'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'البريد الإلكتروني غير صحيح'
    }

    if (!formData.phone) {
      newErrors.phone = 'رقم الهاتف مطلوب'
    }

    if (!formData.inquiryType) {
      newErrors.inquiryType = 'نوع الاستفسار مطلوب'
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'الموضوع مطلوب'
    }

    if (!formData.message.trim()) {
      newErrors.message = 'الرسالة مطلوبة'
    } else if (formData.message.length < 10) {
      newErrors.message = 'الرسالة يجب أن تكون 10 أحرف على الأقل'
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
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      toast.success('تم إرسال رسالتك بنجاح! سنتواصل معك قريباً')
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        inquiryType: ''
      })
    } catch (error) {
      toast.error('حدث خطأ في إرسال الرسالة. يرجى المحاولة مرة أخرى')
    } finally {
      setLoading(false)
    }
  }

  // Contact information
  const contactInfo = [
    {
      icon: Phone,
      title: 'الهاتف',
      details: ['+966 50 123 4567', '+966 11 234 5678'],
      description: 'متاح من 9 صباحاً إلى 10 مساءً'
    },
    {
      icon: Mail,
      title: 'البريد الإلكتروني',
      details: ['info@hnstore.com', 'support@hnstore.com'],
      description: 'نرد خلال 24 ساعة'
    },
    {
      icon: MapPin,
      title: 'العنوان',
      details: ['الرياض، حي النخيل', 'شارع الملك فهد، مبنى 123'],
      description: 'المملكة العربية السعودية'
    },
    {
      icon: Clock,
      title: 'ساعات العمل',
      details: ['السبت - الخميس: 9 ص - 10 م', 'الجمعة: 2 م - 10 م'],
      description: 'خدمة العملاء متاحة 24/7'
    }
  ]

  // FAQ data
  const faqs = [
    {
      question: 'ما هي طرق الدفع المتاحة؟',
      answer: 'نقبل جميع البطاقات الائتمانية الرئيسية، PayPal، والدفع عند الاستلام.'
    },
    {
      question: 'كم يستغرق وقت التوصيل؟',
      answer: 'التوصيل العادي يستغرق 3-5 أيام عمل، والتوصيل السريع 1-2 أيام.'
    },
    {
      question: 'هل يمكن إرجاع المنتجات؟',
      answer: 'نعم، يمكن إرجاع المنتجات خلال 14 يوم من تاريخ الاستلام.'
    },
    {
      question: 'هل تقدمون ضمان على المنتجات؟',
      answer: 'جميع المنتجات مضمونة من الشركة المصنعة مع ضمان إضافي منا.'
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      <div className="container-custom py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">تواصل معنا</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              نحن هنا لمساعدتك! تواصل معنا في أي وقت وسنكون سعداء لخدمتك
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MessageCircle className="w-5 h-5 ml-2" />
                    أرسل لنا رسالة
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name and Email */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="name">الاسم الكامل *</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => handleChange('name', e.target.value)}
                          className={cn(
                            errors.name && 'border-red-500 focus:border-red-500'
                          )}
                        />
                        {errors.name && (
                          <div className="flex items-center space-x-1 space-x-reverse text-red-500 text-sm mt-1">
                            <AlertCircle className="w-4 h-4" />
                            <span>{errors.name}</span>
                          </div>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="email">البريد الإلكتروني *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleChange('email', e.target.value)}
                          className={cn(
                            errors.email && 'border-red-500 focus:border-red-500'
                          )}
                        />
                        {errors.email && (
                          <div className="flex items-center space-x-1 space-x-reverse text-red-500 text-sm mt-1">
                            <AlertCircle className="w-4 h-4" />
                            <span>{errors.email}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Phone and Inquiry Type */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="phone">رقم الهاتف *</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => handleChange('phone', e.target.value)}
                          className={cn(
                            errors.phone && 'border-red-500 focus:border-red-500'
                          )}
                        />
                        {errors.phone && (
                          <div className="flex items-center space-x-1 space-x-reverse text-red-500 text-sm mt-1">
                            <AlertCircle className="w-4 h-4" />
                            <span>{errors.phone}</span>
                          </div>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="inquiryType">نوع الاستفسار *</Label>
                        <Select
                          value={formData.inquiryType}
                          onValueChange={(value) => handleChange('inquiryType', value)}
                        >
                          <SelectTrigger className={cn(
                            errors.inquiryType && 'border-red-500 focus:border-red-500'
                          )}>
                            <SelectValue placeholder="اختر نوع الاستفسار" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="general">استفسار عام</SelectItem>
                            <SelectItem value="order">استفسار عن طلب</SelectItem>
                            <SelectItem value="product">استفسار عن منتج</SelectItem>
                            <SelectItem value="return">إرجاع أو استبدال</SelectItem>
                            <SelectItem value="technical">دعم فني</SelectItem>
                            <SelectItem value="complaint">شكوى</SelectItem>
                            <SelectItem value="suggestion">اقتراح</SelectItem>
                          </SelectContent>
                        </Select>
                        {errors.inquiryType && (
                          <div className="flex items-center space-x-1 space-x-reverse text-red-500 text-sm mt-1">
                            <AlertCircle className="w-4 h-4" />
                            <span>{errors.inquiryType}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Subject */}
                    <div>
                      <Label htmlFor="subject">الموضوع *</Label>
                      <Input
                        id="subject"
                        value={formData.subject}
                        onChange={(e) => handleChange('subject', e.target.value)}
                        className={cn(
                          errors.subject && 'border-red-500 focus:border-red-500'
                        )}
                      />
                      {errors.subject && (
                        <div className="flex items-center space-x-1 space-x-reverse text-red-500 text-sm mt-1">
                          <AlertCircle className="w-4 h-4" />
                          <span>{errors.subject}</span>
                        </div>
                      )}
                    </div>

                    {/* Message */}
                    <div>
                      <Label htmlFor="message">الرسالة *</Label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => handleChange('message', e.target.value)}
                        placeholder="اكتب رسالتك هنا..."
                        className={cn(
                          'min-h-32',
                          errors.message && 'border-red-500 focus:border-red-500'
                        )}
                      />
                      {errors.message && (
                        <div className="flex items-center space-x-1 space-x-reverse text-red-500 text-sm mt-1">
                          <AlertCircle className="w-4 h-4" />
                          <span>{errors.message}</span>
                        </div>
                      )}
                    </div>

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      size="lg"
                      className="w-full"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-4 h-4 ml-2 animate-spin" />
                          جاري الإرسال...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 ml-2" />
                          إرسال الرسالة
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>معلومات التواصل</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {contactInfo.map((info, index) => (
                    <div key={index} className="flex items-start space-x-4 space-x-reverse">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <info.icon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2">{info.title}</h3>
                        {info.details.map((detail, idx) => (
                          <p key={idx} className="text-muted-foreground mb-1">{detail}</p>
                        ))}
                        <p className="text-sm text-muted-foreground">{info.description}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>

            {/* WhatsApp Button */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MessageCircle className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-semibold mb-2">WhatsApp</h3>
                  <p className="text-muted-foreground mb-4">
                    تواصل معنا مباشرة عبر WhatsApp
                  </p>
                  <Button className="w-full bg-green-500 hover:bg-green-600">
                    <MessageCircle className="w-4 h-4 ml-2" />
                    ابدأ المحادثة
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">الأسئلة الشائعة</h2>
            <p className="text-muted-foreground">
              إجابات على أكثر الأسئلة شيوعاً
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {faqs.map((faq, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-3">{faq.question}</h3>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}


