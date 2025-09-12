'use client'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { supabase } from '../../../supabaseClient'
import { fetchOrders, fetchProducts } from '../../data/db'

interface AnalyticsData {
  totalRevenue: number
  monthlyRevenue: number
  dailyRevenue: number
  totalOrders: number
  averageOrderValue: number
  topProducts: Array<{name: string, sales: number, revenue: number}>
  ordersByStatus: {[key: string]: number}
  revenueByMonth: Array<{month: string, revenue: number}>
  conversionRate: number
}

export default function AdminAnalytics() {
  const router = useRouter()
  const [analytics, setAnalytics] = useState<AnalyticsData>({
    totalRevenue: 0,
    monthlyRevenue: 0,
    dailyRevenue: 0,
    totalOrders: 0,
    averageOrderValue: 0,
    topProducts: [],
    ordersByStatus: {},
    revenueByMonth: [],
    conversionRate: 0
  })
  const [loading, setLoading] = useState(true)
  const [timeRange, setTimeRange] = useState('30d')

  useEffect(() => {
    (async () => {
      const { data } = await supabase.auth.getSession()
      const email = data.session?.user?.email
      const allowed = email && (!process.env.NEXT_PUBLIC_ADMIN_EMAIL || email.toLowerCase() === process.env.NEXT_PUBLIC_ADMIN_EMAIL.toLowerCase())
      if (!allowed) { router.push('/login'); return }
      loadAnalytics()
    })()
  }, [router, timeRange])

  const loadAnalytics = async () => {
    try {
      setLoading(true)
      
      const [ordersData] = await Promise.all([
        fetchOrders(),
        fetchProducts()
      ])

      // Calculate analytics
      const totalRevenue = ordersData.reduce((sum: number, order: any) => sum + order.total, 0)
      const totalOrders = ordersData.length
      const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0

      // Monthly revenue
      const currentMonth = new Date().getMonth()
      const monthlyRevenue = ordersData
        .filter((order: any) => new Date(order.created_at).getMonth() === currentMonth)
        .reduce((sum: number, order: any) => sum + order.total, 0)

      // Daily revenue (last 7 days)
      const sevenDaysAgo = new Date()
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)
      const dailyRevenue = ordersData
        .filter((order: any) => new Date(order.created_at) >= sevenDaysAgo)
        .reduce((sum: number, order: any) => sum + order.total, 0)

      // Top products
      const productSales: { [key: string]: {sales: number, revenue: number} } = {}
      ordersData.forEach((order: any) => {
        order.items.forEach((item: any) => {
          const productName = item.product?.name || `Product #${item.product_id}`
          if (!productSales[productName]) {
            productSales[productName] = {sales: 0, revenue: 0}
          }
          productSales[productName].sales += item.qty
          productSales[productName].revenue += item.price * item.qty
        })
      })

      const topProducts = Object.entries(productSales)
        .map(([name, data]) => ({name, ...data}))
        .sort((a, b) => b.revenue - a.revenue)
        .slice(0, 5)

      // Orders by status
      const ordersByStatus = ordersData.reduce((acc: any, order: any) => {
        acc[order.status] = (acc[order.status] || 0) + 1
        return acc
      }, {})

      // Revenue by month (last 6 months)
      const revenueByMonth = []
      for (let i = 5; i >= 0; i--) {
        const date = new Date()
        date.setMonth(date.getMonth() - i)
        const monthName = date.toLocaleDateString('en-US', { month: 'short' })
        const monthRevenue = ordersData
          .filter((order: any) => {
            const orderDate = new Date(order.created_at)
            return orderDate.getMonth() === date.getMonth() && 
                   orderDate.getFullYear() === date.getFullYear()
          })
          .reduce((sum: number, order: any) => sum + order.total, 0)
        
        revenueByMonth.push({month: monthName, revenue: monthRevenue})
      }

      // Conversion rate (simplified - assuming 10% of visitors convert)
      const conversionRate = 10.5

      setAnalytics({
        totalRevenue,
        monthlyRevenue,
        dailyRevenue,
        totalOrders,
        averageOrderValue,
        topProducts,
        ordersByStatus,
        revenueByMonth,
        conversionRate
      })
      
    } catch (error) {
      console.error('Error loading analytics:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading analytics...</p>
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
                <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
                <p className="text-sm text-gray-600">Detailed performance insights</p>
              </div>
            </div>
            
            <nav className="flex gap-8 items-center">
              <Link href="/admin" className="text-gray-700 hover:text-red-600 font-medium transition-colors">Dashboard</Link>
              <Link href="/admin/products" className="text-gray-700 hover:text-red-600 font-medium transition-colors">Products</Link>
              <Link href="/admin/orders" className="text-gray-700 hover:text-red-600 font-medium transition-colors">Orders</Link>
              <Link href="/admin/analytics" className="text-red-600 font-semibold border-b-2 border-red-600 pb-1">Analytics</Link>
              <Link href="/" className="text-gray-700 hover:text-red-600 font-medium transition-colors">View Store</Link>
              <button onClick={handleLogout} className="bg-red-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-700 transition-colors">
                Logout
              </button>
            </nav>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Time Range Selector */}
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-3xl font-bold text-gray-900">Performance Analytics</h2>
          <div className="flex gap-2">
            {['7d', '30d', '90d', '1y'].map(range => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  timeRange === range 
                    ? 'bg-red-600 text-white' 
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                {range}
              </button>
            ))}
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Revenue</p>
                <p className="text-3xl font-bold text-gray-900">${analytics.totalRevenue.toFixed(2)}</p>
                <p className="text-sm text-green-600">+15% from last period</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">💰</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Monthly Revenue</p>
                <p className="text-3xl font-bold text-gray-900">${analytics.monthlyRevenue.toFixed(2)}</p>
                <p className="text-sm text-blue-600">This month</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">📈</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Average Order Value</p>
                <p className="text-3xl font-bold text-gray-900">${analytics.averageOrderValue.toFixed(2)}</p>
                <p className="text-sm text-purple-600">Per order</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">📊</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Conversion Rate</p>
                <p className="text-3xl font-bold text-gray-900">{analytics.conversionRate}%</p>
                <p className="text-sm text-orange-600">Visitor to customer</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">🎯</span>
              </div>
            </div>
          </div>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Revenue Trend */}
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Revenue Trend (Last 6 Months)</h3>
            <div className="h-64 flex items-end justify-between gap-2">
              {analytics.revenueByMonth.map((item, index) => (
                <div key={index} className="flex flex-col items-center gap-2">
                  <div 
                    className="bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-lg w-8 transition-all hover:from-blue-600 hover:to-blue-500"
                    style={{height: `${(item.revenue / Math.max(...analytics.revenueByMonth.map(r => r.revenue))) * 200}px`}}
                  ></div>
                  <div className="text-xs text-gray-600">{item.month}</div>
                  <div className="text-xs font-semibold text-gray-900">${item.revenue.toFixed(0)}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Orders by Status */}
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Orders by Status</h3>
            <div className="space-y-4">
              {Object.entries(analytics.ordersByStatus).map(([status, count]) => (
                <div key={status} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-4 h-4 rounded-full ${
                      status === 'Pending' ? 'bg-yellow-400' :
                      status === 'Processing' ? 'bg-blue-400' :
                      status === 'Completed' ? 'bg-green-400' :
                      'bg-gray-400'
                    }`}></div>
                    <span className="font-medium text-gray-900">{status}</span>
                  </div>
                  <span className="font-bold text-gray-900">{count as number}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white rounded-xl shadow-sm border">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-xl font-bold text-gray-900">Top Selling Products</h3>
          </div>
          
          <div className="divide-y">
            {analytics.topProducts.map((product, index) => (
              <div key={index} className="px-6 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                      {index + 1}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">{product.name}</div>
                      <div className="text-sm text-gray-600">{product.sales} units sold</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-gray-900">${product.revenue.toFixed(2)}</div>
                    <div className="text-sm text-gray-600">Revenue</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Export Data */}
        <div className="mt-8 flex justify-end">
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
            Export Data
          </button>
        </div>
      </div>
    </div>
  )
}
