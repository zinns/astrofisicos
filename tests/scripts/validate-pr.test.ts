import { describe, expect, it } from "vitest";

import { parseLabelNames, validatePrMetadata } from "../../scripts/validate-pr.mjs";

describe("parseLabelNames", () => {
  it("extracts label names from GitHub label objects", () => {
    expect(parseLabelNames([{ name: "type:chore" }, { name: "area:infra" }])).toEqual([
      "type:chore",
      "area:infra",
    ]);
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
      approvalCount: 1,
    });

    expect(checks.every((check) => check.passed)).toBe(true);
  });

  it("rejects a develop PR without approval metadata", () => {
    const checks = validatePrMetadata({
      title: "chore(tooling): add local developer gates (#3)",
      body: "Closes #3",
      baseRef: "develop",
      headRef: "chore/3-phase-2-local-gates",
      labels: ["type:chore", "area:infra"],
      approvalCount: 0,
    });

    expect(checks.find((check) => check.id === "labels")?.passed).toBe(false);
    expect(checks.find((check) => check.id === "approval")?.passed).toBe(false);
  });

  it("accepts a valid release candidate PR", () => {
    const checks = validatePrMetadata({
      title: "chore(release): prepare release candidate (#12)",
      body: "Release tracking: #12",
      baseRef: "release",
      headRef: "develop",
      labels: ["type:chore", "area:infra", "release:minor", "automation", "flow:release"],
      approvalCount: 0,
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
      approvalCount: 0,
    });

    expect(checks.find((check) => check.id === "title")?.passed).toBe(false);
  });
});

