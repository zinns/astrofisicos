export type Service = {
  id: string;
  title: string;
  description: string;
  audience: string;
  href: string;
  ctaLabel: string;
};

export const services: Service[] = [
  {
    id: "conferencias",
    title: "Conferencias",
    description: "Charlas de astronomia y ciencia para escuelas, empresas e instituciones.",
    audience: "Escuelas, empresas, museos e instituciones",
    href: "/conferencias",
    ctaLabel: "Ver conferencias",
  },
  {
    id: "observaciones",
    title: "Observaciones Astronomicas",
    description: "Experiencias para mirar el cielo con guia cientifica y narrativa accesible.",
    audience: "Familias, escuelas, eventos y comunidades",
    href: "/observaciones",
    ctaLabel: "Agendar observacion",
  },
  {
    id: "talleres",
    title: "Talleres y demostraciones",
    description: "Actividades experimentales para aprender ciencia haciendo, tocando y preguntando.",
    audience: "Ninas, ninos, jovenes y publico general",
    href: "/talleres",
    ctaLabel: "Explorar talleres",
  },
  {
    id: "cursos",
    title: "Capacitaciones y cursos",
    description: "Programas de aprendizaje para profundizar en astronomia y divulgacion cientifica.",
    audience: "Estudiantes, docentes y entusiastas",
    href: "/cursos",
    ctaLabel: "Ver cursos",
  },
];

