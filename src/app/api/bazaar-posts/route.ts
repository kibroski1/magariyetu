import { getPayload } from '@/lib/payload'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const payload = await getPayload()

    const doc = await payload.create({
      collection: 'bazaar-posts' as any,
      data: {
        title: body.title,
        vehicleDetails: body.vehicleDetails,
        description: body.description,
        askingPrice: body.askingPrice ? Number(body.askingPrice) : undefined,
        bazaar: body.bazaarId,
        status: 'pending',
      },
    })

    return NextResponse.json({ success: true, doc })
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to submit bazaar post' }, { status: 500 })
  }
}