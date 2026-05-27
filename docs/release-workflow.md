# Release Workflow

## Permanent branches

- `develop`
- `release`
- `main`

`develop` is the GitHub default branch.

`main` remains the intended production branch.

`release` is permanent and must not be auto-deleted after merge.

## Flow

1. Work lands in `develop` through issue-linked PRs.
2. `.github/workflows/sync-release-pr.yml` ensures there is an open `develop -> release` PR and an open release-tracking issue.
3. A human sets exactly one `release:*` label on that `develop -> release` PR before merging it.
4. `.github/workflows/prepare-main-release-pr.yml` reads that label, bumps the version on `release`, and creates or updates the `release -> main` PR.
5. The `release -> main` PR carries the final release commit title `Release 📦 vX.Y.Z`.
6. `.github/workflows/post-main-release.yml` creates the Git tag and GitHub Release, closes the release-tracking issue, and creates or updates a release metadata sync PR into `develop`.
7. While that sync PR is open, other PRs targeting `develop` remain blocked.

## Metadata rules

For PRs to `develop`:

- PR title must be conventional and issue-linked
- PR body must include `Closes #123` or `Fixes #123`
- PR must have the `approved` label
- PR must not bypass an open release metadata sync PR

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
- after a production release, the generated release metadata sync PR must merge before the next `develop -> release` PR merges
- while that sync PR is open, other PRs to `develop` must remain blocked
- `release` accepts only stabilization work, not new feature work
- if a permanent-branch PR shows conflicts, restore the missing sync step instead of bypassing the branch policy
- `develop -> release` and `release -> main` must use merge commits, not squash merges

## Implemented automation

### Sync release PR

Workflow:

- `.github/workflows/sync-release-pr.yml`

Behavior:

- runs on every push to `develop`
- pauses release PR creation if `main` has a released package version that `develop` has not synced yet
- closes an existing stale `develop -> release` PR when that metadata sync is missing
- restores `release` from `main` first if the permanent release branch is missing
- reuses the most recent open release-tracking issue with a title starting `[Release]:`
- creates one if none exists
- ensures there is an open PR from `develop` to `release` when unreleased changes exist
- applies the automation labels for the release flow

If `develop` and `release` already have no releasable diff, the workflow writes
a summary and exits without opening a PR.

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
- creates or updates the `release -> main` PR when a real diff remains

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
- creates or updates an automated release metadata sync PR from a branch based on `develop`
- skips PR creation cleanly if `develop` already has the released version metadata
- can be rerun manually with `workflow_dispatch` by supplying the merged `release -> main` PR number if recovery is needed

## Why the develop sync PR exists

The version bump is committed on `release` before the `release -> main` PR is
opened. Without a follow-up sync back into `develop`, the next feature cycle can
reintroduce the older version metadata and make the next `develop -> release`
PR try to roll the version backward.

The automated release metadata sync PR prevents that drift while avoiding a
direct permanent-branch merge when only package version metadata needs to move.

It also acts as a hard workflow gate: until that sync PR merges, other PRs to
`develop` should remain blocked.

## Merge strategy

- working branch -> `develop`: merge commit
- release metadata sync branch -> `develop`: merge commit
- `develop -> release`: merge commit
- `release -> main`: merge commit

Squash is disabled repository-wide because GitHub merge-method settings are not
branch-specific. Preserving ancestry is the priority; squashing permanent-branch
PRs is the conflict pattern that made PR #22 dirty.

## Recovery From Squashed Ancestry

If a release PR is already conflicted because an older permanent-branch PR was
squashed:

1. close the conflicted `develop -> release` PR
2. open or update the release metadata sync PR into `develop`
3. with no active release candidate open, realign `release` to the current
   `develop` commit once
4. merge the release metadata sync PR
5. let `sync-release-pr` create the next release candidate from the repaired
   branch graph

This is recovery behavior for an already-damaged branch graph, not the normal
release path.

See `docs/principal-branch-policy.md` for the full permanent-branch rules.
