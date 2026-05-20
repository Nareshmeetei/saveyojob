import type { GeneratorState } from './GeneratorWizard';

const GOAL_LABELS: Record<string, string> = {
  stay_upskill:   'Stay & upskill',
  transition_new: 'Transition careers',
  move_into_ai:   'Move into AI',
  understand_risk:'Understand risk',
};

const EXP_LABELS: Record<string, string> = {
  entry:       '0–2 years',
  mid:         '3–7 years',
  experienced: '8–15 years',
  senior:      '15+ years',
};

const TIME_LABELS: Record<string, string> = {
  minimal:   '2–4 hrs/week',
  moderate:  '5–10 hrs/week',
  intensive: 'Full-time',
};

function jobHints(jobTitle: string): string[] {
  const j = jobTitle.toLowerCase();
  if (j.includes('paralegal') || j.includes('legal'))
    return ['Document review automation', 'Legal research AI tools', 'Contract analysis'];
  if (j.includes('accountant') || j.includes('bookkeeper'))
    return ['Automated data entry', 'AI tax preparation', 'Real-time reporting tools'];
  if (j.includes('analyst'))
    return ['Automated reporting', 'AI-generated insights', 'Data pipeline automation'];
  if (j.includes('developer') || j.includes('engineer'))
    return ['AI code generation', 'Automated testing', 'Low-code platform adoption'];
  if (j.includes('designer'))
    return ['AI image generation', 'Automated resizing tools', 'Template AI tools'];
  if (j.includes('hr') || j.includes('recruiter'))
    return ['ATS AI screening', 'Automated scheduling', 'AI onboarding systems'];
  if (j.includes('customer service') || j.includes('support'))
    return ['AI chatbots & agents', 'Automated ticket routing', 'Sentiment AI tools'];
  return ['Task-level AI exposure', 'Market demand shifts', 'Salary trajectory risks'];
}

interface ContextPanelProps {
  state: GeneratorState;
}

export default function ContextPanel({ state }: ContextPanelProps) {
  const hints = state.jobTitle ? jobHints(state.jobTitle) : [];
  const hasAny = state.jobTitle || state.experienceLevel || state.goal || state.timeCommitment;

  return (
    <div className="flex flex-col gap-6">
      <div>
        <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-3 mb-3">
          Your analysis
        </div>
        <div className="border border-line rounded-xl overflow-hidden bg-surface">
          {[
            { label: 'Job', value: state.jobTitle },
            { label: 'Experience', value: state.experienceLevel ? EXP_LABELS[state.experienceLevel] : null },
            { label: 'Goal', value: state.goal ? GOAL_LABELS[state.goal] : null },
            { label: 'Time', value: state.timeCommitment ? TIME_LABELS[state.timeCommitment] : null },
          ].map(({ label, value }, i) => (
            <div key={label} className={`flex items-center gap-3 px-4 py-3 ${i > 0 ? 'border-t border-line' : ''}`}>
              <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-ink-3 w-20 shrink-0">
                {label}
              </span>
              <span className={`text-[13px] font-medium truncate ${value ? 'text-ink' : 'text-ink-3'}`}>
                {value ?? '—'}
              </span>
            </div>
          ))}
        </div>
      </div>

      {hints.length > 0 && (
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-3 mb-3">
            Risk factors being analyzed
          </div>
          <div className="flex flex-col gap-2">
            {hints.map(h => (
              <div key={h} className="flex items-center gap-2.5 text-[13px] text-ink-2">
                <span className="w-1 h-1 rounded-full bg-fire shrink-0" />
                {h}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="border-t border-line pt-5">
        <div className="flex flex-col gap-1.5 text-[12px] text-ink-3">
          <div>Oxford/Frey-Osborne Automation Index</div>
          <div>McKinsey Global Institute Task Analysis</div>
          <div>BLS Occupational Employment Data</div>
          <div>Current AI tool capability mapping</div>
        </div>
      </div>

      <div className={`text-[12px] font-semibold text-fire transition-opacity duration-300 ${hasAny ? 'opacity-100' : 'opacity-0'}`}>
        No account needed
      </div>
    </div>
  );
}
