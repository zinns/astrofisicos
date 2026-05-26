# Principal Branch Policy

## Purpose

This repository uses three permanent branches:

- `develop`
- `release`
- `main`

The policy below exists to prevent divergence and merge conflicts between those
branches.

## Allowed pull request directions

Only these branch movements are allowed:

1. working branch -> `develop`
2. `develop` -> `release`
3. `release` -> `main`
4. `main` -> `develop`

The `main -> develop` PR is the sync-back PR created after a production release.

## Disallowed pull request directions

These flows should not be used:

- working branch -> `release`
- working branch -> `main`
- `develop` -> `main`
- `release` -> `develop`
- direct commits to `develop`, `release`, or `main`

## Single-path release rule

At any given time:

- there should be only one active `develop -> release` PR
- there should be only one active `release -> main` PR
- after a production release, the generated `main -> develop` sync PR must be merged before the next `develop -> release` PR is merged

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

If a release-only fix is required:

1. branch from `release`
2. open a PR back into `release`
3. let the normal `release -> main` and `main -> develop` flow carry it forward

## Conflict prevention rules

Before merging `develop -> release`:

- confirm there is no open `main -> develop` sync PR
- confirm there is no open `release -> main` PR for the current or older candidate
- confirm `release` contains only stabilization work for that release candidate

Before merging `release -> main`:

- confirm the release branch contains only release-approved changes
- confirm the semver label is correct
- confirm the release notes are ready

After merging `release -> main`:

- automation must create or update the `main -> develop` sync PR
- that sync PR must merge before the next release candidate is merged from `develop`

## Hotfix rule

Production hotfixes are exceptional.

If a hotfix must go directly to `main`:

1. branch from `main`
2. open a PR into `main`
3. after merge, sync `main` back into `develop`
4. if the `release` branch is still active, port the same fix into `release` before continuing release work

Do not assume `develop` or `release` already contains a direct `main` hotfix.

## Merge strategy

All permanent-branch PRs use:

- squash merge only

This keeps the history linear and makes the PR title the source of truth for
release metadata.

## Operational rule

If a permanent-branch PR shows conflicts, do not resolve that by bypassing the
branch policy.

Instead:

1. identify which required sync step was skipped
2. restore the missing branch movement
3. reopen or refresh the correct PR

The normal fix for drift after a release is not `develop -> release` conflict
resolution by hand. The normal fix is to merge the missing `main -> develop`
sync PR first.
