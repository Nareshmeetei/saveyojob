---
name: Saveyojob-generator-ui
description: Build and modify the HeroRiskGame — the core interactive risk calculator on Saveyojob.com. Use this skill when working on the risk calculator widget, its phases (intro/pick/q1/q2/q3/calc/result/resume_calc/resume_result), the prefilledJobId prop used on occupation pages, the titleToJobId mapping, the IntroPhase component, the loading/result states, or the /api/generate-roadmap API route.
---

# Generator UI Skill

## Component Location

```
src/components/hero/HeroRiskGame.tsx   ← single file, all phases inline
```

The component is used in two contexts:
1. **Homepage (`/`)** — full pick-grid flow, no `prefilledJobId`
2. **Occupation pages (`/jobs/[slug]/`)** — compact IntroPhase, `prefilledJobId` pre-selects the job category

---

## Phase Flow

```
Homepage (no prefilledJobId):
  pick → q1 → q2 → q3 → calc → result
               ↑ back              ↓
              pick               reset → pick
                                 resume → resume_calc → resume_result

Occupation page (prefilledJobId set):
  intro → q1 → q2 → q3 → calc → result
           ↑ back              ↓
          intro              reset → intro
                             resume → resume_calc → resume_result
```

The `intro` phase is only shown when `prefilledJobId` is provided. Navigating "back" from q1 returns to `intro` (not `pick`). Resetting returns to `intro` (not `pick`).

---

## Component Signature

```typescript
export default function HeroRiskGame({ prefilledJobId }: { prefilledJobId?: string } = {})
```

**`prefilledJobId`** — optional string. When set:
- Initial phase is `'intro'` instead of `'pick'`
- The job matching this ID is pre-selected (looked up via `allJobs.find(j => j.id === prefilledJobId)`)
- IntroPhase renders a compact single-button UI
- Back navigation and reset return to `'intro'` instead of `'pick'`

---

## Phase Type

```typescript
type Phase =
  | 'intro'        // compact CTA — only shown when prefilledJobId is set
  | 'pick'         // job category tile grid — shown on homepage
  | 'q1'           // question 1
  | 'q2'           // question 2
  | 'q3'           // question 3
  | 'calc'         // animated calculation loading
  | 'result'       // score + breakdown
  | 'resume_calc'  // resume upload processing
  | 'resume_result'; // resume-based result
```

---

## titleToJobId() — Occupation Page Mapping

Converts a free-form occupation title (from `SEED_OCCUPATIONS`) to a HeroRiskGame job category ID. Used as `prefilledJobId={titleToJobId(occ.title)}` on occupation pages.

```typescript
function titleToJobId(title: string): string {
  const t = title.toLowerCase();
  if (/account|financ|bookkeep|audit|tax|payroll|treasury|budget|controller|cfo/.test(t))
    return 'finance';
  if (/software|developer|programmer|devops|sre|web dev/.test(t))
    return 'tech';
  if (/data\s*entry|data\s*clerk|transcri/.test(t))
    return 'admin';
  if (/customer\s*service|support\s*rep|call\s*cent/.test(t))
    return 'customer-service';
  if (/paralegal|legal\s*assist|law\s*clerk/.test(t))
    return 'legal';
  if (/graphic\s*design|illustrat|visual\s*design/.test(t))
    return 'design';
  if (/market\s*research|market\s*analyst|consumer\s*insight/.test(t))
    return 'marketing';
  if (/hr\s*specialist|human\s*resources|recruiter|talent/.test(t))
    return 'hr';
  return 'other';
}
```

When a new occupation is added to `SEED_OCCUPATIONS`, check whether its title matches an existing pattern. If not, add a new regex branch and a corresponding job in the HeroRiskGame `JOBS` / `OTHER_JOBS` arrays.

---

## IntroPhase Component

Shown on occupation pages when `prefilledJobId` is set. Replaces the full tile-grid pick phase with a compact two-button layout.

```typescript
function IntroPhase({
  job,
  onStart,
  onUploadClick,
}: {
  job: Job;
  onStart: () => void;
  onUploadClick: () => void;
}) {
  return (
    <div>
      {/* Primary CTA — brand colour, no icon, centered text */}
      <motion.button
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.97 }}
        onClick={onStart}
        className="w-full p-4 rounded-xl flex items-center justify-center cursor-pointer bg-fire hover:brightness-105 transition-all duration-150"
      >
        <span className="text-[14px] font-bold text-bg">Check my risk score</span>
      </motion.button>

      {/* "Or" separator */}
      <div className="flex items-center gap-3 my-3">
        <div className="flex-1 h-px bg-line" />
        <span className="text-[12px] font-medium text-ink-3">Or</span>
        <div className="flex-1 h-px bg-line" />
      </div>

      {/* Resume upload button */}
      <button
        onClick={onUploadClick}
        className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-line bg-surface text-[13px] font-semibold text-ink-2 hover:border-line-2 hover:text-ink transition-colors duration-150"
      >
        <FileUp size={15} strokeWidth={1.5} className="text-ink-3" />
        Upload your resume to calculate your score
      </button>
    </div>
  );
}
```

**Rules:**
- The primary button uses `bg-fire` (brand colour `#0C526D`) with `text-bg` (white)
- No icons on the primary button — text centered, no flexbox gap
- The job category subtitle (e.g. "Finance & Accounting") is NOT shown — the occupation page H1 provides the context
- The resume upload button retains its `FileUp` icon
- `onStart` calls `startPrefilled()` which sets `job = prefilledJob` and advances to `'q1'`
- `onUploadClick` opens the resume upload flow (`setPhase('resume_calc')`)

---

## Key Internal Functions

```typescript
// Jump to q1 with the prefilled job pre-selected (used by IntroPhase)
function startPrefilled() {
  if (prefilledJob) { setJob(prefilledJob); setPhase('q1'); }
}

// Navigate back — respects intro vs pick as the starting phase
function goBack() {
  if (phase === 'q1') {
    if (prefilledJob) { setPhase('intro'); }
    else { setJob(null); setPhase('pick'); }
  } else if (phase === 'q2') setPhase('q1');
  else if (phase === 'q3') setPhase('q2');
}

// Reset to initial state — respects intro vs pick
function reset() {
  setPhase(prefilledJob ? 'intro' : 'pick');
  setJob(null); setWorkAdj(0); setRepAdj(0);
  setScore(0); setDisplayScore(0); setCalcStep(0);
  setResumeJob(null); setResumeFileName('');
}
```

---

## Occupation Page Usage

```tsx
// src/app/jobs/[slug]/page.tsx
import HeroRiskGame from '@/components/hero/HeroRiskGame';

// Inside the page JSX, Section 7:
<HeroRiskGame prefilledJobId={titleToJobId(occ.title)} />
```

The calculator renders as a contained card within the page layout — not full-screen. The IntroPhase gives the visitor a low-friction entry into the full risk quiz pre-mapped to their job category.

---

## Roadmap API Route

```
POST /api/generate-roadmap
```

Requires `ANTHROPIC_API_KEY` in `.env.local`. Uses `claude-sonnet-4-6` (or latest available model) via the Anthropic SDK.

```typescript
// lib/anthropic.ts
import Anthropic from '@anthropic-ai/sdk';
let _client: Anthropic | null = null;

export const anthropicClient = {
  get() {
    if (!_client) {
      if (!process.env.ANTHROPIC_API_KEY) {
        throw new Error('ANTHROPIC_API_KEY is not set. Add it to .env.local');
      }
      _client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
    }
    return _client;
  },
};
```

---

## Loading State Steps

Show 5 steps staggered 1.5s apart:
1. "Analyzing automation risk for your role…"
2. "Breaking down your tasks one by one…"
3. "Mapping AI-resistant skills to build…"
4. "Building your personalized roadmap…"
5. "Curating the best courses for you…"

After 6 seconds, show: "Almost there — this usually takes 10–15 seconds"

---

## State Types

```typescript
type Phase = 'intro' | 'pick' | 'q1' | 'q2' | 'q3' | 'calc' | 'result' | 'resume_calc' | 'resume_result';

interface Job {
  id: string;
  label: string;
  category: string;
  baseScore: number;
}
```

---

## Claude Prompt Templates

### System prompt
```
You are an expert career transition advisor specializing in AI automation and workforce transitions. You have deep knowledge of Oxford/Frey-Osborne automation research, McKinsey task automation data, BLS occupational statistics, and current AI capabilities.

Your role: give workers honest, specific, actionable career guidance when worried about AI replacing their job. Be direct and realistic but always empowering — focus on what they CAN do, not just what's at risk.

Respond with valid JSON only. No markdown. No explanation outside the JSON.
```

### User prompt structure
```typescript
const goalMap = {
  stay_upskill:   'stay in their current field and AI-proof their existing skills',
  transition_new: 'transition to a completely new AI-resistant career',
  move_into_ai:   'move into an AI-related role',
  understand_risk: 'understand their current AI risk level',
};

const timeMap = {
  minimal:   '2–4 hours per week (gradual 6–9 month plan)',
  moderate:  '5–10 hours per week (focused 3–5 month plan)',
  intensive: 'full-time (bootcamp pace, 2–3 months)',
};
```

Response schema: `riskScore`, `riskLevel`, `riskSummary`, `tasks[5]`, `skills[4]`, `timeline[4]`, `courses[3]`, `alternativeCareers[3]`, `positiveOutlook`.

---

## Error Messages (user-facing only)

```typescript
const ERRORS = {
  RATE_LIMIT: "You've hit the daily limit. Enter your email for unlimited roadmaps.",
  TIMEOUT:    "This took longer than expected. Please try again.",
  UNKNOWN_JOB: "We don't have specific data for that role yet. Try a similar title.",
  GENERIC:    "Something went wrong on our end. Please try again in a moment.",
};
```
