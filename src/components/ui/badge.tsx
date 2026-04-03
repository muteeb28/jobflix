import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider transition-colors",
  {
    variants: {
      variant: {
        brand:  "bg-brand-50 dark:bg-brand-500/10 border border-brand-200 dark:border-brand-500/20 text-brand-700 dark:text-brand-400",
        green:  "bg-green-50  dark:bg-green-500/10  border border-green-200  dark:border-green-500/20  text-green-700  dark:text-green-400",
        orange: "bg-orange-50 dark:bg-orange-500/10 border border-orange-200 dark:border-orange-500/20 text-orange-700 dark:text-orange-400",
        red:    "bg-red-50    dark:bg-red-500/10    border border-red-200    dark:border-red-500/20    text-red-700    dark:text-red-400",
        gray:   "bg-neutral-100 dark:bg-white/[0.06] border border-neutral-200 dark:border-white/[0.08] text-neutral-600 dark:text-zinc-400",
        ghost:  "text-neutral-500 dark:text-zinc-500",
      },
      size: {
        sm: "px-2 py-0.5 text-[10px]",
        md: "px-2.5 py-0.5 text-[11px]",
        lg: "px-3 py-1 text-xs",
      },
    },
    defaultVariants: {
      variant: "gray",
      size: "md",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, size, ...props }: BadgeProps) {
  return (
    <span
      className={cn(badgeVariants({ variant, size }), className)}
      {...props}
    />
  );
}

export { badgeVariants };
