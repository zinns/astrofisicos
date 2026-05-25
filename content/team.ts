export type TeamMember = {
  id: string;
  name: string;
  role: string;
  bio: string;
  image?: string;
  specialties: string[];
  social?: {
    label: string;
    href: string;
  }[];
};

export const teamMembers: TeamMember[] = [
  {
    id: "team-placeholder-1",
    name: "Perfil por confirmar",
    role: "Astrofisica y divulgacion",
    bio: "Este espacio se completara con la informacion oficial del equipo del cliente.",
    specialties: ["Divulgacion cientifica", "Conferencias", "Observaciones"],
  },
  {
    id: "team-placeholder-2",
    name: "Perfil por confirmar",
    role: "Coordinacion educativa",
    bio: "La biografia final se definira cuando el cliente comparta perfiles, credenciales y fotografia.",
    specialties: ["Talleres", "Experiencias escolares", "Cursos"],
  },
  {
    id: "team-placeholder-3",
    name: "Perfil por confirmar",
    role: "Contenido y comunidad",
    bio: "Se reservara este modulo para presentar la energia creadora y el enfoque de comunicacion del equipo.",
    specialties: ["Contenido", "Comunidad", "Redes sociales"],
  },
];

