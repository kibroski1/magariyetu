import type { Metadata } from 'next'
import React from 'react'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'),
  title: {
    default: 'Magariyetu — Buy & sell vehicles and machinery in Kenya',
    template: '%s | Magariyetu',
  },
  description:
    'New, locally assembled, imported and locally used cars, trucks, and heavy machinery — from individuals and verified dealers across Kenya.',
  openGraph: {
    siteName: 'Magariyetu',
    type: 'website',
    locale: 'en_KE',
  },
  verification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION } : undefined,
  manifest: '/site.webmanifest',
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-48.png', sizes: '48x48', type: 'image/png' },
      { url: '/favicon-96.png', sizes: '96x96', type: 'image/png' },
      { url: '/favicon-144.png', sizes: '144x144', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Magariyetu',
    url: process.env.NEXT_PUBLIC_SERVER_URL || 'https://magariyetu.co.ke',
    description: 'Kenya’s marketplace for cars, trucks, machinery, parts and vehicle services.',
  }

  return (
    <html lang="en">
      <body>
        {/* eslint-disable-next-line react/no-danger */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
        {children}
      </body>
    </html>
  )
}
