import fs from "node:fs";
import path from "node:path";

import { createGitHubClient, getRepoContext } from "./github-api.mjs";
import {
  buildDevelopSyncBranchName,
  buildDevelopSyncPrBody,
  buildDevelopSyncPrTitle,
  hasPullRequestDiff,
  buildMainReleasePrBody,
  buildMainReleasePrTitle,
  buildReleaseIssueComment,
  buildReleasePrBody,
  buildReleasePrTitle,
  buildReleaseTag,
  buildReleaseTrackingIssueBody,
  buildReleaseTrackingIssueTitle,
  bumpVersion,
  extractReleaseLabel,
  extractReleaseTrackingIssue,
  extractReleaseVersionFromTitle,
  getTodayDateStamp,
} from "./release-flow.mjs";

const summaryPath = process.env.GITHUB_STEP_SUMMARY;
const outputPath = process.env.GITHUB_OUTPUT;
const command = process.argv[2];

function appendSummary(title, lines) {
  if (!summaryPath) {
    return;
  }

  const block = [`## ${title}`, "", ...lines, ""].join("\n");
  fs.appendFileSync(summaryPath, block);
}

function writeOutputs(values) {
  if (!outputPath) {
    console.log(JSON.stringify(values, null, 2));
    return;
  }

  const lines = Object.entries(values).map(([key, value]) => `${key}=${value}`);
  fs.appendFileSync(outputPath, `${lines.join("\n")}\n`);
}

function getPackageVersion() {
  const packageJsonPath = path.join(process.cwd(), "package.json");
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));

  if (!packageJson.version || typeof packageJson.version !== "string") {
    throw new Error("package.json must contain a string version field.");
  }

  return packageJson.version;
}

function decodeBase64Content(value) {
  return Buffer.from(value.replaceAll("\n", ""), "base64").toString("utf8");
}

function encodeBase64Content(value) {
  return Buffer.from(value).toString("base64");
}

function getPullRequestNumber() {
  const fromEnv = process.env.PR_NUMBER;

  if (fromEnv) {
    return Number(fromEnv);
  }

  const eventPath = process.env.GITHUB_EVENT_PATH;

  if (!eventPath) {
    throw new Error("PR_NUMBER or GITHUB_EVENT_PATH is required.");
  }

  const event = JSON.parse(fs.readFileSync(eventPath, "utf8"));
  const eventNumber = event?.pull_request?.number;

  if (!eventNumber) {
    throw new Error(
      "Unable to resolve pull request number from event payload.",
    );
  }

  return Number(eventNumber);
}

async function getPullRequest(client, { owner, repo }, pullNumber) {
  const pull = await client.get(`/repos/${owner}/${repo}/pulls/${pullNumber}`);

  if (!pull) {
    throw new Error(`Pull request #${pullNumber} was not found.`);
  }

  return pull;
}

async function findOpenReleaseTrackingIssue(client, { owner, repo }) {
  const issues = await client.get(
    `/repos/${owner}/${repo}/issues?state=open&per_page=100`,
  );

  return (
    issues
      ?.filter(
        (issue) =>
          !issue.pull_request &&
          typeof issue.title === "string" &&
          issue.title.startsWith("[Release]:"),
      )
      .sort(
        (left, right) =>
          new Date(right.created_at).getTime() -
          new Date(left.created_at).getTime(),
      )[0] ?? null
  );
}

async function getBranch(client, { owner, repo }, branchName) {
  return client.get(`/repos/${owner}/${repo}/branches/${branchName}`);
}

async function createBranchRef(client, { owner, repo }, branchName, sha) {
  return client.post(`/repos/${owner}/${repo}/git/refs`, {
    ref: `refs/heads/${branchName}`,
    sha,
  });
}

async function getFileContent(client, { owner, repo }, filePath, ref) {
  const response = await client.get(
    `/repos/${owner}/${repo}/contents/${filePath}?ref=${encodeURIComponent(ref)}`,
  );

  if (!response?.content || response.encoding !== "base64") {
    throw new Error(
      `Unable to read ${filePath} from ${ref}; expected base64 file content.`,
    );
  }

  return {
    content: decodeBase64Content(response.content),
    sha: response.sha,
  };
}

async function getPackageVersionFromBranch(client, repoContext, branchName) {
  const file = await getFileContent(
    client,
    repoContext,
    "package.json",
    branchName,
  );
  const packageJson = JSON.parse(file.content);

  if (!packageJson.version || typeof packageJson.version !== "string") {
    throw new Error(
      `package.json on ${branchName} must contain a string version field.`,
    );
  }

  return packageJson.version;
}

async function ensureBranchExists(
  client,
  repoContext,
  branchName,
  sourceBranchName,
) {
  const existingBranch = await getBranch(client, repoContext, branchName);

  if (existingBranch) {
    return { branch: existingBranch, created: false };
  }

  const sourceBranch = await getBranch(client, repoContext, sourceBranchName);

  if (!sourceBranch?.commit?.sha) {
    throw new Error(
      `Unable to restore "${branchName}" because "${sourceBranchName}" could not be resolved.`,
    );
  }

  const createdBranch = await createBranchRef(
    client,
    repoContext,
    branchName,
    sourceBranch.commit.sha,
  );

  return {
    branch: createdBranch,
    created: true,
    sourceBranchName,
    sourceSha: sourceBranch.commit.sha,
  };
}

async function ensureBranchFromSource(
  client,
  repoContext,
  branchName,
  sourceBranchName,
) {
  const existingBranch = await getBranch(client, repoContext, branchName);

  if (existingBranch) {
    return { branch: existingBranch, created: false };
  }

  const sourceBranch = await getBranch(client, repoContext, sourceBranchName);

  if (!sourceBranch?.commit?.sha) {
    throw new Error(
      `Unable to create "${branchName}" because "${sourceBranchName}" could not be resolved.`,
    );
  }

  const createdBranch = await createBranchRef(
    client,
    repoContext,
    branchName,
    sourceBranch.commit.sha,
  );

  return {
    branch: createdBranch,
    created: true,
    sourceBranchName,
    sourceSha: sourceBranch.commit.sha,
  };
}

async function ensureReleaseTrackingIssue(client, repoContext) {
  const existing = await findOpenReleaseTrackingIssue(client, repoContext);

  if (existing) {
    return existing;
  }

  const dateStamp = getTodayDateStamp();

  return client.post(`/repos/${repoContext.owner}/${repoContext.repo}/issues`, {
    title: buildReleaseTrackingIssueTitle(dateStamp),
    body: buildReleaseTrackingIssueBody(dateStamp),
    labels: ["type:chore", "area:infra", "automation"],
  });
}

async function findOpenPullRequest(client, { owner, repo }, { base, head }) {
  const pullRequests = await client.get(
    `/repos/${owner}/${repo}/pulls?state=open&base=${base}&head=${owner}:${head}&per_page=10`,
  );

  return pullRequests?.[0] ?? null;
}

async function addLabels(client, { owner, repo }, issueNumber, labels) {
  await client.post(`/repos/${owner}/${repo}/issues/${issueNumber}/labels`, {
    labels,
  });
}

async function closePullRequest(client, { owner, repo }, pullNumber, body) {
  await client.post(`/repos/${owner}/${repo}/issues/${pullNumber}/comments`, {
    body,
  });
  await client.patch(`/repos/${owner}/${repo}/pulls/${pullNumber}`, {
    state: "closed",
  });
}

async function updatePackageVersionOnBranch(
  client,
  { owner, repo },
  { branchName, version },
) {
  const file = await getFileContent(
    client,
    { owner, repo },
    "package.json",
    branchName,
  );
  const packageJson = JSON.parse(file.content);

  if (packageJson.version === version) {
    return false;
  }

  packageJson.version = version;

  await client.put(`/repos/${owner}/${repo}/contents/package.json`, {
    branch: branchName,
    content: encodeBase64Content(`${JSON.stringify(packageJson, null, 2)}\n`),
    message: `chore(release): sync release metadata v${version}`,
    sha: file.sha,
  });

  return true;
}

async function compareBranches(client, { owner, repo }, { base, head }) {
  return client.get(`/repos/${owner}/${repo}/compare/${base}...${head}`);
}

async function syncReleasePr() {
  const client = createGitHubClient();
  const repoContext = getRepoContext();
  const mainVersion = await getPackageVersionFromBranch(
    client,
    repoContext,
    "main",
  );
  const developVersion = await getPackageVersionFromBranch(
    client,
    repoContext,
    "develop",
  );

  if (mainVersion !== developVersion) {
    const releaseIssue = await ensureReleaseTrackingIssue(client, repoContext);
    const existingReleasePr = await findOpenPullRequest(client, repoContext, {
      base: "release",
      head: "develop",
    });

    if (existingReleasePr) {
      await closePullRequest(
        client,
        repoContext,
        existingReleasePr.number,
        [
          "Closing this release candidate because production release metadata has not been synced back into `develop` yet.",
          "",
          `- \`main\`: \`v${mainVersion}\``,
          `- \`develop\`: \`v${developVersion}\``,
          "",
          "The release automation will create or update the release metadata sync PR first. Reopen the release candidate only after that sync lands.",
        ].join("\n"),
      );
    }

    await syncDevelopPr({
      issueNumber: releaseIssue.number,
      version: mainVersion,
    });

    appendSummary("Release PR Automation", [
      `- Paused develop -> release PR creation because \`develop\` is on \`v${developVersion}\` and \`main\` is on \`v${mainVersion}\`.`,
      existingReleasePr
        ? `- Closed stale develop -> release PR #${existingReleasePr.number}.`
        : "- No stale develop -> release PR needed closing.",
      "- Created or updated the release metadata sync PR into `develop` first.",
      "- Merge that sync PR before opening the next release candidate.",
    ]);

    return;
  }

  const releaseBranch = await ensureBranchExists(
    client,
    repoContext,
    "release",
    "main",
  );
  const existingPr = await findOpenPullRequest(client, repoContext, {
    base: "release",
    head: "develop",
  });

  if (existingPr) {
    const releaseIssue = await ensureReleaseTrackingIssue(client, repoContext);
    const hasReleaseReference =
      typeof existingPr.body === "string" &&
      existingPr.body.includes(`Release tracking: #${releaseIssue.number}`);

    if (!hasReleaseReference) {
      await client.patch(
        `/repos/${repoContext.owner}/${repoContext.repo}/pulls/${existingPr.number}`,
        {
          body: buildReleasePrBody(releaseIssue.number),
          title: buildReleasePrTitle(releaseIssue.number),
        },
      );
    }

    await addLabels(client, repoContext, existingPr.number, [
      "type:chore",
      "area:infra",
      "automation",
      "flow:release",
    ]);

    const summaryLines = [];

    if (releaseBranch.created) {
      summaryLines.push(
        `- Restored missing \`release\` branch from \`main\` at \`${releaseBranch.sourceSha.slice(0, 7)}\`.`,
      );
    }

    summaryLines.push(
      `- Reused release tracking issue #${releaseIssue.number}.`,
      `- Reused open develop -> release PR #${existingPr.number}.`,
      "- Ensured automation labels are present.",
    );

    appendSummary("Release PR Automation", [...summaryLines]);

    return;
  }

  const comparison = await compareBranches(client, repoContext, {
    base: "release",
    head: "develop",
  });

  if (!hasPullRequestDiff(comparison)) {
    const summaryLines = [];

    if (releaseBranch.created) {
      summaryLines.push(
        `- Restored missing \`release\` branch from \`main\` at \`${releaseBranch.sourceSha.slice(0, 7)}\`.`,
      );
    }

    summaryLines.push(
      "- No unreleased changes were detected between `develop` and `release`; no release PR was opened.",
    );

    appendSummary("Release PR Automation", summaryLines);
    return;
  }

  const releaseIssue = await ensureReleaseTrackingIssue(client, repoContext);
  const createdPr = await client.post(
    `/repos/${repoContext.owner}/${repoContext.repo}/pulls`,
    {
      base: "release",
      body: buildReleasePrBody(releaseIssue.number),
      head: "develop",
      title: buildReleasePrTitle(releaseIssue.number),
    },
  );

  await addLabels(client, repoContext, createdPr.number, [
    "type:chore",
    "area:infra",
    "automation",
    "flow:release",
  ]);

  const summaryLines = [];

  if (releaseBranch.created) {
    summaryLines.push(
      `- Restored missing \`release\` branch from \`main\` at \`${releaseBranch.sourceSha.slice(0, 7)}\`.`,
    );
  }

  summaryLines.push(
    `- Reused or created release tracking issue #${releaseIssue.number}.`,
    `- Created develop -> release PR #${createdPr.number}.`,
    "- Applied automation labels. A human still needs a `release:*` label before merge.",
  );

  appendSummary("Release PR Automation", [...summaryLines]);
}

async function prepareMainMetadata() {
  const client = createGitHubClient();
  const repoContext = getRepoContext();
  const pullNumber = getPullRequestNumber();
  const pull = await getPullRequest(client, repoContext, pullNumber);
  const skipVersionBump = process.env.SKIP_VERSION_BUMP === "true";

  if (pull.base?.ref !== "release") {
    throw new Error(`Pull request #${pullNumber} does not target release.`);
  }

  if (!pull.merged_at) {
    throw new Error(`Pull request #${pullNumber} is not merged.`);
  }

  const releaseLabel = extractReleaseLabel(pull.labels);
  const releaseIssueNumber = extractReleaseTrackingIssue(pull.body ?? "");
  const currentVersion = getPackageVersion();
  const nextVersion = skipVersionBump
    ? currentVersion
    : bumpVersion(currentVersion, releaseLabel);

  writeOutputs({
    current_version: currentVersion,
    next_version: nextVersion,
    release_commit_title: buildMainReleasePrTitle(nextVersion),
    release_issue_number: releaseIssueNumber,
    release_label: releaseLabel,
    release_pr_number: pullNumber,
    tag_name: buildReleaseTag(nextVersion),
  });

  appendSummary("Prepare Main Release Metadata", [
    `- Release PR: #${pullNumber}`,
    `- Release tracking issue: #${releaseIssueNumber}`,
    `- Release label: \`${releaseLabel}\``,
    `- Current version: \`${currentVersion}\``,
    `- Next version: \`${nextVersion}\``,
    skipVersionBump
      ? "- Reusing the existing release commit on the release branch."
      : "- Preparing a new release commit on the release branch.",
  ]);
}

async function syncMainPr() {
  const client = createGitHubClient();
  const repoContext = getRepoContext();
  const releaseIssueNumber = Number(process.env.RELEASE_ISSUE_NUMBER);
  const nextVersion = process.env.NEXT_VERSION;

  if (!releaseIssueNumber || !nextVersion) {
    throw new Error(
      "RELEASE_ISSUE_NUMBER and NEXT_VERSION are required to sync the main release PR.",
    );
  }

  const title = buildMainReleasePrTitle(nextVersion);
  const body = buildMainReleasePrBody(releaseIssueNumber, nextVersion);
  const existingPr = await findOpenPullRequest(client, repoContext, {
    base: "main",
    head: "release",
  });

  if (existingPr) {
    await client.patch(
      `/repos/${repoContext.owner}/${repoContext.repo}/pulls/${existingPr.number}`,
      { body, title },
    );

    await addLabels(client, repoContext, existingPr.number, [
      "type:chore",
      "area:infra",
      "automation",
      "flow:main",
    ]);

    appendSummary("Main Release PR", [
      `- Updated release -> main PR #${existingPr.number}.`,
      `- Target version: \`v${nextVersion}\`.`,
    ]);

    return;
  }

  const comparison = await compareBranches(client, repoContext, {
    base: "main",
    head: "release",
  });

  if (!hasPullRequestDiff(comparison)) {
    appendSummary("Main Release PR", [
      "- No unreleased changes were detected between `release` and `main`; no release PR was opened.",
      `- Target version remains \`v${nextVersion}\`.`,
    ]);

    return;
  }

  const createdPr = await client.post(
    `/repos/${repoContext.owner}/${repoContext.repo}/pulls`,
    {
      base: "main",
      body,
      head: "release",
      title,
    },
  );

  await addLabels(client, repoContext, createdPr.number, [
    "type:chore",
    "area:infra",
    "automation",
    "flow:main",
  ]);

  appendSummary("Main Release PR", [
    `- Created release -> main PR #${createdPr.number}.`,
    `- Target version: \`v${nextVersion}\`.`,
  ]);
}

async function syncDevelopPr({ issueNumber, version }) {
  const client = createGitHubClient();
  const repoContext = getRepoContext();

  if (!issueNumber || !version) {
    throw new Error(
      "RELEASE_ISSUE_NUMBER and NEXT_VERSION are required to sync develop release metadata.",
    );
  }

  const branchName = buildDevelopSyncBranchName(issueNumber);
  const title = buildDevelopSyncPrTitle(issueNumber);
  const body = buildDevelopSyncPrBody(issueNumber, version);
  const developVersion = await getPackageVersionFromBranch(
    client,
    repoContext,
    "develop",
  );

  if (developVersion === version) {
    appendSummary("Develop Sync PR", [
      `- \`develop\` already contains released version \`v${version}\`; no sync PR was opened.`,
    ]);

    return;
  }

  await ensureBranchFromSource(client, repoContext, branchName, "develop");
  await updatePackageVersionOnBranch(client, repoContext, {
    branchName,
    version,
  });

  const existingPr = await findOpenPullRequest(client, repoContext, {
    base: "develop",
    head: branchName,
  });

  if (existingPr) {
    await client.patch(
      `/repos/${repoContext.owner}/${repoContext.repo}/pulls/${existingPr.number}`,
      { body, title },
    );

    await addLabels(client, repoContext, existingPr.number, [
      "type:chore",
      "area:infra",
      "automation",
    ]);

    appendSummary("Develop Sync PR", [
      `- Updated release metadata sync PR #${existingPr.number}.`,
      `- Synced released version \`v${version}\` back into develop metadata.`,
    ]);

    return;
  }

  const createdPr = await client.post(
    `/repos/${repoContext.owner}/${repoContext.repo}/pulls`,
    {
      base: "develop",
      body,
      head: branchName,
      title,
    },
  );

  await addLabels(client, repoContext, createdPr.number, [
    "type:chore",
    "area:infra",
    "automation",
  ]);

  appendSummary("Develop Sync PR", [
    `- Created release metadata sync PR #${createdPr.number}.`,
    `- Synced released version \`v${version}\` back into develop metadata.`,
  ]);
}

async function finalizeMainRelease() {
  const client = createGitHubClient();
  const repoContext = getRepoContext();
  const pullNumber = getPullRequestNumber();
  const pull = await getPullRequest(client, repoContext, pullNumber);

  if (pull.base?.ref !== "main") {
    throw new Error(`Pull request #${pullNumber} does not target main.`);
  }

  if (!pull.merged_at) {
    throw new Error(`Pull request #${pullNumber} is not merged.`);
  }

  const version = extractReleaseVersionFromTitle(pull.title ?? "");
  const tagName = buildReleaseTag(version);
  const releaseIssueNumber = extractReleaseTrackingIssue(pull.body ?? "");
  const releasePath = `/repos/${repoContext.owner}/${repoContext.repo}/releases/tags/${tagName}`;
  let release = await client.get(releasePath);

  if (!release) {
    release = await client.post(
      `/repos/${repoContext.owner}/${repoContext.repo}/releases`,
      {
        generate_release_notes: true,
        name: tagName,
        tag_name: tagName,
        target_commitish: "main",
      },
    );
  }

  const issue = await client.get(
    `/repos/${repoContext.owner}/${repoContext.repo}/issues/${releaseIssueNumber}`,
  );

  if (issue && issue.state !== "closed") {
    await client.post(
      `/repos/${repoContext.owner}/${repoContext.repo}/issues/${releaseIssueNumber}/comments`,
      { body: buildReleaseIssueComment(version) },
    );
    await client.patch(
      `/repos/${repoContext.owner}/${repoContext.repo}/issues/${releaseIssueNumber}`,
      { state: "closed" },
    );
  }

  await syncDevelopPr({ issueNumber: releaseIssueNumber, version });

  appendSummary("Finalize Main Release", [
    `- Finalized GitHub Release ${tagName}.`,
    `- Release tracking issue: #${releaseIssueNumber}.`,
    `- Release URL: ${release.html_url ?? "n/a"}`,
  ]);
}

switch (command) {
  case "sync-release-pr":
    await syncReleasePr();
    break;
  case "prepare-main-metadata":
    await prepareMainMetadata();
    break;
  case "sync-main-pr":
    await syncMainPr();
    break;
  case "finalize-main-release":
    await finalizeMainRelease();
    break;
  case "sync-develop-pr":
    await syncDevelopPr({
      issueNumber: Number(process.env.RELEASE_ISSUE_NUMBER),
      version: process.env.NEXT_VERSION,
    });
    break;
  default:
    throw new Error(
      'Unknown release automation command. Expected one of "sync-release-pr", "prepare-main-metadata", "sync-main-pr", "finalize-main-release", or "sync-develop-pr".',
    );
}
