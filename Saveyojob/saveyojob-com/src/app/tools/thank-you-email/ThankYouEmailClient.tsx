'use client';
import { useState } from 'react';
import { Copy, Check, Mail, RotateCcw, Sparkles, Loader2 } from 'lucide-react';

const TONES = [
  { value: 'professional', label: 'Professional' },
  { value: 'warm',         label: 'Warm & conversational' },
  { value: 'concise',      label: 'Short & direct' },
];

interface Fields {
  yourName: string;
  interviewerName: string;
  role: string;
  company: string;
  interviewDate: string;
  moment1: string;
  moment2: string;
  strength: string;
  tone: string;
}

const EMPTY: Fields = {
  yourName: '',
  interviewerName: '',
  role: '',
  company: '',
  interviewDate: '',
  moment1: '',
  moment2: '',
  strength: '',
  tone: 'professional',
};

function buildEmail(f: Fields): string {
  const name = f.interviewerName || '[Interviewer Name]';
  const role = f.role || '[Role]';
  const company = f.company || '[Company]';
  const yourName = f.yourName || '[Your Name]';

  const datePhrase = f.interviewDate
    ? (() => {
        const d = new Date(f.interviewDate + 'T00:00:00');
        return d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
      })()
    : 'today';

  const momentLines: string[] = [];
  if (f.moment1.trim()) momentLines.push(f.moment1.trim());
  if (f.moment2.trim()) momentLines.push(f.moment2.trim());

  const momentBlock = momentLines.length > 0
    ? `\nI particularly enjoyed ${momentLines.length === 1
        ? momentLines[0]
        : `our conversation about ${momentLines[0]}, as well as ${momentLines[1]}`}.\n`
    : '';

  const strengthLine = f.strength.trim()
    ? `\nI also wanted to reiterate that my experience with ${f.strength.trim()} aligns closely with what you described, and I am excited about the prospect of contributing to ${company}.\n`
    : '';

  if (f.tone === 'concise') {
    return `Subject: Thank you — ${role} interview

Hi ${name},

Thank you for taking the time to speak with me ${datePhrase} about the ${role} position at ${company}.${momentBlock}
I remain very interested in the role and look forward to hearing about next steps.

Best regards,
${yourName}`;
  }

  if (f.tone === 'warm') {
    return `Subject: Great speaking with you — ${role} at ${company}

Hi ${name},

I just wanted to reach out and say a genuine thank you for the conversation ${datePhrase}. It was a real pleasure learning more about the ${role} role and the team at ${company}.${momentBlock}${strengthLine}
I left the interview feeling genuinely excited about this opportunity, and I hope we have the chance to work together. Please don't hesitate to reach out if you need anything else from me.

Warmly,
${yourName}`;
  }

  // professional (default)
  return `Subject: Thank you — ${role} interview, ${datePhrase}

Dear ${name},

Thank you for taking the time to meet with me ${datePhrase} to discuss the ${role} position at ${company}. I appreciated the opportunity to learn more about the role and the team.${momentBlock}${strengthLine}
The conversation reinforced my enthusiasm for this position, and I am confident that my background would allow me to make a meaningful contribution. I look forward to hearing about the next steps in the process.

Please feel free to reach out if you need any additional information.

Kind regards,
${yourName}`;
}

function isComplete(f: Fields): boolean {
  return !!(f.yourName && f.interviewerName && f.role && f.company);
}

export default function ThankYouEmailClient() {
  const [fields, setFields] = useState<Fields>(EMPTY);
  const [copied, setCopied] = useState(false);
  const [aiEmail, setAiEmail] = useState<string | null>(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);
  const [showAI, setShowAI] = useState(false);

  const templateEmail = buildEmail(fields);
  const displayEmail = showAI && aiEmail ? aiEmail : templateEmail;
  const ready = isComplete(fields);

  function set(key: keyof Fields, value: string) {
    setFields(prev => ({ ...prev, [key]: value }));
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

    const toneLabel = TONES.find(t => t.value === fields.tone)?.label ?? fields.tone;
    const datePhrase = fields.interviewDate
      ? new Date(fields.interviewDate + 'T00:00:00').toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })
      : '';

    const prompt = [
      'Write a post-interview thank you email using these details:',
      '',
      `Your name: ${fields.yourName}`,
      `Interviewer name: ${fields.interviewerName}`,
      `Role: ${fields.role}`,
      `Company: ${fields.company}`,
      datePhrase ? `Interview date: ${datePhrase}` : null,
      fields.moment1.trim() ? `Specific moment 1: ${fields.moment1.trim()}` : null,
      fields.moment2.trim() ? `Specific moment 2: ${fields.moment2.trim()}` : null,
      fields.strength.trim() ? `Strength to reiterate: ${fields.strength.trim()}` : null,
      `Tone: ${toneLabel}`,
      '',
      'Requirements: genuine and personal (not a template), include a subject line, under 150 words, start directly with the email, no clichés.',
    ].filter(l => l !== null).join('\n');

    try {
      const res = await fetch('/api/career-chat', {
        method: 'POST',
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
            <input
              type="text"
              placeholder="Jane Smith"
              value={fields.yourName}
              onChange={e => set('yourName', e.target.value)}
            />
          </Field>
          <Field label="Interviewer's name" required>
            <input
              type="text"
              placeholder="Sarah Chen"
              value={fields.interviewerName}
              onChange={e => set('interviewerName', e.target.value)}
            />
          </Field>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Role you interviewed for" required>
            <input
              type="text"
              placeholder="Product Manager"
              value={fields.role}
              onChange={e => set('role', e.target.value)}
            />
          </Field>
          <Field label="Company name" required>
            <input
              type="text"
              placeholder="Acme Corp"
              value={fields.company}
              onChange={e => set('company', e.target.value)}
            />
          </Field>
        </div>

        <Field label="Interview date">
          <input
            type="date"
            value={fields.interviewDate}
            onChange={e => set('interviewDate', e.target.value)}
          />
        </Field>

        <Field label="Something specific you discussed (optional)" hint="Referencing real moments makes the email stand out">
          <input
            type="text"
            placeholder="e.g. the team's approach to roadmap prioritisation"
            value={fields.moment1}
            onChange={e => set('moment1', e.target.value)}
          />
        </Field>

        <Field label="A second talking point (optional)">
          <input
            type="text"
            placeholder="e.g. the upcoming product launch in Q3"
            value={fields.moment2}
            onChange={e => set('moment2', e.target.value)}
          />
        </Field>

        <Field label="A strength you want to reiterate (optional)">
          <input
            type="text"
            placeholder="e.g. leading cross-functional teams in a fast-moving environment"
            value={fields.strength}
            onChange={e => set('strength', e.target.value)}
          />
        </Field>

        <div>
          <label className="block text-[13px] font-medium text-ink mb-2">Tone</label>
          <div className="flex flex-wrap gap-2">
            {TONES.map(t => (
              <button
                key={t.value}
                onClick={() => set('tone', t.value)}
                className={`px-3.5 py-2 rounded-lg text-[13px] font-medium border transition-colors ${
                  fields.tone === t.value
                    ? 'bg-fire text-bg border-fire'
                    : 'bg-surface text-ink-2 border-line hover:border-ink-3'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {!ready && (
          <p className="text-[12px] text-ink-3">Fill in the required fields to generate your email.</p>
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
              <Mail size={14} strokeWidth={1.5} />
              Thank You Email
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => { setFields(EMPTY); setAiEmail(null); setShowAI(false); }}
                className="flex items-center gap-1.5 text-[12px] text-ink-3 hover:text-ink transition-colors"
              >
                <RotateCcw size={12} strokeWidth={1.5} />
                Reset
              </button>
              <button
                onClick={copy}
                disabled={!ready}
                className="flex items-center gap-1.5 text-[12px] font-medium transition-colors disabled:opacity-30 disabled:cursor-not-allowed text-fire hover:brightness-110"
              >
                {copied ? <Check size={13} strokeWidth={1.5} /> : <Copy size={13} strokeWidth={1.5} />}
                {copied ? 'Copied!' : 'Copy email'}
              </button>
            </div>
          </div>
          <pre className="px-5 py-5 text-[13px] leading-relaxed text-ink-2 whitespace-pre-wrap font-[inherit] overflow-auto max-h-[600px]">
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
          Send within 24 hours of your interview. Personalise further before sending if needed.
        </p>
      </div>

    </div>
  );
}

function Field({
  label, required, hint, children,
}: {
  label: string; required?: boolean; hint?: string; children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-[13px] font-medium text-ink mb-1.5">
        {label}
        {required && <span className="text-fire ml-0.5">*</span>}
      </label>
      {hint && <p className="text-[11px] text-ink-3 mb-1.5">{hint}</p>}
      <div className="[&_input]:w-full [&_select]:w-full [&_textarea]:w-full [&_input]:bg-surface [&_select]:bg-surface [&_textarea]:bg-surface [&_input]:border [&_select]:border [&_textarea]:border [&_input]:border-line [&_select]:border-line [&_textarea]:border-line [&_input]:rounded-lg [&_select]:rounded-lg [&_textarea]:rounded-lg [&_input]:px-3 [&_select]:px-3 [&_textarea]:px-3 [&_input]:py-2.5 [&_select]:py-2.5 [&_textarea]:py-2.5 [&_input]:text-[14px] [&_select]:text-[14px] [&_textarea]:text-[14px] [&_input]:text-ink [&_select]:text-ink [&_textarea]:text-ink [&_input]:outline-none [&_select]:outline-none [&_textarea]:outline-none [&_input]:focus:border-fire [&_select]:focus:border-fire [&_textarea]:focus:border-fire [&_textarea]:resize-none">
        {children}
      </div>
    </div>
  );
}
