import { astronomicalEvents } from "@/content/calendar";
import { EventCard } from "@/components/cards/event-card";
import { Container } from "@/components/ui/container";
import { LinkButton } from "@/components/ui/link-button";
import { SectionHeader } from "@/components/ui/section-header";

export function CalendarPreviewSection() {
  return (
    <section className="section-shell">
      <Container className="space-y-10">
        <SectionHeader
          eyebrow="Calendario astronomico"
          title="Motivos claros para volver al sitio"
          description="En el MVP se resuelve con contenido tipado y fechas estaticas. Mas adelante podra evolucionar a una fuente dinamica."
          action={
            <LinkButton href="/calendario-astronomico" size="sm" variant="ghost">
              Ver proximos eventos
            </LinkButton>
          }
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

