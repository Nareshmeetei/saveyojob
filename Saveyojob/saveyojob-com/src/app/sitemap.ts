import type { MetadataRoute } from 'next';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://saveyojob.com';
const NOW = new Date();

async function getOccupationSlugs(): Promise<string[]> {
  const { SEED_OCCUPATIONS } = await import('../../data/seed-data');
  return SEED_OCCUPATIONS.map(o => o.slug);
}

const INDUSTRY_SLUGS = [
  'finance', 'legal', 'admin', 'sales',
  'technology', 'human-resources', 'design-creative', 'marketing-research',
];

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
      url:             `${siteUrl}/jobs-at-risk/`,
      lastModified:    NOW,
      changeFrequency: 'weekly',
      priority:        0.9,
    },

    // Tier 2 — supporting pages
    {
      url:             `${siteUrl}/roadmap/`,
      lastModified:    NOW,
      changeFrequency: 'monthly',
      priority:        0.8,
    },
    {
      url:             `${siteUrl}/courses/`,
      lastModified:    NOW,
      changeFrequency: 'weekly',
      priority:        0.8,
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

    // Tier 2 — careers by industry (programmatic SEO)
    {
      url:             `${siteUrl}/careers/`,
      lastModified:    NOW,
      changeFrequency: 'weekly',
      priority:        0.8,
    },
    ...INDUSTRY_SLUGS.map(slug => ({
      url:             `${siteUrl}/careers/${slug}/`,
      lastModified:    NOW,
      changeFrequency: 'monthly' as const,
      priority:        0.7,
    })),

    // Tier 2 — tools
    {
      url:             `${siteUrl}/tools/ats-checker/`,
      lastModified:    NOW,
      changeFrequency: 'monthly',
      priority:        0.7,
    },
    {
      url:             `${siteUrl}/tools/resume-bullet-rewriter/`,
      lastModified:    NOW,
      changeFrequency: 'monthly',
      priority:        0.7,
    },
    {
      url:             `${siteUrl}/tools/resume-summary/`,
      lastModified:    NOW,
      changeFrequency: 'monthly',
      priority:        0.7,
    },
    {
      url:             `${siteUrl}/tools/cover-letter/`,
      lastModified:    NOW,
      changeFrequency: 'monthly',
      priority:        0.7,
    },
    {
      url:             `${siteUrl}/tools/linkedin-headline/`,
      lastModified:    NOW,
      changeFrequency: 'monthly',
      priority:        0.7,
    },
    {
      url:             `${siteUrl}/tools/linkedin-summary/`,
      lastModified:    NOW,
      changeFrequency: 'monthly',
      priority:        0.7,
    },
    {
      url:             `${siteUrl}/tools/interview-questions/`,
      lastModified:    NOW,
      changeFrequency: 'monthly',
      priority:        0.7,
    },
    {
      url:             `${siteUrl}/tools/resume-builder/`,
      lastModified:    NOW,
      changeFrequency: 'monthly',
      priority:        0.7,
    },
    {
      url:             `${siteUrl}/tools/salary-calculator/`,
      lastModified:    NOW,
      changeFrequency: 'monthly',
      priority:        0.7,
    },
    {
      url:             `${siteUrl}/tools/job-tracker/`,
      lastModified:    NOW,
      changeFrequency: 'monthly',
      priority:        0.7,
    },
    {
      url:             `${siteUrl}/tools/raise-email/`,
      lastModified:    NOW,
      changeFrequency: 'monthly',
      priority:        0.6,
    },
    {
      url:             `${siteUrl}/tools/resignation-letter/`,
      lastModified:    NOW,
      changeFrequency: 'monthly',
      priority:        0.6,
    },
    {
      url:             `${siteUrl}/tools/thank-you-email/`,
      lastModified:    NOW,
      changeFrequency: 'monthly',
      priority:        0.6,
    },
    {
      url:             `${siteUrl}/tools/tmay/`,
      lastModified:    NOW,
      changeFrequency: 'monthly',
      priority:        0.6,
    },

    // Tier 3 — 800+ occupation pages
    ...slugs.map(slug => ({
      url:             `${siteUrl}/jobs-at-risk/${slug}/`,
      lastModified:    NOW,
      changeFrequency: 'monthly' as const,
      priority:        0.8,
    })),
  ];
}
