import { z } from 'zod';

// ── Request schema ─────────────────────────────────────────────────────────────

export const GenerateRequestSchema = z.object({
  jobTitle:        z.string().min(1).max(120),
  experienceLevel: z.string().min(1),
  goal:            z.string().min(1),
  timeCommitment:  z.string().min(1),
  socCode:         z.string().optional(),
});

export type GenerateRequest = z.infer<typeof GenerateRequestSchema>;

// ── Roadmap types ──────────────────────────────────────────────────────────────

export interface RoadmapTask {
  name:               string;
  risk:               'Very High' | 'High' | 'Moderate' | 'Low' | 'Minimal';
  percentAutomatable: number;
  timeline:           string;
  aiToolsCausing:     string;
}

export interface RoadmapSkill {
  name:               string;
  demandTrend:        string;
  why:                string;
  timeToProficiency:  string;
  salaryImpact:       string;
  aiResistanceScore:  number;
}

export interface WeeklyPlanItem {
  weeks:       string;
  milestone:   string;
  action:      string;
  deliverable: string;
}

export interface RoadmapCourse {
  name:         string;
  platform:     string;
  institution?: string;
  duration:     string;
  cost?:        string;
  url:          string;
  icon:         string;
  whyThisOne:   string;
}

export interface AlternativePath {
  title:             string;
  riskLevel:         string;
  why:               string;
  salaryRange:       string;
  timeToPivot:       string;
  knowledgeTransfer: string;
}

export interface RoadmapData {
  riskScore:                    number;
  riskSummary:                  string;
  currentSalary:                number;
  projectedSalaryWithoutAction: number;
  projectedSalaryWithPlan:      number;
  tasks:                        RoadmapTask[];
  skills:                       RoadmapSkill[];
  weeklyPlan:                   WeeklyPlanItem[];
  courses:                      RoadmapCourse[];
  alternativePaths:             AlternativePath[];
  firstSevenDays:               Array<{ day: number; action: string }>;
  positiveOutlook:              string;
}

// ── Zod schema for response validation ────────────────────────────────────────

export const RoadmapDataSchema = z.object({
  riskScore:                    z.number().min(0).max(100),
  riskSummary:                  z.string(),
  currentSalary:                z.number(),
  projectedSalaryWithoutAction: z.number(),
  projectedSalaryWithPlan:      z.number(),
  tasks: z.array(z.object({
    name:               z.string(),
    risk:               z.enum(['Very High', 'High', 'Moderate', 'Low', 'Minimal']),
    percentAutomatable: z.number(),
    timeline:           z.string(),
    aiToolsCausing:     z.string(),
  })),
  skills: z.array(z.object({
    name:              z.string(),
    demandTrend:       z.string(),
    why:               z.string(),
    timeToProficiency: z.string(),
    salaryImpact:      z.string(),
    aiResistanceScore: z.number(),
  })),
  weeklyPlan: z.array(z.object({
    weeks:       z.string(),
    milestone:   z.string(),
    action:      z.string(),
    deliverable: z.string(),
  })),
  courses: z.array(z.object({
    name:        z.string(),
    platform:    z.string(),
    institution: z.string().optional(),
    duration:    z.string(),
    cost:        z.string().optional(),
    url:         z.string(),
    icon:        z.string(),
    whyThisOne:  z.string(),
  })),
  alternativePaths: z.array(z.object({
    title:             z.string(),
    riskLevel:         z.string(),
    why:               z.string(),
    salaryRange:       z.string(),
    timeToPivot:       z.string(),
    knowledgeTransfer: z.string(),
  })),
  firstSevenDays: z.array(z.object({
    day:    z.number(),
    action: z.string(),
  })),
  positiveOutlook: z.string(),
});
