import { Command } from "commander";
import inquirer from "inquirer";
import { createReactApp } from "./generators/react.js";
import { createFlutterApp } from "./generators/flutter.js";
import { createReactNativeApp } from "./generators/react-native.js";
import { createNextApp } from "./generators/next.js";
import { createNodeFrameWork } from "./generators/node.js";

type Framework = "react" | "flutter" | "react-native" | "nextjs" | "node" ;

type Answers = {
  name: string;
  framework: Framework;
  structure: "Minimal" | "Dashboard";
  rnType?: "expo" | "native";
  nodeStructure?: "minimal" | "api";

};

const program = new Command();

program
  .name("create-kickstart")
  .description("Kickstart project with one command.")
  .argument("[project-name]", "name of the project")
  .parse(process.argv);

const projectName = program.args[0];

async function run() {
  const answers = await inquirer.prompt<Answers>([
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
    choices: [
      { name: "React", value: "react" },
      { name: "Flutter", value: "flutter" },
      { name: "React Native", value: "react-native" },
      { name: "Next.js", value: "nextjs" },
      { name: "Node.js", value: "node" },
    ],
  },
  {
    type: "list",
    name: "rnType",
    message: "Choose React Native setup:",
    when: (a) => a.framework === "react-native",
    choices: [
      { name: "Expo (recommended)", value: "expo" },
      { name: "React Native CLI", value: "native" },
    ],
  },
  {
    type: "list",
    name: "structure",
    message: "Choose folder structure:",
    when: (a) => ["react", "nextjs"].includes(a.framework),
    choices: ["Minimal", "Dashboard"],
  },
  {
    type: "list",
    name: "nodeStructure",
    message: "Choose Node.js structure:",
    when: (a) => a.framework === "node",
    choices: [
      { name: "Minimal", value: "minimal" },
      { name: "API", value: "api" },
    ],
  },
]);

switch (answers.framework) {
  case "react":
    createReactApp(answers.name, answers.structure!);
    break;

  case "flutter":
    createFlutterApp(answers.name);
    break;

  case "react-native":
    createReactNativeApp(answers.name, answers.rnType!);
    break;

  case "nextjs":
    createNextApp(answers.name, answers.structure!);
    break;

  case "node":
    createNodeFrameWork(
      answers.name,
      answers.nodeStructure ?? "minimal"
    );
    break;
}

}

run();
