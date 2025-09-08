'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function AdminProducts() {
  const [isLoading, setIsLoading] = useState(true)
  const [userEmail, setUserEmail] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [filterBrand, setFilterBrand] = useState('all')
  const [filterStatus, setFilterStatus] = useState('all')
  const router = useRouter()

  // بيانات المنتجات التجريبية
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Dell XPS 13",
      brand: "Dell",
      price: 1200,
      originalPrice: 1400,
      stock: 15,
      status: "Active",
      condition: "New",
      image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=100&h=100&fit=crop&auto=format",
      specs: "Intel i7-12th Gen, 16GB RAM, 512GB SSD",
      createdAt: "2024-09-01"
    },
    {
      id: 2,
      name: "HP Pavilion 15",
      brand: "HP",
      price: 800,
      originalPrice: 950,
      stock: 8,
      status: "Active",
      condition: "Refurbished",
      image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=100&h=100&fit=crop&auto=format",
      specs: "AMD Ryzen 5, 8GB RAM, 256GB SSD",
      createdAt: "2024-09-02"
    },
    {
      id: 3,
      name: "Lenovo ThinkPad X1",
      brand: "Lenovo",
      price: 1500,
      originalPrice: 1800,
      stock: 0,
      status: "Out of Stock",
      condition: "New",
      image: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=100&h=100&fit=crop&auto=format",
      specs: "Intel i7, 32GB RAM, 1TB SSD",
      createdAt: "2024-09-03"
    },
    {
      id: 4,
      name: "Dell Inspiron 15",
      brand: "Dell",
      price: 650,
      originalPrice: 750,
      stock: 12,
      status: "Active",
      condition: "Refurbished",
      image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=100&h=100&fit=crop&auto=format",
      specs: "Intel i5, 8GB RAM, 256GB SSD",
      createdAt: "2024-09-04"
    },
    {
      id: 5,
      name: "HP EliteBook 840",
      brand: "HP",
      price: 1100,
      originalPrice: 1300,
      stock: 5,
      status: "Low Stock",
      condition: "New",
      image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=100&h=100&fit=crop&auto=format",
      specs: "Intel i7, 16GB RAM, 512GB SSD",
      createdAt: "2024-09-05"
    }
  ])

  // التحقق من تسجيل الدخول
  useEffect(() => {
    const userType = localStorage.getItem('userType')
    const isLoggedIn = localStorage.getItem('isLoggedIn')
    const email = localStorage.getItem('userEmail')
    
    if (!isLoggedIn || userType !== 'admin') {
      router.push('/login')
      return
    }
    
    setUserEmail(email || '')
    setIsLoading(false)
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem('userType')
    localStorage.removeItem('isLoggedIn')
    localStorage.removeItem('userEmail')
    router.push('/login')
  }

  // فلترة المنتجات
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          product.specs.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesBrand = filterBrand === 'all' || product.brand === filterBrand
    const matchesStatus = filterStatus === 'all' || product.status === filterStatus
    
    return matchesSearch && matchesBrand && matchesStatus
  })

  // حذف المنتج
  const handleDeleteProduct = (id: number) => {
    if (confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter(product => product.id !== id))
    }
  }

  // تغيير حالة المنتج
  const toggleProductStatus = (id: number) => {
    setProducts(products.map(product => 
      product.id === id 
        ? { ...product, status: product.status === 'Active' ? 'Inactive' : 'Active' }
        : product
    ))
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

  const stats = {
    total: products.length,
    active: products.filter(p => p.status === 'Active').length,
    outOfStock: products.filter(p => p.stock === 0).length,
    lowStock: products.filter(p => p.stock > 0 && p.stock < 10).length
  }

  return (
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

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm text-center">
            <p className="text-3xl font-bold text-blue-600 mb-2">
              {stats.total}
            </p>
            <p className="text-sm text-gray-600">Total Products</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm text-center">
            <p className="text-3xl font-bold text-green-600 mb-2">
              {stats.active}
            </p>
            <p className="text-sm text-gray-600">Active Products</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm text-center">
            <p className="text-3xl font-bold text-red-600 mb-2">
              {stats.outOfStock}
            </p>
            <p className="text-sm text-gray-600">Out of Stock</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm text-center">
            <p className="text-3xl font-bold text-orange-600 mb-2">
              {stats.lowStock}
            </p>
            <p className="text-sm text-gray-600">Low Stock</p>
          </div>
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
                <option value="Dell">Dell</option>
                <option value="HP">HP</option>
                <option value="Lenovo">Lenovo</option>
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
                {filteredProducts.map((product, index) => (
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
                              product.condition === 'New' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-orange-100 text-orange-800'
                            }`}>
                              {product.condition}
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
                        <button
                          onClick={() => alert(`Edit product: ${product.name}`)}
                          className="px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700 transition-colors"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => toggleProductStatus(product.id)}
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
  )
}
