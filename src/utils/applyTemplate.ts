import fs from "fs-extra/esm";
import * as path from "path";

type TemplateTree = Record<string, any>;

export function applyTemplate(
  templatePath: string,
  targetDir: string
) {
  const template = fs.readJsonSync(templatePath);

  function walk(tree: TemplateTree, currentDir: string) {
    for (const name in tree) {
      const value = tree[name];
      const fullPath = path.join(currentDir, name);

      if (typeof value === "object") {
        fs.ensureDirSync(fullPath);
        walk(value, fullPath);
      }
    }
  }

  walk(template.tree, targetDir);
}
