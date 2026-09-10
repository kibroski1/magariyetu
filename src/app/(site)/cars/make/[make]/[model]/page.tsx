import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ListingsView } from '@/components/listings/ListingsView'
import { Breadcrumbs } from '@/components/seo/Breadcrumbs'
import { getPayload } from '@/lib/payload'

async function findTaxonomy(makeSlug: string, modelSlug: string) {
  const payload = await getPayload()
  const result = await payload.find({ collection: 'listings', where: { and: [{ category: { equals: 'car' } }, { status: { equals: 'active' } }, { makeSlug: { equals: makeSlug } }, { modelSlug: { equals: modelSlug } }] }, depth: 0, limit: 1 })
  return result.docs[0] as any | undefined
}

export async function generateMetadata({ params }: { params: Promise<{ make: string; model: string }> }): Promise<Metadata> {
  const { make: makeSlug, model: modelSlug } = await params
  const listing = await findTaxonomy(makeSlug, modelSlug)
  if (!listing) return { robots: { index: false, follow: false } }
  return { title: `${listing.make} ${listing.model} for sale in Kenya`, description: `Browse active ${listing.make} ${listing.model} cars for sale in Kenya, with prices, specifications, and seller details.`, alternates: { canonical: `/cars/make/${makeSlug}/${modelSlug}` } }
}

export default async function ModelCarsPage({ params, searchParams }: { params: Promise<{ make: string; model: string }>; searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const { make: makeSlug, model: modelSlug } = await params
  const listing = await findTaxonomy(makeSlug, modelSlug)
  if (!listing) notFound()
  const makePath = `/cars/make/${makeSlug}`
  return <><Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Cars', href: '/cars' }, { label: listing.make, href: makePath }, { label: listing.model }]} /><ListingsView forcedCategory="car" forcedMake={listing.make} forcedModel={listing.model} title={`${listing.make} ${listing.model} for sale in Kenya`} description={`Active ${listing.make} ${listing.model} listings with current marketplace pricing.`} searchParams={searchParams} /></>
}
