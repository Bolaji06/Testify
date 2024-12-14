import * as vscode from "vscode";
import * as path from "path";

export function activate(context: vscode.ExtensionContext) {
  // Register the command to handle file and workspace contexts
  const generateTestCommand = vscode.commands.registerCommand(
    "testify.generateTest",
    (uri) => {
      let fileName = "";
      if (uri) {
        // User right-clicked on a specific file
        fileName = path.basename(uri.fsPath);
      } else {
        const activeEditor = vscode.window.activeTextEditor;
        if (activeEditor) {
          fileName = path.basename(activeEditor.document.fileName);
        } else {
          vscode.window.showErrorMessage("No active editor found");
          return;
        }
      }
      vscode.window.showInformationMessage(
        `Generating test file for: ${fileName}`
      );
    }
  );

  // Add the command to subscriptions
  context.subscriptions.push(generateTestCommand);
}

export function deactivate() {}
