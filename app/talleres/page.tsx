import { Container } from "@/components/ui/container";
import { LinkButton } from "@/components/ui/link-button";
import { SectionHeader } from "@/components/ui/section-header";
import { Card } from "@/components/ui/card";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Talleres",
  path: "/talleres",
  description: "Actividades interactivas para aprender ciencia haciendo, tocando y preguntando.",
});

export default function TalleresPage() {
  return (
    <section className="section-shell">
      <Container className="space-y-10">
        <SectionHeader
          eyebrow="Talleres"
          title="Aprender ciencia con dinamica, evidencia y participacion"
          description="La arquitectura ya separa tipos de taller, resultados educativos y niveles de audiencia."
        />
        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="space-y-3">
            <h3 className="font-heading text-2xl font-semibold text-moon-50">Tipos de taller</h3>
            <p className="text-sm leading-7 text-moon-300">Este modulo quedo listo para agrupar sesiones de observacion, demostraciones y experiencias practicas.</p>
          </Card>
          <Card className="space-y-3">
            <h3 className="font-heading text-2xl font-semibold text-moon-50">Resultados educativos</h3>
            <p className="text-sm leading-7 text-moon-300">Aqui entra la propuesta didactica, el nivel recomendado y el valor para docentes, instituciones y familias.</p>
          </Card>
        </div>
        <LinkButton href="/contacto" size="lg">
          Explorar talleres
        </LinkButton>
      </Container>
    </section>
  );
}

