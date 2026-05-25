# Release Workflow

## Permanent branches

- `develop`
- `release`
- `main`

`develop` is the GitHub default branch.

`main` remains the intended production branch.

## Flow

1. Work lands in `develop` through issue-linked PRs.
2. A release-tracking issue defines the release candidate.
3. A PR from `develop` to `release` prepares the release candidate.
4. The version label on the `develop -> release` PR determines the semantic version bump.
5. A PR from `release` to `main` carries the final release commit title `Release 📦 vX.Y.Z`.

## Metadata rules

For PRs to `develop`:

- PR title must be conventional and issue-linked
- PR body must include `Closes #123` or `Fixes #123`
- PR must have approval and the `approved` label

For PRs to `release`:

- PR title should be `chore(release): prepare release candidate (#<release-tracking-issue>)`
- PR body must include `Release tracking: #<release-tracking-issue>` or `Refs #<release-tracking-issue>`
- PR must include exactly one `release:*` label

For PRs to `main`:

- PR title must be `Release 📦 vX.Y.Z`
- PR body must reference the release-tracking issue
