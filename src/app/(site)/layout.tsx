import React from 'react'
import { Navbar } from '@/components/site/Navbar'
import { Footer } from '@/components/site/Footer'
import { CookiePreferences } from '@/components/site/CookiePreferences'
import { AnalyticsTracker } from '@/components/site/AnalyticsTracker'

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 py-8">{children}</main>
      <Footer />
      <CookiePreferences />
      <AnalyticsTracker />
    </>
  )
}
