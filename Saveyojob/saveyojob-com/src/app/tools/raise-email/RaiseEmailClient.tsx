'use client';
import { useState } from 'react';
import { Copy, Check, MailOpen, RotateCcw, Sparkles, Loader2 } from 'lucide-react';

interface Fields {
  yourName: string;
  managerName: string;
  role: string;
  currentSalary: string;
  targetSalary: string;
  timeInRole: string;
  win1: string;
  win2: string;
  win3: string;
  marketNote: string;
}

const EMPTY: Fields = {
  yourName: '',
  managerName: '',
  role: '',
  currentSalary: '',
  targetSalary: '',
  timeInRole: '',
  win1: '',
  win2: '',
  win3: '',
  marketNote: '',
};

function buildEmail(f: Fields): string {
  const manager = f.managerName || '[Manager Name]';
  const yourName = f.yourName || '[Your Name]';
  const role = f.role || '[Your Role]';

  const timePhrase = f.timeInRole.trim()
    ? `Over the past ${f.timeInRole.trim()}`
    : 'Over my time in this role';

  const wins = [f.win1, f.win2, f.win3].filter(w => w.trim());
  const winList = wins.length > 0
    ? '\n\n' + wins.map(w => `  • ${w.trim()}`).join('\n')
    : '';

  const salaryAsk = f.targetSalary.trim()
    ? `Based on this track record and current market rates, I would like to request a salary adjustment to ${f.targetSalary.trim()}.`
    : 'Based on this track record and current market rates, I would like to discuss a salary adjustment.';

  const currentSalaryLine = f.currentSalary.trim()
    ? ` My current salary is ${f.currentSalary.trim()}.`
    : '';

  const marketParagraph = f.marketNote.trim()
    ? `\n\n${f.marketNote.trim()}`
    : '';

  return `Subject: Request to discuss compensation — ${role}

Dear ${manager},

I am writing to request a conversation about my compensation.${timePhrase} in my role as ${role}, I have taken on significant responsibility and delivered strong results:${winList}
${marketParagraph}
${currentSalaryLine} ${salaryAsk}

I would welcome the opportunity to discuss this at your convenience. I am happy to provide any supporting information you might need, and I remain committed to contributing to the team's success.

Thank you for your time and consideration.

Best regards,
${yourName}`;
}

function isComplete(f: Fields): boolean {
  return !!(f.yourName && f.managerName && f.role && f.win1);
}

export default function RaiseEmailClient() {
  const [fields,  setFields]  = useState<Fields>(EMPTY);
  const [copied,  setCopied]  = useState(false);
  const [aiEmail, setAiEmail] = useState<string | null>(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError,   setAiError]   = useState<string | null>(null);
  const [showAI,  setShowAI]  = useState(false);

  const templateEmail = buildEmail(fields);
  const displayEmail  = showAI && aiEmail ? aiEmail : templateEmail;
  const ready = isComplete(fields);

  function set(key: keyof Fields, value: string) {
    setFields(prev => ({ ...prev, [key]: value }));
    // Reset AI email when inputs change so it doesn't show stale output
    setAiEmail(null);
    setShowAI(false);
  }

  async function copy() {
    await navigator.clipboard.writeText(displayEmail);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  async function improveWithAI() {
    if (!ready) return;
    setAiLoading(true);
    setAiError(null);

    const wins = [fields.win1, fields.win2, fields.win3].filter(w => w.trim());
    const prompt = [
      'Write a salary raise request email using these details:',
      '',
      `Name: ${fields.yourName}`,
      `Manager: ${fields.managerName}`,
      `Job title: ${fields.role}`,
      fields.timeInRole  ? `Time in role: ${fields.timeInRole}`        : null,
      fields.currentSalary ? `Current salary: ${fields.currentSalary}` : null,
      fields.targetSalary  ? `Target salary: ${fields.targetSalary}`   : null,
      '',
      'Accomplishments:',
      ...wins.map(w => `- ${w}`),
      fields.marketNote ? `\nMarket context: ${fields.marketNote}` : null,
      '',
      'Requirements: natural and persuasive (not a template), include a subject line, under 200 words, start directly with the email, no clichés.',
    ].filter(l => l !== null).join('\n');

    try {
      const res  = await fetch('/api/career-chat', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [{ role: 'user', content: prompt }] }),
      });
      const data = await res.json() as { reply?: string; error?: string };
      if (!res.ok || data.error) {
        setAiError(data.error ?? 'Something went wrong. Please try again.');
      } else {
        setAiEmail(data.reply ?? null);
        setShowAI(true);
      }
    } catch {
      setAiError('Connection error. Please try again.');
    } finally {
      setAiLoading(false);
    }
  }

  return (
    <div className="grid lg:grid-cols-[1fr_1fr] gap-8 items-start">

      {/* Form */}
      <div className="space-y-5">
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Your full name" required>
            <input type="text" placeholder="Jane Smith"
              value={fields.yourName} onChange={e => set('yourName', e.target.value)} />
          </Field>
          <Field label="Manager's name" required>
            <input type="text" placeholder="John Doe"
              value={fields.managerName} onChange={e => set('managerName', e.target.value)} />
          </Field>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Your job title" required>
            <input type="text" placeholder="Senior Analyst"
              value={fields.role} onChange={e => set('role', e.target.value)} />
          </Field>
          <Field label="How long in this role">
            <input type="text" placeholder="e.g. 18 months, 2 years"
              value={fields.timeInRole} onChange={e => set('timeInRole', e.target.value)} />
          </Field>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Current salary (optional)">
            <input type="text" placeholder="e.g. $72,000"
              value={fields.currentSalary} onChange={e => set('currentSalary', e.target.value)} />
          </Field>
          <Field label="Target salary (optional)">
            <input type="text" placeholder="e.g. $82,000"
              value={fields.targetSalary} onChange={e => set('targetSalary', e.target.value)} />
          </Field>
        </div>

        <div className="p-4 bg-surface border border-line rounded-xl space-y-4">
          <p className="text-[13px] font-semibold text-ink">Your wins — be specific with numbers where possible</p>
          <Field label="Accomplishment 1" required hint="Quantify if you can — revenue, savings, % improvement, projects led">
            <input type="text" placeholder="e.g. Led a cost-saving initiative that reduced vendor spend by 18% ($90K annually)"
              value={fields.win1} onChange={e => set('win1', e.target.value)} />
          </Field>
          <Field label="Accomplishment 2">
            <input type="text" placeholder="e.g. Delivered the Q2 product launch 3 weeks ahead of schedule"
              value={fields.win2} onChange={e => set('win2', e.target.value)} />
          </Field>
          <Field label="Accomplishment 3">
            <input type="text" placeholder="e.g. Trained and onboarded 4 new team members"
              value={fields.win3} onChange={e => set('win3', e.target.value)} />
          </Field>
        </div>

        <Field label="Market context (optional)" hint="Mention if your role commands more in the current market">
          <textarea rows={2} placeholder="e.g. Based on recent data from LinkedIn Salary and Glassdoor, the market rate for this role in this city is $80K–$90K."
            value={fields.marketNote} onChange={e => set('marketNote', e.target.value)} />
        </Field>

        {!ready && (
          <p className="text-[12px] text-ink-3">Fill in your name, manager&apos;s name, job title, and at least one accomplishment.</p>
        )}
      </div>

      {/* Output */}
      <div className="lg:sticky lg:top-8 space-y-3">

        {/* Version toggle — only shown once AI email exists */}
        {aiEmail && (
          <div className="flex items-center gap-1 p-1 bg-surface border border-line rounded-xl">
            <button
              onClick={() => setShowAI(false)}
              className={`flex-1 text-[12px] font-semibold py-1.5 rounded-lg transition-colors ${!showAI ? 'bg-fire text-bg' : 'text-ink-3 hover:text-ink'}`}
            >
              Template
            </button>
            <button
              onClick={() => setShowAI(true)}
              className={`flex-1 flex items-center justify-center gap-1.5 text-[12px] font-semibold py-1.5 rounded-lg transition-colors ${showAI ? 'bg-fire text-bg' : 'text-ink-3 hover:text-ink'}`}
            >
              <Sparkles size={11} strokeWidth={1.5} />
              AI-Written
            </button>
          </div>
        )}

        <div className={`bg-surface border border-line rounded-xl overflow-hidden transition-opacity duration-200 ${ready ? 'opacity-100' : 'opacity-40'}`}>
          <div className="flex items-center justify-between px-5 py-3 border-b border-line">
            <div className="flex items-center gap-2 text-[13px] font-semibold text-ink">
              <MailOpen size={14} strokeWidth={1.5} />
              Raise Request Email
            </div>
            <div className="flex items-center gap-3">
              <button onClick={() => { setFields(EMPTY); setAiEmail(null); setShowAI(false); }}
                className="flex items-center gap-1.5 text-[12px] text-ink-3 hover:text-ink transition-colors">
                <RotateCcw size={12} strokeWidth={1.5} />
                Reset
              </button>
              <button onClick={copy} disabled={!ready}
                className="flex items-center gap-1.5 text-[12px] font-medium transition-colors disabled:opacity-30 disabled:cursor-not-allowed text-fire hover:brightness-110">
                {copied ? <Check size={13} strokeWidth={1.5} /> : <Copy size={13} strokeWidth={1.5} />}
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
          </div>
          <pre className="px-5 py-5 text-[13px] leading-relaxed text-ink-2 whitespace-pre-wrap font-[inherit] overflow-auto max-h-[560px]">
            {displayEmail}
          </pre>
        </div>

        {/* AI improve button */}
        <button
          onClick={improveWithAI}
          disabled={!ready || aiLoading}
          className="w-full flex items-center justify-center gap-2 py-2.5 bg-fire/[0.07] border border-fire/30 text-fire text-[13px] font-semibold rounded-xl hover:bg-fire/[0.12] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {aiLoading
            ? <><Loader2 size={14} strokeWidth={1.5} className="animate-spin" />Writing AI email...</>
            : <><Sparkles size={14} strokeWidth={1.5} />{aiEmail ? 'Regenerate AI version' : 'Improve with AI'}</>
          }
        </button>

        {aiError && <p className="text-[12px] text-accent">{aiError}</p>}

        <p className="text-[11px] text-ink-3 leading-relaxed">
          Send this to request a meeting — don&apos;t use it as a final ask. Follow up in person or on a call.
        </p>
      </div>

    </div>
  );
}

function Field({ label, required, hint, children }: {
  label: string; required?: boolean; hint?: string; children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-[13px] font-medium text-ink mb-1.5">
        {label}{required && <span className="text-fire ml-0.5">*</span>}
      </label>
      {hint && <p className="text-[11px] text-ink-3 mb-1.5">{hint}</p>}
      <div className="[&_input]:w-full [&_select]:w-full [&_textarea]:w-full [&_input]:bg-surface [&_select]:bg-surface [&_textarea]:bg-surface [&_input]:border [&_select]:border [&_textarea]:border [&_input]:border-line [&_select]:border-line [&_textarea]:border-line [&_input]:rounded-lg [&_select]:rounded-lg [&_textarea]:rounded-lg [&_input]:px-3 [&_select]:px-3 [&_textarea]:px-3 [&_input]:py-2.5 [&_select]:py-2.5 [&_textarea]:py-2.5 [&_input]:text-[14px] [&_select]:text-[14px] [&_textarea]:text-[14px] [&_input]:text-ink [&_select]:text-ink [&_textarea]:text-ink [&_input]:outline-none [&_select]:outline-none [&_textarea]:outline-none [&_input]:focus:border-fire [&_select]:focus:border-fire [&_textarea]:focus:border-fire [&_textarea]:resize-none">
        {children}
      </div>
    </div>
  );
}
