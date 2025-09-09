'use client'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { fetchProducts, deleteProduct } from '../../data/db'

export default function AdminProductsPage() {
  const router = useRouter()
  const [products, setProducts] = React.useState<any[]>([])
  const [loading, setLoading] = React.useState(true)
  const [filter, setFilter] = React.useState('all')
  const [searchTerm, setSearchTerm] = React.useState('')
  const [deletingId, setDeletingId] = React.useState<number | null>(null)

  React.useEffect(() => {
    // Check authentication
    const isAdmin = localStorage.getItem('isAdmin') === 'true'
    const userType = localStorage.getItem('userType')
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'
    const userEmail = localStorage.getItem('userEmail')

    if (!((isAdmin || userType === 'admin') && isLoggedIn && userEmail)) {
      router.push('/login')
      return
    }

    loadProducts()
  }, [router])

  const loadProducts = async () => {
    try {
      setLoading(true)
      const data = await fetchProducts()
      setProducts(data)
    } catch (error) {
      console.error('Error loading products:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (productId: number) => {
    if (!confirm('Are you sure you want to delete this product?')) return
    
    try {
      setDeletingId(productId)
      await deleteProduct(productId)
      setProducts(products.filter(p => p.id !== productId))
    } catch (error) {
      console.error('Error deleting product:', error)
      alert('Failed to delete product')
    } finally {
      setDeletingId(null)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('isAdmin')
    localStorage.removeItem('userType')
    localStorage.removeItem('isLoggedIn')
    localStorage.removeItem('userEmail')
    router.push('/')
  }

  const filteredProducts = products.filter(product => {
    const matchesFilter = filter === 'all' || 
      (filter === 'active' && product.status === 'active') ||
      (filter === 'inactive' && product.status === 'inactive')
    
    const matchesSearch = searchTerm === '' || 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.brand?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase())
    
    return matchesFilter && matchesSearch
  })

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading products...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center text-white font-bold text-lg">
                A
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Products Management</h1>
                <p className="text-sm text-gray-600">Manage your product catalog</p>
              </div>
            </div>
            
            <nav className="flex gap-8 items-center">
              <Link href="/admin" className="text-gray-700 hover:text-red-600 font-medium transition-colors">Dashboard</Link>
              <Link href="/admin/products" className="text-red-600 font-semibold border-b-2 border-red-600 pb-1">Products</Link>
              <Link href="/admin/orders" className="text-gray-700 hover:text-red-600 font-medium transition-colors">Orders</Link>
              <Link href="/admin/analytics" className="text-gray-700 hover:text-red-600 font-medium transition-colors">Analytics</Link>
              <Link href="/" className="text-gray-700 hover:text-red-600 font-medium transition-colors">View Store</Link>
              <button onClick={handleLogout} className="bg-red-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-700 transition-colors">
                Logout
              </button>
            </nav>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Filters and Search */}
        <div className="mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex gap-2">
            {['all', 'active', 'inactive'].map(status => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors capitalize ${
                  filter === status 
                    ? 'bg-red-600 text-white' 
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
          
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
            />
            <Link
              href="/admin/products/add"
              className="px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
            >
              Add Product
            </Link>
            <button
              onClick={loadProducts}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Refresh
            </button>
          </div>
        </div>

        {/* Product Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Products</p>
                <p className="text-2xl font-bold text-gray-900">{products.length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">📦</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Products</p>
                <p className="text-2xl font-bold text-green-600">{products.filter(p => p.status === 'active').length}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">✅</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Inactive Products</p>
                <p className="text-2xl font-bold text-red-600">{products.filter(p => p.status === 'inactive').length}</p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">❌</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Brands</p>
                <p className="text-2xl font-bold text-purple-600">{new Set(products.map(p => p.brand?.name)).size}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">🏷️</span>
              </div>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="bg-white p-8 rounded-xl text-gray-600 text-center">
            <div className="text-6xl mb-4">📦</div>
            <h3 className="text-xl font-semibold mb-2">No Products Found</h3>
            <p>No products match your current filters.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map(product => (
              <div key={product.id} className="bg-white rounded-xl shadow-sm border overflow-hidden hover:shadow-md transition-shadow">
                <div className="relative h-48 bg-gray-100">
                  <Image
                    src={product.images?.[0] || 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&auto=format&fit=crop'}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-3 left-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      product.status === 'active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {product.status}
                    </span>
                  </div>
                  {product.discount && product.discount > 0 && (
                    <div className="absolute top-3 right-3">
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        -{product.discount}%
                      </span>
                    </div>
                  )}
                </div>
                
                <div className="p-4">
                  <div className="mb-2">
                    <h3 className="font-semibold text-gray-900 text-lg">{product.name}</h3>
                    <p className="text-sm text-gray-600">{product.brand?.name} • {product.category}</p>
                  </div>
                  
                  <div className="mb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-xl font-bold text-gray-900">${product.price}</span>
                      {product.discount && product.discount > 0 && (
                        <span className="text-sm text-gray-500 line-through">${product.original_price}</span>
                      )}
                    </div>
                    <div className="text-sm text-gray-600">
                      Stock: {product.stock} units
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Link
                      href={`/admin/products/edit/${product.id}`}
                      className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors text-center"
                    >
                      Edit
                    </Link>
                    <Link
                      href={`/products/${product.id}`}
                      className="flex-1 px-3 py-2 bg-gray-600 text-white rounded-lg text-sm font-medium hover:bg-gray-700 transition-colors text-center"
                    >
                      View
                    </Link>
                    <button
                      onClick={() => handleDelete(product.id)}
                      disabled={deletingId === product.id}
                      className="px-3 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors disabled:opacity-50"
                    >
                      {deletingId === product.id ? '...' : 'Delete'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}