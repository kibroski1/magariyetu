'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

const CONSENT_KEY = 'magariyetu-cookie-preference'
const VISITOR_KEY = 'magariyetu-anonymous-visitor'

function visitorId() {
  let id = window.localStorage.getItem(VISITOR_KEY)
  if (!id) {
    id = crypto.randomUUID()
    window.localStorage.setItem(VISITOR_KEY, id)
  }
  return id
}

export function trackAnalytics(eventType: 'page-view' | 'search' | 'listing-view' | 'whatsapp-lead' | 'sell-started' | 'listing-submitted', path = window.location.pathname) {
  if (window.localStorage.getItem(CONSENT_KEY) !== 'accepted') return
  void fetch('/api/analytics/event', { method: 'POST', headers: { 'Content-Type': 'application/json' }, keepalive: true, body: JSON.stringify({ eventType, path, visitorId: visitorId() }) })
}

export function AnalyticsTracker() {
  const pathname = usePathname()

  useEffect(() => {
    const send = () => trackAnalytics('page-view', pathname)
    send()
    window.addEventListener('magariyetu:cookie-consent', send)
    return () => window.removeEventListener('magariyetu:cookie-consent', send)
  }, [pathname])

  return null
}
