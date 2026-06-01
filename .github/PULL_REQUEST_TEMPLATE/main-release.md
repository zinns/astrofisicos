## Release tracking issue

Release tracking: #<release-tracking-issue>

## Target version

- State the exact version that will land on `main`.

## Validation

- [ ] PR metadata checks pass
- [ ] Release validation is complete
- [ ] Final release notes are ready

## Principal branch safety

- [ ] This PR comes from a generated branch named like `ci/<release-issue>-main-release-vX-Y-Z`
- [ ] This is the only active production snapshot PR for the current candidate
- [ ] The snapshot commit copies the validated `release` tree into one `Release 📦 vX.Y.Z` commit
- [ ] After merge, the automated release metadata sync PR must be allowed to open and merge before the next `develop -> release` merge

## Deployment expectations

- This merge is expected to trigger the only production deployment path: production snapshot -> `main` and then Vercel building from `main`
- `main` should contain only `Release 📦 v...` release commits and their release PR merge commits

## Merge strategy

- Merge commit only
- Use the PR title as the merge commit title.
- Do not replace this PR with a direct `release -> main` PR.

## Suggested commit title

`Release 📦 vX.Y.Z`

## Next steps

- After merge, automation will create or update the Git tag and GitHub Release, close the release-tracking issue, and create or update the release metadata sync PR into `develop`.
- That generated sync PR must merge before any other PR targeting `develop` proceeds.
