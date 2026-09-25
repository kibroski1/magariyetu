import { NextRequest, NextResponse } from 'next/server'
import { getCurrentUser } from '@/lib/auth'
import { getPayload } from '@/lib/payload'

export async function POST(req: NextRequest) {
  const user = await getCurrentUser()
  if (!user) return NextResponse.json({ error: 'Sign in required to post for a bazaar.' }, { status: 401 })
  const body = await req.json().catch(() => null)
  if (!body?.event || !body?.title?.trim() || !body?.vehicleDetails?.trim() || !body?.description?.trim()) return NextResponse.json({ error: 'Complete the vehicle title, details and description.' }, { status: 400 })
  const payload = await getPayload(); const bazaar = await payload.findByID({ collection: 'bazaar-events', id: body.event }).catch(() => null)
  if (!bazaar || bazaar.status !== 'published' || new Date(bazaar.eventDate) < new Date()) return NextResponse.json({ error: 'This bazaar is not accepting posts.' }, { status: 400 })
  const askingPrice = body.askingPrice === '' || body.askingPrice == null ? undefined : Number(body.askingPrice)
  if (askingPrice !== undefined && (!Number.isFinite(askingPrice) || askingPrice < 0)) return NextResponse.json({ error: 'Use a valid asking price.' }, { status: 400 })
  return NextResponse.json({ id: post.id }, { status: 201 })
}
  const post = await payload.create({ collection: 'bazaar-posts', data: { event: bazaar.id, owner: user.id, title: body.title.trim(), vehicleDetails: body.vehicleDetails.trim(), description: body.description.trim(), askingPrice, status: 'pending' } as any, overrideAccess: true })
