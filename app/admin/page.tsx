'use client'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '../components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card'
import { Badge } from '../components/ui/Badge'
import { Progress } from '../components/ui/Progress'
import { supabase } from '../../supabaseClient'

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
    pendingOrders: 0,
    completedOrders: 0,
    lowStockProducts: 0
  })
  const [isLoading, setIsLoading] = useState(true)
  const [userEmail, setUserEmail] = useState('')
  const [recentOrders, setRecentOrders] = useState([])
  const [recentProducts, setRecentProducts] = useState([])
  const router = useRouter()

  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await supabase.auth.getSession()
      const email = data.session?.user?.email
      const allowed = email && (!process.env.NEXT_PUBLIC_ADMIN_EMAIL || email.toLowerCase() === process.env.NEXT_PUBLIC_ADMIN_EMAIL.toLowerCase())
      
      if (!allowed) { 
        router.push('/login')
        return 
      }
      
      setUserEmail(email || '')
      await loadDashboardData()
      setIsLoading(false)
    }

    checkAuth()
  }, [router])

  const loadDashboardData = async () => {
    try {
      // In a real app, these would be API calls
      // For now, we'll use mock data
      setStats({
        totalProducts: 24,
        totalOrders: 156,
        totalRevenue: 45680,
        pendingOrders: 8,
        completedOrders: 142,
        lowStockProducts: 3
      })

      setRecentOrders([
        {
          id: 'HN-2024-001234',
          customer: 'Ahmed Mohamed',
          amount: 1200,
          status: 'pending',
          date: '2024-12-15',
          items: 1
        },
        {
          id: 'HN-2024-001235',
          customer: 'Sara Ali',
          amount: 800,
          status: 'completed',
          date: '2024-12-14',
          items: 1
        },
        {
          id: 'HN-2024-001236',
          customer: 'Mohamed Hassan',
          amount: 1500,
          status: 'shipped',
          date: '2024-12-13',
          items: 2
        }
      ])

      setRecentProducts([
        {
          id: 1,
          name: 'Dell XPS 13',
          price: 1200,
          stock: 5,
          status: 'active',
          sales: 12
        },
        {
          id: 2,
          name: 'HP Pavilion 15',
          price: 800,
          stock: 0,
          status: 'out_of_stock',
          sales: 8
        },
        {
          id: 3,
          name: 'Lenovo ThinkPad X1',
          price: 1500,
          stock: 12,
          status: 'active',
          sales: 15
        }
      ])
    } catch (error) {
      console.error('Failed to load dashboard data', error)
    }
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-gray-200 border-t-primary-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading Admin Panel...</p>
        </div>
      </div>
    )
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'warning'
      case 'completed': return 'success'
      case 'shipped': return 'info'
      case 'cancelled': return 'destructive'
      default: return 'default'
    }
  }

  const getProductStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'success'
      case 'out_of_stock': return 'destructive'
      case 'inactive': return 'default'
      default: return 'default'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-600">Welcome back, {userEmail}</p>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" onClick={handleLogout}>
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Products</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalProducts}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Orders</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalOrders}</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                  <p className="text-2xl font-bold text-gray-900">${stats.totalRevenue.toLocaleString()}</p>
                </div>
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Pending Orders</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.pendingOrders}</p>
                </div>
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="mb-6 sm:mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                <Link href="/admin/products">
                  <Button variant="outline" fullWidth className="h-20 flex flex-col space-y-2">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                    <span>Manage Products</span>
                  </Button>
                </Link>
                
                <Link href="/admin/orders">
                  <Button variant="outline" fullWidth className="h-20 flex flex-col space-y-2">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span>View Orders</span>
                  </Button>
                </Link>
                
                <Link href="/admin/analytics">
                  <Button variant="outline" fullWidth className="h-20 flex flex-col space-y-2">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                    <span>Analytics</span>
                  </Button>
                </Link>
                
                <Button 
                  variant="outline" 
                  fullWidth 
                  className="h-20 flex flex-col space-y-2"
                  onClick={() => window.open('https://wa.me/201000000000', '_blank')}
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                  </svg>
                  <span>WhatsApp Support</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Recent Orders */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentOrders.map((order: any) => (
                  <div key={order.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="font-medium text-gray-900">#{order.id}</span>
                        <Badge variant={getStatusColor(order.status)}>
                          {order.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">{order.customer}</p>
                      <p className="text-sm text-gray-500">{order.items} item(s) • {order.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">${order.amount.toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <Link href="/admin/orders">
                  <Button variant="outline" fullWidth>
                    View All Orders
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Recent Products */}
          <Card>
            <CardHeader>
              <CardTitle>Product Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentProducts.map((product: any) => (
                  <div key={product.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="font-medium text-gray-900">{product.name}</span>
                        <Badge variant={getProductStatusColor(product.status)}>
                          {product.status.replace('_', ' ')}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">Stock: {product.stock} units</p>
                      <p className="text-sm text-gray-500">Sales: {product.sales} units</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">${product.price.toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <Link href="/admin/products">
                  <Button variant="outline" fullWidth>
                    Manage Products
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Performance Metrics */}
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Performance Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-600">Order Completion Rate</span>
                    <span className="text-sm font-medium text-gray-900">91%</span>
                  </div>
                  <Progress value={91} variant="success" />
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-600">Stock Availability</span>
                    <span className="text-sm font-medium text-gray-900">87%</span>
                  </div>
                  <Progress value={87} variant="info" />
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-600">Customer Satisfaction</span>
                    <span className="text-sm font-medium text-gray-900">96%</span>
                  </div>
                  <Progress value={96} variant="success" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}