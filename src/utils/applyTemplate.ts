import fs from "fs";
import path from "path";

type TemplateTree = Record<string, any>;

export function applyTemplate(
  templatePath: string,
  targetDir: string,
  variables: Record<string, string> = {}
) {
  const template = JSON.parse(
    fs.readFileSync(templatePath, "utf8")
  );

  const filesDir = path.join(
    path.dirname(templatePath),
    "files"
  );

  function walk(tree: TemplateTree, currentDir: string) {
    for (const name in tree) {
      const value = tree[name];
      const fullPath = path.join(currentDir, name);

      if (typeof value === "object") {
        fs.mkdirSync(fullPath, { recursive: true });
        walk(value, fullPath);
        continue;
      }

      if (typeof value === "string") {
        let content = value;

        // External file reference
        if (value.startsWith("@file:")) {
          const fileName = value.replace("@file:", "");
          const sourcePath = path.join(filesDir, fileName);
          content = fs.readFileSync(sourcePath, "utf8");
        }

        // Variable interpolation
        for (const key in variables) {
          content = content.replaceAll(
            `{{${key}}}`,
            variables[key]
          );
        }

        fs.mkdirSync(path.dirname(fullPath), { recursive: true });

        // Safe write (do not overwrite)
        if (!fs.existsSync(fullPath)) {
          fs.writeFileSync(fullPath, content);
        }
      }
    }
  }

  try {
    walk(template.tree, targetDir);
    return true;
  } catch (error) {
    console.error("Error applying template:", error);
    return false;
  }

}
