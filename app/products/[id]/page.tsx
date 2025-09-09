'use client'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

interface Product {
  id: number
  name: string
  brand: string
  price: number
  originalPrice: number
  image: string
  specs: string
  description: string
  condition: string
  rating: number
  reviews: number
  stock: number
  discount: number
}

export default function ProductDetails({ params }: { params: { id: string } }) {
  const [product, setProduct] = useState<Product | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const router = useRouter()

  // بيانات المنتجات التجريبية
  const products: Product[] = [
    {
      id: 1,
      name: "Dell XPS 13",
      brand: "Dell",
      price: 1200,
      originalPrice: 1400,
      image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&h=600&fit=crop&auto=format",
      specs: "Intel i7-12th Gen, 16GB RAM, 512GB SSD, 13.3 inch FHD Display",
      description: "The Dell XPS 13 is a premium ultrabook that combines powerful performance with elegant design. Perfect for professionals and students who need reliability and portability.",
      condition: "New",
      rating: 4.8,
      reviews: 124,
      stock: 15,
      discount: 14
    },
    {
      id: 2,
      name: "HP Pavilion 15",
      brand: "HP",
      price: 800,
      originalPrice: 950,
      image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&h=600&fit=crop&auto=format",
      specs: "AMD Ryzen 5, 8GB RAM, 256GB SSD, 15.6 inch HD Display",
      description: "A reliable and affordable laptop perfect for everyday computing tasks, work, and entertainment.",
      condition: "Refurbished",
      rating: 4.6,
      reviews: 89,
      stock: 8,
      discount: 16
    },
    {
      id: 3,
      name: "Lenovo ThinkPad X1",
      brand: "Lenovo",
      price: 1500,
      originalPrice: 1800,
      image: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=800&h=600&fit=crop&auto=format",
      specs: "Intel i7, 32GB RAM, 1TB SSD, 14 inch 4K Display",
      description: "Business-grade laptop with exceptional build quality and performance for demanding professional tasks.",
      condition: "New",
      rating: 4.9,
      reviews: 203,
      stock: 12,
      discount: 17
    },
    {
      id: 4,
      name: "Dell Inspiron 15",
      brand: "Dell",
      price: 650,
      originalPrice: 750,
      image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800&h=600&fit=crop&auto=format",
      specs: "Intel i5, 8GB RAM, 256GB SSD, 15.6 inch HD Display",
      description: "Budget-friendly laptop that doesn't compromise on essential features and performance.",
      condition: "Refurbished",
      rating: 4.5,
      reviews: 67,
      stock: 5,
      discount: 13
    }
  ]

  useEffect(() => {
    const productId = parseInt(params.id)
    const foundProduct = products.find(p => p.id === productId)
    setProduct(foundProduct || null)
    setIsLoading(false)
  }, [params.id])

  const addToCart = () => {
    if (product) {
      // محاكاة إضافة للسلة
      const cartItem = {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: quantity
      }
      
      // حفظ في localStorage
      const existingCart = JSON.parse(localStorage.getItem('cart') || '[]')
      const existingItemIndex = existingCart.findIndex((item: any) => item.id === product.id)
      
      if (existingItemIndex >= 0) {
        existingCart[existingItemIndex].quantity += quantity
      } else {
        existingCart.push(cartItem)
      }
      
      localStorage.setItem('cart', JSON.stringify(existingCart))
      alert('تم إضافة المنتج إلى السلة!')
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading product...</p>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Product Not Found</h1>
          <p className="text-gray-600 mb-8">The product you're looking for doesn't exist.</p>
          <Link href="/" className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
            Back to Home
          </Link>
        </div>
      </div>
    )
  }

  const images = [product.image, product.image, product.image] // في التطبيق الحقيقي ستكون صور متعددة

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-12 h-12 bg-[#007AFF] rounded-xl flex items-center justify-center text-white font-bold text-lg">
                HN
              </div>
              <div>
                <h1 className="text-xl font-bold text-[#1D1D1F]">H.N Laptop Store</h1>
                <p className="text-sm text-[#86868B]">Premium Laptops</p>
              </div>
            </Link>
            
            <nav className="flex gap-6 items-center">
              <Link href="/" className="text-gray-700 hover:text-[#007AFF] transition-colors">Home</Link>
              <Link href="/cart" className="bg-[#007AFF] text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Cart
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-8">
          <Link href="/" className="hover:text-[#007AFF]">Home</Link>
          <span>/</span>
          <Link href="/#products" className="hover:text-[#007AFF]">Products</Link>
          <span>/</span>
          <span className="text-gray-900">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div>
            <div className="bg-white rounded-2xl p-4 mb-4">
              <Image
                src={images[selectedImage]}
                alt={product.name}
                width={600}
                height={400}
                className="w-full h-96 object-cover rounded-xl"
              />
            </div>
            
            <div className="flex gap-2">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-20 h-20 rounded-lg overflow-hidden border-2 ${
                    selectedImage === index ? 'border-[#007AFF]' : 'border-gray-200'
                  }`}
                >
                  <Image
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    width={80}
                    height={80}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded">{product.brand}</span>
              <span className={`text-sm px-2 py-1 rounded ${
                product.condition === 'New' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-orange-100 text-orange-800'
              }`}>
                {product.condition}
              </span>
            </div>

            <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-6">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={`text-lg ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`}>
                    ★
                  </span>
                ))}
              </div>
              <span className="text-sm text-gray-600">({product.reviews} reviews)</span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-4 mb-6">
              <span className="text-4xl font-bold text-[#007AFF]">${product.price}</span>
              {product.originalPrice > product.price && (
                <span className="text-xl text-gray-400 line-through">${product.originalPrice}</span>
              )}
              <span className="text-sm text-green-700 font-medium bg-green-100 px-3 py-1 rounded">
                Save ${product.originalPrice - product.price}
              </span>
            </div>

            {/* Specs */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Specifications</h3>
              <p className="text-gray-700">{product.specs}</p>
            </div>

            {/* Description */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
              <p className="text-gray-700 leading-relaxed">{product.description}</p>
            </div>

            {/* Stock */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm font-medium text-gray-700">Stock:</span>
                <span className={`font-bold ${
                  product.stock > 10 ? 'text-green-600' : 
                  product.stock > 5 ? 'text-orange-600' : 'text-red-600'
                }`}>
                  {product.stock} available
                </span>
              </div>
            </div>

            {/* Quantity & Add to Cart */}
            <div className="flex items-center gap-4 mb-8">
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium text-gray-700">Quantity:</label>
                <select
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value))}
                  className="border border-gray-300 rounded-lg px-3 py-2"
                >
                  {[...Array(Math.min(product.stock, 10))].map((_, i) => (
                    <option key={i + 1} value={i + 1}>{i + 1}</option>
                  ))}
                </select>
              </div>
              
              <button
                onClick={addToCart}
                disabled={product.stock === 0}
                className="flex-1 bg-[#007AFF] text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
              </button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div className="p-4 bg-gray-50 rounded-xl">
                <div className="text-2xl mb-2">🚚</div>
                <p className="text-sm font-medium">Free Delivery</p>
                <p className="text-xs text-gray-600">24-48 hours</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-xl">
                <div className="text-2xl mb-2">🛡️</div>
                <p className="text-sm font-medium">2-Year Warranty</p>
                <p className="text-xs text-gray-600">Full coverage</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-xl">
                <div className="text-2xl mb-2">💬</div>
                <p className="text-sm font-medium">24/7 Support</p>
                <p className="text-xs text-gray-600">WhatsApp available</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}