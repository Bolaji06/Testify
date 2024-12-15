import * as vscode from "vscode";
import * as path from "path";
import * as fs from "fs/promises";

/**
 * Generate a test file in the same directory as the given file
 * @param filePath The full path to the file which test file will be generated
 */
export async function generateTestFile(filePath: string): Promise<void> {
  try {
    const dir = path.dirname(filePath);
    const basename = path.basename(filePath, path.extname(filePath)); // file name without the extension
    const extension = path.extname(filePath); // original file extension

    // define the test file name and path
    const testFileName = `${basename}.test${extension}`;
    const testFilePath = path.join(dir, testFileName);
    try {
      // check if test file already exits
      await fs.access(testFilePath);
      vscode.window.showErrorMessage("Test file already exits");

      // open the test file
      const docs = await vscode.workspace.openTextDocument(testFilePath);
      await vscode.window.showTextDocument(docs);
      return;
    } catch {
      // proceed to generate test file
    }

    // boiler template to generate test file
    const template = `
    // test file for ${testFileName}
    
    describe("test file", () => {
      it("it should work", () => {
        // Add your test logic
      })
    })
  `;

    await fs.writeFile(testFilePath, template);

    // open the newly created test file
    const doc = await vscode.workspace.openTextDocument(testFilePath);
    await vscode.window.showTextDocument(doc);

    vscode.window.showInformationMessage("Test file created: " + testFileName);
  } catch (error) {
    if (error instanceof Error) {
      vscode.window.showErrorMessage(
        "Error generating test file: " + error.message
      );
    }
  }
}
