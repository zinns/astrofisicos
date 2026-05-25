import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { LinkButton } from "@/components/ui/link-button";
import type { ContentEntry } from "@/content/content";

type ContentEntryCardProps = {
  entry: ContentEntry;
  eyebrow: string;
  href?: string;
  ctaLabel?: string;
  showBody?: boolean;
};

const contentDateFormatter = new Intl.DateTimeFormat("es-MX", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

function isMetaItem(item: string | undefined) {
  return Boolean(item);
}

export function ContentEntryCard({
  entry,
  eyebrow,
  href,
  ctaLabel = "Ver detalle",
  showBody = false,
}: ContentEntryCardProps) {
  const metaItems = [
    contentDateFormatter.format(new Date(entry.publishedAt)),
    entry.formatLabel,
    entry.platform,
    entry.duration,
  ].filter(isMetaItem);

  return (
    <Card id={entry.id} className="flex h-full flex-col justify-between gap-6">
      <div className="space-y-4">
        <Badge variant="solar">{eyebrow}</Badge>
        <div className="space-y-3">
          <h3 className="font-heading text-2xl font-semibold text-moon-50">{entry.title}</h3>
          <p className="text-sm leading-7 text-moon-300">{entry.summary}</p>
        </div>
        <ul className="flex flex-wrap gap-2 text-xs uppercase tracking-[0.14em] text-moon-500">
          {metaItems.map((item) => (
            <li key={item} className="rounded-full border border-white/10 px-3 py-1">
              {item}
            </li>
          ))}
        </ul>
        {showBody ? <p className="text-sm leading-7 text-moon-300">{entry.body}</p> : null}
      </div>
      {href ? (
        <LinkButton href={href} size="sm" variant="ghost">
          {ctaLabel}
        </LinkButton>
      ) : null}
    </Card>
  );
}
