'use client'

import React, { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { StarRating } from '@/components/ui/StarRating'
import { Badge } from '@/components/ui/Badge'
import { ArrowLeft } from 'lucide-react'
import { Product as ProductType } from '../../data/products'

type Product = ProductType

const ProductDetailPage: React.FC = () => {
  const params = useParams()
  const [product, setProduct] = useState<Product | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([])
  const [quantity, setQuantity] = useState(1)
  const [addingToCart, setAddingToCart] = useState(false)

  const handleAddToCart = async () => {
    setAddingToCart(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    setAddingToCart(false)
    // Show success message
    alert('تم إضافة المنتج إلى العربة!')
  }

  const handleBuyNow = async () => {
    // Redirect to checkout
    window.location.href = '/checkout'
  }

  // Mock data - في التطبيق الحقيقي سيتم جلبها من API
  const mockProduct: Product = {
    id: 1,
    name: 'MacBook Pro 16" M3 Max',
    brand: 'Apple',
    price: 12999,
    originalPrice: 14999,
    stock: 15,
    condition: 'New',
    specs: 'Apple M3 Max, 32GB RAM, 1TB SSD',
    description: 'MacBook Pro 16 بمعالج M3 Max الجديد - أداء استثنائي للمحترفين والمبدعين',
    images: [
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2026&q=80',
      'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80',
      'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1964&q=80',
      'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2042&q=80'
    ],
    rating: 4.8,
    reviews: 124,
    discount: 13
  }

  const mockRelatedProducts: Product[] = [
    {
      id: 2,
      name: 'Dell XPS 15 OLED',
      brand: 'Dell',
      price: 8999,
      stock: 8,
      condition: 'New',
      specs: 'Intel Core i7, 16GB RAM, 512GB SSD',
      description: 'Dell XPS 15 مع شاشة OLED مذهلة',
      images: ['https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80'],
      rating: 4.6,
      reviews: 89,
      discount: 10
    },
    {
      id: 3,
      name: 'ASUS ROG Strix G15',
      brand: 'ASUS',
      price: 6999,
      originalPrice: 7999,
      stock: 12,
      condition: 'New',
      specs: 'AMD Ryzen 7, 16GB RAM, 1TB SSD',
      description: 'ASUS ROG Strix G15 للاعبين المحترفين',
      images: ['https://images.unsplash.com/photo-1593640408182-31c70c8268f5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2042&q=80'],
      rating: 4.7,
      reviews: 156,
      discount: 12
    }
  ]

  useEffect(() => {
    const loadProduct = async () => {
      setIsLoading(true)
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      setProduct(mockProduct)
      setRelatedProducts(mockRelatedProducts)
      setIsLoading(false)
    }
    
    loadProduct()
  }, [params.id])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="container-custom py-16">
          <div className="flex items-center justify-center">
            <div className="spinner"></div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="container-custom py-16">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">المنتج غير موجود</h1>
            <p className="text-gray-600 mb-8">عذراً، المنتج المطلوب غير متوفر</p>
            <Button variant="primary" onClick={() => window.history.back()}>
              العودة للخلف
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <div className="container-custom py-8">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 space-x-reverse mb-8">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => window.history.back()}
            className="flex items-center space-x-2 space-x-reverse"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>العودة</span>
          </Button>
          <span className="text-gray-500">/</span>
          <span className="text-gray-500">المنتجات</span>
          <span className="text-gray-500">/</span>
          <span className="text-gray-900 font-medium">{product.name}</span>
        </div>

        {/* Product Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {product.images.slice(1).map((image, index) => (
                <div key={index} className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                  <img
                    src={image}
                    alt={`${product.name} ${index + 2}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
              <p className="text-gray-600 text-lg">{product.specs}</p>
            </div>

            {/* Rating */}
            <div className="flex items-center space-x-2">
              <div className="flex text-yellow-500">★★★★☆</div>
              <span className="text-gray-600">({product.reviews} تقييم)</span>
            </div>

            {/* Price */}
            <div className="space-y-2">
              <div className="flex items-center space-x-4">
                <span className="text-3xl font-bold text-gray-900">
                  {product.price.toLocaleString()} ريال
                </span>
                {product.originalPrice && (
                  <>
                    <span className="text-xl text-gray-500 line-through">
                      {product.originalPrice.toLocaleString()} ريال
                    </span>
                    <Badge variant="error">
                      وفر {(product.originalPrice - product.price).toLocaleString()} ريال
                    </Badge>
                  </>
                )}
              </div>
              {product.discount && product.discount > 0 && (
                <p className="text-green-600 font-medium">وفر {product.discount}%</p>
              )}
            </div>

            {/* Stock Status */}
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <span className="text-green-500">✓</span>
                <span className="text-gray-900">متوفر ({product.stock} قطعة)</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-blue-500">🚚</span>
                <span className="text-gray-600">شحن مجاني خلال 24-48 ساعة</span>
              </div>
            </div>

            {/* Quantity */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">الكمية:</label>
              <div className="flex items-center space-x-4 space-x-reverse">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  -
                </Button>
                <span className="text-lg font-medium w-12 text-center">{quantity}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setQuantity(quantity + 1)}
                  disabled={quantity >= product.stock}
                >
                  +
                </Button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <Button
                variant="primary"
                size="lg"
                fullWidth
                onClick={handleAddToCart}
                loading={addingToCart}
              >
                أضف إلى العربة
              </Button>
              <Button
                variant="secondary"
                fullWidth
                onClick={handleBuyNow}
              >
                اشتر الآن
              </Button>
            </div>
          </div>
        </div>

        {/* Product Description */}
        <div className="mb-16">
          <Card className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">وصف المنتج</h2>
            <p className="text-gray-600 leading-relaxed">{product.description}</p>
          </Card>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-8">منتجات مشابهة</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedProducts.map((relatedProduct) => (
                <Card key={relatedProduct.id} className="group hover:shadow-lg transition-shadow duration-300">
                  <div className="relative">
                    <div className="aspect-square bg-gray-100 rounded-t-lg overflow-hidden">
                      <img
                        src={relatedProduct.images[0]}
                        alt={relatedProduct.name}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    
                    {relatedProduct.discount && relatedProduct.discount > 0 && (
                      <div className="absolute top-4 right-4">
                        <Badge variant="primary">خصم {relatedProduct.discount}%</Badge>
                      </div>
                    )}
                  </div>

                  <div className="p-6">
                    <p className="text-sm text-gray-500 mb-2">{relatedProduct.brand}</p>
                    <h3 className="font-semibold text-gray-800 mb-3 line-clamp-2 hover:text-primary-500 transition-colors duration-200">
                      {relatedProduct.name}
                    </h3>

                    <div className="flex items-center justify-between mb-4">
                      <StarRating rating={relatedProduct.rating} size="sm" />
                      <span className="text-sm text-gray-500">({relatedProduct.reviews})</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <span className="text-xl font-bold text-gray-800">
                          {relatedProduct.price.toLocaleString()} ريال
                        </span>
                        {relatedProduct.originalPrice && (
                          <span className="text-sm text-gray-500 line-through">
                            {relatedProduct.originalPrice.toLocaleString()} ريال
                          </span>
                        )}
                      </div>
                      <Button variant="outline" size="sm">
                        عرض
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}

export default ProductDetailPage