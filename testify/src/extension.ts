import * as dotenv from "dotenv";
import * as vscode from "vscode";
import * as path from "path";
import { generateTestFile } from "./lib/testFileGenerator";

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
            cancellable: false,
          },
          async (progress, token) => {
            if(token.isCancellationRequested){
              vscode.window.showWarningMessage("Operation cancelled");
              return;
            }
            progress.report({ message: "Sending code to LLM..." });
            await generateTestFile(filePath);
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

  // Add the command to subscriptions
  context.subscriptions.push(generateTestCommand);
}

export function deactivate() {}
