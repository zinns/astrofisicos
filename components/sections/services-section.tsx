import { services } from "@/content/services";
import { ServiceCard } from "@/components/cards/service-card";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";

export function ServicesSection() {
  return (
    <section className="section-shell">
      <Container className="space-y-10">
        <SectionHeader
          eyebrow="Servicios"
          title="Elige tu mision"
          description="La arquitectura del sitio parte de estos cuatro servicios porque son el corazon comercial del proyecto."
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

