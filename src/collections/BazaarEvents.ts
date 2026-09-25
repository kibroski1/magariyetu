import type { CollectionConfig } from 'payload'

const staff = (role?: string) => role === 'admin' || role === 'moderator'

export const BazaarEvents: CollectionConfig = {
  slug: 'bazaar-events',
  admin: { useAsTitle: 'title', defaultColumns: ['title', 'eventDate', 'town', 'status'] },
  access: { read: ({ req: { user } }) => staff(user?.role) ? true : { status: { equals: 'published' } }, create: ({ req: { user } }) => staff(user?.role), update: ({ req: { user } }) => staff(user?.role), delete: ({ req: { user } }) => user?.role === 'admin' },
  fields: [
    { name: 'title', type: 'text', required: true }, { name: 'slug', type: 'text', required: true, unique: true, index: true },
    { name: 'eventDate', type: 'date', required: true, index: true, admin: { date: { pickerAppearance: 'dayAndTime' } } }, { name: 'description', type: 'textarea', required: true },
    { name: 'county', type: 'text', required: true }, { name: 'town', type: 'text', required: true }, { name: 'venue', type: 'text', required: true }, { name: 'entryNotes', type: 'textarea' },
    { name: 'status', type: 'select', defaultValue: 'draft', options: ['draft', 'published', 'cancelled'].map(value => ({ value, label: value })), access: { update: ({ req: { user } }) => staff(user?.role) } },
  ],
  hooks: { beforeValidate: [({ data }) => { if (data?.title && !data.slug) data.slug = data.title.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''); return data }] },
}
