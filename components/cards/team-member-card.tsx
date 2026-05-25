import { TeamMember } from "@/content/team";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

type TeamMemberCardProps = {
  member: TeamMember;
};

export function TeamMemberCard({ member }: TeamMemberCardProps) {
  return (
    <Card className="flex h-full flex-col gap-5">
      <div className="size-20 rounded-full border border-orbit-500/30 bg-orbit-500/10" aria-hidden="true" />
      <div className="space-y-3">
        <h3 className="font-heading text-2xl font-semibold text-moon-50">{member.name}</h3>
        <p className="text-sm font-medium text-solar-400">{member.role}</p>
        <p className="text-sm leading-7 text-moon-300">{member.bio}</p>
      </div>
      <div className="flex flex-wrap gap-2">
        {member.specialties.map((specialty) => (
          <Badge key={specialty} variant="muted">
            {specialty}
          </Badge>
        ))}
      </div>
    </Card>
  );
}

