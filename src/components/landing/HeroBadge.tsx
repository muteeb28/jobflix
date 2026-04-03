import { cn } from "@/lib/utils";

interface HeroBadgeProps {
  text: string;
  className?: string;
}

export function HeroBadge({ text, className }: HeroBadgeProps) {
  return (
    <div className={cn("inline-flex items-center gap-2.5 px-4 py-[7px] rounded-full bg-brand-50 dark:bg-brand-500/[0.08] border border-brand-200 dark:border-brand-500/20 text-sm text-brand-800 dark:text-zinc-300 mb-8", className)}>
      <span className="relative flex h-2.5 w-2.5 shrink-0">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-60" />
        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-brand-500" />
      </span>
      <span className="font-medium text-[13px]">{text}</span>
    </div>
  );
}
