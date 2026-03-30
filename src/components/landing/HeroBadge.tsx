interface HeroBadgeProps {
  text: string;
}

export function HeroBadge({ text }: HeroBadgeProps) {
  return (
    <div className="inline-flex items-center gap-2.5 px-4 py-[7px] rounded-full bg-[#f0fdf9] border border-[#99f6e4] text-sm text-neutral-800 mb-8">
      <span className="relative flex h-3 w-3 shrink-0">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-60" />
        <span className="relative inline-flex rounded-full h-3 w-3 bg-teal-500" />
      </span>
      <span className="font-medium">{text}</span>
    </div>
  );
}
