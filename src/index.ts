import { Command } from "commander";
import inquirer from "inquirer";
import { createReactApp } from "../generators/react";

type Answers = {
  name: string;
  framework: "React" | "Flutter";
  structure: "Minimal" | "Dashboard";
};

const program = new Command();

program
  .name("create-kickstart")
  .description("Kickstart project with one command.")
  .argument("[project-name]", "name of the project")
  .parse(process.argv);

const projectName = program.args[0];

async function run() {
  const answers: Answers = await inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "Project name:",
      default: projectName || "my-app",
    },
    {
      type: "list",
      name: "framework",
      message: "Choose framework:",
      choices: ["React", "Flutter"],
    },
    {
      type: "list",
      name: "structure",
      message: "Choose folder structure:",
      choices: ["Minimal", "Dashboard"],
    },
  ]);

  if(answers.framework.toLowerCase() === "react") createReactApp(answers.name);

}

run();
