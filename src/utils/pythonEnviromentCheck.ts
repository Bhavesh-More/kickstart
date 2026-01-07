import { execSync } from "child_process";

export function getPythonCommand(): "python3" | "python" {
  try {
    execSync("python3 --version", { stdio: "ignore" });
    return "python3";
  } catch {
    try {
      execSync("python --version", { stdio: "ignore" });
      return "python";
    } catch {
      throw new Error(
        "Python is not installed. Please install Python 3 to continue."
      );
    }
  }
}
