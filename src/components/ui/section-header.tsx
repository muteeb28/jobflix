import * as React from "react";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = "center",
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "mb-10",
        align === "center" ? "text-center" : "text-left",
        className
      )}
    >
      {eyebrow && (
        <p className="text-[10px] font-mono uppercase tracking-[0.28em] text-brand-600 dark:text-brand-400/70 mb-3">
          {eyebrow}
        </p>
      )}
      <h2
        style={{ fontFamily: "var(--font-bricolage)" }}
        className="text-4xl md:text-5xl font-extrabold tracking-tighter leading-[1.02] bg-gradient-to-b from-neutral-900 to-neutral-500 dark:from-white dark:to-neutral-400 bg-clip-text text-transparent"
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "text-neutral-500 dark:text-zinc-400 text-base mt-3 leading-relaxed",
            align === "center" && "max-w-lg mx-auto"
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
