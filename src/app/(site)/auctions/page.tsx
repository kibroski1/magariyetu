import { getPayload } from '@/lib/payload'

export default async function AuctionsPage() {
  const { docs } = await (await getPayload()).find({ collection: 'auction-yards' as any, limit: 100, sort: 'name' })
  const now = new Date()
  const dates = docs
    .flatMap((yard: any) =>
      (yard.auctionDates || [])
        .filter((item: any) => new Date(item.auctionDate) >= now)
        .map((item: any) => ({ ...item, yard }))
    )
    .sort((a: any, b: any) => new Date(a.auctionDate).getTime() - new Date(b.auctionDate).getTime())

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-ink">Auction yards &amp; upcoming sales</h1>
        <p className="mt-1 text-ink-400">Find upcoming vehicle and machinery auctions, where they are held, and what is on offer.</p>
      </div>
      {dates.length ? (
        <div className="grid gap-4 lg:grid-cols-2">
          {dates.map((item: any) => (
            <article key={item.id} className="rounded-lg border border-ink-100 bg-white p-5">
              <p className="text-sm font-semibold text-stamp-dark">
                {new Intl.DateTimeFormat('en-KE', { dateStyle: 'full', timeStyle: 'short' }).format(new Date(item.auctionDate))}
              </p>
              <h2 className="mt-2 font-display text-xl font-bold text-ink">{item.title}</h2>
              <p className="mt-1 text-sm font-semibold text-ink-400">
                {item.yard.name} · {[item.yard.town, item.yard.county].filter(Boolean).join(', ')}
              </p>
              <p className="mt-4 text-sm leading-6 text-ink-400">{item.offering}</p>
              {item.catalogueUrl && (
                <a className="mt-4 inline-block text-sm font-semibold text-stamp-dark" href={item.catalogueUrl} target="_blank" rel="noreferrer">
                  View catalogue or register →
                </a>
              )}
            </article>
          ))}
        </div>
      ) : (
        <div className="rounded-lg border border-dashed border-ink-100 bg-white p-8 text-ink-400">
          No upcoming auction dates have been published yet. Please check back soon.
        </div>
      )}
    </div>
  )
}