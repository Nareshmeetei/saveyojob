# Saveyojob.com — Tools Build Plan

17 tools across 6 categories. Build one at a time. Mark each as complete when shipped.

---

## How to use this file

Each tool entry has:
- **Status** — `planned` | `in-progress` | `live`
- **Priority** — `Build First` | `High Priority` | `standard`
- **Route** — the Next.js App Router path
- **Component** — the main component file to create
- **Description** — what it does for the user
- **Input** — what data the user provides
- **Output** — what they get back
- **Data source** — where the data/logic comes from
- **Notes** — design or UX considerations

When starting a tool, change status to `in-progress`. When shipped, change to `live`.

---

## Group 1 — Resume

### Tool 01 — ATS Resume Checker
- **Status:** `planned`
- **Priority:** Build First
- **Revenue:** Free 3/day · $12/mo premium (unlimited + AI rewrite suggestions)
- **Route:** `/tools/ats-checker`
- **Component:** `src/components/tools/ATSChecker.tsx`
- **Description:** Paste resume + job description → instant ATS compatibility score, missing keywords, and exact fixes
- **Input:** Resume text (textarea paste) OR file upload (.pdf/.docx/.txt) + Job description text
- **Output:** ATS score 0–100, missing keywords highlighted, formatting issues flagged, specific lines to rewrite
- **Data source:** Client-side text parsing; keyword list per job category; ATS rules as static logic
- **Notes:** Two-panel layout — paste on left, results on right. Animate score count-up (same as homepage risk score). "ATS resume checker" = 63,053 documented monthly searches. 75% of resumes filtered before a human sees them. Highest volume entry point on the platform.

### Tool 02 — Resume Bullet Rewriter
- **Status:** `planned`
- **Priority:** Build First
- **Revenue:** Free 5 bullets · $9/mo unlimited + tone matching + keywords from pasted JD
- **Route:** `/tools/resume-bullets`
- **Component:** `src/components/tools/ResumeBulletRewriter.tsx`
- **Description:** Paste weak resume bullets → quantified, impact-first rewrites that pass ATS and impress recruiters
- **Input:** One bullet point (textarea, 1–3 sentences) + optional job description for keyword matching
- **Output:** 3 upgraded versions using XYZ formula (Accomplished X by doing Y, resulting in Z), copy button per version
- **Data source:** Claude API (haiku) for rewrites; static XYZ template for MVP fallback
- **Notes:** Three result cards side-by-side on desktop, stacked on mobile. Each has a "Use this" copy button. Single-purpose — one bullet at a time. Before/after shareable on LinkedIn. Maximum time-on-site of any resume feature.

### Tool 03 — Resume Summary Generator
- **Status:** `planned`
- **Priority:** standard
- **Revenue:** Free — funnel to ATS Checker and premium
- **Route:** `/tools/resume-summary`
- **Component:** `src/components/tools/ResumeSummaryGenerator.tsx`
- **Description:** Enter job history + target role → AI writes a 3-sentence professional summary that opens doors
- **Input:** Job title + years experience + 2–3 key skills + target role
- **Output:** 3 summary options (formal, concise, achievement-focused) ready to paste directly
- **Data source:** Claude API (haiku) or template-based MVP
- **Notes:** Quick win — users know they need a summary but freeze when writing about themselves. Natural funnel: generates summary → wants full resume → upgrades or uses ATS Checker next.

---

## Group 2 — Cover Letter & LinkedIn

### Tool 04 — Cover Letter Generator
- **Status:** `planned`
- **Priority:** Build First
- **Revenue:** Free 1 letter · Email gate for 2nd · $9/mo unlimited + tone variants + follow-up templates
- **Route:** `/tools/cover-letter`
- **Component:** `src/components/tools/CoverLetterGenerator.tsx`
- **Description:** Paste job description + 3 achievements → a specific, non-generic cover letter in 30 seconds
- **Input:** Job description + company name + 3 achievements + tone preference (professional/casual/direct)
- **Output:** Full cover letter that mirrors JD language, names the company, leads with most relevant achievement. Copy-to-clipboard + download .txt
- **Data source:** Claude API (haiku) with structured prompt; template fallback for MVP
- **Notes:** "Cover letter generator" = millions of monthly searches. Gate 2nd generation behind email — single largest email capture on the platform. Tailored cover letters increase interview rates up to 50%.

### Tool 05 — LinkedIn Headline Generator
- **Status:** `planned`
- **Priority:** Build First
- **Revenue:** Free — leads to LinkedIn Summary Generator
- **Route:** `/tools/linkedin-headline`
- **Component:** `src/components/tools/LinkedInHeadlineGenerator.tsx`
- **Description:** Enter job title + skills + industry → 5 keyword-rich LinkedIn headlines that get found by recruiters
- **Input:** Current title + target role + 2–3 top skills
- **Output:** 5 headline options at different formulas (job title + value prop, specialty + audience, achievement-led). Shows which keywords recruiters search most.
- **Data source:** Template-based with keyword injection; Claude API for polish
- **Notes:** 87% of recruiters use LinkedIn as primary candidate search tool. LinkedIn headline carries highest search algorithm weight of any profile section. Pair with Tool 06 as a combo — after headline, user immediately wants matching About section.

### Tool 06 — LinkedIn Summary Generator
- **Status:** `planned`
- **Priority:** standard
- **Revenue:** Free — highest repeat visit rate of any tool
- **Route:** `/tools/linkedin-summary`
- **Component:** `src/components/tools/LinkedInSummaryGenerator.tsx`
- **Description:** Answer 4 questions → a recruiter-optimized LinkedIn About section that shows up in search
- **Input:** Industry + years experience + what you want people to contact you for + 1 career achievement
- **Output:** 3-paragraph About section with keyword integration, first-person voice, and a clear call-to-action
- **Data source:** Claude API (haiku) or template-based MVP
- **Notes:** Natural pairing with Tool 05 (Headline Generator) — two-tool combo in one visit. Every time a user updates their LinkedIn, they return. Highest repeat visit rate of any tool.

---

## Group 3 — Interview Prep

### Tool 07 — Interview Questions Generator
- **Status:** `planned`
- **Priority:** High Priority
- **Revenue:** Free 5 questions · $15/mo unlimited + AI answer feedback + company question database
- **Route:** `/tools/interview-questions`
- **Component:** `src/components/tools/InterviewQuestionsGenerator.tsx`
- **Description:** Paste any job description → get the 10 most likely questions this company will ask, with answer frameworks
- **Input:** Paste job description + optional: interview type (behavioral / technical / situational)
- **Output:** 10 role-specific questions + STAR framework for each + what the interviewer is really assessing + common mistakes. Optional: paste your answer → AI gives feedback.
- **Data source:** Claude API (sonnet) for question generation; haiku for answer feedback
- **Notes:** Highest willingness-to-pay category. FinalRound AI charges $30/mo for this alone. Free: 5 questions without feedback. Premium converts highest of any tool. Candidates who practice specific questions get hired more often.

### Tool 08 — "Tell Me About Yourself" Builder
- **Status:** `planned`
- **Priority:** standard
- **Revenue:** Free — funnel to Interview Questions Generator
- **Route:** `/tools/tmay`
- **Component:** `src/components/tools/TMAYBuilder.tsx`
- **Description:** Answer 5 questions → a perfectly structured 60-second professional pitch for any role
- **Input:** Current role + biggest achievement + why leaving + target role + what makes you different
- **Output:** 60-second Present→Past→Future answer in first person, mentions company name, ready to read aloud. Word count + estimated read time. Audio read-aloud option (browser TTS).
- **Data source:** Template-based for MVP (no AI needed for v1); Claude API optional for polish
- **Notes:** "Tell me about yourself interview answer" = one of the most searched career phrases online. Every answer guide is generic — no tool takes your specific background and outputs your specific TMAY. Show answer in a speech-bubble-style box, not a textarea.

### Tool 09 — Thank You Email After Interview Generator
- **Status:** `planned`
- **Priority:** standard
- **Revenue:** Free — email capture. Natural extension to salary negotiation tool.
- **Route:** `/tools/thank-you-email`
- **Component:** `src/components/tools/ThankYouEmailGenerator.tsx`
- **Description:** Enter what was discussed → personalized follow-up email that references specific moments and keeps you top of mind
- **Input:** Interviewer name + company + role + 2 things discussed + whether they felt strong or uncertain
- **Output:** Specific thank-you email referencing conversation moments + reaffirms fit + addresses any hesitation. Subject line + body. Three tone variants (warm/professional/direct).
- **Data source:** Template-based with variable substitution; Claude API for personalization
- **Notes:** "Thank you email after interview" searched immediately post-interview — high urgency, high repeat use. 80% of job seekers don't send a follow-up. Those who do get callbacks 22% more often. Show email in card styled like an email client.

---

## Group 4 — Salary & Negotiation

### Tool 10 — Salary Negotiation Script Generator
- **Status:** `planned`
- **Priority:** High Priority
- **Revenue:** Free 1 script (conservative) · $9 one-time for all 3 scripts + counter-offer templates + raise version
- **Route:** `/tools/salary-negotiation`
- **Component:** `src/components/tools/SalaryNegotiationScript.tsx`
- **Description:** Enter job offer details → word-for-word negotiation scripts with 3 strategy options
- **Input:** Job title + offer amount + location + years experience + competing offer (optional)
- **Output:** 3 complete negotiation scripts — conservative (+10–15%), assertive (+20–30%), aggressive (30%+). Each includes opening line, counter argument, and how to handle pushback. Email version.
- **Data source:** Template-based with variable substitution; Claude API for tone adjustment
- **Notes:** "Salary negotiation" = 100,000+ monthly searches. People who negotiate first offer earn $1M+ more over a career — stakes justify $9 one-time payment instantly. Sequential reveal — show one script section at a time with Next button, like a rehearsal flow. Highest one-time payment conversion of any tool.

### Tool 11 — Salary Calculator by Role & Location
- **Status:** `planned`
- **Priority:** standard
- **Revenue:** Display ads (salary/finance RPM $12–20). Premium: "Am I underpaid?" report $12 one-time. Affiliate: AI skills courses.
- **Route:** `/tools/salary-calculator`
- **Component:** `src/components/tools/SalaryCalculator.tsx`
- **Description:** Search job title + city → real median salary, salary range by experience, and the AI skills premium for that specific role
- **Input:** Job title (text or chip) + location (city or "Remote") + experience level (junior / mid / senior)
- **Output:** Salary range (25th/50th/75th percentile), AI skills premium overlay ("Paralegal no AI: $59k → with AI: $79k"), comparison to national median, sources cited
- **Data source:** Static BLS + salary data by category; AI premium from McKinsey/WEF reports. Update periodically as JSON.
- **Notes:** SaveYoJob unique angle: show AI skills salary premium for each role — data exists nowhere else as a free role-specific lookup. 3-bar visualization — 25th / median / 75th. Permanent bookmark tool — people return every role change.

### Tool 12 — Raise Request Email Builder
- **Status:** `planned`
- **Priority:** standard
- **Revenue:** Free — email capture. High repeat use every annual review season.
- **Route:** `/tools/raise-email`
- **Component:** `src/components/tools/RaiseEmailBuilder.tsx`
- **Description:** Tell us your accomplishments → a manager-ready raise request email that makes the case without the awkwardness
- **Input:** Current salary + target salary + 3–5 accomplishments (bullet points) + time in role
- **Output:** Professional email leading with business value, quantifying contributions, referencing market data, making a specific ask. Subject line + body. One-click copy entire email.
- **Data source:** Template-based with variable substitution
- **Notes:** "How to ask for a raise email" = massive seasonal search spikes Q4 + January. Naturally pairs with Salary Calculator. Show email in card-as-email-client format. High repeat visit — comes back every raise season.

---

## Group 5 — Job Search Management

### Tool 13 — Job Application Tracker
- **Status:** `planned`
- **Priority:** High Priority
- **Revenue:** Free forever (unlimited) · $10/mo premium: reminder automation + AI follow-up generator + application analytics
- **Route:** `/tools/job-tracker`
- **Component:** `src/components/tools/JobApplicationTracker.tsx`
- **Description:** Track every application, interview, and follow-up in one Kanban board — and never miss a deadline
- **Input:** Company + role + date + follow-up date + notes. No account needed to start.
- **Output:** Kanban board: Saved → Applied → Interview → Offer → Rejected. Export as spreadsheet. Add from URL.
- **Data source:** localStorage for persistence (no backend needed for v1). Premium: server-side with Vercel KV.
- **Notes:** Average successful job search = 100–200 applications (NBER 2025). Entire companies built on this: Huntr ($10/mo), Teal, Prentus, Careerflow (1M+ users). Free + no account = immediate adoption. Daily return visits = highest session frequency of any tool.

### Tool 14 — Job Description Decoder
- **Status:** `planned`
- **Priority:** standard
- **Revenue:** Free — 15+ min session time. Internal funnel to Cover Letter Generator and ATS Checker.
- **Route:** `/tools/jd-decoder`
- **Component:** `src/components/tools/JDDecoder.tsx`
- **Description:** Paste any job posting → see what they're really asking for, hidden red flags, salary range estimate, and exact phrases to use in your application
- **Input:** Full job description text (textarea)
- **Output:** 5 real skills they'll actually hire for · red flags decoded · company culture signals from word choice · exact phrases to mirror in application · salary range from comparable roles
- **Data source:** Claude API (haiku) with structured JSON output; regex-based MVP fallback
- **Notes:** Output as labeled sections with callout-style boxes. Red flags use `text-critical`. Tailoring to JD produces 3× more interviews — this is the cheat code professional coaches sell for $200/hr. Unique tool — low competition. High session depth.

### Tool 15 — Resignation Letter Generator
- **Status:** `planned`
- **Priority:** standard
- **Revenue:** Free — highest-intent user segment. Email capture converts extremely well.
- **Route:** `/tools/resignation-letter`
- **Component:** `src/components/tools/ResignationLetterGenerator.tsx`
- **Description:** Enter your situation → a professional resignation letter that exits gracefully and protects your references
- **Input:** Company name + manager name + last day + reason for leaving (optional) + tone (gracious/neutral/firm)
- **Output:** Professional letter that maintains goodwill, protects references, handles the paperwork correctly. Copy + download.
- **Data source:** Template-based with variable substitution
- **Notes:** "Resignation letter" = massive spikes Q1 and after bonus season. Someone generating a resignation letter has already decided to leave — highest-intent user on the platform. Full funnel: resignation → cover letter → ATS checker → interview prep. Loopcv features this prominently on their homepage.

---

## Group 6 — AI Career Tools (SaveYoJob-Specific)

### Tool 16 — AI Job Risk Scanner
- **Status:** `live`
- **Priority:** Core product
- **Revenue:** Free forever — traffic anchor. Every output links to Tool 17 (affiliate revenue driver).
- **Route:** `/` (homepage hero) + `/jobs/` + `/jobs/[slug]/`
- **Component:** `src/components/hero/HeroRiskGame.tsx` + `src/app/jobs/[slug]/page.tsx`
- **Description:** Enter job title → task-by-task automation risk score, AI tools doing your work, salary impact projection
- **Input:** Job category selection OR resume file upload
- **Output:** Risk score 0–100, task-level breakdown, which AI tools are doing each task, projected salary impact (act vs don't act), reskilling roadmap CTA
- **Data source:** Static seed data (`data/seed-data.ts`); resume filename parsed client-side
- **Notes:** Already live. "Will AI replace my job" = 500K+ aggregate monthly searches. The hook that makes every other tool make sense. JobRiskCheck.com (basic version) reports 50K+ users with zero marketing. Every output CTA links to Tool 17.

### Tool 17 — Reskilling Roadmap Generator
- **Status:** `live`
- **Priority:** Primary revenue engine
- **Revenue:** Free, email-gated on 2nd use. Every course recommendation = affiliate link. Coursera pays 45% ($15–$180/sale). Bootcamps pay $250–$500/referral.
- **Route:** `/roadmap` + embedded in `/jobs/[slug]/`
- **Component:** `src/app/roadmap/RoadmapClient.tsx` + `src/components/generator/GeneratorWizard.tsx`
- **Description:** Job title + goal + time available → week-by-week reskilling plan with specific courses, milestones, and salary targets
- **Input:** Job title + experience level + goal + weekly time commitment (4-step wizard)
- **Output:** Personalized roadmap: risk score, salary projection, task breakdown, 4 skills to build, 6-phase weekly plan, 3 curated courses (affiliate links), 3 alternative career paths, first 7 days action plan
- **Data source:** Claude API (`claude-sonnet-4-6`) via `/api/generate-roadmap`. Share links via `/api/save-roadmap` (in-memory store, MVP).
- **Notes:** Already live. Design every other tool to funnel traffic here. At 300K visitors/mo: 1% bootcamp conversion = 3,000 × $350 = $1.05M/month. Make sure the `/roadmap` route is prominently linked from homepage and all tool pages.

---

## Build Order

### Phase 1 — No AI API needed (build immediately)

| # | Tool | Why first |
|---|------|-----------|
| 1 | Tool 08 — TMAY Builder | Template-based, quick win, no API |
| 2 | Tool 09 — Thank You Email Generator | Template-based, high urgency searches |
| 3 | Tool 12 — Raise Request Email Builder | Template-based, seasonal traffic |
| 4 | Tool 15 — Resignation Letter Generator | Template-based, highest-intent users |
| 5 | Tool 11 — Salary Calculator | Static BLS data, high search intent |
| 6 | Tool 13 — Job Application Tracker | localStorage, daily return visits |
| 7 | Tool 01 — ATS Resume Checker | Client-side text parsing, highest search volume |

### Phase 2 — Claude API (haiku, single-turn)

| # | Tool | Notes |
|---|------|-------|
| 8  | Tool 02 — Resume Bullet Rewriter | haiku, single-turn, highest time-on-site |
| 9  | Tool 04 — Cover Letter Generator | haiku, single-turn, largest email capture |
| 10 | Tool 05 — LinkedIn Headline Generator | haiku + templates, high repeat use |
| 11 | Tool 06 — LinkedIn Summary Generator | haiku, pairs with Tool 05 |
| 12 | Tool 03 — Resume Summary Generator | haiku, short output |
| 13 | Tool 10 — Salary Negotiation Script | templates + haiku polish |
| 14 | Tool 14 — Job Description Decoder | haiku, structured JSON output |

### Phase 3 — Claude API (sonnet / multi-step)

| # | Tool | Notes |
|---|------|-------|
| 15 | Tool 07 — Interview Questions Generator | sonnet for quality, haiku for feedback |

---

## Routes Reference

```
/tools/ats-checker          → Tool 01 — ATS Resume Checker
/tools/resume-bullets       → Tool 02 — Resume Bullet Rewriter
/tools/resume-summary       → Tool 03 — Resume Summary Generator
/tools/cover-letter         → Tool 04 — Cover Letter Generator
/tools/linkedin-headline    → Tool 05 — LinkedIn Headline Generator
/tools/linkedin-summary     → Tool 06 — LinkedIn Summary Generator
/tools/interview-questions  → Tool 07 — Interview Questions Generator
/tools/tmay                 → Tool 08 — TMAY Builder
/tools/thank-you-email      → Tool 09 — Thank You Email Generator
/tools/salary-negotiation   → Tool 10 — Salary Negotiation Script
/tools/salary-calculator    → Tool 11 — Salary Calculator
/tools/raise-email          → Tool 12 — Raise Request Email Builder
/tools/job-tracker          → Tool 13 — Job Application Tracker
/tools/jd-decoder           → Tool 14 — Job Description Decoder
/tools/resignation-letter   → Tool 15 — Resignation Letter Generator
/                           → Tool 16 — AI Job Risk Scanner (LIVE)
/roadmap                    → Tool 17 — Reskilling Roadmap Generator (LIVE)
```

---

*Last updated: May 2026*
