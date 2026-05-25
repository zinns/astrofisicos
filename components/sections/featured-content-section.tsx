import { ContentCard } from "@/components/cards/content-card";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";

const contentHighlights = [
  {
    category: "Video",
    title: "Explicaciones que convierten curiosidad en interes",
    description: "Este modulo ayudara a dirigir trafico hacia YouTube, reels, articulos o piezas destacadas del cliente.",
    href: "/contenido",
  },
  {
    category: "Pregunta Cosmica",
    title: "Bloques para contenido recurrente",
    description: "La experiencia debe permitir preguntas cortas, formatos educativos y rutas claras hacia futuras publicaciones.",
    href: "/contenido",
  },
  {
    category: "Comunidad",
    title: "Contenido pensado para volver",
    description: "El sitio debe invitar a mirar, aprender, preguntar, asistir y regresar sin depender solo de redes sociales.",
    href: "/contenido",
  },
];

export function FeaturedContentSection() {
  return (
    <section className="section-shell">
      <Container className="space-y-10">
        <SectionHeader
          eyebrow="Contenido"
          title="Una plataforma de ciencia, no un brochure estatico"
          description="Este bloque marca la transicion entre la promesa comercial y la energia creadora de la marca."
        />
        <div className="grid gap-6 lg:grid-cols-3">
          {contentHighlights.map((item) => (
            <ContentCard key={item.title} {...item} />
          ))}
        </div>
      </Container>
    </section>
  );
}

