import { describe, expect, it } from "vitest";

import { hasPullRequestDiff } from "../../scripts/release-flow.mjs";

describe("hasPullRequestDiff", () => {
  it("returns true when GitHub reports changed files", () => {
    expect(hasPullRequestDiff({ files: [{ filename: "package.json" }] })).toBe(
      true,
    );
  });

  it("falls back to ahead_by or total_commits when files are unavailable", () => {
    expect(hasPullRequestDiff({ ahead_by: 1, total_commits: 0 })).toBe(true);
    expect(hasPullRequestDiff({ ahead_by: 0, total_commits: 1 })).toBe(true);
  });

  it("returns false when no pull-request diff exists", () => {
    expect(hasPullRequestDiff({ files: [] })).toBe(false);
    expect(hasPullRequestDiff({ ahead_by: 0, total_commits: 0 })).toBe(false);
  });
});
