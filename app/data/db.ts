import { supabase } from '../../supabaseClient'
import { getProducts } from './products'

export type DbBrand = { id: number; name: string; slug: string; created_at?: string }
export type DbProductImage = { id: number; product_id: number; url: string; created_at?: string }
export type DbProduct = {
  id: number
  name: string
  brand_id: number
  brand_name?: string
  category?: string
  price: number
  original_price?: number | null
  stock: number
  condition: 'New' | 'Refurbished' | 'Used'
  specs: string
  description?: string | null
  discount?: number | null
  status: 'Active' | 'Inactive'
  created_at?: string
}

export type DbOrder = {
  id: number
  customer_name: string
  phone: string
  address: string
  total: number
  status: 'Pending' | 'Processing' | 'Completed'
  created_at?: string
}

export type DbOrderItem = {
  id: number
  order_id: number
  product_id: number
  qty: number
  price: number
}

export async function fetchBrands(): Promise<DbBrand[]> {
  const { data, error } = await supabase.from('brands').select('*').order('name', { ascending: true })
  if (error) throw error
  return data as DbBrand[]
}

export async function createBrand(input: Omit<DbBrand, 'id' | 'created_at'>) {
  const { data, error } = await supabase.from('brands').insert(input).select('*').single()
  if (error) throw error
  return data as DbBrand
}

export async function fetchProducts(): Promise<(DbProduct & { images: string[]; brand?: DbBrand })[]> {
  const { data, error } = await supabase
    .from('products')
    .select('*, brands:brand_id(*), product_images(url)')
    .order('created_at', { ascending: false })
  if (error) throw error
  return (data || []).map((row: any) => ({
    id: row.id,
    name: row.name,
    brand_id: row.brand_id,
    brand_name: row.brands?.name,
    category: row.category || undefined,
    price: row.price,
    original_price: row.original_price,
    stock: row.stock,
    condition: row.condition,
    specs: row.specs,
    description: row.description,
    discount: row.discount,
    status: row.status as 'Active' | 'Inactive',
    created_at: row.created_at,
    images: (row.product_images || []).map((i: any) => i.url),
    brand: row.brands,
  }))
}

export async function fetchProductsByIds(ids: number[]): Promise<(DbProduct & { images: string[] })[]> {
  if (!ids.length) return []
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*, product_images(url)')
      .in('id', ids)
    if (error) throw error
    return (data || []).map((row: any) => ({
      id: row.id,
      name: row.name,
      brand_id: row.brand_id,
      price: row.price,
      original_price: row.original_price,
      stock: row.stock,
      condition: row.condition,
      specs: row.specs,
      description: row.description,
      discount: row.discount,
      status: row.status as 'Active' | 'Inactive',
      images: (row.product_images || []).map((i: any) => i.url),
    }))
  } catch (err) {
    // Fallback: use local seed/storage products if Supabase is unavailable
    const local = getProducts()
      .filter(p => ids.includes(p.id))
      .map(p => ({
        id: p.id,
        name: p.name,
        brand_id: 0,
        price: p.price,
        original_price: p.originalPrice ?? null,
        stock: p.stock,
        condition: p.condition as any,
        specs: p.specs,
        description: p.description ?? null,
        discount: p.discount ?? null,
        status: 'Active' as const,
        images: p.images ?? [],
      }))
    return local as any
  }
}

export async function fetchProductById(id: number): Promise<(DbProduct & { images: string[]; brand?: DbBrand }) | null> {
  const { data, error } = await supabase
    .from('products')
    .select('*, brands:brand_id(*), product_images(url)')
    .eq('id', id)
    .single()
  if (error) {
    if ((error as any).code === 'PGRST116') return null
    throw error
  }
  return {
    id: data.id,
    name: data.name,
    brand_id: data.brand_id,
    brand_name: data.brands?.name,
    category: data.category || undefined,
    price: data.price,
    original_price: data.original_price,
    stock: data.stock,
    condition: data.condition,
    specs: data.specs,
    description: data.description,
    discount: data.discount,
    status: data.status as 'Active' | 'Inactive',
    created_at: data.created_at,
    images: (data.product_images || []).map((i: any) => i.url),
    brand: data.brands,
  }
}

export type CreateProductInput = {
  name: string
  brand_id: number
  category?: string
  price: number
  original_price?: number | null
  stock: number
  condition: 'New' | 'Refurbished' | 'Used'
  specs: string
  description?: string | null
  discount?: number | null
  status?: 'Active' | 'Inactive'
  images?: string[]
}

export async function createProduct(input: CreateProductInput) {
  const { images = [], ...rest } = input
  const { data, error } = await supabase.from('products').insert(rest).select('*').single()
  if (error) throw error
  if (images.length) {
    const productImages = images.map((url) => ({ product_id: data.id, url }))
    const { error: imgErr } = await supabase.from('product_images').insert(productImages)
    if (imgErr) throw imgErr
  }
  return data as DbProduct
}

export async function updateProduct(id: number, changes: Partial<CreateProductInput>) {
  const { images, ...rest } = changes
  if (Object.keys(rest).length) {
    const { error } = await supabase.from('products').update(rest).eq('id', id)
    if (error) throw error
  }
  if (images) {
    const { error: delErr } = await supabase.from('product_images').delete().eq('product_id', id)
    if (delErr) throw delErr
    if (images.length) {
      const { error: insErr } = await supabase.from('product_images').insert(images.map(url => ({ product_id: id, url })))
      if (insErr) throw insErr
    }
  }
}

export async function deleteProduct(id: number) {
  const { error } = await supabase.from('products').delete().eq('id', id)
  if (error) throw error
}

export type CreateOrderInput = {
  customer_name: string
  phone: string
  address: string
  items: { product_id: number; qty: number; price: number }[]
}

export async function createOrder(input: CreateOrderInput): Promise<DbOrder> {
  const total = input.items.reduce((s, it) => s + it.price * it.qty, 0)
  try {
    const { data: order, error: orderErr } = await supabase
      .from('orders')
      .insert({ customer_name: input.customer_name, phone: input.phone, address: input.address, total, status: 'Pending' })
      .select('*')
      .single()
    if (orderErr) throw orderErr

    if (input.items.length) {
      const itemsRows = input.items.map(it => ({ order_id: order.id, product_id: it.product_id, qty: it.qty, price: it.price }))
      const { error: itemsErr } = await supabase.from('order_items').insert(itemsRows)
      if (itemsErr) throw itemsErr
    }

    return order as DbOrder
  } catch (err) {
    // Fallback to local storage order when Supabase is unavailable
    if (typeof window !== 'undefined') {
      try {
        const raw = localStorage.getItem('hn_orders')
        const orders = raw ? JSON.parse(raw) : []
        const nextId = orders.length ? Math.max(...orders.map((o: any) => o.id)) + 1 : 1
        const order: DbOrder = {
          id: nextId,
          customer_name: input.customer_name,
          phone: input.phone,
          address: input.address,
          total,
          status: 'Pending',
          created_at: new Date().toISOString()
        }
        const items = input.items.map(it => ({ id: 0, order_id: nextId, product_id: it.product_id, qty: it.qty, price: it.price }))
        orders.push({ ...order, items })
        localStorage.setItem('hn_orders', JSON.stringify(orders))
        return order
      } catch {
        throw err
      }
    }
    throw err
  }
}

export async function fetchOrders(): Promise<(DbOrder & { items: (DbOrderItem & { product?: { id: number; name: string } })[] })[]> {
  const { data, error } = await supabase
    .from('orders')
    .select('*, order_items(*, products:product_id(id,name))')
    .order('created_at', { ascending: false })
  if (error) throw error
  return (data || []).map((row: any) => ({
    id: row.id,
    customer_name: row.customer_name,
    phone: row.phone,
    address: row.address,
    total: Number(row.total),
    status: row.status,
    created_at: row.created_at,
    items: (row.order_items || []).map((it: any) => ({
      id: it.id,
      order_id: it.order_id,
      product_id: it.product_id,
      qty: it.qty,
      price: Number(it.price),
      product: it.products ? { id: it.products.id, name: it.products.name } : undefined
    }))
  }))
}

export async function updateOrderStatus(orderId: number, status: DbOrder['status']) {
  const { error } = await supabase.from('orders').update({ status }).eq('id', orderId)
  if (error) throw error
}

export async function fetchOrdersByPhone(phone: string): Promise<(DbOrder & { items: (DbOrderItem & { product?: { id: number; name: string } })[] })[]> {
  const { data, error } = await supabase
    .from('orders')
    .select('*, order_items(*, products:product_id(id,name))')
    .eq('phone', phone)
    .order('created_at', { ascending: false })
  if (error) throw error
  return (data || []).map((row: any) => ({
    id: row.id,
    customer_name: row.customer_name,
    phone: row.phone,
    address: row.address,
    total: Number(row.total),
    status: row.status,
    created_at: row.created_at,
    items: (row.order_items || []).map((it: any) => ({
      id: it.id,
      order_id: it.order_id,
      product_id: it.product_id,
      qty: it.qty,
      price: Number(it.price),
      product: it.products ? { id: it.products.id, name: it.products.name } : undefined
    }))
  }))
}
