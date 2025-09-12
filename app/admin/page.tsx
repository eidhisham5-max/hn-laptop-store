'use client'

import React, { useState } from 'react'
import AdminSidebar from '@/components/admin/AdminSidebar'
import StatsCards from '@/components/admin/StatsCards'
import RecentOrders from '@/components/admin/RecentOrders'
import ProductTable from '@/components/admin/ProductTable'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
// import { Button } from '@/components/ui/Button'
import { Menu, Bell, Search } from 'lucide-react'

const AdminDashboard: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <div className="lg:hidden bg-white shadow-soft sticky top-0 z-40">
        <div className="flex items-center justify-between p-4">
          <button
            onClick={toggleSidebar}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
          >
            <Menu className="w-6 h-6 text-gray-600" />
          </button>
          
          <div className="flex items-center space-x-2 space-x-reverse">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">HN</span>
            </div>
            <span className="font-bold text-gray-800">لوحة التحكم</span>
          </div>
          
          <div className="flex items-center space-x-2 space-x-reverse">
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200">
              <Search className="w-5 h-5 text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200 relative">
              <Bell className="w-5 h-5 text-gray-600" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-error-500 rounded-full"></span>
            </button>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <AdminSidebar isOpen={sidebarOpen} onToggle={toggleSidebar} />

        {/* Main Content */}
        <div className="flex-1 lg:mr-64">
          <div className="p-6">
            {/* Desktop Header */}
            <div className="hidden lg:flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold text-gray-800">لوحة التحكم</h1>
                <p className="text-gray-600 mt-1">مرحباً بك في لوحة تحكم H.N Laptop Store</p>
              </div>
              
              <div className="flex items-center space-x-4 space-x-reverse">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="البحث..."
                    className="w-64 px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                  <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                </div>
                
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200 relative">
                  <Bell className="w-5 h-5 text-gray-600" />
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-error-500 rounded-full"></span>
                </button>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="mb-8">
              <StatsCards />
            </div>

            {/* Charts and Analytics */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Sales Chart */}
              <Card>
                <CardHeader>
                  <CardTitle>مبيعات الشهر</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                      </div>
                      <p className="text-gray-500">رسم بياني للمبيعات</p>
                      <p className="text-sm text-gray-400">سيتم إضافة الرسوم البيانية قريباً</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Top Products */}
              <Card>
                <CardHeader>
                  <CardTitle>أفضل المنتجات مبيعاً</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { name: 'MacBook Pro 16" M3 Max', sales: 45, revenue: '584,955 ريال' },
                      { name: 'Dell XPS 15 OLED', sales: 32, revenue: '287,968 ريال' },
                      { name: 'ASUS ROG Strix G15', sales: 28, revenue: '195,972 ريال' },
                      { name: 'Lenovo ThinkPad X1', sales: 19, revenue: '189,981 ريال' },
                      { name: 'HP Spectre x360 14', sales: 15, revenue: '119,985 ريال' }
                    ].map((product, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3 space-x-reverse">
                          <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                            <span className="text-primary-600 font-bold text-sm">{index + 1}</span>
                          </div>
                          <div>
                            <p className="font-medium text-gray-800">{product.name}</p>
                            <p className="text-sm text-gray-500">{product.sales} مبيعات</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-gray-800">{product.revenue}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Orders */}
            <div className="mb-8">
              <RecentOrders />
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card className="hover:shadow-medium transition-all duration-200 cursor-pointer">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2">إضافة منتج جديد</h3>
                  <p className="text-sm text-gray-500">أضف منتج جديد إلى المتجر</p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-medium transition-all duration-200 cursor-pointer">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-success-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6 text-success-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2">إنشاء تقرير</h3>
                  <p className="text-sm text-gray-500">إنشاء تقرير مبيعات مفصل</p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-medium transition-all duration-200 cursor-pointer">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-warning-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6 text-warning-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM4 19h6v-2H4v2zM4 7h6V5H4v2zm0 6h6v-2H4v2z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2">إدارة المخزون</h3>
                  <p className="text-sm text-gray-500">تحديث مستويات المخزون</p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-medium transition-all duration-200 cursor-pointer">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-error-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6 text-error-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2">إعدادات المتجر</h3>
                  <p className="text-sm text-gray-500">تخصيص إعدادات المتجر</p>
                </CardContent>
              </Card>
            </div>

            {/* Product Management */}
            <div>
              <ProductTable />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard