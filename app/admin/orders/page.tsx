'use client'
import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { fetchOrders, updateOrderStatus } from '../../data/db'

export default function AdminOrdersPage() {
  const router = useRouter()
  const [orders, setOrders] = React.useState<any[]>([])
  const [loading, setLoading] = React.useState(true)
  const [filter, setFilter] = React.useState('all')
  const [searchTerm, setSearchTerm] = React.useState('')

  React.useEffect(() => {
    // Check authentication
    const isAdmin = localStorage.getItem('isAdmin') === 'true'
    const userType = localStorage.getItem('userType')
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'
    const userEmail = localStorage.getItem('userEmail')

    if (!((isAdmin || userType === 'admin') && isLoggedIn && userEmail)) {
      router.push('/login')
      return
    }

    loadOrders()
  }, [router])

  const loadOrders = async () => {
    try {
      setLoading(true)
      const data = await fetchOrders()
      setOrders(data)
    } catch (error) {
      console.error('Error loading orders:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleStatusChange = async (orderId: number, newStatus: 'Pending' | 'Processing' | 'Completed') => {
    try {
      await updateOrderStatus(orderId, newStatus)
      setOrders(orders.map(order => 
        order.id === orderId ? {...order, status: newStatus} : order
      ))
    } catch (error) {
      console.error('Error updating order status:', error)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('isAdmin')
    localStorage.removeItem('userType')
    localStorage.removeItem('isLoggedIn')
    localStorage.removeItem('userEmail')
    router.push('/')
  }

  const filteredOrders = orders.filter(order => {
    const matchesFilter = filter === 'all' || order.status === filter
    const matchesSearch = searchTerm === '' || 
      order.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.phone.includes(searchTerm) ||
      order.id.toString().includes(searchTerm)
    return matchesFilter && matchesSearch
  })

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading orders...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center text-white font-bold text-lg">
                A
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Orders Management</h1>
                <p className="text-sm text-gray-600">Track and manage customer orders</p>
              </div>
            </div>
            
            <nav className="flex gap-8 items-center">
              <Link href="/admin" className="text-gray-700 hover:text-red-600 font-medium transition-colors">Dashboard</Link>
              <Link href="/admin/products" className="text-gray-700 hover:text-red-600 font-medium transition-colors">Products</Link>
              <Link href="/admin/orders" className="text-red-600 font-semibold border-b-2 border-red-600 pb-1">Orders</Link>
              <Link href="/admin/analytics" className="text-gray-700 hover:text-red-600 font-medium transition-colors">Analytics</Link>
              <Link href="/" className="text-gray-700 hover:text-red-600 font-medium transition-colors">View Store</Link>
              <button onClick={handleLogout} className="bg-red-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-700 transition-colors">
                Logout
              </button>
            </nav>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Filters and Search */}
        <div className="mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex gap-2">
            {['all', 'Pending', 'Processing', 'Completed'].map(status => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filter === status 
                    ? 'bg-red-600 text-white' 
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                {status === 'all' ? 'All Orders' : status}
              </button>
            ))}
          </div>
          
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Search orders..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
            />
            <button
              onClick={loadOrders}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Refresh
            </button>
          </div>
        </div>

        {/* Order Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Orders</p>
                <p className="text-2xl font-bold text-gray-900">{orders.length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">📋</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-yellow-600">{orders.filter(o => o.status === 'Pending').length}</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">⏳</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Processing</p>
                <p className="text-2xl font-bold text-blue-600">{orders.filter(o => o.status === 'Processing').length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">🔄</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-green-600">{orders.filter(o => o.status === 'Completed').length}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">✅</span>
              </div>
            </div>
          </div>
        </div>

        {/* Orders List */}
        {filteredOrders.length === 0 ? (
          <div className="bg-white p-8 rounded-xl text-gray-600 text-center">
            <div className="text-6xl mb-4">📦</div>
            <h3 className="text-xl font-semibold mb-2">No Orders Found</h3>
            <p>No orders match your current filters.</p>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
              <h3 className="text-xl font-bold text-gray-900">Orders ({filteredOrders.length})</h3>
            </div>
            <div className="divide-y">
              {filteredOrders.map(order => (
                <div key={order.id} className="px-6 py-6 hover:bg-gray-50 transition-colors">
                  <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-lg">
                        #{order.id}
                      </div>
                      <div>
                        <div className="font-semibold text-lg text-gray-900">{order.customer_name}</div>
                        <div className="text-sm text-gray-600">{order.phone}</div>
                        <div className="text-sm text-gray-500">{new Date(order.created_at).toLocaleDateString()}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="font-bold text-xl text-gray-900">${order.total.toFixed(2)}</div>
                        <div className="text-sm text-gray-600">{order.items.length} item(s)</div>
                      </div>
                      <select 
                        value={order.status} 
                        onChange={e=>handleStatusChange(order.id, e.target.value as any)} 
                        className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Processing">Processing</option>
                        <option value="Completed">Completed</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="text-sm font-semibold text-gray-700 mb-2">Delivery Address:</div>
                    <div className="text-sm text-gray-600 mb-4">{order.address}</div>
                    
                    <div className="text-sm font-semibold text-gray-700 mb-2">Order Items:</div>
                    <div className="space-y-2">
                      {order.items.map((it: any) => (
                        <div key={it.id} className="flex items-center justify-between text-sm bg-white rounded-lg p-3">
                          <div className="font-medium text-gray-900">{it.product?.name || `Product #${it.product_id}`}</div>
                          <div className="flex items-center gap-4 text-gray-600">
                            <span>Qty: {it.qty}</span>
                            <span>Price: ${it.price.toFixed(2)}</span>
                            <span className="font-semibold text-gray-900">Total: ${(it.price * it.qty).toFixed(2)}</span>
                          </div>
                        </div>
                      ))}
                    </div>
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