import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Marketplace Rules', description: 'Rules for posting and using the Magariyetu marketplace safely and honestly.', alternates: { canonical: '/marketplace-rules' } }

export default function MarketplaceRulesPage() {
  return <article className="mx-auto max-w-3xl"><h1 className="font-display text-3xl font-bold text-ink">Marketplace Rules</h1><div className="mt-6 space-y-5 text-ink-400"><p>Post accurate vehicle details, current prices, authentic photographs, and a truthful availability status. Do not publish duplicate, misleading, stolen, illegal, or fraudulent listings.</p><p>Only represent a dealer, business, or vehicle when you are authorised to do so. Verification badges reflect Magariyetu&apos;s documented checks and must not be imitated or misrepresented.</p><p>Do not request advance fees or use the marketplace to pressure buyers into unsafe payments. Buyers and sellers should inspect vehicles and verify documents independently before transacting.</p><p>Report suspicious activity using the report control on a listing or contact the moderation team. We may remove listings, restrict accounts, or cooperate with lawful requests where required.</p></div></article>
}
