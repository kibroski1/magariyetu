import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ListingsView } from '@/components/listings/ListingsView'
import { Breadcrumbs } from '@/components/seo/Breadcrumbs'
import { getPayload } from '@/lib/payload'
import { taxonomySlug } from '@/lib/seo'

async function findMake(slug: string) {
  const payload = await getPayload()
  const result = await payload.find({ collection: 'listings', where: { and: [{ category: { equals: 'car' } }, { status: { equals: 'active' } }, { makeSlug: { equals: slug } }] }, depth: 0, limit: 1 })
  return (result.docs[0] as any)?.make as string | undefined
}

export async function generateMetadata({ params }: { params: Promise<{ make: string }> }): Promise<Metadata> {
  const make = await findMake((await params).make)
  if (!make) return { robots: { index: false, follow: false } }
  return {
    title: `${make} cars for sale in Kenya`,
    description: `Browse active ${make} cars for sale in Kenya from private sellers and dealers.`,
    alternates: { canonical: `/cars/make/${taxonomySlug(make)}` },
  }
}

export default async function MakeCarsPage({ params, searchParams }: { params: Promise<{ make: string }>; searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const make = await findMake((await params).make)
  if (!make) notFound()
  return <><Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Cars', href: '/cars' }, { label: make }]} /><ListingsView forcedCategory="car" forcedMake={make} title={`${make} cars for sale in Kenya`} description={`Active ${make} listings from sellers and dealers across Kenya.`} searchParams={searchParams} /></>
}
