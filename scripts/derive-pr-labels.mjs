const conventionalTitlePattern =
  /^(?<type>build|chore|ci|docs|feat|fix|perf|refactor|revert|style|test)(?:\((?<scope>[a-z0-9./-]+)\))?!?: /u;
const releaseTitlePattern =
  /^Release 📦 v\d+\.\d+\.\d+(?:[-+][0-9A-Za-z.-]+)?$/u;

const typeToLabel = {
  build: "type:chore",
  chore: "type:chore",
  ci: "type:ci",
  docs: "type:docs",
  feat: "type:feature",
  fix: "type:fix",
  perf: "type:chore",
  refactor: "type:refactor",
  revert: "type:chore",
  style: "type:chore",
  test: "type:test",
};

const scopeToAreaLabel = {
  ci: "area:ci",
  workflow: "area:ci",
  frontend: "area:frontend",
  content: "area:content",
  design: "area:design",
  docs: "area:docs",
  infra: "area:infra",
  tooling: "area:infra",
  repo: "area:infra",
  release: "area:infra",
};

const fallbackAreaByType = {
  build: "area:infra",
  chore: "area:infra",
  ci: "area:ci",
  docs: "area:docs",
  perf: "area:infra",
  revert: "area:infra",
  style: "area:infra",
};

export function derivePrLabels({ title, baseRef, headRef }) {
  const labels = new Set();
  const conventionalMatch = title.match(conventionalTitlePattern);

  if (conventionalMatch?.groups?.type) {
    const type = conventionalMatch.groups.type;
    const scope = conventionalMatch.groups.scope?.toLowerCase();

    labels.add(typeToLabel[type]);

    if (scope && scopeToAreaLabel[scope]) {
      labels.add(scopeToAreaLabel[scope]);
    } else if (fallbackAreaByType[type]) {
      labels.add(fallbackAreaByType[type]);
    }
  } else if (releaseTitlePattern.test(title)) {
    labels.add("type:chore");
    labels.add("area:infra");
  }

  if (baseRef === "release" && headRef === "develop") {
    labels.add("automation");
    labels.add("flow:release");
    labels.add("type:chore");
    labels.add("area:infra");
  }

  if (baseRef === "main" && headRef === "release") {
    labels.add("automation");
    labels.add("flow:main");
    labels.add("type:chore");
    labels.add("area:infra");
  }

  return [...labels].filter(Boolean);
}
