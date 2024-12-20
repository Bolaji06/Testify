import * as vscode from "vscode";
import fs from "fs/promises";
import { generativeModel } from "./llm";


export async function generateSmartTest(
  filePath: string, context: vscode.ExtensionContext
): Promise<string | undefined> {
  try {
    const fileContent = await fs.readFile(filePath, { encoding: "utf-8" });

    const testFromLLM = await generativeModel(fileContent, context);
    

    return testFromLLM();
  } catch (error) {
    if (error instanceof Error) {
      vscode.window.showErrorMessage(
        "Error generating test file: " + error.message
      );
    }
  }
}
