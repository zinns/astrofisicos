import { Container } from "@/components/ui/container";
import { LinkButton } from "@/components/ui/link-button";
import { SectionHeader } from "@/components/ui/section-header";
import { Card } from "@/components/ui/card";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Conferencias",
  path: "/conferencias",
  description: "Charlas de astronomia y ciencia para escuelas, empresas e instituciones.",
});

export default function ConferenciasPage() {
  return (
    <section className="section-shell">
      <Container className="space-y-10">
        <SectionHeader
          eyebrow="Conferencias"
          title="Charlas con autoridad cientifica y energia de creador"
          description="La estructura ya contempla temas, formatos, audiencias y una CTA directa hacia contacto."
        />
        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="space-y-4">
            <h3 className="font-heading text-2xl font-semibold text-moon-50">Temas y formatos</h3>
            <p className="text-sm leading-7 text-moon-300">
              Esta seccion quedo reservada para catalogar temas de astronomia, divulgacion cientifica y experiencias de ciencia para distintos contextos.
            </p>
          </Card>
          <Card className="space-y-4">
            <h3 className="font-heading text-2xl font-semibold text-moon-50">Escuelas, empresas e instituciones</h3>
            <p className="text-sm leading-7 text-moon-300">
              El contenido definitivo debera traducir beneficios, tono y profundidad segun el publico que contrata la experiencia.
            </p>
          </Card>
        </div>
        <LinkButton href="/contacto" size="lg">
          Solicitar informacion
        </LinkButton>
      </Container>
    </section>
  );
}

