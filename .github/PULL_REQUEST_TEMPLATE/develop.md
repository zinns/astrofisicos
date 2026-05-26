## Issue

Closes #<issue-id>

## Approval

- Required before merge: `approved` label
- Automated PRs do not require reviewers or the `approved` label

## What changed

- Explain the concrete changes in this PR.

## Why this change exists

- Explain the product, design, or technical reason for the work.

## Validation

- [ ] Branch name follows policy
- [ ] Commit messages follow policy
- [ ] `pnpm validate:ci`

## Principal branch safety

- [ ] This PR targets `develop`, not `release` or `main`
- [ ] If this PR changes version or release metadata, it does so through the documented principal-branch sync flow
- [ ] No open production sync (`main -> develop`) PR is being bypassed by this change

## Merge strategy

- Squash merge only

## Suggested commit title

`type(scope): short summary (#<issue-id>)`

## Next steps

- Call out anything intentionally deferred or any follow-up issue.
