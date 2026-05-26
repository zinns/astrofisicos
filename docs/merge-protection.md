# CI And Merge Protection

## Current Phase 4 state

Phase 4 adds the GitHub-side validation workflow and tightens the repository
merge settings that are available on the current plan.

Live workflow files:

- `.github/workflows/pr-metadata.yml`
- `.github/workflows/pr-auto-label.yml`
- `.github/workflows/repository-validation.yml`

## Checks that now run in GitHub

PR metadata checks:

- `Branch Name`
- `PR Title`
- `Issue Reference`
- `Labels`

Repository validation check:

- `Repository Validation`

`Repository Validation` installs dependencies with `pnpm`, runs
`pnpm validate:ci`, and writes a structured step summary into the GitHub Actions
job summary.

## Intended required merge checks

When the repository plan supports branch protection on this private repository,
the required status checks should be:

- `Branch Name`
- `PR Title`
- `Issue Reference`
- `Labels`
- `Repository Validation`

These checks are intended for `develop`, `release`, and `main`.

## Live repository merge settings

Phase 4 should keep the repository aligned with the workflow strategy:

- squash merge enabled
- merge commits disabled
- rebase merges disabled
- merged branches deleted automatically
- squash merge commit message set to the PR title

## Current GitHub blocker

As of May 25, 2026, GitHub branch protections and repository rulesets are not
available for this repository on the current plan because the repository is
private.

This was confirmed live with `gh api` against:

- `repos/zinns/astrofisicos/branches/develop/protection`
- `repos/zinns/astrofisicos/rulesets`

Both endpoints returned `403` with the message:

```txt
Upgrade to GitHub Pro or make this repository public to enable this feature.
```

That means Phase 4 can implement the checks and repository merge settings, but
it cannot make those checks truly required in GitHub until one of these happens:

1. the repository is moved to a GitHub plan that supports protections for this private repo
2. the repository becomes public

## Recommended follow-up once the blocker is removed

Apply branch protections or rulesets to `develop`, `release`, and `main` with:

- pull requests required before merge
- required status checks enabled
- up-to-date branch requirement enabled
- force pushes blocked
- branch deletion blocked
- linear history enabled
- conversation resolution required

For `develop`, keep approval label enforcement in workflow rather than requiring
GitHub reviews, because the project deliberately uses label-based approval for
human-authored PRs.

## References

- [About protected branches](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches)
- [REST API: branch protection](https://docs.github.com/en/rest/branches/branch-protection?apiVersion=2022-11-28)
- [REST API: repository rules](https://docs.github.com/en/rest/repos/rules?apiVersion=2022-11-28)
