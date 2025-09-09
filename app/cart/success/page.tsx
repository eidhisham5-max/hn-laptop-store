'use client'
import Link from 'next/link'

export default function OrderSuccessPage() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="text-5xl mb-4">✅</div>
        <h1 className="text-2xl font-bold mb-2">تم تسجيل طلبك بنجاح</h1>
        <p className="text-gray-600 mb-6">سنتواصل معك قريبًا لإتمام عملية التوصيل.</p>
        <div className="flex gap-3 justify-center">
          <Link href="/products" className="px-5 py-2 rounded-lg bg-[#007AFF] text-white">متابعة التسوق</Link>
          <Link href="/" className="px-5 py-2 rounded-lg border">العودة للرئيسية</Link>
        </div>
      </div>
    </div>
  )
}
