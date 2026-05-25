# Astrofísicos en Acción Website Redesign - Codex Development Brief

**Project:** Astrofísicos en Acción website redesign  
**Client type:** Group of astrophysicists, science communicators, and content creators  
**Primary website:** https://astrofisicosenaccion.com/  
**Document purpose:** Provide Codex with enough strategic, technical, visual, and content direction to begin the development phase without losing the redesign intent.  
**Status:** Pre-development strategy ready for implementation  
**Language:** Spanish-first website, with structure prepared for future bilingual support if required  

---

## 1. Executive Summary

Astrofísicos en Acción currently has a website that communicates services and basic information, but it does not feel engaging enough for a creator-led science communication brand. The redesign should transform the site from a static brochure into a modern, immersive, high-trust digital platform.

The new website must feel like a **modern observatory, creator hub, and educational science lab**. It should help visitors understand the brand, explore content, discover astronomical experiences, and contact the team to hire conferences, observations, workshops, and courses.

The development phase should prioritize:

- Clear information architecture.
- Strong visual identity based on the existing logo and cosmic theme.
- Conversion-oriented pages.
- High performance.
- SEO-friendly content structure.
- Reusable design system components.
- Testing with Vitest.
- Accessibility-conscious implementation.

---

## 2. Brand Understanding

### 2.1 Brand Name

**Astrofísicos en Acción**

The name communicates movement, science, and active outreach. The redesign should make the “en acción” part feel alive through interaction, motion, dynamic sections, strong CTAs, and content blocks.

### 2.2 Brand Essence

> Professional astrophysicists and science communicators bringing the universe closer to people through content, experiences, conferences, observations, workshops, and courses.

### 2.3 Strategic Positioning

Astrofísicos en Acción should not be presented as a generic astronomy website. It should be positioned as a **science communication platform**.

The website must combine:

| Dimension | Meaning |
|---|---|
| Scientific authority | They are professionals and educators, not generic space influencers. |
| Creator energy | They produce content, explain topics, and interact with audiences. |
| Cosmic wonder | Visitors should feel curiosity, awe, and desire to explore. |
| Conversion clarity | Schools, companies, institutions, families, and events should know how to hire them. |

### 2.4 Suggested Brand Promise

> Acercamos el universo a las personas con ciencia, experiencias y contenido que despierta la curiosidad.

Alternative emotional line:

> El universo no está lejos. Solo necesita mejores narradores.

---

## 3. Existing Brand Assets and Visual Direction

### 3.1 Logo Interpretation

The current logo appears to contain:

- A black circular background.
- A stylized lowercase “a” built with orbital lines.
- A yellow celestial body.
- Blue orbit-like strokes.
- Small planet/Earth-like accents.
- The text “Astrofísicos en Acción” in white.

The logo concept is strong and should be preserved. It already contains the core visual language: orbit, motion, cosmos, science, and exploration.

### 3.2 Logo Usage Strategy

Required logo variants to prepare in `/public/logo/`:

```txt
logo-primary.svg
logo-mark.svg
logo-horizontal.svg
logo-white.svg
logo-dark.svg
favicon.svg
apple-touch-icon.png
opengraph-image.png
```

Rules:

- Use the full logo in the navbar on desktop.
- Use the symbol/mark version on small mobile spaces.
- Use white or high-contrast versions on dark backgrounds.
- Do not place the logo over busy galaxy images without a dark overlay.
- Preserve clear spacing around the logo.

---

## 4. Website Goals

### 4.1 Primary Goal

Generate qualified interest for hiring Astrofísicos en Acción services.

Primary conversion:

```txt
Solicitar información / Contratar una experiencia
```

### 4.2 Secondary Goals

- Increase engagement with their content.
- Send users to social media and YouTube.
- Promote astronomical observations and events.
- Build trust through team credentials and social proof.
- Improve SEO for astronomy-related services and educational topics.

### 4.3 Target Audiences

| Audience | Need |
|---|---|
| Schools | Conferences, workshops, science activities, educational experiences. |
| Companies | Talks, science events, team experiences, special activations. |
| Families | Astronomical observations and accessible learning. |
| Museums / cultural institutions | Professional science communication and public events. |
| Existing followers | Content, calendar, videos, and community updates. |
| Curious visitors | Easy entry points into astronomy. |

---

## 5. Recommended Tech Stack

Use exact versions in `package.json`.

> Important: These versions were checked during strategy creation. Reconfirm versions during actual implementation if package installation fails, because frontend packages move fast.

### 5.1 Core Dependencies

```json
{
  "dependencies": {
    "next": "16.2.6",
    "react": "19.2.6",
    "react-dom": "19.2.6"
  },
  "devDependencies": {
    "typescript": "6.0.3",
    "tailwindcss": "4.3.0",
    "@tailwindcss/postcss": "4.3.0",
    "postcss": "8.5.6",
    "vitest": "4.1.7",
    "jsdom": "29.1.1",
    "@testing-library/react": "16.3.2",
    "@testing-library/jest-dom": "6.9.1",
    "eslint": "10.4.0",
    "prettier": "3.8.3"
  }
}
```

### 5.2 Framework Decisions

| Tool | Purpose |
|---|---|
| Next.js App Router | Routing, SEO metadata, server-first architecture. |
| React | Component-based UI. |
| TypeScript | Strong typing and safer refactors. |
| Tailwind CSS v4 | Design system implementation through CSS tokens. |
| Vitest | Unit and component testing. |
| React Testing Library | Test UI behavior from the user’s perspective. |
| jsdom | Browser-like test environment for component tests. |

### 5.3 Package Manager

Recommended: `npm`, unless the team prefers `pnpm`.

If using npm, set exact versions:

```bash
npm config set save-exact true
```

---

## 6. Technical Architecture

### 6.1 Recommended Folder Structure

```txt
astrofisicos-en-accion/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── servicios/
│   │   └── page.tsx
│   ├── conferencias/
│   │   └── page.tsx
│   ├── observaciones/
│   │   └── page.tsx
│   ├── talleres/
│   │   └── page.tsx
│   ├── cursos/
│   │   └── page.tsx
│   ├── calendario-astronomico/
│   │   └── page.tsx
│   ├── contenido/
│   │   └── page.tsx
│   ├── equipo/
│   │   └── page.tsx
│   └── contacto/
│       └── page.tsx
├── components/
│   ├── cards/
│   ├── layout/
│   ├── motion/
│   ├── sections/
│   └── ui/
├── content/
│   ├── calendar.ts
│   ├── navigation.ts
│   ├── services.ts
│   ├── social.ts
│   └── team.ts
├── lib/
│   ├── cn.ts
│   ├── constants.ts
│   └── seo.ts
├── public/
│   ├── icons/
│   ├── images/
│   ├── logo/
│   └── social/
├── styles/
│   └── globals.css
├── tests/
│   ├── components/
│   └── pages/
├── postcss.config.mjs
├── vitest.config.ts
├── tsconfig.json
├── package.json
└── README.md
```

### 6.2 Architecture Principles

- Prefer static-first pages where possible.
- Keep content in typed files under `/content` for MVP.
- Use reusable section components.
- Avoid hardcoding repeated strings across page files.
- Keep UI primitives separate from page sections.
- Keep decorative motion isolated in `/components/motion`.
- Use semantic HTML.
- Use Next.js metadata per route.
- Avoid client components unless interaction requires them.

---

## 7. Information Architecture

### 7.1 Main Navigation

```txt
Inicio
Servicios
Contenido
Calendario Astronómico
Equipo
Contacto
```

Persistent CTA:

```txt
Contratar experiencia
```

### 7.2 Sitemap

```txt
/
├── /servicios
├── /conferencias
├── /observaciones
├── /talleres
├── /cursos
├── /calendario-astronomico
├── /contenido
├── /equipo
└── /contacto
```

### 7.3 Homepage Sections

1. Hero: Mission Control
2. Trust strip
3. Choose your mission / services
4. Featured content
5. Upcoming cosmic events
6. For schools, companies, and events
7. Meet the team
8. Final CTA

---

## 8. Page Requirements

### 8.1 Home Page `/`

Purpose: Introduce the brand, create emotional impact, and route visitors to services or content.

Sections:

- Hero with primary and secondary CTA.
- Trust strip.
- Service cards.
- Featured content.
- Upcoming astronomical events.
- Audience-specific CTA block.
- Team preview.
- Final CTA.

Suggested hero copy:

```txt
El universo, explicado por quienes lo estudian.
```

Suggested subheadline:

```txt
Conferencias, observaciones astronómicas, talleres y contenido científico para acercar el cosmos a escuelas, empresas, eventos y mentes curiosas.
```

Primary CTA:

```txt
Contratar una experiencia
```

Secondary CTA:

```txt
Explorar contenido
```

### 8.2 Services Page `/servicios`

Purpose: Present all commercial/educational services clearly.

Service categories:

- Conferencias
- Observaciones Astronómicas
- Talleres y demostraciones experimentales
- Capacitaciones y cursos

Each service card should include:

- Title
- Short description
- Ideal audience
- Duration or format if available
- CTA

### 8.3 Conferences Page `/conferencias`

Purpose: Convert schools, companies, and institutions interested in talks.

Sections:

- Hero
- Topics
- Audience fit
- Format options
- Benefits
- Trust proof
- Contact CTA

### 8.4 Observations Page `/observaciones`

Purpose: Explain astronomical observations as an experience.

Sections:

- Hero
- What is included
- Who it is for
- Requirements
- Possible locations
- Safety/logistics note
- Contact CTA

### 8.5 Workshops Page `/talleres`

Purpose: Present interactive science workshops and demonstrations.

Sections:

- Hero
- Workshop types
- Educational outcomes
- Audience levels
- Contact CTA

### 8.6 Courses Page `/cursos`

Purpose: Present training and courses.

Sections:

- Hero
- Course formats
- Topics
- Audience levels
- Contact CTA

### 8.7 Calendar Page `/calendario-astronomico`

Purpose: Provide useful astronomical events and reasons to return.

MVP can use static content from `/content/calendar.ts`.

Event card fields:

```ts
export type AstronomicalEvent = {
  id: string;
  title: string;
  date: string;
  type: 'eclipse' | 'meteor-shower' | 'moon' | 'planet' | 'talk' | 'other';
  description: string;
  visibility?: string;
  ctaLabel?: string;
  ctaHref?: string;
};
```

### 8.8 Content Page `/contenido`

Purpose: Route users to videos, reels, articles, and social channels.

Sections:

- Featured video area
- Content categories
- Social media links
- Suggested “Pregunta Cósmica” block

### 8.9 Team Page `/equipo`

Purpose: Humanize the group and increase trust.

Team member fields:

```ts
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
```

### 8.10 Contact Page `/contacto`

Purpose: Convert interest into messages.

MVP contact options:

- Contact form placeholder or mailto CTA.
- WhatsApp link if available.
- Social media links.
- Service interest selector.

Recommended form fields:

```txt
Nombre
Correo
Institución / empresa
Tipo de experiencia
Fecha estimada
Mensaje
```

---

## 9. Design System

### 9.1 Design Direction

The interface should feel like:

```txt
Modern observatory + creator platform + educational science lab
```

Avoid:

- Generic galaxy wallpaper overload.
- Academic PDF styling.
- Cold institutional tone.
- Excessive animation.
- Random colors outside the palette.

### 9.2 Color Tokens

Use a dark-first cosmic palette inspired by the current logo.

```css
:root {
  --color-space-950: #050711;
  --color-space-900: #0b0d17;
  --color-space-800: #111827;

  --color-orbit-500: #00aeef;
  --color-orbit-600: #008fd1;

  --color-solar-400: #ffc21a;
  --color-solar-500: #f5a400;

  --color-nebula-500: #e843b6;
  --color-earth-500: #45c86a;

  --color-moon-50: #ffffff;
  --color-moon-100: #f4f7fb;
  --color-moon-300: #c8d2e0;
  --color-moon-500: #8a97aa;
}
```

### 9.3 Color Usage

| Token | Usage |
|---|---|
| `space-950` | Main page background. |
| `space-900` | Section background. |
| `space-800` | Cards and elevated surfaces. |
| `orbit-500` | Primary CTAs, links, active states. |
| `orbit-600` | CTA hover state. |
| `solar-400` | Highlights, tags, important secondary CTA. |
| `solar-500` | Hover or deeper solar accent. |
| `nebula-500` | Small decorative accent only. |
| `earth-500` | Success, community, Earth references. |
| `moon-50` | Primary text. |
| `moon-300` | Secondary text. |
| `moon-500` | Muted text. |

Forbidden:

- Large magenta backgrounds.
- Multiple gradients fighting in the same section.
- Low-contrast blue text on dark backgrounds.
- One-off colors not defined as tokens.

### 9.4 Typography

Recommended fonts:

| Role | Font |
|---|---|
| Headings | Space Grotesk |
| Body | Inter |
| Mono / labels | JetBrains Mono |

Typography scale:

```txt
Display: 64px / 72px / -2%
H1: 56px / 64px / -2%
H2: 40px / 48px / -1%
H3: 28px / 36px
Body large: 20px / 32px
Body: 16px / 26px
Small: 14px / 22px
Micro: 12px / 18px
```

Mobile scale should reduce display and H1 sizes to avoid oversized hero text.

### 9.5 Spacing

Use an 8px base system:

```txt
4px
8px
12px
16px
24px
32px
48px
64px
96px
128px
```

Rules:

- Desktop sections: minimum `96px` vertical padding.
- Mobile sections: minimum `64px` vertical padding.
- Cards: minimum `24px` padding.
- Main container: max width around `1200px`.
- Text blocks: max width around `720px`.

### 9.6 Radius and Shadows

```css
:root {
  --radius-card: 1.5rem;
  --radius-button: 999px;
  --shadow-cosmic: 0 0 40px rgb(0 174 239 / 0.18);
  --shadow-solar: 0 0 32px rgb(255 194 26 / 0.22);
}
```

### 9.7 Tailwind v4 Theme Setup

Create or update `styles/globals.css`:

```css
@import "tailwindcss";

@theme {
  --font-heading: "Space Grotesk", sans-serif;
  --font-body: "Inter", sans-serif;
  --font-mono: "JetBrains Mono", monospace;

  --color-space-950: #050711;
  --color-space-900: #0b0d17;
  --color-space-800: #111827;

  --color-orbit-500: #00aeef;
  --color-orbit-600: #008fd1;

  --color-solar-400: #ffc21a;
  --color-solar-500: #f5a400;

  --color-nebula-500: #e843b6;
  --color-earth-500: #45c86a;

  --color-moon-50: #ffffff;
  --color-moon-100: #f4f7fb;
  --color-moon-300: #c8d2e0;
  --color-moon-500: #8a97aa;

  --radius-card: 1.5rem;
  --radius-button: 999px;

  --shadow-cosmic: 0 0 40px rgb(0 174 239 / 0.18);
  --shadow-solar: 0 0 32px rgb(255 194 26 / 0.22);
}

@layer base {
  html {
    scroll-behavior: smooth;
  }

  body {
    background: var(--color-space-950);
    color: var(--color-moon-50);
    font-family: var(--font-body);
  }

  ::selection {
    background: var(--color-solar-400);
    color: var(--color-space-950);
  }
}
```

### 9.8 PostCSS Setup

Create `postcss.config.mjs`:

```js
const config = {
  plugins: {
    '@tailwindcss/postcss': {},
  },
};

export default config;
```

---

## 10. Component Inventory

### 10.1 UI Primitives

Create inside `/components/ui/`:

```txt
Button.tsx
Badge.tsx
Card.tsx
Container.tsx
SectionHeader.tsx
LinkButton.tsx
```

### 10.2 Layout Components

Create inside `/components/layout/`:

```txt
Navbar.tsx
Footer.tsx
MobileMenu.tsx
```

### 10.3 Section Components

Create inside `/components/sections/`:

```txt
HeroSection.tsx
TrustStrip.tsx
ServicesSection.tsx
FeaturedContentSection.tsx
CalendarPreviewSection.tsx
AudienceSection.tsx
TeamPreviewSection.tsx
FinalCtaSection.tsx
```

### 10.4 Card Components

Create inside `/components/cards/`:

```txt
ServiceCard.tsx
ContentCard.tsx
EventCard.tsx
TeamMemberCard.tsx
MetricCard.tsx
```

### 10.5 Motion / Decorative Components

Create inside `/components/motion/`:

```txt
CosmicBackground.tsx
OrbitGraphic.tsx
StarField.tsx
```

Motion rules:

- Keep CSS-first when possible.
- Avoid heavy animation libraries in MVP.
- Respect `prefers-reduced-motion`.
- Motion should support attention, not distract.

---

## 11. Content Models

### 11.1 Navigation

`/content/navigation.ts`

```ts
export const navigationItems = [
  { label: 'Inicio', href: '/' },
  { label: 'Servicios', href: '/servicios' },
  { label: 'Contenido', href: '/contenido' },
  { label: 'Calendario Astronómico', href: '/calendario-astronomico' },
  { label: 'Equipo', href: '/equipo' },
  { label: 'Contacto', href: '/contacto' },
];
```

### 11.2 Services

`/content/services.ts`

```ts
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
    id: 'conferencias',
    title: 'Conferencias',
    description: 'Charlas de astronomía y ciencia para escuelas, empresas e instituciones.',
    audience: 'Escuelas, empresas, museos e instituciones',
    href: '/conferencias',
    ctaLabel: 'Ver conferencias',
  },
  {
    id: 'observaciones',
    title: 'Observaciones Astronómicas',
    description: 'Experiencias para mirar el cielo con guía científica y narrativa accesible.',
    audience: 'Familias, escuelas, eventos y comunidades',
    href: '/observaciones',
    ctaLabel: 'Agendar observación',
  },
  {
    id: 'talleres',
    title: 'Talleres y demostraciones',
    description: 'Actividades experimentales para aprender ciencia haciendo, tocando y preguntando.',
    audience: 'Niñas, niños, jóvenes y público general',
    href: '/talleres',
    ctaLabel: 'Explorar talleres',
  },
  {
    id: 'cursos',
    title: 'Capacitaciones y cursos',
    description: 'Programas de aprendizaje para profundizar en astronomía y divulgación científica.',
    audience: 'Estudiantes, docentes y entusiastas',
    href: '/cursos',
    ctaLabel: 'Ver cursos',
  },
];
```

### 11.3 Calendar Events

`/content/calendar.ts`

```ts
export type AstronomicalEvent = {
  id: string;
  title: string;
  date: string;
  type: 'eclipse' | 'meteor-shower' | 'moon' | 'planet' | 'talk' | 'other';
  description: string;
  visibility?: string;
  ctaLabel?: string;
  ctaHref?: string;
};

export const astronomicalEvents: AstronomicalEvent[] = [
  {
    id: 'placeholder-event-1',
    title: 'Próximo evento astronómico',
    date: '2026-06-01',
    type: 'other',
    description: 'Actualiza este contenido con los próximos eventos astronómicos confirmados.',
    visibility: 'Por confirmar',
  },
];
```

### 11.4 Social Links

`/content/social.ts`

```ts
export type SocialLink = {
  label: string;
  href: string;
};

export const socialLinks: SocialLink[] = [
  { label: 'YouTube', href: '#' },
  { label: 'Instagram', href: '#' },
  { label: 'Facebook', href: '#' },
  { label: 'TikTok', href: '#' },
  { label: 'X', href: '#' },
];
```

Use real URLs when available.

---

## 12. CTA and Copy Guidelines

### 12.1 Preferred CTAs

Use:

```txt
Contratar una experiencia
Explorar contenido
Iniciar misión
Ver próximos eventos
Llevar astronomía a mi escuela
Agendar una observación
Solicitar información
```

Avoid generic CTAs:

```txt
Leer más
Enviar
Servicios
Más información
```

### 12.2 Tone

The copy should be:

- Clear.
- Warm.
- Scientifically credible.
- Curious.
- Energetic.
- Accessible.

Do not use pseudo-science language. Avoid exaggerated cosmic mysticism. The brand is about real astronomy and science communication.

---

## 13. SEO Requirements

### 13.1 Global Metadata

Suggested default title:

```txt
Astrofísicos en Acción | Astronomía, conferencias y experiencias científicas
```

Suggested default description:

```txt
Conferencias, observaciones astronómicas, talleres y contenido de divulgación científica para acercar el universo a escuelas, empresas, eventos y mentes curiosas.
```

### 13.2 Page Metadata

Each page should define:

- `title`
- `description`
- Open Graph title
- Open Graph description
- Open Graph image
- Canonical route

### 13.3 SEO Keywords to Consider

```txt
astrofísicos en acción
astronomía para escuelas
conferencias de astronomía
observaciones astronómicas
cursos de astronomía
talleres de ciencia
divulgación científica
calendario astronómico
astronomía en México
```

---

## 14. Accessibility Requirements

- Use semantic landmarks: `header`, `main`, `section`, `footer`, `nav`.
- Buttons must be actual buttons when performing actions.
- Links must be actual anchors for navigation.
- Every interactive element needs visible focus states.
- Avoid contrast failures, especially blue-on-black text.
- Decorative images should use empty alt text.
- Informative images need meaningful alt text.
- Respect `prefers-reduced-motion`.
- Mobile nav must be keyboard accessible.
- Do not rely on color alone to communicate state.

---

## 15. Performance Requirements

- Use `next/image` for images.
- Use `next/font` for Google/local fonts if possible.
- Avoid heavy video embeds on initial load.
- Lazy-load non-critical media.
- Keep star/space backgrounds CSS-based or optimized SVG.
- Avoid giant unoptimized galaxy images.
- Avoid unnecessary client components.
- Use static generation for content pages when possible.

Performance mindset:

> Build a telescope, not a black hole.

---

## 16. Testing Strategy

### 16.1 Vitest Config

Create `vitest.config.ts`:

```ts
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./tests/setup.ts'],
  },
});
```

Create `tests/setup.ts`:

```ts
import '@testing-library/jest-dom/vitest';
```

### 16.2 Initial Tests

Create tests for:

```txt
Button renders correct variant
Navbar displays primary navigation
ServiceCard renders title, description, and CTA
EventCard renders event information
Homepage renders main heading and primary CTA
Footer renders social links
```

### 16.3 Test Philosophy

- Test visible behavior, not internal implementation.
- Use accessible queries where possible.
- Do not snapshot everything.
- Protect reusable components first.

---

## 17. Initial Development Tasks for Codex

### Task 1: Project Setup

Create a Next.js App Router project with TypeScript, Tailwind CSS v4, and Vitest.

Acceptance criteria:

- App runs locally.
- Tailwind classes work.
- Vitest runs.
- ESLint and Prettier scripts exist.
- Exact versions are used in `package.json`.

Suggested scripts:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint .",
    "format": "prettier --write .",
    "test": "vitest",
    "test:run": "vitest run",
    "test:watch": "vitest --watch"
  }
}
```

### Task 2: Add Design Tokens

Implement colors, fonts, radius, shadows, and base styles in `styles/globals.css`.

Acceptance criteria:

- Body uses dark background.
- Theme tokens are available as Tailwind utility classes.
- Selection style works.

### Task 3: Create Content Files

Create:

```txt
content/navigation.ts
content/services.ts
content/calendar.ts
content/social.ts
content/team.ts
```

Acceptance criteria:

- Content is typed.
- UI consumes content from these files.
- No repeated hardcoded service arrays inside components.

### Task 4: Build UI Primitives

Create:

```txt
Button
Badge
Card
Container
SectionHeader
```

Acceptance criteria:

- Components are typed.
- Components support className extension.
- Button supports variants.
- Components are reusable and accessible.

### Task 5: Build Layout

Create:

```txt
Navbar
Footer
```

Acceptance criteria:

- Navigation uses `navigationItems`.
- CTA is visible.
- Footer includes social links.
- Mobile layout does not break.

### Task 6: Build Homepage

Create all homepage sections.

Acceptance criteria:

- Hero renders headline and CTAs.
- Services are displayed from content model.
- Calendar preview exists.
- Team preview placeholder exists.
- Final CTA exists.
- Page is responsive.

### Task 7: Build Service Pages

Create service overview and individual service pages.

Acceptance criteria:

- `/servicios` shows all services.
- `/conferencias`, `/observaciones`, `/talleres`, `/cursos` exist.
- Each page has SEO metadata.
- Each page has conversion CTA.

### Task 8: Add Tests

Add initial component tests.

Acceptance criteria:

- `npm run test:run` passes.
- Tests cover Button, Navbar, ServiceCard, EventCard, and Homepage basics.

---

## 18. Definition of Done for First Development Milestone

The first milestone is complete when:

- Project installs successfully.
- App runs locally.
- Tailwind v4 tokens are configured.
- Core layout is implemented.
- Homepage exists and is responsive.
- Service pages exist.
- Metadata is configured.
- At least 5 component/page tests pass.
- No random colors are used outside design tokens.
- No large unoptimized images are required for the MVP.

---

## 19. Implementation Constraints

- Do not add a CMS in the first milestone.
- Do not add heavy animation libraries in the first milestone.
- Do not add YouTube API integration yet.
- Do not build complex booking logic yet.
- Do not over-engineer dynamic routes unless useful.
- Do not replace strategy with decoration.

MVP first. Nebula later.

---

## 20. Future Enhancements

Post-MVP ideas:

- CMS integration with Sanity, Contentful, or Payload.
- Blog/articles section.
- YouTube API integration.
- Dynamic astronomical calendar.
- Newsletter.
- Event booking.
- Downloadable educational resources.
- Bilingual support.
- Interactive “Pregunta Cósmica” module.
- Mini astronomy glossary.
- Speaker/media kit download.

---

## 21. References Checked During Strategy

- Next.js package and official docs indicated Next.js `16.2.6` as the latest stable version during this planning phase.
- npm indicated React `19.2.6`.
- npm indicated Tailwind CSS `4.3.0`.
- npm indicated Vitest `4.1.7`.
- npm indicated TypeScript `6.0.3`.
- npm indicated ESLint `10.4.0`.
- React Testing Library docs emphasize tests that resemble how users interact with the software.

Reconfirm before final implementation if package installation fails.

---

## 22. Final Creative Direction

Do not build a generic “space-themed website.”

Build a science communication platform that makes visitors want to:

```txt
Watch
Learn
Ask
Attend
Hire
Return
```

A good redesign should make Astrofísicos en Acción feel credible, alive, educational, and spectacular without losing clarity.

The website should become the brand’s mission control.
