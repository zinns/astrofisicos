import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";
import type { VariantProps } from "class-variance-authority";

import { cn } from "@/lib/cn";
import { buttonVariants } from "@/components/ui/button";

type LinkButtonProps = ComponentPropsWithoutRef<typeof Link> & VariantProps<typeof buttonVariants>;

export function LinkButton({ className, variant, size, ...props }: LinkButtonProps) {
  return <Link className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}

