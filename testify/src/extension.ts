import * as dotenv from "dotenv";
import * as vscode from "vscode";
import * as path from "path";
import { generateTestFile } from "./lib/testFileGenerator";

dotenv.config(); // load environment variables

export function activate(context: vscode.ExtensionContext) {
  // Register the command to handle file and workspace contexts
  const generateTestCommand = vscode.commands.registerCommand(
    "testify.generateTest",
    async (uri: vscode.Uri) => {
      let filePath =
        uri?.fsPath || vscode.window.activeTextEditor?.document.fileName;
      if (!filePath) {
        vscode.window.showWarningMessage("No file selected or open.");
        return;
      }
      // generate the test file
      await generateTestFile(filePath);
    }
  );

  // Add the command to subscriptions
  context.subscriptions.push(generateTestCommand);
}

export function deactivate() {}
