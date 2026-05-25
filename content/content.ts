export type ContentCategorySlug = "videos" | "articulos" | "pregunta-cosmica";

export type ContentEntry = {
  id: string;
  title: string;
  summary: string;
  body: string;
  publishedAt: string;
  formatLabel: string;
  platform?: string;
  duration?: string;
};

export type ContentCategory = {
  slug: ContentCategorySlug;
  label: string;
  eyebrow: string;
  path: `/contenido/${ContentCategorySlug}`;
  description: string;
  summaryDescription: string;
  entries: ContentEntry[];
};

const videos: ContentEntry[] = [
  {
    id: "video-fases-de-la-luna",
    title: "Las fases de la luna sin formulas imposibles",
    summary: "Pieza larga para explicar de forma clara por que vemos cambios de iluminacion durante el mes.",
    body: "Este bloque funciona como placeholder para un video principal de YouTube o una explicacion extensa. La idea es conservar una version resumida en el hub y una ficha mas completa aqui, con contexto, publico ideal y enlace final cuando el cliente comparta la URL real.",
    publishedAt: "2026-05-16",
    formatLabel: "Video principal",
    platform: "YouTube",
    duration: "12 min",
  },
  {
    id: "video-observacion-urbana",
    title: "Como organizar una observacion astronomica en ciudad",
    summary: "Contenido pensado para escuelas, empresas o eventos que quieren entender logistica y expectativas reales.",
    body: "Este ejemplo muestra como una pieza en video puede apoyar la conversion comercial. Explica condiciones de luz, equipo, clima, audiencia y recomendaciones practicas para que la experiencia funcione sin prometer resultados irreales.",
    publishedAt: "2026-04-25",
    formatLabel: "Video explicativo",
    platform: "YouTube",
    duration: "9 min",
  },
  {
    id: "video-mitos-del-cosmos",
    title: "Tres mitos del cosmos que conviene desmontar",
    summary: "Una pieza educativa para curiosos y audiencias generales con enfoque claro y entretenido.",
    body: "Este placeholder sirve para probar una libreria de videos mas amplia sin convertir el sitio en un blog complejo. Cada entrada puede crecer despues con miniaturas, enlaces reales y etiquetas cuando tengamos datos confirmados.",
    publishedAt: "2026-03-30",
    formatLabel: "Video educativo",
    platform: "YouTube",
    duration: "7 min",
  },
];

const articles: ContentEntry[] = [
  {
    id: "articulo-cielo-de-mayo",
    title: "Que mirar en el cielo este mes",
    summary: "Un articulo breve para conectar el calendario astronomico con recomendaciones faciles de observacion.",
    body: "La pagina completa debe servir para contenido escrito mas durable que una red social. Aqui cabe una introduccion, consejos practicos, conceptos basicos y un CTA hacia observaciones o cursos, sin necesidad de levantar un CMS en esta primera fase.",
    publishedAt: "2026-05-18",
    formatLabel: "Articulo",
    duration: "4 min de lectura",
  },
  {
    id: "articulo-telescopio-evento",
    title: "Que esperar al llevar un telescopio a tu evento",
    summary: "Texto orientado a clientes que buscan una experiencia memorable y quieren claridad sobre el formato.",
    body: "Este contenido ayuda a resolver objeciones comerciales con lenguaje simple: tiempos, requerimientos, clima, seguridad y tipos de audiencia. Tambien funciona como puente entre la inspiracion del home y el formulario de contacto.",
    publishedAt: "2026-04-21",
    formatLabel: "Articulo",
    duration: "5 min de lectura",
  },
  {
    id: "articulo-ciencia-memorable",
    title: "Por que la ciencia se recuerda mejor cuando se vive",
    summary: "Una nota para reforzar el valor pedagogico de talleres, conferencias y observaciones.",
    body: "Este placeholder representa piezas editoriales mas conceptuales. El objetivo en v2 es dejar una estructura sobria, facil de mantener y lista para alojar textos mas profundos sin inflar el stack tecnico.",
    publishedAt: "2026-03-12",
    formatLabel: "Articulo",
    duration: "6 min de lectura",
  },
];

const cosmicQuestions: ContentEntry[] = [
  {
    id: "pregunta-estrellas-parpadean",
    title: "Por que las estrellas parecen parpadear",
    summary: "Bloque corto para resolver una duda comun con tono ligero y cientificamente correcto.",
    body: "La seccion Pregunta Cosmica puede vivir entre articulo y microcontenido: suficientemente breve para enganchar, pero con el contexto necesario para reforzar autoridad. Es un formato util para redes, newsletters o futuras expansiones editoriales.",
    publishedAt: "2026-05-20",
    formatLabel: "Pregunta Cosmica",
    duration: "2 min de lectura",
  },
  {
    id: "pregunta-pluton",
    title: "Por que Pluton ya no cuenta como planeta",
    summary: "Respuesta rapida a una duda muy frecuente, util para trafico organico y educacion informal.",
    body: "Este placeholder ayuda a definir un patron reutilizable para preguntas frecuentes sobre astronomia. En lugar de montar una base de conocimiento entera, v2 puede comenzar con pocas piezas curadas y bien escritas.",
    publishedAt: "2026-04-10",
    formatLabel: "Pregunta Cosmica",
    duration: "2 min de lectura",
  },
  {
    id: "pregunta-luna-grande",
    title: "Por que la luna se ve mas grande cerca del horizonte",
    summary: "Ejemplo de contenido corto pensado para curiosidad inmediata y alto potencial de compartirse.",
    body: "La idea aqui es demostrar una tercera via dentro de contenido: piezas compactas, claras y muy reutilizables en social media. Mas adelante podran enlazar a videos, reels o recursos educativos relacionados.",
    publishedAt: "2026-03-05",
    formatLabel: "Pregunta Cosmica",
    duration: "2 min de lectura",
  },
];

export const contentCategories: ContentCategory[] = [
  {
    slug: "videos",
    label: "Videos y piezas largas",
    eyebrow: "Video destacado",
    path: "/contenido/videos",
    description: "Ruta para videos largos, explicaciones, entrevistas y piezas principales de YouTube.",
    summaryDescription: "Resumen de videos largos y piezas principales para profundizar en conceptos, experiencias y divulgacion.",
    entries: videos,
  },
  {
    slug: "articulos",
    label: "Articulos y recursos",
    eyebrow: "Articulo",
    path: "/contenido/articulos",
    description: "Contenido escrito para ampliar ideas, explicar procesos y conectar curiosidad con servicios.",
    summaryDescription: "Notas y recursos escritos que ayudan a responder preguntas, reforzar confianza y mejorar SEO.",
    entries: articles,
  },
  {
    slug: "pregunta-cosmica",
    label: "Pregunta Cosmica",
    eyebrow: "Microcontenido",
    path: "/contenido/pregunta-cosmica",
    description: "Formato breve para dudas comunes, descubrimiento organico y piezas faciles de compartir.",
    summaryDescription: "Respuestas cortas a preguntas frecuentes del universo, con tono claro y base cientifica.",
    entries: cosmicQuestions,
  },
];

export function getContentCategory(slug: string) {
  return contentCategories.find((category) => category.slug === slug);
}

