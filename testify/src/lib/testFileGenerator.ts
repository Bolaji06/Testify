import * as vscode from "vscode";
import * as path from "path";
import * as fs from "fs/promises";

/**
 * Generate a test file in the same directory as the given file
 * @param filePath The full path to the file which test file will be generated
 */
export async function generateTestFile(filePath: string): Promise<void> {
    const dir = path.dirname(filePath);
    const basename = path.basename(filePath, path.extname(filePath)); // file name without the extension
    const extension = path.extname(filePath); // original file extension

    // define the test file name and path
    const testFileName = `${basename}.test.${extension}`;
    const testFilePath = path.join(dir, testFileName);
  try {

  } catch (error) {
    if (error instanceof Error) {
      vscode.window.showErrorMessage(
        `Error generating test file: ${error.message}`
      );
    }
  }
}
