import type { CollectionConfig } from 'payload'

const staff = (role?: string) => role === 'admin' || role === 'moderator'

export const AuctionYards: CollectionConfig = {
  slug: 'auction-yards',
  admin: { useAsTitle: 'name', defaultColumns: ['name', 'town', 'county', 'updatedAt'], description: 'Auction centres and upcoming catalogues.' },
  access: { read: () => true, create: ({ req: { user } }) => staff(user?.role), update: ({ req: { user } }) => staff(user?.role), delete: ({ req: { user } }) => user?.role === 'admin' },
  fields: [
    { name: 'name', type: 'text', required: true }, { name: 'slug', type: 'text', required: true, unique: true, index: true }, { name: 'description', type: 'textarea' },
    { name: 'county', type: 'text', required: true }, { name: 'town', type: 'text' }, { name: 'physicalAddress', type: 'text' }, { name: 'contactPhone', type: 'text' }, { name: 'website', type: 'text' },
    { name: 'auctionDates', type: 'array', labels: { singular: 'Auction date', plural: 'Auction dates & offerings' }, fields: [
      { name: 'auctionDate', type: 'date', required: true, admin: { date: { pickerAppearance: 'dayAndTime' } } }, { name: 'title', type: 'text', required: true },
      { name: 'offering', type: 'textarea', required: true, admin: { description: 'Vehicles, machinery, lots or categories on offer.' } }, { name: 'catalogueUrl', type: 'text' },
    ] },
  ],
  hooks: { beforeValidate: [({ data }) => { if (data?.name && !data.slug) data.slug = data.name.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''); return data }] },
}
