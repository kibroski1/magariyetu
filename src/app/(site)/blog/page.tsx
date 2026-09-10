import type { Metadata } from 'next'
import Link from 'next/link'
import { getPayload } from '@/lib/payload'

export const metadata: Metadata = { title: 'Car news and buying advice', description: 'Practical Kenyan car market news, buying advice, comparisons, and ownership guidance.', alternates: { canonical: '/blog' } }

export default async function BlogPage() {
  const payload: any = await getPayload()
  const { docs } = await payload.find({ collection: 'articles', where: { status: { equals: 'published' } }, sort: '-publishedAt', limit: 30 })
  return <div><h1 className="font-display text-3xl font-bold text-ink">Car news and buying advice</h1><div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{(docs as any[]).map((article) => <article key={article.id} className="rounded-lg border border-ink-100 bg-white p-5"><p className="text-xs text-ink-400">{article.publishedAt ? new Date(article.publishedAt).toLocaleDateString('en-KE') : ''}</p><h2 className="mt-2 font-display text-lg font-semibold text-ink"><Link href={`/blog/${article.slug}`} className="hover:underline">{article.title}</Link></h2><p className="mt-2 text-sm text-ink-400">{article.excerpt}</p></article>)}</div>{docs.length === 0 && <p className="mt-6 text-ink-400">Articles will appear here as they are published.</p>}</div>
}
