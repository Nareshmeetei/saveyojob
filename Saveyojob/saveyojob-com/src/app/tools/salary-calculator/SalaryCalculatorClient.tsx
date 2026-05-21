'use client';
import { useState, useRef, useEffect } from 'react';
import { SEED_OCCUPATIONS } from '../../../../data/seed-data';
import {
  TrendingUp, TrendingDown, Minus,
  ChevronDown, Zap, BookOpen, Search, X,
} from 'lucide-react';

type Occupation = typeof SEED_OCCUPATIONS[number];

const EXP_LEVELS = [
  { id: 'entry', label: 'Entry Level', sub: '0–2 yrs', mult: 0.75 },
  { id: 'mid',   label: 'Mid Level',   sub: '3–7 yrs', mult: 1.00 },
  { id: 'senior',label: 'Senior',      sub: '8–12 yrs',mult: 1.35 },
  { id: 'lead',  label: 'Lead / Mgr',  sub: '13+ yrs', mult: 1.62 },
] as const;
type ExpId = typeof EXP_LEVELS[number]['id'];

const LOCATIONS = [
  { id: 'national', label: 'National Average',         mult: 1.00 },
  { id: 'sf',       label: 'San Francisco / Bay Area', mult: 1.45 },
  { id: 'nyc',      label: 'New York City',            mult: 1.30 },
  { id: 'seattle',  label: 'Seattle',                  mult: 1.28 },
  { id: 'dc',       label: 'Washington, DC',           mult: 1.22 },
  { id: 'boston',   label: 'Boston',                   mult: 1.18 },
  { id: 'la',       label: 'Los Angeles',              mult: 1.15 },
  { id: 'chicago',  label: 'Chicago',                  mult: 1.10 },
  { id: 'austin',   label: 'Austin',                   mult: 1.07 },
  { id: 'denver',   label: 'Denver',                   mult: 1.05 },
] as const;
type LocId = typeof LOCATIONS[number]['id'];

// AI premium multipliers by slug — based on LinkedIn Economic Graph 2023 data
// showing AI-proficient workers earn 13–22% above the median in each field
const AI_PREMIUM: Record<string, number> = {
  'software-developer':           1.20,
  'financial-analyst':            1.20,
  'graphic-designer':             1.18,
  'accountant':                   1.16,
  'market-research-analyst':      1.16,
  'inside-sales-representative':  1.16,
  'paralegal':                    1.15,
  'claims-adjuster':              1.15,
  'customer-service-representative': 1.15,
  'hr-specialist':                1.15,
  'data-entry-clerk':             1.15,
  'administrative-assistant':     1.14,
  'bookkeeper':                   1.14,
  'billing-and-posting-clerk':    1.13,
  'legal-secretary':              1.14,
  'telemarketer':                 1.14,
  'general-office-clerk':         1.13,
  'bank-teller':                  1.13,
  'order-clerk':                  1.13,
  'cashier':                      1.12,
};

function fmtSalary(n: number): string {
  const rounded = Math.round(n / 500) * 500;
  return '$' + rounded.toLocaleString();
}

function getRiskColor(prob: number): string {
  if (prob >= 0.80) return 'text-critical';
  if (prob >= 0.55) return 'text-warn';
  return 'text-safe';
}

function getRiskLabel(prob: number): string {
  if (prob >= 0.80) return 'Very High';
  if (prob >= 0.55) return 'High';
  if (prob >= 0.30) return 'Moderate';
  return 'Low';
}

export default function SalaryCalculatorClient() {
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const [expId, setExpId] = useState<ExpId>('mid');
  const [locId, setLocId] = useState<LocId>('national');
  const [query, setQuery] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const filtered = SEED_OCCUPATIONS.filter(o =>
    o.title.toLowerCase().includes(query.toLowerCase())
  );

  const occupation = selectedSlug
    ? SEED_OCCUPATIONS.find(o => o.slug === selectedSlug) ?? null
    : null;

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  function selectOccupation(o: Occupation) {
    setSelectedSlug(o.slug);
    setQuery(o.title);
    setDropdownOpen(false);
    inputRef.current?.blur();
  }

  function clearSelection() {
    setSelectedSlug(null);
    setQuery('');
    setDropdownOpen(false);
    setTimeout(() => inputRef.current?.focus(), 0);
  }

  const expLevel = EXP_LEVELS.find(e => e.id === expId)!;
  const location = LOCATIONS.find(l => l.id === locId)!;

  const medianBase = occupation ? occupation.median_annual_wage : 0;
  const baseSalary = medianBase * expLevel.mult * location.mult;
  const aiPremiumMult = occupation ? (AI_PREMIUM[occupation.slug] ?? 1.14) : 1;
  const aiSalary = baseSalary * aiPremiumMult;
  const aiLift = aiSalary - baseSalary;
  const aiPct = Math.round((aiPremiumMult - 1) * 100);

  const rangeOffset = 0.09;
  const baseLow  = baseSalary * (1 - rangeOffset);
  const baseHigh = baseSalary * (1 + rangeOffset);
  const aiLow    = aiSalary  * (1 - rangeOffset);
  const aiHigh   = aiSalary  * (1 + rangeOffset);

  const topCourses = occupation ? occupation.affiliate_courses.slice(0, 3) : [];

  const growth = occupation?.ten_year_growth_pct ?? 0;

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="grid sm:grid-cols-[1fr_auto_auto] gap-4 items-end">
        {/* Role search */}
        <div ref={containerRef} className="relative">
          <label className="block text-[12px] font-medium text-ink-2 mb-1.5">Job title</label>
          <div className="relative">
            <Search size={14} strokeWidth={1.5} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-3 pointer-events-none" />
            <input
              ref={inputRef}
              type="text"
              placeholder="Search your job title…"
              value={query}
              onChange={e => { setQuery(e.target.value); setDropdownOpen(true); setSelectedSlug(null); }}
              onFocus={() => setDropdownOpen(true)}
              className="w-full bg-surface border border-line rounded-xl pl-9 pr-9 py-3 text-[14px] text-ink outline-none focus:border-fire"
            />
            {query && (
              <button onClick={clearSelection} className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-3 hover:text-ink">
                <X size={14} strokeWidth={1.5} />
              </button>
            )}
          </div>
          {dropdownOpen && (
            <div className="absolute top-full left-0 right-0 z-20 mt-1 bg-surface border border-line rounded-xl overflow-hidden">
              {filtered.length === 0 ? (
                <p className="px-4 py-3 text-[13px] text-ink-3">No roles found</p>
              ) : (
                <ul className="max-h-[240px] overflow-y-auto">
                  {filtered.map(o => (
                    <li key={o.slug}>
                      <button
                        onMouseDown={e => { e.preventDefault(); selectOccupation(o); }}
                        className={`w-full text-left px-4 py-2.5 text-[13px] hover:bg-bg transition-colors ${
                          o.slug === selectedSlug ? 'text-fire font-medium' : 'text-ink'
                        }`}
                      >
                        {o.title}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>

        {/* Location */}
        <div>
          <label className="block text-[12px] font-medium text-ink-2 mb-1.5">Location</label>
          <div className="relative">
            <select
              value={locId}
              onChange={e => setLocId(e.target.value as LocId)}
              className="appearance-none bg-surface border border-line rounded-xl px-4 pr-9 py-3 text-[14px] text-ink outline-none focus:border-fire cursor-pointer min-w-[210px]"
            >
              {LOCATIONS.map(l => (
                <option key={l.id} value={l.id}>{l.label}</option>
              ))}
            </select>
            <ChevronDown size={14} strokeWidth={1.5} className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-3 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Experience level pills */}
      <div>
        <p className="text-[12px] font-medium text-ink-2 mb-2">Experience level</p>
        <div className="flex flex-wrap gap-2">
          {EXP_LEVELS.map(e => (
            <button
              key={e.id}
              onClick={() => setExpId(e.id)}
              className={`px-4 py-2 rounded-xl text-[13px] font-medium border transition-colors ${
                expId === e.id
                  ? 'bg-fire text-bg border-fire'
                  : 'bg-surface border-line text-ink hover:border-fire'
              }`}
            >
              {e.label}
              <span className={`ml-1.5 text-[11px] font-normal ${expId === e.id ? 'opacity-75' : 'text-ink-3'}`}>{e.sub}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
      {!occupation && (
        <div className="py-16 text-center border border-line border-dashed rounded-xl">
          <p className="text-[14px] text-ink-3">Search for a job title above to see your salary estimate</p>
        </div>
      )}

      {occupation && (
        <div className="grid lg:grid-cols-[3fr_2fr] gap-6 items-start">

          {/* Left — salary breakdown */}
          <div className="space-y-4">

            {/* Main salary card */}
            <div className="bg-surface border border-line rounded-xl overflow-hidden">
              <div className="px-5 py-4 border-b border-line">
                <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-ink-3 mb-0.5">
                  {expLevel.label} · {location.label}
                </p>
                <p className="text-[16px] font-bold text-ink">{occupation.title}</p>
              </div>

              <div className="px-5 py-5 space-y-5">
                {/* Without AI skills */}
                <div>
                  <p className="text-[12px] text-ink-3 mb-1">Without AI skills</p>
                  <p className="text-[28px] font-bold text-ink tracking-[-0.02em]">
                    {fmtSalary(baseLow)} – {fmtSalary(baseHigh)}
                  </p>
                  <p className="text-[12px] text-ink-3 mt-0.5">per year</p>
                </div>

                {/* Divider with uplift arrow */}
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-px bg-line" />
                  <span className="text-[12px] font-bold text-fire">+ {aiPct}% AI skills premium</span>
                  <div className="flex-1 h-px bg-line" />
                </div>

                {/* With AI skills */}
                <div className="p-4 bg-fire/5 border border-fire/20 rounded-xl">
                  <p className="text-[12px] font-semibold text-fire mb-1">With AI skills</p>
                  <p className="text-[32px] font-bold text-ink tracking-[-0.03em]">
                    {fmtSalary(aiLow)} – {fmtSalary(aiHigh)}
                  </p>
                  <p className="text-[12px] text-ink-2 mt-1">
                    Estimated additional earn: <span className="font-semibold text-fire">+{fmtSalary(aiLift)}/yr</span>
                  </p>
                </div>
              </div>

              <div className="px-5 py-3 border-t border-line bg-bg">
                <p className="text-[11px] text-ink-3">
                  Salary ranges estimated from BLS OES median wage · AI premium based on LinkedIn Economic Graph 2023 data
                </p>
              </div>
            </div>

            {/* AI skills that earn more */}
            <div className="bg-surface border border-line rounded-xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <Zap size={14} strokeWidth={1.5} className="text-fire" />
                <p className="text-[14px] font-bold text-ink">AI skills that earn more as a {occupation.title}</p>
              </div>
              <div className="space-y-3">
                {topCourses.map((c, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 bg-bg border border-line rounded-xl">
                    <img
                      src={`https://www.google.com/s2/favicons?domain=${new URL(c.url).hostname}&sz=32`}
                      alt=""
                      width={20}
                      height={20}
                      className="rounded mt-0.5 flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-[12px] font-semibold text-ink leading-snug">{c.name}</p>
                      <p className="text-[11px] text-ink-3 mt-0.5">{c.platform} · {c.skill}</p>
                    </div>
                    <a
                      href={`/api/affiliate/redirect?url=${encodeURIComponent(c.url)}&platform=${encodeURIComponent(c.platform)}&course=${encodeURIComponent(c.name)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] font-medium text-fire hover:brightness-110 transition-colors flex-shrink-0 mt-0.5"
                    >
                      Enroll →
                    </a>
                  </div>
                ))}
              </div>
              <a
                href={`/jobs/${occupation.slug}`}
                className="inline-flex items-center gap-1.5 mt-4 text-[12px] text-ink-3 hover:text-ink transition-colors"
              >
                <BookOpen size={12} strokeWidth={1.5} />
                See all {occupation.affiliate_courses.length} AI courses for {occupation.title}s
              </a>
            </div>
          </div>

          {/* Right — job outlook */}
          <div className="space-y-4 lg:sticky lg:top-8">

            {/* Automation risk */}
            <div className="bg-surface border border-line rounded-xl p-5">
              <p className="text-[12px] font-bold uppercase tracking-[0.12em] text-ink-3 mb-4">Job outlook</p>

              <div className="mb-5">
                <div className="flex items-center justify-between mb-1.5">
                  <p className="text-[13px] text-ink-2">AI automation risk</p>
                  <span className={`text-[13px] font-bold ${getRiskColor(occupation.automation_probability)}`}>
                    {getRiskLabel(occupation.automation_probability)}
                  </span>
                </div>
                <div className="h-2 bg-bg border border-line rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      occupation.automation_probability >= 0.80 ? 'bg-critical' :
                      occupation.automation_probability >= 0.55 ? 'bg-warn' : 'bg-safe'
                    }`}
                    style={{ width: `${occupation.automation_probability * 100}%` }}
                  />
                </div>
                <p className="text-[11px] text-ink-3 mt-1">{Math.round(occupation.automation_probability * 100)}% probability — Frey &amp; Osborne (2013), Oxford University</p>
              </div>

              <div className="pt-4 border-t border-line">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-[13px] text-ink-2">10-year employment change</p>
                  <div className={`flex items-center gap-1 text-[13px] font-bold ${
                    growth > 2 ? 'text-safe' : growth < -2 ? 'text-critical' : 'text-warn'
                  }`}>
                    {growth > 2 ? <TrendingUp size={14} strokeWidth={1.5} /> :
                     growth < -2 ? <TrendingDown size={14} strokeWidth={1.5} /> :
                     <Minus size={14} strokeWidth={1.5} />}
                    {growth > 0 ? '+' : ''}{growth}%
                  </div>
                </div>
                <p className="text-[11px] text-ink-3">BLS Employment Projections 2022–2032</p>
              </div>
            </div>

            {/* Core skills */}
            <div className="bg-surface border border-line rounded-xl p-5">
              <p className="text-[12px] font-bold uppercase tracking-[0.12em] text-ink-3 mb-3">Core skills for this role</p>
              <div className="flex flex-wrap gap-2">
                {occupation.core_skills.map(s => (
                  <span key={s.name} className="px-2.5 py-1 bg-bg border border-line rounded-lg text-[12px] text-ink-2">
                    {s.name}
                  </span>
                ))}
              </div>
            </div>

            {/* Methodology note */}
            <div className="p-4 bg-surface border border-line rounded-xl">
              <p className="text-[12px] font-semibold text-ink mb-2">How we calculate this</p>
              <ul className="space-y-1.5 text-[11px] text-ink-3 leading-relaxed">
                <li><span className="font-medium text-ink-2">Base salary</span> — BLS OES median wage adjusted for experience level</li>
                <li><span className="font-medium text-ink-2">Location</span> — BLS metro-area cost-of-labour index</li>
                <li><span className="font-medium text-ink-2">AI premium</span> — LinkedIn Economic Graph (2023): AI-skilled workers earn 13–22% more than field median</li>
                <li>Ranges show ±9% around the central estimate</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
