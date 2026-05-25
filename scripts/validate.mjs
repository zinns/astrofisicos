import { spawnSync } from "node:child_process";
import fs from "node:fs";

import { getBranchName, validateBranchName } from "./validate-branch-name.mjs";

const isCiMode = process.argv.includes("--ci");
const pnpmCommand = process.platform === "win32" ? "pnpm.cmd" : "pnpm";
const reset = "\u001b[0m";
const colors = {
  green: "\u001b[32m",
  red: "\u001b[31m",
  yellow: "\u001b[33m",
  cyan: "\u001b[36m",
  dim: "\u001b[2m",
};

function colorize(color, value) {
  return `${colors[color]}${value}${reset}`;
}

function printStatus(status, label) {
  const palette = {
    PASS: "green",
    FAIL: "red",
    SKIP: "yellow",
  };

  console.log(`${colorize(palette[status], `[${status}]`)} ${label}`);
}

function indentOutput(output) {
  return output
    .trim()
    .split("\n")
    .map((line) => `  ${line}`)
    .join("\n");
}

function runCommand(label, args) {
  const result = spawnSync(pnpmCommand, args, {
    encoding: "utf8",
    stdio: "pipe",
  });

  const output = `${result.stdout ?? ""}${result.stderr ?? ""}`.trim();
  const passed = result.status === 0;

  printStatus(passed ? "PASS" : "FAIL", label);

  if (!passed && output) {
    console.log(indentOutput(output));
  }

  return {
    label,
    passed,
    output,
  };
}

function runBranchValidation() {
  try {
    const result = validateBranchName(getBranchName());

    printStatus(result.isValid ? "PASS" : "FAIL", "Branch name");

    if (!result.isValid) {
      console.log(indentOutput(result.message));
    }

    return {
      label: "Branch name",
      passed: result.isValid,
      output: result.message,
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);

    printStatus("FAIL", "Branch name");
    console.log(indentOutput(message));

    return {
      label: "Branch name",
      passed: false,
      output: message,
    };
  }
}

function writeGithubSummary(results) {
  if (!process.env.GITHUB_STEP_SUMMARY) {
    return;
  }

  const lines = [
    "## Repository Validation",
    "",
    "| Check | Status |",
    "| --- | --- |",
    ...results.map((result) => `| ${result.label} | ${result.passed ? "PASS" : "FAIL"} |`),
  ];

  fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY, `${lines.join("\n")}\n`);
}

console.log(colorize("cyan", "Repository Validation"));
console.log(colorize("dim", isCiMode ? "Mode: ci" : "Mode: local"));
console.log("");

const results = [];

if (isCiMode) {
  printStatus("SKIP", "Branch name (handled separately in CI)");
} else {
  results.push(runBranchValidation());
}

results.push(runCommand("ESLint", ["lint"]));
results.push(runCommand("Stylelint", ["lint:css"]));
results.push(runCommand("TypeScript", ["typecheck"]));
results.push(runCommand("Tests", ["test:run"]));

if (isCiMode) {
  results.push(runCommand("Next build", ["build"]));
}

const failed = results.filter((result) => !result.passed);
const passed = results.filter((result) => result.passed);

console.log("");
console.log(
  failed.length === 0
    ? colorize("green", `Summary: ${passed.length}/${results.length} checks passed`)
    : colorize("red", `Summary: ${passed.length} passed, ${failed.length} failed`),
);

if (failed.length > 0) {
  console.log(colorize("yellow", "Action: fix the failing checks before retrying."));
}

writeGithubSummary(results);

process.exit(failed.length === 0 ? 0 : 1);

