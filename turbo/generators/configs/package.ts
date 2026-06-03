import path from "path";
import type { NodePlopAPI } from "plop";
import type { ActionType } from "plop";

type PackageType = "react" | "esm";

// Turbo gen bundles every config into the entry at turbo/generators, so
// __dirname resolves to turbo/generators (NOT turbo/generators/configs).
const TURBO_ROOT = __dirname;
const PROJECT_ROOT = path.resolve(__dirname, "../..");

const getActions = (packageType: PackageType, name: string) => {
  const templatePath = path.resolve(
    TURBO_ROOT,
    "templates/package",
    packageType,
  );
  return [
    {
      type: "addMany",
      destination: path.resolve(PROJECT_ROOT, "packages", name),
      templateFiles: `${templatePath}/**`,
      base: templatePath,
      stripExtensions: ["hbs"],
      /**
       * According to Cursor:
       * What "dot": true does: It tells the file globbing to include hidden files (files starting with . like .gitignore, .env, .eslintrc)
       * By default, glob patterns ignore these hidden files
       **/
      globOptions: {
        dot: true,
      },
    },
    { type: "runShellCommand", command: "yarn install" },
  ] as ActionType[];
};

export default function generator(plop: NodePlopAPI) {
  plop.setGenerator("package", {
    description: "Create a new package",
    prompts: [
      {
        type: "input",
        name: "name",
        validate: (input: string) => {
          if (input.trim().length > 0) {
            return true;
          }
          return "Package name is required";
        },
        message: "Package name?",
      },
      {
        type: "input",
        name: "description",
        message: "Package description?",
      },
      {
        type: "list",
        name: "packageType",
        message: "What type of package are you creating?",
        choices: [
          {
            name: "React Package",
            value: "react",
          },
          {
            name: "ESM Package",
            value: "esm",
          },
        ],
      },
    ],
    actions: function (data) {
      const packageType = data?.packageType as PackageType;
      return getActions(packageType, data?.name as string);
    },
  });
}
