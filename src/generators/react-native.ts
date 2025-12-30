import { execSync } from "child_process";


export type reactNativeType = "native" | "expo";


export function createReactNativeApp(name:string, type:reactNativeType) {
    if (type == "expo") {
        execSync(
            ` npx create-expo-app ${name}`,
            {stdio: "inherit"}
        );
    }

    if (type == 'native') {
        execSync(
            `npx react-native@latest init ${name}`,
            {stdio: "inherit"}
        );
    }
}