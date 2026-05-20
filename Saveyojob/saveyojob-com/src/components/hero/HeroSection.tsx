import HeroRiskGame from './HeroRiskGame';

export default function HeroSection() {
  return (
    <section id="hero" className="pt-10 sm:pt-14 pb-16 px-5 sm:px-8 text-center">
      <div className="max-w-[720px] mx-auto">

        {/* Headline */}
        <h1 className="text-[clamp(46px,8.5vw,60px)] font-extrabold leading-[0.92] tracking-[-0.04em] text-ink mb-5">
          AI Is Changing Jobs Fast
        </h1>

        {/* Subhead */}
        <p className="text-[16px] sm:text-[16px] text-ink-2 max-w-[700px] mx-auto leading-relaxed mb-7">
          Pick your job category to get a personalized AI Risk Score and roadmap in 60 seconds
        </p>

        {/* Gamified risk calculator */}
        <HeroRiskGame />

        {/* Social proof */}
        <p className="text-[13px] text-ink-3 mt-6">
          14,312 professionals have checked the score and upskilled themselves.
        </p>

        {/* Stats bar */}
        <div className="mt-10 max-w-[640px] mx-auto grid grid-cols-3 rounded-xl overflow-hidden border border-line bg-surface">
          <div className="py-4 px-6">
            <div className="text-[28px] font-extrabold text-ink leading-none tracking-tight">92M</div>
            <div className="text-[11px] text-ink-3 mt-1 whitespace-nowrap">jobs at risk by 2030</div>
          </div>
          <div className="py-4 px-6 border-x border-line">
            <div className="text-[28px] font-extrabold text-ink leading-none tracking-tight">51%</div>
            <div className="text-[11px] text-ink-3 mt-1 whitespace-nowrap">of workers worried about AI</div>
          </div>
          <div className="py-4 px-6">
            <div className="text-[28px] font-extrabold text-fire leading-none tracking-tight">+25%</div>
            <div className="text-[11px] text-ink-3 mt-1 whitespace-nowrap">salary for AI-skilled workers</div>
          </div>
        </div>

      </div>
    </section>
  );
}
