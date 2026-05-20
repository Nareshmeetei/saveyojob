---
name: GetsSkilled-seo
description: Implement and optimize all SEO for GetsSkilled.ai — meta tags, schema markup, sitemap, robots.txt, canonical URLs, Open Graph images, and GEO (Generative Engine Optimization) for AI search citation. Use whenever working on search visibility, page titles, structured data, internal linking, or making the site more likely to be cited by ChatGPT, Perplexity, or Google AI Overviews.
---

# SEO Skill

## Strategy Summary

Two parallel tracks:
1. **Google SEO:** Tool-intent queries ("AI job risk calculator") on homepage + informational queries ("will AI replace paralegal") on occupation pages — made AI-Overview-resistant via embedded interactive tool
2. **GEO:** Get cited by ChatGPT/Perplexity when users ask about AI career displacement — drives 4–16x higher converting traffic than Google organic

## Title Tag Formulas

```typescript
// Homepage
"Free AI Job Risk Calculator — Know Your Risk. Get Skilled."

// Occupation pages  
`Will AI Replace ${title}s? [${year}] Risk Score + Free Reskilling Plan | GetsSkilled`

// Occupation browser
`AI Automation Risk by Job Title [${year}] — GetsSkilled.ai`

// Shared roadmap
`My AI Career Reskilling Roadmap — ${jobTitle} | GetsSkilled`
```

## Meta Descriptions

```typescript
// Homepage
"Find out if AI will replace your job — and exactly what to learn next. Free 60-second assessment with task-by-task risk analysis and personalized roadmap. 50,000+ professionals assessed."

// Occupation pages
`${title}s have a ${score}% AI automation risk. See task-by-task breakdown, what skills to build, and get a free personalized reskilling roadmap. Takes 60 seconds.`
```

## Keyword Targets

### Homepage (tool-intent — AI Overview resistant)
- "AI job risk calculator" (primary)
- "will AI replace my job test"
- "reskilling roadmap generator"
- "AI career transition tool free"
- "am I at risk from AI"

### Occupation Pages (informational — long tail)
- "will AI replace [job]s [year]"
- "AI automation risk [job]"
- "[job] reskilling courses"
- "is [job] at risk from AI"
- "what will [job] look like with AI"

### Occupation Browser
- "jobs most at risk from AI"
- "which jobs will AI replace list"
- "AI proof careers [year]"

## Open Graph Dynamic Images

```typescript
// app/api/og/route.tsx — use @vercel/og
import { ImageResponse } from 'next/og';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const job = searchParams.get('job') || 'Your Job';
  const score = searchParams.get('score') || '65';
  const riskLabel = parseInt(score) > 70 ? 'VERY HIGH RISK' 
                  : parseInt(score) > 40 ? 'HIGH RISK' : 'MODERATE RISK';
  const color = parseInt(score) > 70 ? '#FF5757' 
              : parseInt(score) > 40 ? '#FFB547' : '#CAFF4A';

  return new ImageResponse(
    <div style={{
      background: '#0F1117', width: '100%', height: '100%',
      display: 'flex', flexDirection: 'column',
      alignItems: 'flex-start', justifyContent: 'center',
      padding: '60px', fontFamily: 'sans-serif',
    }}>
      <div style={{ color: '#8A8FA8', fontSize: 18, marginBottom: 16, letterSpacing: '0.1em' }}>
        GetsSkilled.AI
      </div>
      <div style={{ color: '#F0EFE8', fontSize: 52, fontWeight: 800, lineHeight: 1.1, marginBottom: 24 }}>
        Will AI Replace<br/>{job}s?
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <div style={{ color: '#F0EFE8', fontSize: 80, fontWeight: 800, color }}>
          {score}%
        </div>
        <div style={{ color, fontSize: 18, fontWeight: 700, letterSpacing: '0.08em' }}>
          {riskLabel}
        </div>
      </div>
      <div style={{ color: '#CAFF4A', fontSize: 20, marginTop: 32, fontWeight: 600 }}>
        Get your free personalized roadmap →
      </div>
    </div>,
    { width: 1200, height: 630 }
  );
}
```

## Sitemap

```typescript
// app/sitemap.ts
import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const slugs = await getAllOccupationSlugs(); // from Supabase
  
  const jobPages = slugs.map(slug => ({
    url: `https://GetsSkilled.ai/jobs/${slug}/`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));
  
  return [
    { url: 'https://GetsSkilled.ai/', priority: 1.0, changeFrequency: 'weekly' },
    { url: 'https://GetsSkilled.ai/jobs/', priority: 0.9, changeFrequency: 'monthly' },
    ...jobPages,
  ];
}
```

## robots.txt

```typescript
// app/robots.ts
export default function robots() {
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: ['/api/', '/roadmap/'] },
      // Allow AI crawlers explicitly
      { userAgent: 'GPTBot', allow: '/' },
      { userAgent: 'ClaudeBot', allow: '/' },
      { userAgent: 'PerplexityBot', allow: '/' },
      { userAgent: 'Googlebot', allow: '/' },
    ],
    sitemap: 'https://GetsSkilled.ai/sitemap.xml',
  };
}
```

## GEO — Get Cited by AI Platforms

### Reddit Strategy (most impactful for AI citation)

Post the tool in these subreddits on launch day:
- r/careerguidance (4.2M members)
- r/jobs (3.9M members)
- r/financialindependence (2.1M members)
- r/personalfinance (18M members)
- r/cscareerquestions (700k members — for tech workers)

Post title formula:
> "I built a free tool that breaks down exactly which tasks in your job AI will automate first — and gives you a personalized learning plan [link]"

Reddit posts = AI platform citations. ChatGPT frequently cites Reddit when answering career questions.

### Content Structure for AI Citability

AI platforms prefer content that is:
- Structured with clear H1/H2/H3
- Contains specific data + sources (cite BLS, Oxford, WEF)
- Gives direct answers to questions in first 100 words
- Has FAQ sections (these get cited frequently)

Every occupation page answers "Will AI replace [job]s?" within the first paragraph — exact question + data-backed answer.

### Directory Submissions (Day 1)

These are scraped for AI training:
- Product Hunt
- Futurepedia.io
- There's an AI (theresanai.com)
- Toolify.ai
- AI Tools Directory (aitoolsdirectory.com)

## Canonical URLs

Always explicit, always with trailing slash:
```typescript
alternates: {
  canonical: `https://GetsSkilled.ai/jobs/${slug}/`,
}
```

## Core Web Vitals Targets

| Metric | Target |
|--------|--------|
| LCP | < 2.0s (SSG pages) |
| INP | < 100ms |
| CLS | < 0.05 |

Static generation handles most of this automatically for occupation pages.
