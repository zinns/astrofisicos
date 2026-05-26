# Release Workflow

## Permanent branches

- `develop`
- `release`
- `main`

`develop` is the GitHub default branch.

`main` remains the intended production branch.

## Flow

1. Work lands in `develop` through issue-linked PRs.
2. `.github/workflows/sync-release-pr.yml` ensures there is an open `develop -> release` PR and an open release-tracking issue.
3. A human sets exactly one `release:*` label on that `develop -> release` PR before merging it.
4. `.github/workflows/prepare-main-release-pr.yml` reads that label, bumps the version on `release`, and creates or updates the `release -> main` PR.
5. The `release -> main` PR carries the final release commit title `Release 📦 vX.Y.Z`.
6. `.github/workflows/post-main-release.yml` creates the Git tag and GitHub Release, closes the release-tracking issue, and creates or updates a `main -> develop` sync PR after the `main` merge.
7. While that `main -> develop` sync PR is open, other PRs targeting `develop` remain blocked.

## Metadata rules

For PRs to `develop`:

- PR title must be conventional and issue-linked
- PR body must include `Closes #123` or `Fixes #123`
- PR must have the `approved` label
- PR must not bypass an open `main -> develop` sync PR

For PRs to `release`:

- PR title should be `chore(release): prepare release candidate (#<release-tracking-issue>)`
- PR body must include `Release tracking: #<release-tracking-issue>` or `Refs #<release-tracking-issue>`
- PR must include exactly one `release:*` label
- `type:chore`, `area:infra`, `automation`, and `flow:release` are applied automatically

For PRs to `main`:

- PR title must be `Release 📦 vX.Y.Z`
- PR body must reference the release-tracking issue
- `type:chore`, `area:infra`, `automation`, and `flow:main` are applied automatically

## Principal branch safety rules

- only one `develop -> release` PR may be active at a time
- only one `release -> main` PR may be active at a time
- after a production release, the generated `main -> develop` sync PR must merge before the next `develop -> release` PR merges
- while that sync PR is open, other PRs to `develop` must remain blocked
- `release` accepts only stabilization work, not new feature work
- if a permanent-branch PR shows conflicts, restore the missing sync step instead of bypassing the branch policy

## Implemented automation

### Sync release PR

Workflow:

- `.github/workflows/sync-release-pr.yml`

Behavior:

- runs on every push to `develop`
- reuses the most recent open release-tracking issue with a title starting `[Release]:`
- creates one if none exists
- ensures there is an open PR from `develop` to `release`
- applies the automation labels for the release flow

The workflow does not choose the semver label automatically. That remains a
manual release decision.

### Prepare main release PR

Workflow:

- `.github/workflows/prepare-main-release-pr.yml`

Behavior:

- runs when a PR into `release` is merged
- fetches the merged PR live so reruns see current labels
- reads the `release:*` label from that PR
- bumps the version on `release`
- creates an automated commit titled `Release 📦 vX.Y.Z`
- creates or updates the `release -> main` PR

The workflow skips if `release` already points at a `Release 📦 ...` commit, so
reruns do not double-bump the version.

### Finalize main release

Workflow:

- `.github/workflows/post-main-release.yml`

Behavior:

- runs when the `release -> main` PR is merged
- creates or reuses the GitHub Release for `vX.Y.Z`
- creates the tag if it does not already exist
- comments on and closes the release-tracking issue
- creates or updates an automated `main -> develop` PR so the released version metadata returns to `develop`
- can be rerun manually with `workflow_dispatch` by supplying the merged `release -> main` PR number if recovery is needed

## Why the develop sync PR exists

The version bump is committed on `release` before the `release -> main` PR is
opened. Without a follow-up sync back into `develop`, the next feature cycle can
reintroduce the older version metadata and make the next `develop -> release`
PR try to roll the version backward.

The automated `main -> develop` PR prevents that drift while keeping the release
history explicit.

It also acts as a hard workflow gate: until that sync PR merges, other PRs to
`develop` should remain blocked.

See `docs/principal-branch-policy.md` for the full permanent-branch rules.
