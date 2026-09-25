import type { CollectionConfig } from 'payload'

const staff = (role?: string) => role === 'admin' || role === 'staff'

export const BazaarPosts: CollectionConfig = {
  slug: 'bazaar-posts',
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'vehicleDetails', type: 'text', required: true },
    { name: 'description', type: 'textarea', required: true },
    { name: 'askingPrice', type: 'number', min: 0 },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'pending',
      options: ['pending', 'published', 'rejected'].map(value => ({ value, label: value })),
      access: { update: ({ req: { user } }) => staff(user?.role) },
    },
    {
      name: 'moderationNote',
      type: 'textarea',
      access: { update: ({ req: { user } }) => staff(user?.role) },
    },
  ],
  hooks: {
    beforeChange: [
      ({ data, operation }) => {
        if (operation === 'create') data.status = 'pending'
        return data
      },
    ],
  },
}