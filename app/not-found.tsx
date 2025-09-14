import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Home, ArrowLeft, Search } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <Card>
          <CardContent className="p-8 text-center">
            <div className="text-6xl mb-6">🔍</div>
            <h1 className="text-4xl font-bold mb-4">404</h1>
            <h2 className="text-2xl font-semibold mb-4">الصفحة غير موجودة</h2>
            <p className="text-muted-foreground mb-8">
              عذراً، لم نتمكن من العثور على الصفحة التي تبحث عنها. 
              قد تكون الصفحة قد تم نقلها أو حذفها.
            </p>
            
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild className="flex-1">
                  <Link href="/">
                    <Home className="w-4 h-4 ml-2" />
                    العودة للرئيسية
                  </Link>
                </Button>
                <Button variant="outline" asChild className="flex-1">
                  <Link href="/products">
                    <Search className="w-4 h-4 ml-2" />
                    تصفح المنتجات
                  </Link>
                </Button>
              </div>
              
              <Button variant="ghost" asChild>
                <Link href="javascript:history.back()">
                  <ArrowLeft className="w-4 h-4 ml-2" />
                  العودة للصفحة السابقة
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}