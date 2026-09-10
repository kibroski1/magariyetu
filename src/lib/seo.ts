const fallbackServerUrl = 'http://localhost:3000'

export function siteUrl(): URL {
  const configured = process.env.NEXT_PUBLIC_SERVER_URL || fallbackServerUrl
  try {
    return new URL(configured)
  } catch {
    return new URL(fallbackServerUrl)
  }
}

export function absoluteUrl(pathname: string): string {
  return new URL(pathname, siteUrl()).toString()
}

// Database values can contain spaces, casing, or punctuation. URLs must not.
// This deliberately has no random suffix: it is for deterministic taxonomy URLs.
export function taxonomySlug(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

export function canonicalPath(pathname: string): string {
  return pathname.startsWith('/') ? pathname : `/${pathname}`
}
