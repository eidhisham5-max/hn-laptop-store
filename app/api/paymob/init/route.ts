import { NextRequest, NextResponse } from 'next/server'
import { createOrder } from '../../../data/db'

const PAYMOB_API_KEY = process.env.PAYMOB_API_KEY
const PAYMOB_INTEGRATION_ID = process.env.PAYMOB_INTEGRATION_ID
const PAYMOB_IFRAME_ID = process.env.PAYMOB_IFRAME_ID

export async function POST(req: NextRequest) {
  try {
    if (!PAYMOB_API_KEY || !PAYMOB_INTEGRATION_ID || !PAYMOB_IFRAME_ID) {
      return NextResponse.json({ error: 'Paymob env missing' }, { status: 500 })
    }

    const body = await req.json()
    const { customer_name, phone, address, items } = body as {
      customer_name: string
      phone: string
      address: string
      items: { product_id: number; qty: number; price: number }[]
    }
    // Basic validation & normalization
    const name = (customer_name || '').trim()
    const phoneNorm = (phone || '').trim()
    const addressNorm = (address || '').trim()
    if (!name || name.length > 80) return NextResponse.json({ error: 'Invalid name' }, { status: 400 })
    if (!/^\+?\d{7,15}$/.test(phoneNorm)) return NextResponse.json({ error: 'Invalid phone' }, { status: 400 })
    if (!addressNorm || addressNorm.length > 200) return NextResponse.json({ error: 'Invalid address' }, { status: 400 })
    if (!Array.isArray(items) || items.length === 0) return NextResponse.json({ error: 'Invalid items' }, { status: 400 })
    for (const it of items) {
      if (!it || typeof it.product_id !== 'number' || it.product_id <= 0) return NextResponse.json({ error: 'Invalid product_id' }, { status: 400 })
      if (typeof it.qty !== 'number' || it.qty <= 0 || it.qty > 100) return NextResponse.json({ error: 'Invalid qty' }, { status: 400 })
      if (typeof it.price !== 'number' || it.price < 0) return NextResponse.json({ error: 'Invalid price' }, { status: 400 })
    }

    const amountCents = Math.max(100, Math.round(items.reduce((s, it) => s + it.price * it.qty, 0) * 100))

    // 1) Authentication
    const authRes = await fetch('https://accept.paymob.com/api/auth/tokens', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ api_key: PAYMOB_API_KEY })
    })
    const authData = await authRes.json()
    const token = authData?.token
    if (!token) return NextResponse.json({ error: 'Paymob auth failed' }, { status: 502 })

    // 2) Order registration (Paymob)
    const regRes = await fetch('https://accept.paymob.com/api/ecommerce/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        auth_token: token,
        delivery_needed: false,
        amount_cents: amountCents,
        currency: 'EGP',
        items: []
      })
    })
    const regData = await regRes.json()
    const paymobOrderId = regData?.id
    if (!paymobOrderId) return NextResponse.json({ error: 'Paymob order failed' }, { status: 502 })

    // 3) Payment key request
    const billing_data = {
      apartment: 'NA',
      email: 'customer@example.com',
      floor: 'NA',
      first_name: name || 'Customer',
      last_name: ' ',
      phone_number: phoneNorm,
      shipping_method: 'NA',
      building: 'NA',
      city: 'Cairo',
      country: 'EG',
      state: 'NA',
      street: addressNorm.slice(0, 50) || 'Address'
    }

    const keyRes = await fetch('https://accept.paymob.com/api/acceptance/payment_keys', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        auth_token: token,
        amount_cents: amountCents,
        expiration: 3600,
        order_id: paymobOrderId,
        billing_data,
        currency: 'EGP',
        integration_id: Number(PAYMOB_INTEGRATION_ID),
        lock_order_when_paid: true
      })
    })
    const keyData = await keyRes.json()
    const paymentKey = keyData?.token
    if (!paymentKey) return NextResponse.json({ error: 'Paymob key failed' }, { status: 502 })

    // Create local order in Pending
    const localOrder = await createOrder({ customer_name: name, phone: phoneNorm, address: addressNorm, items })

    const iframeUrl = `https://accept.paymob.com/api/acceptance/iframes/${PAYMOB_IFRAME_ID}?payment_token=${paymentKey}`
    return NextResponse.json({ iframeUrl, orderId: localOrder.id })
  } catch (e) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}


