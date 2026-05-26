# Contributing Guide

## Local setup

- Package manager: `pnpm`
- Runtime: Node.js `24.16.0` LTS from `.nvmrc`
- Run `nvm use` before `pnpm install` or `pnpm validate`
- Install dependencies with `pnpm install`
- Installing dependencies also configures Husky hooks through the `prepare` script

## Branch naming

All working branches must start from `develop` and include the issue ID:

- `feat/123-short-slug`
- `fix/123-short-slug`
- `chore/123-short-slug`
- `docs/123-short-slug`
- `refactor/123-short-slug`
- `test/123-short-slug`
- `ci/123-short-slug`

## Commit messages

Human-authored commits must use conventional commits and end with the GitHub Issue ID:

```txt
type(scope): summary (#123)
```

Examples:

- `feat(home): add audience CTA refinements (#21)`
- `chore(tooling): add local developer gates (#3)`

The only exception is the automated release commit:

```txt
Release 📦 vX.Y.Z
```

## Local validation

- `pnpm validate:branch`
- `pnpm validate`
- `pnpm validate:ci`

`pnpm validate` runs:

- branch-name validation
- ESLint
- Stylelint
- TypeScript typecheck
- tests

The pre-commit hook keeps running checks after a failure but blocks the commit if any required check fails.

## Git hooks

Configured hooks:

- `.husky/pre-commit`
- `.husky/commit-msg`

The pre-commit hook runs `pnpm validate`.

The commit-msg hook runs `commitlint`.

## GitHub validation

Pull requests are validated in GitHub by:

- `.github/workflows/pr-metadata.yml`
- `.github/workflows/pr-auto-label.yml`
- `.github/workflows/repository-validation.yml`

The PR metadata workflow also blocks non-sync PRs to `develop` while a
`main -> develop` sync PR is still open.

The intended required checks are documented in `docs/merge-protection.md`.

Current limitation:

- the workflows already run and report status
- branch protections and rulesets are now possible because the repository is public, but they still need to be applied as a live repository hardening step

## Principal branch rules

Read `docs/principal-branch-policy.md` before opening or merging any PR that
targets `develop`, `release`, or `main`.

The short version:

- working branches merge only into `develop`
- releases move only through `develop -> release -> main`
- after a production release, `main` must sync back into `develop`
- while that sync PR is open, other PRs to `develop` remain blocked
- if one of those sync steps is missing, fix the missing sync step before trying to resolve branch conflicts by hand
