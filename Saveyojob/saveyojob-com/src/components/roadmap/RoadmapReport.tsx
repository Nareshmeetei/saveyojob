import type { RoadmapData } from '../../../lib/types/roadmap';
import RiskScore from './RiskScore';
import SalaryImpact from './SalaryImpact';
import TaskBreakdown from './TaskBreakdown';
import SkillCards from './SkillCards';
import WeeklyPlan from './WeeklyPlan';
import CourseCards from './CourseCards';
import AlternativePaths from './AlternativePaths';
import FirstSevenDays from './FirstSevenDays';
import RoadmapActions from './RoadmapActions';

interface RoadmapReportProps {
  data: RoadmapData;
  jobTitle: string;
  goal: string;
  timeCommitment: string;
  experienceLevel: string;
  shareId: string | null;
  onReset: () => void;
}

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <section>
      <div className="flex items-center gap-3 mb-5">
        <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-ink-3 whitespace-nowrap">
          {label}
        </span>
        <div className="flex-1 h-[1px] bg-line" />
      </div>
      {children}
    </section>
  );
}

export default function RoadmapReport({
  data, jobTitle, goal, timeCommitment, experienceLevel, shareId, onReset
}: RoadmapReportProps) {
  return (
    <div className="bg-bg min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 space-y-10">

        <RiskScore
          data={data}
          jobTitle={jobTitle}
          experienceLevel={experienceLevel}
        />

        <Section label="Salary at stake — 5-year projection">
          <SalaryImpact data={data} />
        </Section>

        <Section label="Task-by-task automation breakdown">
          <TaskBreakdown tasks={data.tasks} />
        </Section>

        <Section label="Skills to build now">
          <SkillCards skills={data.skills} />
        </Section>

        <Section label="Your personalized learning roadmap">
          <WeeklyPlan plan={data.weeklyPlan} />
        </Section>

        <Section label="Courses curated for your situation">
          <CourseCards courses={data.courses} />
        </Section>

        {data.alternativePaths?.length > 0 && (
          <Section label="Alternative career paths to consider">
            <AlternativePaths paths={data.alternativePaths} />
          </Section>
        )}

        <Section label="Your first 7 days — specific actions">
          <FirstSevenDays days={data.firstSevenDays} />
        </Section>

        {data.positiveOutlook && (
          <div className="border border-fire/20 border-l-[3px] border-l-fire rounded-[20px] px-5 py-4 bg-fire/[0.04]">
            <div className="text-[11px] font-bold uppercase tracking-[0.12em] text-fire mb-2">
              Your outlook
            </div>
            <p className="text-[14px] text-ink-2 leading-relaxed">{data.positiveOutlook}</p>
          </div>
        )}

        <RoadmapActions
          shareId={shareId}
          jobTitle={jobTitle}
          riskScore={data.riskScore}
          onReset={onReset}
        />
      </div>
    </div>
  );
}
