import { describe, expect, it } from "vitest";

import { buildGitHubApiErrorMessage } from "../../scripts/github-api.mjs";

describe("buildGitHubApiErrorMessage", () => {
  it("returns the fallback for empty responses", () => {
    expect(buildGitHubApiErrorMessage(500, null)).toBe(
      "GitHub API request failed with status 500.",
    );
  });

  it("appends structured validation details when GitHub provides them", () => {
    expect(
      buildGitHubApiErrorMessage(422, {
        message: "Validation Failed",
        errors: [
          {
            resource: "PullRequest",
            field: "base",
            code: "invalid",
            message: "Base branch was not found.",
          },
        ],
      }),
    ).toBe(
      "Validation Failed: PullRequest base invalid Base branch was not found.",
    );
  });
});
