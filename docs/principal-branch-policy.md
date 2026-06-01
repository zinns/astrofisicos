# Principal Branch Policy

## Purpose

This repository uses three permanent branches:

- `develop`
- `release`
- `main`

The policy below exists to prevent divergence and merge conflicts between those
branches.

Permanent-branch rule:

- `develop`, `release`, and `main` are never disposable branches
- GitHub auto-delete for merged branches must stay disabled

## Allowed pull request directions

Only these branch movements are allowed:

1. working branch -> `develop`
2. `develop` -> `release`
3. production snapshot branch -> `main`
4. release metadata sync branch -> `develop`

The release metadata sync branch is created from `develop` after production
release and applies the released package version without merging the permanent
branches directly.

The production snapshot branch is generated from `main`, then automation copies
the validated `release` tree into one `Release 📦 vX.Y.Z` commit. This keeps
`main` limited to release commits while avoiding direct permanent-branch merge
conflicts.

## Disallowed pull request directions

These flows should not be used:

- working branch -> `release`
- working branch -> `main`
- `develop` -> `main`
- direct `release` -> `main`
- `release` -> `develop`
- routine `main` -> `develop` PRs for release metadata only
- direct commits to `develop`, `release`, or `main`

## Single-path release rule

At any given time:

- there should be only one active `develop -> release` PR
- there should be only one active production snapshot PR targeting `main`
- after a production release, the generated release metadata sync PR must be merged before the next `develop -> release` PR is merged
- while that sync PR is open, no other PR targeting `develop` should proceed

This is the main rule that prevents version drift and branch conflicts.

## Release branch rules

`release` is a stabilization branch, not a feature branch.

Allowed changes on `release`:

- the automated release version bump commit
- release-only fixes required to ship the current candidate

Not allowed on `release`:

- new feature work
- unrelated refactors
- manual version changes outside the release automation flow
- leaving `release` deleted after a completed production merge

If a release-only fix is required:

1. branch from `release`
2. open a PR back into `release`
3. let the normal production snapshot and release metadata sync flow carry it forward

If `release` is deleted accidentally:

1. restore `release` from `main`
2. confirm the restored branch points at the last production-ready release commit
3. rerun or wait for `sync-release-pr` so the next `develop -> release` PR is recreated from a valid base

## Conflict prevention rules

Before merging `develop -> release`:

- confirm there is no open release metadata sync PR
- confirm there is no open production snapshot PR for the current or older candidate
- confirm `release` contains only stabilization work for that release candidate

Before merging the generated production snapshot PR into `main`:

- confirm the snapshot branch is named like `ci/<release-issue>-main-release-vX-Y-Z`
- confirm the snapshot commit is titled `Release 📦 vX.Y.Z`
- confirm the snapshot branch was created from `main`, not from `release`
- confirm the semver label is correct
- confirm the release notes are ready

After merging the generated production snapshot PR into `main`:

- automation must create or update the release metadata sync PR
- that sync PR must merge before the next release candidate is merged from `develop`
- other PRs targeting `develop` should remain blocked until the sync PR is merged

## Hotfix rule

Production hotfixes are exceptional.

If a hotfix must go directly to `main`:

1. branch from `main`
2. open a PR into `main`
3. after merge, open a dedicated hotfix sync PR into `develop`
4. if the `release` branch is still active, port the same fix into `release` before continuing release work

Do not assume `develop` or `release` already contains a direct `main` hotfix.

## Merge strategy

All PRs use:

- merge commit only

GitHub merge-method settings are repository-wide, so squash is disabled for the
whole repository. Preserving ancestry is more important than a compact commit
graph for `develop -> release`; squashing that permanent-branch PR creates
future add/add conflicts when Git loses the shared branch history.

Production PRs into `main` are different: they are generated from `main` and
contain one snapshot commit whose tree matches `release`. They still use merge
commits, with the PR title as the merge commit title, so `main` remains a
release-only history.

## Operational rule

If a permanent-branch PR shows conflicts, do not resolve that by bypassing the
branch policy.

Instead:

1. identify which required sync step was skipped
2. restore the missing branch movement
3. reopen or refresh the correct PR

The normal fix for drift after a release is not `develop -> release` conflict
resolution by hand. The normal fix is to merge the missing release metadata
sync PR first.
