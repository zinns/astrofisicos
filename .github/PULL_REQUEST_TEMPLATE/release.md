## Release tracking issue

Release tracking: #<release-tracking-issue>

## Scope of release

- Summarize what is included in this release candidate.

## Validation

- [ ] PR metadata checks pass
- [ ] `pnpm validate:ci`
- [ ] Release notes are ready

## Version label

- Required before merge: exactly one of `release:patch`, `release:minor`, or `release:major`

## Merge strategy

- Squash merge only

## Suggested commit title

`chore(release): prepare release candidate (#<release-tracking-issue>)`

## Next steps

- Note anything that must happen before the `release -> main` PR is prepared.
