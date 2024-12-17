"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateTestFile = generateTestFile;
const vscode = __importStar(require("vscode"));
const path = __importStar(require("path"));
const fs = __importStar(require("fs/promises"));
const smartTest_1 = require("./smartTest");
/**
 * Generate a test file in the same directory as the given file
 * @param filePath The full path to the file which test file will be generated
 */
function generateTestFile(filePath) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const dir = path.dirname(filePath);
            const basename = path.basename(filePath, path.extname(filePath)); // file name without the extension
            const extension = path.extname(filePath); // original file extension
            // define the test file name and path
            const testFileName = `${basename}.test${extension}`;
            const testFilePath = path.join(dir, testFileName);
            try {
                // check if test file already exits
                yield fs.access(testFilePath);
                vscode.window.showErrorMessage("Test file already exits");
                // open the test file
                const docs = yield vscode.workspace.openTextDocument(testFilePath);
                yield vscode.window.showTextDocument(docs);
                return;
            }
            catch (_a) {
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
            const fileContent = yield (0, smartTest_1.generateSmartTest)(filePath);
            if (fileContent) {
                yield fs.writeFile(testFilePath, fileContent);
            }
            else {
                vscode.window.showErrorMessage("File content is missing");
                return;
            }
            //await fs.writeFile(testFilePath, fileContent);
            // open the newly created test file
            const doc = yield vscode.workspace.openTextDocument(testFilePath);
            yield vscode.window.showTextDocument(doc);
            vscode.window.showInformationMessage("Test file created: " + testFileName);
        }
        catch (error) {
            if (error instanceof Error) {
                vscode.window.showErrorMessage("Error generating test file: " + error.message);
            }
        }
    });
}
