import { teamMembers } from "@/content/team";
import { TeamMemberCard } from "@/components/cards/team-member-card";
import { Container } from "@/components/ui/container";
import { LinkButton } from "@/components/ui/link-button";
import { SectionHeader } from "@/components/ui/section-header";

export function TeamPreviewSection() {
  return (
    <section className="section-shell">
      <Container className="space-y-10">
        <SectionHeader
          eyebrow="Equipo"
          title="La confianza vendra de las personas"
          description="Este espacio quedo listo para integrar perfiles reales, especialidades, biografias e imagenes oficiales."
          action={
            <LinkButton href="/equipo" size="sm" variant="ghost">
              Ver equipo
            </LinkButton>
          }
        />
        <div className="grid gap-6 lg:grid-cols-3">
          {teamMembers.map((member) => (
            <TeamMemberCard key={member.id} member={member} />
          ))}
        </div>
      </Container>
    </section>
  );
}

