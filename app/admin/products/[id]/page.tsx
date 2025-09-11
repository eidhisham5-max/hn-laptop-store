'use client'
import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '../../../../supabaseClient'
import { fetchProductById, fetchBrands, updateProduct } from '../../../data/db'
import { useToast } from '../../../components/ToastProvider'

export default function EditProductPage() {
  const router = useRouter()
  const params = useParams<{ id: string }>()
  const productId = Number(params?.id)
  const { showToast } = useToast()

  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [brands, setBrands] = useState<{ id: number; name: string }[]>([])
  const [form, setForm] = useState({
    name: '',
    brand_id: '',
    price: '',
    original_price: '',
    stock: '',
    condition: 'New',
    status: 'Active',
    specs: '',
    description: ''
  })

  useEffect(() => {
    (async () => {
      const { data } = await supabase.auth.getSession()
      const email = data.session?.user?.email
      const allowed = email && (!process.env.NEXT_PUBLIC_ADMIN_EMAIL || email.toLowerCase() === process.env.NEXT_PUBLIC_ADMIN_EMAIL.toLowerCase())
      if (!allowed) { router.push('/login'); return }
      try {
        setLoading(true)
        const [p, b] = await Promise.all([
          fetchProductById(productId),
          fetchBrands()
        ])
        setBrands(b)
        if (!p) { showToast('Product not found', 'error'); router.push('/admin/products'); return }
        setForm({
          name: p.name || '',
          brand_id: String(p.brand_id || ''),
          price: String(p.price ?? ''),
          original_price: p.original_price != null ? String(p.original_price) : '',
          stock: String(p.stock ?? ''),
          condition: p.condition || 'New',
          status: p.status || 'Active',
          specs: p.specs || '',
          description: p.description || ''
        })
      } finally {
        setLoading(false)
      }
    })()
  }, [router, productId, showToast])

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      await updateProduct(productId, {
        name: form.name,
        brand_id: Number(form.brand_id),
        price: parseFloat(form.price),
        original_price: form.original_price ? parseFloat(form.original_price) : null,
        stock: parseInt(form.stock || '0', 10),
        condition: form.condition as any,
        status: form.status as any,
        specs: form.specs,
        description: form.description,
      })
      showToast('Product updated successfully!', 'success')
      router.push('/admin/products')
    } catch (err) {
      showToast('Failed to update product', 'error')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
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
      <header className="bg-white shadow-sm border-b border-gray-200 mb-8">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-600 rounded-lg text-white flex items-center justify-center">🛠️</div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Edit Product</h1>
              <p className="text-sm text-gray-600">Update product details</p>
            </div>
          </div>
          <Link href="/admin/products" className="text-gray-700 hover:text-red-600">← Back</Link>
        </div>
      </header>

      <div className="container mx-auto px-4">
        <form onSubmit={onSubmit} className="bg-white rounded-xl shadow-sm p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
            <input name="name" value={form.name} onChange={onChange} required className="w-full px-4 py-2 border rounded-lg" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Brand</label>
            <select name="brand_id" value={form.brand_id} onChange={onChange} required className="w-full px-4 py-2 border rounded-lg">
              <option value="">Select brand</option>
              {brands.map(b=> <option key={b.id} value={b.id}>{b.name}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Price</label>
            <input name="price" type="number" min="0" step="0.01" value={form.price} onChange={onChange} required className="w-full px-4 py-2 border rounded-lg" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Original Price</label>
            <input name="original_price" type="number" min="0" step="0.01" value={form.original_price} onChange={onChange} className="w-full px-4 py-2 border rounded-lg" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Stock</label>
            <input name="stock" type="number" min="0" value={form.stock} onChange={onChange} required className="w-full px-4 py-2 border rounded-lg" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Condition</label>
            <select name="condition" value={form.condition} onChange={onChange} className="w-full px-4 py-2 border rounded-lg">
              <option value="New">New</option>
              <option value="Refurbished">Refurbished</option>
              <option value="Used">Used</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <select name="status" value={form.status} onChange={onChange} className="w-full px-4 py-2 border rounded-lg">
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Specs</label>
            <textarea name="specs" rows={3} value={form.specs} onChange={onChange} className="w-full px-4 py-2 border rounded-lg" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea name="description" rows={4} value={form.description} onChange={onChange} className="w-full px-4 py-2 border rounded-lg" />
          </div>
          <div className="md:col-span-2 flex gap-3">
            <button type="submit" disabled={submitting} className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium disabled:opacity-50">
              {submitting ? 'Saving...' : 'Save Changes'}
            </button>
            <Link href="/admin/products" className="px-6 py-3 bg-gray-500 text-white rounded-lg font-medium">Cancel</Link>
          </div>
        </form>
      </div>
    </div>
  )
}



