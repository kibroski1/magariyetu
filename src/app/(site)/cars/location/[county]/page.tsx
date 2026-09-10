import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ListingsView } from '@/components/listings/ListingsView'
import { Breadcrumbs } from '@/components/seo/Breadcrumbs'
import { getPayload } from '@/lib/payload'
import { taxonomySlug } from '@/lib/seo'

const COUNTIES = ['Nairobi', 'Mombasa', 'Kiambu', 'Nakuru', 'Uasin Gishu', 'Kisumu', 'Machakos', 'Kajiado', 'Kilifi', 'Meru', 'Nyeri']

function countyFromSlug(slug: string) {
  return COUNTIES.find((county) => taxonomySlug(county) === slug)
}

async function listingCount(county: string) {
  return (await (await getPayload()).count({ collection: 'listings', where: { and: [{ category: { equals: 'car' } }, { status: { equals: 'active' } }, { county: { equals: county } }] } })).totalDocs
}

export async function generateMetadata({ params }: { params: Promise<{ county: string }> }): Promise<Metadata> {
  const county = countyFromSlug((await params).county)
  if (!county) return { robots: { index: false, follow: false } }
  const count = await listingCount(county)
  return {
    title: `Cars for sale in ${county}, Kenya`,
    description: `Browse active cars for sale in ${county}, Kenya from private sellers and dealers.`,
    alternates: { canonical: `/cars/location/${taxonomySlug(county)}` },
    // A local page is indexable only after it has meaningful unique stock.
    robots: count >= 3 ? { index: true, follow: true } : { index: false, follow: true },
  }
}

export default async function CountyCarsPage({ params, searchParams }: { params: Promise<{ county: string }>; searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const county = countyFromSlug((await params).county)
  if (!county) notFound()
  return <><Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Cars', href: '/cars' }, { label: county }]} /><ListingsView forcedCategory="car" forcedCounty={county} title={`Cars for sale in ${county}, Kenya`} description={`Current car listings in ${county}. Listings are shown only while they are active.`} searchParams={searchParams} /></>
}
