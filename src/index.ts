import { Command } from "commander";
import inquirer from "inquirer";
import { createReactApp } from "../generators/react";
import { createFlutterApp } from "../generators/flutter";
import { createReactNativeApp } from "../generators/react-native";

type Framework = "React" | "Flutter" | "react-native";

type Answers = {
  name: string;
  framework: Framework;
  structure: "Minimal" | "Dashboard";
  rnType?: "expo" | "native";
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
      choices: ["React", "Flutter","react-native"],
    },
     {
      type: "list",
      name: "rnType",
      message: "Choose React Native setup:",
      when: (answers) => answers.framework === "react-native",
      choices: [
        { name: "Expo (recommended)", value: "expo" },
        { name: "React Native CLI", value: "native" },
      ],
    },
    {
      type: "list",
      name: "structure",
      message: "Choose folder structure:",
      choices: ["Minimal", "Dashboard"],
    },
  ]);

 switch (answers.framework) {
    case "React":
      createReactApp(answers.name);
      break;

    case "Flutter":
      createFlutterApp(answers.name);
      break;

    case "react-native":
      createReactNativeApp(answers.name, answers.rnType!);
      break;
  }
}

run();
