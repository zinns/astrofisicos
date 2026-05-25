import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { LinkButton } from "@/components/ui/link-button";

type ContentCardProps = {
  category: string;
  title: string;
  description: string;
  href: string;
};

export function ContentCard({ category, title, description, href }: ContentCardProps) {
  return (
    <Card className="flex h-full flex-col justify-between gap-6">
      <div className="space-y-4">
        <Badge>{category}</Badge>
        <div className="space-y-3">
          <h3 className="font-heading text-2xl font-semibold text-moon-50">{title}</h3>
          <p className="text-sm leading-7 text-moon-300">{description}</p>
        </div>
      </div>
      <LinkButton href={href} size="sm" variant="ghost">
        Explorar contenido
      </LinkButton>
    </Card>
  );
}

