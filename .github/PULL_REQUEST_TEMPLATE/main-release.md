## Release tracking issue

Release tracking: #<release-tracking-issue>

## Target version

- State the exact version that will land on `main`.

## Validation

- [ ] PR metadata checks pass
- [ ] Release validation is complete
- [ ] Final release notes are ready

## Principal branch safety

- [ ] This is the only active `release -> main` PR for the current candidate
- [ ] `release` contains only the intended release changes
- [ ] After merge, the automated `main -> develop` sync PR must be allowed to open and merge before the next `develop -> release` merge

## Deployment expectations

- This merge is expected to trigger the only production deployment path: `release -> main` and then Vercel building from `main`

## Merge strategy

- Squash merge only

## Suggested commit title

`Release 📦 vX.Y.Z`

## Next steps

- After merge, automation will create or update the Git tag and GitHub Release, close the release-tracking issue, and create or update the `main -> develop` sync PR.
- That generated sync PR must merge before any other PR targeting `develop` proceeds.
