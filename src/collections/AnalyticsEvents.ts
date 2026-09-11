import type { CollectionConfig } from 'payload'

// Minimal first-party product analytics. It deliberately stores a one-way
// visitor key, not an IP address, name, phone number, message, or device ID.
export const AnalyticsEvents: CollectionConfig = {
  slug: 'analytics-events',
  admin: { useAsTitle: 'eventType', defaultColumns: ['eventType', 'path', 'occurredAt'] },
  access: {
    create: () => false,
    read: ({ req: { user } }) => user?.role === 'admin',
    update: () => false,
    delete: ({ req: { user } }) => user?.role === 'admin',
  },
  fields: [
    { name: 'eventType', type: 'select', required: true, index: true, options: ['page-view', 'search', 'listing-view', 'whatsapp-lead', 'sell-started', 'listing-submitted'].map(value => ({ value, label: value.replace(/-/g, ' ') })) },
    { name: 'path', type: 'text', required: true, index: true },
    { name: 'visitorKey', type: 'text', required: true, index: true, admin: { description: 'One-way server hash of a browser-local random identifier.' } },
    { name: 'occurredAt', type: 'date', required: true, index: true },
  ],
}
