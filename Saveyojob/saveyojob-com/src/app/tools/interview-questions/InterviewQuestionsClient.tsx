'use client';
import { useState } from 'react';
import { Loader2, RotateCcw, Sparkles, Copy, Check, ChevronRight, MessageSquare, Lightbulb } from 'lucide-react';
import type { InterviewQuestion, InterviewQuestionsResult } from '@/app/api/generate-interview-questions/route';

type Level = 'entry' | 'mid' | 'senior' | 'executive';

const LEVELS: { value: Level; label: string }[] = [
  { value: 'entry',     label: 'Entry-level (0–2 years)' },
  { value: 'mid',       label: 'Mid-level (3–6 years)' },
  { value: 'senior',    label: 'Senior (7–12 years)' },
  { value: 'executive', label: 'Executive / Leadership (12+ years)' },
];

const CATEGORY_STYLES: Record<string, { bg: string; text: string }> = {
  Behavioral:     { bg: 'bg-fire/[0.08]',      text: 'text-fire' },
  'Role-specific':{ bg: 'bg-secondary/[0.15]', text: 'text-[#097BA0]' },
  Situational:    { bg: 'bg-warn/[0.12]',       text: 'text-warn' },
  Culture:        { bg: 'bg-safe/[0.12]',       text: 'text-safe' },
  Motivation:     { bg: 'bg-accent/[0.12]',     text: 'text-accent' },
};

export default function InterviewQuestionsClient() {
  const [jobDescription, setJobDescription] = useState('');
  const [level,          setLevel]          = useState<Level>('mid');
  const [background,     setBackground]     = useState('');
  const [loading,        setLoading]        = useState(false);
  const [error,          setError]          = useState<string | null>(null);
  const [result,         setResult]         = useState<InterviewQuestionsResult | null>(null);
  const [copiedIdx,      setCopiedIdx]      = useState<number | null>(null);

  const ready = jobDescription.trim().length >= 50 && !loading;

  function clearResult() {
    setResult(null);
    setError(null);
    setCopiedIdx(null);
  }

  async function generate() {
    if (!ready) return;
    setLoading(true);
    clearResult();

    try {
      const res  = await fetch('/api/generate-interview-questions', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({
          jobDescription:  jobDescription.trim(),
          experienceLevel: level,
          background:      background.trim() || undefined,
        }),
      });
      const data = await res.json() as InterviewQuestionsResult & { error?: string };
      if (!res.ok || data.error) {
        setError(data.error ?? 'Something went wrong — please try again.');
      } else {
        setResult(data);
      }
    } catch {
      setError('Your internet connection dropped — please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  }

  async function copyQuestion(i: number, text: string) {
    await navigator.clipboard.writeText(text);
    setCopiedIdx(i);
    setTimeout(() => setCopiedIdx(null), 2000);
  }

  function reset() {
    setJobDescription('');
    setLevel('mid');
    setBackground('');
    clearResult();
  }

  return (
    <div className="grid lg:grid-cols-[400px_1fr] gap-8 items-start">

      {/* Left — form */}
      <div className="lg:sticky lg:top-8 space-y-5">

        <div>
          <label className="block text-[13px] font-medium text-ink mb-1.5">
            Job description <span className="text-fire">*</span>
          </label>
          <p className="text-[11px] text-ink-3 mb-2">Paste the full job posting — the more detail, the more targeted the questions.</p>
          <textarea
            rows={12}
            placeholder={"Paste the full job description here…\n\nThe tool reads the required skills, responsibilities, and company signals to predict what this specific interviewer will ask — not generic questions that could apply to any job."}
            value={jobDescription}
            onChange={e => { setJobDescription(e.target.value); clearResult(); }}
            className="w-full bg-surface border border-line rounded-xl px-4 py-3 text-[13px] text-ink outline-none focus:border-fire resize-none leading-relaxed placeholder:text-ink-3"
          />
          {jobDescription.trim().length > 0 && jobDescription.trim().length < 50 && (
            <p className="text-[11px] text-accent mt-1.5">Paste more of the job description for better results.</p>
          )}
        </div>

        <div>
          <label className="block text-[13px] font-medium text-ink mb-1.5">
            Your experience level <span className="text-fire">*</span>
          </label>
          <select
            value={level}
            onChange={e => { setLevel(e.target.value as Level); clearResult(); }}
            className="w-full bg-surface border border-line rounded-lg px-3 py-2.5 text-[14px] text-ink outline-none focus:border-fire appearance-none"
          >
            {LEVELS.map(l => (
              <option key={l.value} value={l.value}>{l.label}</option>
            ))}
          </select>
          <p className="text-[11px] text-ink-3 mt-1">Adjusts the depth and style of questions generated.</p>
        </div>

        <div>
          <label className="block text-[13px] font-medium text-ink mb-1.5">
            Your background <span className="text-ink-3 font-normal">(optional)</span>
          </label>
          <textarea
            rows={3}
            placeholder="Brief summary of your experience — e.g. 5 years as a data analyst in fintech, strong in Python and Tableau, transitioning into a data engineering role"
            value={background}
            onChange={e => { setBackground(e.target.value); clearResult(); }}
            className="w-full bg-surface border border-line rounded-xl px-4 py-3 text-[13px] text-ink outline-none focus:border-fire resize-none leading-relaxed placeholder:text-ink-3"
          />
          <p className="text-[11px] text-ink-3 mt-1">Helps tailor the answer frameworks to your specific situation.</p>
        </div>

        <button
          onClick={generate}
          disabled={!ready}
          className="w-full flex items-center justify-center gap-2 py-3 bg-fire text-bg text-[14px] font-bold rounded-xl hover:brightness-105 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {loading
            ? <><Loader2 size={16} strokeWidth={1.5} className="animate-spin" />Generating questions…</>
            : <><Sparkles size={16} strokeWidth={1.5} />Generate 10 Questions<ChevronRight size={15} strokeWidth={2} /></>
          }
        </button>

        {error && <p className="text-[13px] text-accent">{error}</p>}
      </div>

      {/* Right — results */}
      <div className="space-y-4">
        {!result ? (
          <PlaceholderCard />
        ) : (
          <>
            <div className="flex items-center justify-between">
              <p className="text-[13px] font-semibold text-ink">10 questions for this role</p>
              <button
                onClick={reset}
                className="flex items-center gap-1.5 text-[12px] text-ink-3 hover:text-ink transition-colors"
              >
                <RotateCcw size={12} strokeWidth={1.5} />
                Start over
              </button>
            </div>

            {result.questions.map((q, i) => (
              <QuestionCard
                key={i}
                question={q}
                index={i}
                copied={copiedIdx === i}
                onCopy={() => copyQuestion(i, q.question)}
              />
            ))}

            <div className="p-4 bg-surface border border-line rounded-xl">
              <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-ink-3 mb-1.5">Practice tip</p>
              <p className="text-[12px] text-ink-2 leading-relaxed">
                Say your answers out loud — not just in your head. Record yourself once and listen back. Most people speak 30% better on interview day than in rehearsal, so if you sound good in the recording, you're ready.
              </p>
            </div>
          </>
        )}
      </div>

    </div>
  );
}

function QuestionCard({ question, index, copied, onCopy }: {
  question: InterviewQuestion;
  index:    number;
  copied:   boolean;
  onCopy:   () => void;
}) {
  const style = CATEGORY_STYLES[question.category] ?? { bg: 'bg-surface', text: 'text-ink-3' };

  return (
    <div className="bg-surface border border-line rounded-xl overflow-hidden">
      {/* Header row */}
      <div className="px-4 pt-3.5 pb-3 border-b border-line flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-bold text-ink-3 tabular-nums">Q{index + 1}</span>
          <span className={`text-[10px] font-bold uppercase tracking-[0.1em] px-2 py-0.5 rounded-full ${style.bg} ${style.text}`}>
            {question.category}
          </span>
        </div>
        <button
          onClick={onCopy}
          className="flex items-center gap-1.5 text-[11px] font-medium text-ink-3 hover:text-fire transition-colors shrink-0"
        >
          {copied ? <Check size={11} strokeWidth={1.5} /> : <Copy size={11} strokeWidth={1.5} />}
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>

      {/* Question */}
      <div className="px-4 pt-3.5 pb-3 border-b border-line">
        <p className="text-[14px] font-semibold text-ink leading-snug">{question.question}</p>
      </div>

      {/* Why + Framework */}
      <div className="px-4 pt-3 pb-3.5 space-y-3">
        <div className="flex items-start gap-2">
          <MessageSquare size={12} strokeWidth={1.5} className="text-ink-3 mt-0.5 shrink-0" />
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-ink-3 mb-0.5">Why they ask this</p>
            <p className="text-[12px] text-ink-2 leading-relaxed">{question.why}</p>
          </div>
        </div>
        <div className="flex items-start gap-2">
          <Lightbulb size={12} strokeWidth={1.5} className="text-fire mt-0.5 shrink-0" />
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-fire mb-0.5">How to answer</p>
            <p className="text-[12px] text-ink leading-relaxed">{question.framework}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function PlaceholderCard() {
  return (
    <div className="space-y-3">
      <p className="text-[13px] font-semibold text-ink">What you'll get</p>

      {/* Example question */}
      <div className="bg-surface border border-line rounded-xl overflow-hidden">
        <div className="px-4 pt-3.5 pb-3 border-b border-line flex items-center gap-2">
          <span className="text-[11px] font-bold text-ink-3">Q1</span>
          <span className="text-[10px] font-bold uppercase tracking-[0.1em] px-2 py-0.5 rounded-full bg-fire/[0.08] text-fire">
            Behavioral
          </span>
        </div>
        <div className="px-4 pt-3.5 pb-3 border-b border-line">
          <p className="text-[14px] font-semibold text-ink leading-snug">
            Tell me about a time you had to deliver a project under a tight deadline with limited resources. What did you do?
          </p>
        </div>
        <div className="px-4 pt-3 pb-3.5 space-y-3">
          <div className="flex items-start gap-2">
            <MessageSquare size={12} strokeWidth={1.5} className="text-ink-3 mt-0.5 shrink-0" />
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-ink-3 mb-0.5">Why they ask this</p>
              <p className="text-[12px] text-ink-2 leading-relaxed">They want to see how you prioritise and stay calm under pressure — a direct signal for this role's fast-paced environment.</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <Lightbulb size={12} strokeWidth={1.5} className="text-fire mt-0.5 shrink-0" />
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-fire mb-0.5">How to answer</p>
              <p className="text-[12px] text-ink leading-relaxed">Use STAR: set the Situation briefly (1–2 sentences), explain your Task, then spend most of your time on the Actions you took. End with a quantified Result — time saved, output delivered, or team impact.</p>
            </div>
          </div>
        </div>
      </div>

      <p className="text-[12px] text-ink-3 leading-relaxed">
        Paste the job description on the left — you'll get 10 questions specific to that role, each with a framework for answering.
      </p>

      {/* Category legend */}
      <div className="p-4 bg-surface border border-line rounded-xl">
        <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-ink-3 mb-3">Question categories</p>
        <div className="flex flex-wrap gap-2">
          {Object.entries(CATEGORY_STYLES).map(([cat, style]) => (
            <span key={cat} className={`text-[10px] font-bold uppercase tracking-[0.1em] px-2 py-0.5 rounded-full ${style.bg} ${style.text}`}>
              {cat}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
