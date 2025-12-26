import { execSync } from "child_process";

export function createReactApp(name: string){
    execSync(
    ` npm create vite@latest ${name} -- --tamplate react `,
    { stdio: "inherit" }
    );
}