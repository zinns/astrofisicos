# V2 Project Notes

## Confirmed Decisions

- The new project lives at the repository root. There will be no `v2/` folder.
- The main IA follows the brief: `/`, `/servicios`, `/conferencias`, `/observaciones`, `/talleres`, `/cursos`, `/calendario-astronomico`, `/contenido`, `/equipo`, `/contacto`.
- `/contenido` stays as a hub page and now also supports child routes for fuller content views.
- The hub must summarize the latest pieces, starting with at least one latest video and one latest article.
- `/contacto` should expose both mail and WhatsApp paths from the start, even while the operational data remains placeholder-only.
- Team, contact, social, and content details remain placeholders until the client confirms real data.

## Architecture Notes

- Content is now modeled in typed files under `/content` instead of hardcoded page arrays.
- `/contenido/[category]` is the first reusable nested-route pattern in the app and should remain static-first.
- Contact channels live in typed content data as well, so page copy and future integrations do not drift apart.
- Logo assets were preserved in `/public/logo` and remain the visual source of truth for future refinement.

## Near-Term Backlog

### Product and content

- Confirm real contact data for mail, WhatsApp, social profiles, and response expectations.
- Replace placeholder content entries with real videos, articles, and short-form pieces.
- Decide whether reels deserve their own child route or should remain grouped under social distribution.

### Engineering quality

- Add the real linting setup, including ESLint configuration and formatting conventions.
- Install dependencies and run the first validation pass for type-checking, linting, build, and tests.
- Add Vitest + React Testing Library coverage for navbar, homepage sections, cards, and footer.

### Repo and workflow

- Phase 2 local developer gates are now in place with Husky, commitlint, branch validation, and structured local validation.
- Define PR templates and GitHub hygiene for future collaboration.
- Decide whether we want CI automations only or both CI and repository automation for verification tasks.
- Expand root documentation with setup, architecture, design tokens, and deployment notes.
- Execute the repository workflow in phases documented in `docs/repository-workflow-strategy.md`.

### Infra, security, and deployment

- Document the initial deployment target and environment strategy.
- Decide how contact submissions will be handled without introducing unnecessary risk or complexity.
- Review CSP, metadata, robots, and analytics once content and domains are final.
- Resolve the Vercel blocker created by the current combination of private GitHub organization repository and Hobby account before planning Git-based deployment.
