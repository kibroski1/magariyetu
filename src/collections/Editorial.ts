import type { CollectionConfig, Where } from 'payload'

function editorialCollection(slug: 'articles' | 'guides', singular: string): CollectionConfig {
  return {
    slug,
    admin: { useAsTitle: 'title', defaultColumns: ['title', 'status', 'publishedAt', 'updatedAt'] },
    access: {
      read: ({ req: { user } }): boolean | Where => user?.role === 'admin' || user?.role === 'moderator' ? true : { status: { equals: 'published' } },
      create: ({ req: { user } }) => user?.role === 'admin' || user?.role === 'moderator',
      update: ({ req: { user } }) => user?.role === 'admin' || user?.role === 'moderator',
      delete: ({ req: { user } }) => user?.role === 'admin',
    },
    fields: [
      { name: 'title', type: 'text', required: true },
      { name: 'slug', type: 'text', required: true, unique: true, index: true },
      { name: 'excerpt', type: 'textarea', required: true, maxLength: 300 },
      { name: 'body', type: 'textarea', required: true },
      { name: 'coverImage', type: 'upload', relationTo: 'media' },
      { name: 'authorName', type: 'text', required: true },
      { name: 'publishedAt', type: 'date', admin: { position: 'sidebar' } },
      { name: 'status', type: 'select', required: true, defaultValue: 'draft', options: [{ label: 'Draft', value: 'draft' }, { label: 'Published', value: 'published' }], admin: { position: 'sidebar' } },
      { name: 'sources', type: 'array', fields: [{ name: 'label', type: 'text', required: true }, { name: 'url', type: 'text', required: true }] },
      { name: 'seo', type: 'group', fields: [{ name: 'metaTitle', type: 'text', maxLength: 60 }, { name: 'metaDescription', type: 'textarea', maxLength: 160 }, { name: 'indexing', type: 'select', defaultValue: 'auto', options: [{ label: 'Automatic', value: 'auto' }, { label: 'Allow indexing', value: 'index' }, { label: 'Do not index', value: 'noindex' }] }] },
    ],
    hooks: { beforeValidate: [({ data }) => { if (data?.title && !data.slug) data.slug = data.title.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''); if (data?.status === 'published' && !data.publishedAt) data.publishedAt = new Date().toISOString(); return data }] },
    labels: { singular, plural: slug === 'articles' ? 'Articles' : 'Guides' },
  }
}

export const Articles = editorialCollection('articles', 'Article')
export const Guides = editorialCollection('guides', 'Guide')
