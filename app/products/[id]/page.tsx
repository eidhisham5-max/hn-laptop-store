'use client'
import React, { useMemo, useState, useEffect } from 'react'
import Image from 'next/image'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { fetchProductById } from '../../data/db'
import { addToCart } from '../../data/products'
import { useToast } from '../../components/ToastProvider'
import Header from '../../components/Header'

export default function ProductDetailPage() {
  const params = useParams<{ id: string }>()
  const router = useRouter()
  const { showToast } = useToast()
  const idNum = Number(params?.id)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string>('')
  const [product, setProduct] = useState<any | null>(null)
  const [activeIdx, setActiveIdx] = useState(0)
  const [activeTab, setActiveTab] = useState('description')

  useEffect(() => {
    async function load() {
      setIsLoading(true)
      setError('')
      try {
        const p = await fetchProductById(idNum)
        setProduct(p)
        setActiveIdx(0)
      } catch (e) {
        setError('Failed to load product')
      } finally {
        setIsLoading(false)
      }
    }
    if (!Number.isNaN(idNum)) load()
  }, [idNum])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-gray-200 border-t-[#007AFF] rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading product...</p>
        </div>
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Product not found.</p>
          <Link className="btn-outline-accent px-4 py-2 rounded-lg" href="/">Back to home</Link>
        </div>
      </div>
    )
  }

  const mainImage = product.images?.[activeIdx] || product.images?.[0] || 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&auto=format&fit=crop'

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Header />
      <div className="container mx-auto px-4 py-10 pt-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Gallery */}
          <div className="space-y-4">
            <div className="relative w-full h-[500px] border rounded-2xl overflow-hidden group shadow-lg">
              <Image 
                src={mainImage} 
                alt={product.name} 
                fill 
                className="object-cover transition-transform duration-300 group-hover:scale-105" 
                priority
              />
              {product.discount && (
                <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  -{product.discount}% OFF
                </div>
              )}
            </div>
            {product.images?.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {product.images.map((img: string, idx: number) => (
                  <button 
                    key={img+idx} 
                    onClick={() => setActiveIdx(idx)} 
                    className={`relative w-24 h-24 border-2 rounded-xl overflow-hidden flex-shrink-0 transition-all ${
                      idx===activeIdx ? 'ring-2 ring-[#007AFF] border-[#007AFF]' : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <Image src={img} alt={`${product.name} ${idx+1}`} fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div>
            <h1 className="text-3xl font-bold mb-2 text-[#1D1D1F]">{product.name}</h1>
            <p className="text-[#86868B] mb-4">Brand: <Link className="text-[#007AFF] hover:underline" href={`/brands/${(product.brand?.name || product.brand_name || '').toLowerCase()}`}>{product.brand?.name || product.brand_name}</Link></p>

            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl font-bold text-[#007AFF]">${product.price}</span>
              {product.original_price && (
                <span className="text-gray-400 line-through">${product.original_price}</span>
              )}
              {product.discount && (
                <span className="text-xs text-green-700 font-medium bg-green-100 px-2 py-1 rounded">Save {product.discount}%</span>
              )}
            </div>

            <div className="flex items-center gap-2 mb-4">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={`text-sm ${i < 4 ? 'text-yellow-400' : 'text-gray-300'}`}>★</span>
                ))}
              </div>
              <span className="text-sm text-[#86868B]">(Placeholder reviews)</span>
            </div>

            {/* Tabs */}
            <div className="mt-8">
              <div className="flex gap-6 border-b mb-6">
                <button 
                  onClick={() => setActiveTab('description')}
                  className={`py-2 border-b-2 font-semibold transition-colors ${
                    activeTab === 'description' ? 'border-[#007AFF] text-[#007AFF]' : 'border-transparent text-[#86868B]'
                  }`}
                >
                  Description
                </button>
                <button 
                  onClick={() => setActiveTab('specifications')}
                  className={`py-2 border-b-2 font-semibold transition-colors ${
                    activeTab === 'specifications' ? 'border-[#007AFF] text-[#007AFF]' : 'border-transparent text-[#86868B]'
                  }`}
                >
                  Specifications
                </button>
                <button 
                  onClick={() => setActiveTab('reviews')}
                  className={`py-2 border-b-2 font-semibold transition-colors ${
                    activeTab === 'reviews' ? 'border-[#007AFF] text-[#007AFF]' : 'border-transparent text-[#86868B]'
                  }`}
                >
                  Reviews
                </button>
              </div>
              
              <div className="space-y-4">
                {activeTab === 'description' && (
                  <div className="space-y-4">
                    <p className="text-[#1D1D1F] leading-relaxed">{product.description || product.specs}</p>
                    <div className="bg-blue-50 p-4 rounded-xl">
                      <h4 className="font-semibold text-blue-900 mb-2">Key Features</h4>
                      <ul className="text-blue-800 space-y-1">
                        <li>• High-performance processor for smooth multitasking</li>
                        <li>• Fast SSD storage for quick boot times</li>
                        <li>• Premium build quality and design</li>
                        <li>• 2-year warranty included</li>
                      </ul>
                    </div>
                  </div>
                )}
                
                {activeTab === 'specifications' && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gray-50 p-4 rounded-xl">
                        <h4 className="font-semibold text-gray-900 mb-2">Processor</h4>
                        <p className="text-gray-700">{product.specs?.split(',')[0] || 'High-performance CPU'}</p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-xl">
                        <h4 className="font-semibold text-gray-900 mb-2">Memory</h4>
                        <p className="text-gray-700">{product.specs?.split(',')[1] || '8GB RAM'}</p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-xl">
                        <h4 className="font-semibold text-gray-900 mb-2">Storage</h4>
                        <p className="text-gray-700">{product.specs?.split(',')[2] || '256GB SSD'}</p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-xl">
                        <h4 className="font-semibold text-gray-900 mb-2">Display</h4>
                        <p className="text-gray-700">High-resolution display</p>
                      </div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-xl">
                      <h4 className="font-semibold text-gray-900 mb-2">Full Specifications</h4>
                      <p className="text-gray-700">{product.specs}</p>
                    </div>
                  </div>
                )}
                
                {activeTab === 'reviews' && (
                  <div className="space-y-4">
                    <div className="text-center py-8">
                      <div className="text-4xl mb-4">⭐</div>
                      <h4 className="font-semibold text-gray-900 mb-2">Customer Reviews</h4>
                      <p className="text-gray-600 mb-4">Reviews and rating system coming soon!</p>
                      <div className="bg-yellow-50 p-4 rounded-xl">
                        <p className="text-yellow-800 text-sm">Be the first to review this product after purchase.</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center gap-3 mb-6">
              <button 
                className="btn-accent px-6 py-3 rounded-xl font-semibold" 
                onClick={() => { 
                  addToCart(product.id, 1)
                  showToast(`${product.name} added to cart!`, 'success')
                  router.push('/cart') 
                }}
              >
                Add to Cart
              </button>
              <button 
                className="btn-outline-accent px-6 py-3 rounded-xl font-semibold" 
                onClick={() => {
                  addToCart(product.id, 1)
                  showToast(`${product.name} added to cart!`, 'success')
                }}
              >
                Add + Continue
              </button>
            </div>

            <div className="mt-6 p-4 bg-[#F5F7FA] rounded-xl">
              <h3 className="font-semibold mb-2">Customer Reviews (Placeholder)</h3>
              <p className="text-sm text-[#86868B]">Reviews and rating submission will be available soon.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


