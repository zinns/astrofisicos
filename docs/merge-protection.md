# CI And Merge Protection

## Current state

The GitHub-side validation workflows are live. What still needs live GitHub
administration is turning those checks into mandatory branch protections or
rulesets.

Live workflow files:

- `.github/workflows/pr-metadata.yml`
- `.github/workflows/pr-auto-label.yml`
- `.github/workflows/repository-validation.yml`

## Checks that run in GitHub

PR metadata checks:

- `Branch Name`
- `PR Title`
- `Issue Reference`
- `Labels`

Additional `develop`-only metadata check:

- `Develop Sync Gate`

Repository validation check:

- `Repository Validation`

`Repository Validation` installs dependencies with `pnpm`, runs
`pnpm validate:ci`, and writes a structured step summary into the GitHub Actions
job summary.

## Intended required merge checks

The required status checks common to `develop`, `release`, and `main` should be:

- `Branch Name`
- `PR Title`
- `Issue Reference`
- `Labels`
- `Repository Validation`

For `develop`, add:

- `Develop Sync Gate`

## Live repository merge settings

The repository should stay aligned with the workflow strategy:

- merge commits enabled
- squash merge disabled
- rebase merges disabled
- permanent branches must not auto-delete after merge
- merge commit title set to the PR title
- merge commit message set to the PR body

Important:

- `develop -> release` must use merge commits
- generated production snapshot PRs into `main` must use merge commits with the PR title as the merge commit title
- direct `release -> main` PRs are not valid because `main` is release-only history
- squashing permanent-branch PRs destroys shared ancestry and is the root cause of the PR #22 conflict pattern
- disabling squash globally is intentional because GitHub merge-method settings are repository-wide

## Current repository state

As of May 26, 2026, the repository is public. The earlier private-repository
plan blocker no longer applies.

Current live API state:

- `repos/zinns/astrofisicos/branches/develop/protection` returns `404`
  `Branch not protected`
- `repos/zinns/astrofisicos/rulesets` returns an empty array

That means the workflows are live, but GitHub branch protections or rulesets
still need to be applied so the checks become mandatory at merge time.

## Recommended live protection rollout

Apply branch protections or rulesets to `develop`, `release`, and `main` with:

- pull requests required before merge
- required status checks enabled
- up-to-date branch requirement enabled
- force pushes blocked
- branch deletion blocked
- linear history enabled
- conversation resolution required

Permanent-branch note:

- `develop`, `release`, and `main` must remain undeletable through repository
  settings and protection rules

For `develop`, keep approval enforcement in the `Labels` workflow check instead
of relying on GitHub reviewer approval rules, because this project uses
label-based approval for human-authored PRs.

## References

- [About protected branches](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches)
- [REST API: branch protection](https://docs.github.com/en/rest/branches/branch-protection?apiVersion=2022-11-28)
- [REST API: repository rules](https://docs.github.com/en/rest/repos/rules?apiVersion=2022-11-28)
