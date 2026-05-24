'use client';
import { useState } from 'react';
import { Loader2, RotateCcw, Sparkles, Copy, Check, ChevronRight, Info, AtSign } from 'lucide-react';
import type { Headline, HeadlineResult } from '@/app/api/generate-linkedin-headline/route';

export default function LinkedInHeadlineClient() {
  const [jobTitle,   setJobTitle]   = useState('');
  const [skills,     setSkills]     = useState('');
  const [industry,   setIndustry]   = useState('');
  const [goal,       setGoal]       = useState('');
  const [experience, setExperience] = useState('');
  const [loading,    setLoading]    = useState(false);
  const [error,      setError]      = useState<string | null>(null);
  const [result,     setResult]     = useState<HeadlineResult | null>(null);
  const [copiedIdx,  setCopiedIdx]  = useState<number | null>(null);

  const ready =
    jobTitle.trim().length >= 2 &&
    skills.trim().length  >= 3 &&
    !loading;

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
      const res  = await fetch('/api/generate-linkedin-headline', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({
          jobTitle:   jobTitle.trim(),
          skills:     skills.trim(),
          industry:   industry.trim()   || undefined,
          goal:       goal.trim()       || undefined,
          experience: experience.trim() || undefined,
        }),
      });
      const data = await res.json() as HeadlineResult & { error?: string };
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

  async function copyHeadline(i: number, text: string) {
    await navigator.clipboard.writeText(text);
    setCopiedIdx(i);
    setTimeout(() => setCopiedIdx(null), 2000);
  }

  function reset() {
    setJobTitle('');
    setSkills('');
    setIndustry('');
    setGoal('');
    setExperience('');
    clearResult();
  }

  return (
    <div className="grid lg:grid-cols-[420px_1fr] gap-8 items-start">

      {/* Left — form */}
      <div className="lg:sticky lg:top-8 space-y-5">

        <div>
          <label className="block text-[13px] font-medium text-ink mb-1.5">
            Current or target job title <span className="text-fire">*</span>
          </label>
          <input
            type="text"
            placeholder="e.g. Product Manager, Data Analyst, UX Designer"
            value={jobTitle}
            onChange={e => { setJobTitle(e.target.value); clearResult(); }}
            className="w-full bg-surface border border-line rounded-lg px-3 py-2.5 text-[14px] text-ink outline-none focus:border-fire placeholder:text-ink-3"
          />
        </div>

        <div>
          <label className="block text-[13px] font-medium text-ink mb-1.5">
            Your top skills or keywords <span className="text-fire">*</span>
          </label>
          <textarea
            rows={3}
            placeholder={"Skills recruiters search for — one per line or comma-separated\n\ne.g.\nSQL, Python, Data Visualization\nStakeholder Management, Agile, Product Strategy"}
            value={skills}
            onChange={e => { setSkills(e.target.value); clearResult(); }}
            className="w-full bg-surface border border-line rounded-xl px-4 py-3 text-[13px] text-ink outline-none focus:border-fire resize-none leading-relaxed placeholder:text-ink-3"
          />
          <p className="text-[11px] text-ink-3 mt-1">Think about what recruiters type into LinkedIn search.</p>
        </div>

        <div>
          <label className="block text-[13px] font-medium text-ink mb-1.5">
            Industry <span className="text-ink-3 font-normal">(optional)</span>
          </label>
          <input
            type="text"
            placeholder="e.g. SaaS, Healthcare, Financial Services, E-commerce"
            value={industry}
            onChange={e => { setIndustry(e.target.value); clearResult(); }}
            className="w-full bg-surface border border-line rounded-lg px-3 py-2.5 text-[14px] text-ink outline-none focus:border-fire placeholder:text-ink-3"
          />
        </div>

        <div>
          <label className="block text-[13px] font-medium text-ink mb-1.5">
            Years of experience <span className="text-ink-3 font-normal">(optional)</span>
          </label>
          <input
            type="text"
            placeholder="e.g. 5 years, 10+ years"
            value={experience}
            onChange={e => { setExperience(e.target.value); clearResult(); }}
            className="w-full bg-surface border border-line rounded-lg px-3 py-2.5 text-[14px] text-ink outline-none focus:border-fire placeholder:text-ink-3"
          />
        </div>

        <div>
          <label className="block text-[13px] font-medium text-ink mb-1.5">
            Career goal <span className="text-ink-3 font-normal">(optional)</span>
          </label>
          <input
            type="text"
            placeholder="e.g. Moving into leadership, open to new opportunities, pivoting to AI"
            value={goal}
            onChange={e => { setGoal(e.target.value); clearResult(); }}
            className="w-full bg-surface border border-line rounded-lg px-3 py-2.5 text-[14px] text-ink outline-none focus:border-fire placeholder:text-ink-3"
          />
          <p className="text-[11px] text-ink-3 mt-1">Used for the aspirational headline variation.</p>
        </div>

        <button
          onClick={generate}
          disabled={!ready}
          className="w-full flex items-center justify-center gap-2 py-3 bg-fire text-bg text-[14px] font-bold rounded-xl hover:brightness-105 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {loading
            ? <><Loader2 size={16} strokeWidth={1.5} className="animate-spin" />Generating…</>
            : <><Sparkles size={16} strokeWidth={1.5} />Generate 5 Headlines<ChevronRight size={15} strokeWidth={2} /></>
          }
        </button>

        {error && <p className="text-[13px] text-accent">{error}</p>}
      </div>

      {/* Right — results */}
      <div className="space-y-4">
        {!result ? (
          <ExampleCard />
        ) : (
          <>
            <div className="flex items-center justify-between">
              <p className="text-[13px] font-semibold text-ink">5 headline variations</p>
              <button
                onClick={reset}
                className="flex items-center gap-1.5 text-[12px] text-ink-3 hover:text-ink transition-colors"
              >
                <RotateCcw size={12} strokeWidth={1.5} />
                Start over
              </button>
            </div>

            {result.headlines.map((h, i) => (
              <HeadlineCard
                key={i}
                headline={h}
                index={i}
                copied={copiedIdx === i}
                onCopy={() => copyHeadline(i, h.text)}
              />
            ))}

            <div className="p-4 bg-surface border border-line rounded-xl">
              <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-ink-3 mb-1.5">How to update your headline</p>
              <p className="text-[12px] text-ink-2 leading-relaxed">
                Go to your LinkedIn profile, click the pencil icon next to your name, and paste your chosen headline into the Headline field. Changes go live immediately.
              </p>
            </div>
          </>
        )}
      </div>

    </div>
  );
}

function HeadlineCard({ headline, index, copied, onCopy }: {
  headline: Headline;
  index:    number;
  copied:   boolean;
  onCopy:   () => void;
}) {
  const charColor =
    headline.chars <= 120 ? 'text-safe' :
    headline.chars <= 150 ? 'text-warn'  :
    'text-accent';

  return (
    <div className="bg-surface border border-line rounded-xl overflow-hidden">
      <div className="px-4 pt-3.5 pb-3 border-b border-line flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-bold uppercase tracking-[0.1em] text-ink-3">
            {index + 1}. {headline.style}
          </span>
        </div>
        <span className={`text-[11px] font-medium tabular-nums ${charColor}`}>
          {headline.chars} chars
        </span>
      </div>

      <div className="px-4 pt-3 pb-3.5">
        <p className="text-[15px] font-semibold text-ink leading-snug mb-3">{headline.text}</p>

        {headline.note && (
          <div className="flex items-start gap-2 mb-3">
            <Info size={11} strokeWidth={1.5} className="text-ink-3 mt-0.5 shrink-0" />
            <p className="text-[11px] text-ink-3 leading-relaxed">{headline.note}</p>
          </div>
        )}

        <div className="flex justify-end">
          <button
            onClick={onCopy}
            className="flex items-center gap-1.5 text-[12px] font-medium text-fire hover:brightness-110 transition-colors"
          >
            {copied
              ? <><Check size={12} strokeWidth={1.5} />Copied!</>
              : <><Copy size={12} strokeWidth={1.5} />Copy</>
            }
          </button>
        </div>
      </div>
    </div>
  );
}

function ExampleCard() {
  const examples: { style: string; text: string; note: string }[] = [
    {
      style: 'Identity + Skills',
      text:  'Product Manager | AI & SaaS | Turning User Research Into Products That Ship',
      note:  'Clear and searchable — works well when recruiters filter by title and tool stack.',
    },
    {
      style: 'Value-led',
      text:  'I Help B2B SaaS Teams Reduce Churn by Building Products People Actually Use',
      note:  'Leads with outcome, not job title — stands out in a sea of "PM at Acme Corp."',
    },
  ];

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <AtSign size={14} strokeWidth={1.5} className="text-ink-3" />
        <p className="text-[13px] font-semibold text-ink">What you'll get — 5 variations like these</p>
      </div>

      {examples.map((ex, i) => (
        <div key={i} className="bg-surface border border-line rounded-xl overflow-hidden">
          <div className="px-4 pt-3 pb-2.5 border-b border-line">
            <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-ink-3">
              {i + 1}. {ex.style}
            </p>
          </div>
          <div className="px-4 pt-3 pb-3.5">
            <p className="text-[15px] font-semibold text-ink leading-snug mb-2">{ex.text}</p>
            <div className="flex items-start gap-2">
              <Info size={11} strokeWidth={1.5} className="text-ink-3 mt-0.5 shrink-0" />
              <p className="text-[11px] text-ink-3 leading-relaxed">{ex.note}</p>
            </div>
          </div>
        </div>
      ))}

      <p className="text-[12px] text-ink-3 leading-relaxed">
        Fill in your job title and skills on the left — you'll get 5 variations across different styles so you can pick the one that fits best.
      </p>
    </div>
  );
}
