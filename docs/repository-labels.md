# Repository Labels

## Source of truth

- Label definitions live in `.github/labels.json`
- Labels can be synced with `pnpm labels:sync`

## Required labels

### Type labels

- `type:feature`
- `type:fix`
- `type:docs`
- `type:chore`
- `type:refactor`
- `type:test`
- `type:ci`

Every PR must include exactly one appropriate `type:*` label.

### Area labels

- `area:frontend`
- `area:content`
- `area:design`
- `area:infra`
- `area:ci`
- `area:docs`

Every PR must include at least one `area:*` label.

### Lifecycle and flow labels

- `approved`
- `released`
- `automation`
- `flow:release`
- `flow:main`

### Release labels

- `release:patch`
- `release:minor`
- `release:major`

PRs targeting `release` must include exactly one release label.

## PR-specific rules

For PRs targeting `develop`:

- require `approved`

For `develop -> release` PRs:

- require `automation`
- require `flow:release`
- require exactly one `release:*` label

For `release -> main` PRs:

- require `automation`
- require `flow:main`
