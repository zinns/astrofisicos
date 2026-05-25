import { astronomicalEvents } from "@/content/calendar";
import { EventCard } from "@/components/cards/event-card";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Calendario astronomico",
  path: "/calendario-astronomico",
  description: "Eventos astronomicos utiles para volver al sitio y planear futuras experiencias.",
});

export default function CalendarioAstronomicoPage() {
  return (
    <section className="section-shell">
      <Container className="space-y-10">
        <SectionHeader
          eyebrow="Calendario"
          title="Eventos utiles desde el MVP"
          description="Por ahora se alimenta desde un archivo tipado. Cuando el contenido real llegue, se remplaza sin tocar la arquitectura."
        />
        <div className="grid gap-6">
          {astronomicalEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </Container>
    </section>
  );
}

