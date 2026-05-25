import { Container } from "@/components/ui/container";

const trustPoints = [
  "Astrofisicos y comunicadores cientificos",
  "Experiencias para escuelas, empresas y eventos",
  "Contenido en espanol con enfoque accesible",
];

export function TrustStrip() {
  return (
    <section className="border-y border-white/10 bg-space-900/60 py-6">
      <Container>
        <ul className="flex flex-col gap-3 text-sm font-medium text-moon-100 md:flex-row md:items-center md:justify-between">
          {trustPoints.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

