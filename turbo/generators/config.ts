import path from "path";
import { exec } from "child_process";
import type { NodePlopAPI } from "plop";
import type { ActionType } from "plop";
import packageGenerator from "./configs/package";
import componentGenerator from "./configs/component";
type PackageType = 'react' | 'esm';

const getActions = (packageType: PackageType, name: string) => {
  return [
    {
      type: "addMany",
      destination: path.join(__dirname, "../../packages", name),
      templateFiles: path.join(__dirname, `./templates/package/${packageType}/**`),
      base: path.join(__dirname, `./templates/package/${packageType}/`),
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
}



export default function generator(plop: NodePlopAPI) {
  // Custom action type to run a shell command
  plop.setActionType("runShellCommand", function (_answers, config) {
    return new Promise((resolve, reject) => {
      exec(config.command, (error, stdout, stderr) => {
        if (error) {
          reject(new Error(`Command failed: ${error.message}`));
        } else if (stderr) {
          reject(new Error(`Command produced stderr: ${stderr}`));
        } else {
          resolve(stdout);
        }
      });
    });
  });

  packageGenerator(plop);
  componentGenerator(plop);
}
