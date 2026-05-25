import { Service } from "@/content/services";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { LinkButton } from "@/components/ui/link-button";

type ServiceCardProps = {
  service: Service;
};

export function ServiceCard({ service }: ServiceCardProps) {
  return (
    <Card className="flex h-full flex-col justify-between gap-6">
      <div className="space-y-4">
        <Badge variant="solar">Servicio</Badge>
        <div className="space-y-3">
          <h3 className="font-heading text-2xl font-semibold text-moon-50">{service.title}</h3>
          <p className="text-sm leading-7 text-moon-300">{service.description}</p>
          <p className="text-sm text-moon-500">Ideal para: {service.audience}</p>
        </div>
      </div>
      <LinkButton href={service.href} size="sm" variant="ghost">
        {service.ctaLabel}
      </LinkButton>
    </Card>
  );
}

