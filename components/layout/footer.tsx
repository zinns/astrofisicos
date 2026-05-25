import Link from "next/link";

import { navigationItems } from "@/content/navigation";
import { socialLinks } from "@/content/social";
import { siteConfig } from "@/lib/constants";
import { Container } from "@/components/ui/container";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-space-900/60 py-16">
      <Container className="space-y-10">
        <div className="grid gap-10 md:grid-cols-[1.2fr_1fr_1fr]">
          <div className="space-y-4">
            <p className="eyebrow">Astrofisicos en Accion</p>
            <p className="max-w-md text-sm leading-7 text-moon-300">
              Ciencia, experiencias y contenido para acercar el universo a escuelas, empresas, eventos y mentes curiosas.
            </p>
          </div>

          <div>
            <h3 className="font-heading text-lg font-semibold text-moon-50">Navegacion</h3>
            <ul className="mt-4 space-y-3 text-sm text-moon-300">
              {navigationItems.map((item) => (
                <li key={item.href}>
                  <Link className="transition hover:text-moon-50" href={item.href}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-heading text-lg font-semibold text-moon-50">Redes y contacto</h3>
            <ul className="mt-4 space-y-3 text-sm text-moon-300">
              <li>
                <Link className="transition hover:text-moon-50" href={siteConfig.ctaHref}>
                  {siteConfig.ctaLabel}
                </Link>
              </li>
              {socialLinks.map((link) => (
                <li key={link.label}>
                  <a className="transition hover:text-moon-50" href={link.href}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-white/10 pt-6 text-sm text-moon-500 md:flex-row md:items-center md:justify-between">
          <p>{siteConfig.name}. Skeleton inicial para el rediseño.</p>
          <p>Logo original preservado en /public/logo.</p>
        </div>
      </Container>
    </footer>
  );
}

