import { MetricCard } from "@/components/cards/metric-card";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";

const audiences = [
  {
    title: "Escuelas",
    description: "Conferencias, talleres y experiencias educativas con lenguaje claro y alta credibilidad cientifica.",
  },
  {
    title: "Empresas",
    description: "Charlas, activaciones y experiencias memorables que conectan ciencia, curiosidad y cultura.",
  },
  {
    title: "Eventos e instituciones",
    description: "Programas para museos, comunidades, familias y espacios culturales con enfoque publico.",
  },
];

export function AudienceSection() {
  return (
    <section className="section-shell">
      <Container className="space-y-10">
        <SectionHeader
          eyebrow="Audiencias"
          title="Pensado para quien contrata y para quien aprende"
          description="La pagina debe resolver necesidades distintas sin mezclar mensajes ni diluir la conversion principal."
        />
        <div className="grid gap-6 md:grid-cols-3">
          {audiences.map((item) => (
            <MetricCard key={item.title} {...item} />
          ))}
        </div>
      </Container>
    </section>
  );
}

