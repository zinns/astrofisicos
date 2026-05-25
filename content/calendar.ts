export type AstronomicalEvent = {
  id: string;
  title: string;
  date: string;
  type: "eclipse" | "meteor-shower" | "moon" | "planet" | "talk" | "other";
  description: string;
  visibility?: string;
  ctaLabel?: string;
  ctaHref?: string;
};

export const astronomicalEvents: AstronomicalEvent[] = [
  {
    id: "placeholder-event-1",
    title: "Proximo evento astronomico",
    date: "2026-06-01",
    type: "other",
    description: "Actualiza este contenido con los proximos eventos astronomicos confirmados.",
    visibility: "Por confirmar",
    ctaLabel: "Solicitar informacion",
    ctaHref: "/contacto",
  },
];

