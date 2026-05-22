'use client';
import { useState, useCallback } from 'react';
import occupationsRaw from '../../../data/occupations-autocomplete.json';
import ProgressIndicator from './ProgressIndicator';
import StepJobTitle from './StepJobTitle';
import StepExperience from './StepExperience';
import StepGoal from './StepGoal';
import StepTime from './StepTime';
import LoadingAnalysis from './LoadingAnalysis';
import RoadmapReport from '../roadmap/RoadmapReport';
import type { RoadmapData } from '../../../lib/types/roadmap';

export interface OccupationEntry {
  title: string;
  soc: string;
  slug: string;
  category: string;
}

export interface GeneratorState {
  jobTitle: string;
  socCode?: string;
  occupationSlug?: string;
  experienceLevel: string | null;
  goal: string | null;
  timeCommitment: string | null;
}

const occupations = occupationsRaw as OccupationEntry[];

type View = 'form' | 'loading' | 'result' | 'error';

const HOW_IT_WORKS = [
  {
    n: '01',
    title: 'Task Analysis',
    desc: 'We break down every task in your job and show you exactly which are being automated — and by which AI tools.',
  },
  {
    n: '02',
    title: 'Personalized Plan',
    desc: 'Based on your experience and goal, we build a week-by-week learning roadmap matched to your schedule.',
  },
  {
    n: '03',
    title: 'Actionable Courses',
    desc: 'Curated real courses from Coursera, LinkedIn Learning, and more — each chosen for your specific situation.',
  },
];

export default function GeneratorWizard({ prefilledJob }: { prefilledJob?: string }) {
  const [step, setStep] = useState(prefilledJob ? 2 : 1);
  const [view, setView] = useState<View>('form');
  const [state, setState] = useState<GeneratorState>({
    jobTitle:       prefilledJob ?? '',
    experienceLevel: null,
    goal:           null,
    timeCommitment: null,
  });
  const [roadmap, setRoadmap]   = useState<RoadmapData | null>(null);
  const [shareId, setShareId]   = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  const update = useCallback((patch: Partial<GeneratorState>) => {
    setState(prev => ({ ...prev, ...patch }));
  }, []);

  async function generate() {
    setView('loading');
    try {
      const res = await fetch('/api/generate-roadmap', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({
          jobTitle:        state.jobTitle,
          experienceLevel: state.experienceLevel,
          goal:            state.goal,
          timeCommitment:  state.timeCommitment,
          socCode:         state.socCode,
        }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? 'Generation failed');
      setRoadmap(json.roadmapData);
      setShareId(json.shareId ?? null);
      setView('result');
    } catch (e: any) {
      setErrorMsg(e.message ?? 'Something went wrong. Please try again.');
      setView('error');
    }
  }

  function reset() {
    setView('form');
    setStep(1);
    setState({ jobTitle: '', experienceLevel: null, goal: null, timeCommitment: null });
    setRoadmap(null);
    setShareId(null);
  }

  if (view === 'loading') {
    return (
      <div className="min-h-[calc(100vh-52px)] flex items-center justify-center bg-bg">
        <div className="w-full max-w-md px-4">
          <LoadingAnalysis jobTitle={state.jobTitle} />
        </div>
      </div>
    );
  }

  if (view === 'result' && roadmap) {
    return (
      <RoadmapReport
        data={roadmap}
        jobTitle={state.jobTitle}
        goal={state.goal ?? ''}
        timeCommitment={state.timeCommitment ?? ''}
        experienceLevel={state.experienceLevel ?? ''}
        shareId={shareId}
        onReset={reset}
      />
    );
  }

  if (view === 'error') {
    return (
      <div className="min-h-[calc(100vh-52px)] flex items-center justify-center bg-bg">
        <div className="text-center max-w-sm px-4">
          <div className="text-[20px] font-bold text-ink mb-2">Something went wrong</div>
          <div className="text-[14px] text-ink-2 mb-6">{errorMsg}</div>
          <button
            onClick={reset}
            className="px-[22px] py-[10px] bg-fire text-bg font-semibold rounded-full text-[13px] tracking-[0.04em] hover:brightness-105"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-bg">
      {/* Hero */}
      <section className="pt-16 sm:pt-20 pb-8 px-4 sm:px-6 text-center">
        <div className="max-w-[760px] mx-auto">
          <span className="inline-block text-[11px] font-bold uppercase tracking-[0.16em] text-fire mb-5">
            AI Career Navigator
          </span>
          <h1 className="text-[clamp(42px,7vw,74px)] font-extrabold leading-[0.94] tracking-[-0.04em] text-ink mb-5">
            Is your job safe<br />from AI?
          </h1>
          <p className="text-[17px] sm:text-[18px] text-ink-2 max-w-[460px] mx-auto leading-relaxed mb-10">
            Find out in 60 seconds. Get a personalized reskilling roadmap. Free.
          </p>

          {/* Stats bar */}
          <div className="max-w-[500px] mx-auto grid grid-cols-3 border border-line rounded-[20px] overflow-hidden mb-12">
            <div className="py-4 px-3">
              <div className="text-[28px] font-extrabold font-mono text-ink leading-none">92M</div>
              <div className="text-[11px] text-ink-3 mt-1">jobs at risk by 2030</div>
            </div>
            <div className="py-4 px-3 border-x border-line">
              <div className="text-[28px] font-extrabold font-mono text-ink leading-none">51%</div>
              <div className="text-[11px] text-ink-3 mt-1">of workers worried about AI</div>
            </div>
            <div className="py-4 px-3">
              <div className="text-[28px] font-extrabold font-mono text-fire leading-none">+25%</div>
              <div className="text-[11px] text-ink-3 mt-1">salary for AI-skilled workers</div>
            </div>
          </div>
        </div>
      </section>

      {/* Generator card */}
      <div className="px-4 sm:px-6 pb-16">
        <div className="max-w-[680px] mx-auto border border-line rounded-[20px] overflow-hidden bg-surface shadow-low">
          <div className="h-[3px] bg-fire" />
          {/* Card header */}
          <div className="bg-surface-2 border-b border-line px-6 sm:px-7 py-5 flex items-center justify-between">
            <span className="text-[15px] font-bold text-ink">Build my roadmap</span>
            <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-3">
              Step {step} of 4 · 60 seconds
            </span>
          </div>
          {/* Card body */}
          <div className="p-6 sm:p-7">
            <div className="mb-7">
              <ProgressIndicator currentStep={step} totalSteps={4} />
            </div>

            {step === 1 && (
              <StepJobTitle
                value={state.jobTitle}
                onChange={(title, soc, slug) => update({ jobTitle: title, socCode: soc, occupationSlug: slug })}
                onNext={() => setStep(2)}
                occupations={occupations}
              />
            )}
            {step === 2 && (
              <StepExperience
                value={state.experienceLevel}
                onSelect={v => { update({ experienceLevel: v }); setTimeout(() => setStep(3), 120); }}
                onBack={() => setStep(1)}
              />
            )}
            {step === 3 && (
              <StepGoal
                value={state.goal}
                onSelect={v => { update({ goal: v }); setTimeout(() => setStep(4), 120); }}
                onBack={() => setStep(2)}
              />
            )}
            {step === 4 && (
              <StepTime
                value={state.timeCommitment}
                onSelect={v => update({ timeCommitment: v })}
                onBack={() => setStep(3)}
                onGenerate={generate}
                loading={false}
              />
            )}
          </div>
        </div>
      </div>

      {/* How it works */}
      <section className="border-t border-line bg-surface py-16 px-4 sm:px-6">
        <div className="max-w-[680px] mx-auto">
          <div className="text-center mb-10">
            <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-ink-3">
              How it works
            </span>
            <h2 className="text-[28px] sm:text-[30px] font-bold tracking-[-0.02em] text-ink mt-2">
              Three steps, 60 seconds
            </h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            {HOW_IT_WORKS.map(item => (
              <div key={item.n} className="bg-surface-2 border border-line rounded-[20px] p-6">
                <div className="text-[22px] font-extrabold font-mono text-fire mb-3 leading-none">
                  {item.n}
                </div>
                <div className="text-[16px] font-bold text-ink mb-2">{item.title}</div>
                <p className="text-[13px] text-ink-2 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
