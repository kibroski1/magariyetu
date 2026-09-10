import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-start justify-center px-4 py-16">
      <p className="font-mono text-sm uppercase tracking-widest text-stamp-dark">404 — page not found</p>
      <h1 className="mt-3 font-display text-4xl font-bold text-ink">We couldn&apos;t find that page.</h1>
      <p className="mt-4 max-w-xl text-ink-400">The listing may have expired, been removed, or the link may be incomplete. Browse current stock or return to the homepage.</p>
      <div className="mt-7 flex flex-wrap gap-3">
        <Link href="/cars" className="rounded bg-stamp px-5 py-3 text-sm font-semibold text-white hover:bg-stamp-dark">Browse cars</Link>
        <Link href="/" className="rounded border border-ink-100 px-5 py-3 text-sm font-semibold text-ink hover:bg-white">Go home</Link>
      </div>
    </main>
  )
}
