import { redirect } from 'next/navigation'
import { getCurrentUser } from '@/lib/auth'
import { getPayload } from '@/lib/payload'

export const dynamic = 'force-dynamic'

export default async function PlatformAnalyticsPage() {
  const user = await getCurrentUser()
  if (user?.role !== 'admin') redirect('/dashboard')
  const payload = await getPayload()
  const since = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
  const [events, users, listings, activeListings, dealers, verifiedDealers, pendingListings] = await Promise.all([
    payload.find({ collection: 'analytics-events' as any, where: { occurredAt: { greater_than_equal: since } }, limit: 10000, sort: '-occurredAt', overrideAccess: true }),
    payload.count({ collection: 'users', overrideAccess: true }),
    payload.count({ collection: 'listings', overrideAccess: true }),
    payload.count({ collection: 'listings', where: { status: { equals: 'active' } }, overrideAccess: true }),
    payload.count({ collection: 'dealers', overrideAccess: true }),
    payload.count({ collection: 'dealers', where: { verificationStatus: { equals: 'verified' } }, overrideAccess: true }),
    payload.count({ collection: 'listings', where: { status: { equals: 'pending-review' } }, overrideAccess: true }),
  ])
  const docs = events.docs as any[]
  const visitors = new Set(docs.map(event => event.visitorKey)).size
  const pageViews = docs.filter(event => event.eventType === 'page-view').length
  const leads = docs.filter(event => event.eventType === 'whatsapp-lead').length
  const stats = [
    { label: 'Unique visitors (7 days)', value: visitors.toLocaleString() }, { label: 'Page views (7 days)', value: pageViews.toLocaleString() },
    { label: 'Registered users', value: users.totalDocs.toLocaleString() }, { label: 'All listings', value: listings.totalDocs.toLocaleString() },
    { label: 'Active listings', value: activeListings.totalDocs.toLocaleString() }, { label: 'Pending review', value: pendingListings.totalDocs.toLocaleString() },
    { label: 'Dealers', value: dealers.totalDocs.toLocaleString() }, { label: 'Verified dealers', value: verifiedDealers.totalDocs.toLocaleString() },
    { label: 'WhatsApp leads (7 days)', value: leads.toLocaleString() },
  ]
  const topPaths = Object.entries(docs.reduce<Record<string, number>>((total, event) => { total[event.path] = (total[event.path] || 0) + 1; return total }, {})).sort((a, b) => b[1] - a[1]).slice(0, 8)

  return <div className="space-y-8"><div><p className="font-mono text-xs uppercase tracking-widest text-stamp-dark">Admin only</p><h2 className="mt-1 font-display text-2xl font-bold text-ink">Marketplace analytics</h2><p className="mt-2 text-sm text-ink-400">First-party, consented activity from the past 7 days. Visitor counts are estimates based on browser-local anonymous IDs.</p></div><section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{stats.map(stat => <div key={stat.label} className="rounded-lg border border-ink-100 bg-white p-5"><p className="text-xs uppercase tracking-wide text-ink-400">{stat.label}</p><p className="mt-1 font-display text-2xl font-bold text-ink">{stat.value}</p></div>)}</section><section className="rounded-lg border border-ink-100 bg-white p-5"><h3 className="font-display text-lg font-semibold text-ink">Most visited paths</h3><div className="mt-4 space-y-2">{topPaths.length ? topPaths.map(([path, count]) => <div key={path} className="flex justify-between border-b border-ink-50 pb-2 text-sm"><span className="font-mono text-ink">{path}</span><span className="text-ink-400">{count} events</span></div>) : <p className="text-sm text-ink-400">No consented analytics events yet.</p>}</div></section></div>
}
