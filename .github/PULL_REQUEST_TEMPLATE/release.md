## Release tracking issue

Release tracking: #<release-tracking-issue>

## Scope of release

- Summarize what is included in this release candidate.

## Validation

- [ ] PR metadata checks pass
- [ ] `pnpm validate:ci`
- [ ] Release notes are ready

## Principal branch safety

- [ ] This is the only active `develop -> release` PR for the current candidate
- [ ] No open `main -> develop` sync PR remains unmerged
- [ ] `release` contains only stabilization work and release-approved fixes
- [ ] No feature work was added directly to `release`

## Version label

- Required before merge: exactly one of `release:patch`, `release:minor`, or `release:major`

## Merge strategy

- Squash merge only

## Suggested commit title

`chore(release): prepare release candidate (#<release-tracking-issue>)`

## Next steps

- Note anything that must happen before the `release -> main` PR is prepared.
