'use client'
import React from 'react'
import { fetchOrdersByPhone } from '../data/db'
import Link from 'next/link'

export default function CustomerOrdersPage() {
  const [phone, setPhone] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState<string>('')
  const [orders, setOrders] = React.useState<any[]>([])

  const search = async () => {
    setError('')
    const normalized = phone.trim()
    if (!normalized) { setError('ادخل رقم الهاتف'); return }
    setLoading(true)
    try {
      const data = await fetchOrdersByPhone(normalized)
      setOrders(data)
    } catch (e) {
      setError('تعذر جلب الطلبات. حاول لاحقاً.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-6">تتبع طلباتك</h1>
        <div className="flex flex-col sm:flex-row gap-2 mb-3">
          <input className="flex-1 px-3 py-2 border rounded-lg" placeholder="رقم الهاتف" value={phone} onChange={e=>setPhone(e.target.value)} />
          <button className="px-4 py-2 rounded-lg bg-[#007AFF] text-white" onClick={search} disabled={loading}>{loading? 'جارٍ التحميل...' : 'بحث'}</button>
        </div>
        {error && <div className="mb-4 p-3 rounded-lg bg-red-50 text-red-600 border">{error}</div>}

        {loading ? (
          <div className="text-gray-600">جارٍ التحميل...</div>
        ) : orders.length === 0 ? (
          <div className="text-gray-600">لا توجد طلبات للعرض.</div>
        ) : (
          <div className="space-y-4">
            {orders.map(order => (
              <div key={order.id} className="border rounded-xl p-4">
                <div className="flex items-center justify-between">
                  <div className="font-semibold">طلب #{order.id}</div>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${order.status === 'Completed' ? 'bg-green-100 text-green-700' : order.status === 'Processing' ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-700'}`}>{order.status}</span>
                </div>
                <div className="text-sm text-gray-600">{order.customer_name} • {order.phone}</div>
                <div className="text-sm text-gray-600">{order.address}</div>
                <div className="mt-3 divide-y">
                  {order.items.map((it:any)=> (
                    <div key={it.id} className="flex items-center justify-between py-1 text-sm">
                      <Link href={`/products/${it.product?.id || it.product_id}`} className="text-[#007AFF] hover:underline">{it.product?.name || `#${it.product_id}`}</Link>
                      <div className="text-gray-500">x{it.qty}</div>
                      <div className="font-medium">${(it.price*it.qty).toFixed(2)}</div>
                    </div>
                  ))}
                </div>
                <div className="mt-3 font-semibold">الإجمالي: ${order.total.toFixed(2)}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
