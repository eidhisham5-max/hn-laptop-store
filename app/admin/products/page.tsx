'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { supabase } from '../../../supabaseClient'
import Image from 'next/image'
import { fetchProducts, deleteProduct, updateProduct } from '../../data/db'
import AdminGuard from '../../components/AdminGuard'
import { useToast } from '../../components/ToastProvider'

export default function AdminProducts() {
  const { showToast } = useToast()
  const [isLoading, setIsLoading] = useState(true)
  const [userEmail, setUserEmail] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [filterBrand, setFilterBrand] = useState('all')
  const [filterStatus, setFilterStatus] = useState('all')
  const [products, setProducts] = useState<any[]>([])
  const router = useRouter()

  async function loadProducts() {
    setIsLoading(true)
    try {
      const data = await fetchProducts()
      const mapped = data.map(p => ({
        ...p,
        brand: p.brand_name || 'Unknown',
        image: (p.images && p.images[0]) || 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=100&h=100&fit=crop&auto=format',
        originalPrice: p.original_price ?? undefined,
        price: p.price,
        status: p.status,
      }))
      setProducts(mapped)
    } finally {
      setIsLoading(false)
    }
  }

  // التحقق من تسجيل الدخول
  useEffect(() => {
    (async () => {
      const { data } = await supabase.auth.getSession()
      const email = data.session?.user?.email
      const allowed = email && (!process.env.NEXT_PUBLIC_ADMIN_EMAIL || email.toLowerCase() === process.env.NEXT_PUBLIC_ADMIN_EMAIL.toLowerCase())
      if (!allowed) { router.push('/login'); return }
      setUserEmail(email || '')
      loadProducts()
    })()
  }, [router])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  // فلترة المنتجات
  const filteredProducts = products.filter(product => {
    const matchesSearch = (product.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (product.specs || '').toLowerCase().includes(searchTerm.toLowerCase())
    const matchesBrand = filterBrand === 'all' || product.brand === filterBrand
    const matchesStatus = filterStatus === 'all' || product.status === filterStatus
    return matchesSearch && matchesBrand && matchesStatus
  })

  // حذف المنتج
  const handleDeleteProduct = async (id: number) => {
    if (confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProduct(id)
        setProducts(prev => prev.filter(p => p.id !== id))
        showToast('Product deleted successfully', 'success')
      } catch {
        showToast('Failed to delete product', 'error')
      }
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-gray-200 border-t-red-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading Products...</p>
        </div>
      </div>
    )
  }


  return (
    <AdminGuard>
      <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 mb-8">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Admin Logo */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
                🛠️
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  H.N Admin Panel
                </h1>
                <p className="text-sm text-gray-600">
                  Products Management
                </p>
              </div>
            </div>

            {/* Admin Navigation */}
            <nav className="flex gap-8 items-center">
              <Link href="/admin" className="text-gray-700 hover:text-red-600 font-medium transition-colors">
                Dashboard
              </Link>
              <Link href="/admin/products" className="text-red-600 font-semibold border-b-2 border-red-600 pb-1">
                Products
              </Link>
              <Link href="/" className="text-gray-700 hover:text-red-600 font-medium transition-colors">
                View Store
              </Link>
              <button 
                onClick={handleLogout}
                className="bg-red-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-700 transition-colors"
              >
                Logout {userEmail ? `(${userEmail})` : ''}
              </button>
            </nav>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4">
        {/* Page Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">
              Products Management
            </h2>
            <p className="text-gray-600 mt-2">
              Manage your laptop inventory, prices, and stock levels
            </p>
          </div>
          <Link 
            href="/admin/products/add"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            ➕ Add New Product
          </Link>
        </div>

        {/* Filters and Search */}
        <div className="bg-white p-6 rounded-xl shadow-sm mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search Products
              </label>
              <input
                type="text"
                placeholder="Search by name or specs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Brand Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Filter by Brand
              </label>
              <select
                value={filterBrand}
                onChange={(e) => setFilterBrand(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Brands</option>
                {[...new Set(products.map(p => p.brand))].map((b: string) => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
            </div>

            {/* Status Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Filter by Status
              </label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="Out of Stock">Out of Stock</option>
                <option value="Low Stock">Low Stock</option>
              </select>
            </div>
          </div>
        </div>

        {/* Products Table */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-xl font-bold text-gray-900">
              Products ({filteredProducts.length})
            </h3>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <Image
                          src={product.image}
                          alt={product.name}
                          width={50}
                          height={50}
                          className="rounded-lg object-cover"
                        />
                        <div>
                          <p className="font-medium text-gray-900 mb-1">
                            {product.name}
                          </p>
                          <p className="text-xs text-gray-600 mb-2">
                            {product.specs}
                          </p>
                          <div className="flex gap-2">
                            <span className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded">
                              {product.brand}
                            </span>
                            <span className={`px-2 py-1 text-xs rounded ${
                              'bg-green-100 text-green-800'
                            }`}>
                              {product.condition || 'New'}
                            </span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-bold text-blue-600">
                          ${product.price}
                        </p>
                        {product.originalPrice > product.price && (
                          <p className="text-xs text-gray-400 line-through">
                            ${product.originalPrice}
                          </p>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={`font-bold ${
                        product.stock === 0 
                          ? 'text-red-600' 
                          : product.stock < 10 
                          ? 'text-orange-600' 
                          : 'text-green-600'
                      }`}>
                        {product.stock}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        product.status === 'Active' 
                          ? 'bg-green-100 text-green-800' 
                          : product.status === 'Out of Stock' 
                          ? 'bg-red-100 text-red-800' 
                          : product.status === 'Low Stock' 
                          ? 'bg-yellow-100 text-yellow-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {product.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex gap-2 justify-center">
                        <Link
                          href={`/admin/products/${product.id}`}
                          className="px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700 transition-colors"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => {
                            const nextStatus = product.status === 'Active' ? 'Inactive' : 'Active'
                            updateProduct(product.id, { status: nextStatus as any })
                              .then(() => {
                                setProducts(prev => prev.map(p => p.id === product.id ? { ...p, status: nextStatus } : p))
                                showToast(`Product ${nextStatus.toLowerCase()} successfully`, 'success')
                              })
                              .catch(() => showToast('Failed to update product status', 'error'))
                          }}
                          className={`px-3 py-1 text-xs rounded transition-colors ${
                            product.status === 'Active' 
                              ? 'bg-yellow-600 hover:bg-yellow-700' 
                              : 'bg-green-600 hover:bg-green-700'
                          } text-white`}
                        >
                          {product.status === 'Active' ? 'Disable' : 'Enable'}
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(product.id)}
                          className="px-3 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-700 transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {filteredProducts.length === 0 && (
            <div className="px-6 py-12 text-center">
              <p className="text-gray-600 text-lg">
                No products found matching your criteria
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
    </AdminGuard>
  )
}
