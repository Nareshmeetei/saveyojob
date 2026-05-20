export interface OccupationTask {
  name: string;
  importance: number;
  automation_risk: 'Very High' | 'High' | 'Moderate' | 'Low' | 'Minimal';
}

export interface OccupationSkill {
  name: string;
  importance: number;
}

export interface AffiliateCourse {
  platform: string;
  name: string;
  url: string;
  skill: string;
  icon: string;
}

export interface Occupation {
  id: string;
  soc_code: string;
  title: string;
  slug: string;
  automation_probability: number | null;
  risk_level: 'Very High' | 'High' | 'Moderate' | 'Low' | null;
  median_annual_wage: number | null;
  employment_count: number | null;
  ten_year_growth_pct: number | null;
  tasks: OccupationTask[];
  core_skills: OccupationSkill[];
  affiliate_courses: AffiliateCourse[];
  created_at: string;
  updated_at: string;
}

export interface Roadmap {
  id: string;
  share_id: string;
  occupation_slug: string | null;
  job_title: string | null;
  goal: string | null;
  time_commitment: string | null;
  roadmap_data: RoadmapData;
  view_count: number;
  created_at: string;
}

export interface Subscriber {
  id: string;
  email: string;
  source: string | null;
  occupation_slug: string | null;
  roadmap_data: RoadmapData | null;
  subscribed_at: string;
  unsubscribed_at: string | null;
}

export interface AffiliateClick {
  id: string;
  platform: string;
  course_name: string | null;
  occupation_slug: string | null;
  session_id: string | null;
  clicked_at: string;
}

// Imported here to avoid circular deps
import type { RoadmapData } from './roadmap';
