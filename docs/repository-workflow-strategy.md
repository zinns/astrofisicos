# Repository Workflow Strategy

## Purpose

This document defines the suggested engineering workflow for the project based on the current requirements:

- `pnpm` as the package manager
- issue templates and PR templates
- linting for TypeScript, JavaScript, and CSS
- automated testing
- commit linting with conventional commits plus GitHub Issue IDs
- local and CI validation gates before code can move forward
- only three permanent branches: `main`, `release`, `develop`
- release automation driven by PR labels
- Vercel connected directly to the repository, without GitHub deployment jobs

This is a strategy document, not the implementation itself.

## Decision Summary

### Tooling baseline

- Package manager: `pnpm`
- Runtime validation: custom `pnpm validate` wrapper for structured output
- TS and JS linting: `eslint`
- CSS linting: `stylelint`
- Formatting: `prettier`
- Unit and component tests: `vitest` + `@testing-library/react`
- Git hooks: `husky`
- Commit linting: `commitlint` with custom rule for GitHub Issue IDs

### Merge strategy

- Permanent branches only: `main`, `release`, `develop`
- All work branches start from `develop`
- All merges happen through PRs
- Squash merge only
- PRs targeting `develop` require the `approved` label before merge
- Automated PRs do not require reviewers

Squash merge is recommended because it keeps the history readable and allows the PR title to become the final commit in the target branch. That matters for conventional commit enforcement and for the final release commit title.

Automatic PR labels should be applied by workflow and also derived during PR
metadata validation so the first GitHub check run does not fail because of
workflow timing.

## Branching Model

### Permanent branches

- `main`: production branch
- `release`: pre-production stabilization branch
- `develop`: integration branch for completed work

### Recommended GitHub default branch

Recommended default branch:

- `develop`

Why:

- all working branches are created from `develop`
- most human PRs target `develop`
- GitHub closing keywords only work when a PR targets the repository default branch
- this allows implementation issues to close natively when their PR merges into `develop`

Relevant docs:

- [Linking a pull request to an issue](https://docs.github.com/issues/tracking-your-work-with-issues/using-issues/linking-a-pull-request-to-an-issue)

Important distinction:

- GitHub default branch should be `develop`
- Vercel production branch should still be `main`

### Working branches

All temporary branches must be created from `develop`.

Suggested naming convention:

- `feat/123-short-slug`
- `fix/456-short-slug`
- `chore/789-short-slug`
- `docs/321-short-slug`
- `refactor/654-short-slug`
- `test/777-short-slug`
- `ci/888-short-slug`

Suggested validation regex:

```txt
^(main|release|develop|feat\/[0-9]+-[a-z0-9-]+|fix\/[0-9]+-[a-z0-9-]+|chore\/[0-9]+-[a-z0-9-]+|docs\/[0-9]+-[a-z0-9-]+|refactor\/[0-9]+-[a-z0-9-]+|test\/[0-9]+-[a-z0-9-]+|ci\/[0-9]+-[a-z0-9-]+)$
```

## Issue Lifecycle

### Working rule

The best default is:

- create the implementation issue first
- create a working branch from `develop` using the issue ID in the branch name
- use conventional commits that include the issue ID
- open a PR from the working branch to `develop`
- require the `approved` label before merge
- close the original issue automatically when the PR into `develop` merges

### Why this is the best option

Closing the original implementation issue on merge into `develop` keeps the active backlog honest:

- the work item is complete and approved
- the code is integrated
- the issue board does not stay polluted with work that is already done

Keeping implementation issues open until `release` or `main` would mix two different concepts:

- work completion
- deployment completion

Those should stay separate.

### How release visibility should work instead

Use a release tracking issue for the deployment side of the workflow:

- the `develop -> release` PR references the release tracking issue
- the `release -> main` PR references the same release tracking issue
- when the final release lands on `main`, close the release tracking issue

If shipped-state visibility is needed on the original implementation issues, the recommended follow-up automation is:

- add a `released` label to included issues after `main` merge
- or add a comment such as `Included in vX.Y.Z`

That gives deployment traceability without keeping finished work open.

### Required PR body behavior

For PRs into `develop`:

- the PR body should use `Closes #123` for the implementation issue

For PRs into `release` and `main`:

- the PR body should include a non-closing reference such as `Release tracking: #<release-tracking-issue>`

This prevents release automation from accidentally closing individual work issues a second time while still making the release issue explicit for validation.

## Commit Convention

### Required format

Every human-authored commit must follow conventional commits and include the GitHub Issue ID.

Suggested format:

```txt
type(scope): short summary (#123)
```

Examples:

```txt
feat(home): refine hero content hierarchy (#42)
fix(contacto): correct placeholder channel copy (#57)
chore(ci): add PR issue-reference guard (#91)
```

### Allowed exception

The only non-conventional exception should be the automated release commit:

```txt
Release 📦 v1.2.3
```

That exception must be limited to release automation only. Human commits should not be allowed to use it.

### Why both commits and PR titles matter

Because the repository should use squash merge only, the PR title becomes the final commit in the target branch. That means we should enforce both:

- commit message format locally
- PR title format in CI

Suggested PR title format:

```txt
type(scope): short summary (#123)
```

Examples:

```txt
feat(content): add contenido child route skeleton (#84)
fix(ci): enforce required release labels (#103)
```

## Issue Templates

Use GitHub issue forms in `.github/ISSUE_TEMPLATE/`.

Suggested templates:

- `feature-task.yml`
- `bug-report.yml`
- `chore-infra.yml`
- `release-tracking.yml`

### Required fields by template

For `feature-task.yml`:

- problem or opportunity
- expected outcome
- acceptance criteria
- design or content references
- labels

For `bug-report.yml`:

- current behavior
- expected behavior
- reproduction steps
- environment
- screenshots if available
- labels

For `chore-infra.yml`:

- motivation
- scope
- affected systems
- rollout or rollback notes
- labels

For `release-tracking.yml`:

- target version
- included changes
- validation checklist
- release notes summary

The release tracking issue is important because it gives automated release PRs a valid issue reference, which is otherwise hard to satisfy consistently.

## PR Templates

Use multiple PR templates under `.github/PULL_REQUEST_TEMPLATE/`.

Suggested templates:

- `develop.md`
- `release.md`
- `main-release.md`

### Shared sections for all PR templates

Each PR template should include:

- linked GitHub Issue
- change summary
- validation results
- merge strategy
- next steps

### `develop.md`

For feature and fix PRs targeting `develop`.

Required sections:

- `Issue`
- `Approval`
- `What changed`
- `Why this change exists`
- `Validation`
- `Merge strategy`
- `Next steps`

Validation checklist:

- branch name follows policy
- commit messages follow policy
- PR has the `approved` label
- `pnpm lint`
- `pnpm lint:css`
- `pnpm typecheck`
- `pnpm test:run`
- `pnpm build`

Merge strategy:

- squash merge only

### `release.md`

For PRs targeting `release`.

Required sections:

- `Release tracking issue`
- `Scope of release`
- `Validation`
- `Version label`
- `Merge strategy`
- `Next steps`

Additional rule:

- exactly one semver label must be present: `release:patch`, `release:minor`, or `release:major`

Suggested title:

```txt
chore(release): prepare release candidate (#<release-tracking-issue>)
```

### `main-release.md`

For automated PRs targeting `main`.

Required sections:

- `Release tracking issue`
- `Target version`
- `Validation`
- `Deployment expectations`
- `Merge strategy`
- `Next steps`

Expected title:

```txt
Release 📦 vX.Y.Z
```

## Required Labels

Labels are part of the workflow contract, not just visual metadata.

### Required on all PRs

- one `type:*` label
- one `area:*` label
- one lifecycle label when applicable

Suggested `type:*` labels:

- `type:feature`
- `type:fix`
- `type:docs`
- `type:chore`
- `type:refactor`
- `type:test`
- `type:ci`

Suggested `area:*` labels:

- `area:frontend`
- `area:content`
- `area:design`
- `area:infra`
- `area:ci`
- `area:docs`

Suggested lifecycle labels:

- `approved`
- `released`
- `automation`

### Required on PRs targeting `release`

- exactly one of:
  - `release:patch`
  - `release:minor`
  - `release:major`

### Applied automatically on automation PRs

- `automation`
- `flow:release`
- `flow:main`

## Local Validation Strategy

### Hooks

Use `husky` with these hooks:

- `pre-commit`
- `commit-msg`

### `pre-commit`

The requested behavior is strict, but the output should stay readable: before a commit is accepted, run the local checks through a single aggregate validator.

Suggested flow:

1. validate branch name
2. run `pnpm lint`
3. run `pnpm lint:css`
4. run `pnpm typecheck`
5. run `pnpm test:run`

Important behavior:

- all local checks should run even if one fails
- the validator should print a final structured summary
- the hook should exit non-zero if any required check fails
- `pnpm build` is skipped locally by default

This keeps the user informed without making them rerun the hook one failure at a time.

This is still intentionally strict and will slow commits down. If the team later decides that this is too heavy, the recommended fallback is:

- keep branch validation and commitlint on commit
- move tests to `pre-push`

### `commit-msg`

Run `commitlint` with:

- conventional commit base rules
- custom rule requiring `(#123)` in the subject line
- explicit exception for `Release 📦 vX.Y.Z`

## Structured Validation Output

Validation should not dump raw tool output without structure.

Suggested approach:

- create `scripts/validate.mjs`
- create `scripts/validate-branch-name.mjs`
- create `scripts/validate-pr.mjs`

`scripts/validate.mjs` should orchestrate the checks and print a clear step-by-step report such as:

```txt
Repository Validation

[PASS] Branch name
[PASS] ESLint
[PASS] Stylelint
[PASS] TypeScript
[PASS] Tests

Summary: 5/5 checks passed
```

When a step fails, the summary should remain structured:

```txt
Repository Validation

[PASS] Branch name
[PASS] ESLint
[FAIL] Stylelint
[PASS] TypeScript
[FAIL] Tests

Summary: 3 passed, 2 failed
Action: fix the failing checks before retrying the commit
```

In CI, the same script should also write a Markdown summary to `$GITHUB_STEP_SUMMARY`.

## CI Workflows

### 1. PR validation workflow

Suggested file:

```txt
.github/workflows/pr-validate.yml
```

Trigger:

- `pull_request` on `develop`, `release`, and `main`

Checks:

- branch name guard
- PR title guard
- issue reference guard
- required label guard
- `pnpm install --frozen-lockfile`
- `pnpm validate:ci`

PR title guard should support two allowed patterns:

- standard PRs to `develop` or `release`: `type(scope): summary (#123)`
- automated PRs to `main`: `Release 📦 vX.Y.Z`

Label guard should require:

- the `approved` label on human-authored PRs to `develop`
- automation and flow labels on generated release and main PRs

`pnpm validate:ci` should include:

- `pnpm lint`
- `pnpm lint:css`
- `pnpm typecheck`
- `pnpm test:run`
- `pnpm build`

### 2. Develop to release PR automation

Suggested file:

```txt
.github/workflows/sync-release-pr.yml
```

Trigger:

- `push` to `develop`

Behavior:

- ensure there is an open PR from `develop` to `release`
- if no release tracking issue exists, create one
- attach required automation labels
- use the `release.md` template body

### 3. Release version bump and main PR automation

Suggested file:

```txt
.github/workflows/prepare-main-release-pr.yml
```

Trigger:

- `push` to `release`

Behavior:

1. detect the most recently merged PR into `release`
2. read the semver label from that PR
3. calculate the next version
4. update versioned files
5. create an automated commit with the title `Release 📦 vX.Y.Z`
6. create or update the PR from `release` to `main`
7. attach required labels
8. use the `main-release.md` template body

### 4. Main post-merge workflow

Suggested file:

```txt
.github/workflows/post-main-release.yml
```

Trigger:

- `push` to `main`

Behavior:

- create Git tag `vX.Y.Z`
- create GitHub Release notes
- close the release tracking issue
- optionally add a `released` label or version comment to included implementation issues

No GitHub workflow should deploy to Vercel.

## Branch Protection and Rulesets

Apply GitHub branch protection or rulesets to `main`, `release`, and `develop`.

Repository settings should also set `develop` as the GitHub default branch.

### Suggested protections for all three permanent branches

- no direct pushes
- no force pushes
- no branch deletion
- PR required before merge
- required status checks
- require branch to be up to date before merge
- squash merge only
- require the label-based approval process on PRs to `develop`

### Required status checks

Suggested required checks:

- `PR Validation / Branch Name`
- `PR Validation / PR Title`
- `PR Validation / Issue Reference`
- `PR Validation / Labels`
- `PR Validation / Install`
- `PR Validation / Validate CI`

### Issue reference guard

GitHub does not give us a clean native rule for "every PR must reference an issue" in the exact way required here, so this should be enforced by workflow.

Suggested rule:

- PR body must include one of:
  - `Closes #123`
  - `Fixes #123`
  - `Refs #123`

For automated release PRs:

- reference the generated release tracking issue

If the PR body lacks a valid reference, the workflow fails and the PR cannot merge.

## Versioning Strategy

Use semantic versioning.

Version source of truth:

- the label on the PR targeting `release`

Allowed labels:

- `release:patch`
- `release:minor`
- `release:major`

Suggested rule:

- PRs into `release` cannot merge unless exactly one semver label is present

Version bump timing:

- apply the bump after merge into `release`
- commit the bump onto `release`
- create the `release -> main` PR with the computed version

Recommended files to bump:

- `package.json`
- `pnpm-lock.yaml`

Optional later:

- `CHANGELOG.md`

## Vercel Strategy

### What should happen

- Vercel should be connected directly to the repository if the hosting constraint allows it
- GitHub Actions should not trigger deployments
- `main` should be the Vercel production branch
- `release` and `develop` should be treated as shared preview branches
- any additional working branches would also produce preview deployments under Git integration

### Important constraint verified against Vercel docs

Vercel Git deployments create:

- production deployments from the configured production branch
- preview deployments for other branches by default

Relevant docs:

- [Deploying Git Repositories with Vercel](https://vercel.com/docs/git)
- [Project settings and Ignored Build Step](https://vercel.com/docs/project-configuration/project-settings)
- [Git settings](https://vercel.com/docs/project-configuration/git-settings)

### Strategy implication

The earlier requirement "only deploy `main`, `release`, and `develop`" conflicts with the default Vercel Git model on Hobby:

- by default, every non-production branch is a preview branch
- the Ignored Build Step can cancel builds, but canceled builds still count against deployment quotas

That means Ignored Build Step is not a clean allowlist solution for Hobby. Since preview deployments can still help testing, the better branch policy is:

- `main` is production
- every other branch is an acceptable preview branch
- the team relies mainly on `develop` and `release` as shared preview environments

### Recommended options

Option A, recommended if the deployment constraint is flexible:

- accept that feature branches may receive preview deployments
- use `main` as production
- attach stable preview domains to `release` and `develop`
- treat those two as the only shared environments the team relies on

Option B, required if the constraint is strict:

- do not rely on Vercel Hobby Git integration for branch allowlisting
- either upgrade the Vercel plan or change the deployment model

### Additional Hobby limitation

If the repository is private and belongs to a GitHub organization, Vercel Hobby Git deployment is not supported. In that case, the repository must be public or the Vercel project must move to Pro.

Because the current repository is under the `zinns` organization namespace and will remain private, this is a present blocker, not a hypothetical one.

Under the current stated constraints:

- private GitHub organization repository
- Vercel Hobby account
- no account upgrade

the repository cannot be connected to Vercel through the normal Git integration flow.

That means one of these project decisions will eventually need to change:

- make the repository public
- upgrade the Vercel account to Pro
- abandon Git-based Vercel connection and use another deployment model

### Recommended Vercel settings

- production branch: `main`
- preview branch domains:
  - `develop` -> shared development preview domain
  - `release` -> shared release preview domain
- enable verified commits if the team wants an extra deployment safeguard
- keep deployments managed by Vercel only

## Proposed Repository Files

```txt
.github/
  ISSUE_TEMPLATE/
    bug-report.yml
    chore-infra.yml
    feature-task.yml
    release-tracking.yml
  PULL_REQUEST_TEMPLATE/
    develop.md
    release.md
    main-release.md
  workflows/
    pr-validate.yml
    sync-release-pr.yml
    prepare-main-release-pr.yml
    post-main-release.yml
commitlint.config.cjs
.husky/
  pre-commit
  commit-msg
.stylelintrc.cjs
.eslint.config.js
scripts/
  validate.mjs
  validate-branch-name.mjs
  validate-pr.mjs
```

## Suggested Implementation Order

1. Switch the repo to `pnpm` and add the lockfile.
2. Add linting, typecheck, and test scripts.
3. Add structured validation wrapper scripts.
4. Add Husky hooks and commitlint.
5. Add issue forms and PR templates.
6. Add PR validation workflow.
7. Add branch protections and required labels.
8. Add release PR automation.
9. Add main release automation.
10. Connect Vercel only after the private-org Hobby blocker is resolved.

## Phased Rollout

### Phase 1: Package manager and base scripts

Goal:

- move to `pnpm`
- normalize scripts for lint, css lint, typecheck, test, build, validate

Deliverables:

- `pnpm-lock.yaml`
- updated `package.json`
- initial lint and test tool configuration

### Phase 2: Local developer gates

Goal:

- enforce branch naming
- enforce conventional commits with issue IDs
- provide structured local validation output

Deliverables:

- `husky`
- `commitlint`
- `scripts/validate.mjs`
- local hooks

### Phase 3: GitHub collaboration hygiene

Goal:

- make issue creation and PR creation consistent
- enforce approval, labels, and issue references

Deliverables:

- issue templates
- PR templates
- label policy
- branch protection checklist

### Phase 4: CI validation and merge protection

Goal:

- mirror the local checks in CI
- block merges when metadata or validation rules fail

Deliverables:

- PR validation workflow
- GitHub rulesets or branch protections
- structured CI step summary

Current implementation note:

- the CI workflow and repository merge settings can be implemented now
- GitHub branch protections and rulesets are blocked on the current plan for this private repository

### Phase 5: Release automation

Goal:

- automate `develop -> release`
- automate `release -> main`
- drive versions from labels

Deliverables:

- release tracking issue flow
- semver label enforcement
- release commit automation
- Git tag and GitHub Release flow

Current implementation note:

- the release automation workflows now exist in the repository
- semver selection is still intentionally manual through the `release:*` label on the release PR
- because protected branches are blocked on the current GitHub plan, the workflows provide the enforcement signal but GitHub still cannot mark the release-label requirement as a true branch rule

### Phase 6: Deployment decision

Goal:

- resolve the Vercel hosting blocker and connect deployment safely

Deliverables:

- final Vercel connection decision
- environment mapping
- deployment documentation

## Risks and Notes

- Running full lint, typecheck, tests, and build on every commit is strict and can slow development.
- Running lint, CSS lint, typecheck, and tests on every commit is still strict and can slow development.
- The requirement that every PR reference an issue is coherent for feature work but needs the release tracking issue for automation PRs.
- Approval is label-driven for manual `develop` PRs, while automated PRs skip reviewer requirements.
- The requirement that only `main`, `release`, and `develop` deploy is not cleanly compatible with Vercel Hobby Git defaults.
- A private repository under a GitHub organization cannot use Vercel Hobby Git deployments, so the current deployment plan has a hard blocker.
