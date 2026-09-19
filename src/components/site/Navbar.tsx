'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

const browseLinks = [
  { name: 'Cars', href: '/cars' },
  { name: 'Trucks & lorries', href: '/trucks' },
  { name: 'Motorbikes', href: '/motorbikes' },
  { name: 'Tuk-tuks', href: '/tuktuks' },
  { name: 'Heavy machinery', href: '/heavy-machinery' },
  { name: 'Parts & services', href: '/services' },
]

export function Navbar() {
  const [browseOpen, setBrowseOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  const closeAllMenus = () => {
    setBrowseOpen(false)
    setMenuOpen(false)
  }

  const toggleBrowse = () => {
    setBrowseOpen((open) => !open)
    setMenuOpen(false)
  }

  const toggleMobileMenu = () => {
    setMenuOpen((open) => !open)
    setBrowseOpen(false)
  }

  return (
    <header className="sticky top-0 z-30 border-b border-ink-100/80 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6 lg:px-8">

        {/* Logo */}
        <Link
          href="/"
          onClick={closeAllMenus}
          className="flex shrink-0 items-center gap-2"
          aria-label="Magariyetu home"
        >
          <Image
            src="/brand/magariyetu-mark.png"
            alt=""
            width={38}
            height={38}
            priority
            className="rounded-[7px]"
          />

          <span className="font-display text-xl font-bold tracking-tight text-ink">
            MAGARI<span className="text-stamp-dark">YETU</span>
          </span>
        </Link>

        {/* Desktop navigation */}
        <nav
          className="hidden items-center gap-1 lg:flex"
          aria-label="Primary navigation"
        >
          {/* Browse vehicles dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={toggleBrowse}
              className="flex cursor-pointer items-center gap-1 rounded px-3 py-2 text-sm font-semibold text-ink transition hover:bg-paper hover:text-stamp-dark"
              aria-expanded={browseOpen}
              aria-haspopup="true"
            >
              Browse vehicles

              <span
                className={`text-xs transition-transform ${
                  browseOpen ? 'rotate-180' : ''
                }`}
              >
                ⌄
              </span>
            </button>

            {browseOpen && (
              <div className="absolute left-0 top-full mt-2 grid w-80 grid-cols-2 gap-1 rounded-lg border border-ink-100 bg-white p-2 shadow-lg">
                {browseLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={closeAllMenus}
                    className="rounded px-3 py-2 text-sm text-ink-400 transition hover:bg-paper hover:text-ink"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Sell */}
          <Link
            href="/sell"
            onClick={closeAllMenus}
            className="rounded px-3 py-2 text-sm font-semibold text-ink transition hover:bg-paper hover:text-stamp-dark"
          >
            Sell
          </Link>

          {/* Services */}
          <Link
            href="/services"
            onClick={closeAllMenus}
            className="rounded px-3 py-2 text-sm font-semibold text-ink transition hover:bg-paper hover:text-stamp-dark"
          >
            Services
          </Link>

          {/* Duty calculator */}
          <Link
            href="/tools/import-duty-calculator"
            onClick={closeAllMenus}
            className="rounded px-3 py-2 text-sm font-semibold text-ink transition hover:bg-paper hover:text-stamp-dark"
          >
            Duty calculator
          </Link>
        </nav>

        {/* Desktop account actions */}
        <div className="ml-auto hidden items-center gap-3 sm:flex">
          <Link
            href="/login"
            onClick={closeAllMenus}
            className="text-sm font-semibold text-ink-400 transition hover:text-ink"
          >
            Sign in
          </Link>

          <Link
            href="/sell"
            onClick={closeAllMenus}
            className="rounded bg-stamp px-4 py-2 text-sm font-semibold text-white transition hover:bg-stamp-dark"
          >
            Post an ad
          </Link>
        </div>

        {/* Mobile navigation */}
        <div className="relative ml-auto lg:hidden">
          <button
            type="button"
            onClick={toggleMobileMenu}
            className="cursor-pointer rounded border border-ink-100 px-3 py-2 text-sm font-semibold text-ink"
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
          >
            Menu
          </button>

          {menuOpen && (
            <nav
              id="mobile-navigation"
              className="absolute right-0 top-full mt-2 w-72 rounded-lg border border-ink-100 bg-white p-2 shadow-lg"
              aria-label="Mobile navigation"
            >
              {/* Browse vehicle links */}
              {browseLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeAllMenus}
                  className="block rounded px-3 py-2 text-sm text-ink hover:bg-paper"
                >
                  {link.name}
                </Link>
              ))}

              <div className="my-2 border-t border-ink-100" />

              {/* Services */}
              <Link
                href="/services"
                onClick={closeAllMenus}
                className="block rounded px-3 py-2 text-sm text-ink hover:bg-paper"
              >
                Services
              </Link>

              {/* Verified dealers */}
              <Link
                href="/dealers"
                onClick={closeAllMenus}
                className="block rounded px-3 py-2 text-sm text-ink hover:bg-paper"
              >
                Verified dealers
              </Link>

              {/* Duty calculator */}
              <Link
                href="/tools/import-duty-calculator"
                onClick={closeAllMenus}
                className="block rounded px-3 py-2 text-sm text-ink hover:bg-paper"
              >
                Duty calculator
              </Link>

              {/* Sign in */}
              <Link
                href="/login"
                onClick={closeAllMenus}
                className="block rounded px-3 py-2 text-sm text-ink hover:bg-paper"
              >
                Sign in
              </Link>

              {/* Post an ad */}
              <Link
                href="/sell"
                onClick={closeAllMenus}
                className="mt-2 block rounded bg-stamp px-3 py-2 text-center text-sm font-semibold text-white"
              >
                Post an ad
              </Link>
            </nav>
          )}
        </div>

      </div>
    </header>
  )
} 