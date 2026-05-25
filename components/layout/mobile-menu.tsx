import Link from "next/link";

import { navigationItems } from "@/content/navigation";
import { siteConfig } from "@/lib/constants";
import { LinkButton } from "@/components/ui/link-button";

export function MobileMenu() {
  return (
    <details className="md:hidden">
      <summary className="cursor-pointer list-none rounded-full border border-white/15 px-4 py-2 text-sm font-semibold text-moon-50">
        Menu
      </summary>
      <nav className="mt-4 rounded-3xl border border-white/10 bg-space-900/95 p-4">
        <ul className="space-y-3">
          {navigationItems.map((item) => (
            <li key={item.href}>
              <Link className="block rounded-2xl px-3 py-2 text-sm text-moon-100 hover:bg-white/5" href={item.href}>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-4">
          <LinkButton className="w-full" href={siteConfig.ctaHref} size="sm">
            {siteConfig.ctaLabel}
          </LinkButton>
        </div>
      </nav>
    </details>
  );
}

