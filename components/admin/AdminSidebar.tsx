'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  BarChart3,
  Settings,
  FileText,
  Bell,
  LogOut,
  // Menu,
  X
} from 'lucide-react'

interface AdminSidebarProps {
  isOpen: boolean
  onToggle: () => void
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ isOpen, onToggle }) => {
  const pathname = usePathname()

  const menuItems = [
    {
      title: 'لوحة التحكم',
      href: '/admin',
      icon: LayoutDashboard,
      badge: null
    },
    {
      title: 'المنتجات',
      href: '/admin/products',
      icon: Package,
      badge: null
    },
    {
      title: 'الطلبات',
      href: '/admin/orders',
      icon: ShoppingCart,
      badge: '3'
    },
    {
      title: 'العملاء',
      href: '/admin/customers',
      icon: Users,
      badge: null
    },
    {
      title: 'التقارير',
      href: '/admin/reports',
      icon: BarChart3,
      badge: null
    },
    {
      title: 'المحتوى',
      href: '/admin/content',
      icon: FileText,
      badge: null
    },
    {
      title: 'الإشعارات',
      href: '/admin/notifications',
      icon: Bell,
      badge: '5'
    },
    {
      title: 'الإعدادات',
      href: '/admin/settings',
      icon: Settings,
      badge: null
    }
  ]

  const isActive = (href: string) => {
    if (href === '/admin') {
      return pathname === href
    }
    return pathname.startsWith(href)
  }

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <div className={cn(
        'fixed right-0 top-0 h-full w-64 bg-white shadow-strong z-50 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:z-auto',
        isOpen ? 'translate-x-0' : 'translate-x-full'
      )}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3 space-x-reverse">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">HN</span>
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-800">لوحة التحكم</h2>
              <p className="text-xs text-gray-500">H.N Laptop Store</p>
            </div>
          </div>
          
          <button
            onClick={onToggle}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon
              const active = isActive(item.href)
              
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      'flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 group',
                      active
                        ? 'bg-primary-50 text-primary-600 border border-primary-200'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'
                    )}
                    onClick={() => {
                      // Close mobile menu when navigating
                      if (window.innerWidth < 1024) {
                        onToggle()
                      }
                    }}
                  >
                    <div className="flex items-center space-x-3 space-x-reverse">
                      <Icon className={cn(
                        'w-5 h-5 transition-colors duration-200',
                        active ? 'text-primary-600' : 'text-gray-500 group-hover:text-gray-700'
                      )} />
                      <span className="font-medium">{item.title}</span>
                    </div>
                    
                    {item.badge && (
                      <span className="bg-error-500 text-white text-xs px-2 py-1 rounded-full min-w-[20px] text-center">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* User Section */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center space-x-3 space-x-reverse mb-4">
            <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
              <span className="text-primary-600 font-semibold">أ</span>
            </div>
            <div>
              <p className="font-medium text-gray-800">أحمد محمد</p>
              <p className="text-sm text-gray-500">مدير النظام</p>
            </div>
          </div>
          
          <button className="flex items-center space-x-3 space-x-reverse w-full px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-xl transition-colors duration-200">
            <LogOut className="w-5 h-5" />
            <span className="font-medium">تسجيل الخروج</span>
          </button>
        </div>
      </div>
    </>
  )
}

export default AdminSidebar