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

- Keep expanding Vitest + React Testing Library coverage for navbar, homepage sections, cards, and footer.
- Decide whether formatter checks should become part of the main validation path or stay opt-in.
- Review whether additional accessibility or metadata checks should be included in CI.

### Repo and workflow

- Phase 2 local developer gates are now in place with Husky, commitlint, branch validation, and structured local validation.
- Phase 3 GitHub collaboration artifacts now cover issue forms, PR templates, labels, metadata validation, and supporting docs.
- Phase 4 CI validation now runs in GitHub with structured summaries.
- Phase 5 release automation now manages the `develop -> release` PR, prepares the `release -> main` PR, finalizes tags and GitHub Releases after merge, and syncs `main` back into `develop`.
- The repository is now public, so the earlier branch-protection and Vercel Hobby blockers caused by private-repo limits no longer apply. Live protections still need a follow-up rollout.
- Decide whether we want additional repository automation beyond validation and release flows.
- Expand root documentation with setup, architecture, design tokens, and deployment notes.
- Execute the repository workflow in phases documented in `docs/repository-workflow-strategy.md`.

### Infra, security, and deployment

- Phase 6 now defines a Git-based Vercel deployment strategy with branch allowlisting in `vercel.json` and explicit branch/environment mapping in `docs/deployment.md`.
- Decide how contact submissions will be handled without introducing unnecessary risk or complexity.
- Review CSP, metadata, robots, and analytics once content and domains are final.
- Audit the live Vercel project against the documented `main` / `release` / `develop` setup and finish the domain and environment configuration.
