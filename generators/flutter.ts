import { execSync } from "child_process";

export function createFlutterApp(name: string){
    execSync(
    `flutter create ${name}`,
    { stdio: "inherit" }
    );
}