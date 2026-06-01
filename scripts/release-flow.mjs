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

export function hasPullRequestDiff(compare) {
  if (!compare || typeof compare !== "object") {
    return false;
  }

  if (Array.isArray(compare.files)) {
    return compare.files.length > 0;
  }

  return (
    Number(compare.ahead_by ?? 0) > 0 || Number(compare.total_commits ?? 0) > 0
  );
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
    "- Merge commit only",
    "- Do not squash permanent-branch PRs; preserving ancestry prevents future release conflicts.",
    "",
    "## Suggested commit title",
    "",
    `\`${buildReleasePrTitle(issueNumber)}\``,
    "",
    "## Next steps",
    "",
    "- After merge, automation will bump the version on `release` and create or update a `main`-based production snapshot PR.",
    "- Note any release-only fixes or validation steps that must happen before the automated production snapshot PR is merged.",
  ].join("\n");
}

export function buildMainReleasePrTitle(version) {
  return `Release 📦 v${normalizeVersion(version)}`;
}

export function buildMainReleaseBranchName(issueNumber, version) {
  return `ci/${issueNumber}-main-release-v${normalizeVersion(version).replaceAll(".", "-")}`;
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
    "- This PR is generated from a branch based on `main`, with the validated `release` tree copied into one release snapshot commit.",
    "- This merge is expected to trigger the only production deployment path: production snapshot -> `main` and then Vercel building from `main`.",
    "- `main` must contain only `Release 📦 v...` production release commits and their release PR merge commits.",
    "",
    "## Merge strategy",
    "",
    "- Merge commit only",
    "- Use the PR title as the merge commit title.",
    "- Do not change this PR to direct `release -> main`; direct permanent-branch production merges are intentionally blocked to keep `main` release-only.",
    "",
    "## Suggested commit title",
    "",
    `\`${buildMainReleasePrTitle(version)}\``,
    "",
    "## Next steps",
    "",
    "- After merge, automation will create or update the Git tag and GitHub Release, close the release-tracking issue, and create or update the release metadata sync PR into `develop`.",
    "- The generated sync PR must merge before any other PR targeting `develop` proceeds.",
  ].join("\n");
}

export function buildDevelopSyncPrTitle(issueNumber) {
  return `chore(release): sync release metadata (#${issueNumber})`;
}

export function buildDevelopSyncPrBody(issueNumber, version) {
  return [
    "## Release tracking issue",
    "",
    `Refs #${issueNumber}`,
    "",
    "## Purpose",
    "",
    `- Apply released version \`v${normalizeVersion(version)}\` onto a branch created from \`develop\`.`,
    "- Keep version metadata aligned before the next release cycle starts.",
    "- Avoid a direct permanent-branch merge when only release metadata needs to be synchronized.",
    "",
    "## Validation",
    "",
    "- [ ] PR metadata checks pass",
    "- [ ] Repository validation passes",
    "",
    "## Merge strategy",
    "",
    "- Merge commit only",
    "- Use the PR title as the merge commit title.",
    "",
    "## Suggested commit title",
    "",
    `\`${buildDevelopSyncPrTitle(issueNumber)}\``,
    "",
    "## Next steps",
    "",
    "- Merge this sync PR before any other PR targeting `develop` proceeds.",
    "- After it merges, normal feature PRs to `develop` and the next `develop -> release` cycle may continue without version drift.",
  ].join("\n");
}

export function buildDevelopSyncBranchName(issueNumber) {
  return `ci/${issueNumber}-release-metadata-sync`;
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
