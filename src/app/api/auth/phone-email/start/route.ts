import crypto from 'crypto'
import { NextRequest, NextResponse } from 'next/server'

function safeRedirect(value: string | null) {
  return value && value.startsWith('/') && !value.startsWith('//') ? value : '/dashboard'
}

export async function GET(req: NextRequest) {
  const clientId = process.env.PHONE_EMAIL_CLIENT_ID
  if (!clientId) return NextResponse.redirect(new URL('/login?phoneEmailError=unavailable', req.url))

  const state = crypto.randomBytes(24).toString('base64url')
  const callback = new URL('/login', req.nextUrl.origin)
  callback.searchParams.set('phoneEmailState', state)
  callback.searchParams.set('redirect', safeRedirect(req.nextUrl.searchParams.get('redirect')))

  const provider = new URL('https://www.phone.email/auth/log-in')
  provider.searchParams.set('client_id', clientId)
  provider.searchParams.set('redirect_url', callback.toString())

  const response = NextResponse.redirect(provider)
  response.cookies.set('phone-email-state', state, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 10 * 60,
  })
  return response
}
