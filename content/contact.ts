export type ContactChannel = {
  label: string;
  value: string;
  href: string;
  description: string;
};

export const inquiryTypes = [
  "Conferencias",
  "Observaciones astronomicas",
  "Talleres y demostraciones",
  "Cursos",
  "Contenido y colaboraciones",
];

export const contactChannels: ContactChannel[] = [
  {
    label: "Correo",
    value: "hola@pendiente-por-confirmar.com",
    href: "mailto:hola@pendiente-por-confirmar.com",
    description: "Placeholder temporal para el canal principal de cotizaciones y seguimiento.",
  },
  {
    label: "WhatsApp",
    value: "+52 000 000 0000",
    href: "https://wa.me/520000000000",
    description: "Placeholder temporal para contacto rapido y respuestas operativas.",
  },
];

