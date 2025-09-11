'use client'
import React, { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { ProductGallery } from '../../components/products/ProductGallery'
import { ProductGrid } from '../../components/products/ProductGrid'
import { Button } from '../../components/ui/Button'
import { Badge } from '../../components/ui/Badge'
import { Tabs } from '../../components/ui/Tabs'
import { Accordion } from '../../components/ui/Accordion'
import { useToast } from '../../components/ToastProvider'
import { addToCart } from '../../data/products'
import { fetchProductById } from '../../data/db'

export default function ProductDetailPage() {
  const params = useParams<{ id: string }>()
  const router = useRouter()
  const { showToast } = useToast()
  
  const [product, setProduct] = useState<any>(null)
  const [relatedProducts, setRelatedProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [addingToCart, setAddingToCart] = useState(false)

  useEffect(() => {
    const loadProduct = async () => {
      if (!params?.id) return
      
      setLoading(true)
      setError('')
      
      try {
        const productData = await fetchProductById(Number(params.id))
        setProduct(productData)
        
        // Load related products (simplified - in real app, this would be an API call)
        setRelatedProducts([])
      } catch (err) {
        console.error('Failed to load product', err)
        setError('Failed to load product')
      } finally {
        setLoading(false)
      }
    }

    loadProduct()
  }, [params?.id])

  const handleAddToCart = async () => {
    if (!product) return
    
    setAddingToCart(true)
    try {
      // Add multiple quantities
      for (let i = 0; i < quantity; i++) {
        await addToCart(product.id)
      }
      showToast(`${quantity} item(s) added to cart!`, 'success')
    } catch (error) {
      showToast('Failed to add product to cart', 'error')
    } finally {
      setAddingToCart(false)
    }
  }

  const handleBuyNow = () => {
    handleAddToCart().then(() => {
      router.push('/cart')
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-gray-200 border-t-primary-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading product...</p>
        </div>
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
          <p className="text-gray-600 mb-8">The product you're looking for doesn't exist or has been removed.</p>
          <Link href="/products">
            <Button>Browse All Products</Button>
          </Link>
        </div>
      </div>
    )
  }

  const productImages = product.images || [product.image].filter(Boolean)
  const discount = product.original_price ? Math.round(((product.original_price - product.price) / product.original_price) * 100) : 0

  const tabs = [
    {
      id: 'description',
      label: 'Description',
      content: (
        <div className="prose max-w-none">
          <p className="text-gray-600 leading-relaxed">
            {product.description || product.specs || 'No description available for this product.'}
          </p>
        </div>
      )
    },
    {
      id: 'specifications',
      label: 'Specifications',
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex justify-between py-2 border-b border-gray-200">
                <span className="font-medium text-gray-700">Brand</span>
                <span className="text-gray-900">{product.brand_name || product.brand?.name || 'N/A'}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-200">
                <span className="font-medium text-gray-700">Model</span>
                <span className="text-gray-900">{product.name}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-200">
                <span className="font-medium text-gray-700">Condition</span>
                <Badge variant={product.condition === 'new' ? 'success' : 'warning'}>
                  {product.condition}
                </Badge>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-200">
                <span className="font-medium text-gray-700">Category</span>
                <span className="text-gray-900">{product.category || 'N/A'}</span>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between py-2 border-b border-gray-200">
                <span className="font-medium text-gray-700">SKU</span>
                <span className="text-gray-900">{product.sku || 'N/A'}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-200">
                <span className="font-medium text-gray-700">Stock</span>
                <span className="text-gray-900">{product.stock_count || 'In Stock'}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-200">
                <span className="font-medium text-gray-700">Warranty</span>
                <span className="text-gray-900">2 Years</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-200">
                <span className="font-medium text-gray-700">Weight</span>
                <span className="text-gray-900">~2.5 kg</span>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'reviews',
      label: 'Reviews',
      content: (
        <div className="space-y-6">
          <div className="flex items-center space-x-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900">4.8</div>
              <div className="flex items-center space-x-1">
                <span className="text-yellow-500">★★★★★</span>
              </div>
              <div className="text-sm text-gray-600">Based on 124 reviews</div>
            </div>
            <div className="flex-1 space-y-2">
              {[5, 4, 3, 2, 1].map((star) => (
                <div key={star} className="flex items-center space-x-2">
                  <span className="text-sm w-8">{star}</span>
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-yellow-500 h-2 rounded-full" 
                      style={{ width: `${star === 5 ? 85 : star === 4 ? 12 : star === 3 ? 2 : star === 2 ? 1 : 0}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-600 w-8">
                    {star === 5 ? 85 : star === 4 ? 12 : star === 3 ? 2 : star === 2 ? 1 : 0}%
                  </span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <span className="font-medium">Ahmed M.</span>
                <div className="flex text-yellow-500">★★★★★</div>
                <span className="text-sm text-gray-500">2 days ago</span>
              </div>
              <p className="text-gray-600">Excellent laptop! Fast performance and great build quality. Highly recommended.</p>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <span className="font-medium">Sara K.</span>
                <div className="flex text-yellow-500">★★★★☆</div>
                <span className="text-sm text-gray-500">1 week ago</span>
              </div>
              <p className="text-gray-600">Good laptop but battery could be better. Overall satisfied with the purchase.</p>
            </div>
          </div>
        </div>
      )
    }
  ]

  const accordionItems = [
    {
      id: 'shipping',
      title: 'Shipping & Delivery',
      content: (
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <span className="text-green-500">✓</span>
            <span>Free delivery across Egypt</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-green-500">✓</span>
            <span>24-48 hours delivery time</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-green-500">✓</span>
            <span>Real-time tracking</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-green-500">✓</span>
            <span>Secure packaging</span>
          </div>
        </div>
      )
    },
    {
      id: 'warranty',
      title: 'Warranty & Support',
      content: (
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <span className="text-green-500">✓</span>
            <span>2-year comprehensive warranty</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-green-500">✓</span>
            <span>24/7 technical support</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-green-500">✓</span>
            <span>Free repair service</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-green-500">✓</span>
            <span>WhatsApp support</span>
          </div>
        </div>
      )
    },
    {
      id: 'returns',
      title: 'Returns & Exchanges',
      content: (
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <span className="text-green-500">✓</span>
            <span>30-day return policy</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-green-500">✓</span>
            <span>Free return shipping</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-green-500">✓</span>
            <span>Full refund guarantee</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-green-500">✓</span>
            <span>Easy exchange process</span>
          </div>
        </div>
      )
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
          <Link href="/" className="hover:text-primary-600">Home</Link>
          <span>/</span>
          <Link href="/products" className="hover:text-primary-600">Products</Link>
          <span>/</span>
          <span className="text-gray-900">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Gallery */}
          <div className="order-1">
            <ProductGallery
              images={productImages}
              productName={product.name}
              showThumbnails
              showZoom
              showFullscreen
            />
          </div>

          {/* Product Info */}
          <div className="space-y-4 sm:space-y-6 order-2">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
              <p className="text-gray-600 text-lg">{product.specs}</p>
            </div>

            {/* Rating */}
            <div className="flex items-center space-x-2">
              <div className="flex text-yellow-500">★★★★☆</div>
              <span className="text-gray-600">4.8 (124 reviews)</span>
            </div>

            {/* Price */}
            <div className="space-y-2">
              <div className="flex items-center space-x-4">
                <span className="text-3xl font-bold text-gray-900">
                  ${product.price.toLocaleString()}
                </span>
                {product.original_price && (
                  <>
                    <span className="text-xl text-gray-500 line-through">
                      ${product.original_price.toLocaleString()}
                    </span>
                    <Badge variant="error">
                      Save ${(product.original_price - product.price).toLocaleString()}
                    </Badge>
                  </>
                )}
              </div>
              {discount > 0 && (
                <p className="text-green-600 font-medium">Save {discount}% off</p>
              )}
            </div>

            {/* Stock Status */}
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <span className="text-green-500">✓</span>
                <span className="text-gray-900">In Stock ({product.stock_count || 'Available'})</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-blue-500">🚚</span>
                <span className="text-gray-600">Free delivery in 24-48 hours</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-green-500">🔒</span>
                <span className="text-gray-600">2-year warranty included</span>
              </div>
            </div>

            {/* Quantity */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Quantity</label>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  -
                </Button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </Button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  fullWidth
                  onClick={handleAddToCart}
                  loading={addingToCart}
                >
                  Add to Cart
                </Button>
                <Button
                  size="lg"
                  variant="secondary"
                  fullWidth
                  onClick={handleBuyNow}
                >
                  Buy Now
                </Button>
              </div>
              
              <Button
                variant="outline"
                fullWidth
                onClick={() => window.open('https://wa.me/201000000000', '_blank')}
                className="bg-green-500 hover:bg-green-600 text-white border-green-500"
              >
                💬 WhatsApp Support
              </Button>
            </div>

            {/* Security Badges */}
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <div className="flex items-center space-x-1">
                <span className="text-green-500">🔒</span>
                <span>Secure checkout</span>
              </div>
              <div className="flex items-center space-x-1">
                <span className="text-blue-500">💳</span>
                <span>Multiple payment options</span>
              </div>
              <div className="flex items-center space-x-1">
                <span className="text-orange-500">🔄</span>
                <span>30-day return policy</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-16">
          <Tabs items={tabs} />
        </div>

        {/* Additional Information */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Additional Information</h2>
          <Accordion items={accordionItems} allowMultiple />
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Related Products</h2>
            <ProductGrid
              products={relatedProducts}
              columns={4}
              onAddToCart={handleAddToCart}
              onProductClick={(product) => router.push(`/products/${product.id}`)}
            />
          </div>
        )}
      </div>
    </div>
  )
}