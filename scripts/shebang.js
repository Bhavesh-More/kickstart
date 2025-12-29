import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const target = path.resolve(__dirname, "../dist/index.js");

const content = fs.readFileSync(target, "utf8");

if (!content.startsWith("#!")) {
  fs.writeFileSync(target, `#!/usr/bin/env node\n${content}`);
}

