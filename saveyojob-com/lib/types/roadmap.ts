import { z } from 'zod';

export const GenerateRequestSchema = z.object({
  jobTitle:        z.string().min(2).max(100),
  experienceLevel: z.enum(['entry', 'mid', 'experienced', 'senior']),
  goal:            z.enum(['stay_upskill', 'transition_new', 'move_into_ai', 'understand_risk']),
  timeCommitment:  z.enum(['minimal', 'moderate', 'intensive']),
  socCode:         z.string().optional(),
  occupationData:  z.object({
    automation_probability: z.number().optional(),
    median_annual_wage:     z.number().optional(),
    ten_year_growth_pct:    z.number().optional(),
    tasks:                  z.array(z.any()).optional(),
    core_skills:            z.array(z.any()).optional(),
  }).optional(),
});

export type GenerateRequest = z.infer<typeof GenerateRequestSchema>;

export const RoadmapTaskSchema = z.object({
  name:               z.string(),
  risk:               z.enum(['Very High', 'High', 'Moderate', 'Low', 'Minimal']),
  aiToolsCausing:     z.string(),
  timeline:           z.string(),
  percentAutomatable: z.number().int().min(0).max(100),
});

export const RoadmapSkillSchema = z.object({
  name:             z.string(),
  why:              z.string(),
  timeToProficiency:z.string(),
  salaryImpact:     z.string(),
  aiResistanceScore:z.number().int().min(1).max(10),
  demandTrend:      z.enum(['Growing fast', 'Stable', 'Emerging']),
});

export const WeeklyPlanItemSchema = z.object({
  weeks:       z.string(),
  milestone:   z.string(),
  action:      z.string(),
  deliverable: z.string(),
});

export const RoadmapCourseSchema = z.object({
  name:        z.string(),
  platform:    z.string(),
  institution: z.string(),
  skill:       z.string(),
  url:         z.string(),
  icon:        z.string(),
  duration:    z.string(),
  cost:        z.string(),
  whyThisOne:  z.string(),
});

export const AlternativePathSchema = z.object({
  title:             z.string(),
  salaryRange:       z.string(),
  riskLevel:         z.string(),
  timeToPivot:       z.string(),
  why:               z.string(),
  knowledgeTransfer: z.string(),
});

export const FirstSevenDaysSchema = z.object({
  day:    z.number().int().min(1).max(7),
  action: z.string(),
});

export const RoadmapDataSchema = z.object({
  riskScore:                     z.number().int().min(0).max(100),
  riskLevel:                     z.enum(['Low', 'Moderate', 'High', 'Very High']),
  riskSummary:                   z.string(),
  currentSalary:                 z.number().int(),
  projectedSalaryWithoutAction:  z.number().int(),
  projectedSalaryWithPlan:       z.number().int(),
  tasks:                         z.array(RoadmapTaskSchema),
  skills:                        z.array(RoadmapSkillSchema),
  weeklyPlan:                    z.array(WeeklyPlanItemSchema),
  courses:                       z.array(RoadmapCourseSchema),
  alternativePaths:              z.array(AlternativePathSchema),
  firstSevenDays:                z.array(FirstSevenDaysSchema),
  positiveOutlook:               z.string(),
});

export type RoadmapData      = z.infer<typeof RoadmapDataSchema>;
export type RoadmapTask      = z.infer<typeof RoadmapTaskSchema>;
export type RoadmapSkill     = z.infer<typeof RoadmapSkillSchema>;
export type WeeklyPlanItem   = z.infer<typeof WeeklyPlanItemSchema>;
export type RoadmapCourse    = z.infer<typeof RoadmapCourseSchema>;
export type AlternativePath  = z.infer<typeof AlternativePathSchema>;
