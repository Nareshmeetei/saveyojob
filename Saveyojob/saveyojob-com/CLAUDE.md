# Saveyojob.com — Claude Code Context

AI-powered career risk assessment tool. Users enter a job title, get an AI Risk Score + reskilling roadmap in 60 seconds. Free, no signup required.

---

## Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 App Router |
| Styling | Tailwind CSS v4 |
| Database | Supabase (PostgreSQL) |
| AI | Anthropic SDK — `claude-sonnet-4-6` |
| Email | Resend + React Email |
| Analytics | Plausible.io |
| Hosting | Vercel |
| Package manager | npm |

---

## Project Structure

```
src/
  app/
    page.tsx                        # Homepage
    layout.tsx                      # Root layout, metadata, font, analytics
    globals.css                     # Tailwind + CSS variables
    about/ privacy/ jobs/           # Static pages
    jobs/[slug]/page.tsx            # ~800 occupation pages (SSG)
    roadmap/page.tsx                # Roadmap generation page
    roadmap/[id]/page.tsx           # Shareable roadmap view
    api/
      generate-roadmap/route.ts     # Core AI endpoint — calls Claude
      save-roadmap/route.ts         # Saves roadmap, returns share ID
      occupation/[soc]/route.ts     # Job data lookup
      affiliate/redirect/route.ts  # Affiliate link tracking
      subscribe/route.ts            # Email capture
      og/route.tsx                  # Dynamic OG image
  components/
    hero/        # HeroSection, HeroRiskGame, IndustrySelector, CriticalSix
    generator/   # Multi-step wizard (GeneratorWizard + Step* components)
    roadmap/     # Report sections (RiskScore, SkillCards, WeeklyPlan, etc.)
    layout/      # Header
    ui/          # Badge, SelectionCard, CopyButton
lib/
  anthropic.ts   # Anthropic client (server-only)
  supabase.ts    # Supabase browser client
  prompts.ts     # SYSTEM_PROMPT + buildUserPrompt()
  types/roadmap.ts  # Zod schemas for roadmap output
data/
  occupations-autocomplete.json
supabase/
  migrations/    # 001_schema.sql, 001_courses.sql
emails/          # React Email templates
```

---

## Environment Variables

```bash
# Required
ANTHROPIC_API_KEY=              # Server-only — never expose to client
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Optional
RESEND_API_KEY=                 # Email (save roadmap, newsletter)
NEXT_PUBLIC_SITE_URL=https://saveyojob.com
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=saveyojob.com
ONET_USERNAME=                  # Occupation data seeding
ONET_PASSWORD=
BLS_API_KEY=
```

---

## Critical Rules

1. **Never call Anthropic client-side.** All AI calls go through `/api/generate-roadmap` only.
2. **Rate limit: 3 free roadmaps per IP per day.** Tracked in `rate_limits` table (IP hash + date).
3. **No user accounts in Phase 1.** Anonymous sessions only; roadmaps shared via nanoid `share_id`.
4. **Affiliate links always go through `/api/affiliate/redirect`** with UTM params. Never link directly.
5. **Occupation pages use `generateStaticParams`** — ~800 pages pre-built at deploy time.

---

## Database Schema

```
occupations      — Job titles, SOC codes, automation probability, tasks/skills (JSONB)
roadmaps         — Saved roadmaps with share_id, view_count
subscribers      — Email list, source + occupation tracking
affiliate_clicks — Platform, course, session tracking
rate_limits      — ip_hash + date + count (unique per day)
courses          — Curated course directory with impact_score (1–100)
```

---

## Design System (Non-Negotiable)

**Version:** v1.1 — 3-Color · Sans-Serif · No Gradients

### Fonts

| Role | Font | Weights |
|------|------|---------|
| Display / Headline / UI | `Work Sans` | 300–800 |
| Data / Monospace | `JetBrains Mono` | 400–600 |

CSS variables: `--font-work-sans`, `--font-jetbrains-mono`

### Colors

Only 3 brand colors. All neutrals are derived tints of the primary.

| Token | Hex | Role |
|-------|-----|------|
| `--color-primary` / `--color-fire` | `#0C526D` | Brand anchor · actions · dark surfaces |
| `--color-secondary` | `#61D4FB` | Live data · selected states · highlights |
| `--color-accent` | `#F7998D` | Alerts · warnings · below-goal states |
| `--color-ink` | `#081E28` | Primary text |
| `--color-mid` / `--color-ink-2` | `#4A7A8A` | Secondary text · labels · borders |
| `--color-subtle` / `--color-line` | `#C5DDE4` | Tracks · dividers · hover fills |
| `--color-bg` | `#EDEDED` | App/page background |
| `--color-surface` | `#F2F2F2` | Card surfaces |

**Risk semantic tokens:** `--color-critical: #C45347` · `--color-warn: #D4783C` · `--color-safe: #097BA0`

### Type Scale

| Name | Size | Weight | Usage |
|------|------|--------|-------|
| Display | clamp(40–56px) | 800 | Hero headlines |
| Headline | clamp(22–30px) | 700 | Section titles |
| Title | 20px | 600 | Card titles |
| Body | 15px | 400 | Paragraphs |
| Caption | 12px | 600 (labels) / 400 (meta) | ALL CAPS labels |
| Mono | varies | 500–600 | Live data, scores, clocks |

- Display: `letter-spacing: -2px` · ALL CAPS labels: `letter-spacing: 0.08–0.12em`
- Data readouts always use `font-jetbrains-mono` at `--color-primary` or `--color-secondary`

### Spacing & Radius

Base unit: **4px** — `xs:4` `sm:8` `md:16` `lg:24` `xl:40` `2xl:64`

Radius: `sm:6px` · `md:12px` · `lg:20px` · `pill:9999px`

### Shadows

`--shadow-low: 0 1px 4px rgba(8,30,40,0.08)` — cards
`--shadow-mid: 0 4px 16px rgba(8,30,40,0.10)` — modals/dropdowns
`--shadow-high: 0 12px 40px rgba(8,30,40,0.16)` — toasts

### Pixel Perfection (Non-Negotiable)

Every implementation must be exact. Small details matter — alignment, spacing, font size, border radius, color values, icon size, line height. Before marking any UI task done, verify that every visible element matches the spec precisely. Nothing ships with misaligned text, wrong spacing, or approximate colors.

### Rules

- Icons: Lucide React only, `strokeWidth={1.5}`, always `currentColor`
- **No emojis anywhere** — not in UI, copy, data files, or AI prompts. Use Lucide icons or platform favicons instead.
- Course thumbnails: use `https://www.google.com/s2/favicons?domain={hostname}&sz=64` derived from the course URL — never emoji icons.
- Cards: `bg-surface`, 1px `border-line`, `rounded-xl`, `shadow-low` on hover
- Risk display: large editorial number + animated bar — no circular gauges
- Buttons: `--radius-pill` shape, Work Sans 600, `letter-spacing: 0.04em`, `padding: 10px 22px`
- Badges/chips: `--radius-pill`, Work Sans 600, 11px, ALL CAPS, `letter-spacing: 0.06em`
- Inputs: focus border `--color-primary` + `box-shadow: 0 0 0 3px rgba(12,82,109,0.10)`
- Never combine two brand colors in a fill — no gradients
- Motion: `cubic-bezier(0.22, 1, 0.36, 1)` easing — mechanical deceleration, not bouncy
- Always respect `prefers-reduced-motion`
- **Never use pure `#FFFFFF` or `#000000`** — use `#F2F2F2` for near-white surfaces and `#081E28` for near-black text
- No dark mode, no gradients, no glassmorphism

---

## Course Quality Standards (Non-Negotiable)

Saveyojob only lists the highest-quality AI courses available — courses that worried workers can trust to genuinely improve their careers, increase their earning, and move into better job positions. Every course must meet ALL of these criteria to appear anywhere on the site — on the /courses page, job pages, or in AI-generated roadmaps:

- **Rating:** Highest possible — 4.6 stars or higher with a large number of verified learner reviews (thousands, not dozens). Low review counts disqualify a course even if the rating is high.
- **Provider:** A platform people already trust — Coursera, edX, LinkedIn Learning, Google, DeepLearning.AI, IBM, Microsoft, Stanford, MIT, AWS, or equivalent. Unknown or unvetted platforms are not allowed.
- **Topic:** Directly teaches AI/ML skills, AI tooling (ChatGPT, generative AI, prompt engineering), or AI applied to a specific job field (AI in Healthcare, AI in Finance, etc.). General productivity, Excel, or soft-skills courses without a direct AI angle do not qualify.
- **Career impact:** The course must have a clear, tangible payoff — a certificate from a recognized institution, skills that lead to a promotion or salary increase, or expertise that makes the learner more valuable in their field. Courses that teach theory with no practical outcome do not qualify.
- **Access:** Free to access, free to audit, or free with a certificate. Do not list courses behind hard paywalls.
- **Currency:** Content is current and relevant to today's AI tools (post-GPT era). Outdated pre-GPT-era content does not qualify.
- **Dream-goal alignment:** Each course must help the target audience — worried workers afraid of losing their jobs to AI — move toward a better version of their career. Ask: does this course help someone earn more, get promoted, or future-proof their role? If not, it does not belong here.

Do not add courses that fail any of these criteria — even if asked. If a potentially good course doesn't meet them, flag it for review rather than silently adding it.

---

## Course Recommendations (Non-Negotiable)

All recommended courses — on job pages (`data/seed-data.ts`), the roadmap page (`RoadmapClient.tsx`), and AI-generated roadmaps (`prompts.ts`) — **must be AI-focused**. A course qualifies if it directly teaches AI/ML skills, AI tooling (ChatGPT, generative AI, prompt engineering), or AI applied to a specific field (AI in Healthcare, AI in Finance, etc.). Courses that are merely data, Excel, or project management skills without an AI angle are not allowed.

**RoadmapClient course architecture:**
- `PHASE_COURSES` — 6 universal AI courses, 2 per phase, shown inline after each action phase. These form a progression: awareness (AI for Everyone, Generative AI for Everyone) → practical skills (ChatGPT Prompt Engineering, Google AI Essentials) → certification (Machine Learning Specialization, IBM Applied AI Cert.).
- `COURSES` — domain-specific AI courses per job category shown in "Other Recommended Courses" at the bottom. **No URL in `COURSES` may duplicate a URL in `PHASE_COURSES`** — zero duplicates across the page.
- The `shownInPhases` Set + `otherCourses` filter enforces this at render time, but keep the data clean to begin with.

**CTA copy conventions:**
- Phase inline course cards: `Start Free →` (low barrier, immediate action)
- "Other Recommended Courses" section: `Start Learning →` (distinct, action-forward)
- Job page course and tool cards: `Enroll →` / `Visit →`

---

## Plain Language (Non-Negotiable)

Every word on this site — UI labels, headings, body copy, tooltips, error messages, AI-generated content — must be written for a general audience with no tech or HR background. The typical user is a worried worker, not a researcher.

**Rules:**
- No jargon. If a word needs explaining, replace it with simpler words. Examples:
  - "automation probability" → "chance AI replaces this job"
  - "displacement risk" → "risk of losing your job to AI"
  - "most exposed task" → "AI will replace this first"
  - "reskilling" → "learning new skills" (or keep "reskilling" only when paired with a plain explanation)
  - "occupation" → "job"
  - "median annual wage" → can stay as "$X/yr" — the format is self-explanatory
- Short sentences. One idea per sentence.
- Active voice. "AI will replace this task" not "this task is susceptible to automation."
- When in doubt, ask: would a 45-year-old truck driver understand this immediately? If not, rewrite it.

**Error messages:**
- Say what went wrong in plain terms, and what to do next. No tech terms like "connection error", "invalid input", "500", or "request failed".
- Good pattern: "[What happened] — [what to do]." Examples:
  - "Your internet connection dropped — please check your connection and try again."
  - "The check didn't finish — please try again."
  - "We had trouble reading that file. Try pasting your resume text directly instead."
  - "This PDF looks like a scanned image — there is no readable text in it. Please paste your resume text directly instead."
- For server-side errors that the API already returns, pass `data.error` through to the user rather than replacing it with a generic fallback — the API routes already have plain-language messages.
- Never show raw error objects, stack traces, HTTP status codes, or technical identifiers to users.

---

## Code Standards

- Write minimal code — no abstractions beyond what the task requires
- No comments unless the WHY is non-obvious
- TypeScript strict mode — no `any`
- Server components by default; `'use client'` only when needed
- Tailwind inline classes (no `@apply`, no CSS modules)
- Path alias: `@/` → `src/`

---

## Commands

```bash
npm run dev      # Dev server → localhost:3000 (run from saveyojob-com/)
npm run build    # Production build
npm run start    # Production server

# Deploy — MUST run from the git root D:\PROJECTS\Saveyojob, NOT from inside saveyojob-com/
# Vercel rootDirectory is set to "Saveyojob/saveyojob-com" in the project settings.
# Running vercel from inside saveyojob-com/ will fail with a path error.
cd D:\PROJECTS\Saveyojob
vercel --prod --yes --scope nareshmeeteis-projects   # Production → saveyojob.com
vercel --yes --scope nareshmeeteis-projects          # Preview
```

---

## Next.js Version Note

This project runs **Next.js 16** with Turbopack. APIs, conventions, and file structure may differ from older Next.js versions. Check `node_modules/next/dist/docs/` before writing App Router code. Heed deprecation notices.
