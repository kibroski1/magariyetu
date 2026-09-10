import type { Metadata } from 'next'
import Link from 'next/link'
import { getPayload } from '@/lib/payload'

export const metadata: Metadata = { title: 'Kenya car buying guides', description: 'Guides to buying, importing, valuing, and owning a vehicle in Kenya.', alternates: { canonical: '/guides' } }

export default async function GuidesPage() {
  const payload: any = await getPayload()
  const { docs } = await payload.find({ collection: 'guides', where: { status: { equals: 'published' } }, sort: '-publishedAt', limit: 30 })
  return <div><h1 className="font-display text-3xl font-bold text-ink">Kenya car buying guides</h1><div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{(docs as any[]).map((guide) => <article key={guide.id} className="rounded-lg border border-ink-100 bg-white p-5"><p className="text-xs text-ink-400">Updated {new Date(guide.updatedAt).toLocaleDateString('en-KE')}</p><h2 className="mt-2 font-display text-lg font-semibold text-ink"><Link href={`/guides/${guide.slug}`} className="hover:underline">{guide.title}</Link></h2><p className="mt-2 text-sm text-ink-400">{guide.excerpt}</p></article>)}</div>{docs.length === 0 && <p className="mt-6 text-ink-400">Guides will appear here as they are published.</p>}</div>
}
