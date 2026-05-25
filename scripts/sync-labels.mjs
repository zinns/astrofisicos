import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const labelsPath = path.resolve(__dirname, "../.github/labels.json");
const labels = JSON.parse(fs.readFileSync(labelsPath, "utf8"));

for (const label of labels) {
  execFileSync(
    "gh",
    [
      "label",
      "create",
      label.name,
      "--color",
      label.color,
      "--description",
      label.description,
      "--force",
    ],
    {
      stdio: "inherit",
    },
  );
}

