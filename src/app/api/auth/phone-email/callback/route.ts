import crypto from 'crypto'
import { jwtSign } from 'payload'
import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from '@/lib/payload'
import { clientKey, rateLimit, rateLimitedResponse } from '@/lib/security'

function normalizeKenyanPhone(countryCode: unknown, phoneNumber: unknown) {
  const country = String(countryCode || '').replace(/\D/g, '')
  const local = String(phoneNumber || '').replace(/\D/g, '').replace(/^0/, '')
  const number = country === '254' ? `254${local}` : ''
  return /^2547\d{8}$/.test(number) ? number : null
}

function systemEmail(phone: string) {
  // Payload's local auth strategy requires an email field. This reserved,
  // non-deliverable address is only an internal identifier; no mail is sent to it.
  return `phone-${phone}@accounts.magariyetu.invalid`
}

export async function POST(req: NextRequest) {
  const limited = rateLimit(clientKey(req, 'phone-email-callback'), 12, 60 * 60 * 1000)
  if (!limited.allowed) return rateLimitedResponse(limited.retryAfter)

  const { accessToken, state } = await req.json().catch(() => ({}))
  if (typeof accessToken !== 'string' || !accessToken || typeof state !== 'string') {
    return NextResponse.json({ error: 'Phone verification response is incomplete.' }, { status: 400 })
  }
  const storedState = req.cookies.get('phone-email-state')?.value || ''
  const stateMatches = Buffer.byteLength(state) === Buffer.byteLength(storedState)
    && crypto.timingSafeEqual(Buffer.from(state), Buffer.from(storedState))
  if (!process.env.PHONE_EMAIL_CLIENT_ID || !stateMatches) {
    return NextResponse.json({ error: 'Phone verification session expired. Please try again.' }, { status: 403 })
  }

  const form = new URLSearchParams({ access_token: accessToken, client_id: process.env.PHONE_EMAIL_CLIENT_ID })
  const providerResponse = await fetch('https://eapi.phone.email/getuser', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: form,
  }).catch(() => null)
  if (!providerResponse?.ok) {
    return NextResponse.json({ error: 'We could not confirm that phone number. Please try again.' }, { status: 401 })
  }

  const providerUser = await providerResponse.json().catch(() => null) as {
    status?: number
    country_code?: string
    phone_no?: string
  } | null
  const phone = providerUser?.status === 200 && normalizeKenyanPhone(providerUser.country_code, providerUser.phone_no)
  if (!phone) return NextResponse.json({ error: 'Please use a Kenyan mobile number (+254 7…).' }, { status: 400 })

  const payload = await getPayload()
  const { docs } = await payload.find({ collection: 'users', where: { phone: { equals: phone } }, limit: 1 })
  let user = docs[0]
  if (!user) {
    user = await payload.create({
      collection: 'users',
      data: {
        name: 'Magariyetu User',
        phone,
        email: systemEmail(phone),
        password: crypto.randomBytes(32).toString('base64url'),
        _verified: true,
        role: 'buyer',
      },
    })
  }

  if (['suspended', 'banned'].includes(user.accountStatus) && (!user.suspensionEndsAt || new Date(user.suspensionEndsAt) > new Date())) {
    return NextResponse.json({ error: 'This account is unavailable. Contact support if you believe this is an error.' }, { status: 403 })
  }
  if (!user._verified) {
    return NextResponse.json({ error: 'Verify your email before using phone sign-in for this account.' }, { status: 403 })
  }

  const tokenExpiration = payload.collections.users.config.auth.tokenExpiration || 60 * 60 * 24 * 7
  const { token } = await jwtSign({
    fieldsToSign: { id: user.id, collection: 'users', email: user.email },
    secret: payload.secret,
    tokenExpiration,
  })
  const response = NextResponse.json({ user: { id: user.id, name: user.name, role: user.role } })
  response.cookies.set('payload-token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: tokenExpiration,
  })
  response.cookies.set('phone-email-state', '', { httpOnly: true, path: '/', maxAge: 0 })
  return response
}
