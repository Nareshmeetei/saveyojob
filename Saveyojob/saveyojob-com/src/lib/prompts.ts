import type { GenerateRequest } from './types/roadmap';

export const SYSTEM_PROMPT = `You are an expert AI career strategist and labor market analyst. Your job is to produce a precise, data-driven, personalized career risk assessment and reskilling roadmap in JSON format.

Your output must be a single valid JSON object — no markdown, no code blocks, no explanation text. Just raw JSON.

Base your analysis on real automation research (Oxford, McKinsey, WEF), BLS salary data, and current AI tool capabilities. Be specific, honest, and actionable — not generic.

Risk levels: "Very High" = >80% automatable, "High" = 60-80%, "Moderate" = 40-60%, "Low" = 20-40%, "Minimal" = <20%.

Recommended courses must be real, highly-rated courses from Coursera, edX, LinkedIn Learning, DeepLearning.AI, or similar reputable platforms. Include real URLs.`;

export function buildUserPrompt(req: GenerateRequest): string {
  const expMap: Record<string, string> = {
    entry:       '0–2 years experience',
    mid:         '3–7 years experience',
    experienced: '8–15 years experience',
    senior:      '15+ years experience',
  };
  const timeMap: Record<string, string> = {
    light:    '2–4 hours per week',
    moderate: '5–10 hours per week',
    intensive: 'full-time / intensive',
  };
  const goalMap: Record<string, string> = {
    stay:       'stay in their current field but make it AI-resistant',
    transition: 'transition to a different, lower-risk career',
    ai:         'move into AI/tech roles',
    understand: 'understand their risk level (general information)',
  };

  return `Generate a personalized AI career risk roadmap for:

Job Title: ${req.jobTitle}
Experience: ${expMap[req.experienceLevel] ?? req.experienceLevel}
Goal: ${goalMap[req.goal] ?? req.goal}
Time available: ${timeMap[req.timeCommitment] ?? req.timeCommitment}
${req.socCode ? `SOC Code: ${req.socCode}` : ''}

Return ONLY a JSON object matching this exact structure:

{
  "riskScore": <0-100 integer>,
  "riskSummary": "<2-3 sentence honest assessment of automation risk for this specific role>",
  "currentSalary": <median annual salary in USD as integer>,
  "projectedSalaryWithoutAction": <projected 5-year salary without reskilling>,
  "projectedSalaryWithPlan": <projected 5-year salary after completing this roadmap>,
  "tasks": [
    {
      "name": "<specific task performed in this role>",
      "risk": "<Very High|High|Moderate|Low|Minimal>",
      "percentAutomatable": <0-100>,
      "timeline": "<when AI will fully handle this, e.g. '2-3 years'>",
      "aiToolsCausing": "<specific AI tools automating this, e.g. 'ChatGPT, Claude, Jasper'>"
    }
  ],
  "skills": [
    {
      "name": "<skill name>",
      "demandTrend": "<Growing fast|Emerging|Stable>",
      "why": "<why this skill protects against automation>",
      "timeToProficiency": "<e.g. '3-6 months'>",
      "salaryImpact": "<e.g. '+$8,000–$15,000/yr'>",
      "aiResistanceScore": <1-10>
    }
  ],
  "weeklyPlan": [
    {
      "weeks": "<e.g. 'Weeks 1–4'>",
      "milestone": "<specific milestone name>",
      "action": "<concrete action to take>",
      "deliverable": "<what they will have produced or achieved>"
    }
  ],
  "courses": [
    {
      "name": "<exact course name>",
      "platform": "<Coursera|edX|LinkedIn Learning|DeepLearning.AI|Udemy>",
      "institution": "<university or company, optional>",
      "duration": "<e.g. '6 weeks'>",
      "cost": "<e.g. 'Free to audit' or '$49/mo'>",
      "url": "<real, working URL to the course>",
      "whyThisOne": "<1 sentence explaining why this course specifically>"
    }
  ],
  "alternativePaths": [
    {
      "title": "<job title>",
      "riskLevel": "<Very High|High|Moderate|Low>",
      "why": "<why this person is well-positioned to make this transition>",
      "salaryRange": "<e.g. '$85,000–$110,000'>",
      "timeToPivot": "<e.g. '6-12 months'>",
      "knowledgeTransfer": "<specific skills that transfer directly>"
    }
  ],
  "firstSevenDays": [
    { "day": 1, "action": "<specific action to take on day 1>" },
    { "day": 3, "action": "<action for day 3>" },
    { "day": 5, "action": "<action for day 5>" },
    { "day": 7, "action": "<action for day 7 — a measurable checkpoint>" }
  ],
  "positiveOutlook": "<1-2 sentences of honest encouragement — what makes this person's skills valuable>"
}

Rules:
- tasks: exactly 5-7 tasks specific to THIS job title
- skills: exactly 4 skills to build
- weeklyPlan: exactly 6 phases spanning 12 weeks
- courses: exactly 3 courses with real working URLs
- alternativePaths: exactly 3 paths
- firstSevenDays: exactly 4 entries (days 1, 3, 5, 7)
- All salary numbers must be realistic for the US market
- All course URLs must be real and working`;
}
