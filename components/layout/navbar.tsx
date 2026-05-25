import Image from "next/image";
import Link from "next/link";

import { navigationItems } from "@/content/navigation";
import { siteConfig } from "@/lib/constants";
import { MobileMenu } from "@/components/layout/mobile-menu";
import { Container } from "@/components/ui/container";
import { LinkButton } from "@/components/ui/link-button";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-space-950/80 backdrop-blur-xl">
      <Container className="flex min-h-20 items-center justify-between gap-6">
        <Link className="flex items-center gap-3" href="/">
          <Image
            alt="Astrofisicos en Accion"
            className="hidden h-auto w-44 md:block"
            height={52}
            priority
            src="/logo/logo-primary.svg"
            width={180}
          />
          <Image
            alt="Astrofisicos en Accion"
            className="h-auto w-12 md:hidden"
            height={52}
            priority
            src="/logo/logo-primary.svg"
            width={52}
          />
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {navigationItems.map((item) => (
            <Link key={item.href} className="text-sm font-medium text-moon-300 transition hover:text-moon-50" href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <LinkButton href={siteConfig.ctaHref}>{siteConfig.ctaLabel}</LinkButton>
        </div>

        <MobileMenu />
      </Container>
    </header>
  );
}

