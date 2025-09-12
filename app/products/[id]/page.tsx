'use client'

import React, { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import ProductGallery from '@/components/product/ProductGallery'
import ProductInfo from '@/components/product/ProductInfo'
import ProductTabs from '@/components/product/ProductTabs'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { StarRating } from '@/components/ui/StarRating'
import { Badge } from '@/components/ui/Badge'
import { ArrowLeft, Share2 } from 'lucide-react'

interface Product {
  id: number
  name: string
  brand: string
  price: number
  originalPrice?: number
  rating: number
  reviewCount: number
  images: string[]
  badge?: string
  isNew?: boolean
  isOnSale?: boolean
  inStock: boolean
  stockCount?: number
  description: string
  fullDescription: string
  specifications: {
    screenSize: string
    processor: string
    ram: string
    storage: string
    graphicsCard?: string
    operatingSystem: string
    weight: string
    battery: string
    display: string
    ports: string
    connectivity: string
    camera: string
    audio: string
  }
  colors?: { name: string; value: string; available: boolean }[]
  storageOptions?: { size: string; price: number; available: boolean }[]
  reviews: {
    id: number
    userName: string
    rating: number
    date: string
    comment: string
    verified: boolean
  }[]
  questions: {
    id: number
    question: string
    answer: string
    date: string
  }[]
}

const ProductDetailPage: React.FC = () => {
  const params = useParams()
  const [product, setProduct] = useState<Product | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([])

  // Mock data - في التطبيق الحقيقي سيتم جلبها من API
  const mockProduct: Product = {
    id: 1,
    name: 'MacBook Pro 16" M3 Max',
    brand: 'Apple',
    price: 12999,
    originalPrice: 14999,
    rating: 4.8,
    reviewCount: 124,
    images: [
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2026&q=80',
      'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80',
      'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1964&q=80',
      'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2042&q=80'
    ],
    badge: 'الأكثر مبيعاً',
    isOnSale: true,
    inStock: true,
    stockCount: 15,
    description: 'MacBook Pro 16 بمعالج M3 Max الجديد - أداء استثنائي للمحترفين والمبدعين. شاشة Liquid Retina XDR بدقة 16.2 بوصة، معالج M3 Max بذاكرة موحدة 32GB، وتخزين SSD سريع 1TB.',
    fullDescription: 'MacBook Pro 16 بمعالج M3 Max يمثل قمة التطور التقني في عالم أجهزة الكمبيوتر المحمولة. تم تصميمه خصيصاً للمحترفين والمبدعين الذين يحتاجون إلى أداء استثنائي في العمل اليومي. المعالج M3 Max الجديد يوفر أداءً يصل إلى 2.5x أسرع من المعالجات السابقة، مما يجعله مثالي لتشغيل التطبيقات الثقيلة مثل تحرير الفيديو عالي الدقة، التصميم ثلاثي الأبعاد، والبرمجة المتقدمة. الشاشة Liquid Retina XDR بدقة 16.2 بوصة توفر تجربة بصرية مذهلة مع دعم HDR وطيف ألوان P3 الواسع. النظام المبرد المتقدم يضمن أداءً مستقراً حتى تحت أقصى الأحمال.',
    specifications: {
      screenSize: '16.2 بوصة',
      processor: 'Apple M3 Max',
      ram: '32 GB',
      storage: '1 TB SSD',
      graphicsCard: 'GPU مدمج 40-core',
      operatingSystem: 'macOS Sonoma',
      weight: '2.15 كيلوغرام',
      battery: '22 ساعة تشغيل',
      display: 'Liquid Retina XDR، 3456 × 2234 بكسل',
      ports: '3 × Thunderbolt 4، HDMI، SDXC، MagSafe 3',
      connectivity: 'Wi-Fi 6E، Bluetooth 5.3',
      camera: 'كاميرا FaceTime HD 1080p',
      audio: 'نظام صوتي 6-speaker مع Spatial Audio'
    },
    colors: [
      { name: 'فضي', value: '#C0C0C0', available: true },
      { name: 'رمادي فاتح', value: '#D3D3D3', available: true },
      { name: 'رمادي داكن', value: '#696969', available: false }
    ],
    storageOptions: [
      { size: '512 GB', price: 11999, available: true },
      { size: '1 TB', price: 12999, available: true },
      { size: '2 TB', price: 14999, available: true },
      { size: '4 TB', price: 18999, available: false }
    ],
    reviews: [
      {
        id: 1,
        userName: 'أحمد محمد',
        rating: 5,
        date: '2024-01-15',
        comment: 'لابتوب رائع جداً! الأداء مذهل والشاشة واضحة جداً. أنصح به بشدة للمطورين والمصممين.',
        verified: true
      },
      {
        id: 2,
        userName: 'فاطمة علي',
        rating: 4,
        date: '2024-01-10',
        comment: 'جودة ممتازة وسرعة عالية. السعر مناسب مقارنة بالمواصفات المقدمة.',
        verified: true
      },
      {
        id: 3,
        userName: 'خالد السعد',
        rating: 5,
        date: '2024-01-08',
        comment: 'أفضل لابتوب استخدمته على الإطلاق. البطارية تدوم طويلاً والأداء لا يصدق.',
        verified: false
      }
    ],
    questions: [
      {
        id: 1,
        question: 'هل يمكن تشغيل الألعاب على هذا اللابتوب؟',
        answer: 'نعم، يمكن تشغيل معظم الألعاب الحديثة بجودة عالية بفضل المعالج M3 Max وكارت الشاشة المدمج القوي.',
        date: '2024-01-12'
      },
      {
        id: 2,
        question: 'ما هي مدة الضمان؟',
        answer: 'نحن نقدم ضمان شامل لمدة سنتين على جميع أجزاء اللابتوب، بالإضافة إلى دعم فني مجاني.',
        date: '2024-01-10'
      }
    ]
  }

  const mockRelatedProducts: Product[] = [
    {
      id: 2,
      name: 'Dell XPS 15 OLED',
      brand: 'Dell',
      price: 8999,
      rating: 4.6,
      reviewCount: 89,
      images: ['https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80'],
      badge: 'جديد',
      isNew: true,
      inStock: true,
      description: 'Dell XPS 15 مع شاشة OLED مذهلة',
      fullDescription: 'Dell XPS 15 مع شاشة OLED',
      specifications: {
        screenSize: '15 بوصة',
        processor: 'Intel Core i7',
        ram: '16 GB',
        storage: '512 GB',
        operatingSystem: 'Windows 11',
        weight: '1.8 كيلوغرام',
        battery: '12 ساعة تشغيل',
        display: 'OLED 4K',
        ports: 'USB-C، HDMI، SD',
        connectivity: 'Wi-Fi 6، Bluetooth 5.2',
        camera: '720p',
        audio: 'نظام صوتي مدمج'
      },
      reviews: [],
      questions: []
    },
    {
      id: 3,
      name: 'ASUS ROG Strix G15',
      brand: 'ASUS',
      price: 6999,
      originalPrice: 7999,
      rating: 4.7,
      reviewCount: 156,
      images: ['https://images.unsplash.com/photo-1593640408182-31c70c8268f5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2042&q=80'],
      badge: 'عرض خاص',
      isOnSale: true,
      inStock: true,
      description: 'ASUS ROG Strix G15 للاعبين المحترفين',
      fullDescription: 'ASUS ROG Strix G15 للاعبين المحترفين',
      specifications: {
        screenSize: '15 بوصة',
        processor: 'AMD Ryzen 7',
        ram: '16 GB',
        storage: '1 TB',
        operatingSystem: 'Windows 11',
        weight: '2.3 كيلوغرام',
        battery: '8 ساعات تشغيل',
        display: 'Full HD 144Hz',
        ports: 'USB-A، USB-C، HDMI، Ethernet',
        connectivity: 'Wi-Fi 6، Bluetooth 5.1',
        camera: '720p',
        audio: 'نظام صوتي مدمج'
      },
      reviews: [],
      questions: []
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
            <h1 className="text-2xl font-bold text-gray-800 mb-4">المنتج غير موجود</h1>
            <Button onClick={() => window.history.back()}>
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
      
      <main className="container-custom py-8">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 space-x-reverse mb-8">
          <button
            onClick={() => window.history.back()}
            className="flex items-center text-gray-600 hover:text-primary-500 transition-colors duration-200"
          >
            <ArrowLeft className="w-5 h-5 ml-2" />
            العودة
          </button>
          <span className="text-gray-400">/</span>
          <span className="text-gray-600">اللابتوبات</span>
          <span className="text-gray-400">/</span>
          <span className="text-gray-600">{product.brand}</span>
          <span className="text-gray-400">/</span>
          <span className="text-gray-800 font-medium">{product.name}</span>
        </div>

        {/* Product Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Product Gallery */}
          <div>
            <ProductGallery images={product.images} productName={product.name} />
          </div>

          {/* Product Info */}
          <div>
            <ProductInfo product={product} />
          </div>
        </div>

        {/* Product Tabs */}
        <div className="mb-16">
          <ProductTabs product={product} />
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-8">منتجات مشابهة</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <Card key={relatedProduct.id} className="card-hover group cursor-pointer">
                  <div className="relative overflow-hidden rounded-t-2xl">
                    <div className="aspect-square relative">
                      <img
                        src={relatedProduct.images[0]}
                        alt={relatedProduct.name}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    
                    {relatedProduct.badge && (
                      <div className="absolute top-4 right-4">
                        <Badge variant="primary">{relatedProduct.badge}</Badge>
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
                      <span className="text-sm text-gray-500">({relatedProduct.reviewCount})</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <span className="text-xl font-bold text-gray-800">
                          {relatedProduct.originalPrice ? (
                            <>
                              <span className="text-lg text-gray-500 line-through">
                                {relatedProduct.originalPrice.toLocaleString()} ريال
                              </span>
                              <span className="mr-2">
                                {relatedProduct.price.toLocaleString()} ريال
                              </span>
                            </>
                          ) : (
                            `${relatedProduct.price.toLocaleString()} ريال`
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  )
}

export default ProductDetailPage