import { createClient } from '@supabase/supabase-js';
import HeroRiskGame from './HeroRiskGame';

async function getRoadmapCount(): Promise<number> {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
    const { count } = await supabase
      .from('roadmaps')
      .select('*', { count: 'exact', head: true });
    return count ?? 0;
  } catch {
    return 0;
  }
}

export default async function HeroSection() {
  const count = await getRoadmapCount();
  const displayCount = count > 0
    ? count.toLocaleString('en-US')
    : null;

  return (
    <section id="hero" className="pt-10 sm:pt-14 pb-16 px-5 sm:px-8 text-center">
      <div className="max-w-[720px] mx-auto">

        {/* Headline */}
        <h1 className="text-[clamp(22px,5vw,42px)] font-extrabold leading-[0.92] tracking-[-0.04em] text-ink mb-5 whitespace-nowrap">
          Check How Risky Your Job Is
        </h1>

        {/* Subhead */}
        <p className="text-[15px] sm:text-[16px] text-ink-2 max-w-[700px] mx-auto leading-relaxed mb-7">
          Pick your job category to get a personalized AI Risk Score and roadmap in 60 seconds
        </p>

        {/* Gamified risk calculator */}
        <HeroRiskGame />

        {/* Social proof — only shown when real count exists */}
        {displayCount && (
          <p className="text-[13px] text-ink-3 mt-6">
            {displayCount} professionals have checked their AI risk score.
          </p>
        )}

        {/* Stats bar */}
        <div className="mt-10 max-w-[780px] mx-auto grid grid-cols-3 rounded-[20px] overflow-hidden border border-line bg-surface">
          <div className="py-3 sm:py-4 px-3 sm:px-6">
            {/* WEF Future of Jobs Report 2023: 83M jobs displaced by 2027 */}
            <div className="text-[22px] sm:text-[28px] font-extrabold font-mono text-ink leading-none tracking-tight">83M</div>
            <div className="text-[10px] sm:text-[11px] text-ink-3 mt-1 leading-snug">jobs displaced by 2027</div>
          </div>
          <div className="py-3 sm:py-4 px-3 sm:px-6 border-x border-line">
            {/* LinkedIn Economic Graph 2024: 74% of executives believe GAI will benefit employees */}
            <div className="text-[22px] sm:text-[28px] font-extrabold font-mono text-ink leading-none tracking-tight">74%</div>
            <div className="text-[10px] sm:text-[11px] text-ink-3 mt-1 leading-snug">of execs say AI benefits staff</div>
          </div>
          <div className="py-3 sm:py-4 px-3 sm:px-6">
            {/* LinkedIn Economic Graph 2024: AI skills command 25%+ salary premium */}
            <div className="text-[22px] sm:text-[28px] font-extrabold font-mono text-fire leading-none tracking-tight">+25%</div>
            <div className="text-[10px] sm:text-[11px] text-ink-3 mt-1 leading-snug">salary for AI skills</div>
          </div>
        </div>

        {/* Footnotes */}
        <p className="text-[10px] text-ink-3 mt-3 leading-relaxed max-w-[780px] mx-auto">
          <a href="https://www.weforum.org/publications/the-future-of-jobs-report-2023/" target="_blank" rel="noopener noreferrer" className="hover:text-ink transition-colors">World Economic Forum, Future of Jobs Report 2023</a>
          &nbsp;·&nbsp;
          <a href="https://economicgraph.linkedin.com/research/future-of-work-report-ai" target="_blank" rel="noopener noreferrer" className="hover:text-ink transition-colors">LinkedIn Economic Graph, 2024</a>
        </p>

      </div>
    </section>
  );
}
