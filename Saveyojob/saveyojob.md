---
name: GetsSkilled-project
description: Build and maintain the GetsSkilled.com AI career transition platform. Use this skill whenever working on any aspect of the GetsSkilled.ai codebase — the roadmap generator, occupation pages, data pipeline, API routes, UI components, email system, or SEO. This is the master context file. Always load this before writing any code for this project.
---

# GetsSkilled.com — Master Project Skill

## What This Is

GetsSkilled.com is a free AI-powered career transition tool. Workers enter their job title, goal, and available learning time. Claude generates a personalized reskilling roadmap with task-level automation risk analysis and vetted course recommendations.

**Tagline:** "Don't wait to be replaced. Get skilled."  
**Domain:** GetsSkilled.com  
**Revenue:** Affiliate commissions from Coursera (45%), LinkedIn Learning (35%), bootcamps ($250–$500/student)

## Tech Stack (Non-Negotiable)

- **Framework:** Next.js 14 with App Router
- **Styling:** Tailwind CSS with custom config — see design system below
- **Database:** Supabase (PostgreSQL)
- **AI:** Anthropic SDK, model `claude-sonnet-4-20250514`, **server-side only**
- **Email:** Resend + React Email
- **Analytics:** Plausible.io
- **Hosting:** Vercel
- **Package manager:** pnpm

## Critical Rules

1. **NEVER call Anthropic API client-side.** All AI calls: `/api/generate-roadmap` only.
2. **Rate limit:** 3 free generations per IP/day. Email required for unlimited.
3. **Affiliate links always use UTM params** + go through `/api/affiliate/redirect`.
4. **All 800 occupation pages use `generateStaticParams`** — built at deploy time.
5. **No user accounts in Phase 1.** Cookie-based session tracking only.

## Project Structure

```
GetsSkilled-com/
├── app/
│   ├── page.tsx                        ← Homepage with generator
│   ├── jobs/
│   │   ├── page.tsx                    ← Occupation browser
│   │   └── [slug]/page.tsx             ← Programmatic occupation pages
│   ├── roadmap/[id]/page.tsx           ← Shareable roadmap view
│   └── api/
│       ├── generate-roadmap/route.ts   ← Claude API (server only)
│       ├── save-roadmap/route.ts       ← Save + get share ID
│       ├── subscribe/route.ts          ← Email capture
│       ├── affiliate/redirect/route.ts ← Track + redirect affiliate links
│       └── og/route.tsx               ← Dynamic OG images
├── components/
│   ├── generator/                      ← Generator form components
│   ├── roadmap/                        ← Roadmap output components
│   ├── occupation/                     ← Occupation page components
│   └── ui/                            ← Shared primitives
├── lib/
│   ├── anthropic.ts                   ← Anthropic client (server-only)
│   ├── supabase.ts                    ← Supabase server + browser clients
│   ├── occupations.ts                 ← DB helpers
│   └── affiliates.ts                  ← Link builder with UTM
├── data/
│   ├── occupations-autocomplete.json  ← 800 titles for autocomplete
│   └── seed-data.ts                   ← Mock data for dev
├── scripts/
│   └── seed-occupations.ts            ← Data pipeline script
└── skills/                            ← Claude Code skill files (this folder)
    ├── SKILL.md                       ← This file
    ├── generator-ui.md
    ├── data-pipeline.md
    ├── occupation-pages.md
    └── seo.md
```

## Environment Variables

```bash
# .env.local
ANTHROPIC_API_KEY=           # Server only — never expose
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=   # Server only
RESEND_API_KEY=              # Server only
NEXT_PUBLIC_SITE_URL=https://GetsSkilled.com
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=GetsSkilled.com
ONET_USERNAME=
ONET_PASSWORD=
BLS_API_KEY=
```

## Database Schema

```sql
CREATE TABLE occupations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  soc_code TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  automation_probability DECIMAL(4,3),
  risk_level TEXT CHECK (risk_level IN ('Very High','High','Moderate','Low')),
  median_annual_wage INTEGER,
  employment_count INTEGER,
  ten_year_growth_pct DECIMAL(4,1),
  tasks JSONB,
  core_skills JSONB,
  affiliate_courses JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE roadmaps (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  share_id TEXT UNIQUE NOT NULL,
  occupation_slug TEXT,
  goal TEXT,
  time_commitment TEXT,
  roadmap_data JSONB NOT NULL,
  view_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  source TEXT,
  occupation_slug TEXT,
  subscribed_at TIMESTAMPTZ DEFAULT NOW(),
  unsubscribed_at TIMESTAMPTZ
);

CREATE TABLE affiliate_clicks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  platform TEXT NOT NULL,
  course_name TEXT,
  occupation_slug TEXT,
  clicked_at TIMESTAMPTZ DEFAULT NOW()
);
```

## Design System

### Colors (tailwind.config.ts)

```javascript
colors: {
  charcoal: {
    DEFAULT: '#0F1117',
    2: '#161922',
    3: '#1E2230',
    4: '#252A3E',
  },
  gs: {
    border: '#2A2F42',
    text: '#F0EFE8',
    muted: '#8A8FA8',
    faint: '#565B72',
    lime: '#CAFF4A',
    'lime-dim': 'rgba(202,255,74,0.08)',
    'lime-border': 'rgba(202,255,74,0.2)',
    red: '#FF5757',
    'red-dim': 'rgba(255,87,87,0.1)',
    amber: '#FFB547',
    'amber-dim': 'rgba(255,181,71,0.1)',
  }
}
```

### Typography (next/font/google)

```typescript
import { Syne, Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google';

const syne = Syne({ subsets: ['latin'], variable: '--font-syne', weight: ['400','500','600','700','800'] });
const jakarta = Plus_Jakarta_Sans({ subsets: ['latin'], variable: '--font-jakarta', weight: ['300','400','500','600'] });
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono', weight: ['400','500'] });
```

CSS variables: `--font-syne`, `--font-jakarta`, `--font-mono`

### Component Conventions

```
Background: bg-charcoal (base) / bg-charcoal-2 (cards)
Card borders: border border-gs-border rounded-xl
Primary text: text-gs-text
Secondary text: text-gs-muted
Accent: text-gs-lime / bg-gs-lime
Primary CTA: bg-gs-lime text-charcoal font-semibold hover:brightness-110
Input: bg-charcoal-3 border border-gs-border focus:border-gs-lime focus:ring-2 focus:ring-gs-lime/10 text-gs-text rounded-lg
Labels: font-mono text-[11px] uppercase tracking-widest text-gs-faint
Transitions: transition-all duration-150
```

## Sub-skill Files

When working on a specific area, load the relevant skill:
- Generator UI & Claude prompt → `skills/generator-ui.md`
- Occupation data & seeding → `skills/data-pipeline.md`  
- Programmatic /jobs/ pages → `skills/occupation-pages.md`
- SEO, sitemap, GEO → `skills/seo.md`
