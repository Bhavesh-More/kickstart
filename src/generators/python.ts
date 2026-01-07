import { execSync } from "child_process";
import path from "path";
import fs from "fs";
import { CLI_ROOT } from "../utils/paths.js";
import { applyTemplate } from "../utils/applyTemplate.js";
import { getPythonCommand } from "../utils/pythonEnviromentCheck.js";

export function createPythonFramework(
    name: string,
    structure: "minimal" | "api"
) {

    const projectDir = path.join(process.cwd(), name);
    
    fs.mkdirSync(projectDir, {recursive: true});

    const pythonCMD = getPythonCommand();

    execSync(`${pythonCMD} -m venv .venv`, { cwd: projectDir, stdio: "inherit" });

  const templatePath = path.join(
        CLI_ROOT,
        "templates",
        "python",
        `${structure.toLowerCase()}.json`
    );

   if ( applyTemplate(templatePath,projectDir)) {
        console.log("Python project created successfully.");
   }else{
        console.error("Failed to create Python project.");
   }


}