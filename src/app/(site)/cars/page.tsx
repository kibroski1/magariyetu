import { ListingsView } from '@/components/listings/ListingsView'
import type { Metadata } from 'next'

export async function generateMetadata({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }): Promise<Metadata> {
  const params = await searchParams
  const hasSearchFilters = Object.values(params).some((value) => Array.isArray(value) ? value.length > 0 : Boolean(value))
  return {
    title: 'Cars for sale in Kenya',
    description: 'Browse active cars for sale from private sellers and dealers across Kenya.',
    alternates: { canonical: '/cars' },
    // Individual filtered searches are useful to people but must not create an
    // unlimited set of near-duplicate search-index pages.
    robots: hasSearchFilters ? { index: false, follow: true } : { index: true, follow: true },
  }
}

export default function CarsPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  return <ListingsView forcedCategory="car" title="Cars" searchParams={searchParams} />
}
