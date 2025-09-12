import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
// import { supabase } from '../../../../supabaseClient'

const PAYMOB_HMAC = process.env.PAYMOB_HMAC || ''

export async function POST(req: NextRequest) {
  const raw = await req.text()
  const sig = req.headers.get('hmac') || ''
  const computed = crypto.createHmac('sha512', PAYMOB_HMAC).update(raw).digest('hex')
  if (!PAYMOB_HMAC || sig.toLowerCase() !== computed.toLowerCase()) {
    return NextResponse.json({ ok: false }, { status: 401 })
  }

  try {
    const payload = JSON.parse(raw)
    const success = payload?.obj?.success === true
    // const orderId = payload?.obj?.order?.merchant_order_id // not used in our init; fallback to metadata if added later
    const amountCents = payload?.obj?.amount_cents
    const paymobOrderId = payload?.obj?.order?.id

    // NOTE: In production, map paymob order to local order via merchant_order_id or custom metadata
    // Here, as a fallback, we don't change specific local order without mapping. Just acknowledge.

    return NextResponse.json({ ok: true, success, paymobOrderId, amountCents })
  } catch (e) {
    return NextResponse.json({ ok: false }, { status: 400 })
  }
}


