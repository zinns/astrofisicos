import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/cn";

export function Card({ className, ...props }: ComponentPropsWithoutRef<"article">) {
  return (
    <article
      className={cn(
        "rounded-[var(--radius-card)] border border-white/10 bg-space-900/80 p-6 shadow-[var(--shadow-cosmic)] backdrop-blur-sm",
        className,
      )}
      {...props}
    />
  );
}

