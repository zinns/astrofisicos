# GitHub Collaboration

## Issue lifecycle

1. Create the implementation issue.
2. Create the working branch from `develop`, including the issue ID.
3. Use conventional commits that include the issue ID.
4. Open a PR to `develop`.
5. Merge only after approval and required labels are present.
6. The implementation issue closes when the PR into `develop` merges.

Release tracking stays separate through a release-tracking issue.

## Pull request templates

Available templates:

- `.github/PULL_REQUEST_TEMPLATE/develop.md`
- `.github/PULL_REQUEST_TEMPLATE/release.md`
- `.github/PULL_REQUEST_TEMPLATE/main-release.md`

Each template includes:

- issue linkage
- validation summary
- merge strategy
- suggested commit title
- next steps

## Merge strategy

- Squash merge only

This keeps the final history aligned with PR titles and with the commit policy.

## Approval model

For human-authored PRs targeting `develop`:

- the PR must carry the `approved` label before merge

For automated PRs:

- reviewers are not required
- the `approved` label is not required
- automation and flow labels should be applied automatically

## Suggested commit titles

For PRs to `develop`:

```txt
type(scope): short summary (#<issue-id>)
```

For PRs to `release`:

```txt
chore(release): prepare release candidate (#<release-tracking-issue>)
```

For PRs to `main`:

```txt
Release 📦 vX.Y.Z
```

## GitHub-side validation

The repository uses `.github/workflows/pr-metadata.yml` to validate:

- branch name
- PR title
- issue reference in the PR body
- labels

Automatic labels are applied by `.github/workflows/pr-auto-label.yml`.
Metadata validation derives the same deterministic labels during validation so
the first PR run does not fail if GitHub evaluates metadata before labels are
persisted on the pull request.

Repository-wide code validation runs in
`.github/workflows/repository-validation.yml`.

The intended merge-protection model and the current GitHub plan blocker are
documented in `docs/merge-protection.md`.
