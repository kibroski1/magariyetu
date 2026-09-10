'use client'

import { useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'next/navigation'

export function PhoneEmailLogin({ onSuccess, redirectTo }: { onSuccess: () => void; redirectTo: string }) {
  const searchParams = useSearchParams()
  const [error, setError] = useState<string | null>(searchParams.get('phoneEmailError') === 'unavailable' ? 'Phone sign-in is not configured yet.' : null)
  const handledCallback = useRef(false)
  const accessToken = searchParams.get('access_token')
  const state = searchParams.get('phoneEmailState')

  useEffect(() => {
    if (!accessToken || !state || handledCallback.current) return
    handledCallback.current = true
    fetch('/api/auth/phone-email/callback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ accessToken, state }),
    }).then(async (response) => {
      if (!response.ok) {
        const body = await response.json().catch(() => null)
        setError(body?.error || 'Phone verification could not be completed.')
        return
      }
      onSuccess()
    }).catch(() => {
      setError('Network connection error. Please try again.')
    })
  }, [accessToken, state, onSuccess])

  if (accessToken) {
    return <p className="py-3 text-center text-sm text-ink-400">{error || 'Completing phone sign-in…'}</p>
  }

  return (
    <div className="space-y-3">
      {error && <p className="rounded bg-alert/10 px-3 py-2 text-sm text-alert">{error}</p>}
      <a
        href={`/api/auth/phone-email/start?redirect=${encodeURIComponent(redirectTo)}`}
        className="block w-full rounded bg-stamp py-2.5 text-center font-display text-sm uppercase tracking-wide text-white hover:opacity-90"
      >
        Continue with phone
      </a>
      <p className="text-center text-xs text-ink-400">Secure verification is provided by Phone.Email.</p>
    </div>
  )
}
