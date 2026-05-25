import { describe, expect, it } from "vitest";

import { BRANCH_NAME_PATTERN, validateBranchName } from "../../scripts/validate-branch-name.mjs";

describe("validateBranchName", () => {
  it("accepts allowed working branch names", () => {
    expect(BRANCH_NAME_PATTERN.test("chore/3-phase-2-local-gates")).toBe(true);
    expect(BRANCH_NAME_PATTERN.test("feat/42-refresh-homepage")).toBe(true);
    expect(BRANCH_NAME_PATTERN.test("fix/7-contact-form-copy")).toBe(true);
  });

  it("accepts the permanent branches", () => {
    expect(validateBranchName("main").isValid).toBe(true);
    expect(validateBranchName("release").isValid).toBe(true);
    expect(validateBranchName("develop").isValid).toBe(true);
  });

  it("rejects invalid branch names", () => {
    expect(validateBranchName("feature/home-redesign").isValid).toBe(false);
    expect(validateBranchName("chore/no-issue-id").isValid).toBe(false);
    expect(validateBranchName("random-branch").isValid).toBe(false);
  });
});

