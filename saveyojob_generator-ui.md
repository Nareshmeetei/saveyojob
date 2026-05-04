---
name: GetsSkilled-generator-ui
description: Build and modify the career roadmap generator — the core interactive tool on GetsSkilled.com. Use this skill when building the 3-step intake form, loading state, roadmap output, risk gauge, email capture gate, shareable roadmap pages, or any component in /components/generator/ or /components/roadmap/. Also use when modifying the Claude prompt or the /api/generate-roadmap API route.
---

# Generator UI Skill

## The Flow

```
Form (3 steps) → API call → Loading (8–12s) → Roadmap Output
                                               ↓
                                         [Share] [Email me] [Start over]
```

## Component Tree

```
app/page.tsx
└── <GeneratorSection>
    ├── <HeroText />          ← Headline + subhead + stats bar
    └── <GeneratorCard>
        ├── <FormState>
        │   ├── <JobTitleInput />      ← Autocomplete
        │   ├── <GoalChips />          ← 4 options
        │   ├── <TimeChips />          ← 3 options
        │   └── <GenerateButton />
        ├── <LoadingState />
        ├── <RoadmapResult>
        │   ├── <RiskGauge />
        │   ├── <TaskBreakdown />
        │   ├── <SkillsGrid />
        │   ├── <LearningTimeline />
        │   ├── <CourseRecommendations />
        │   ├── <AlternativeCareers />
        │   └── <ResultActions />
        └── <ErrorState />
```

## State Types

```typescript
type GeneratorView = 'form' | 'loading' | 'result' | 'error';

type GoalType = 'stay_upskill' | 'transition_new' | 'move_into_ai' | 'understand_risk';
type TimeType = 'minimal' | 'moderate' | 'intensive';

interface FormData {
  jobTitle: string;
  socCode?: string;
  goal: GoalType | null;
  timeCommitment: TimeType | null;
}

interface RoadmapData {
  riskScore: number;          // 0–100
  riskLevel: 'Low' | 'Moderate' | 'High' | 'Very High';
  riskSummary: string;
  tasks: Array<{ name: string; risk: 'High' | 'Medium' | 'Low'; reason: string }>;
  skills: Array<{ name: string; why: string }>;
  timeline: Array<{ period: string; title: string; desc: string }>;
  courses: Array<{ name: string; platform: string; skill: string; url: string; icon: string }>;
  alternativeCareers: string[];
  positiveOutlook: string;
}
```

## Goal Chips (exact copy)

```typescript
const GOALS = [
  { value: 'stay_upskill', label: 'Stay in my field, AI-proof my skills' },
  { value: 'transition_new', label: 'Transition to an AI-resistant career' },
  { value: 'move_into_ai', label: 'Move into an AI-related role' },
  { value: 'understand_risk', label: 'Just understand my risk level' },
];
```

## Time Chips (exact copy)

```typescript
const TIME_OPTIONS = [
  { value: 'minimal', label: '2–4 hrs/week', sub: 'Gradual, 6–9 months' },
  { value: 'moderate', label: '5–10 hrs/week', sub: 'Focused, 3–5 months' },
  { value: 'intensive', label: 'Full-time', sub: 'Bootcamp pace, 2–3 months' },
];
```

## Loading State Steps

Show 5 steps staggered 1.5s apart:
1. "Analyzing automation risk for your role…"
2. "Breaking down your tasks one by one…"
3. "Mapping AI-resistant skills to build…"
4. "Building your personalized roadmap…"
5. "Curating the best courses for you…"

After 6 seconds, show: "Almost there — this usually takes 10–15 seconds"

## Risk Gauge (SVG)

```typescript
// Circular SVG gauge
const RADIUS = 38;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
const dashOffset = CIRCUMFERENCE - (score / 100) * CIRCUMFERENCE;

// Color by score
const color = score > 70 ? '#FF5757'   // red
            : score > 40 ? '#FFB547'   // amber
            : '#CAFF4A';               // lime

// SVG setup: viewBox="0 0 88 88", rotate(-90deg) on SVG element
// Animate: CSS transition on stroke-dashoffset, duration 1.2s, ease-out
// Animate only when enters viewport (IntersectionObserver)
```

## API Route — /api/generate-roadmap/route.ts

```typescript
// POST handler
// 1. Parse + validate request with Zod
// 2. Rate check (3/IP/day via Supabase or upstash)
// 3. Fetch occupation data from Supabase if socCode provided
// 4. Call Anthropic with system + user prompt (see below)
// 5. Parse Claude JSON response
// 6. Validate with Zod schema
// 7. Save to roadmaps table
// 8. Return validated roadmap data

import Anthropic from '@anthropic-ai/sdk';
const client = new Anthropic(); // reads ANTHROPIC_API_KEY from env
```

## Claude System Prompt

```
You are an expert career transition advisor specializing in AI automation and workforce transitions. You have deep knowledge of Oxford/Frey-Osborne automation research, McKinsey task automation data, BLS occupational statistics, and current AI capabilities.

Your role: give workers honest, specific, actionable career guidance when worried about AI replacing their job. Be direct and realistic but always empowering — focus on what they CAN do, not just what's at risk.

Respond with valid JSON only. No markdown. No explanation outside the JSON.
```

## Claude User Prompt Template

```typescript
const goalMap = {
  stay_upskill: 'stay in their current field and AI-proof their existing skills',
  transition_new: 'transition to a completely new AI-resistant career',
  move_into_ai: 'move into an AI-related role',
  understand_risk: 'understand their current AI risk level',
};

const timeMap = {
  minimal: '2–4 hours per week (gradual 6–9 month plan)',
  moderate: '5–10 hours per week (focused 3–5 month plan)',
  intensive: 'full-time (bootcamp pace, 2–3 months)',
};

const userPrompt = `Generate a personalized AI career roadmap for this worker:

JOB: ${jobTitle}
GOAL: ${goalMap[goal]}
LEARNING TIME: ${timeMap[timeCommitment]}
${occupationData ? `
DATA CONTEXT:
- Automation probability: ${(occupationData.automation_probability * 100).toFixed(0)}%
- Median salary: $${occupationData.median_annual_wage?.toLocaleString()}/yr
- 10-year growth: ${occupationData.ten_year_growth_pct}%
- Key tasks: ${occupationData.tasks?.slice(0,6).map((t: any) => t.name).join(', ')}
` : ''}

Return ONLY this JSON (no markdown, no extra text):
{
  "riskScore": <integer 0-100>,
  "riskLevel": "<Low|Moderate|High|Very High>",
  "riskSummary": "<2 honest sentences specific to this role and goal>",
  "tasks": [
    {"name": "<specific task in this job>", "risk": "<High|Medium|Low>", "reason": "<why AI affects this>"},
    {"name": "...", "risk": "...", "reason": "..."},
    {"name": "...", "risk": "...", "reason": "..."},
    {"name": "...", "risk": "...", "reason": "..."},
    {"name": "...", "risk": "...", "reason": "..."}
  ],
  "skills": [
    {"name": "<specific learnable skill>", "why": "<why valuable + AI-resistant, 1-2 sentences>"},
    {"name": "...", "why": "..."},
    {"name": "...", "why": "..."},
    {"name": "...", "why": "..."}
  ],
  "timeline": [
    {"period": "<Month 1–2>", "title": "<milestone>", "desc": "<what to do, 2-3 sentences>"},
    {"period": "<Month 3–4>", "title": "...", "desc": "..."},
    {"period": "<Month 5–6>", "title": "...", "desc": "..."},
    {"period": "<Month 7+>", "title": "...", "desc": "..."}
  ],
  "courses": [
    {"name": "<real course that exists>", "platform": "<Coursera|LinkedIn Learning|Pluralsight|Udemy|edX|DataCamp>", "skill": "<which skill above>", "url": "<real URL>", "icon": "<emoji>"},
    {"name": "...", "platform": "...", "skill": "...", "url": "...", "icon": "..."},
    {"name": "...", "platform": "...", "skill": "...", "url": "...", "icon": "..."}
  ],
  "alternativeCareers": ["<AI-resistant job>", "<job>", "<job>"],
  "positiveOutlook": "<1 encouraging, specific sentence for this person>"
}`;
```

## Zod Validation Schema

```typescript
import { z } from 'zod';

export const RoadmapSchema = z.object({
  riskScore: z.number().int().min(0).max(100),
  riskLevel: z.enum(['Low', 'Moderate', 'High', 'Very High']),
  riskSummary: z.string().min(20).max(400),
  tasks: z.array(z.object({
    name: z.string().min(3),
    risk: z.enum(['High', 'Medium', 'Low']),
    reason: z.string()
  })).length(5),
  skills: z.array(z.object({
    name: z.string().min(3),
    why: z.string().min(20)
  })).length(4),
  timeline: z.array(z.object({
    period: z.string(),
    title: z.string(),
    desc: z.string()
  })).length(4),
  courses: z.array(z.object({
    name: z.string(),
    platform: z.string(),
    skill: z.string(),
    url: z.string().url(),
    icon: z.string()
  })).length(3),
  alternativeCareers: z.array(z.string()).length(3),
  positiveOutlook: z.string()
});
```

## Email Gate Logic

```
Roadmap #1 → Show full, no gate
Click "Generate another" → Show email capture (modal or inline)
Enter email → POST /api/subscribe → Set cookie 'gs_subscribed' (365d)
Already has cookie → Skip gate, generate freely

Cookie value: hex of sha256(email) — no PII in cookie
```

## Sharing Flow

```typescript
// On "Share" click:
// 1. POST /api/save-roadmap with roadmapData
// 2. Get back share_id (nanoid 10 chars)
// 3. Show: GetsSkilled.com/roadmap/{share_id}
// 4. Copy-to-clipboard button
// 5. Social buttons:
//    LinkedIn: "I just found out my AI risk as a [job]. Here's my free reskilling roadmap 👇"
//    Twitter/X: "Found out if AI will replace my [job]. The answer might surprise you 👇 @GetsSkilled"
//    Reddit: "Sharing my AI career risk assessment — might be useful for others here"
```

## Error Messages (user-facing, never technical)

```typescript
const ERRORS = {
  RATE_LIMIT: "You've hit the daily limit. Enter your email for unlimited roadmaps.",
  TIMEOUT: "This took longer than expected. Please try again.",
  UNKNOWN_JOB: "We don't have specific data for that role yet. Try a similar title.",
  GENERIC: "Something went wrong on our end. Please try again in a moment.",
};
```
