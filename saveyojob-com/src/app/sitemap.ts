import type { MetadataRoute } from 'next';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://saveyojob.com';

async function getOccupationSlugs(): Promise<string[]> {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) return [];
  try {
    const { getAllOccupationSlugs } = await import('../../lib/occupations');
    return getAllOccupationSlugs();
  } catch { return []; }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const slugs = await getOccupationSlugs();
  return [
    { url: `${siteUrl}/`,      priority: 1.0, changeFrequency: 'daily' },
    { url: `${siteUrl}/jobs/`, priority: 0.9, changeFrequency: 'weekly' },
    ...slugs.map(slug => ({
      url:             `${siteUrl}/jobs/${slug}/`,
      lastModified:    new Date(),
      changeFrequency: 'monthly' as const,
      priority:        0.8,
    })),
  ];
}
