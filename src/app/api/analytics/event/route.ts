import crypto from 'crypto'
import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from '@/lib/payload'
import { clientKey, rateLimit, rateLimitedResponse } from '@/lib/security'

const EVENT_TYPES = new Set(['page-view', 'search', 'listing-view', 'whatsapp-lead', 'sell-started', 'listing-submitted'])

export async function POST(req: NextRequest) {
  const limited = rateLimit(clientKey(req, 'analytics'), 60, 60_000)
  if (!limited.allowed) return rateLimitedResponse(limited.retryAfter)
  const body = await req.json().catch(() => null)
  if (!body || !EVENT_TYPES.has(body.eventType) || typeof body.path !== 'string' || typeof body.visitorId !== 'string') return NextResponse.json({ error: 'Invalid analytics event.' }, { status: 400 })
  if (body.path.length > 180 || !body.path.startsWith('/') || body.visitorId.length > 100) return NextResponse.json({ error: 'Invalid analytics event.' }, { status: 400 })

  const salt = process.env.PAYLOAD_SECRET || 'local-development-analytics-salt'
  const visitorKey = crypto.createHash('sha256').update(`${salt}:${body.visitorId}`).digest('hex')
  await (await getPayload()).create({ collection: 'analytics-events' as any, data: { eventType: body.eventType, path: body.path, visitorKey, occurredAt: new Date().toISOString() }, overrideAccess: true })
  return NextResponse.json({ ok: true }, { status: 201 })
}
