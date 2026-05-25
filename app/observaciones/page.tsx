import { Container } from "@/components/ui/container";
import { LinkButton } from "@/components/ui/link-button";
import { SectionHeader } from "@/components/ui/section-header";
import { Card } from "@/components/ui/card";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Observaciones astronomicas",
  path: "/observaciones",
  description: "Experiencias guiadas para mirar el cielo con claridad cientifica y sentido de asombro.",
});

export default function ObservacionesPage() {
  return (
    <section className="section-shell">
      <Container className="space-y-10">
        <SectionHeader
          eyebrow="Observaciones"
          title="Mirar el cielo como experiencia compartida"
          description="Este esqueleto reserva espacio para explicar inclusiones, requisitos, ubicaciones y notas de seguridad."
        />
        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="space-y-3">
            <h3 className="font-heading text-xl font-semibold text-moon-50">Que incluye</h3>
            <p className="text-sm leading-7 text-moon-300">Guia, narrativa accesible, equipo por definir y condiciones de experiencia.</p>
          </Card>
          <Card className="space-y-3">
            <h3 className="font-heading text-xl font-semibold text-moon-50">Para quien es</h3>
            <p className="text-sm leading-7 text-moon-300">Familias, escuelas, comunidades y eventos con distintos niveles de familiaridad con la astronomia.</p>
          </Card>
          <Card className="space-y-3">
            <h3 className="font-heading text-xl font-semibold text-moon-50">Logistica</h3>
            <p className="text-sm leading-7 text-moon-300">Se completara con condiciones climaticas, tiempos, necesidades tecnicas y recomendaciones.</p>
          </Card>
        </div>
        <LinkButton href="/contacto" size="lg">
          Agendar una observacion
        </LinkButton>
      </Container>
    </section>
  );
}

