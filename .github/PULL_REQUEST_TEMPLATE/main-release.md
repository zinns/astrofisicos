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

- Note the tag, release notes, and post-merge actions expected after merge.
