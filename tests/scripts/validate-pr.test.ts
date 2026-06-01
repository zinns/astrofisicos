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

  it("adds automation labels for production snapshot PRs", () => {
    expect(
      derivePrLabels({
        title: "Release 📦 v0.2.0",
        baseRef: "main",
        headRef: "ci/12-main-release-v0-2-0",
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

  it("adds automation labels for release metadata sync PRs", () => {
    expect(
      derivePrLabels({
        title: "chore(release): sync release metadata (#12)",
        baseRef: "develop",
        headRef: "ci/12-release-metadata-sync",
      }),
    ).toEqual(
      expect.arrayContaining(["type:chore", "area:infra", "automation"]),
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

  it("blocks non-sync PRs to develop while the release sync PR is open", () => {
    const checks = validatePrMetadata({
      title: "feat(content): add latest content hub entries (#18)",
      body: "Closes #18",
      baseRef: "develop",
      headRef: "feat/18-content-hub-update",
      labels: ["type:feature", "area:content", "approved"],
      openDevelopSyncPrNumber: 21,
    });

    const syncGate = checks.find((check) => check.id === "develop-sync-gate");

    expect(syncGate?.passed).toBe(false);
    expect(syncGate?.message).toContain("sync PR #21");
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

  it("uses derived labels when metadata arrives before auto-labeling", () => {
    const checks = validatePrMetadata({
      title: "chore(ci): add GitHub collaboration rules (#5)",
      body: "Closes #5",
      baseRef: "develop",
      headRef: "chore/5-phase-3-github-collaboration",
      labels: [],
    });
    const labelResult = checks.find((check) => check.id === "labels");

    expect(labelResult?.passed).toBe(false);
    expect(labelResult?.message).toContain(
      'PRs targeting develop must include the "approved" label before merge.',
    );
    expect(labelResult?.message).not.toContain(
      "PR must include one type:* label.",
    );
    expect(labelResult?.message).not.toContain(
      "PR must include one area:* label.",
    );
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

  it("accepts an automated release metadata sync PR with a non-closing issue reference", () => {
    const checks = validatePrMetadata({
      title: "chore(release): sync release metadata (#12)",
      body: "Refs #12",
      baseRef: "develop",
      headRef: "ci/12-release-metadata-sync",
      labels: ["type:chore", "area:infra", "automation"],
      openDevelopSyncPrNumber: 34,
    });

    expect(checks.every((check) => check.passed)).toBe(true);
  });

  it("accepts an automated production snapshot PR before labels persist", () => {
    const checks = validatePrMetadata({
      title: "Release 📦 v0.2.0",
      body: "Release tracking: #12",
      baseRef: "main",
      headRef: "ci/12-main-release-v0-2-0",
      labels: [],
    });

    expect(checks.every((check) => check.passed)).toBe(true);
  });

  it("rejects direct release to main PRs", () => {
    const checks = validatePrMetadata({
      title: "Release 📦 v0.2.0",
      body: "Release tracking: #12",
      baseRef: "main",
      headRef: "release",
      labels: ["type:chore", "area:infra", "automation", "flow:main"],
    });

    expect(checks.find((check) => check.id === "labels")?.passed).toBe(false);
    expect(checks.find((check) => check.id === "labels")?.message).toContain(
      "generated main-based release snapshot branch",
    );
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
