---
name: GetsSkilled-occupation-pages
description: Build and maintain the 800 programmatic occupation pages at /jobs/[slug]/ on GetsSkilled.com. Use this skill for the occupation page template, generateStaticParams, generateMetadata, the /jobs/ browser, or any SEO work on job pages. These pages are the primary organic traffic driver — build them tool-oriented, not article-oriented, to survive Google AI Overviews.
---

# Occupation Pages Skill

## Core Principle

These pages MUST be tool-oriented, not article-oriented. AI Overviews eat informational articles. The embedded mini-generator is what makes each page AI-Overview-resistant and what converts visitors to users.

## URL Structure

```
/jobs/                         ← Occupation browser
/jobs/paralegal/               ← Individual occupation page
/jobs/financial-analyst/
/jobs/customer-service-rep/
```

## Static Generation

```typescript
// app/jobs/[slug]/page.tsx

export async function generateStaticParams() {
  const supabase = createServerClient();
  const { data } = await supabase
    .from('occupations')
    .select('slug')
    .order('automation_probability', { ascending: false });
  return (data ?? []).map(o => ({ slug: o.slug }));
}

export const revalidate = 86400; // Daily revalidation
```

## Metadata Generation

```typescript
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const occ = await getOccupation(params.slug);
  const score = Math.round((occ.automation_probability ?? 0.5) * 100);
  const year = new Date().getFullYear();
  
  return {
    title: `Will AI Replace ${occ.title}s? [${year}] Risk Score + Free Plan | GetsSkilled`,
    description: `${occ.title}s have a ${score}% AI automation risk. See your task-by-task breakdown and get a free personalized reskilling roadmap in 60 seconds.`,
    openGraph: {
      title: `Will AI Replace ${occ.title}s? ${score}% Automation Risk`,
      description: `Free reskilling roadmap for ${occ.title}s on GetsSkilled.com`,
      url: `https://GetsSkilled.com/jobs/${params.slug}/`,
      images: [{ url: `/api/og?job=${encodeURIComponent(occ.title)}&score=${score}` }],
    },
    alternates: { canonical: `https://GetsSkilled.com/jobs/${params.slug}/` },
  };
}
```

## Page Sections (in order)

### 1. Breadcrumb
```
Home → Browse Jobs → {Occupation Title}
```

### 2. Hero
```
H1: Will AI Replace {Occupation}s?
[Risk gauge — same SVG component as generator]
[Risk level badge: VERY HIGH RISK / HIGH RISK / etc.]
Short summary (2 sentences, from occupation data — not AI-generated at load time)
[↓ Get My Free Personalized Plan] → scrolls down to embedded generator
```

### 3. Quick Stats (3-column bar)
```
{score}%          ${wage}/yr           {growth}%
Automation Risk   Median Salary        10-yr Job Growth
```

### 4. Task Breakdown
```
H2: Which Tasks in Your {Occupation} Job Are Being Automated?
[Static table of 5 tasks with High/Medium/Low badges]
[Short note under High-risk tasks: why AI affects this specific task]
```

### 5. Embedded Generator (CRITICAL — makes page AI-Overview resistant)
```
H2: Get Your Personalized GetsSkilled Roadmap
[Same GeneratorCard component, pre-filled with occupation title]
[Pre-select first goal chip by default]
User just picks their time commitment and hits Generate
```

### 6. Job Market Data
```
H2: {Occupation} Market Outlook 2025–2030
Salary, employment, growth projection from BLS
Data source attribution (builds trust for AI citation)
```

### 7. Skills to Stay Relevant
```
H2: Skills That Keep {Occupation}s Valuable Despite AI
4 skill cards (from occupation data, static — not AI-generated)
```

### 8. Related Occupations
```
H2: Compare Your Risk to Similar Roles
3–4 occupation cards with links to their pages
Same SOC major group (e.g., Business & Financial Operations)
```

### 9. FAQ (Schema-marked)
```
H2: Frequently Asked Questions
Q: Will AI completely replace {occupation}s?
Q: What should {occupation}s learn to stay relevant in 2026?
Q: How much time do {occupation}s have before significant AI impact?
Q: What careers are similar to {occupation} but more AI-resistant?
```

## Schema Markup

```typescript
// In page.tsx <head>:
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map(faq => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": { "@type": "Answer", "text": faq.answer }
  }))
};

const howToSchema = {
  "@type": "HowTo",
  "name": `How to Future-Proof Your ${occ.title} Career`,
  "step": skills.map((s, i) => ({
    "@type": "HowToStep",
    "position": i + 1,
    "name": s.name,
    "text": s.why
  }))
};
// Render as <script type="application/ld+json">
```

## Occupation Browser (/jobs/)

```
H1: AI Automation Risk by Job Title
Search input (client-side filter, instant)
Filter chips: [All] [Very High Risk] [High Risk] [Moderate] [Low Risk]
Sort: [By Risk ↓] [By Salary ↓] [A–Z]

Grid of cards:
┌──────────────────────────────────┐
│ Paralegal              [94%]     │
│ ━━━━━━━━━━━━━━━━━━━━━ VERY HIGH │
│ $59,200/yr · +4% growth          │
│                   View Report → │
└──────────────────────────────────┘

Load 48 cards initially, "Load more" button
```

## Internal Linking

- Each page links to 3–4 related occupations (same SOC major group)
- Each page links back to `/jobs/` (occupation browser)
- Each page has a sticky "Generate My Plan →" button that scrolls to embedded generator
- Breadcrumb on every page

## Performance

- All 800 pages: statically generated at build time (fast, good Core Web Vitals)
- Risk gauge: animates only when IntersectionObserver fires (not on load)
- Images: `next/image` with WebP
- Lighthouse score target: >90 on mobile
