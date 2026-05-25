import { ContentCard } from "@/components/cards/content-card";
import { ContentEntryCard } from "@/components/cards/content-entry-card";
import { socialLinks } from "@/content/social";
import { contentCategories } from "@/content/content";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import { Card } from "@/components/ui/card";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Contenido",
  path: "/contenido",
  description: "Hub de contenido para resumir videos, articulos, pregunta cosmica y rutas hacia las plataformas del cliente.",
});

export default function ContenidoPage() {
  return (
    <section className="section-shell">
      <Container className="space-y-12">
        <SectionHeader
          eyebrow="Contenido"
          title="Rutas para ver, aprender y seguir explorando"
          description="El hub resume lo mas reciente por categoria y lleva a paginas internas mas completas para videos, articulos y preguntas cosmicas."
        />
        <div className="grid gap-6 xl:grid-cols-3">
          {contentCategories.map((category) => {
            const latestEntry = category.entries[0];

            return (
              <ContentEntryCard
                key={latestEntry.id}
                eyebrow={`Nuevo en ${category.label}`}
                entry={latestEntry}
                href={`${category.path}#${latestEntry.id}`}
                ctaLabel="Abrir contenido completo"
                showBody={false}
              />
            );
          })}
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          {contentCategories.map((category) => (
            <ContentCard
              key={category.slug}
              category={category.eyebrow}
              title={category.label}
              description={category.summaryDescription}
              href={category.path}
            />
          ))}
        </div>
        <Card className="space-y-4">
          <h3 className="font-heading text-2xl font-semibold text-moon-50">Redes y plataformas</h3>
          <p className="text-sm leading-7 text-moon-300">
            Las URLs reales siguen pendientes, pero la arquitectura ya contempla social media como canal de descubrimiento y derivacion hacia contenido mas profundo.
          </p>
          <ul className="grid gap-3 text-sm text-moon-300 sm:grid-cols-2 lg:grid-cols-5">
            {socialLinks.map((link) => (
              <li key={link.label} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                <a className="transition hover:text-moon-50" href={link.href}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </Card>
      </Container>
    </section>
  );
}
