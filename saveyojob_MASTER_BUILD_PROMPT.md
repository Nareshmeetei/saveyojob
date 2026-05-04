# SAVEYOJOB.COM — MASTER BUILD PROMPT
# Paste this entire file as your first message in Claude Code

---

You are building **Saveyojob.com** — a free AI career transition tool that tells workers which tasks in their job are being automated and gives them a personalized reskilling roadmap. This generates revenue through affiliate commissions from Coursera, LinkedIn Learning, and coding bootcamps.

**Tagline:** "Don't wait to be replaced. Saveyojob."

## Read Skill Files First

Before writing any code, read every file in the `/skills/` directory:
- `skills/SKILL.md` — master architecture, design system, DB schema, all tech decisions
- `skills/generator-ui.md` — core generator component + exact Claude prompt + Zod schema
- `skills/data-pipeline.md` — occupation data sources + seed script
- `skills/occupation-pages.md` — 800 programmatic SEO pages
- `skills/seo.md` — SEO + GEO implementation

After reading, confirm you understand the project before starting.

---

## Phase 1 — Project Initialization

```bash
npx create-next-app@latest Saveyojob-com \
  --typescript --tailwind --app --src-dir=false --import-alias="@/*"

cd Saveyojob-com

pnpm add \
  @anthropic-ai/sdk \
  @supabase/supabase-js \
  @supabase/ssr \
  resend \
  @react-email/components \
  react-email \
  nanoid \
  zod \
  clsx \
  lucide-react \
  @vercel/og

pnpm add -D tsx dotenv-cli @types/node
```

**Setup tasks:**

1. Create `.env.local` template (show me, I'll fill values):
```bash
ANTHROPIC_API_KEY=
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
RESEND_API_KEY=
NEXT_PUBLIC_SITE_URL=https://Saveyojob.com
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=Saveyojob.com
ONET_USERNAME=
ONET_PASSWORD=
BLS_API_KEY=
```

2. Configure `tailwind.config.ts` with the custom colors from `skills/SKILL.md` (charcoal scale, gs.lime, gs.red, gs.amber, gs.muted, gs.faint, gs.border, gs.text)

3. Configure `app/layout.tsx`:
   - Import Syne, Plus Jakarta Sans, JetBrains Mono from `next/font/google`
   - Set CSS variables: `--font-syne`, `--font-jakarta`, `--font-mono`
   - Dark background: `bg-charcoal min-h-screen`
   - Add Plausible analytics script
   - Global meta: site name "GetsSkilled", description, OG defaults

4. Build the `<Header>` component:
   - Logo: "Get**Skilled**" — "Get" in gs-lime, "Skilled" in white, both in font-syne font-bold
   - Right side: "Free · No signup required" in font-mono text-xs text-gs-faint
   - Background: charcoal-2 with bottom border in gs-border
   - Sticky at top

---

## Phase 2 — Database Setup

Create `supabase/migrations/001_schema.sql` with the full schema from `skills/SKILL.md`.

Create `lib/supabase.ts`:
```typescript
// Server client (for Server Components, API routes)
import { createServerClient } from '@supabase/ssr';
// Browser client (for Client Components)
import { createBrowserClient } from '@supabase/ssr';
```

Create `lib/types/database.ts` with TypeScript types for all 4 tables (occupations, roadmaps, subscribers, affiliate_clicks).

Create `lib/occupations.ts` with helper functions:
- `getOccupation(slug: string)` — fetch single occupation
- `getAllOccupationSlugs()` — for generateStaticParams
- `getRelatedOccupations(soc: string, limit: number)` — same major group

---

## Phase 3 — Occupation Data

Create `data/occupations-autocomplete.json`:
An array of the top 200 occupations for the autocomplete dropdown.
Format: `[{ "title": "Paralegal", "soc": "23-2011.00", "slug": "paralegal" }]`

Include these 50 to start (add more up to 200):
Accountant, Administrative Assistant, Actuary, Bank Teller, Bookkeeper, Budget Analyst, Business Analyst, Claims Adjuster, Compliance Officer, Content Writer, Copywriter, Cost Estimator, Customer Service Representative, Data Analyst, Data Entry Clerk, Data Scientist, Dispatcher, Economist, Financial Analyst, Financial Advisor, Graphic Designer, HR Manager, HR Specialist, Insurance Underwriter, Journalist, Legal Secretary, Loan Officer, Market Research Analyst, Marketing Coordinator, Medical Coder, Medical Transcriptionist, Operations Manager, Paralegal, Pharmacy Technician, Photo Editor, Proofreader, Project Manager, Real Estate Agent, Recruiter, Sales Representative, Social Media Manager, Software Developer, Software Engineer, Statistician, Supply Chain Analyst, Tax Preparer, Technical Writer, Translator, UX Designer, Video Editor, Web Developer

Create `data/seed-data.ts` with realistic mock data for 5 occupations to use during development (see `skills/data-pipeline.md` for which 5 and what realistic values to use).

Create `scripts/seed-occupations.ts` (see `skills/data-pipeline.md` for the full script structure with O*NET API calls, rate limiting, and BLS data integration).

---

## Phase 4 — The Generator (Most Important Phase)

This is the primary product. Build it to be beautiful, fast, and trust-inspiring.

### API Route: `app/api/generate-roadmap/route.ts`

```typescript
import Anthropic from '@anthropic-ai/sdk';
// Use the exact system prompt and user prompt from skills/generator-ui.md
// Validate with Zod schema from skills/generator-ui.md
// Rate limit: 3/IP/day (use a simple Supabase-based counter)
// Save to roadmaps table, return roadmap_data + share_id
```

### Homepage: `app/page.tsx`

**Design vision:** Dark, bold, high-energy. Electric lime accents on charcoal. Think: a focused tool that means business.

**Layout:**
```
[HEADER]

[HERO SECTION]
  Eyebrow: "AI CAREER NAVIGATOR" (lime, font-mono, small)
  H1: "Is your job safe from AI?" (huge, Syne, white, tight letter-spacing)
  Subhead: "Find out in 60 seconds. Get a personalized reskilling roadmap. Free." (muted)
  
  [3-STAT BAR]
  ┌─────────────┬─────────────┬─────────────┐
  │    92M      │    51%      │   +25%      │
  │ jobs at     │ of workers  │ salary for  │
  │ risk by     │ worried     │ AI-skilled  │
  │ 2030        │ about AI    │ workers     │
  └─────────────┴─────────────┴─────────────┘

[GENERATOR CARD]
  Header: "Build my roadmap" + "3 questions · 60 seconds"
  [Step 1: Job title autocomplete]
  [Step 2: Goal chips]
  [Step 3: Time chips]
  [GENERATE BUTTON: lime background, charcoal text, full width]

[HOW IT WORKS - below the fold]
  3 cards: Task Analysis / Personalized Plan / Actionable Courses
```

### Generator Components

Build these in `components/generator/`:

**`JobTitleInput.tsx`**
- Input: charcoal-3 background, lime focus border, placeholder "e.g. Accountant, Paralegal…"
- Dropdown: charcoal-2 background, gs-border border, shows up to 6 matches
- Filters `data/occupations-autocomplete.json` client-side (instant, no API call)
- On select: sets title + soc_code in state, closes dropdown

**`GoalChips.tsx`**
- 4 chips in a flex-wrap row
- Default: charcoal-3 bg, gs-border border, gs-muted text
- Selected: gs-lime-dim bg, gs-lime border, gs-lime text
- Hover: slightly lighter border

**`TimeChips.tsx`**
- 3 chips, same style as GoalChips
- Show sublabel below main label in smaller text

**`LoadingState.tsx`**
- Centered spinner: `border-gs-border border-t-gs-lime`
- 5 animated steps (appear one by one, 1.5s intervals)
- After 6s: show "Almost there — AI is thinking…"

**`GenerateButton.tsx`**
- Default: `bg-gs-lime text-charcoal font-semibold text-base rounded-xl w-full py-4`
- Hover: `brightness-110 -translate-y-0.5`
- Disabled: `opacity-50 cursor-not-allowed`
- Loading: show spinner inside button

### Roadmap Components

Build in `components/roadmap/`:

**`RoadmapResult.tsx`** — wrapper, animates in with fade+slide

**`RiskGauge.tsx`**
- SVG circular gauge, 88×88px
- Color: >70% = gs-red, >40% = gs-amber, ≤40% = gs-lime
- Show percentage in center (Syne font, large)
- Show risk level label below percentage (font-mono, uppercase, small)
- Animate dashoffset on mount (CSS transition, 1.2s ease-out)

**`TaskBreakdown.tsx`**
- 5 rows, each: task name (left) + risk badge (right)
- High badge: `bg-gs-red/10 text-gs-red`
- Medium badge: `bg-gs-amber/10 text-gs-amber`
- Low badge: `bg-gs-lime/10 text-gs-lime`
- Font-mono for badges, text-xs uppercase

**`SkillsGrid.tsx`**
- 2×2 grid of cards
- Each card: skill name (font-syne medium) + why text (text-gs-muted small)
- Card bg: charcoal-3, border gs-border, rounded-xl

**`LearningTimeline.tsx`**
- Vertical timeline, 4 items
- Left: lime dot + connecting line (lime, dashed)
- Right: period (lime, font-mono small) + title (white, font-syne) + desc (muted)

**`CourseRecommendations.tsx`**
- 3 cards, each: emoji icon + course name + platform·skill + "View →" badge
- On click: fire-and-forget POST to `/api/affiliate/click`, then open affiliate link
- Hover: border goes lime, subtle lift

**`AlternativeCareers.tsx`**
- 3 chips in a row, charcoal-3 bg, cannot be selected, just labels

**`ResultActions.tsx`**
- "Share my roadmap" → saves roadmap, shows share URL + copy button + social buttons
- "Email me this" → shows email input inline
- "Start over" → resets all state to form

---

## Phase 5 — Email Capture

`app/api/subscribe/route.ts`:
- POST with `{ email, occupationSlug, source }`
- Upsert to subscribers table
- Send welcome email via Resend
- Return success

`components/generator/EmailGate.tsx`:
- Modal or inline form that appears before 2nd roadmap generation
- Simple: email input + "Send My Roadmap" button
- On success: set cookie `gs_subscribed` = sha256(email), expires 365d

Create welcome email in `emails/Welcome.tsx` using React Email:
- GetsSkilled branding (dark theme)
- "Your reskilling roadmap is ready"
- Summary: risk score + top 3 skills
- Link to shared roadmap
- Unsubscribe link

---

## Phase 6 — Shareable Roadmap Pages

`app/api/save-roadmap/route.ts`:
- POST with full roadmapData
- Generate `share_id` with `nanoid(10)`
- Insert to roadmaps table
- Return `{ share_id }`

`app/roadmap/[id]/page.tsx`:
- Fetch roadmap by share_id
- Display full roadmap (read-only, no form)
- Add CTA: "Generate your own free roadmap →" (links to homepage)
- Dynamic OG image via `/api/og?job=X&score=Y`

`app/api/og/route.tsx`:
- Use `@vercel/og`
- Dark background (#0F1117)
- Show job title, risk score, GetsSkilled branding
- Lime accent color

---

## Phase 7 — Occupation Pages (Programmatic SEO)

`app/jobs/[slug]/page.tsx`:
- Use `generateStaticParams` to build all occupation pages at build time
- Use `generateMetadata` with SEO-optimized title/description (see `skills/occupation-pages.md`)
- Build all sections from `skills/occupation-pages.md`
- Embed the GeneratorCard (pre-filled with occupation title)
- Add FAQ schema + HowTo schema as JSON-LD

`app/jobs/page.tsx`:
- Searchable grid of all occupations
- Filter by risk level
- Each card: title, risk gauge mini, salary, growth, link

Add internal linking between related occupations.

---

## Phase 8 — SEO Polish

1. `app/sitemap.ts` — all pages, correct priorities
2. `app/robots.ts` — allow AI crawlers explicitly
3. Canonical URLs on all pages (trailing slash)
4. JSON-LD schema on occupation pages
5. Plausible analytics script in layout

---

## Design Principles (Non-Negotiable)

**Dark, bold, high-contrast.** Background: charcoal (#0F1117). Accent: electric lime (#CAFF4A). Text: near-white (#F0EFE8).

**The lime is precious.** Only use it on: the brand name in the logo, the primary CTA button, the risk gauge for low-risk, the selected chip state, and key data callouts. Don't scatter it everywhere.

**Typography contrast.** H1s are huge, Syne, 800 weight, tight letter-spacing. Body is Plus Jakarta Sans, comfortable size. Labels are JetBrains Mono, uppercase, tracked out, small.

**Minimal chrome.** Borders are subtle (gs-border = #2A2F42). Shadows are almost none. Cards float on the dark background by material contrast, not shadows.

**Mobile first.** Generator form must be perfect on iPhone. Single column, large touch targets (min 48px), no horizontal scroll.

**Speed.** The generator is a client component (fast interactivity). Occupation pages are all static (fast load). No heavy animations that slow paint.

---

## After Each Phase

Tell me:
1. Files created/modified
2. Any spec deviations + why
3. What to test manually  
4. What's next

## Start

Begin with Phase 1. Read all skill files first. Confirm understanding. Then initialize the project.
