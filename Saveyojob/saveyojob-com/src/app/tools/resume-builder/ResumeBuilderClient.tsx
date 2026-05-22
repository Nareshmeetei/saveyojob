'use client';

import { useState } from 'react';
import { Copy, Check, Printer, Plus, Trash2, FileText } from 'lucide-react';

interface Contact {
  name: string; email: string; phone: string;
  location: string; linkedin: string;
}

interface Exp {
  id: string;
  title: string; company: string; location: string;
  startDate: string; endDate: string; isCurrent: boolean;
  bullets: [string, string, string, string];
}

interface Edu {
  id: string;
  degree: string; school: string; year: string;
}

interface Fields {
  contact: Contact;
  summary: string;
  exps: Exp[];
  edus: Edu[];
  skills: string;
}

function uid() { return crypto.randomUUID(); }

function emptyExp(): Exp {
  return { id: uid(), title: '', company: '', location: '', startDate: '', endDate: '', isCurrent: false, bullets: ['', '', '', ''] };
}
function emptyEdu(): Edu {
  return { id: uid(), degree: '', school: '', year: '' };
}

const INIT: Fields = {
  contact: { name: '', email: '', phone: '', location: '', linkedin: '' },
  summary: '',
  exps: [emptyExp()],
  edus: [emptyEdu()],
  skills: '',
};

const BULLET_HINTS = [
  'e.g. Grew organic traffic 3× in 12 months by redesigning content strategy',
  'e.g. Reduced CPA by 34% through A/B testing and landing page optimisation',
  'e.g. Led a cross-functional team of 5 to ship product on time and 12% under budget',
  'e.g. Trained 40+ staff on new system — cut average onboarding time by 2 weeks',
];

function toPlainText(f: Fields): string {
  const lines: string[] = [];
  const { contact: c, summary, exps, edus, skills } = f;

  if (c.name) lines.push(c.name.toUpperCase(), '');
  const contactLine = [c.email, c.phone, c.location, c.linkedin].filter(Boolean).join(' | ');
  if (contactLine) { lines.push(contactLine, ''); }

  if (summary.trim()) {
    lines.push('SUMMARY', '─'.repeat(48), summary.trim(), '');
  }

  const filledExps = exps.filter(e => e.title || e.company);
  if (filledExps.length) {
    lines.push('EXPERIENCE', '─'.repeat(48));
    for (const e of filledExps) {
      const role = [e.title, e.company, e.location].filter(Boolean).join(' | ');
      const dates = [e.startDate, e.isCurrent ? 'Present' : e.endDate].filter(Boolean).join(' – ');
      lines.push(dates ? `${role}  (${dates})` : role);
      e.bullets.filter(b => b.trim()).forEach(b => lines.push(`• ${b.trim()}`));
      lines.push('');
    }
  }

  const filledEdus = edus.filter(e => e.degree || e.school);
  if (filledEdus.length) {
    lines.push('EDUCATION', '─'.repeat(48));
    for (const e of filledEdus) {
      lines.push([e.degree, e.school, e.year].filter(Boolean).join(' | '));
    }
    lines.push('');
  }

  if (skills.trim()) {
    lines.push('SKILLS', '─'.repeat(48), skills.trim());
  }

  return lines.join('\n').trim();
}

function toHTML(f: Fields): string {
  const { contact: c, summary, exps, edus, skills } = f;
  const contactLine = [c.email, c.phone, c.location, c.linkedin].filter(Boolean).join(' &nbsp;·&nbsp; ');
  const filledExps = exps.filter(e => e.title || e.company);
  const filledEdus = edus.filter(e => e.degree || e.school);

  const expHTML = filledExps.map(e => {
    const meta = [e.company, e.location].filter(Boolean).join(', ');
    const dates = [e.startDate, e.isCurrent ? 'Present' : e.endDate].filter(Boolean).join(' – ');
    const bullets = e.bullets.filter(b => b.trim()).map(b => `<li>${b}</li>`).join('');
    return `
      <div class="job">
        <div class="job-top">
          <div><strong>${e.title || '—'}</strong>${meta ? ` <span class="meta">· ${meta}</span>` : ''}</div>
          ${dates ? `<span class="dates">${dates}</span>` : ''}
        </div>
        ${bullets ? `<ul>${bullets}</ul>` : ''}
      </div>`;
  }).join('');

  const eduHTML = filledEdus.map(e => `
    <div class="edu-row">
      <span><strong>${e.degree || '—'}</strong>${e.school ? ` · ${e.school}` : ''}</span>
      ${e.year ? `<span class="dates">${e.year}</span>` : ''}
    </div>`).join('');

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>${c.name || 'Resume'}</title>
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: Arial, Helvetica, sans-serif; font-size: 13px; color: #1a1a1a; max-width: 760px; margin: 40px auto; padding: 0 40px; line-height: 1.5; }
  h1 { font-size: 26px; font-weight: 700; letter-spacing: -0.5px; margin-bottom: 4px; }
  .contact { font-size: 12px; color: #555; margin-bottom: 24px; }
  .section { margin-bottom: 18px; }
  .section-label { font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.12em; color: #777; border-bottom: 1px solid #d0d0d0; padding-bottom: 4px; margin-bottom: 12px; }
  p { color: #333; }
  .job { margin-bottom: 12px; }
  .job-top { display: flex; justify-content: space-between; align-items: baseline; gap: 8px; margin-bottom: 4px; }
  .meta { color: #555; }
  .dates { font-size: 12px; color: #777; white-space: nowrap; }
  ul { padding-left: 18px; margin-top: 4px; }
  li { margin-bottom: 2px; color: #333; }
  .edu-row { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 4px; }
  @media print { body { margin: 20px auto; padding: 0 30px; } }
</style>
</head>
<body>
  ${c.name ? `<h1>${c.name}</h1>` : ''}
  ${contactLine ? `<p class="contact">${contactLine}</p>` : ''}
  ${summary ? `<div class="section"><div class="section-label">Summary</div><p>${summary}</p></div>` : ''}
  ${filledExps.length ? `<div class="section"><div class="section-label">Experience</div>${expHTML}</div>` : ''}
  ${filledEdus.length ? `<div class="section"><div class="section-label">Education</div>${eduHTML}</div>` : ''}
  ${skills ? `<div class="section"><div class="section-label">Skills</div><p>${skills}</p></div>` : ''}
</body>
</html>`;
}

export default function ResumeBuilderClient() {
  const [f, setF] = useState<Fields>(INIT);
  const [copied, setCopied] = useState(false);

  function setC(k: keyof Contact, v: string) {
    setF(s => ({ ...s, contact: { ...s.contact, [k]: v } }));
  }
  function patchExp(id: string, patch: Partial<Exp>) {
    setF(s => ({ ...s, exps: s.exps.map(e => e.id === id ? { ...e, ...patch } : e) }));
  }
  function setBullet(id: string, i: number, v: string) {
    setF(s => ({
      ...s,
      exps: s.exps.map(e => {
        if (e.id !== id) return e;
        const bullets = [...e.bullets] as [string, string, string, string];
        bullets[i] = v;
        return { ...e, bullets };
      }),
    }));
  }
  function patchEdu(id: string, patch: Partial<Edu>) {
    setF(s => ({ ...s, edus: s.edus.map(e => e.id === id ? { ...e, ...patch } : e) }));
  }

  async function copy() {
    await navigator.clipboard.writeText(toPlainText(f));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function handlePrint() {
    const w = window.open('', '_blank');
    if (!w) return;
    w.document.write(toHTML(f));
    w.document.close();
    setTimeout(() => { w.print(); }, 400);
  }

  const { contact: c, summary, exps, edus, skills } = f;
  const hasContent = !!(c.name || summary || exps.some(e => e.title) || skills);

  return (
    <div className="grid lg:grid-cols-[1fr_400px] gap-10 items-start">

      {/* ── Form ────────────────────────────────────────────── */}
      <div className="space-y-8">

        {/* Contact */}
        <FormSection title="Contact Information">
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Full name" required>
              <input value={c.name} onChange={e => setC('name', e.target.value)} placeholder="Jane Smith" />
            </Field>
            <Field label="Email" required>
              <input type="email" value={c.email} onChange={e => setC('email', e.target.value)} placeholder="jane@email.com" />
            </Field>
            <Field label="Phone">
              <input value={c.phone} onChange={e => setC('phone', e.target.value)} placeholder="415-555-0100" />
            </Field>
            <Field label="Location">
              <input value={c.location} onChange={e => setC('location', e.target.value)} placeholder="San Francisco, CA" />
            </Field>
            <Field label="LinkedIn" className="sm:col-span-2">
              <input value={c.linkedin} onChange={e => setC('linkedin', e.target.value)} placeholder="linkedin.com/in/janesmith" />
            </Field>
          </div>
        </FormSection>

        {/* Summary */}
        <FormSection title="Professional Summary">
          <p className="text-[12px] text-ink-3 mb-3 leading-relaxed">
            2–4 sentences: who you are, years of experience, your top strength, and what you bring.
          </p>
          <Field label="">
            <textarea
              rows={4}
              value={summary}
              onChange={e => setF(s => ({ ...s, summary: e.target.value }))}
              placeholder="Results-driven Marketing Manager with 8+ years in B2B SaaS. Specialise in demand generation programs that consistently exceed pipeline targets. Known for turning data into decisions that reduce CAC and accelerate revenue growth."
            />
          </Field>
        </FormSection>

        {/* Experience */}
        <FormSection title="Work Experience">
          <p className="text-[12px] text-ink-3 mb-5 leading-relaxed">
            Start each bullet with an action verb and include a result or metric. Built, Led, Increased, Reduced, Launched, Saved...
          </p>
          <div className="space-y-5">
            {exps.map((exp, idx) => (
              <div key={exp.id} className="bg-surface border border-line rounded-xl p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-ink-3 uppercase tracking-[0.1em]">Job {idx + 1}</span>
                  {exps.length > 1 && (
                    <button
                      onClick={() => setF(s => ({ ...s, exps: s.exps.filter(e => e.id !== exp.id) }))}
                      className="text-ink-3 hover:text-accent transition-colors"
                    >
                      <Trash2 size={14} strokeWidth={1.5} />
                    </button>
                  )}
                </div>

                <div className="grid sm:grid-cols-2 gap-3">
                  <Field label="Job title" required>
                    <input value={exp.title} onChange={e => patchExp(exp.id, { title: e.target.value })} placeholder="Marketing Manager" />
                  </Field>
                  <Field label="Company" required>
                    <input value={exp.company} onChange={e => patchExp(exp.id, { company: e.target.value })} placeholder="Acme Corp" />
                  </Field>
                  <Field label="Start date">
                    <input value={exp.startDate} onChange={e => patchExp(exp.id, { startDate: e.target.value })} placeholder="Jan 2021" />
                  </Field>
                  <Field label="End date">
                    <input
                      value={exp.isCurrent ? '' : exp.endDate}
                      onChange={e => patchExp(exp.id, { endDate: e.target.value })}
                      disabled={exp.isCurrent}
                      placeholder="Dec 2023"
                    />
                  </Field>
                  <label className="flex items-center gap-2 cursor-pointer sm:col-span-2 -mt-1">
                    <input
                      type="checkbox"
                      checked={exp.isCurrent}
                      onChange={e => patchExp(exp.id, { isCurrent: e.target.checked })}
                      className="accent-fire w-4 h-4"
                    />
                    <span className="text-[13px] text-ink-2">I currently work here</span>
                  </label>
                  <Field label="Location" className="sm:col-span-2">
                    <input value={exp.location} onChange={e => patchExp(exp.id, { location: e.target.value })} placeholder="San Francisco, CA" />
                  </Field>
                </div>

                <div className="space-y-2.5">
                  <p className="text-[12px] font-semibold text-ink-2">Key accomplishments (1–4 bullets)</p>
                  {exp.bullets.map((b, i) => (
                    <Field key={i} label="">
                      <input
                        value={b}
                        onChange={e => setBullet(exp.id, i, e.target.value)}
                        placeholder={BULLET_HINTS[i]}
                      />
                    </Field>
                  ))}
                </div>
              </div>
            ))}
          </div>
          {exps.length < 6 && (
            <button
              onClick={() => setF(s => ({ ...s, exps: [...s.exps, emptyExp()] }))}
              className="mt-4 flex items-center gap-2 text-[13px] font-semibold text-fire hover:brightness-110 transition-colors"
            >
              <Plus size={15} strokeWidth={2} />
              Add another job
            </button>
          )}
        </FormSection>

        {/* Education */}
        <FormSection title="Education">
          <div className="space-y-4">
            {edus.map((edu, idx) => (
              <div key={edu.id} className="bg-surface border border-line rounded-xl p-5">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] font-bold text-ink-3 uppercase tracking-[0.1em]">Qualification {idx + 1}</span>
                  {edus.length > 1 && (
                    <button
                      onClick={() => setF(s => ({ ...s, edus: s.edus.filter(e => e.id !== edu.id) }))}
                      className="text-ink-3 hover:text-accent transition-colors"
                    >
                      <Trash2 size={14} strokeWidth={1.5} />
                    </button>
                  )}
                </div>
                <div className="grid sm:grid-cols-3 gap-3">
                  <Field label="Degree" required>
                    <input value={edu.degree} onChange={e => patchEdu(edu.id, { degree: e.target.value })} placeholder="BSc Marketing" />
                  </Field>
                  <Field label="School">
                    <input value={edu.school} onChange={e => patchEdu(edu.id, { school: e.target.value })} placeholder="UC Berkeley" />
                  </Field>
                  <Field label="Year">
                    <input value={edu.year} onChange={e => patchEdu(edu.id, { year: e.target.value })} placeholder="2018" />
                  </Field>
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={() => setF(s => ({ ...s, edus: [...s.edus, emptyEdu()] }))}
            className="mt-4 flex items-center gap-2 text-[13px] font-semibold text-fire hover:brightness-110 transition-colors"
          >
            <Plus size={15} strokeWidth={2} />
            Add qualification
          </button>
        </FormSection>

        {/* Skills */}
        <FormSection title="Skills">
          <p className="text-[12px] text-ink-3 mb-3 leading-relaxed">
            List 8–15 skills separated by commas — mix technical tools and transferable skills.
          </p>
          <Field label="">
            <textarea
              rows={3}
              value={skills}
              onChange={e => setF(s => ({ ...s, skills: e.target.value }))}
              placeholder="Paid Search, Google Analytics, SQL, A/B Testing, Team Leadership, Salesforce, Project Management, Excel, Budget Management"
            />
          </Field>
        </FormSection>

      </div>

      {/* ── Preview ─────────────────────────────────────────── */}
      <div className="lg:sticky lg:top-8">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2 text-[13px] font-semibold text-ink">
            <FileText size={14} strokeWidth={1.5} />
            Live Preview
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              disabled={!hasContent}
              className="flex items-center gap-1.5 text-[12px] text-ink-3 hover:text-ink transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <Printer size={12} strokeWidth={1.5} />
              PDF
            </button>
            <button
              onClick={copy}
              disabled={!hasContent}
              className="flex items-center gap-1.5 text-[12px] font-medium text-fire hover:brightness-110 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            >
              {copied ? <Check size={13} strokeWidth={1.5} /> : <Copy size={13} strokeWidth={1.5} />}
              {copied ? 'Copied!' : 'Copy text'}
            </button>
          </div>
        </div>

        <div className={`bg-surface border border-line rounded-xl p-5 overflow-auto max-h-[500px] lg:max-h-[80vh] transition-opacity duration-200 text-[13px] ${hasContent ? '' : 'opacity-40'}`}>
          {!hasContent ? (
            <p className="text-[13px] text-ink-3 italic">Fill in your details on the left and your resume will appear here.</p>
          ) : (
            <div className="space-y-4">
              {/* Header */}
              <div className="pb-3 border-b border-line">
                {c.name && (
                  <p className="text-[20px] font-bold text-ink tracking-tight leading-tight mb-1">{c.name}</p>
                )}
                {[c.email, c.phone, c.location, c.linkedin].some(Boolean) && (
                  <p className="text-[11px] text-ink-3 leading-relaxed">
                    {[c.email, c.phone, c.location, c.linkedin].filter(Boolean).join(' · ')}
                  </p>
                )}
              </div>

              {/* Summary */}
              {summary.trim() && (
                <PreviewSection title="Summary">
                  <p className="text-[12px] text-ink-2 leading-relaxed">{summary}</p>
                </PreviewSection>
              )}

              {/* Experience */}
              {exps.some(e => e.title || e.company) && (
                <PreviewSection title="Experience">
                  <div className="space-y-3">
                    {exps.filter(e => e.title || e.company).map(e => (
                      <div key={e.id}>
                        <div className="flex items-start justify-between gap-2 flex-wrap">
                          <div>
                            <span className="font-bold text-ink">{e.title || '—'}</span>
                            {e.company && <span className="text-ink-2"> · {e.company}</span>}
                            {e.location && <span className="text-ink-3 text-[11px]"> · {e.location}</span>}
                          </div>
                          {(e.startDate || e.endDate || e.isCurrent) && (
                            <span className="text-[11px] text-ink-3 shrink-0">
                              {[e.startDate, e.isCurrent ? 'Present' : e.endDate].filter(Boolean).join(' – ')}
                            </span>
                          )}
                        </div>
                        {e.bullets.some(b => b.trim()) && (
                          <ul className="mt-1 space-y-0.5">
                            {e.bullets.filter(b => b.trim()).map((b, i) => (
                              <li key={i} className="flex gap-2 text-[12px] text-ink-2">
                                <span className="text-ink-3 shrink-0">•</span>
                                <span>{b}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                </PreviewSection>
              )}

              {/* Education */}
              {edus.some(e => e.degree || e.school) && (
                <PreviewSection title="Education">
                  <div className="space-y-1.5">
                    {edus.filter(e => e.degree || e.school).map(e => (
                      <div key={e.id} className="flex items-baseline justify-between gap-2">
                        <div className="text-[12px]">
                          <span className="font-semibold text-ink">{e.degree || '—'}</span>
                          {e.school && <span className="text-ink-2"> · {e.school}</span>}
                        </div>
                        {e.year && <span className="text-[11px] text-ink-3 shrink-0">{e.year}</span>}
                      </div>
                    ))}
                  </div>
                </PreviewSection>
              )}

              {/* Skills */}
              {skills.trim() && (
                <PreviewSection title="Skills">
                  <p className="text-[12px] text-ink-2 leading-relaxed">{skills}</p>
                </PreviewSection>
              )}
            </div>
          )}
        </div>

        <p className="text-[11px] text-ink-3 mt-3 leading-relaxed">
          "Copy text" to paste into Google Docs or Word. "PDF" opens a clean, print-ready version.
        </p>
      </div>

    </div>
  );
}

function FormSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-[15px] font-bold text-ink mb-4 pb-2 border-b border-line">{title}</h2>
      {children}
    </div>
  );
}

function Field({
  label, required, className, children,
}: {
  label: string; required?: boolean; className?: string; children: React.ReactNode;
}) {
  return (
    <div className={className}>
      {label && (
        <label className="block text-[12px] font-medium text-ink-2 mb-1.5">
          {label}{required && <span className="text-fire ml-0.5">*</span>}
        </label>
      )}
      <div className="[&_input]:w-full [&_textarea]:w-full [&_input]:bg-bg [&_textarea]:bg-bg [&_input]:border [&_textarea]:border [&_input]:border-line [&_textarea]:border-line [&_input]:rounded-lg [&_textarea]:rounded-lg [&_input]:px-3 [&_textarea]:px-3 [&_input]:py-2.5 [&_textarea]:py-2.5 [&_input]:text-[13px] [&_textarea]:text-[13px] [&_input]:text-ink [&_textarea]:text-ink [&_input]:outline-none [&_textarea]:outline-none [&_input]:focus:border-fire [&_textarea]:focus:border-fire [&_textarea]:resize-none [&_input:disabled]:opacity-40 [&_input:disabled]:cursor-not-allowed">
        {children}
      </div>
    </div>
  );
}

function PreviewSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-ink-3 shrink-0">{title}</span>
        <div className="flex-1 h-px bg-line" />
      </div>
      {children}
    </div>
  );
}
