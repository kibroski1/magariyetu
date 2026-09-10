import type { MetadataRoute } from 'next'
import { getPayload } from '@/lib/payload'
import { absoluteUrl, taxonomySlug } from '@/lib/seo'

const STATIC_PATHS = [
  '/', '/cars', '/sell', '/dealers', '/services', '/tools/import-duty-calculator', '/blog', '/guides', '/about', '/marketplace-rules', '/terms', '/privacy',
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = STATIC_PATHS.map((path) => ({
    url: absoluteUrl(path),
    changeFrequency: path === '/' || path === '/cars' ? 'daily' : 'monthly',
    priority: path === '/' ? 1 : path === '/cars' ? 0.9 : 0.6,
  }))

  const payload: any = await getPayload()
  const listings = await payload.find({
    collection: 'listings',
    where: { status: { equals: 'active' } },
    depth: 0,
    limit: 50000,
    pagination: false,
    sort: '-updatedAt',
  })

  const makeModelYearPaths = new Set<string>()
  for (const listing of listings.docs as any[]) {
    if (listing.seo?.indexing === 'noindex') continue
    entries.push({
      url: absoluteUrl(`/cars/${listing.slug}`),
      lastModified: new Date(listing.updatedAt),
      changeFrequency: 'weekly',
      priority: 0.8,
    })

    const make = listing.makeSlug || taxonomySlug(listing.make)
    const model = listing.modelSlug || taxonomySlug(listing.model)
    if (!make || !model) continue
    makeModelYearPaths.add(`/cars/make/${make}`)
    makeModelYearPaths.add(`/cars/make/${make}/${model}`)
    makeModelYearPaths.add(`/cars/make/${make}/${model}/${listing.yearOfManufacture}`)
  }

  for (const path of makeModelYearPaths) {
    entries.push({ url: absoluteUrl(path), changeFrequency: 'daily', priority: 0.7 })
  }

  const dealers = await payload.find({ collection: 'dealers', depth: 0, limit: 50000, pagination: false, sort: '-updatedAt' })
  for (const dealer of dealers.docs as any[]) {
    if (dealer.seo?.indexing === 'noindex') continue
    entries.push({ url: absoluteUrl(`/dealers/${dealer.slug}`), lastModified: new Date(dealer.updatedAt), changeFrequency: 'weekly', priority: 0.6 })
  }

  for (const collection of ['articles', 'guides'] as const) {
    const content = await payload.find({ collection, where: { status: { equals: 'published' } }, depth: 0, limit: 50000, pagination: false, sort: '-updatedAt' })
    const prefix = collection === 'articles' ? '/blog' : '/guides'
    for (const item of content.docs as any[]) {
      if (item.seo?.indexing !== 'noindex') entries.push({ url: absoluteUrl(`${prefix}/${item.slug}`), lastModified: new Date(item.updatedAt), changeFrequency: 'monthly', priority: 0.7 })
    }
  }

  return entries
}
