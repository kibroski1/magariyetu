import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ListingsView } from '@/components/listings/ListingsView'
import { Breadcrumbs } from '@/components/seo/Breadcrumbs'
import { getPayload } from '@/lib/payload'

async function findTaxonomy(makeSlug: string, modelSlug: string, year: number) {
  const payload = await getPayload()
  const result = await payload.find({ collection: 'listings', where: { and: [{ category: { equals: 'car' } }, { status: { equals: 'active' } }, { yearOfManufacture: { equals: year } }, { makeSlug: { equals: makeSlug } }, { modelSlug: { equals: modelSlug } }] }, depth: 0, limit: 1 })
  return result.docs[0] as any | undefined
}

export async function generateMetadata({ params }: { params: Promise<{ make: string; model: string; year: string }> }): Promise<Metadata> {
  const { make: makeSlug, model: modelSlug, year: yearParam } = await params
  const year = Number(yearParam)
  const listing = Number.isInteger(year) ? await findTaxonomy(makeSlug, modelSlug, year) : undefined
  if (!listing) return { robots: { index: false, follow: false } }
  return { title: `${year} ${listing.make} ${listing.model} for sale in Kenya`, description: `Browse active ${year} ${listing.make} ${listing.model} cars for sale in Kenya, with prices and specifications.`, alternates: { canonical: `/cars/make/${makeSlug}/${modelSlug}/${year}` } }
}

export default async function YearCarsPage({ params, searchParams }: { params: Promise<{ make: string; model: string; year: string }>; searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const { make: makeSlug, model: modelSlug, year: yearParam } = await params
  const year = Number(yearParam)
  const listing = Number.isInteger(year) ? await findTaxonomy(makeSlug, modelSlug, year) : undefined
  if (!listing) notFound()
  return <><Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Cars', href: '/cars' }, { label: listing.make, href: `/cars/make/${makeSlug}` }, { label: listing.model, href: `/cars/make/${makeSlug}/${modelSlug}` }, { label: String(year) }]} /><ListingsView forcedCategory="car" forcedMake={listing.make} forcedModel={listing.model} forcedYear={year} title={`${year} ${listing.make} ${listing.model} for sale in Kenya`} description={`Active ${year} ${listing.make} ${listing.model} listings with current marketplace pricing.`} searchParams={searchParams} /></>
}
