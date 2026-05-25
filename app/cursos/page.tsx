import { Container } from "@/components/ui/container";
import { LinkButton } from "@/components/ui/link-button";
import { SectionHeader } from "@/components/ui/section-header";
import { Card } from "@/components/ui/card";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Cursos",
  path: "/cursos",
  description: "Programas para profundizar en astronomia y divulgacion cientifica.",
});

export default function CursosPage() {
  return (
    <section className="section-shell">
      <Container className="space-y-10">
        <SectionHeader
          eyebrow="Cursos"
          title="Programas para estudiar con mas profundidad"
          description="Esta pagina servira para presentar formatos, temas y niveles con una CTA clara hacia contacto."
        />
        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="space-y-3">
            <h3 className="font-heading text-xl font-semibold text-moon-50">Formatos</h3>
            <p className="text-sm leading-7 text-moon-300">Presencial, remoto o mixto, segun la oferta real del cliente.</p>
          </Card>
          <Card className="space-y-3">
            <h3 className="font-heading text-xl font-semibold text-moon-50">Temas</h3>
            <p className="text-sm leading-7 text-moon-300">Astronomia general, cielo nocturno, divulgacion y recorridos tematicos.</p>
          </Card>
          <Card className="space-y-3">
            <h3 className="font-heading text-xl font-semibold text-moon-50">Audiencias</h3>
            <p className="text-sm leading-7 text-moon-300">Estudiantes, docentes, entusiastas y organizaciones interesadas en formacion cientifica.</p>
          </Card>
        </div>
        <LinkButton href="/contacto" size="lg">
          Ver cursos
        </LinkButton>
      </Container>
    </section>
  );
}

