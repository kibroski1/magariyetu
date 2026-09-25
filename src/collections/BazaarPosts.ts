import type { CollectionConfig, Where } from 'payload'

const staff = (role?: string) => role === 'admin' || role === 'moderator'

export const BazaarPosts: CollectionConfig = {
  slug: 'bazaar-posts',
  admin: { useAsTitle: 'title', defaultColumns: ['title', 'event', 'status', 'createdAt'] },
  access: {
    read: ({ req: { user } }): boolean | Where => staff(user?.role) ? true : user ? { or: [{ status: { equals: 'published' } }, { owner: { equals: user.id } }] } : { status: { equals: 'published' } },
    create: ({ req: { user } }) => Boolean(user), update: ({ req: { user } }) => staff(user?.role), delete: ({ req: { user } }) => user?.role === 'admin',
  },
  fields: [
    { name: 'event', type: 'relationship', relationTo: 'bazaar-events', required: true, index: true }, { name: 'owner', type: 'relationship', relationTo: 'users', required: true, defaultValue: ({ user }) => user?.id },
    { name: 'title', type: 'text', required: true }, { name: 'vehicleDetails', type: 'text', required: true }, { name: 'description', type: 'textarea', required: true }, { name: 'askingPrice', type: 'number', min: 0 },
    { name: 'status', type: 'select', defaultValue: 'pending', options: ['pending', 'published', 'rejected'].map(value => ({ value, label: value })), access: { update: ({ req: { user } }) => staff(user?.role) } },
    { name: 'moderationNote', type: 'textarea', access: { update: ({ req: { user } }) => staff(user?.role) } },
}
  ],
  hooks: { beforeChange: [({ data, operation }) => { if (operation === 'create') data.status = 'pending'; return data }] },
