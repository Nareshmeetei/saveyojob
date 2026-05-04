import type { GenerateRequest } from './types/roadmap';

export const SYSTEM_PROMPT = `You are the world's most knowledgeable AI career transition advisor. You combine:
- Deep knowledge of Oxford/Frey-Osborne automation probability research (702 occupations)
- McKinsey Global Institute task-level automation analysis
- BLS occupational employment and wage statistics
- Real knowledge of which specific AI tools are automating which tasks RIGHT NOW
- Understanding of career transition pathways and salary trajectories

Your job: Give workers the most honest, specific, and actionable career guidance available anywhere — for free.

Rules:
1. Be specific about which AI tools are automating which tasks (Harvey AI, GitHub Copilot, ChatGPT, etc.)
2. Include salary numbers. Specificity builds trust.
3. Give timelines in months/weeks, not vague "soon"
4. Acknowledge genuine risk honestly — don't sugarcoat
5. Always end with a path forward — the roadmap IS the reassurance
6. Personalize for experience level — a 15-year veteran faces different risks than a 1-year employee
7. Return ONLY valid JSON. No markdown. No preamble. No trailing text.`;

const expDescriptions: Record<string, string> = {
  entry:       '0–2 years (early career, building foundational skills)',
  mid:         '3–7 years (mid-career, established specialist)',
  experienced: '8–15 years (experienced professional, deep domain knowledge)',
  senior:      '15+ years (senior/expert, strategic and leadership scope)',
};

const goalDescriptions: Record<string, string> = {
  stay_upskill:   'stay in their current field and AI-proof their existing skills',
  transition_new: 'transition to a completely new AI-resistant career',
  move_into_ai:   'move into an AI-related or AI-augmented role',
  understand_risk:'understand their current AI risk level and exposure',
};

const timeDescriptions: Record<string, string> = {
  minimal:   '2–4 hours per week (gradual, 6–9 month learning plan)',
  moderate:  '5–10 hours per week (focused effort, 3–5 month plan)',
  intensive: 'full-time or bootcamp pace (2–3 month intensive plan)',
};

export function buildUserPrompt(req: GenerateRequest): string {
  const { jobTitle, experienceLevel, goal, timeCommitment, occupationData } = req;
  const expDesc  = expDescriptions[experienceLevel];
  const goalDesc = goalDescriptions[goal];
  const timeDesc = timeDescriptions[timeCommitment];

  const verifiedData = occupationData ? `
VERIFIED OCCUPATION DATA (incorporate these exact numbers):
- Oxford automation probability: ${((occupationData.automation_probability ?? 0) * 100).toFixed(0)}%
- Median salary: $${occupationData.median_annual_wage?.toLocaleString()}/year
- 10-year employment growth: ${occupationData.ten_year_growth_pct}%
- Core tasks: ${occupationData.tasks?.slice(0, 8).map((t: any) => t.name).join(', ')}
` : '';

  return `Generate a comprehensive, deeply personalized career roadmap for this person.

WORKER PROFILE:
- Job Title: ${jobTitle}
- Experience: ${expDesc}
- Goal: ${goalDesc}
- Learning availability: ${timeDesc}
${verifiedData}
Be highly specific to this exact job title. Every sentence should feel written specifically for a ${jobTitle} with ${expDesc}. Do not give generic advice. Name real AI tools, real courses, real job titles, real salary ranges.

Return ONLY this exact JSON structure (no markdown, no preamble, no trailing text):

{
  "riskScore": <integer 0-100, be precise based on real automation research>,
  "riskLevel": "<Low|Moderate|High|Very High>",
  "riskSummary": "<3-4 sentences: honest about risk, name specific AI tools causing disruption, calibrate to their experience level>",

  "currentSalary": <median annual salary in USD, integer>,
  "projectedSalaryWithoutAction": <realistic 5-year projection if they do nothing, integer>,
  "projectedSalaryWithPlan": <realistic 5-year projection if they follow the plan, integer>,

  "tasks": [
    {
      "name": "<specific task this ${jobTitle} actually does daily>",
      "risk": "<Very High|High|Moderate|Low|Minimal>",
      "aiToolsCausing": "<name specific AI tools: e.g., Harvey AI, GitHub Copilot, ChatGPT>",
      "timeline": "<when disruption becomes significant: e.g., 2025-26, 2027-28>",
      "percentAutomatable": <integer 0-100>
    }
  ],

  "skills": [
    {
      "name": "<specific learnable skill name>",
      "why": "<2-3 sentences: why this skill specifically for a ${jobTitle} with ${expDesc}, what it protects against>",
      "timeToProficiency": "<e.g., 2-3 months at 5-10 hrs/week>",
      "salaryImpact": "<e.g., +$18,000/yr average for ${jobTitle}s>",
      "aiResistanceScore": <1-10>,
      "demandTrend": "<Growing fast|Stable|Emerging>"
    }
  ],

  "weeklyPlan": [
    {
      "weeks": "<e.g., Week 1-2>",
      "milestone": "<specific milestone title>",
      "action": "<specific action to take>",
      "deliverable": "<what they will have completed>"
    }
  ],

  "courses": [
    {
      "name": "<real course that exists today>",
      "platform": "<Coursera|LinkedIn Learning|Pluralsight|Udemy|edX|DataCamp|Codecademy>",
      "institution": "<e.g., Northwestern University, Google, IBM, Stanford>",
      "skill": "<which skill above this builds>",
      "url": "<real URL — use platform homepage if unsure of exact URL>",
      "icon": "<single relevant emoji>",
      "duration": "<e.g., 6 weeks, 4 hrs/week>",
      "cost": "<e.g., Free audit / $49 certificate>",
      "whyThisOne": "<1-2 sentences: why this specific course for this specific person>"
    }
  ],

  "alternativePaths": [
    {
      "title": "<specific AI-resistant or AI-augmented job title>",
      "salaryRange": "<e.g., $85k-$120k>",
      "riskLevel": "<Very Low|Low|Moderate>",
      "timeToPivot": "<e.g., 8-12 months>",
      "why": "<2 sentences: why this makes sense for a ${jobTitle} with ${expDesc}>",
      "knowledgeTransfer": "<percentage of current skills that transfer, e.g., 75%>"
    }
  ],

  "firstSevenDays": [
    { "day": 1, "action": "<specific, doable action with named resource or link>" },
    { "day": 2, "action": "<specific action>" },
    { "day": 3, "action": "<specific action>" },
    { "day": 4, "action": "<specific action>" },
    { "day": 5, "action": "<specific action>" },
    { "day": 6, "action": "<specific action>" },
    { "day": 7, "action": "<specific action>" }
  ],

  "positiveOutlook": "<2 sentences: genuinely encouraging, specific to their situation as a ${jobTitle} with ${expDesc}>"
}

Return 7-8 tasks, 4 skills, 6-8 weekly plan items spanning the full ${timeDesc} period, and 3 courses and 3 alternative paths.`;
}
