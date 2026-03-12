import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/constants'

const subpages = ['/docs', '/changelog', '/roadmap']
const now = new Date()

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${SITE_URL}/`,         priority: 1.00, changeFrequency: 'weekly', lastModified: now },
    ...subpages.map(path => ({
      url:             `${SITE_URL}${path}`,
      priority:        0.80,
      changeFrequency: 'weekly' as const,
      lastModified:    now,
    })),
    { url: `${SITE_URL}/ru`,       priority: 0.80, changeFrequency: 'weekly', lastModified: now },
    ...subpages.map(path => ({
      url:             `${SITE_URL}/ru${path}`,
      priority:        0.64,
      changeFrequency: 'weekly' as const,
      lastModified:    now,
    })),
  ]
}
