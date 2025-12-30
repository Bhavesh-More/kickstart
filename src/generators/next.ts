import { execSync } from "child_process";

export type NextVariant = "app" | "pages";

export function createNextApp(
  name: string,
  structure: "Minimal" | "Dashboard"
) {

  execSync(`npx create-next-app@latest ${name}`, {
    stdio: "inherit",
  });

}