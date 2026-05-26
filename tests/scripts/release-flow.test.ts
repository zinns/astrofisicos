import { describe, expect, it } from "vitest";

import {
  buildMainReleasePrBody,
  buildMainReleasePrTitle,
  buildReleaseIssueComment,
  buildReleasePrBody,
  buildReleasePrTitle,
  buildReleaseTag,
  buildReleaseTrackingIssueTitle,
  bumpVersion,
  extractReleaseLabel,
  extractReleaseTrackingIssue,
  extractReleaseVersionFromTitle,
  getTodayDateStamp,
  normalizeVersion,
} from "../../scripts/release-flow.mjs";

describe("normalizeVersion", () => {
  it("accepts stable semver values with or without a leading v", () => {
    expect(normalizeVersion("0.2.1")).toBe("0.2.1");
    expect(normalizeVersion("v1.0.0")).toBe("1.0.0");
  });

  it("rejects unstable or malformed versions", () => {
    expect(() => normalizeVersion("1.0")).toThrow();
    expect(() => normalizeVersion("v1.0.0-beta.1")).toThrow();
  });
});

describe("extractReleaseLabel", () => {
  it("returns the single required release label", () => {
    expect(
      extractReleaseLabel([{ name: "type:chore" }, { name: "release:minor" }]),
    ).toBe("release:minor");
  });

  it("rejects missing or multiple release labels", () => {
    expect(() => extractReleaseLabel(["type:chore"])).toThrow();
    expect(() =>
      extractReleaseLabel(["release:patch", "release:minor"]),
    ).toThrow();
  });
});

describe("bumpVersion", () => {
  it("bumps patch, minor, and major versions", () => {
    expect(bumpVersion("0.1.0", "release:patch")).toBe("0.1.1");
    expect(bumpVersion("0.1.0", "release:minor")).toBe("0.2.0");
    expect(bumpVersion("0.1.0", "release:major")).toBe("1.0.0");
  });
});

describe("release tracking issue parsing", () => {
  it("extracts the release tracking issue from supported phrases", () => {
    expect(extractReleaseTrackingIssue("Release tracking: #12")).toBe(12);
    expect(extractReleaseTrackingIssue("Refs #47")).toBe(47);
  });

  it("rejects missing release tracking issue references", () => {
    expect(() => extractReleaseTrackingIssue("Closes #9")).toThrow();
  });
});

describe("release metadata builders", () => {
  it("formats release issue and PR metadata", () => {
    expect(buildReleaseTrackingIssueTitle("2026-05-26")).toBe(
      "[Release]: 2026-05-26 candidate",
    );
    expect(buildReleasePrTitle(14)).toBe(
      "chore(release): prepare release candidate (#14)",
    );
    expect(buildReleasePrBody(14)).toContain("Release tracking: #14");
    expect(buildMainReleasePrTitle("0.2.0")).toBe("Release 📦 v0.2.0");
    expect(buildMainReleasePrBody(14, "0.2.0")).toContain("`v0.2.0`");
  });

  it("formats release tags and closing comments", () => {
    expect(buildReleaseTag("0.2.0")).toBe("v0.2.0");
    expect(buildReleaseIssueComment("0.2.0")).toBe("Released in v0.2.0.");
  });
});

describe("release title parsing", () => {
  it("extracts the version from the main release PR title", () => {
    expect(extractReleaseVersionFromTitle("Release 📦 v1.3.0")).toBe("1.3.0");
  });

  it("rejects invalid main release PR titles", () => {
    expect(() =>
      extractReleaseVersionFromTitle("chore(release): prepare candidate (#12)"),
    ).toThrow();
  });
});

describe("getTodayDateStamp", () => {
  it("returns an ISO calendar date", () => {
    expect(getTodayDateStamp(new Date("2026-05-26T18:00:00.000Z"))).toBe(
      "2026-05-26",
    );
  });
});
