'use client'
import React, { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Button } from '../../../components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/Card'
import { useLanguage } from '../../../contexts/LanguageContext'

export default function AdminProductDetailPage() {
  const { t, isRTL } = useLanguage()
  const params = useParams()
  const router = useRouter()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadProduct()
  }, [params.id])

  const loadProduct = async () => {
    setLoading(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    const mockProduct = {
      id: params.id,
      name: 'Dell XPS 13',
      brand: 'Dell',
      category: 'Ultrabook',
      price: 1200,
      originalPrice: 1400,
      stock: 8,
      condition: 'New',
      specs: 'Intel i7, 16GB RAM, 512GB SSD',
      description: 'Ultrabook premium with excellent battery life.',
      images: [
        'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&h=600&fit=crop&auto=format',
        'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=600&fit=crop&auto=format'
      ],
      rating: 4.8,
      reviews: 124,
      discount: 14,
      status: 'Active',
      createdAt: '2024-01-15'
    }

    setProduct(mockProduct)
    setLoading(false)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center" dir={isRTL ? 'rtl' : 'ltr'}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Button 
            variant="outline" 
            onClick={() => router.back()}
            className="mb-4"
          >
            {isRTL ? '← العودة' : '← Back'}
          </Button>
          <h1 className="text-3xl font-bold text-gray-900">
            {isRTL ? 'تفاصيل المنتج' : 'Product Details'}
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>{product.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="font-semibold text-gray-700">Brand:</label>
                  <p className="text-gray-600">{product.brand}</p>
                </div>
                <div>
                  <label className="font-semibold text-gray-700">Category:</label>
                  <p className="text-gray-600">{product.category}</p>
                </div>
                <div>
                  <label className="font-semibold text-gray-700">Price:</label>
                  <p className="text-gray-600">${product.price}</p>
                </div>
                <div>
                  <label className="font-semibold text-gray-700">Stock:</label>
                  <p className="text-gray-600">{product.stock}</p>
                </div>
                <div>
                  <label className="font-semibold text-gray-700">Status:</label>
                  <p className="text-gray-600">{product.status}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{isRTL ? 'الإجراءات' : 'Actions'}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Button className="w-full">
                  {isRTL ? 'تعديل المنتج' : 'Edit Product'}
                </Button>
                <Button variant="outline" className="w-full">
                  {isRTL ? 'تحديث المخزون' : 'Update Stock'}
                </Button>
                <Button variant="destructive" className="w-full">
                  {isRTL ? 'حذف المنتج' : 'Delete Product'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}