import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-semibold transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-brand-400/60 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        /** Brand filled — primary CTA */
        brand:
          "bg-brand-500 hover:bg-brand-600 active:bg-brand-700 text-white hover:shadow-[0_0_24px_4px_rgba(16,185,129,0.25)] hover:scale-[1.02]",
        /** Neutral filled — for dark CTAs */
        default:
          "bg-neutral-900 dark:bg-white hover:bg-neutral-700 dark:hover:bg-neutral-100 text-white dark:text-neutral-900 hover:scale-[1.02]",
        destructive:
          "bg-destructive text-white shadow-xs hover:bg-destructive/90",
        /** Outlined — secondary action */
        outline:
          "border border-neutral-200 dark:border-white/[0.1] bg-white dark:bg-white/[0.03] text-neutral-700 dark:text-zinc-300 hover:border-neutral-300 dark:hover:border-white/[0.2] hover:text-neutral-900 dark:hover:text-zinc-100 hover:scale-[1.02]",
        /** Brand outlined */
        "outline-brand":
          "border border-brand-200 dark:border-brand-500/30 bg-brand-50 dark:bg-brand-500/[0.08] text-brand-700 dark:text-brand-400 hover:bg-brand-100 dark:hover:bg-brand-500/20 hover:scale-[1.02]",
        secondary:
          "bg-neutral-100 dark:bg-white/[0.06] text-neutral-800 dark:text-zinc-200 hover:bg-neutral-200 dark:hover:bg-white/[0.10]",
        ghost:
          "text-neutral-600 dark:text-zinc-400 hover:bg-neutral-100 dark:hover:bg-white/[0.06] hover:text-neutral-900 dark:hover:text-zinc-100",
        link: "text-brand-600 dark:text-brand-400 underline-offset-4 hover:underline",
      },
      size: {
        sm:      "h-8 px-4 text-xs",
        default: "h-9 px-5 py-2",
        lg:      "h-11 px-7 text-base",
        icon:    "size-9",
      },
    },
    defaultVariants: {
      variant: "brand",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
