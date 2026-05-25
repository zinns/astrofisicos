import { services } from "@/content/services";
import { ServiceCard } from "@/components/cards/service-card";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Servicios",
  path: "/servicios",
  description: "Vista general de conferencias, observaciones astronomicas, talleres y cursos.",
});

export default function ServiciosPage() {
  return (
    <section className="section-shell">
      <Container className="space-y-10">
        <SectionHeader
          eyebrow="Servicios"
          title="Experiencias claras, modulares y faciles de contratar"
          description="Esta pagina resume la oferta principal del sitio y organiza la entrada a las cuatro paginas de servicio del MVP."
        />
        <div className="grid gap-6 md:grid-cols-2">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </Container>
    </section>
  );
}

