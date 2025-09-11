import { NextRequest, NextResponse } from 'next/server'

// Simple IP-based rate limit (in-memory for edge runtime)
const WINDOW_MS = 60_000
const MAX_REQ = 60
const store = new Map<string, { count: number; ts: number }>()

export function middleware(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown'
  const now = Date.now()
  const rec = store.get(ip as string)
  if (!rec || now - rec.ts > WINDOW_MS) {
    store.set(ip as string, { count: 1, ts: now })
  } else {
    rec.count += 1
    if (rec.count > MAX_REQ) {
      return new NextResponse('Too Many Requests', { status: 429 })
    }
  }
  return NextResponse.next()
}

export const config = {
  matcher: ['/api/:path*']
}



