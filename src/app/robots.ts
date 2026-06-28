import type { MetadataRoute } from 'next'
import { businessUrl } from '@/lib/businessInfo'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/', '/private/'],
      },
    ],
    sitemap: `${businessUrl}/sitemap.xml`,
    host: businessUrl,
  }
}
