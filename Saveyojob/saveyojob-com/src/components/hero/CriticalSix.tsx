'use client';
import { motion } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { FileText, MessageSquare, PenLine, BookOpen, Phone, Wrench, type LucideIcon } from 'lucide-react';

const JOBS: { Icon: LucideIcon; title: string; risk: number; reason: string }[] = [
  { Icon: FileText,      title: 'Data Entry',       risk: 99, reason: 'LLMs and OCR tools now process, classify, and validate documents faster and more accurately than manual entry.' },
  { Icon: MessageSquare, title: 'Customer Support',  risk: 70, reason: 'AI handles routine enquiries and ticket routing, reducing demand for entry-level support roles.' },
  { Icon: PenLine,       title: 'Proofreading',      risk: 84, reason: 'Grammar and style AI catches errors reliably and at a fraction of the per-word cost.' },
  { Icon: BookOpen,      title: 'Bookkeeping',       risk: 98, reason: 'Automated reconciliation and transaction categorisation removes the core of the role.' },
  { Icon: Phone,         title: 'Receptionists',     risk: 96, reason: 'AI scheduling, call routing, and digital intake forms replace many front-desk workflows.' },
  { Icon: Wrench,        title: 'Mfg / Assembly',    risk: 88, reason: 'Industrial robotics and computer vision continue to take over repetitive assembly tasks.' },
];

function riskColor(r: number): string {
  if (r >= 90) return '#DC2626';
  if (r >= 80) return '#B45309';
  return '#0369A1';
}

function JobCard({ job, index }: { job: typeof JOBS[number]; index: number }) {
  const [hovered, setHovered] = useState(false);
  const { Icon } = job;
  const barColor = riskColor(job.risk);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: index * 0.08, ease: [0.23, 1, 0.32, 1] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="bg-surface border border-line rounded-xl p-5 cursor-default select-none transition-all duration-200"
      style={{ borderColor: hovered ? barColor : undefined }}
    >
      {/* Icon + percentage */}
      <div className="flex items-start justify-between mb-4">
        <Icon size={22} strokeWidth={1.5} style={{ color: barColor }} />
        <span
          className="text-[12px] font-bold tabular-nums"
          style={{ color: barColor }}
        >
          {job.risk}%
        </span>
      </div>

      <div className="text-[15px] font-bold text-ink mb-3 leading-snug">{job.title}</div>

      {/* Progress bar */}
      <div className="h-[3px] bg-line rounded-full overflow-hidden mb-4">
        <motion.div
          className="h-full rounded-full"
          style={{ background: barColor }}
          initial={{ width: 0 }}
          animate={{ width: `${job.risk}%` }}
          transition={{ duration: 1, delay: 0.3 + index * 0.08, ease: [0.23, 1, 0.32, 1] }}
        />
      </div>

      {/* Hover reveals reason */}
      <motion.p
        className="text-[12px] text-ink-2 leading-relaxed overflow-hidden"
        animate={{ maxHeight: hovered ? 80 : 0, opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        style={{ maxHeight: 0, opacity: 0 }}
      >
        {job.reason}
      </motion.p>

      {!hovered && (
        <div className="text-[11px] font-semibold uppercase tracking-[0.1em] text-ink-3">
          Automation risk
        </div>
      )}
    </motion.div>
  );
}

export default function CriticalSix() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} className="py-16 px-5 sm:px-8 border-t border-line bg-surface-2">
      <div className="max-w-[900px] mx-auto">

        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-10">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-fire block mb-2">
              Most at risk
            </span>
            <h2 className="text-[28px] sm:text-[32px] font-bold tracking-[-0.03em] text-ink leading-tight">
              The 6 Jobs AI Is Taking First
            </h2>
          </div>
          <p className="text-[13px] text-ink-2 max-w-[260px] leading-relaxed">
            Hover a card to see why. Source: Frey &amp; Osborne (2013), Oxford University.
          </p>
        </div>

        {visible && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {JOBS.map((job, i) => (
              <JobCard key={job.title} job={job} index={i} />
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
