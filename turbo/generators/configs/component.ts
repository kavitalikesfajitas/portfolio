import path from "path";
import type { NodePlopAPI } from "plop";

export default function generator(plop: NodePlopAPI) {
    plop.setGenerator("react-component", {
        description: "Create a new component",
        prompts: [
            {
                type: "input",
                name: "name",
                message: "Component name?",
            },
            {
                type: "list",
                name: "location",
                message: "Where do you want to create this component?",
                choices: [
                    {
                        name: "UI Library Package (shared components)",
                        value: "package",
                    },
                    {
                        name: "Living Kavita Loca App (app-specific)",
                        value: "app",
                    },
                    {
                        name: "Dammit I Need A New Job App (app-specific)",
                        value: "dammit",
                    },
                ],
            },
            {
                type: "input",
                name: "packageName",
                message: "Which package? (e.g., ui-library, design-system)",
                when: (answers) => answers.location === "package",
                default: "ui-library",
            },
        ],
        actions: (data) => {
            const appDirs: Record<string, string> = {
                app: "living-kavita-loca",
                dammit: "dammit-i-need-a-new-job",
            };

            let componentPath: string;
            let testPath: string;
            const appDir = data?.location ? appDirs[data.location] : undefined;
            if (appDir) {
                componentPath = `apps/${appDir}/app/components/{{pascalCase name}}/index.tsx`;
                testPath = `apps/${appDir}/app/components/{{pascalCase name}}/index.test.tsx`;
            } else {
                componentPath = `packages/${data?.packageName}/src/{{pascalCase name}}/index.tsx`;
                testPath = `packages/${data?.packageName}/src/{{pascalCase name}}/index.test.tsx`;
            }

            return [
                {
                    type: "add",
                    path: componentPath,
                    templateFile: path.join(__dirname, "./templates/react-component/Component.tsx.hbs"),
                },
                {
                    type: "add",
                    path: testPath,
                    templateFile: path.join(__dirname, "./templates/react-component/Component.test.tsx.hbs"),
                },
            ];
        },
    });
}

