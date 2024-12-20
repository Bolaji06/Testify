import * as dotenv from "dotenv";
import * as vscode from "vscode";
import * as path from "path";
import { generateTestFile } from "./lib/testFileGenerator";
import clearPackageJsonPath from "./lib/clearPackageJsonPath";
import fs from "fs/promises";

//dotenv.config(); // load environment variables

dotenv.config({ path: path.join(__dirname, "../.env") });

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
      if (!process.env.LLM_API_KEY) {
        vscode.window.showInformationMessage(
          "API key is not found please add it to your .env file"
        );
        return;
      }
      try {
        await vscode.window.withProgress(
          {
            location: vscode.ProgressLocation.Window,
            title: "Generating test file...",
            cancellable: true,
          },
          async (progress, token) => {
            if (token.isCancellationRequested) {
              vscode.window.showWarningMessage("Operation cancelled");
              return;
            }
            progress.report({ message: "Detecting testing library..." });
            await generateTestFile(filePath, context);
          }
        );
      } catch (error) {
        if (error instanceof Error) {
          vscode.window.showErrorMessage(
            "Error generating test: " + error.message
          );
        }
      }
      // generate the test file
    }
  );

  const clearPathCommand = vscode.commands.registerCommand(
    "testify.clearPackageJsonPath",
    () => clearPackageJsonPath(context)
  );

  // Add the command to subscriptions
  context.subscriptions.push(generateTestCommand);
  context.subscriptions.push(clearPathCommand);
}

export function deactivate() {}
