'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Input } from '@/components/ui/Input'
import { formatPrice } from '@/lib/utils'
import {
  Search,
  Plus,
  Edit,
  Trash2,
  Eye,
  MoreHorizontal,
  Filter,
  Download
} from 'lucide-react'
import Image from 'next/image'

interface Product {
  id: number
  name: string
  brand: string
  price: number
  originalPrice?: number
  image: string
  stock: number
  status: 'active' | 'inactive' | 'out-of-stock'
  category: string
  rating: number
  sales: number
  createdAt: Date
}

const ProductTable: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedProducts, setSelectedProducts] = useState<number[]>([])

  const products: Product[] = [
    {
      id: 1,
      name: 'MacBook Pro 16" M3 Max',
      brand: 'Apple',
      price: 12999,
      originalPrice: 14999,
      image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2026&q=80',
      stock: 15,
      status: 'active',
      category: 'لابتوبات الأعمال',
      rating: 4.8,
      sales: 45,
      createdAt: new Date('2024-01-01')
    },
    {
      id: 2,
      name: 'Dell XPS 15 OLED',
      brand: 'Dell',
      price: 8999,
      image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80',
      stock: 8,
      status: 'active',
      category: 'لابتوبات الأعمال',
      rating: 4.6,
      sales: 32,
      createdAt: new Date('2024-01-02')
    },
    {
      id: 3,
      name: 'ASUS ROG Strix G15',
      brand: 'ASUS',
      price: 6999,
      originalPrice: 7999,
      image: 'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2042&q=80',
      stock: 0,
      status: 'out-of-stock',
      category: 'لابتوبات الألعاب',
      rating: 4.7,
      sales: 28,
      createdAt: new Date('2024-01-03')
    },
    {
      id: 4,
      name: 'HP Spectre x360 14',
      brand: 'HP',
      price: 7999,
      image: 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1964&q=80',
      stock: 12,
      status: 'active',
      category: 'لابتوبات الطلاب',
      rating: 4.5,
      sales: 19,
      createdAt: new Date('2024-01-04')
    },
    {
      id: 5,
      name: 'Lenovo ThinkPad X1 Carbon',
      brand: 'Lenovo',
      price: 9999,
      image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80',
      stock: 5,
      status: 'active',
      category: 'لابتوبات الأعمال',
      rating: 4.9,
      sales: 67,
      createdAt: new Date('2024-01-05')
    }
  ]

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getStatusBadge = (status: Product['status']) => {
    const statusConfig = {
      active: { variant: 'success' as const, label: 'نشط' },
      inactive: { variant: 'gray' as const, label: 'غير نشط' },
      'out-of-stock': { variant: 'error' as const, label: 'نفد المخزون' }
    }

    const config = statusConfig[status]
    return <Badge variant={config.variant}>{config.label}</Badge>
  }

  const handleSelectProduct = (productId: number) => {
    setSelectedProducts(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    )
  }

  const handleSelectAll = () => {
    if (selectedProducts.length === filteredProducts.length) {
      setSelectedProducts([])
    } else {
      setSelectedProducts(filteredProducts.map(p => p.id))
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <CardTitle>إدارة المنتجات</CardTitle>
          
          <div className="flex items-center space-x-3 space-x-reverse">
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 ml-2" />
              تصدير
            </Button>
            
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 ml-2" />
              فلتر
            </Button>
            
            <Button size="sm">
              <Plus className="w-4 h-4 ml-2" />
              إضافة منتج
            </Button>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Input
              placeholder="البحث في المنتجات..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              icon={<Search className="w-5 h-5" />}
              iconPosition="right"
            />
          </div>
          
          {selectedProducts.length > 0 && (
            <div className="flex items-center space-x-2 space-x-reverse">
              <span className="text-sm text-gray-600">
                {selectedProducts.length} منتج محدد
              </span>
              <Button variant="outline" size="sm">
                حذف المحدد
              </Button>
            </div>
          )}
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-right py-3 px-4">
                  <input
                    type="checkbox"
                    checked={selectedProducts.length === filteredProducts.length && filteredProducts.length > 0}
                    onChange={handleSelectAll}
                    className="w-4 h-4 text-primary-500 bg-gray-100 border-gray-300 rounded focus:ring-primary-500 focus:ring-2"
                  />
                </th>
                <th className="text-right py-3 px-4 font-semibold text-gray-800">المنتج</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-800">الفئة</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-800">السعر</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-800">المخزون</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-800">الحالة</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-800">المبيعات</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-800">الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <tr key={product.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-4">
                    <input
                      type="checkbox"
                      checked={selectedProducts.includes(product.id)}
                      onChange={() => handleSelectProduct(product.id)}
                      className="w-4 h-4 text-primary-500 bg-gray-100 border-gray-300 rounded focus:ring-primary-500 focus:ring-2"
                    />
                  </td>
                  
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-3 space-x-reverse">
                      <div className="w-12 h-12 flex-shrink-0">
                        <div className="relative w-full h-full rounded-lg overflow-hidden bg-gray-100">
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800">{product.name}</h4>
                        <p className="text-sm text-gray-500">{product.brand}</p>
                        <div className="flex items-center space-x-1 space-x-reverse mt-1">
                          <span className="text-yellow-400">★</span>
                          <span className="text-sm text-gray-600">{product.rating}</span>
                        </div>
                      </div>
                    </div>
                  </td>
                  
                  <td className="py-4 px-4">
                    <span className="text-sm text-gray-600">{product.category}</span>
                  </td>
                  
                  <td className="py-4 px-4">
                    <div>
                      <span className="font-medium text-gray-800">{formatPrice(product.price)}</span>
                      {product.originalPrice && (
                        <div>
                          <span className="text-sm text-gray-500 line-through">
                            {formatPrice(product.originalPrice)}
                          </span>
                        </div>
                      )}
                    </div>
                  </td>
                  
                  <td className="py-4 px-4">
                    <span className={`font-medium ${
                      product.stock === 0 
                        ? 'text-error-600' 
                        : product.stock < 10 
                          ? 'text-warning-600' 
                          : 'text-success-600'
                    }`}>
                      {product.stock}
                    </span>
                  </td>
                  
                  <td className="py-4 px-4">
                    {getStatusBadge(product.status)}
                  </td>
                  
                  <td className="py-4 px-4">
                    <span className="font-medium text-gray-800">{product.sales}</span>
                  </td>
                  
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-1 space-x-reverse">
                      <Button variant="ghost" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-error-500 hover:text-error-600">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">لا توجد منتجات تطابق البحث</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default ProductTable