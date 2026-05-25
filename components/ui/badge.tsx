import type { ComponentPropsWithoutRef } from "react";

import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/cn";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium uppercase tracking-[0.16em]",
  {
    variants: {
      variant: {
        default: "border-orbit-500/30 bg-orbit-500/10 text-orbit-500",
        solar: "border-solar-400/30 bg-solar-400/10 text-solar-400",
        muted: "border-white/10 bg-white/5 text-moon-300",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export function Badge({
  className,
  variant,
  ...props
}: ComponentPropsWithoutRef<"span"> & VariantProps<typeof badgeVariants>) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}

