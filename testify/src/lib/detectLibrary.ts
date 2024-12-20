import * as vscode from "vscode";
import path from "path";
import fs from "fs/promises";
import testingLibraries from "../utils/testingLibraries";

// package.json key state: used to hold package.json selected path
export const PACKAGE_JSON_PATH_KEY = "packageJsonPath";

export async function detectTestingLibrary(
  context: vscode.ExtensionContext
): Promise<string | null> {
  try {
    let packageJsonPath = context.workspaceState.get<string>(
      PACKAGE_JSON_PATH_KEY
    );
    // package.json file directory can be different

    if (!packageJsonPath) {
      const selectedFile = await vscode.window.showOpenDialog({
        // allow user to select package.json file
        canSelectFiles: true,
        canSelectFolders: false,
        filters: { "JSON Files": ["json"] },
        openLabel: "Select package.json",
      });

      if (!selectedFile || selectedFile.length === 0) {
        vscode.window.showErrorMessage("No package.json file selected");
        return null;
      }
      packageJsonPath = selectedFile[0].fsPath;

      context.workspaceState.update(PACKAGE_JSON_PATH_KEY, packageJsonPath)
    }

    const packageJsonContent = await fs.readFile(packageJsonPath, "utf-8");
    const packageJson = JSON.parse(packageJsonContent);

    const dependencies = {
      ...packageJson.dependencies,
      ...packageJson.devDependencies,
    };
    for (let library of testingLibraries) {
      if (dependencies[library]) {
        return library;
      }
    }
    return null; // No testing library found
  } catch (error) {
    if (error instanceof Error) {
      vscode.window.showErrorMessage(
        "Error reading package.json " + error.message
      );
    }
    return null;
  }
}
