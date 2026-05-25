import { execFileSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

export const BRANCH_NAME_PATTERN =
  /^(main|release|develop|feat\/[0-9]+-[a-z0-9-]+|fix\/[0-9]+-[a-z0-9-]+|chore\/[0-9]+-[a-z0-9-]+|docs\/[0-9]+-[a-z0-9-]+|refactor\/[0-9]+-[a-z0-9-]+|test\/[0-9]+-[a-z0-9-]+|ci\/[0-9]+-[a-z0-9-]+)$/u;

export function getBranchName(inputBranchName) {
  if (inputBranchName) {
    return inputBranchName;
  }

  return execFileSync("git", ["rev-parse", "--abbrev-ref", "HEAD"], {
    encoding: "utf8",
  }).trim();
}

export function validateBranchName(branchName) {
  const isValid = BRANCH_NAME_PATTERN.test(branchName);

  return {
    branchName,
    isValid,
    message: isValid
      ? `Branch name is valid: ${branchName}`
      : [
          `Branch name is invalid: ${branchName}`,
          "Allowed examples: feat/123-short-slug, fix/456-short-slug, chore/789-short-slug.",
          'Permanent branches are limited to "main", "release", and "develop".',
        ].join("\n"),
  };
}

function getBranchArgument(argv) {
  const branchFlagIndex = argv.indexOf("--branch");

  return branchFlagIndex >= 0 ? argv[branchFlagIndex + 1] : undefined;
}

function isDirectExecution() {
  return process.argv[1] === fileURLToPath(import.meta.url);
}

if (isDirectExecution()) {
  try {
    const branchName = getBranchName(getBranchArgument(process.argv.slice(2)));
    const result = validateBranchName(branchName);

    if (!result.isValid) {
      console.error(result.message);
      process.exit(1);
    }

    console.log(result.message);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    const scriptName = path.basename(fileURLToPath(import.meta.url));

    console.error(`${scriptName} failed: ${message}`);
    process.exit(1);
  }
}

