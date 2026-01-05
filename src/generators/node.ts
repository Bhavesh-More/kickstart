import { execSync } from "child_process";
import path from "path";
import fs from "fs";
import { CLI_ROOT } from "../utils/paths.js";
import { applyTemplate } from "../utils/applyTemplate.js";
import { cwd } from "process";


export function createNodeFrameWork(
    name: string,
    structure: "minimal" | "api"
) {

    const projectDir = path.join(process.cwd(), name);

    fs.mkdirSync(projectDir, {recursive: true});

    execSync(` npm init -y`,  { cwd:projectDir ,stdio: "inherit"});
     
    const templatePath = path.join(
        CLI_ROOT,
        "templates",
        "node",
        `${structure.toLowerCase()}.json`
    );

    applyTemplate(templatePath,projectDir)

    execSync(`npm pkg set name=${name}`,{cwd: projectDir})

}