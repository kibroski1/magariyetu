'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

type Consent = 'accepted' | 'essential-only'
const STORAGE_KEY = 'magariyetu-cookie-preference'

export function CookiePreferences() {
  const [open, setOpen] = useState(false)
  const [choice, setChoice] = useState<Consent | null>(null)

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY) as Consent | null
    setChoice(saved === 'accepted' || saved === 'essential-only' ? saved : null)
    const showSettings = () => setOpen(true)
    window.addEventListener('magariyetu:cookie-settings', showSettings)
    return () => window.removeEventListener('magariyetu:cookie-settings', showSettings)
  }, [])

  function save(value: Consent) {
    window.localStorage.setItem(STORAGE_KEY, value)
    setChoice(value)
    setOpen(false)
    // Analytics must only be loaded after this explicit opt-in. There is no
    // analytics provider loaded today, so "accepted" records a preference only.
    window.dispatchEvent(new CustomEvent('magariyetu:cookie-consent', { detail: value }))
  }

  if (choice && !open) return null
  return (
    <aside className="fixed inset-x-4 bottom-4 z-50 mx-auto max-w-xl rounded-xl border border-ink-100 bg-white p-5 shadow-2xl" aria-label="Cookie preferences">
      <p className="font-display text-base font-bold text-ink">Your privacy choices</p>
      <p className="mt-2 text-sm leading-6 text-ink-400">We use essential cookies to keep accounts secure. We do not load marketing or analytics cookies unless you choose to allow them. Read our <Link href="/privacy" className="font-semibold text-stamp-dark underline">Privacy Policy</Link>.</p>
      <div className="mt-4 flex flex-wrap gap-2">
        <button type="button" onClick={() => save('essential-only')} className="rounded border border-ink-200 px-4 py-2 text-sm font-semibold text-ink">Essential only</button>
        <button type="button" onClick={() => save('accepted')} className="rounded bg-stamp px-4 py-2 text-sm font-semibold text-white hover:bg-stamp-dark">Allow analytics</button>
      </div>
    </aside>
  )
}

export function CookieSettingsButton() {
  return <button type="button" onClick={() => window.dispatchEvent(new Event('magariyetu:cookie-settings'))} className="hover:text-white">Cookie settings</button>
}
