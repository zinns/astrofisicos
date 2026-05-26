const stableVersionPattern = /^\d+\.\d+\.\d+$/u;
const releaseTitlePattern =
  /^Release 📦 v(?<version>\d+\.\d+\.\d+(?:[-+][0-9A-Za-z.-]+)?)$/u;
const releaseTrackingPatterns = [
  /Release tracking:\s*#(?<issue>\d+)/iu,
  /Refs\s+#(?<issue>\d+)/iu,
];
const releaseLabelOrder = ["release:patch", "release:minor", "release:major"];

function toLabelNames(input) {
  const values = Array.isArray(input)
    ? input
    : typeof input === "string" && input.trim().length > 0
      ? JSON.parse(input)
      : [];

  return values
    .map((value) => {
      if (typeof value === "string") {
        return value;
      }

      if (
        value &&
        typeof value === "object" &&
        "name" in value &&
        typeof value.name === "string"
      ) {
        return value.name;
      }

      return null;
    })
    .filter(Boolean);
}

export function normalizeVersion(version) {
  const normalized = version.startsWith("v") ? version.slice(1) : version;

  if (!stableVersionPattern.test(normalized)) {
    throw new Error(
      `Version "${version}" must be a stable semantic version like 0.2.0.`,
    );
  }

  return normalized;
}

export function extractReleaseLabel(labels) {
  const matched = toLabelNames(labels).filter((label) =>
    releaseLabelOrder.includes(label),
  );

  if (matched.length !== 1) {
    throw new Error(
      'Exactly one release label is required: "release:patch", "release:minor", or "release:major".',
    );
  }

  return matched[0];
}

export function bumpVersion(version, releaseLabel) {
  const normalized = normalizeVersion(version);
  const [major, minor, patch] = normalized.split(".").map(Number);

  switch (releaseLabel) {
    case "release:patch":
      return `${major}.${minor}.${patch + 1}`;
    case "release:minor":
      return `${major}.${minor + 1}.0`;
    case "release:major":
      return `${major + 1}.0.0`;
    default:
      throw new Error(`Unsupported release label: ${releaseLabel}`);
  }
}

export function extractReleaseTrackingIssue(text) {
  for (const pattern of releaseTrackingPatterns) {
    const match = text.match(pattern);

    if (match?.groups?.issue) {
      return Number(match.groups.issue);
    }
  }

  throw new Error(
    'Release tracking issue reference not found. Expected "Release tracking: #123" or "Refs #123".',
  );
}

export function extractReleaseVersionFromTitle(title) {
  const match = title.match(releaseTitlePattern);

  if (!match?.groups?.version) {
    throw new Error(`Release PR title is invalid: "${title}"`);
  }

  return normalizeVersion(match.groups.version);
}

export function buildReleaseTrackingIssueTitle(dateStamp) {
  return `[Release]: ${dateStamp} candidate`;
}

export function buildReleaseTrackingIssueBody(dateStamp) {
  return [
    "## Target version",
    "",
    "- Decide the exact semantic version after the release label is chosen on the release PR.",
    "",
    "## Included changes",
    "",
    `- Automated release candidate opened on ${dateStamp}.`,
    "- Add any noteworthy features, fixes, or follow-up risks before shipping.",
    "",
    "## Validation checklist",
    "",
    "- PR metadata checks pass",
    "- Repository validation passes",
    "- Exactly one release label is applied on the develop -> release PR",
    "- Final release notes are ready",
    "",
    "## Release notes summary",
    "",
    "- Summarize the stakeholder-facing changes for the GitHub Release entry.",
  ].join("\n");
}

export function buildReleasePrTitle(issueNumber) {
  return `chore(release): prepare release candidate (#${issueNumber})`;
}

export function buildReleasePrBody(issueNumber) {
  return [
    "## Release tracking issue",
    "",
    `Release tracking: #${issueNumber}`,
    "",
    "## Scope of release",
    "",
    "- Summarize what is included in this release candidate.",
    "",
    "## Validation",
    "",
    "- [ ] PR metadata checks pass",
    "- [ ] `pnpm validate:ci`",
    "- [ ] Release notes are ready",
    "",
    "## Version label",
    "",
    "- Required before merge: exactly one of `release:patch`, `release:minor`, or `release:major`",
    "",
    "## Merge strategy",
    "",
    "- Squash merge only",
    "",
    "## Suggested commit title",
    "",
    `\`${buildReleasePrTitle(issueNumber)}\``,
    "",
    "## Next steps",
    "",
    "- Note anything that must happen before the `release -> main` PR is prepared.",
  ].join("\n");
}

export function buildMainReleasePrTitle(version) {
  return `Release 📦 v${normalizeVersion(version)}`;
}

export function buildMainReleasePrBody(issueNumber, version) {
  return [
    "## Release tracking issue",
    "",
    `Release tracking: #${issueNumber}`,
    "",
    "## Target version",
    "",
    `- \`v${normalizeVersion(version)}\``,
    "",
    "## Validation",
    "",
    "- [ ] PR metadata checks pass",
    "- [ ] Release validation is complete",
    "- [ ] Final release notes are ready",
    "",
    "## Deployment expectations",
    "",
    "- Vercel production should build from `main` only once the hosting constraint is resolved",
    "",
    "## Merge strategy",
    "",
    "- Squash merge only",
    "",
    "## Suggested commit title",
    "",
    `\`${buildMainReleasePrTitle(version)}\``,
    "",
    "## Next steps",
    "",
    "- Note the tag, release notes, and post-merge actions expected after merge.",
  ].join("\n");
}

export function buildReleaseTag(version) {
  return `v${normalizeVersion(version)}`;
}

export function buildReleaseIssueComment(version) {
  return `Released in ${buildReleaseTag(version)}.`;
}

export function getTodayDateStamp(date = new Date()) {
  return date.toISOString().slice(0, 10);
}
