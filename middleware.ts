import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone()
  const pathname = url.pathname

  // حماية صفحات الإدارة
  if (pathname.startsWith('/admin')) {
    // التحقق من وجود session token في cookies أو headers
    const authToken = request.cookies.get('admin-session')?.value
    const userType = request.cookies.get('user-type')?.value

    // في التطبيق الحقيقي، يجب التحقق من صحة التوكن من قاعدة البيانات
    if (!authToken || userType !== 'admin') {
      // إعادة توجيه إلى صفحة تسجيل الدخول مع رسالة خطأ
      const loginUrl = new URL('/login', request.url)
      loginUrl.searchParams.set('redirect', pathname)
      loginUrl.searchParams.set('error', 'admin_required')
      return NextResponse.redirect(loginUrl)
    }
  }

  // حماية صفحة لوحة المستخدم
  if (pathname.startsWith('/dashboard')) {
    const authToken = request.cookies.get('user-session')?.value
    const userType = request.cookies.get('user-type')?.value

    if (!authToken || userType !== 'customer') {
      const loginUrl = new URL('/login', request.url)
      loginUrl.searchParams.set('redirect', pathname)
      loginUrl.searchParams.set('error', 'login_required')
      return NextResponse.redirect(loginUrl)
    }
  }

  // إضافة headers أمان
  const response = NextResponse.next()
  
  // منع clickjacking
  response.headers.set('X-Frame-Options', 'DENY')
  
  // منع MIME type sniffing
  response.headers.set('X-Content-Type-Options', 'nosniff')
  
  // تفعيل XSS protection
  response.headers.set('X-XSS-Protection', '1; mode=block')
  
  // إجبار HTTPS (في الإنتاج)
  if (process.env.NODE_ENV === 'production') {
    response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains')
  }

  // Content Security Policy
  response.headers.set(
    'Content-Security-Policy',
    "default-src 'self'; " +
    "script-src 'self' 'unsafe-inline' 'unsafe-eval'; " +
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; " +
    "img-src 'self' data: https: blob:; " +
    "font-src 'self' https://fonts.gstatic.com; " +
    "connect-src 'self' https://whulchwxpwdoxemyovgg.supabase.co; " +
    "frame-src 'none';"
  )

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}