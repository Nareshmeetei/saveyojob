import type { MetadataRoute } from 'next';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://saveyojob.com';
const NOW = new Date();

async function getOccupationSlugs(): Promise<string[]> {
  const { SEED_OCCUPATIONS } = await import('../../data/seed-data');
  return SEED_OCCUPATIONS.map(o => o.slug);
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const slugs = await getOccupationSlugs();

  return [
    // Tier 1 — highest authority pages
    {
      url:             `${siteUrl}/`,
      lastModified:    NOW,
      changeFrequency: 'daily',
      priority:        1.0,
    },
    {
      url:             `${siteUrl}/jobs/`,
      lastModified:    NOW,
      changeFrequency: 'weekly',
      priority:        0.9,
    },

    // Tier 2 — supporting pages
    {
      url:             `${siteUrl}/courses/`,
      lastModified:    NOW,
      changeFrequency: 'weekly',
      priority:        0.8,
    },
    {
      url:             `${siteUrl}/blog/`,
      lastModified:    NOW,
      changeFrequency: 'weekly',
      priority:        0.7,
    },
    {
      url:             `${siteUrl}/about/`,
      lastModified:    NOW,
      changeFrequency: 'monthly',
      priority:        0.6,
    },
    {
      url:             `${siteUrl}/privacy/`,
      lastModified:    new Date('2025-01-01'),
      changeFrequency: 'yearly',
      priority:        0.3,
    },

    // Tier 3 — 800+ occupation pages
    ...slugs.map(slug => ({
      url:             `${siteUrl}/jobs/${slug}/`,
      lastModified:    NOW,
      changeFrequency: 'monthly' as const,
      priority:        0.8,
    })),
  ];
}
