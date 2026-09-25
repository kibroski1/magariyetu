import { getPayload } from '@/lib/payload'
import Link from 'next/link'

export default async function BazaarsPage() {
  const { docs: bazaars } = await (await getPayload()).find({ collection: 'bazaar-events' as any, limit: 100, sort: 'name' })

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-ink">Car Bazaars &amp; Events</h1>
        <p className="mt-1 text-ink-400">Discover upcoming physical car bazaars, entry fees, location details, and active listings.</p>
      </div>
      {bazaars.length ? (
        <div className="grid gap-6 md:grid-cols-2">
          {bazaars.map((bazaar: any) => (
            <article key={bazaar.id} className="rounded-xl border border-ink-100 bg-white p-6 shadow-sm">
              <h2 className="font-display text-2xl font-bold text-ink">{bazaar.name}</h2>
              <p className="mt-1 text-sm text-ink-400">{[bazaar.venue, bazaar.town, bazaar.county].filter(Boolean).join(', ')}</p>
              {bazaar.schedule && <p className="mt-3 text-sm font-medium text-stamp-dark">🗓 {bazaar.schedule}</p>}
              {bazaar.description && <p className="mt-3 text-sm leading-relaxed text-ink-400 line-clamp-3">{bazaar.description}</p>}
              <div className="mt-6">
                <Link href={`/bazaars/${bazaar.slug}`} className="inline-flex items-center text-sm font-semibold text-stamp-dark hover:underline">
                  View bazaar details &amp; listings →
                </Link>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="rounded-lg border border-dashed border-ink-100 bg-white p-8 text-ink-400">
          No car bazaar events listed yet. Check back soon!
        </div>
      )}
    </div>
  )
}