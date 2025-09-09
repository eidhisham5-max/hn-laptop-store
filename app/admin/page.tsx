'use client'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { fetchOrders, fetchProducts, fetchBrands } from '../data/db'

interface DashboardStats {
  totalOrders: number
  totalRevenue: number
  totalProducts: number
  totalBrands: number
  pendingOrders: number
  completedOrders: number
  monthlyRevenue: number
  topSellingProduct: string
}

export default function AdminDashboard() {
  const router = useRouter()
  const [stats, setStats] = useState<DashboardStats>({
    totalOrders: 0,
    totalRevenue: 0,
    totalProducts: 0,
    totalBrands: 0,
    pendingOrders: 0,
    completedOrders: 0,
    monthlyRevenue: 0,
    topSellingProduct: 'N/A'
  })
  const [recentOrders, setRecentOrders] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check authentication
    const isAdmin = localStorage.getItem('isAdmin') === 'true'
    const userType = localStorage.getItem('userType')
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'
    const userEmail = localStorage.getItem('userEmail')

    if (!((isAdmin || userType === 'admin') && isLoggedIn && userEmail)) {
      router.push('/login')
      return
    }

    loadDashboardData()
  }, [router])

  const loadDashboardData = async () => {
    try {
      setLoading(true)
      
      // Load orders, products, and brands
      const [ordersData, productsData, brandsData] = await Promise.all([
        fetchOrders(),
        fetchProducts(),
        fetchBrands()
      ])

      // Calculate statistics
      const totalRevenue = ordersData.reduce((sum: number, order: any) => sum + order.total, 0)
      const monthlyRevenue = ordersData
        .filter((order: any) => {
          const orderDate = new Date(order.created_at)
          const currentDate = new Date()
          return orderDate.getMonth() === currentDate.getMonth() && 
                 orderDate.getFullYear() === currentDate.getFullYear()
        })
        .reduce((sum: number, order: any) => sum + order.total, 0)

      const pendingOrders = ordersData.filter((order: any) => order.status === 'Pending').length
      const completedOrders = ordersData.filter((order: any) => order.status === 'Completed').length

      // Get top selling product
      const productSales: { [key: string]: number } = {}
      ordersData.forEach((order: any) => {
        order.items.forEach((item: any) => {
          const productName = item.product?.name || `Product #${item.product_id}`
          productSales[productName] = (productSales[productName] || 0) + item.qty
        })
      })
      
      const topSellingProduct = Object.keys(productSales).reduce((a, b) => 
        productSales[a] > productSales[b] ? a : b, 'N/A'
      )

      setStats({
        totalOrders: ordersData.length,
        totalRevenue,
        totalProducts: productsData.length,
        totalBrands: brandsData.length,
        pendingOrders,
        completedOrders,
        monthlyRevenue,
        topSellingProduct
      })

      // Get recent orders (last 5)
      setRecentOrders(ordersData.slice(0, 5))
      
    } catch (error) {
      console.error('Error loading dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('isAdmin')
    localStorage.removeItem('userType')
    localStorage.removeItem('isLoggedIn')
    localStorage.removeItem('userEmail')
    router.push('/')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
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
                <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
                <p className="text-sm text-gray-600">H.N Laptop Store Management</p>
              </div>
            </div>
            
            <nav className="flex gap-8 items-center">
              <Link href="/admin" className="text-red-600 font-semibold border-b-2 border-red-600 pb-1">Dashboard</Link>
              <Link href="/admin/products" className="text-gray-700 hover:text-red-600 font-medium transition-colors">Products</Link>
              <Link href="/admin/orders" className="text-gray-700 hover:text-red-600 font-medium transition-colors">Orders</Link>
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
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, Admin!</h2>
          <p className="text-gray-600">Here's what's happening with your store today.</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Orders</p>
                <p className="text-3xl font-bold text-gray-900">{stats.totalOrders}</p>
                <p className="text-sm text-green-600">+12% from last month</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">📋</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Revenue</p>
                <p className="text-3xl font-bold text-gray-900">${stats.totalRevenue.toFixed(2)}</p>
                <p className="text-sm text-green-600">+8% from last month</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">💰</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Products</p>
                <p className="text-3xl font-bold text-gray-900">{stats.totalProducts}</p>
                <p className="text-sm text-blue-600">{stats.totalBrands} brands</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">📦</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending Orders</p>
                <p className="text-3xl font-bold text-yellow-600">{stats.pendingOrders}</p>
                <p className="text-sm text-gray-600">{stats.completedOrders} completed</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">⏳</span>
              </div>
            </div>
          </div>
        </div>

        {/* Charts and Analytics Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Revenue Chart */}
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Monthly Revenue</h3>
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
              <div className="text-center">
                <div className="text-4xl font-bold text-green-600 mb-2">${stats.monthlyRevenue.toFixed(2)}</div>
                <p className="text-gray-600">This month's revenue</p>
                <div className="mt-4 w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{width: '75%'}}></div>
                </div>
                <p className="text-sm text-gray-500 mt-2">75% of monthly target</p>
              </div>
            </div>
          </div>

          {/* Top Products */}
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Top Selling Product</h3>
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
              <div className="text-center">
                <div className="text-2xl mb-4">🏆</div>
                <div className="text-xl font-semibold text-gray-900 mb-2">{stats.topSellingProduct}</div>
                <p className="text-gray-600">Best performing product</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-xl shadow-sm border">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-900">Recent Orders</h3>
              <Link href="/admin/orders" className="text-blue-600 hover:text-blue-700 font-medium">
                View All Orders →
              </Link>
            </div>
          </div>
          
          {recentOrders.length === 0 ? (
            <div className="p-8 text-center text-gray-600">
              <div className="text-6xl mb-4">📦</div>
              <h3 className="text-xl font-semibold mb-2">No Orders Yet</h3>
              <p>Orders will appear here when customers make purchases.</p>
            </div>
          ) : (
            <div className="divide-y">
              {recentOrders.map(order => (
                <div key={order.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
                        #{order.id}
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">{order.customer_name}</div>
                        <div className="text-sm text-gray-600">{order.phone} • {order.items.length} items</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="font-bold text-gray-900">${order.total.toFixed(2)}</div>
                        <div className="text-sm text-gray-600">{new Date(order.created_at).toLocaleDateString()}</div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                        order.status === 'Processing' ? 'bg-blue-100 text-blue-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {order.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link href="/admin/products/add" className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">➕</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Add New Product</h3>
                <p className="text-sm text-gray-600">Add a new laptop to your store</p>
              </div>
            </div>
          </Link>
          
          <Link href="/admin/orders" className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">📋</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Manage Orders</h3>
                <p className="text-sm text-gray-600">View and update order status</p>
              </div>
            </div>
          </Link>
          
          <Link href="/admin/analytics" className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">📊</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">View Analytics</h3>
                <p className="text-sm text-gray-600">Detailed sales and performance data</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}