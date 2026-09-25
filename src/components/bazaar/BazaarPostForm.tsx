'use client'
import { FormEvent, useState } from 'react'

export function BazaarPostForm({ eventId }: { eventId: string }) {
  const [message, setMessage] = useState('')
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); const form = event.currentTarget; setMessage('Submitting...')
    const response = await fetch('/api/bazaar-posts', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(Object.fromEntries(new FormData(form))) })
    const body = await response.json().catch(() => ({}))
    if (!response.ok) { setMessage(body.error || 'Unable to submit your post.'); return }
    form.reset(); setMessage('Thanks - your post is awaiting review.')
  }
  return <section className="rounded-lg border border-ink-100 bg-white p-5"><h2 className="font-display text-xl font-bold text-ink">What are you bringing?</h2><p className="mt-1 text-sm text-ink-400">Posts are reviewed before appearing publicly.</p><form onSubmit={submit} className="mt-4 grid gap-3 sm:grid-cols-2"><input type="hidden" name="event" value={eventId} /><input required name="title" maxLength={120} placeholder="Listing title" className="rounded border border-ink-100 px-3 py-2 text-sm sm:col-span-2" /><input required name="vehicleDetails" maxLength={180} placeholder="Make, model, year, mileage" className="rounded border border-ink-100 px-3 py-2 text-sm" /><input name="askingPrice" type="number" min="0" placeholder="Asking price (KES, optional)" className="rounded border border-ink-100 px-3 py-2 text-sm" /><textarea required name="description" maxLength={1200} rows={4} placeholder="Condition and key details" className="rounded border border-ink-100 px-3 py-2 text-sm sm:col-span-2" /><button className="w-fit rounded bg-stamp px-4 py-2 text-sm font-semibold text-white">Submit what I am bringing</button></form>{message && <p className="mt-3 text-sm text-ink-400">{message}</p>}</section>
}
