import { describe, expect, it } from "vitest";

import { derivePrLabels } from "../../scripts/derive-pr-labels.mjs";
import {
  parseLabelNames,
  validatePrMetadata,
} from "../../scripts/validate-pr.mjs";

describe("parseLabelNames", () => {
  it("extracts label names from GitHub label objects", () => {
    expect(
      parseLabelNames([{ name: "type:chore" }, { name: "area:infra" }]),
    ).toEqual(["type:chore", "area:infra"]);
  });
});

describe("derivePrLabels", () => {
  it("derives type and area labels from a conventional title", () => {
    expect(
      derivePrLabels({
        title: "chore(ci): add GitHub collaboration rules (#5)",
        baseRef: "develop",
        headRef: "chore/5-phase-3-github-collaboration",
      }),
    ).toEqual(["type:chore", "area:ci"]);
  });

  it("adds automation labels for develop to release PRs", () => {
    expect(
      derivePrLabels({
        title: "chore(release): prepare release candidate (#12)",
        baseRef: "release",
        headRef: "develop",
      }),
    ).toEqual(
      expect.arrayContaining([
        "type:chore",
        "area:infra",
        "automation",
        "flow:release",
      ]),
    );
  });

  it("adds automation labels for release to main PRs", () => {
    expect(
      derivePrLabels({
        title: "Release 📦 v0.2.0",
        baseRef: "main",
        headRef: "release",
      }),
    ).toEqual(
      expect.arrayContaining([
        "type:chore",
        "area:infra",
        "automation",
        "flow:main",
      ]),
    );
  });
});

describe("validatePrMetadata", () => {
  it("accepts a valid develop PR", () => {
    const checks = validatePrMetadata({
      title: "chore(tooling): add local developer gates (#3)",
      body: "Closes #3",
      baseRef: "develop",
      headRef: "chore/3-phase-2-local-gates",
      labels: ["type:chore", "area:infra", "approved"],
    });

    expect(checks.every((check) => check.passed)).toBe(true);
  });

  it("rejects a develop PR without the approved label", () => {
    const checks = validatePrMetadata({
      title: "chore(tooling): add local developer gates (#3)",
      body: "Closes #3",
      baseRef: "develop",
      headRef: "chore/3-phase-2-local-gates",
      labels: ["type:chore", "area:infra"],
    });

    expect(checks.find((check) => check.id === "labels")?.passed).toBe(false);
  });

  it("accepts an automated develop PR without the approved label", () => {
    const checks = validatePrMetadata({
      title: "ci(workflow): sync generated metadata rules (#33)",
      body: "Closes #33",
      baseRef: "develop",
      headRef: "ci/33-sync-workflow-rules",
      labels: ["type:ci", "area:ci", "automation"],
    });

    expect(checks.every((check) => check.passed)).toBe(true);
  });

  it("accepts a valid release candidate PR", () => {
    const checks = validatePrMetadata({
      title: "chore(release): prepare release candidate (#12)",
      body: "Release tracking: #12",
      baseRef: "release",
      headRef: "develop",
      labels: [
        "type:chore",
        "area:infra",
        "release:minor",
        "automation",
        "flow:release",
      ],
    });

    expect(checks.every((check) => check.passed)).toBe(true);
  });

  it("enforces the main release PR title", () => {
    const checks = validatePrMetadata({
      title: "chore(release): prepare release candidate (#12)",
      body: "Release tracking: #12",
      baseRef: "main",
      headRef: "release",
      labels: ["type:chore", "area:infra", "automation", "flow:main"],
    });

    expect(checks.find((check) => check.id === "title")?.passed).toBe(false);
  });
});
