'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { supabase } from '../../../supabaseClient'
import { fetchOrders, updateOrderStatus } from '../../data/db'

export default function AdminOrdersPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [orders, setOrders] = useState<any[]>([])
  const [userEmail, setUserEmail] = useState('')

  useEffect(() => {
    (async () => {
      const { data } = await supabase.auth.getSession()
      const email = data.session?.user?.email
      const allowed = email && (!process.env.NEXT_PUBLIC_ADMIN_EMAIL || email.toLowerCase() === process.env.NEXT_PUBLIC_ADMIN_EMAIL.toLowerCase())
      if (!allowed) { router.push('/login'); return }
      setUserEmail(email || '')
      load()
    })()
  }, [router])

  async function load() {
    setIsLoading(true)
    try {
      const data = await fetchOrders()
      setOrders(data)
    } finally {
      setIsLoading(false)
    }
  }

  const handleStatusChange = async (orderId: number, status: 'Pending' | 'Processing' | 'Completed') => {
    await updateOrderStatus(orderId, status)
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status } : o))
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-gray-200 border-t-red-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading Orders...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b border-gray-200 mb-8">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">🛠️</div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">H.N Admin Panel</h1>
                <p className="text-sm text-gray-600">Orders Management</p>
              </div>
            </div>
            <nav className="flex gap-8 items-center">
              <Link href="/admin" className="text-gray-700 hover:text-red-600 font-medium transition-colors">Dashboard</Link>
              <Link href="/admin/products" className="text-gray-700 hover:text-red-600 font-medium transition-colors">Products</Link>
              <Link href="/admin/orders" className="text-red-600 font-semibold border-b-2 border-red-600 pb-1">Orders</Link>
              <Link href="/" className="text-gray-700 hover:text-red-600 font-medium transition-colors">View Store</Link>
              <button onClick={handleLogout} className="bg-red-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-700 transition-colors">Logout {userEmail ? `(${userEmail})` : ''}</button>
            </nav>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Orders</h2>

        {orders.length === 0 ? (
          <div className="bg-white p-8 rounded-xl text-gray-600">No orders yet.</div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-xl font-bold text-gray-900">Orders ({orders.length})</h3>
            </div>
            <div className="divide-y">
              {orders.map(order => (
                <div key={order.id} className="px-6 py-5">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <div className="font-semibold">Order #{order.id}</div>
                      <div className="text-sm text-gray-600">{order.customer_name} • {order.phone}</div>
                      <div className="text-sm text-gray-600">{order.address}</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="font-semibold">${order.total.toFixed(2)}</div>
                      <select value={order.status} onChange={e=>handleStatusChange(order.id, e.target.value as any)} className="px-3 py-2 border rounded-lg">
                        <option value="Pending">Pending</option>
                        <option value="Processing">Processing</option>
                        <option value="Completed">Completed</option>
                      </select>
                    </div>
                  </div>
                  <div className="mt-4 pl-3 border-l">
                    {order.items.map((it: any) => (
                      <div key={it.id} className="flex items-center justify-between text-sm py-1">
                        <div className="text-gray-700">{it.product?.name || `#${it.product_id}`}</div>
                        <div className="text-gray-500">x{it.qty}</div>
                        <div className="text-gray-900 font-medium">${(it.price*it.qty).toFixed(2)}</div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
