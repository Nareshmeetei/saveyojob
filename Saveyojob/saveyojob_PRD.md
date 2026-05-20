# GetsSkilled.com — Product Requirements Document
**Version:** 1.0 | **Date:** April 2026 | **Status:** Ready to Build

---

## 1. Product Vision

**Saveyojob.com** is a free, AI-powered career transition tool that tells workers exactly which tasks in their specific job are being automated — and gives them a personalized, actionable reskilling roadmap with vetted course recommendations.

**One-line pitch:** "Find out if AI will replace your job. Saveyojob before it does."

**Domain:** Saveyojob.com  
**Tagline:** "Your AI survival guide for the future of work."

**Business model:** 100% free to users. Revenue from course affiliate commissions (Coursera 45%, LinkedIn Learning 35%, bootcamps $250–$500/referral) and display ads.

---

## 2. Core Problem Being Solved

- **51% of American workers** actively worry AI will replace their job
- **92 million jobs** projected displaced globally by 2030 (WEF)
- Every existing tool either: (a) gives a risk score with no guidance, or (b) writes generic articles
- **Nobody has built** a task-level, personalized roadmap generator with integrated course recommendations
- This creates a massive unsolved pain point hitting hundreds of millions of people right now

---

## 3. Brand Identity

**Name:** Saveyojob  
**Domain:** Saveyojob.com  
**Tone:** Direct, urgent, empowering. Not scary — actionable.  
**Voice:** "Here's what's happening to your job. Here's exactly what to do."  
**Visual identity:** Bold, high-contrast, editorial. Dark backgrounds, electric accents.

### Taglines (use across the site)
- "Your AI survival guide for the future of work."
- "Don't wait to be replaced. Get skilled."
- "Know your risk. Build your future."
- "AI is changing work. Change faster."

---

## 4. Target Users

**Primary:** White-collar workers aged 25–45 with roles at moderate-to-high automation risk:
- Accountants, paralegals, financial analysts
- Customer service, HR specialists, data entry clerks
- Content writers, graphic designers, recruiters
- Junior software developers, market research analysts

**Secondary:** HR departments and unions needing workforce planning tools (Phase 2)

**Geography:** English-speaking markets first (US, UK, Canada, Australia, India)

---

## 5. Tech Stack

| Layer | Technology | Rationale |
|-------|-----------|-----------|
| Framework | Next.js 14 (App Router) | SSG for programmatic pages, API routes for secure AI calls |
| Styling | Tailwind CSS | Fast iteration, consistent design system |
| Database | Supabase (PostgreSQL) | Occupation data, email capture, usage analytics |
| AI | Anthropic SDK, `claude-sonnet-4-20250514`, server-side only | Roadmap generation |
| Email | Resend + React Email | Transactional emails, roadmap delivery |
| Analytics | Plausible.io | Privacy-first, GDPR-compliant |
| Hosting | Vercel | Edge deployment, great Next.js support |
| Package manager | pnpm | Faster, more efficient than npm |

**All AI calls go through Next.js API routes — never client-side. API key stays server-only.**

---

## 6. Site Architecture

```
Saveyoujob.com/
├── /                          ← Homepage (generator tool — primary feature)
├── /jobs/                     ← Occupation browser
├── /jobs/[slug]/              ← 800 programmatic occupation pages
├── /roadmap/[id]/             ← Shareable roadmap pages
├── /about/
├── /api/
│   ├── /generate-roadmap      ← Claude API call (POST)
│   ├── /occupation/[soc]      ← Fetch occupation data
│   ├── /subscribe             ← Email capture
│   ├── /save-roadmap          ← Save shareable roadmap
│   └── /affiliate/redirect    ← Affiliate link redirect + tracking
└── /privacy/
```

---

## 7. Core Features — MVP

### 7.1 The Generator (Homepage — Primary Feature)

**3-step intake:**
1. **Job title** — Autocomplete from 800+ occupation titles
2. **Goal** — 4 chips: Stay in field / Transition careers / Move into AI / Understand risk
3. **Time commitment** — 3 chips: 2–4 hrs/week / 5–10 hrs/week / Full-time

**Output (first one free, email required for more):**
- Automation risk score (0–100%) with animated visual gauge
- Task-by-task breakdown (5 specific tasks, color-coded High/Medium/Low)
- 4 skills to build with explanations
- 12-week learning timeline with milestones
- 3 recommended courses with affiliate links
- 3 alternative AI-resistant career paths
- Shareable roadmap URL

### 7.2 Programmatic Occupation Pages (800 pages)

Each at `/jobs/[slug]/`:
- SEO title: "Will AI Replace [Job]? [Year] Automation Risk Score"
- Risk gauge + task breakdown (from data, not AI-generated on load)
- Salary + job market outlook (BLS data)
- Embedded mini-generator pre-filled with occupation
- FAQ schema for AI citation

### 7.3 Email Capture & Delivery

- First roadmap: shown fully in browser, no gate
- Second roadmap attempt: email capture form
- Email delivers full roadmap PDF + welcome to weekly "AI Job Market" newsletter
- No spam. Easy unsubscribe.

### 7.4 Shareable Roadmap Pages

- Each generated roadmap gets `/roadmap/[nanoid]`
- Shareable on LinkedIn, Reddit, Twitter
- Dynamic OG image showing job + risk score
- Read-only with CTA to generate own

---

## 8. Database Schema (Supabase)

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
  session_id TEXT,
  clicked_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

## 9. Design System

**Colors (Tailwind):**
```
off-white: #EDEDED    (primary background)
charcoal-2: #161922  (cards, surfaces)
charcoal-3: #1E2230  (elevated surfaces)
border: #2A2F42      (borders)
text: #F0EFE8        (primary text)
muted: #8A8FA8       (secondary text)
faint: #565B72       (placeholder, labels)
lime: #CAFF4A        (primary accent — electric lime)
lime-soft: rgba(202,255,74,0.1) (lime backgrounds)
red: #FF5757         (high risk)
amber: #FFB547       (medium risk)
```

**Typography:**
- Display: `Outfit` (bold, geometric — for headlines)
- Body: `Outfit` (clean, professional)

---

## 10. Affiliate Stack

| Program | Commission | Cookie | Priority |
|---------|-----------|--------|----------|
| Coursera | 20–45% | 30 days | Primary |
| LinkedIn Learning | 35% + $10/trial | 30 days | Primary |
| BloomTech | $250–$500/student | 90 days | High-value |
| Springboard | $200–$500 | 60 days | High-value |
| Pluralsight | 50% / 15% annual | 30 days | Secondary |
| DataCamp | 40% recurring | 30 days | Secondary |
| Udemy | 15% | 7 days | Volume |

---

## 11. Revenue Projections

| Month | Visitors | Roadmaps | Affiliate Rev | Total |
|-------|---------|---------|--------------|-------|
| 1 | 2,000 | 400 | $800 | $820 |
| 3 | 15,000 | 3,000 | $6,000 | $6,150 |
| 6 | 50,000 | 10,000 | $20,000 | $20,500 |
| 12 | 150,000 | 30,000 | $60,000 | $61,500 |
| 18 | 300,000 | 60,000 | $120,000 | $123,000 |

---

## 12. Launch Sequence

**Week 1–2:** Data pipeline + occupation DB  
**Week 3–4:** Homepage generator (core feature)  
**Week 5–6:** Email capture + roadmap delivery  
**Week 7:** 50 programmatic occupation pages  
**Week 8:** Launch — Reddit, LinkedIn, Product Hunt  
**Month 2–3:** All 800 occupation pages, SEO  
**Month 4+:** Email newsletter, B2B portal  

---

## 13. Non-Goals (Phase 1)

- No user accounts
- No payment/subscriptions
- No mobile app
- No non-English languages
- No B2B portal for now (Phase 2)
- No job board integration
