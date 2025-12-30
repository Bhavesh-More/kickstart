import * as path from "path";
import { execSync } from "child_process";
import { applyTemplate } from "../utils/applyTemplate.js";
import { CLI_ROOT } from "../utils/paths.js";

export function createReactApp(
  name: string,
  structure: "Minimal" | "Dashboard"
) {
  execSync(
    `npm create vite@latest ${name} -- --template react`,
    { stdio: "inherit" }
  );

const templatePath = path.join(
  CLI_ROOT,
  "templates",
  "react",
  `${structure.toLowerCase()}.json`
);

  applyTemplate(
    templatePath,
    path.join(process.cwd(), name)
  );
}
