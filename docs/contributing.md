# Contributing Guide

## Local setup

- Package manager: `pnpm`
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

The intended required checks are documented in `docs/merge-protection.md`.

Current limitation:

- the repository is private and the current GitHub plan does not allow branch protections or rulesets here yet
- the workflows run and report status, but GitHub cannot mark them as mandatory merge checks until that blocker is removed
