import { teamMembers } from "@/content/team";
import { TeamMemberCard } from "@/components/cards/team-member-card";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import { Card } from "@/components/ui/card";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Equipo",
  path: "/equipo",
  description: "Pagina preparada para presentar credenciales, especialidades y perfiles del equipo real.",
});

export default function EquipoPage() {
  return (
    <section className="section-shell">
      <Container className="space-y-10">
        <SectionHeader
          eyebrow="Equipo"
          title="La autoridad cientifica debe verse, no solo decirse"
          description="La estructura separa biografia, especialidades y posicionamiento personal para aumentar confianza y conversion."
        />
        <div className="grid gap-6 lg:grid-cols-3">
          {teamMembers.map((member) => (
            <TeamMemberCard key={member.id} member={member} />
          ))}
        </div>
        <Card className="space-y-3">
          <h3 className="font-heading text-2xl font-semibold text-moon-50">Pendientes de contenido</h3>
          <p className="text-sm leading-7 text-moon-300">
            Antes de pasar a una version visual final, hacen falta perfiles oficiales, fotografia, cargos, social links y especialidades del equipo real.
          </p>
        </Card>
      </Container>
    </section>
  );
}

