import { siteConfig } from "@/lib/constants";
import { Container } from "@/components/ui/container";
import { LinkButton } from "@/components/ui/link-button";

export function FinalCtaSection() {
  return (
    <section className="section-shell">
      <Container>
        <div className="rounded-[calc(var(--radius-card)+0.5rem)] border border-orbit-500/20 bg-[linear-gradient(135deg,rgba(0,174,239,0.14),rgba(255,194,26,0.08))] px-6 py-12 text-center shadow-[var(--shadow-cosmic)] md:px-12">
          <p className="eyebrow">Siguiente paso</p>
          <h2 className="mt-4 font-heading text-4xl font-bold tracking-tight text-moon-50 md:text-5xl">
            Llevar astronomia a una escuela, empresa o evento deberia sentirse asi de claro.
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-base leading-8 text-moon-300 md:text-lg">
            El skeleton ya esta alineado con la nueva informacion del sitio. El siguiente paso sera reemplazar placeholders por contenido real y empezar la capa visual final.
          </p>
          <div className="mt-8 flex justify-center">
            <LinkButton href={siteConfig.ctaHref} size="lg">
              Solicitar informacion
            </LinkButton>
          </div>
        </div>
      </Container>
    </section>
  );
}

