const releaseCommitPattern = /^Release 📦 v\d+\.\d+\.\d+(?:[-+][0-9A-Za-z.-]+)?$/u;
const conventionalCommitWithIssuePattern =
  /^(build|chore|ci|docs|feat|fix|perf|refactor|revert|style|test)(\([a-z0-9./-]+\))?!?: .+ \(#\d+\)$/u;

module.exports = {
  extends: ["@commitlint/config-conventional"],
  ignores: [(message) => releaseCommitPattern.test(message.trim())],
  plugins: [
    {
      rules: {
        "header-with-issue-id": (parsed) => {
          const valid = conventionalCommitWithIssuePattern.test((parsed.header ?? "").trim());

          return [
            valid,
            'commit header must use a conventional commit and end with a GitHub Issue ID like "(#123)"',
          ];
        },
      },
    },
  ],
  rules: {
    "header-max-length": [2, "always", 120],
    "header-with-issue-id": [2, "always"],
  },
};
