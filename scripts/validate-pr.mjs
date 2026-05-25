import fs from "node:fs";
import { fileURLToPath } from "node:url";

const reset = "\u001b[0m";
const colors = {
  green: "\u001b[32m",
  red: "\u001b[31m",
  yellow: "\u001b[33m",
  cyan: "\u001b[36m",
  dim: "\u001b[2m",
};

const conventionalPrTitlePattern =
  /^(build|chore|ci|docs|feat|fix|perf|refactor|revert|style|test)(\([a-z0-9./-]+\))?!?: .+ \(#\d+\)$/u;
const releasePrTitlePattern =
  /^Release 📦 v\d+\.\d+\.\d+(?:[-+][0-9A-Za-z.-]+)?$/u;
const developIssueReferencePattern = /\b(Closes|Fixes)\s+#\d+\b/iu;
const releaseIssueReferencePattern =
  /\b(Release tracking:\s*#\d+|Refs\s+#\d+)\b/iu;
const releaseLabels = new Set([
  "release:patch",
  "release:minor",
  "release:major",
]);

function colorize(color, value) {
  return `${colors[color]}${value}${reset}`;
}

function printStatus(passed, label) {
  console.log(
    `${colorize(passed ? "green" : "red", passed ? "[PASS]" : "[FAIL]")} ${label}`,
  );
}

export function parseLabelNames(input) {
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

function buildLabelMessage(failures) {
  return failures.length === 0
    ? "Label requirements satisfied."
    : failures.join("\n");
}

export function validatePrMetadata({
  title,
  body,
  baseRef,
  headRef,
  labels = [],
}) {
  const labelNames = parseLabelNames(labels);
  const normalizedBody = body ?? "";
  const isAutomationPr = labelNames.includes("automation");
  const checks = [];

  checks.push({
    id: "title",
    label: "PR title",
    passed:
      baseRef === "main"
        ? releasePrTitlePattern.test(title)
        : conventionalPrTitlePattern.test(title),
    message:
      baseRef === "main"
        ? 'PR title must match "Release 📦 vX.Y.Z" for PRs targeting main.'
        : 'PR title must use a conventional commit title and end with a GitHub Issue ID like "(#123)".',
  });

  checks.push({
    id: "issue-reference",
    label: "Issue reference",
    passed:
      baseRef === "develop"
        ? developIssueReferencePattern.test(normalizedBody)
        : releaseIssueReferencePattern.test(normalizedBody),
    message:
      baseRef === "develop"
        ? 'PR body must include "Closes #123" or "Fixes #123".'
        : 'PR body must include "Release tracking: #123" or "Refs #123".',
  });

  const labelFailures = [];

  if (!labelNames.some((label) => label.startsWith("type:"))) {
    labelFailures.push("PR must include one type:* label.");
  }

  if (!labelNames.some((label) => label.startsWith("area:"))) {
    labelFailures.push("PR must include one area:* label.");
  }

  if (
    baseRef === "develop" &&
    !isAutomationPr &&
    !labelNames.includes("approved")
  ) {
    labelFailures.push(
      'PRs targeting develop must include the "approved" label before merge.',
    );
  }

  if (baseRef === "release") {
    const matchedReleaseLabels = labelNames.filter((label) =>
      releaseLabels.has(label),
    );

    if (matchedReleaseLabels.length !== 1) {
      labelFailures.push(
        'PRs targeting release must include exactly one of "release:patch", "release:minor", or "release:major".',
      );
    }

    if (headRef === "develop") {
      if (!labelNames.includes("automation")) {
        labelFailures.push(
          'The develop -> release PR must include the "automation" label.',
        );
      }

      if (!labelNames.includes("flow:release")) {
        labelFailures.push(
          'The develop -> release PR must include the "flow:release" label.',
        );
      }
    }
  }

  if (baseRef === "main" && headRef === "release") {
    if (!labelNames.includes("automation")) {
      labelFailures.push(
        'The release -> main PR must include the "automation" label.',
      );
    }

    if (!labelNames.includes("flow:main")) {
      labelFailures.push(
        'The release -> main PR must include the "flow:main" label.',
      );
    }
  }

  checks.push({
    id: "labels",
    label: "Labels",
    passed: labelFailures.length === 0,
    message: buildLabelMessage(labelFailures),
  });

  return checks;
}

function writeGithubSummary(results) {
  if (!process.env.GITHUB_STEP_SUMMARY) {
    return;
  }

  const lines = [
    "## PR Metadata Validation",
    "",
    "| Check | Status |",
    "| --- | --- |",
    ...results.map(
      (result) => `| ${result.label} | ${result.passed ? "PASS" : "FAIL"} |`,
    ),
  ];

  fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY, `${lines.join("\n")}\n`);
}

function isDirectExecution() {
  return process.argv[1] === fileURLToPath(import.meta.url);
}

if (isDirectExecution()) {
  const requestedCheckIndex = process.argv.indexOf("--check");
  const requestedCheck =
    requestedCheckIndex >= 0 ? process.argv[requestedCheckIndex + 1] : null;
  const results = validatePrMetadata({
    title: process.env.PR_TITLE ?? "",
    body: process.env.PR_BODY ?? "",
    baseRef: process.env.PR_BASE_REF ?? "",
    headRef: process.env.PR_HEAD_REF ?? "",
    labels: process.env.PR_LABELS ?? "[]",
  });
  const selectedResults = requestedCheck
    ? results.filter((result) => result.id === requestedCheck)
    : results;

  console.log(colorize("cyan", "PR Metadata Validation"));
  console.log(
    colorize("dim", requestedCheck ? `Check: ${requestedCheck}` : "Check: all"),
  );
  console.log("");

  for (const result of selectedResults) {
    printStatus(result.passed, result.label);

    if (!result.passed) {
      console.log(`  ${result.message}`);
    }
  }

  console.log("");

  const failed = selectedResults.filter((result) => !result.passed);
  console.log(
    failed.length === 0
      ? colorize(
          "green",
          `Summary: ${selectedResults.length}/${selectedResults.length} checks passed`,
        )
      : colorize(
          "red",
          `Summary: ${selectedResults.length - failed.length} passed, ${failed.length} failed`,
        ),
  );

  if (failed.length > 0) {
    console.log(
      colorize("yellow", "Action: update the PR metadata before merging."),
    );
  }

  writeGithubSummary(selectedResults);

  process.exit(failed.length === 0 ? 0 : 1);
}
