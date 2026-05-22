'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Briefcase, Bot, Globe, BookOpen, type LucideIcon } from 'lucide-react';

interface Course {
  id: string;
  title: string;
  category: string;
  impact_score: number;
  platform: string;
  url: string;
  duration: string;
}

const SEED_COURSES: Course[] = [
  { id: '1', title: 'IBM AI Foundations for Business',      category: 'AI Literacy',   impact_score: 92, platform: 'Coursera',          url: '#', duration: '4 weeks'  },
  { id: '2', title: 'Google Data Analytics Certificate',    category: 'Data Analysis', impact_score: 88, platform: 'Coursera',          url: '#', duration: '6 months' },
  { id: '3', title: 'ChatGPT Prompt Engineering for Devs', category: 'AI Tools',      impact_score: 85, platform: 'DeepLearning.AI',   url: '#', duration: '2 weeks'  },
  { id: '4', title: 'Python for Everybody Specialization', category: 'Programming',   impact_score: 82, platform: 'Coursera',          url: '#', duration: '8 months' },
  { id: '5', title: 'Microsoft Power BI Data Analyst',     category: 'Data Analysis', impact_score: 78, platform: 'LinkedIn Learning', url: '#', duration: '5 months' },
  { id: '6', title: 'AI for Everyone by Andrew Ng',        category: 'AI Literacy',   impact_score: 76, platform: 'Coursera',          url: '#', duration: '3 weeks'  },
  { id: '7', title: 'UX Design Professional Certificate',  category: 'Design',        impact_score: 65, platform: 'Google / Coursera', url: '#', duration: '6 months' },
  { id: '8', title: 'Strategic Communication & Leadership',category: 'Soft Skills',   impact_score: 55, platform: 'LinkedIn Learning', url: '#', duration: '4 weeks'  },
  { id: '9', title: 'Machine Learning Specialization',     category: 'AI / ML',       impact_score: 94, platform: 'Coursera',          url: '#', duration: '3 months' },
];

const FILTERS = ['All', 'High Impact', 'AI / ML', 'Data Analysis', 'AI Tools', 'Programming'];

function impactLabel(score: number): { text: string; color: string } {
  if (score >= 85) return { text: 'High Impact',   color: '#C45347' };
  if (score >= 65) return { text: 'Medium Impact', color: '#D4783C' };
  return                 { text: 'Lower Impact',   color: '#0369A1' };
}

const PLATFORM_ICON: Record<string, LucideIcon> = {
  'Coursera':          GraduationCap,
  'LinkedIn Learning': Briefcase,
  'DeepLearning.AI':   Bot,
  'Google / Coursera': Globe,
};

function CourseCard({ course, index }: { course: Course; index: number }) {
  const badge = impactLabel(course.impact_score);
  const PlatformIcon = PLATFORM_ICON[course.platform] ?? BookOpen;

  return (
    <motion.a
      href={course.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.06, ease: [0.23, 1, 0.32, 1] }}
      className="group flex flex-col bg-surface border border-line rounded-xl p-5 hover:border-fire transition-all duration-150"
    >
      <div className="flex items-start justify-between mb-3">
        <PlatformIcon size={20} strokeWidth={1.5} className="text-ink-2" />
        <span
          className="text-[10px] font-bold uppercase tracking-[0.1em] px-2.5 py-1 rounded-full"
          style={{ color: badge.color, background: badge.color + '18' }}
        >
          {badge.text}
        </span>
      </div>

      <div className="flex-1">
        <div className="text-[14px] font-bold text-ink mb-1 leading-snug group-hover:text-fire transition-colors duration-150">
          {course.title}
        </div>
        <div className="text-[12px] text-ink-3 mb-3">
          {course.platform} · {course.duration}
        </div>
        <div className="inline-block text-[11px] font-semibold bg-surface-2 border border-line rounded px-2 py-0.5 text-ink-3">
          {course.category}
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between pt-4 border-t border-line">
        <div className="flex items-center gap-1.5">
          <div className="h-1 w-16 bg-line rounded-full overflow-hidden">
            <div
              className="h-full rounded-full"
              style={{ width: `${course.impact_score}%`, background: badge.color }}
            />
          </div>
          <span className="text-[11px] text-ink-3 tabular-nums">{course.impact_score}</span>
        </div>
        <span className="text-[12px] font-bold text-fire group-hover:translate-x-0.5 transition-transform duration-150">
          Enroll →
        </span>
      </div>
    </motion.a>
  );
}

export default function CourseDirectory() {
  const [activeFilter, setActiveFilter] = useState('All');

  const filtered = SEED_COURSES.filter(c => {
    if (activeFilter === 'All')          return true;
    if (activeFilter === 'High Impact')  return c.impact_score >= 85;
    return c.category === activeFilter;
  });

  return (
    <section id="courses" className="py-16 px-5 sm:px-8 border-t border-line">
      <div className="max-w-[900px] mx-auto">

        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-fire block mb-2">
              Course directory
            </span>
            <h2 className="text-[26px] sm:text-[30px] font-bold tracking-[-0.02em] text-ink">
              Reskilling Courses — Curated for AI Impact
            </h2>
          </div>
          <p className="text-[13px] text-ink-2 max-w-[220px] leading-relaxed">
            Impact score = how much this course protects against automation.
          </p>
        </div>

        {/* Filter tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {FILTERS.map(f => {
            const isActive = f === activeFilter;
            return (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className="text-[12px] font-semibold px-4 py-2 rounded-full border transition-all duration-150"
                style={isActive ? {
                  background:  '#0C526D',
                  borderColor: '#0C526D',
                  color:       '#F2F2F2',
                } : {
                  background:  '#EEF5F7',
                  borderColor: '#C5DDE4',
                  color:       '#081E28',
                }}
              >
                {f}
              </button>
            );
          })}
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((course, i) => (
            <CourseCard key={course.id} course={course} index={i} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-ink-3">
            No courses match this filter yet.
          </div>
        )}

        <div className="mt-10 text-center">
          <p className="text-[13px] text-ink-3">
            More courses added weekly · Powered by Supabase
          </p>
        </div>

      </div>
    </section>
  );
}
