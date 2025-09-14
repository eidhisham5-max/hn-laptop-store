'use client'

import React, { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { 
  ArrowLeft, 
  Star, 
  Heart, 
  ShoppingCart, 
  Share2, 
  Truck, 
  Shield, 
  RotateCcw,
  CheckCircle,
  Minus,
  Plus,
  ZoomIn,
  X
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ProductService } from '@/lib/data/products'
import { Product } from '@/lib/types'
import { useCart } from '@/contexts/cart-context'
import { formatPrice, cn } from '@/lib/utils'
import { toast } from 'react-hot-toast'

export default function ProductPage() {
  const params = useParams()
  const { addItem } = useCart()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({})
  const [quantity, setQuantity] = useState(1)
  const [showImageModal, setShowImageModal] = useState(false)
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([])

  // Load product data
  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true)
        const productData = await ProductService.getProductBySlug(params.slug as string)
        if (productData) {
          setProduct(productData)
          // Load related products
          const related = await ProductService.getRelatedProducts(productData.id, productData.category)
          setRelatedProducts(related.slice(0, 4))
        }
      } catch (error) {
        console.error('Failed to load product:', error)
        toast.error('فشل في تحميل المنتج')
      } finally {
        setLoading(false)
      }
    }

    if (params.slug) {
      loadProduct()
    }
  }, [params.slug])

  // Handle option selection
  const handleOptionChange = (optionName: string, value: string) => {
    setSelectedOptions(prev => ({
      ...prev,
      [optionName]: value
    }))
  }

  // Handle quantity change
  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1 && newQuantity <= (product?.stock || 0)) {
      setQuantity(newQuantity)
    }
  }

  // Handle add to cart
  const handleAddToCart = () => {
    if (!product) return

    // Check if all required options are selected
    const requiredOptions = product.options?.filter(opt => opt.required) || []
    const missingOptions = requiredOptions.filter(opt => !selectedOptions[opt.name])
    
    if (missingOptions.length > 0) {
      toast.error(`يرجى اختيار: ${missingOptions.map(opt => opt.name).join(', ')}`)
      return
    }

    addItem(product, quantity, selectedOptions)
    toast.success('تم إضافة المنتج إلى العربة')
  }

  // Handle share
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product?.name,
          text: product?.shortDescription,
          url: window.location.href,
        })
      } catch (error) {
        console.log('Error sharing:', error)
      }
    } else {
      navigator.clipboard.writeText(window.location.href)
      toast.success('تم نسخ الرابط')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground font-medium">جاري تحميل المنتج...</p>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">❌</div>
          <h1 className="text-2xl font-bold mb-4">المنتج غير موجود</h1>
          <p className="text-muted-foreground mb-6">لم نتمكن من العثور على المنتج المطلوب</p>
          <Button asChild>
            <Link href="/products">تصفح المنتجات</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container-custom py-8">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 space-x-reverse mb-8">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/products">
              <ArrowLeft className="w-4 h-4 ml-2" />
              العودة للمنتجات
            </Link>
          </Button>
          <span className="text-muted-foreground">/</span>
          <Link href="/products" className="text-muted-foreground hover:text-primary">
            المنتجات
          </Link>
          <span className="text-muted-foreground">/</span>
          <span className="text-foreground font-medium">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-square overflow-hidden rounded-lg border">
              <Image
                src={product.images[selectedImage]?.url || '/placeholder.jpg'}
                alt={product.name}
                fill
                className="object-cover cursor-zoom-in"
                onClick={() => setShowImageModal(true)}
              />
              <Button
                variant="outline"
                size="icon"
                className="absolute top-4 right-4"
                onClick={() => setShowImageModal(true)}
              >
                <ZoomIn className="w-4 h-4" />
              </Button>
              
              {/* Badges */}
              <div className="absolute top-4 left-4 space-y-2">
                {product.isOnSale && (
                  <Badge variant="destructive">-{product.discount}%</Badge>
                )}
                {product.isNew && (
                  <Badge variant="secondary">جديد</Badge>
                )}
                {product.isFeatured && (
                  <Badge variant="outline" className="bg-primary text-primary-foreground">مميز</Badge>
                )}
              </div>
            </div>

            {/* Thumbnail Images */}
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={cn(
                      'relative aspect-square overflow-hidden rounded-lg border-2 transition-colors',
                      selectedImage === index ? 'border-primary' : 'border-border'
                    )}
                  >
                    <Image
                      src={image.url}
                      alt={`${product.name} ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            {/* Basic Info */}
            <div>
              <div className="flex items-center space-x-2 space-x-reverse mb-2">
                <Badge variant="outline">{product.brand}</Badge>
                <div className="flex items-center space-x-1 space-x-reverse">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium">{product.rating}</span>
                  <span className="text-sm text-muted-foreground">({product.reviewCount})</span>
                </div>
              </div>
              
              <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
              <p className="text-lg text-muted-foreground mb-6">{product.shortDescription}</p>
            </div>

            {/* Price */}
            <div className="space-y-2">
              <div className="flex items-center space-x-4 space-x-reverse">
                <span className="text-3xl font-bold text-primary">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-xl text-muted-foreground line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
              </div>
              {product.isOnSale && (
                <p className="text-sm text-green-600">
                  وفرت {formatPrice(product.originalPrice! - product.price)} ({product.discount}%)
                </p>
              )}
            </div>

            {/* Stock Status */}
            <div className="flex items-center space-x-2 space-x-reverse">
              <div className={`w-2 h-2 rounded-full ${product.stock > 0 ? 'bg-green-500' : 'bg-red-500'}`} />
              <span className={`font-medium ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {product.stock > 0 ? `متوفر (${product.stock} قطعة)` : 'نفد المخزون'}
              </span>
            </div>

            {/* Product Options */}
            {product.options && product.options.length > 0 && (
              <div className="space-y-4">
                {product.options.map((option) => (
                  <div key={option.name}>
                    <label className="block text-sm font-medium mb-2">
                      {option.name} {option.required && <span className="text-red-500">*</span>}
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {option.values.map((value) => (
                        <Button
                          key={value}
                          variant={selectedOptions[option.name] === value ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => handleOptionChange(option.name, value)}
                        >
                          {value}
                        </Button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Quantity */}
            <div className="space-y-2">
              <label className="block text-sm font-medium">الكمية</label>
              <div className="flex items-center space-x-2 space-x-reverse w-fit">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleQuantityChange(quantity - 1)}
                  disabled={quantity <= 1}
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleQuantityChange(quantity + 1)}
                  disabled={quantity >= product.stock}
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <div className="flex space-x-4 space-x-reverse">
                <Button
                  size="lg"
                  className="flex-1"
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                >
                  <ShoppingCart className="w-5 h-5 ml-2" />
                  {product.stock > 0 ? 'أضف للسلة' : 'نفد المخزون'}
                </Button>
                <Button variant="outline" size="icon">
                  <Heart className="w-5 h-5" />
                </Button>
                <Button variant="outline" size="icon" onClick={handleShare}>
                  <Share2 className="w-5 h-5" />
                </Button>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-4 pt-4 border-t">
                <div className="text-center p-3 bg-muted/50 rounded-lg">
                  <Truck className="w-6 h-6 mx-auto mb-2 text-primary" />
                  <div className="text-xs font-medium">شحن مجاني</div>
                </div>
                <div className="text-center p-3 bg-muted/50 rounded-lg">
                  <Shield className="w-6 h-6 mx-auto mb-2 text-primary" />
                  <div className="text-xs font-medium">ضمان الجودة</div>
                </div>
                <div className="text-center p-3 bg-muted/50 rounded-lg">
                  <RotateCcw className="w-6 h-6 mx-auto mb-2 text-primary" />
                  <div className="text-xs font-medium">إرجاع مجاني</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-16">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="description">الوصف</TabsTrigger>
              <TabsTrigger value="specifications">المواصفات</TabsTrigger>
              <TabsTrigger value="reviews">التقييمات</TabsTrigger>
              <TabsTrigger value="shipping">الشحن والإرجاع</TabsTrigger>
            </TabsList>
            
            <TabsContent value="description" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <div className="prose max-w-none">
                    <p className="text-muted-foreground leading-relaxed">
                      {product.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="specifications" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {product.specifications?.map((spec, index) => (
                      <div key={index} className="flex justify-between py-2 border-b">
                        <span className="font-medium">{spec.name}</span>
                        <span className="text-muted-foreground">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="reviews" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-6">
                    {/* Review Summary */}
                    <div className="text-center">
                      <div className="text-4xl font-bold mb-2">{product.rating}</div>
                      <div className="flex items-center justify-center space-x-1 space-x-reverse mb-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={cn(
                              'w-5 h-5',
                              star <= product.rating ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground'
                            )}
                          />
                        ))}
                      </div>
                      <p className="text-muted-foreground">بناءً على {product.reviewCount} تقييم</p>
                    </div>

                    {/* Reviews List */}
                    <div className="space-y-4">
                      {[1, 2, 3].map((review) => (
                        <div key={review} className="border-b pb-4">
                          <div className="flex items-center space-x-2 space-x-reverse mb-2">
                            <div className="w-8 h-8 bg-muted rounded-full"></div>
                            <div>
                              <div className="font-medium">عميل {review}</div>
                              <div className="flex items-center space-x-1 space-x-reverse">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <Star key={star} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                ))}
                              </div>
                            </div>
                          </div>
                          <p className="text-muted-foreground">
                            منتج ممتاز وجودة عالية. أنصح به بشدة.
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="shipping" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-semibold mb-2">الشحن</h3>
                      <ul className="space-y-2 text-muted-foreground">
                        <li className="flex items-center space-x-2 space-x-reverse">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span>شحن مجاني للطلبات أكثر من 500 ريال</span>
                        </li>
                        <li className="flex items-center space-x-2 space-x-reverse">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span>توصيل خلال 1-3 أيام عمل</span>
                        </li>
                        <li className="flex items-center space-x-2 space-x-reverse">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span>تتبع الطلب عبر الرسائل النصية</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold mb-2">الإرجاع والاستبدال</h3>
                      <ul className="space-y-2 text-muted-foreground">
                        <li className="flex items-center space-x-2 space-x-reverse">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span>إرجاع مجاني خلال 14 يوم</span>
                        </li>
                        <li className="flex items-center space-x-2 space-x-reverse">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span>استبدال مجاني خلال 30 يوم</span>
                        </li>
                        <li className="flex items-center space-x-2 space-x-reverse">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span>ضمان لمدة سنة واحدة</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-8">منتجات ذات صلة</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <Card key={relatedProduct.id} className="group hover:shadow-lg transition-all duration-300">
                  <Link href={`/products/${relatedProduct.slug}`}>
                    <div className="relative aspect-square overflow-hidden rounded-t-lg">
                      <Image
                        src={relatedProduct.images[0]?.url || '/placeholder.jpg'}
                        alt={relatedProduct.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  </Link>
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-2 line-clamp-2">{relatedProduct.name}</h3>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-primary">
                        {formatPrice(relatedProduct.price)}
                      </span>
                      <div className="flex items-center space-x-1 space-x-reverse">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm text-muted-foreground">
                          {relatedProduct.rating}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Image Modal */}
      {showImageModal && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="relative max-w-4xl max-h-full">
            <Button
              variant="outline"
              size="icon"
              className="absolute top-4 right-4 z-10"
              onClick={() => setShowImageModal(false)}
            >
              <X className="w-4 h-4" />
            </Button>
            <Image
              src={product.images[selectedImage]?.url || '/placeholder.jpg'}
              alt={product.name}
              width={800}
              height={600}
              className="rounded-lg"
            />
          </div>
        </div>
      )}
    </div>
  )
}
