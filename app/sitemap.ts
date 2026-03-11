import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/constants'

const pages = [
  { path: '',           priority: 1.0, changeFrequency: 'weekly' as const },
  { path: '/docs',      priority: 0.8, changeFrequency: 'weekly'  as const },
  { path: '/changelog', priority: 0.7, changeFrequency: 'weekly'  as const },
  { path: '/roadmap',   priority: 0.6, changeFrequency: 'weekly' as const },
]

export default function sitemap(): MetadataRoute.Sitemap {
  return pages.map(({ path, priority, changeFrequency }) => ({
    url: `${SITE_URL}${path}`,
    alternates: {
      languages: {
        en: `${SITE_URL}${path}`,
        ru: `${SITE_URL}/ru${path}`,
      },
    },
    changeFrequency,
    priority,
    lastModified: new Date(),
  }))
}
