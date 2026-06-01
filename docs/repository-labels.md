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
- require the `Develop Sync Gate` check to pass

For automated PRs:

- `approved` is not required
- `automation` and the corresponding flow label should be applied automatically

For `develop -> release` PRs:

- require `automation`
- require `flow:release`
- require exactly one `release:*` label

For production snapshot PRs targeting `main`:

- require `automation`
- require `flow:main`
- require a generated branch named like `ci/123-main-release-v1-2-3`

## Automatic labels

`.github/workflows/pr-auto-label.yml` derives labels from:

- PR title type and scope
- PR base branch
- PR head branch

It is intended to apply:

- `type:*`
- some `area:*` labels when they can be inferred safely
- `automation`
- `flow:release`
- `flow:main`
