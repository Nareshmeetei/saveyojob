'use client';

import { useState } from 'react';
import { Printer, Plus, Trash2, FileText, Upload, FileDown, Sparkles, Loader2 } from 'lucide-react';

// ── Types ──────────────────────────────────────────────────────

interface Contact {
  name: string; email: string; phone: string;
  location: string; linkedin: string; photo: string;
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

type Layout = 'classic' | 'modern' | 'executive';

// ── Helpers ────────────────────────────────────────────────────

function uid() { return crypto.randomUUID(); }
function emptyExp(): Exp {
  return { id: uid(), title: '', company: '', location: '', startDate: '', endDate: '', isCurrent: false, bullets: ['', '', '', ''] };
}
function emptyEdu(): Edu {
  return { id: uid(), degree: '', school: '', year: '' };
}

const INIT: Fields = {
  contact: { name: '', email: '', phone: '', location: '', linkedin: '', photo: '' },
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

const SAMPLE: Fields = {
  contact: {
    name: 'Alex Johnson',
    email: 'alex@example.com',
    phone: '415-555-0182',
    location: 'San Francisco, CA',
    linkedin: 'linkedin.com/in/alexjohnson',
    photo: '',
  },
  summary: 'Results-driven Marketing Manager with 8+ years in B2B SaaS. Specialise in demand generation programs that consistently exceed pipeline targets. Known for turning data into decisions that reduce CAC and accelerate revenue growth.',
  exps: [
    {
      id: 'sx1',
      title: 'Senior Marketing Manager',
      company: 'Acme Corp',
      location: 'San Francisco, CA',
      startDate: 'Jan 2021',
      endDate: '',
      isCurrent: true,
      bullets: [
        'Grew organic traffic 3× in 12 months by redesigning content strategy',
        'Reduced CPA by 34% through A/B testing and landing page optimisation',
        'Led a cross-functional team of 5 to ship 3 major campaigns on time',
        'Managed $2M annual marketing budget with 18% year-over-year savings',
      ],
    },
    {
      id: 'sx2',
      title: 'Marketing Manager',
      company: 'StartupXYZ',
      location: 'New York, NY',
      startDate: 'Mar 2018',
      endDate: 'Dec 2020',
      isCurrent: false,
      bullets: [
        'Launched email nurture program that increased MQL conversion by 22%',
        'Built partnerships with 12 industry publications to expand brand reach',
        '',
        '',
      ],
    },
  ],
  edus: [{ id: 'se1', degree: 'BSc Marketing', school: 'UC Berkeley', year: '2018' }],
  skills: 'Paid Search, Google Analytics, SQL, A/B Testing, Team Leadership, Salesforce, HubSpot, Budget Management, Content Strategy',
};

const LI_SVG = `<svg width="14" height="14" viewBox="0 0 24 24" fill="#0A66C2" xmlns="http://www.w3.org/2000/svg"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>`;

// ── Plain text export ──────────────────────────────────────────

function toPlainText(f: Fields): string {
  const lines: string[] = [];
  const { contact: c, summary, exps, edus, skills } = f;
  if (c.name) lines.push(c.name.toUpperCase(), '');
  const contactLine = [c.email, c.phone, c.location].filter(Boolean).join(' | ');
  const linkedinLine = c.linkedin ? `LinkedIn: ${c.linkedin}` : '';
  const fullContactLine = [contactLine, linkedinLine].filter(Boolean).join(' | ');
  if (fullContactLine) lines.push(fullContactLine, '');
  if (summary.trim()) lines.push('SUMMARY', '─'.repeat(48), summary.trim(), '');
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
    for (const e of filledEdus) lines.push([e.degree, e.school, e.year].filter(Boolean).join(' | '));
    lines.push('');
  }
  if (skills.trim()) lines.push('SKILLS', '─'.repeat(48), skills.trim());
  return lines.join('\n').trim();
}

// ── HTML export (all 3 layouts) ───────────────────────────────

function toHTML(f: Fields, layout: Layout): string {
  const { contact: c, summary, exps, edus, skills } = f;
  const href = c.linkedin ? (c.linkedin.startsWith('http') ? c.linkedin : `https://${c.linkedin}`) : '';
  const liBadge = href
    ? `<a href="${href}" target="_blank" style="display:inline-flex;align-items:center;text-decoration:none;vertical-align:middle;margin-left:6px;" title="LinkedIn">${LI_SVG}</a>`
    : '';
  const filledExps = exps.filter(e => e.title || e.company);
  const filledEdus = edus.filter(e => e.degree || e.school);
  const skillList = skills.split(',').map(s => s.trim()).filter(Boolean);

  // ── Modern ────────────────────────────────────────────────
  if (layout === 'modern') {
    const expHTML = filledExps.map(e => {
      const meta = [e.company, e.location].filter(Boolean).join(', ');
      const dates = [e.startDate, e.isCurrent ? 'Present' : e.endDate].filter(Boolean).join(' – ');
      const bullets = e.bullets.filter(b => b.trim()).map(b => `<li style="margin-bottom:3px;color:#333;">${b}</li>`).join('');
      return `<div style="margin-bottom:12px;">
        <div style="display:flex;justify-content:space-between;align-items:baseline;gap:8px;margin-bottom:2px;">
          <div><strong style="color:#081E28;">${e.title || '—'}</strong>${meta ? ` <span style="color:#555;font-size:12px;">· ${meta}</span>` : ''}</div>
          ${dates ? `<span style="font-size:11px;color:#777;white-space:nowrap;">${dates}</span>` : ''}
        </div>
        ${bullets ? `<ul style="padding-left:16px;margin-top:4px;">${bullets}</ul>` : ''}
      </div>`;
    }).join('');
    const eduHTML = filledEdus.map(e => `<div style="margin-bottom:8px;">
      <strong style="font-size:11px;color:#0C526D;">${e.degree || '—'}</strong>
      ${e.school ? `<div style="font-size:10px;color:#4A7A8A;">${e.school}</div>` : ''}
      ${e.year ? `<div style="font-size:10px;color:#4A7A8A;">${e.year}</div>` : ''}
    </div>`).join('');
    const skillsHTML = skillList.map(s => `<div style="font-size:10px;color:#4A7A8A;margin-bottom:3px;">${s}</div>`).join('');
    return `<!DOCTYPE html>
<html lang="en"><head><meta charset="utf-8"><title>${c.name || 'Resume'}</title>
<style>
  *{box-sizing:border-box;margin:0;padding:0;}
  body{font-family:Arial,Helvetica,sans-serif;font-size:13px;color:#1a1a1a;display:flex;min-height:100vh;}
  .sb{width:200px;flex-shrink:0;background:#EBF3F7;padding:28px 18px;-webkit-print-color-adjust:exact;print-color-adjust:exact;}
  .sb-lbl{font-size:9px;font-weight:700;text-transform:uppercase;letter-spacing:.12em;color:#0C526D;border-bottom:1px solid #C5DDE4;padding-bottom:4px;margin-bottom:8px;}
  .sb-sec{margin-bottom:18px;}
  .main{flex:1;padding:28px 32px;}
  h1{font-size:24px;font-weight:700;color:#081E28;letter-spacing:-.5px;margin-bottom:8px;}
  .sec-lbl{font-size:9px;font-weight:700;text-transform:uppercase;letter-spacing:.12em;color:#4A7A8A;border-bottom:1px solid #C5DDE4;padding-bottom:4px;margin-bottom:10px;}
  .sec{margin-bottom:18px;}
  p{color:#333;line-height:1.5;}
  @media print{body{min-height:unset;}}
</style></head><body>
  <div class="sb">
    ${c.photo ? `<img src="${c.photo}" style="width:72px;height:72px;border-radius:50%;object-fit:cover;display:block;margin:0 auto 20px;" alt="Profile"/>` : ''}
    <div class="sb-sec"><div class="sb-lbl">Contact</div>
      ${c.email ? `<div style="font-size:11px;color:#4A7A8A;margin-bottom:4px;word-break:break-all;">${c.email}</div>` : ''}
      ${c.phone ? `<div style="font-size:11px;color:#4A7A8A;margin-bottom:4px;">${c.phone}</div>` : ''}
      ${c.location ? `<div style="font-size:11px;color:#4A7A8A;margin-bottom:4px;">${c.location}</div>` : ''}
      ${href ? `<div style="font-size:11px;margin-top:4px;"><a href="${href}" target="_blank" style="color:#0A66C2;text-decoration:none;display:inline-flex;align-items:center;gap:4px;">${LI_SVG} LinkedIn</a></div>` : ''}
    </div>
    ${skillsHTML ? `<div class="sb-sec"><div class="sb-lbl">Skills</div>${skillsHTML}</div>` : ''}
    ${eduHTML ? `<div class="sb-sec"><div class="sb-lbl">Education</div>${eduHTML}</div>` : ''}
  </div>
  <div class="main">
    ${c.name ? `<h1>${c.name}</h1>` : ''}
    ${summary ? `<div class="sec"><div class="sec-lbl">Summary</div><p style="font-size:12px;">${summary}</p></div>` : ''}
    ${filledExps.length ? `<div class="sec"><div class="sec-lbl">Experience</div>${expHTML}</div>` : ''}
  </div>
</body></html>`;
  }

  // ── Executive ─────────────────────────────────────────────
  if (layout === 'executive') {
    const ctLine = [c.email, c.phone, c.location].filter(Boolean).join(' &nbsp;·&nbsp; ');
    const expHTML = filledExps.map(e => {
      const meta = [e.company, e.location].filter(Boolean).join(', ');
      const dates = [e.startDate, e.isCurrent ? 'Present' : e.endDate].filter(Boolean).join(' – ');
      const bullets = e.bullets.filter(b => b.trim()).map(b => `<li style="margin-bottom:3px;color:#333;">${b}</li>`).join('');
      return `<div style="margin-bottom:14px;">
        <div style="display:flex;justify-content:space-between;align-items:baseline;gap:8px;margin-bottom:3px;">
          <div><strong style="color:#081E28;">${e.title || '—'}</strong>${meta ? ` <span style="color:#555;font-size:12px;">· ${meta}</span>` : ''}</div>
          ${dates ? `<span style="font-size:12px;color:#777;white-space:nowrap;">${dates}</span>` : ''}
        </div>
        ${bullets ? `<ul style="padding-left:18px;margin-top:4px;">${bullets}</ul>` : ''}
      </div>`;
    }).join('');
    const eduHTML = filledEdus.map(e => `
      <div style="display:flex;justify-content:space-between;align-items:baseline;margin-bottom:6px;">
        <span><strong>${e.degree || '—'}</strong>${e.school ? ` · ${e.school}` : ''}</span>
        ${e.year ? `<span style="font-size:12px;color:#777;">${e.year}</span>` : ''}
      </div>`).join('');
    const sec = (label: string, body: string) => `
      <div style="margin-bottom:22px;">
        <div style="display:flex;align-items:center;gap:10px;margin-bottom:10px;">
          <div style="width:3px;height:16px;background:#0C526D;border-radius:2px;flex-shrink:0;"></div>
          <span style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.12em;color:#081E28;">${label}</span>
          <div style="flex:1;height:1px;background:#C5DDE4;"></div>
        </div>${body}
      </div>`;
    return `<!DOCTYPE html>
<html lang="en"><head><meta charset="utf-8"><title>${c.name || 'Resume'}</title>
<style>
  *{box-sizing:border-box;margin:0;padding:0;}
  body{font-family:Arial,Helvetica,sans-serif;font-size:13px;color:#1a1a1a;}
  p{color:#333;line-height:1.5;}
  ul{padding-left:18px;}
  .hdr{-webkit-print-color-adjust:exact;print-color-adjust:exact;}
  @media print{.hdr{-webkit-print-color-adjust:exact;print-color-adjust:exact;}}
</style></head><body>
  <div class="hdr" style="background:#0C526D;color:white;padding:28px 40px;display:flex;justify-content:space-between;align-items:center;gap:20px;margin-bottom:30px;">
    <div style="flex:1;min-width:0;">
      ${c.name ? `<h1 style="font-size:28px;font-weight:700;color:white;letter-spacing:-.5px;margin-bottom:6px;">${c.name}</h1>` : ''}
      ${ctLine ? `<p style="font-size:12px;color:rgba(255,255,255,.75);margin:0;">${ctLine}${href ? ` &nbsp;<a href="${href}" target="_blank" style="color:rgba(255,255,255,.75);text-decoration:none;display:inline-flex;align-items:center;gap:4px;vertical-align:middle;"><svg width="12" height="12" viewBox="0 0 24 24" fill="rgba(255,255,255,.75)" xmlns="http://www.w3.org/2000/svg"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>LinkedIn</a>` : ''}</p>` : ''}
    </div>
    ${c.photo ? `<img src="${c.photo}" style="width:80px;height:80px;border-radius:50%;object-fit:cover;flex-shrink:0;border:2px solid rgba(255,255,255,.3);" alt="Profile"/>` : ''}
  </div>
  <div style="padding:0 40px 40px;">
    ${summary ? sec('Summary', `<p>${summary}</p>`) : ''}
    ${filledExps.length ? sec('Experience', expHTML) : ''}
    ${filledEdus.length ? sec('Education', eduHTML) : ''}
    ${skills ? sec('Skills', `<p>${skills}</p>`) : ''}
  </div>
</body></html>`;
  }

  // ── Classic (default) ─────────────────────────────────────
  const ctLine = [c.email, c.phone, c.location].filter(Boolean).join(' &nbsp;·&nbsp; ');
  const expHTML = filledExps.map(e => {
    const meta = [e.company, e.location].filter(Boolean).join(', ');
    const dates = [e.startDate, e.isCurrent ? 'Present' : e.endDate].filter(Boolean).join(' – ');
    const bullets = e.bullets.filter(b => b.trim()).map(b => `<li>${b}</li>`).join('');
    return `<div class="job">
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
<html lang="en"><head><meta charset="utf-8"><title>${c.name || 'Resume'}</title>
<style>
  *{box-sizing:border-box;margin:0;padding:0;}
  body{font-family:Arial,Helvetica,sans-serif;font-size:13px;color:#1a1a1a;max-width:760px;margin:40px auto;padding:0 40px;line-height:1.5;}
  .hdr{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:4px;}
  .hdr-left{flex:1;min-width:0;}
  .hdr-photo{width:80px;height:80px;border-radius:50%;object-fit:cover;flex-shrink:0;margin-left:24px;}
  h1{font-size:26px;font-weight:700;letter-spacing:-.5px;margin-bottom:4px;}
  .contact{font-size:12px;color:#555;margin-bottom:24px;}
  .sec{margin-bottom:18px;}
  .sec-lbl{font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.12em;color:#777;border-bottom:1px solid #d0d0d0;padding-bottom:4px;margin-bottom:12px;}
  p{color:#333;}
  .job{margin-bottom:12px;}
  .job-top{display:flex;justify-content:space-between;align-items:baseline;gap:8px;margin-bottom:4px;}
  .meta{color:#555;}
  .dates{font-size:12px;color:#777;white-space:nowrap;}
  ul{padding-left:18px;margin-top:4px;}
  li{margin-bottom:2px;color:#333;}
  .edu-row{display:flex;justify-content:space-between;align-items:baseline;margin-bottom:4px;}
  @media print{body{margin:20px auto;padding:0 30px;}}
</style></head><body>
  <div class="hdr">
    <div class="hdr-left">
      ${c.name ? `<h1>${c.name}</h1>` : ''}
      ${(ctLine || liBadge) ? `<p class="contact">${ctLine}${liBadge}</p>` : ''}
    </div>
    ${c.photo ? `<img src="${c.photo}" class="hdr-photo" alt="Profile"/>` : ''}
  </div>
  ${summary ? `<div class="sec"><div class="sec-lbl">Summary</div><p>${summary}</p></div>` : ''}
  ${filledExps.length ? `<div class="sec"><div class="sec-lbl">Experience</div>${expHTML}</div>` : ''}
  ${filledEdus.length ? `<div class="sec"><div class="sec-lbl">Education</div>${eduHTML}</div>` : ''}
  ${skills ? `<div class="sec"><div class="sec-lbl">Skills</div><p>${skills}</p></div>` : ''}
</body></html>`;
}

// ── Main component ─────────────────────────────────────────────

export default function ResumeBuilderClient() {
  const [f, setF] = useState<Fields>(INIT);
  const [layout, setLayout] = useState<Layout>('classic');
  const [aiFeedback, setAiFeedback]   = useState<string | null>(null);
  const [aiLoading,  setAiLoading]    = useState(false);
  const [aiError,    setAiError]      = useState<string | null>(null);

  async function handleAIReview() {
    const resumeText = toPlainText(f);
    if (!resumeText.trim()) return;
    setAiLoading(true);
    setAiFeedback(null);
    setAiError(null);
    try {
      const res = await fetch('/api/career-chat', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [{ role: 'user', content: 'Please review my resume and give me specific feedback.' }],
          context:  { resumeText },
        }),
      });
      const data = await res.json() as { reply?: string; error?: string };
      if (!res.ok || data.error) {
        setAiError(data.error ?? 'Something went wrong. Please try again.');
      } else {
        setAiFeedback(data.reply ?? null);
      }
    } catch {
      setAiError('Connection error. Please try again.');
    } finally {
      setAiLoading(false);
    }
  }

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
  function handlePhotoUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const result = ev.target?.result;
      if (typeof result === 'string') setC('photo', result);
    };
    reader.readAsDataURL(file);
  }
  function handleDownloadPDF() {
    const iframe = document.createElement('iframe');
    iframe.style.cssText = 'position:fixed;right:0;bottom:0;width:0;height:0;border:0;visibility:hidden;';
    document.body.appendChild(iframe);
    const doc = iframe.contentWindow?.document;
    if (!doc) { document.body.removeChild(iframe); return; }
    doc.open(); doc.write(toHTML(f, layout)); doc.close();
    setTimeout(() => {
      iframe.contentWindow?.focus();
      iframe.contentWindow?.print();
      setTimeout(() => document.body.removeChild(iframe), 500);
    }, 300);
  }
  function handleDownloadWord() {
    const blob = new Blob([toHTML(f, layout)], { type: 'application/msword' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${f.contact.name ? f.contact.name.replace(/\s+/g, '-').toLowerCase() : 'resume'}.doc`;
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  const { contact: c, summary, exps, edus, skills } = f;
  const hasContent = !!(c.name || summary || exps.some(e => e.title) || skills);

  return (
    <div className="grid lg:grid-cols-[1fr_400px] gap-10 items-start">

      {/* ── Form ─────────────────────────────────────────── */}
      <div className="space-y-8">

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
            <div className="sm:col-span-2">
              <p className="text-[12px] font-medium text-ink-2 mb-1.5">
                Professional photo <span className="text-ink-3 font-normal">(optional)</span>
              </p>
              <div className="flex items-center gap-3">
                {c.photo ? (
                  <>
                    <img src={c.photo} alt="Preview" className="w-11 h-11 rounded-full object-cover border border-line" />
                    <button type="button" onClick={() => setC('photo', '')} className="text-[12px] text-ink-3 hover:text-accent transition-colors">
                      Remove
                    </button>
                  </>
                ) : (
                  <label className="cursor-pointer flex items-center gap-2 text-[13px] font-semibold text-fire hover:brightness-110 transition-colors">
                    <Upload size={14} strokeWidth={1.5} />
                    Upload photo
                    <input type="file" accept="image/*" className="sr-only" onChange={handlePhotoUpload} />
                  </label>
                )}
              </div>
            </div>
          </div>
        </FormSection>

        <FormSection title="Professional Summary">
          <p className="text-[12px] text-ink-3 mb-3 leading-relaxed">
            2–4 sentences: who you are, years of experience, your top strength, and what you bring.
          </p>
          <Field label="">
            <textarea rows={4} value={summary}
              onChange={e => setF(s => ({ ...s, summary: e.target.value }))}
              placeholder="Results-driven Marketing Manager with 8+ years in B2B SaaS. Specialise in demand generation programs that consistently exceed pipeline targets. Known for turning data into decisions that reduce CAC and accelerate revenue growth."
            />
          </Field>
        </FormSection>

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
                    <button onClick={() => setF(s => ({ ...s, exps: s.exps.filter(e => e.id !== exp.id) }))} className="text-ink-3 hover:text-accent transition-colors">
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
                    <input value={exp.isCurrent ? '' : exp.endDate} onChange={e => patchExp(exp.id, { endDate: e.target.value })} disabled={exp.isCurrent} placeholder="Dec 2023" />
                  </Field>
                  <label className="flex items-center gap-2 cursor-pointer sm:col-span-2 -mt-1">
                    <input type="checkbox" checked={exp.isCurrent} onChange={e => patchExp(exp.id, { isCurrent: e.target.checked })} className="accent-fire w-4 h-4" />
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
                      <input value={b} onChange={e => setBullet(exp.id, i, e.target.value)} placeholder={BULLET_HINTS[i]} />
                    </Field>
                  ))}
                </div>
              </div>
            ))}
          </div>
          {exps.length < 6 && (
            <button onClick={() => setF(s => ({ ...s, exps: [...s.exps, emptyExp()] }))} className="mt-4 flex items-center gap-2 text-[13px] font-semibold text-fire hover:brightness-110 transition-colors">
              <Plus size={15} strokeWidth={2} /> Add another job
            </button>
          )}
        </FormSection>

        <FormSection title="Education">
          <div className="space-y-4">
            {edus.map((edu, idx) => (
              <div key={edu.id} className="bg-surface border border-line rounded-xl p-5">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] font-bold text-ink-3 uppercase tracking-[0.1em]">Qualification {idx + 1}</span>
                  {edus.length > 1 && (
                    <button onClick={() => setF(s => ({ ...s, edus: s.edus.filter(e => e.id !== edu.id) }))} className="text-ink-3 hover:text-accent transition-colors">
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
          <button onClick={() => setF(s => ({ ...s, edus: [...s.edus, emptyEdu()] }))} className="mt-4 flex items-center gap-2 text-[13px] font-semibold text-fire hover:brightness-110 transition-colors">
            <Plus size={15} strokeWidth={2} /> Add qualification
          </button>
        </FormSection>

        <FormSection title="Skills">
          <p className="text-[12px] text-ink-3 mb-3 leading-relaxed">
            List 8–15 skills separated by commas — mix technical tools and transferable skills.
          </p>
          <Field label="">
            <textarea rows={3} value={skills}
              onChange={e => setF(s => ({ ...s, skills: e.target.value }))}
              placeholder="Paid Search, Google Analytics, SQL, A/B Testing, Team Leadership, Salesforce, Project Management, Excel, Budget Management"
            />
          </Field>
        </FormSection>

      </div>

      {/* ── Preview ──────────────────────────────────────── */}
      <div className="lg:sticky lg:top-8">

        {/* Header row */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2 text-[13px] font-semibold text-ink">
            <FileText size={14} strokeWidth={1.5} />
            Live Preview
          </div>
          <div className="flex items-center gap-3">
            <button onClick={handleDownloadPDF} disabled={!hasContent} className="flex items-center gap-1.5 text-[12px] text-ink-3 hover:text-ink transition-colors disabled:opacity-30 disabled:cursor-not-allowed">
              <Printer size={12} strokeWidth={1.5} /> PDF
            </button>
            <button onClick={handleDownloadWord} disabled={!hasContent} className="flex items-center gap-1.5 text-[12px] text-ink-3 hover:text-ink transition-colors disabled:opacity-30 disabled:cursor-not-allowed">
              <FileDown size={12} strokeWidth={1.5} /> Word
            </button>
          </div>
        </div>

        {/* Layout picker */}
        <LayoutPicker value={layout} onChange={setLayout} />

        {/* Preview card */}
        <div className="bg-surface border border-line rounded-xl overflow-hidden">
          {!hasContent && (
            <div className="flex items-center gap-2 px-4 py-2 bg-fire/[0.05] border-b border-line">
              <span className="w-1.5 h-1.5 rounded-full bg-fire/50 shrink-0" />
              <span className="text-[11px] text-ink-3">Sample preview — fill in your details on the left</span>
            </div>
          )}
          <div className="overflow-auto max-h-[500px] lg:max-h-[78vh]">
            {layout === 'classic' ? (
              <ClassicPreview f={hasContent ? f : SAMPLE} />
            ) : layout === 'modern' ? (
              <ModernPreview f={hasContent ? f : SAMPLE} />
            ) : (
              <ExecutivePreview f={hasContent ? f : SAMPLE} />
            )}
          </div>
        </div>

        <p className="text-[11px] text-ink-3 mt-3 leading-relaxed">
          "PDF" opens the print dialog — choose "Save as PDF". "Word" downloads a .doc file for Word or Google Docs.
        </p>

        {/* AI Review */}
        {hasContent && (
          <div className="mt-5">
            <button
              onClick={handleAIReview}
              disabled={aiLoading}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-fire/[0.07] border border-fire/30 text-fire text-[13px] font-semibold rounded-xl hover:bg-fire/[0.12] transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {aiLoading
                ? <><Loader2 size={14} strokeWidth={1.5} className="animate-spin" /> Reviewing your resume...</>
                : <><Sparkles size={14} strokeWidth={1.5} /> Get AI feedback on this resume</>
              }
            </button>

            {aiError && (
              <p className="mt-3 text-[12px] text-accent leading-relaxed">{aiError}</p>
            )}

            {aiFeedback && (
              <div className="mt-4 p-4 bg-bg border border-line rounded-xl">
                <div className="flex items-center gap-2 mb-3 pb-2 border-b border-line">
                  <Sparkles size={12} strokeWidth={1.5} className="text-fire shrink-0" />
                  <span className="text-[11px] font-bold uppercase tracking-[0.1em] text-ink-3">AI Feedback</span>
                </div>
                <p className="text-[13px] text-ink leading-relaxed" style={{ whiteSpace: 'pre-wrap' }}>
                  {aiFeedback}
                </p>
                <button
                  onClick={() => setAiFeedback(null)}
                  className="mt-3 text-[11px] text-ink-3 hover:text-ink transition-colors"
                >
                  Dismiss
                </button>
              </div>
            )}
          </div>
        )}
      </div>

    </div>
  );
}

// ── Form sub-components ────────────────────────────────────────

function FormSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-[15px] font-bold text-ink mb-4 pb-2 border-b border-line">{title}</h2>
      {children}
    </div>
  );
}

function Field({ label, required, className, children }: { label: string; required?: boolean; className?: string; children: React.ReactNode }) {
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

// ── Layout picker ──────────────────────────────────────────────

const LAYOUT_OPTIONS: { id: Layout; label: string; desc: string; icon: React.ReactNode }[] = [
  {
    id: 'classic',
    label: 'Classic',
    desc: 'Single column',
    icon: (
      <svg width="52" height="38" viewBox="0 0 52 38" fill="none">
        <rect x="4" y="4" width="16" height="3" rx="1" fill="currentColor" opacity="0.8"/>
        <rect x="4" y="10" width="32" height="1.5" rx="0.75" fill="currentColor" opacity="0.4"/>
        <rect x="4" y="15" width="44" height="0.75" rx="0.375" fill="currentColor" opacity="0.25"/>
        <rect x="4" y="19" width="24" height="1.5" rx="0.75" fill="currentColor" opacity="0.4"/>
        <rect x="4" y="23" width="36" height="1.5" rx="0.75" fill="currentColor" opacity="0.4"/>
        <rect x="4" y="28" width="44" height="0.75" rx="0.375" fill="currentColor" opacity="0.25"/>
        <rect x="4" y="32" width="20" height="1.5" rx="0.75" fill="currentColor" opacity="0.4"/>
        <rect x="4" y="35" width="30" height="1.5" rx="0.75" fill="currentColor" opacity="0.4"/>
      </svg>
    ),
  },
  {
    id: 'modern',
    label: 'Modern',
    desc: 'Sidebar + main',
    icon: (
      <svg width="52" height="38" viewBox="0 0 52 38" fill="none">
        <rect x="0" y="0" width="15" height="38" fill="currentColor" opacity="0.1"/>
        <rect x="2" y="5" width="11" height="2" rx="1" fill="currentColor" opacity="0.5"/>
        <rect x="2" y="10" width="10" height="1.5" rx="0.75" fill="currentColor" opacity="0.3"/>
        <rect x="2" y="13" width="9" height="1.5" rx="0.75" fill="currentColor" opacity="0.3"/>
        <rect x="2" y="16" width="10" height="1.5" rx="0.75" fill="currentColor" opacity="0.3"/>
        <rect x="2" y="22" width="11" height="1.5" rx="0.75" fill="currentColor" opacity="0.5"/>
        <rect x="2" y="25" width="9" height="1.5" rx="0.75" fill="currentColor" opacity="0.3"/>
        <rect x="2" y="28" width="10" height="1.5" rx="0.75" fill="currentColor" opacity="0.3"/>
        <rect x="19" y="4" width="18" height="3" rx="1" fill="currentColor" opacity="0.8"/>
        <rect x="19" y="10" width="30" height="1.5" rx="0.75" fill="currentColor" opacity="0.35"/>
        <rect x="19" y="14" width="26" height="1.5" rx="0.75" fill="currentColor" opacity="0.35"/>
        <rect x="19" y="20" width="22" height="2" rx="1" fill="currentColor" opacity="0.5"/>
        <rect x="19" y="24" width="30" height="1.5" rx="0.75" fill="currentColor" opacity="0.3"/>
        <rect x="19" y="28" width="24" height="1.5" rx="0.75" fill="currentColor" opacity="0.3"/>
        <rect x="19" y="32" width="28" height="1.5" rx="0.75" fill="currentColor" opacity="0.3"/>
      </svg>
    ),
  },
  {
    id: 'executive',
    label: 'Executive',
    desc: 'Bold header',
    icon: (
      <svg width="52" height="38" viewBox="0 0 52 38" fill="none">
        <rect x="0" y="0" width="52" height="13" fill="currentColor" opacity="0.6"/>
        <rect x="4" y="3" width="18" height="3" rx="1" fill="white" opacity="0.9"/>
        <rect x="4" y="8" width="28" height="1.5" rx="0.75" fill="white" opacity="0.5"/>
        <rect x="4" y="17" width="2" height="5" rx="1" fill="currentColor" opacity="0.7"/>
        <rect x="8" y="18" width="16" height="1.5" rx="0.75" fill="currentColor" opacity="0.4"/>
        <rect x="8" y="21" width="30" height="1.5" rx="0.75" fill="currentColor" opacity="0.3"/>
        <rect x="4" y="28" width="2" height="5" rx="1" fill="currentColor" opacity="0.7"/>
        <rect x="8" y="29" width="20" height="1.5" rx="0.75" fill="currentColor" opacity="0.4"/>
        <rect x="8" y="32" width="34" height="1.5" rx="0.75" fill="currentColor" opacity="0.3"/>
      </svg>
    ),
  },
];

function LayoutPicker({ value, onChange }: { value: Layout; onChange: (l: Layout) => void }) {
  return (
    <div className="flex gap-2 mb-3">
      {LAYOUT_OPTIONS.map(opt => {
        const active = opt.id === value;
        return (
          <button
            key={opt.id}
            onClick={() => onChange(opt.id)}
            className={[
              'flex-1 flex flex-col items-center gap-1.5 py-2.5 px-1 rounded-lg border transition-colors duration-150',
              active ? 'border-fire bg-fire/[0.06]' : 'border-line bg-surface-2 hover:border-line-2',
            ].join(' ')}
          >
            <span className={active ? 'text-fire' : 'text-ink-3'}>{opt.icon}</span>
            <span className={`text-[11px] font-bold leading-none ${active ? 'text-fire' : 'text-ink-2'}`}>{opt.label}</span>
            <span className={`text-[10px] leading-none ${active ? 'text-fire/70' : 'text-ink-3'}`}>{opt.desc}</span>
          </button>
        );
      })}
    </div>
  );
}

// ── Preview components ─────────────────────────────────────────

function ClassicPreview({ f }: { f: Fields }) {
  const { contact: c, summary, exps, edus, skills } = f;
  return (
    <div className="p-5 space-y-4 text-[13px]">
      <div className="pb-3 border-b border-line flex items-start gap-3">
        <div className="flex-1 min-w-0">
          {c.name && <p className="text-[20px] font-bold text-ink tracking-tight leading-tight mb-1">{c.name}</p>}
          {[c.email, c.phone, c.location, c.linkedin].some(Boolean) && (
            <div className="flex items-center gap-2 flex-wrap mt-0.5">
              {[c.email, c.phone, c.location].filter(Boolean).length > 0 && (
                <span className="text-[11px] text-ink-3 leading-relaxed">
                  {[c.email, c.phone, c.location].filter(Boolean).join(' · ')}
                </span>
              )}
              {c.linkedin && (
                <a href={c.linkedin.startsWith('http') ? c.linkedin : `https://${c.linkedin}`} target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition-opacity" title={c.linkedin}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="#0A66C2" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              )}
            </div>
          )}
        </div>
        {c.photo && <img src={c.photo} alt="Profile" className="w-14 h-14 rounded-full object-cover shrink-0 border border-line" />}
      </div>
      {summary.trim() && (
        <PreviewSection title="Summary">
          <p className="text-[12px] text-ink-2 leading-relaxed">{summary}</p>
        </PreviewSection>
      )}
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
                        <span className="text-ink-3 shrink-0">•</span><span>{b}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </PreviewSection>
      )}
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
      {skills.trim() && (
        <PreviewSection title="Skills">
          <p className="text-[12px] text-ink-2 leading-relaxed">{skills}</p>
        </PreviewSection>
      )}
    </div>
  );
}

function ModernPreview({ f }: { f: Fields }) {
  const { contact: c, summary, exps, edus, skills } = f;
  const filledExps = exps.filter(e => e.title || e.company);
  const filledEdus = edus.filter(e => e.degree || e.school);
  const skillList = skills.split(',').map(s => s.trim()).filter(Boolean);

  return (
    <div className="flex min-h-[200px]">
      {/* Sidebar */}
      <div className="w-[108px] shrink-0 bg-fire/[0.07] p-3 space-y-3">
        {c.photo && (
          <img src={c.photo} alt="Profile" className="w-12 h-12 rounded-full object-cover mx-auto border border-fire/20" />
        )}
        {[c.email, c.phone, c.location, c.linkedin].some(Boolean) && (
          <div>
            <p className="text-[8px] font-bold uppercase tracking-[0.1em] text-fire mb-1">Contact</p>
            {c.email && <p className="text-[9px] text-ink-3 break-all leading-relaxed mb-0.5">{c.email}</p>}
            {c.phone && <p className="text-[9px] text-ink-3 mb-0.5">{c.phone}</p>}
            {c.location && <p className="text-[9px] text-ink-3 mb-0.5">{c.location}</p>}
            {c.linkedin && <p className="text-[9px] text-fire break-all leading-relaxed">{c.linkedin}</p>}
          </div>
        )}
        {skillList.length > 0 && (
          <div>
            <p className="text-[8px] font-bold uppercase tracking-[0.1em] text-fire mb-1">Skills</p>
            {skillList.slice(0, 10).map((s, i) => <p key={i} className="text-[9px] text-ink-3 mb-0.5">{s}</p>)}
          </div>
        )}
        {filledEdus.length > 0 && (
          <div>
            <p className="text-[8px] font-bold uppercase tracking-[0.1em] text-fire mb-1">Education</p>
            {filledEdus.map(e => (
              <div key={e.id} className="mb-1.5">
                <p className="text-[9px] font-semibold text-ink leading-tight">{e.degree || '—'}</p>
                {e.school && <p className="text-[9px] text-ink-3">{e.school}</p>}
                {e.year && <p className="text-[9px] text-ink-3">{e.year}</p>}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Main */}
      <div className="flex-1 p-4 space-y-3 min-w-0">
        {c.name && (
          <div className="pb-2 border-b border-line">
            <p className="text-[15px] font-bold text-ink tracking-tight leading-tight">{c.name}</p>
          </div>
        )}
        {summary.trim() && (
          <div>
            <p className="text-[8px] font-bold uppercase tracking-[0.1em] text-ink-3 mb-1">Summary</p>
            <p className="text-[10px] text-ink-2 leading-relaxed">{summary}</p>
          </div>
        )}
        {filledExps.length > 0 && (
          <div>
            <p className="text-[8px] font-bold uppercase tracking-[0.1em] text-ink-3 mb-1.5">Experience</p>
            <div className="space-y-2">
              {filledExps.map(e => (
                <div key={e.id}>
                  <div className="flex items-start justify-between gap-1 flex-wrap">
                    <div>
                      <span className="font-bold text-ink text-[10px]">{e.title || '—'}</span>
                      {e.company && <span className="text-ink-2 text-[10px]"> · {e.company}</span>}
                    </div>
                    {(e.startDate || e.endDate || e.isCurrent) && (
                      <span className="text-[9px] text-ink-3 shrink-0">
                        {[e.startDate, e.isCurrent ? 'Present' : e.endDate].filter(Boolean).join(' – ')}
                      </span>
                    )}
                  </div>
                  {e.bullets.some(b => b.trim()) && (
                    <ul className="mt-0.5 space-y-0.5">
                      {e.bullets.filter(b => b.trim()).map((b, i) => (
                        <li key={i} className="flex gap-1 text-[9px] text-ink-2">
                          <span className="text-ink-3 shrink-0">•</span><span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function ExecutivePreview({ f }: { f: Fields }) {
  const { contact: c, summary, exps, edus, skills } = f;
  const filledExps = exps.filter(e => e.title || e.company);
  const filledEdus = edus.filter(e => e.degree || e.school);

  return (
    <div>
      {/* Header band */}
      <div className="bg-fire px-4 py-3.5 flex items-center justify-between gap-3">
        <div className="flex-1 min-w-0">
          {c.name && <p className="text-[17px] font-bold text-white tracking-tight leading-tight mb-0.5">{c.name}</p>}
          {[c.email, c.phone, c.location].some(Boolean) && (
            <p className="text-[10px] text-white/70 leading-relaxed">
              {[c.email, c.phone, c.location].filter(Boolean).join(' · ')}
            </p>
          )}
          {c.linkedin && (
            <p className="text-[10px] text-white/60 mt-0.5">{c.linkedin}</p>
          )}
        </div>
        {c.photo && <img src={c.photo} alt="Profile" className="w-12 h-12 rounded-full object-cover shrink-0 border-2 border-white/30" />}
      </div>

      {/* Content */}
      <div className="px-4 py-4 space-y-3">
        {summary.trim() && <ExecSection title="Summary"><p className="text-[11px] text-ink-2 leading-relaxed">{summary}</p></ExecSection>}
        {filledExps.length > 0 && (
          <ExecSection title="Experience">
            <div className="space-y-2.5">
              {filledExps.map(e => (
                <div key={e.id}>
                  <div className="flex items-start justify-between gap-2 flex-wrap">
                    <div>
                      <span className="font-bold text-ink text-[11px]">{e.title || '—'}</span>
                      {e.company && <span className="text-ink-2 text-[11px]"> · {e.company}</span>}
                      {e.location && <span className="text-ink-3 text-[10px]"> · {e.location}</span>}
                    </div>
                    {(e.startDate || e.endDate || e.isCurrent) && (
                      <span className="text-[10px] text-ink-3 shrink-0">
                        {[e.startDate, e.isCurrent ? 'Present' : e.endDate].filter(Boolean).join(' – ')}
                      </span>
                    )}
                  </div>
                  {e.bullets.some(b => b.trim()) && (
                    <ul className="mt-1 space-y-0.5">
                      {e.bullets.filter(b => b.trim()).map((b, i) => (
                        <li key={i} className="flex gap-1.5 text-[10px] text-ink-2">
                          <span className="text-fire shrink-0">•</span><span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </ExecSection>
        )}
        {filledEdus.length > 0 && (
          <ExecSection title="Education">
            <div className="space-y-1">
              {filledEdus.map(e => (
                <div key={e.id} className="flex items-baseline justify-between gap-2">
                  <div className="text-[11px]">
                    <span className="font-semibold text-ink">{e.degree || '—'}</span>
                    {e.school && <span className="text-ink-2"> · {e.school}</span>}
                  </div>
                  {e.year && <span className="text-[10px] text-ink-3 shrink-0">{e.year}</span>}
                </div>
              ))}
            </div>
          </ExecSection>
        )}
        {skills.trim() && (
          <ExecSection title="Skills">
            <p className="text-[11px] text-ink-2 leading-relaxed">{skills}</p>
          </ExecSection>
        )}
      </div>
    </div>
  );
}

// ── Section helpers ────────────────────────────────────────────

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

function ExecSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-1.5">
        <div className="w-0.5 h-3.5 bg-fire rounded-full shrink-0" />
        <span className="text-[9px] font-bold uppercase tracking-[0.12em] text-ink">{title}</span>
        <div className="flex-1 h-px bg-line" />
      </div>
      {children}
    </div>
  );
}
