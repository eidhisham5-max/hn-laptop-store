'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function AdminDashboard() {
  const [stats] = useState({
    totalProducts: 24,
    totalOrders: 156,
    totalRevenue: 45680,
    pendingOrders: 8
  })
  const [isLoading, setIsLoading] = useState(true)
  const [userEmail, setUserEmail] = useState('')
  const router = useRouter()

  // التحقق من تسجيل الدخول
  useEffect(() => {
    const userType = localStorage.getItem('userType')
    const isLoggedIn = localStorage.getItem('isLoggedIn')
    const email = localStorage.getItem('userEmail')
    
    if (!isLoggedIn || userType !== 'admin') {
      router.push('/login')
      return
    }
    
    setUserEmail(email || '')
    setIsLoading(false)
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem('userType')
    localStorage.removeItem('isLoggedIn')
    localStorage.removeItem('userEmail')
    router.push('/login')
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-gray-200 border-t-red-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading Admin Panel...</p>
        </div>
      </div>
    )
  }

  const recentProducts = [
    { id: 1, name: "Dell XPS 13", price: 1200, stock: 5, status: "Active" },
    { id: 2, name: "HP Pavilion 15", price: 800, stock: 0, status: "Out of Stock" },
    { id: 3, name: "Lenovo ThinkPad", price: 1500, stock: 12, status: "Active" }
  ]

  const recentOrders = [
    { id: '#001', customer: "Ahmed Ali", total: 1200, status: "Pending" },
    { id: '#002', customer: "Sara Mohamed", total: 800, status: "Completed" },
    { id: '#003', customer: "Omar Hassan", total: 1500, status: "Processing" }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-blue-50">
      {/* Admin Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-lg border-b border-gray-200/50 mb-8 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Admin Logo */}
            <div className="flex items-center gap-4 group cursor-pointer">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                  🛠️
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 group-hover:text-red-600 transition-colors">
                  H.N Admin Panel
                </h1>
                <p className="text-sm text-gray-600">
                  Store Management Dashboard
                </p>
              </div>
            </div>

            {/* Admin Navigation */}
            <nav className="flex gap-8 items-center">
              <Link href="/admin" className="relative text-red-600 font-semibold group">
                Dashboard
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-red-600"></span>
              </Link>
              <Link href="/admin/products" className="relative text-gray-700 hover:text-red-600 font-medium transition-colors group">
                Products
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-600 group-hover:w-full transition-all duration-300"></span>
              </Link>
              <Link href="/" className="relative text-gray-700 hover:text-red-600 font-medium transition-colors group">
                View Store
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-600 group-hover:w-full transition-all duration-300"></span>
              </Link>
              <button 
                onClick={handleLogout}
                className="bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-2.5 rounded-xl font-medium hover:from-red-600 hover:to-red-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2"
              >
                <span>Logout</span>
                <span className="text-sm">{userEmail ? `(${userEmail})` : ''}</span>
              </button>
            </nav>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4">
        {/* Welcome Section */}
        <div className="mb-12 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-3xl"></div>
          <div className="relative p-8">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-2xl shadow-lg">
                👋
              </div>
              <div>
                <h2 className="text-4xl font-bold text-gray-900 mb-2">
                  Welcome back, Admin!
                </h2>
                <p className="text-gray-600 text-lg">
                  Here's what's happening with your store today
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>Last login: 2 hours ago</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>System status: All good</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <span>8 pending orders need attention</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Products */}
          <div className="group bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium">Total Products</p>
                <p className="text-4xl font-bold text-gray-900 my-2">
                  {stats.totalProducts}
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-green-600 font-semibold bg-green-100 px-2 py-1 rounded-full">
                    +3 this month
                  </span>
                </div>
              </div>
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center text-2xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                💻
              </div>
            </div>
          </div>

          {/* Total Orders */}
          <div className="group bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium">Total Orders</p>
                <p className="text-4xl font-bold text-gray-900 my-2">
                  {stats.totalOrders}
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-green-600 font-semibold bg-green-100 px-2 py-1 rounded-full">
                    +12 this week
                  </span>
                </div>
              </div>
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center text-2xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                🛒
              </div>
            </div>
          </div>

          {/* Total Revenue */}
          <div className="group bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium">Total Revenue</p>
                <p className="text-4xl font-bold text-gray-900 my-2">
                  ${stats.totalRevenue.toLocaleString()}
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-green-600 font-semibold bg-green-100 px-2 py-1 rounded-full">
                    +8.2% from last month
                  </span>
                </div>
              </div>
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center text-2xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                💰
              </div>
            </div>
          </div>

          {/* Pending Orders */}
          <div className="group bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1 border border-red-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium">Pending Orders</p>
                <p className="text-4xl font-bold text-red-600 my-2">
                  {stats.pendingOrders}
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-red-600 font-semibold bg-red-100 px-2 py-1 rounded-full">
                    Needs attention
                  </span>
                </div>
              </div>
              <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center text-2xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                ⏰
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white p-8 rounded-2xl shadow-lg mb-8 border border-gray-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold">
              ⚡
            </div>
            <h3 className="text-2xl font-bold text-gray-900">
              Quick Actions
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { 
                href: "/admin/products/add", 
                title: "Add New Product", 
                icon: "➕", 
                color: "from-blue-500 to-blue-600", 
                hoverColor: "hover:from-blue-600 hover:to-blue-700",
                description: "Create a new product listing"
              },
              { 
                href: "/admin/products", 
                title: "Manage Products", 
                icon: "📦", 
                color: "from-green-500 to-green-600", 
                hoverColor: "hover:from-green-600 hover:to-green-700",
                description: "Edit existing products"
              },
              { 
                href: "#", 
                title: "View Orders", 
                icon: "📋", 
                color: "from-orange-500 to-orange-600", 
                hoverColor: "hover:from-orange-600 hover:to-orange-700",
                description: "Track order status"
              },
              { 
                href: "#", 
                title: "Analytics", 
                icon: "📊", 
                color: "from-purple-500 to-purple-600", 
                hoverColor: "hover:from-purple-600 hover:to-purple-700",
                description: "View performance metrics"
              }
            ].map((action, index) => (
              <Link 
                key={index}
                href={action.href}
                className={`group bg-gradient-to-br ${action.color} ${action.hoverColor} text-white p-6 rounded-2xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex flex-col items-center text-center gap-3`}
              >
                <div className="text-3xl group-hover:scale-110 transition-transform duration-300">
                  {action.icon}
                </div>
                <div>
                  <h4 className="text-lg font-bold">{action.title}</h4>
                  <p className="text-sm text-white/80 mt-1">{action.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Products */}
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
                📦
              </div>
              <h3 className="text-2xl font-bold text-gray-900">
                Recent Products
              </h3>
            </div>
            <div className="space-y-4">
              {recentProducts.map(product => (
                <div key={product.id} className="group flex items-center gap-4 p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl hover:from-blue-50 hover:to-indigo-50 transition-all duration-300 cursor-pointer">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg group-hover:scale-110 transition-transform duration-300">
                    {product.name.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">{product.name}</p>
                    <p className="text-sm text-gray-600">${product.price} • Stock: {product.stock}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    product.status === 'Active' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {product.status}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-4 border-t border-gray-200">
              <Link href="/admin/products" className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center gap-2 group">
                <span>View all products</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </div>
          </div>

          {/* Recent Orders */}
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center text-white font-bold">
                🛒
              </div>
              <h3 className="text-2xl font-bold text-gray-900">
                Recent Orders
              </h3>
            </div>
            <div className="space-y-4">
              {recentOrders.map(order => (
                <div key={order.id} className="group flex items-center gap-4 p-4 bg-gradient-to-r from-gray-50 to-green-50 rounded-xl hover:from-green-50 hover:to-emerald-50 transition-all duration-300 cursor-pointer">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg group-hover:scale-110 transition-transform duration-300">
                    {order.id.slice(1)}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900 group-hover:text-green-600 transition-colors">{order.id}</p>
                    <p className="text-sm text-gray-600">{order.customer} • ${order.total}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    order.status === 'Completed' 
                      ? 'bg-green-100 text-green-800' 
                      : order.status === 'Processing' 
                      ? 'bg-yellow-100 text-yellow-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {order.status}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-4 border-t border-gray-200">
              <button className="text-green-600 hover:text-green-700 font-medium text-sm flex items-center gap-2 group">
                <span>View all orders</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

