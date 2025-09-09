'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { createProduct, fetchBrands, createBrand } from '../../../data/db'
import { useToast } from '../../../components/ToastProvider'

export default function AddProduct() {
  const { showToast } = useToast()
  const [isLoading, setIsLoading] = useState(true)
  const [userEmail, setUserEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [brands, setBrands] = useState<{ id: number; name: string }[]>([])
  const [newBrandName, setNewBrandName] = useState('')
  const router = useRouter()

  // حالة النموذج
  const [formData, setFormData] = useState({
    name: '',
    brand_id: '',
    price: '',
    original_price: '',
    stock: '',
    condition: 'New',
    specs: '',
    description: '',
    imagesText: '' // سطر أو عدة أسطر لروابط الصور
  })

  // حالة رفع الصورة (اختياري لاحقًا للتخزين)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string>('')

  // التحقق من تسجيل الدخول + تحميل البراندز
  useEffect(() => {
    const userType = localStorage.getItem('userType')
    const isLoggedIn = localStorage.getItem('isLoggedIn')
    const email = localStorage.getItem('userEmail')
    
    if (!isLoggedIn || userType !== 'admin') {
      router.push('/login')
      return
    }
    setUserEmail(email || '')

    fetchBrands().then(b => setBrands(b)).finally(()=>setIsLoading(false))
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem('userType')
    localStorage.removeItem('isLoggedIn')
    localStorage.removeItem('userEmail')
    router.push('/login')
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  // معالجة رفع صورة واحدة (اختياري حالياً)
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (!file.type.startsWith('image/')) { alert('Please select an image file'); return }
      if (file.size > 5 * 1024 * 1024) { alert('Image size should be less than 5MB'); return }
      setImageFile(file)
      const reader = new FileReader()
      reader.onload = (ev) => setImagePreview(ev.target?.result as string)
      reader.readAsDataURL(file)
    }
  }

  // TODO: يمكن لاحقاً رفع الملف إلى Supabase Storage وإرجاع رابط عام
  const uploadImage = async (file: File): Promise<string> => {
    await new Promise(r => setTimeout(r, 600))
    return `/uploads/${file.name}`
  }

  const ensureBrandId = async (): Promise<number> => {
    if (formData.brand_id && formData.brand_id !== '__new__') return Number(formData.brand_id)
    const name = newBrandName.trim()
    if (!name) throw new Error('Please select a brand or enter a new brand name')
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
    const created = await createBrand({ name, slug })
    // refresh list and set selected
    const b = await fetchBrands()
    setBrands(b)
    setFormData(prev => ({ ...prev, brand_id: String(created.id) }))
    return created.id
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      const brandId = await ensureBrandId()

      // تجهيز صور الإدخال (سطر/أسطر)
      const imagesFromText = formData.imagesText
        .split(/\n|,/) // أسطر أو فواصل
        .map(s => s.trim())
        .filter(Boolean)

      let firstImageUrl: string | undefined
      if (imageFile) {
        firstImageUrl = await uploadImage(imageFile)
      }
      const images = firstImageUrl ? [firstImageUrl, ...imagesFromText] : imagesFromText

      // الإدراج في قاعدة البيانات
      await createProduct({
        name: formData.name,
        brand_id: brandId,
        category: undefined,
        price: parseFloat(formData.price),
        original_price: formData.original_price ? parseFloat(formData.original_price) : null,
        stock: parseInt(formData.stock || '0', 10),
        condition: formData.condition as any,
        specs: formData.specs,
        description: formData.description || null,
        discount: formData.original_price ? Math.max(0, Math.round((1 - parseFloat(formData.price)/parseFloat(formData.original_price))*100)) : null,
        status: 'Active',
        images
      })

      showToast('Product added successfully!', 'success')
      router.push('/admin/products')
    } catch (err: any) {
      showToast(err?.message || 'Error adding product. Please try again.', 'error')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-gray-200 border-t-red-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
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
                  Add New Product
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
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Link href="/admin/products" className="text-gray-600 hover:text-gray-900">
              ← Back to Products
            </Link>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Add New Product
          </h2>
          <p className="text-gray-600">
            Fill in the details below to add a new laptop to your store.
          </p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-xl shadow-sm p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Product Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Product Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., Dell XPS 13"
                />
              </div>

              {/* Brand */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Brand *
                </label>
                {brands.length === 0 ? (
                  <div className="space-y-2">
                    <input
                      type="text"
                      placeholder="Enter new brand name"
                      value={newBrandName}
                      onChange={(e)=>setNewBrandName(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <p className="text-xs text-gray-500">No brands yet. A new brand will be created on submit.</p>
                  </div>
                ) : (
                  <>
                    <select
                      name="brand_id"
                      value={formData.brand_id}
                      onChange={handleInputChange}
                      required={!newBrandName}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select Brand</option>
                      {brands.map(b => (
                        <option key={b.id} value={b.id}>{b.name}</option>
                      ))}
                      <option value="__new__">+ Add new brand</option>
                    </select>
                    {formData.brand_id === '__new__' && (
                      <input
                        type="text"
                        placeholder="New brand name"
                        value={newBrandName}
                        onChange={(e)=>setNewBrandName(e.target.value)}
                        className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    )}
                  </>
                )}
              </div>

              {/* Price */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price ($) *
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  required
                  min="0"
                  step="0.01"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="1200"
                />
              </div>

              {/* Original Price */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Original Price ($)
                </label>
                <input
                  type="number"
                  name="original_price"
                  value={formData.original_price}
                  onChange={handleInputChange}
                  min="0"
                  step="0.01"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="1400"
                />
              </div>

              {/* Stock */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Stock Quantity *
                </label>
                <input
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleInputChange}
                  required
                  min="0"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="10"
                />
              </div>

              {/* Condition */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Condition *
                </label>
                <select
                  name="condition"
                  value={formData.condition}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="New">New</option>
                  <option value="Refurbished">Refurbished</option>
                  <option value="Used">Used</option>
                </select>
              </div>
            </div>

            {/* Specifications */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Specifications *
              </label>
              <textarea
                name="specs"
                value={formData.specs}
                onChange={handleInputChange}
                required
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., Intel i7-12th Gen, 16GB RAM, 512GB SSD, 13.3 inch display"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Detailed description of the laptop..."
              />
            </div>

            {/* Image Upload (اختياري) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Image (optional)
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {(imagePreview) && (
                <div className="mt-4">
                  <p className="text-sm text-gray-600 mb-2">Preview:</p>
                  <div className="w-32 h-32 relative border border-gray-300 rounded-lg overflow-hidden">
                    <Image src={imagePreview} alt="Product preview" fill className="object-cover" />
                  </div>
                </div>
              )}
            </div>

            {/* Images URLs */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Image URLs (one per line or comma separated)
              </label>
              <textarea
                name="imagesText"
                value={formData.imagesText}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="https://...\nhttps://..."
              />
              <p className="text-xs text-gray-500 mt-1">You can paste multiple links.</p>
            </div>

            {/* Submit Buttons */}
            <div className="flex gap-4 pt-6">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Adding Product...
                  </>
                ) : (
                  'Add Product'
                )}
              </button>
              <Link
                href="/admin/products"
                className="bg-gray-500 text-white px-8 py-3 rounded-lg font-medium hover:bg-gray-600 transition-colors"
              >
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
