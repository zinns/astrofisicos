# Astrofisicos en Accion

Root-level Next.js skeleton for the redesigned Astrofisicos en Accion website.

Package manager: `pnpm`

Current focus:

- brief-aligned information architecture
- static-first App Router pages
- typed content models for services, calendar, contact, and contenido
- reusable layout, section, and card components
- lightweight design tokens based on the existing logo
- nested content routes under `/contenido`

Legacy folders were removed after preserving the original logo asset in `public/logo/`.

Documentation index lives in `docs/README.md`.
Project notes and open backlog live in `docs/v2-project-notes.md`.
Repository workflow, CI, release, and Vercel strategy live in `docs/repository-workflow-strategy.md`.

Current Phase 1 validation commands:

- `pnpm lint`
- `pnpm lint:css`
- `pnpm typecheck`
- `pnpm test:run`
- `pnpm validate`

Current Phase 2 local gates:

- `pnpm install` configures Git hooks through Husky
- `pnpm validate` runs the local pre-commit checks with a structured summary
- `pnpm validate:branch` checks the current branch against the naming policy
- `pnpm validate:ci` runs the CI-oriented checks, including the production build
- commit messages must follow conventional commits and end with a GitHub Issue ID like `(#3)`

Current next step:

- Phase 6: deployment decision
