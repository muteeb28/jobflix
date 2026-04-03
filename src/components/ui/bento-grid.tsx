import { cn } from "@/lib/utils";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "mx-auto grid max-w-7xl grid-cols-1 gap-4 md:auto-rows-[22rem] md:grid-cols-3",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "group/bento row-span-1 flex flex-col justify-between gap-3 rounded-2xl border border-neutral-200 dark:border-[#222] bg-white dark:bg-[#0f0f0f] p-5 transition-all duration-300 hover:-translate-y-[2px] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_8px_30px_rgba(255,255,255,0.04)]",
        className,
      )}
    >
      {/* Card content / preview */}
      <div className="flex-1 min-h-0 overflow-hidden">
        {header}
      </div>

      {/* Footer: icon + title + description */}
      <div className="transition-transform duration-200 group-hover/bento:translate-x-1">
        <div className="flex items-center gap-2 mb-1">
          {icon}
          <span
            className="font-semibold text-[15px] text-neutral-900 dark:text-neutral-100"
            style={{ fontFamily: "var(--font-bricolage, 'Sora', sans-serif)" }}
          >
            {title}
          </span>
        </div>
        <div className="text-[13px] text-neutral-500 dark:text-neutral-400" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          {description}
        </div>
      </div>
    </div>
  );
};
