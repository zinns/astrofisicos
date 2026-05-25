import { notFound } from "next/navigation";

import { ContentEntryCard } from "@/components/cards/content-entry-card";
import { LinkButton } from "@/components/ui/link-button";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import { Card } from "@/components/ui/card";
import { contentCategories, getContentCategory } from "@/content/content";
import { buildMetadata } from "@/lib/seo";

type ContentCategoryPageProps = {
  params: Promise<{
    category: string;
  }>;
};

export function generateStaticParams() {
  return contentCategories.map((category) => ({ category: category.slug }));
}

export async function generateMetadata({ params }: ContentCategoryPageProps) {
  const { category } = await params;
  const collection = getContentCategory(category);

  if (!collection) {
    return buildMetadata({ title: "Contenido", path: "/contenido" });
  }

  return buildMetadata({
    title: collection.label,
    path: collection.path,
    description: collection.description,
  });
}

export default async function ContentCategoryPage({ params }: ContentCategoryPageProps) {
  const { category } = await params;
  const collection = getContentCategory(category);

  if (!collection) {
    notFound();
  }

  return (
    <section className="section-shell">
      <Container className="space-y-10">
        <SectionHeader
          eyebrow="Contenido"
          title={collection.label}
          description={collection.description}
          action={
            <LinkButton href="/contenido" size="sm" variant="ghost">
              Volver al hub
            </LinkButton>
          }
        />
        <Card className="space-y-4">
          <h3 className="font-heading text-2xl font-semibold text-moon-50">Como usar esta seccion</h3>
          <p className="text-sm leading-7 text-moon-300">
            Cada entrada ya tiene su espacio completo dentro del sitio. Cuando lleguen enlaces reales, miniaturas o plataformas definitivas, esta estructura podra crecer sin cambiar la arquitectura base del proyecto.
          </p>
        </Card>
        <div className="grid gap-6">
          {collection.entries.map((entry) => (
            <ContentEntryCard key={entry.id} eyebrow={collection.eyebrow} entry={entry} showBody />
          ))}
        </div>
      </Container>
    </section>
  );
}
