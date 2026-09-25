import { getPayload } from '@/lib/payload'
import { notFound } from 'next/navigation'
import { BazaarPostForm } from '@/components/bazaar/BazaarPostForm'

export default async function BazaarDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const payload = await getPayload()

  const { docs: bazaars } = await payload.find({
    collection: 'bazaar-events' as any,
    where: { slug: { equals: slug } },
    limit: 1,
  })

  const bazaar = bazaars[0]
  if (!bazaar) notFound()

  const { docs: posts } = await payload.find({
    collection: 'bazaar-posts' as any,
    where: { bazaar: { equals: bazaar.id }, status: { equals: 'published' } },
    sort: '-createdAt',
  })

  return (
    <div className="space-y-10">
      <header className="border-b border-ink-100 pb-8">
        <h1 className="font-display text-3xl font-bold text-ink">{bazaar.name}</h1>
        <p className="mt-1 text-ink-400">{[bazaar.venue, bazaar.town, bazaar.county].filter(Boolean).join(', ')}</p>
        {bazaar.schedule && <p className="mt-2 text-sm font-medium text-stamp-dark">🗓 {bazaar.schedule}</p>}
        {bazaar.description && <p className="mt-4 text-ink-400 leading-relaxed">{bazaar.description}</p>}
      </header>

      <section>
        <h2 className="font-display text-2xl font-bold text-ink mb-6">Vehicles on display / for sale</h2>
        {posts.length ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post: any) => (
              <div key={post.id} className="rounded-lg border border-ink-100 bg-white p-5 shadow-sm">
                <h3 className="font-bold text-ink text-lg">{post.title}</h3>
                <p className="text-sm font-semibold text-stamp-dark mt-1">{post.vehicleDetails}</p>
                {post.askingPrice && (
                  <p className="text-lg font-bold text-ink mt-2">
                    KES {Number(post.askingPrice).toLocaleString('en-KE')}
                  </p>
                )}
                <p className="text-sm text-ink-400 mt-3 leading-relaxed">{post.description}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-ink-400 italic">No published listings for this bazaar yet.</p>
        )}
      </section>

      <section className="rounded-xl border border-ink-100 bg-neutral-50 p-6 md:p-8">
        <h2 className="font-display text-2xl font-bold text-ink mb-2">Attending this bazaar?</h2>
        <p className="text-sm text-ink-400 mb-6">Post your vehicle here so buyers can find you on bazaar day.</p>
        <BazaarPostForm eventId={String(bazaar.id)} />
      </section>
    </div>
  )
}
