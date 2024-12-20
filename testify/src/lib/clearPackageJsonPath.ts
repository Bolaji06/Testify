import * as vscode from "vscode";
import { PACKAGE_JSON_PATH_KEY } from "./detectLibrary";

export default function clearPackageJsonPath(context: vscode.ExtensionContext) {
  context.workspaceState.update(PACKAGE_JSON_PATH_KEY, undefined);
  vscode.window.showInformationMessage("Stored package.json path is cleared");
}
