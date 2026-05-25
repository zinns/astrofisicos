import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  action?: ReactNode;
};

export function SectionHeader({ eyebrow, title, description, align = "left", action }: SectionHeaderProps) {
  return (
    <div className={cn("flex flex-col gap-4 md:flex-row md:items-end md:justify-between", align === "center" && "text-center md:flex-col md:items-center")}>
      <div className="max-w-3xl space-y-3">
        {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
        <h2 className="font-heading text-3xl font-bold tracking-tight text-moon-50 md:text-5xl">{title}</h2>
        {description ? <p className="text-base leading-8 text-moon-300 md:text-lg">{description}</p> : null}
      </div>
      {action ? <div>{action}</div> : null}
    </div>
  );
}

