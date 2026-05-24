'use client';
import { useState } from 'react';
import { Copy, Check, TrendingUp, RotateCcw, Sparkles, Loader2 } from 'lucide-react';

interface Fields {
  yourName:       string;
  company:        string;
  role:           string;
  offerAmount:    string;
  targetAmount:   string;
  competingOffer: string;
  strength:       string;
}

const EMPTY: Fields = {
  yourName:       '',
  company:        '',
  role:           '',
  offerAmount:    '',
  targetAmount:   '',
  competingOffer: '',
  strength:       '',
};

type Strategy = 'safe' | 'assertive' | 'aggressive';

const STRATEGIES: { value: Strategy; label: string; desc: string }[] = [
  { value: 'safe',       label: 'Safe',       desc: 'Polite ask — keeps the offer alive and the relationship warm' },
  { value: 'assertive',  label: 'Assertive',  desc: 'Confident counter backed by market data — the most effective default' },
  { value: 'aggressive', label: 'Aggressive', desc: 'Direct stand — best when you have a competing offer or strong leverage' },
];

function buildScript(f: Fields, s: Strategy): string {
  const name    = f.yourName    || '[Your Name]';
  const company = f.company     || '[Company]';
  const role    = f.role        || '[Role]';
  const offer   = f.offerAmount.trim()  || '[offer amount]';
  const target  = f.targetAmount.trim() || '[target salary]';

  const strengthPart  = f.strength.trim()
    ? ` My experience in ${f.strength.trim()} is a direct match for what you need, and I'm confident I'll contribute quickly.`
    : '';

  const competingPart = f.competingOffer.trim()
    ? ` I also have a competing offer at ${f.competingOffer.trim()},`
    : '';

  if (s === 'safe') {
    return `Subject: Re: ${role} offer

Hi,

Thank you again for the offer — I'm genuinely excited about the ${role} opportunity at ${company} and the team I'd be joining.

I did want to check if there's any flexibility on the base salary. The offer is ${offer} and I was hoping we could get closer to ${target}. Even a modest adjustment would make a real difference.${strengthPart}

I'd love to make this work and I'm happy to talk it through. Would you be open to revisiting the number?

Best,
${name}`;
  }

  if (s === 'assertive') {
    return `Subject: Re: ${role} offer — salary discussion

Hi,

Thank you for the offer. I'm excited about joining ${company} as ${role}.

I've done some research on market rates, and comparable roles are coming in at ${target}. The current offer of ${offer} is below that range.${strengthPart} I'd like to propose ${target} as my starting salary.

I'm ready to move quickly once we align on compensation. Can we get to ${target}?

Best,
${name}`;
  }

  // aggressive
  return `Subject: Re: ${role} offer — counter-proposal

Hi,

Thank you for the offer. I'm genuinely interested in the ${role} role at ${company} — but I need to be straight with you about the numbers.

${offer} doesn't work for me.${competingPart} and market benchmarks for this level put the range at ${target}. To move forward, I need the base salary to be ${target}.${strengthPart}

I hope we can make this work. Is ${target} something you can do?

${name}`;
}

type AIScripts = Record<Strategy, string>;

function parseAIResponse(text: string): AIScripts | null {
  const safeMatch       = text.match(/---SAFE---([\s\S]*?)(?=---ASSERTIVE---|$)/);
  const assertiveMatch  = text.match(/---ASSERTIVE---([\s\S]*?)(?=---AGGRESSIVE---|$)/);
  const aggressiveMatch = text.match(/---AGGRESSIVE---([\s\S]*?)$/);

  if (!safeMatch || !assertiveMatch || !aggressiveMatch) return null;
  return {
    safe:       safeMatch[1].trim(),
    assertive:  assertiveMatch[1].trim(),
    aggressive: aggressiveMatch[1].trim(),
  };
}

function isComplete(f: Fields): boolean {
  return !!(f.yourName && f.company && f.role && f.offerAmount && f.targetAmount);
}

export default function SalaryNegotiationClient() {
  const [fields,    setFields]    = useState<Fields>(EMPTY);
  const [strategy,  setStrategy]  = useState<Strategy>('assertive');
  const [copied,    setCopied]    = useState(false);
  const [aiScripts, setAiScripts] = useState<AIScripts | null>(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError,   setAiError]   = useState<string | null>(null);
  const [showAI,    setShowAI]    = useState(false);

  const templateScript = buildScript(fields, strategy);
  const aiScript       = aiScripts?.[strategy] ?? null;
  const displayScript  = showAI && aiScript ? aiScript : templateScript;
  const ready          = isComplete(fields);

  function set(key: keyof Fields, value: string) {
    setFields(prev => ({ ...prev, [key]: value }));
    setAiScripts(null);
    setShowAI(false);
  }

  async function copy() {
    await navigator.clipboard.writeText(displayScript);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  async function generateWithAI() {
    if (!ready) return;
    setAiLoading(true);
    setAiError(null);

    const prompt = [
      'Write 3 salary negotiation scripts for a job offer using these details:',
      '',
      `Name: ${fields.yourName}`,
      `Company: ${fields.company}`,
      `Role: ${fields.role}`,
      `Offer amount: ${fields.offerAmount}`,
      `Target amount: ${fields.targetAmount}`,
      fields.competingOffer.trim() ? `Competing offer: ${fields.competingOffer}` : null,
      fields.strength.trim()       ? `Key strength: ${fields.strength}`          : null,
      '',
      'Output exactly 3 scripts separated by these exact delimiters (include the delimiters on their own lines):',
      '---SAFE---',
      '(script 1: polite, grateful, asks for a modest bump, keeps the offer alive)',
      '---ASSERTIVE---',
      '(script 2: confident, references market data and value, makes a clear ask)',
      '---AGGRESSIVE---',
      '(script 3: direct counter, uses leverage if available, makes a firm stand)',
      '',
      'Each script: include a subject line, under 120 words, no clichés, word-for-word ready to send. Start each script directly with "Subject:" — no intro text before or after.',
    ].filter(Boolean).join('\n');

    try {
      const res  = await fetch('/api/ai-generate', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [{ role: 'user', content: prompt }] }),
      });
      const data = await res.json() as { reply?: string; error?: string };
      if (!res.ok || data.error) {
        setAiError(data.error ?? 'Something went wrong — please try again.');
      } else {
        const parsed = parseAIResponse(data.reply ?? '');
        if (parsed) {
          setAiScripts(parsed);
          setShowAI(true);
        } else {
          setAiError('The AI response was not in the expected format — please try again.');
        }
      }
    } catch {
      setAiError('Your internet connection dropped — please check your connection and try again.');
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
          <Field label="Company name" required>
            <input type="text" placeholder="Acme Corp"
              value={fields.company} onChange={e => set('company', e.target.value)} />
          </Field>
        </div>

        <Field label="Role you were offered" required>
          <input type="text" placeholder="Senior Product Manager"
            value={fields.role} onChange={e => set('role', e.target.value)} />
        </Field>

        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Offer amount" required hint="What they offered you">
            <input type="text" placeholder="e.g. $85,000"
              value={fields.offerAmount} onChange={e => set('offerAmount', e.target.value)} />
          </Field>
          <Field label="Your target" required hint="What you want to walk away with">
            <input type="text" placeholder="e.g. $97,000"
              value={fields.targetAmount} onChange={e => set('targetAmount', e.target.value)} />
          </Field>
        </div>

        <Field label="Competing offer (optional)" hint="Leave blank if you don't have one — don't bluff">
          <input type="text" placeholder="e.g. $95,000 from another company"
            value={fields.competingOffer} onChange={e => set('competingOffer', e.target.value)} />
        </Field>

        <Field label="Your strongest selling point (optional)" hint="What you bring that justifies the higher number">
          <input type="text" placeholder="e.g. 5 years managing high-growth teams in SaaS"
            value={fields.strength} onChange={e => set('strength', e.target.value)} />
        </Field>

        {!ready && (
          <p className="text-[12px] text-ink-3">Fill in your name, company, role, offer amount, and target to generate your scripts.</p>
        )}
      </div>

      {/* Output */}
      <div className="lg:sticky lg:top-8 space-y-3">

        {/* Strategy tabs */}
        <div className="flex items-center gap-1 p-1 bg-surface border border-line rounded-xl">
          {STRATEGIES.map(s => (
            <button
              key={s.value}
              onClick={() => { setStrategy(s.value); setCopied(false); }}
              className={`flex-1 text-[12px] font-semibold py-1.5 rounded-lg transition-colors ${
                strategy === s.value ? 'bg-fire text-bg' : 'text-ink-3 hover:text-ink'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>

        <p className="text-[11px] text-ink-3 px-0.5">
          {STRATEGIES.find(s => s.value === strategy)?.desc}
        </p>

        {/* Template / AI toggle — only once AI scripts exist */}
        {aiScripts && (
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

        {/* Script output */}
        <div className={`bg-surface border border-line rounded-xl overflow-hidden transition-opacity duration-200 ${ready ? 'opacity-100' : 'opacity-40'}`}>
          <div className="flex items-center justify-between px-5 py-3 border-b border-line">
            <div className="flex items-center gap-2 text-[13px] font-semibold text-ink">
              <TrendingUp size={14} strokeWidth={1.5} />
              {STRATEGIES.find(s => s.value === strategy)?.label} Script
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => { setFields(EMPTY); setAiScripts(null); setShowAI(false); }}
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
                {copied ? 'Copied!' : 'Copy script'}
              </button>
            </div>
          </div>
          <pre className="px-5 py-5 text-[13px] leading-relaxed text-ink-2 whitespace-pre-wrap font-[inherit] overflow-auto max-h-[560px]">
            {displayScript}
          </pre>
        </div>

        {/* AI generate button */}
        <button
          onClick={generateWithAI}
          disabled={!ready || aiLoading}
          className="w-full flex items-center justify-center gap-2 py-2.5 bg-fire/[0.07] border border-fire/30 text-fire text-[13px] font-semibold rounded-xl hover:bg-fire/[0.12] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {aiLoading
            ? <><Loader2 size={14} strokeWidth={1.5} className="animate-spin" />Writing AI scripts...</>
            : <><Sparkles size={14} strokeWidth={1.5} />{aiScripts ? 'Regenerate AI scripts' : 'Write AI scripts'}</>
          }
        </button>

        {aiError && <p className="text-[12px] text-accent">{aiError}</p>}

        <p className="text-[11px] text-ink-3 leading-relaxed">
          Always negotiate — most companies expect it and build room into the first offer. The Assertive script works in most situations.
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
