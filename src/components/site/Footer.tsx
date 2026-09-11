import Link from 'next/link'
import Image from 'next/image'
import { CookieSettingsButton } from './CookiePreferences'

const SOCIAL_LINKS = [
  { label: 'Facebook', href: process.env.NEXT_PUBLIC_FACEBOOK_URL || '/contact', icon: <path d="M14 8h3V2.3c-.5-.1-2.1-.3-4-.3-4 0-6.7 2.4-6.7 6.8V13H2v6h4.3v15h6.1V19h4.8l.8-6h-5.6V9.4c0-1.7.5-2.9 2.6-2.9Z" /> },
  { label: 'X (Twitter)', href: process.env.NEXT_PUBLIC_TWITTER_URL || '/contact', icon: <path d="M18.9 2h4.9L13.1 14.2 25.7 31H16l-7.6-10-8.8 10H-4l11.5-13.1L-4.6 2h10l6.9 9.2L18.9 2Zm-1.7 26h2.7L4 4.8H1.1L17.2 28Z" /> },
  { label: 'Instagram', href: process.env.NEXT_PUBLIC_INSTAGRAM_URL || '/contact', icon: <path d="M9.5 2h13C27.7 2 32 6.3 32 11.5v13c0 5.2-4.3 9.5-9.5 9.5h-13C4.3 34 0 29.7 0 24.5v-13C0 6.3 4.3 2 9.5 2Zm-.2 3.5C5.9 5.5 3.5 7.9 3.5 11.3v13.4c0 3.4 2.4 5.8 5.8 5.8h13.4c3.4 0 5.8-2.4 5.8-5.8V11.3c0-3.4-2.4-5.8-5.8-5.8H9.3Zm14.5 2.6a2.1 2.1 0 1 1 0 4.2 2.1 2.1 0 0 1 0-4.2ZM16 10a7.4 7.4 0 1 1 0 14.8A7.4 7.4 0 0 1 16 10Zm0 3.5a3.9 3.9 0 1 0 0 7.8 3.9 3.9 0 0 0 0-7.8Z" /> },
  { label: 'YouTube', href: process.env.NEXT_PUBLIC_YOUTUBE_URL || '/contact', icon: <path d="M31.3 8.3a4 4 0 0 0-2.8-2.8C26 5 16 5 16 5S6 5 3.5 5.5A4 4 0 0 0 .7 8.3C.2 10.8.2 16 .2 16s0 5.2.5 7.7a4 4 0 0 0 2.8 2.8C6 27 16 27 16 27s10 0 12.5-.5a4 4 0 0 0 2.8-2.8c.5-2.5.5-7.7.5-7.7s0-5.2-.5-7.7ZM12.8 20V12l6.9 4-6.9 4Z" /> },
  { label: 'TikTok', href: process.env.NEXT_PUBLIC_TIKTOK_URL || '/contact', icon: <path d="M25.8 7.8a8.3 8.3 0 0 1-4.7-4.7h-4.6v18.1a4.1 4.1 0 1 1-4.1-4.1c.4 0 .7 0 1 .1v-4.7a8.8 8.8 0 1 0 8.7 8.7v-9.4a12.8 12.8 0 0 0 7.5 2.5V9.7c-1.3 0-2.6-.7-3.8-1.9Z" /> },
]

export function Footer() {
  return (
    <footer className="mt-14 border-t border-ink-100 bg-ink text-ink-50">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2">
            <Image src="/brand/magariyetu-mark.png" alt="" width={42} height={42} className="rounded-[8px]" />
            <p className="font-display text-lg font-bold uppercase text-white">Magariyetu</p>
          </div>
          <p className="mt-2 text-sm text-ink-100">Kenya&apos;s marketplace for new, imported, and locally used vehicles &amp; heavy machinery.</p>
          <div className="mt-5">
            <p className="font-mono text-xs uppercase tracking-widest text-stamp">Follow us</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {SOCIAL_LINKS.map((social) => (
                <Link key={social.label} href={social.href} aria-label={social.href === '/contact' ? `${social.label} — contact us for our official profile` : social.label} className="flex h-9 w-9 items-center justify-center rounded border border-white/20 text-white transition hover:border-stamp hover:bg-stamp hover:text-ink">
                  <svg aria-hidden="true" viewBox="0 0 32 36" className="h-4 w-4 fill-current">{social.icon}</svg>
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div>
          <p className="font-display text-sm uppercase tracking-wide text-stamp">Browse</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link href="/cars?condition=brand-new">Brand new cars</Link></li>
            <li><Link href="/cars?condition=foreign-used">Fresh imports</Link></li>
            <li><Link href="/cars?condition=locally-used">Locally used cars</Link></li>
            <li><Link href="/heavy-machinery">Heavy machinery</Link></li>
          </ul>
        </div>
        <div>
          <p className="font-display text-sm uppercase tracking-wide text-stamp">Sell</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link href="/sell">Post a listing</Link></li>
            <li><Link href="/pricing">Featured ad plans</Link></li>
            <li><Link href="/dashboard">Dealer dashboard</Link></li>
          </ul>
        </div>
        <div>
          <p className="font-display text-sm uppercase tracking-wide text-stamp">Tools</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link href="/tools/import-duty-calculator">Import duty calculator</Link></li>
            <li><Link href="/guides">Buyer guides</Link></li>
            <li><Link href="/blog">Car news & advice</Link></li>
          </ul>
        </div>
      </div>
      <div className="flex flex-col items-center gap-2 border-t border-ink-700 px-4 py-4 text-center text-xs text-ink-100 sm:flex-row sm:justify-between">
        <span>© {new Date().getFullYear()} Magariyetu. Not affiliated with KRA or NTSA — duty estimates are informational only.</span>
        <span className="flex gap-4">
          <Link href="/terms" className="hover:text-white">Terms of Service</Link>
          <Link href="/privacy" className="hover:text-white">Privacy Policy</Link>
          <CookieSettingsButton />
          <Link href="/marketplace-rules" className="hover:text-white">Marketplace rules</Link>
          <Link href="/about" className="hover:text-white">About</Link>
        </span>
      </div>
    </footer>
  )
}
