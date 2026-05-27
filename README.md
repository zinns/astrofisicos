# Astrofisicos en Accion

Next.js App Router repository for the redesigned Astrofisicos en Accion
website.

Current production URL:

- [astrofisicos.vercel.app](https://astrofisicos.vercel.app/)

## Project baseline

- package manager: `pnpm`
- runtime selector: `.nvmrc` tracks `lts/*`
- app shape: static-first Next.js routes with typed content data
- analytics: Vercel Web Analytics is wired through `@vercel/analytics`
- release flow: `develop -> release -> main -> develop`

As of May 27, 2026, the current Node.js LTS line resolved by `.nvmrc` is
`v24.16.0`. Use `nvm install --lts && nvm use` before local work if your
machine is not already on the active LTS line.

## Validation

- `pnpm lint`
- `pnpm lint:css`
- `pnpm typecheck`
- `pnpm test:run`
- `pnpm validate`
- `pnpm validate:ci`

`pnpm install` configures Husky hooks. Local commits are blocked unless branch
name validation, linting, typechecking, and tests pass.

## Workflow guardrails

- human work branches start from `develop` and include the GitHub issue ID
- commits must be conventional and end with `(#<issue-id>)`
- human PRs target `develop` only
- `release` is a permanent branch and must never be auto-deleted
- if an automated `main -> develop` sync PR is open, other PRs to `develop`
  stay blocked until it merges

## Docs

Start with [docs/README.md](/Users/edgarzea/dev/zinns/astrofisicos/docs/README.md).

Key references:

- [Contributing Guide](/Users/edgarzea/dev/zinns/astrofisicos/docs/contributing.md)
- [Deployment Guide](/Users/edgarzea/dev/zinns/astrofisicos/docs/deployment.md)
- [GitHub Collaboration](/Users/edgarzea/dev/zinns/astrofisicos/docs/github-collaboration.md)
- [CI And Merge Protection](/Users/edgarzea/dev/zinns/astrofisicos/docs/merge-protection.md)
- [Principal Branch Policy](/Users/edgarzea/dev/zinns/astrofisicos/docs/principal-branch-policy.md)
- [Release Workflow](/Users/edgarzea/dev/zinns/astrofisicos/docs/release-workflow.md)

## Current implementation focus

- continue the brief-aligned website build at the repository root
- replace placeholder content and contact data as the client confirms it
- expand UI and route coverage with Vitest and React Testing Library
