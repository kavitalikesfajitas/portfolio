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
            let componentPath: string;

            if (data?.location === "app") {
                componentPath = "apps/living-kavita-loca/app/components/{{pascalCase name}}/index.tsx";
            } else {
                componentPath = `packages/${data?.packageName}/src/{{pascalCase name}}/index.tsx`;
            }

            return [
                {
                    type: "add",
                    path: componentPath,
                    templateFile: path.join(__dirname, "../templates/react-component/Component.tsx.hbs"),
                },
            ];
        },
    });
}

