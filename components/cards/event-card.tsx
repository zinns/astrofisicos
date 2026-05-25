import { AstronomicalEvent } from "@/content/calendar";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { LinkButton } from "@/components/ui/link-button";

type EventCardProps = {
  event: AstronomicalEvent;
};

export function EventCard({ event }: EventCardProps) {
  return (
    <Card className="flex h-full flex-col justify-between gap-6">
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-3">
          <Badge>{event.type}</Badge>
          {event.visibility ? <Badge variant="muted">{event.visibility}</Badge> : null}
        </div>
        <div className="space-y-3">
          <p className="text-sm font-medium text-solar-400">{event.date}</p>
          <h3 className="font-heading text-2xl font-semibold text-moon-50">{event.title}</h3>
          <p className="text-sm leading-7 text-moon-300">{event.description}</p>
        </div>
      </div>
      <LinkButton href={event.ctaHref ?? "/contacto"} size="sm" variant="ghost">
        {event.ctaLabel ?? "Solicitar informacion"}
      </LinkButton>
    </Card>
  );
}

