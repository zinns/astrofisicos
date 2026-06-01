# Deployment Guide

## Current deployment state

- Git provider: GitHub
- Hosting platform: Vercel
- Production branch: `main`
- Shared preview branches: `release`, `develop`
- Current production URL: [astrofisicos.vercel.app](https://astrofisicos.vercel.app/)

This repository uses Vercel Git integration directly. GitHub Actions must not
create deployments.

## Branch and environment mapping

| Git branch                                              | Vercel environment | Purpose                       | Expected domain behavior     |
| ------------------------------------------------------- | ------------------ | ----------------------------- | ---------------------------- |
| `main`                                                  | Production         | Live site                     | Current production URL       |
| `release`                                               | Preview            | Shared release validation     | Stable preview branch domain |
| `develop`                                               | Preview            | Shared integration preview    | Stable preview branch domain |
| `feature/*`, `fix/*`, `chore/*`, other working branches | None by default    | Local development and CI only | No automatic Git deployment  |

The branch allowlist is enforced in `vercel.json`:

```json
{
  "git": {
    "deploymentEnabled": {
      "*": false,
      "develop": true,
      "release": true,
      "main": true
    }
  }
}
```

## Runtime policy

- `.nvmrc` tracks `lts/*`
- GitHub Actions resolves that alias with `check-latest: true`
- `package.json` keeps the minimum supported floor at Node.js `>=24`

As of May 27, 2026, the active LTS line resolved by `.nvmrc` is
Node.js `24.16.0`. The repository should follow the active LTS line, not a
stale pinned patch version.

## Analytics

Vercel Web Analytics is wired in the app through `@vercel/analytics` and the
root layout mounts `<Analytics />`.

Operational note:

- if Analytics has not been enabled in the Vercel project dashboard yet, enable
  it from the project Analytics tab so data collection starts on the next
  deployment

## Environment variable policy

Vercel provides the standard `Development`, `Preview`, and `Production`
environments. For this project:

- `Development` is used locally after `vercel link` and `vercel env pull`
- `Preview` is shared by `develop` and `release`
- `Production` is reserved for `main`

If `develop` and `release` ever need different values, use branch-specific
preview overrides in Vercel instead of inventing custom deployment flows.

No runtime secrets are required for the current static-first milestone. If
future features add secrets or public runtime configuration, those values must
be added in Vercel and never committed into the repository.

## Permanent branch constraints

- `release` is a permanent branch
- automatic branch deletion after merge must stay disabled in GitHub
- if `release` is ever deleted accidentally, restore it from `main` before the
  next release cycle continues

The release automation now also restores `release` from `main` if the branch is
missing when `sync-release-pr` runs, but that is recovery behavior, not the
normal operating mode.

## Operational rules

- Do not deploy from GitHub Actions.
- Do not use `vercel --prod` for normal releases.
- Production changes must enter Vercel only through `release -> main`.
- If a preview needs to be shared broadly, use `develop` or `release`, not a
  working branch.
- If feature-branch previews become necessary later, change `vercel.json` in a
  dedicated PR and document the reason.

## References

- [Deploying Git Repositories with Vercel](https://vercel.com/docs/git)
- [Git Configuration](https://vercel.com/docs/project-configuration/git-configuration)
- [Vercel Web Analytics](https://vercel.com/docs/analytics)
- [Analytics Quickstart](https://vercel.com/docs/analytics/quickstart)
- [Environment Variables](https://vercel.com/docs/environment-variables)
- [Assigning a Domain to a Git Branch](https://vercel.com/docs/domains/working-with-domains/assign-domain-to-a-git-branch)
