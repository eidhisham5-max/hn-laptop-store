'use client'
import React, { useState, useEffect } from 'react'
import { Button } from './Button'
import { Badge } from './Badge'
import { cn } from '../../lib/utils'

interface ConsentManagerProps {
  className?: string
}

interface ConsentSettings {
  essential: boolean
  analytics: boolean
  personalization: boolean
  marketing: boolean
}

const ConsentManager: React.FC<ConsentManagerProps> = ({ className }) => {
  const [isVisible, setIsVisible] = useState(false)
  const [showDetails, setShowDetails] = useState(false)
  const [consents, setConsents] = useState<ConsentSettings>({
    essential: true, // Always true
    analytics: false,
    personalization: false,
    marketing: false
  })

  useEffect(() => {
    // Check if user has already given consent
    const savedConsent = localStorage.getItem('cookie-consent')
    if (!savedConsent) {
      setIsVisible(true)
    }
  }, [])

  const saveConsent = (settings: ConsentSettings) => {
    localStorage.setItem('cookie-consent', JSON.stringify({
      ...settings,
      timestamp: new Date().toISOString(),
      version: '1.0'
    }))
    setIsVisible(false)
    
    // Trigger consent change event for analytics
    window.dispatchEvent(new CustomEvent('consentChange', { 
      detail: settings 
    }))
  }

  const handleAcceptAll = () => {
    const allConsents = {
      essential: true,
      analytics: true,
      personalization: true,
      marketing: true
    }
    saveConsent(allConsents)
  }

  const handleAcceptEssential = () => {
    saveConsent({
      essential: true,
      analytics: false,
      personalization: false,
      marketing: false
    })
  }

  const handleCustomSave = () => {
    saveConsent(consents)
  }

  const toggleConsent = (type: keyof ConsentSettings) => {
    if (type === 'essential') return // Essential cookies cannot be disabled
    
    setConsents(prev => ({
      ...prev,
      [type]: !prev[type]
    }))
  }

  if (!isVisible) return null

  return (
    <div className={cn(
      'fixed bottom-0 left-0 right-0 z-banner bg-background-primary border-t border-border-subtle shadow-2xl',
      className
    )}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {!showDetails ? (
          // Simple consent banner
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-body-lg">🔒</span>
                <h3 className="text-h6 font-semibold text-text-primary">نحترم خصوصيتك</h3>
              </div>
              <p className="text-body-sm text-text-secondary leading-relaxed">
                نستخدم ملفات تعريف الارتباط (الكوكيز) الضرورية لتشغيل موقعنا بشكل صحيح وآمن. 
                للحصول على تجربة أفضل ومخصصة، يمكنك اختيار السماح بكوكيز إضافية.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <Button
                onClick={handleAcceptAll}
                size="md"
                className="w-full sm:w-auto min-w-[140px]"
              >
                قبول الكل
              </Button>
              <Button
                onClick={handleAcceptEssential}
                variant="outline"
                size="md"
                className="w-full sm:w-auto min-w-[140px]"
              >
                الضروري فقط
              </Button>
              <Button
                onClick={() => setShowDetails(true)}
                variant="ghost"
                size="md"
                className="w-full sm:w-auto min-w-[140px]"
              >
                تخصيص الإعدادات
              </Button>
            </div>
          </div>
        ) : (
          // Detailed consent settings
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-h5 font-semibold text-text-primary">إعدادات الخصوصية والكوكيز</h3>
              <Button
                onClick={() => setShowDetails(false)}
                variant="ghost"
                size="sm"
                aria-label="إغلاق الإعدادات المفصلة"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Essential Cookies */}
              <div className="p-4 border border-border-subtle rounded-lg bg-background-secondary">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-body-lg">🔒</span>
                    <h4 className="text-h6 font-semibold text-text-primary">الكوكيز الضرورية</h4>
                  </div>
                  <Badge variant="success" size="sm">مطلوبة</Badge>
                </div>
                <p className="text-body-sm text-text-secondary mb-3">
                  هذه الكوكيز ضرورية لعمل الموقع الأساسي مثل تسجيل الدخول وحفظ سلة التسوق.
                </p>
                <div className="text-body-xs text-text-tertiary">
                  مدة الاحتفاظ: مدة الجلسة
                </div>
              </div>

              {/* Analytics Cookies */}
              <div className="p-4 border border-border-subtle rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-body-lg">📊</span>
                    <h4 className="text-h6 font-semibold text-text-primary">كوكيز التحليلات</h4>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={consents.analytics}
                      onChange={() => toggleConsent('analytics')}
                      className="sr-only"
                    />
                    <div className={cn(
                      'w-11 h-6 rounded-full transition-colors duration-normal',
                      consents.analytics ? 'bg-primary-500' : 'bg-neutral-300'
                    )}>
                      <div className={cn(
                        'w-5 h-5 bg-white rounded-full shadow-sm transition-transform duration-normal',
                        consents.analytics ? 'translate-x-5' : 'translate-x-0.5',
                        'mt-0.5'
                      )} />
                    </div>
                  </label>
                </div>
                <p className="text-body-sm text-text-secondary mb-3">
                  تساعدنا في فهم كيفية استخدام الموقع لتحسين الأداء والتجربة.
                </p>
                <div className="text-body-xs text-text-tertiary">
                  مدة الاحتفاظ: سنتان
                </div>
              </div>

              {/* Personalization Cookies */}
              <div className="p-4 border border-border-subtle rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-body-lg">🎯</span>
                    <h4 className="text-h6 font-semibold text-text-primary">كوكيز التخصيص</h4>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={consents.personalization}
                      onChange={() => toggleConsent('personalization')}
                      className="sr-only"
                    />
                    <div className={cn(
                      'w-11 h-6 rounded-full transition-colors duration-normal',
                      consents.personalization ? 'bg-primary-500' : 'bg-neutral-300'
                    )}>
                      <div className={cn(
                        'w-5 h-5 bg-white rounded-full shadow-sm transition-transform duration-normal',
                        consents.personalization ? 'translate-x-5' : 'translate-x-0.5',
                        'mt-0.5'
                      )} />
                    </div>
                  </label>
                </div>
                <p className="text-body-sm text-text-secondary mb-3">
                  تساعدنا في تقديم توصيات منتجات وعروض مخصصة لاهتماماتك.
                </p>
                <div className="text-body-xs text-text-tertiary">
                  مدة الاحتفاظ: سنة واحدة
                </div>
              </div>

              {/* Marketing Cookies */}
              <div className="p-4 border border-border-subtle rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-body-lg">📢</span>
                    <h4 className="text-h6 font-semibold text-text-primary">كوكيز التسويق</h4>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={consents.marketing}
                      onChange={() => toggleConsent('marketing')}
                      className="sr-only"
                    />
                    <div className={cn(
                      'w-11 h-6 rounded-full transition-colors duration-normal',
                      consents.marketing ? 'bg-primary-500' : 'bg-neutral-300'
                    )}>
                      <div className={cn(
                        'w-5 h-5 bg-white rounded-full shadow-sm transition-transform duration-normal',
                        consents.marketing ? 'translate-x-5' : 'translate-x-0.5',
                        'mt-0.5'
                      )} />
                    </div>
                  </label>
                </div>
                <p className="text-body-sm text-text-secondary mb-3">
                  تُستخدم لعرض إعلانات ذات صلة باهتماماتك على مواقع أخرى.
                </p>
                <div className="text-body-xs text-text-tertiary">
                  مدة الاحتفاظ: 13 شهر
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border-subtle">
              <Button
                onClick={handleCustomSave}
                size="md"
                className="w-full sm:w-auto min-w-[140px]"
              >
                حفظ الإعدادات
              </Button>
              <Button
                onClick={handleAcceptAll}
                variant="secondary"
                size="md"
                className="w-full sm:w-auto min-w-[140px]"
              >
                قبول الكل
              </Button>
              <Button
                onClick={handleAcceptEssential}
                variant="outline"
                size="md"
                className="w-full sm:w-auto min-w-[140px]"
              >
                الضروري فقط
              </Button>
            </div>

            <div className="text-center">
              <p className="text-body-xs text-text-tertiary">
                💡 يمكنك تغيير هذه الإعدادات في أي وقت من 
                <button 
                  className="text-primary-500 hover:text-primary-600 underline mx-1"
                  onClick={() => setIsVisible(true)}
                >
                  إعدادات الخصوصية
                </button>
                في أسفل أي صفحة.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export { ConsentManager }
