'use client'
import React from 'react'
import { fetchOrdersByPhone } from '../data/db'

export default function CustomerOrdersPage() {
  const [phone, setPhone] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  const [orders, setOrders] = React.useState<any[]>([])

  const search = async () => {
    if (!phone) return
    setLoading(true)
    try {
      const data = await fetchOrdersByPhone(phone)
      setOrders(data)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-6">Track your orders</h1>
        <div className="flex gap-2 mb-6">
          <input className="flex-1 px-3 py-2 border rounded-lg" placeholder="Phone number" value={phone} onChange={e=>setPhone(e.target.value)} />
          <button className="px-4 py-2 rounded-lg bg-[#007AFF] text-white" onClick={search} disabled={loading}>{loading? 'Loading...' : 'Search'}</button>
        </div>

        {orders.length === 0 ? (
          <div className="text-gray-600">No orders to show.</div>
        ) : (
          <div className="space-y-4">
            {orders.map(order => (
              <div key={order.id} className="border rounded-xl p-4">
                <div className="flex items-center justify-between">
                  <div className="font-semibold">Order #{order.id}</div>
                  <div className="text-sm text-gray-600">{order.status}</div>
                </div>
                <div className="text-sm text-gray-600">{order.customer_name} • {order.phone}</div>
                <div className="text-sm text-gray-600">{order.address}</div>
                <div className="mt-3 divide-y">
                  {order.items.map((it:any)=> (
                    <div key={it.id} className="flex items-center justify-between py-1 text-sm">
                      <div>{it.product?.name || `#${it.product_id}`}</div>
                      <div className="text-gray-500">x{it.qty}</div>
                      <div className="font-medium">${(it.price*it.qty).toFixed(2)}</div>
                    </div>
                  ))}
                </div>
                <div className="mt-3 font-semibold">Total: ${order.total.toFixed(2)}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
