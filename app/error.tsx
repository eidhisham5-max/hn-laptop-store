'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Home, RefreshCw, AlertTriangle } from 'lucide-react'
import Link from 'next/link'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Application error:', error)
  }, [error])

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <Card>
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertTriangle className="w-8 h-8 text-red-600" />
            </div>
            
            <h1 className="text-2xl font-bold mb-4">حدث خطأ غير متوقع</h1>
            <p className="text-muted-foreground mb-6">
              عذراً، حدث خطأ في التطبيق. نحن نعمل على إصلاح هذه المشكلة.
            </p>
            
            {process.env.NODE_ENV === 'development' && (
              <div className="bg-muted p-4 rounded-lg mb-6 text-left">
                <h3 className="font-semibold mb-2">تفاصيل الخطأ:</h3>
                <pre className="text-sm text-muted-foreground overflow-auto">
                  {error.message}
                </pre>
              </div>
            )}
            
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <Button onClick={reset} className="flex-1">
                  <RefreshCw className="w-4 h-4 ml-2" />
                  إعادة المحاولة
                </Button>
                <Button variant="outline" asChild className="flex-1">
                  <Link href="/">
                    <Home className="w-4 h-4 ml-2" />
                    العودة للرئيسية
                  </Link>
                </Button>
              </div>
              
              <p className="text-sm text-muted-foreground">
                إذا استمرت المشكلة، يرجى{' '}
                <Link href="/contact" className="text-primary hover:underline">
                  التواصل معنا
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
