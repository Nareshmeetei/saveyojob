---
name: GetsSkilled-data-pipeline
description: Build and run the occupation data pipeline for GetsSkilled.com. Use this skill when fetching from O*NET API, BLS OES API, or Frey-Osborne dataset. Also use when writing seed scripts, building database migrations, updating occupation records, or debugging missing/stale data. Contains everything to go from zero to a fully-seeded Supabase database.
---

# Data Pipeline Skill

## Overview

Run this pipeline before building any UI. It populates the Supabase `occupations` table with 800 records.

**Script:** `scripts/seed-occupations.ts`  
**Run:** `pnpm tsx scripts/seed-occupations.ts`  
**Time:** ~2–3 hours (API rate limits)

## Data Sources

### 1. Frey-Osborne Dataset
- **Download:** Oxford Martin School "Future of Employment" supplementary materials
- **Local file:** `data/frey-osborne.csv`
- **Format:** `soc_code, occupation_name, probability`
- **Note:** Uses 2010 SOC codes → map to 2018 SOC via `data/soc-crosswalk.csv`

### 2. O*NET API
- **Register:** https://services.onetcenter.org/ (free, 1–2 day approval)
- **Rate limit:** 100 req/min
- **Credentials:** ONET_USERNAME + ONET_PASSWORD in env
- **Base:** `https://services.onetcenter.org/ws/online/occupations`
- **Endpoints:**
  - Tasks: `GET /{soc}/summary/tasks`
  - Skills: `GET /{soc}/summary/skills`
  - Auth: `Authorization: Basic base64(user:pass)`
- **Select:** Top 5 tasks by importance score, Top 6 skills by importance

### 3. BLS OES (Wages)
- **Easiest approach:** Download full CSV from https://www.bls.gov/oes/current/oes_nat.htm
- **Save as:** `data/bls-oes-national.csv`
- **Columns needed:** `occ_code, occ_title, a_median` (annual median wage), `tot_emp`
- **API key:** BLS_API_KEY in env (backup for specific lookups)

### 4. BLS Occupational Outlook Handbook
- **Download:** https://www.bls.gov/ooh/ (projections CSV)
- **Save as:** `data/ooh-projections.csv`
- **Columns needed:** `occ_code, employment_change_percent_2022_2032`

## Priority Occupations (Build First — Highest Search Volume)

```typescript
export const TIER_1_OCCUPATIONS = [
  { title: 'Paralegal', soc: '23-2011.00', slug: 'paralegal' },
  { title: 'Accountant', soc: '13-2011.00', slug: 'accountant' },
  { title: 'Financial Analyst', soc: '13-2051.00', slug: 'financial-analyst' },
  { title: 'Data Entry Clerk', soc: '43-9021.00', slug: 'data-entry-clerk' },
  { title: 'Customer Service Representative', soc: '43-4051.00', slug: 'customer-service-rep' },
  { title: 'HR Specialist', soc: '13-1071.00', slug: 'hr-specialist' },
  { title: 'Copywriter', soc: '27-3043.00', slug: 'copywriter' },
  { title: 'Market Research Analyst', soc: '13-1161.00', slug: 'market-research-analyst' },
  { title: 'Insurance Underwriter', soc: '13-2053.00', slug: 'insurance-underwriter' },
  { title: 'Bookkeeper', soc: '43-3031.00', slug: 'bookkeeper' },
  { title: 'Software Developer', soc: '15-1252.00', slug: 'software-developer' },
  { title: 'Graphic Designer', soc: '27-1024.00', slug: 'graphic-designer' },
  { title: 'Loan Officer', soc: '13-2072.00', slug: 'loan-officer' },
  { title: 'Tax Preparer', soc: '13-2082.00', slug: 'tax-preparer' },
  { title: 'Content Writer', soc: '27-3043.00', slug: 'content-writer' },
  { title: 'Medical Coder', soc: '29-2072.00', slug: 'medical-coder' },
  { title: 'Recruiter', soc: '13-1071.00', slug: 'recruiter' },
  { title: 'Legal Secretary', soc: '43-6012.00', slug: 'legal-secretary' },
  { title: 'Claims Adjuster', soc: '13-1031.00', slug: 'claims-adjuster' },
  { title: 'Real Estate Agent', soc: '41-9022.00', slug: 'real-estate-agent' },
];
```

## Seed Script Skeleton

```typescript
// scripts/seed-occupations.ts
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import { parse } from 'csv-parse/sync';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// Load static files
const freyData = loadFreyOsborne('data/frey-osborne.csv');
const blsData = loadBLS('data/bls-oes-national.csv');
const oohData = loadOOH('data/ooh-projections.csv');

async function seedOccupation(occ: typeof TIER_1_OCCUPATIONS[0]) {
  const frey = freyData[occ.soc] ?? { probability: 0.5 };
  const bls = blsData[occ.soc.slice(0, 7)] ?? {};
  const ooh = oohData[occ.soc.slice(0, 7)] ?? {};
  const onet = await fetchOnet(occ.soc);
  
  await supabase.from('occupations').upsert({
    soc_code: occ.soc,
    title: occ.title,
    slug: occ.slug,
    automation_probability: frey.probability,
    risk_level: getRiskLevel(frey.probability),
    median_annual_wage: bls.median_wage ?? null,
    employment_count: bls.employment ?? null,
    ten_year_growth_pct: ooh.growth_pct ?? null,
    tasks: onet.tasks.slice(0, 7),
    core_skills: onet.skills.slice(0, 6),
    affiliate_courses: getAffiliateCourses(occ.slug),
  }, { onConflict: 'soc_code' });

  console.log(`✓ ${occ.title} (${(frey.probability * 100).toFixed(0)}% risk)`);
}

function getRiskLevel(p: number) {
  if (p > 0.70) return 'Very High';
  if (p > 0.50) return 'High';
  if (p > 0.30) return 'Moderate';
  return 'Low';
}

async function fetchOnet(soc: string) {
  const headers = {
    Authorization: 'Basic ' + Buffer.from(
      `${process.env.ONET_USERNAME}:${process.env.ONET_PASSWORD}`
    ).toString('base64')
  };
  const base = `https://services.onetcenter.org/ws/online/occupations/${soc}`;
  
  const [tasksRes, skillsRes] = await Promise.all([
    fetch(`${base}/summary/tasks`, { headers }),
    fetch(`${base}/summary/skills`, { headers }),
  ]);
  
  const tasks = (await tasksRes.json()).task ?? [];
  const skills = (await skillsRes.json()).element ?? [];
  
  // Add 600ms delay to respect rate limits
  await new Promise(r => setTimeout(r, 600));
  
  return {
    tasks: tasks.sort((a: any, b: any) => b.importance - a.importance)
               .map((t: any) => ({ name: t.statement, importance: t.importance })),
    skills: skills.sort((a: any, b: any) => b.score?.value - a.score?.value)
                  .map((s: any) => ({ name: s.name, importance: s.score?.value })),
  };
}

// Run
(async () => {
  for (const occ of TIER_1_OCCUPATIONS) {
    try { await seedOccupation(occ); }
    catch (e) { console.error(`✗ ${occ.title}:`, e); }
  }
  console.log('Done!');
})();
```

## Mock Data for Development

Create `data/seed-data.ts` with realistic hardcoded data for 5 occupations to use during dev (avoids API calls during active development):

Include for each: `soc_code, title, slug, automation_probability, risk_level, median_annual_wage, employment_count, ten_year_growth_pct, tasks (5 items), core_skills (6 items), affiliate_courses (3 items)`.

Realistic values:
- Paralegal: probability 0.94, wage $59,200, tasks like "Draft legal documents", "Conduct legal research"
- Accountant: probability 0.94, wage $79,880, tasks like "Prepare tax returns", "Reconcile accounts"
- Graphic Designer: probability 0.22, wage $57,990, tasks like "Create visual concepts", "Develop brand identity"
- Software Developer: probability 0.04, wage $124,200, tasks like "Design software architecture", "Review code"
- Financial Analyst: probability 0.23, wage $95,570, tasks like "Analyze financial data", "Build financial models"

## Affiliate Courses Data

Maintain in `data/affiliate-courses.json` (manually curated, NOT auto-generated):

```json
{
  "paralegal": [
    {
      "platform": "Coursera",
      "name": "Introduction to Legal Tech",
      "url": "https://www.coursera.org/learn/legal-tech",
      "skill": "Legal Technology",
      "icon": "⚖️"
    }
  ]
}
```

Add `?ranMID=40328&ranEAID=YOUR_ID&ranSiteID=YOUR_ID` to Coursera URLs.

## Validation

Run after seeding:
```bash
pnpm tsx scripts/validate-data.ts
```
Checks: all required fields present, probability 0–1, wage > 0, tasks ≥ 3, no duplicate slugs.
