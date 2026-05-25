import { siteConfig } from "@/lib/constants";
import { Container } from "@/components/ui/container";
import { LinkButton } from "@/components/ui/link-button";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      <Container className="relative z-10">
        <div className="max-w-4xl space-y-8">
          <p className="eyebrow">Mission control para divulgacion cientifica</p>
          <div className="space-y-5">
            <h1 className="font-heading text-5xl font-bold tracking-tight text-moon-50 md:text-7xl">
              El universo, explicado por quienes lo estudian.
            </h1>
            <p className="max-w-3xl text-lg leading-8 text-moon-300 md:text-xl">
              Conferencias, observaciones astronomicas, talleres y contenido cientifico para acercar el cosmos a escuelas, empresas, eventos y mentes curiosas.
            </p>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row">
            <LinkButton href={siteConfig.ctaHref} size="lg">
              {siteConfig.ctaLabel}
            </LinkButton>
            <LinkButton href="/contenido" size="lg" variant="ghost">
              Explorar contenido
            </LinkButton>
          </div>
        </div>
      </Container>
    </section>
  );
}

