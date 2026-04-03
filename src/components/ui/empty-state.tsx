import * as React from "react";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

export function EmptyState({
  icon,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center text-center py-16 px-6 rounded-3xl border border-neutral-200 dark:border-white/[0.07] bg-white dark:bg-[#111113]",
        className
      )}
    >
      {icon && (
        <div className="w-14 h-14 rounded-full bg-brand-50 dark:bg-brand-500/10 border border-brand-100 dark:border-brand-500/20 flex items-center justify-center mb-4 text-brand-500">
          {icon}
        </div>
      )}
      <h3 className="text-base font-semibold text-neutral-800 dark:text-zinc-200 mb-1">
        {title}
      </h3>
      {description && (
        <p className="text-sm text-neutral-500 dark:text-zinc-500 max-w-xs leading-relaxed mb-4">
          {description}
        </p>
      )}
      {action && <div>{action}</div>}
    </div>
  );
}
