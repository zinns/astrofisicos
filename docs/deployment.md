# Deployment Guide

## Current decision

As of May 26, 2026, this repository is public on GitHub, so the original
private-repository Hobby blocker no longer applies. The deployment strategy for
this project is:

- use Vercel Git integration directly
- keep deployment creation out of GitHub Actions
- use `main` as the only production branch
- use `release` and `develop` as the only shared preview branches
- disable automatic Git deployments for feature branches

This keeps production aligned with the principal-branch policy while avoiding a
large number of throwaway preview deployments.

## Branch and environment mapping

| Git branch                                              | Vercel environment | Purpose                       | Expected domain behavior     |
| ------------------------------------------------------- | ------------------ | ----------------------------- | ---------------------------- |
| `main`                                                  | Production         | Live site                     | Production custom domain(s)  |
| `release`                                               | Preview            | Shared release validation     | Stable preview branch domain |
| `develop`                                               | Preview            | Shared integration preview    | Stable preview branch domain |
| `feature/*`, `fix/*`, `chore/*`, other working branches | None by default    | Local development and CI only | No automatic Git deployment  |

The branch allowlist is enforced with `vercel.json`:

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

This means feature-branch pull requests do not receive a Vercel deployment by
default. Shared browser-based validation happens after integration into
`develop` or `release`.

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

## Required repository config

The repository now carries the minimum deployment-related config:

- `vercel.json` controls which branches can deploy through Git integration
- `.gitignore` excludes `.vercel` and `.env*`
- `package.json` declares `Node.js >=20.9.0`, matching the current Next.js
  runtime requirement

## Vercel setup checklist

1. Import `zinns/astrofisicos` into Vercel.
2. Keep `main` as the Vercel Production Branch.
3. Confirm the framework is detected as Next.js.
4. Set the project Node.js version to a supported `20.x` release or newer.
5. Verify that branch deployments follow `vercel.json`:
   - `main` deploys to Production
   - `release` deploys to Preview
   - `develop` deploys to Preview
   - working branches do not auto-deploy
6. Add the production domain to `main`.
7. Assign stable preview domains to `release` and `develop` if the team wants
   fixed QA URLs.
8. Configure environment variables only in `Development`, `Preview`, and
   `Production`.

## Operational rules

- Do not deploy from GitHub Actions.
- Do not use `vercel --prod` for normal releases.
- Production changes must enter Vercel only through `release -> main`.
- If a preview needs to be shared broadly, use `develop` or `release`, not a
  working branch.
- If feature-branch previews become necessary later, change `vercel.json` in a
  dedicated PR and document the reason.
- If the repository becomes private again while staying on Hobby, re-check the
  Git integration constraint before relying on the current setup.

## References

- [Deploying Git Repositories with Vercel](https://vercel.com/docs/git)
- [Git Configuration](https://vercel.com/docs/project-configuration/git-configuration)
- [Environment Variables](https://vercel.com/docs/environment-variables)
- [Assigning a Domain to a Git Branch](https://vercel.com/docs/domains/working-with-domains/assign-domain-to-a-git-branch)
