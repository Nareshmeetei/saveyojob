interface FirstSevenDaysProps {
  days: Array<{ day: number; action: string }>;
}

export default function FirstSevenDays({ days }: FirstSevenDaysProps) {
  return (
    <div className="flex flex-col gap-0 border border-line rounded-xl overflow-hidden">
      {days.map((d, i) => (
        <div
          key={d.day}
          className={`flex items-start gap-4 px-5 py-4 ${i > 0 ? 'border-t border-line' : ''}`}
        >
          <div className="w-14 shrink-0">
            <div className="text-[10px] font-semibold uppercase tracking-[0.1em] text-ink-3">Day</div>
            <div className="text-[22px] font-bold text-fire leading-none">{d.day}</div>
          </div>
          <div className="flex-1 pt-1.5 text-[13px] text-ink-2 leading-relaxed">{d.action}</div>
        </div>
      ))}
    </div>
  );
}
