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
exports.activate = activate;
exports.deactivate = deactivate;
const dotenv = __importStar(require("dotenv"));
const vscode = __importStar(require("vscode"));
const path = __importStar(require("path"));
const testFileGenerator_1 = require("./lib/testFileGenerator");
//dotenv.config(); // load environment variables
dotenv.config({ path: path.join(__dirname, "../.env") });
function activate(context) {
    // Register the command to handle file and workspace contexts
    const generateTestCommand = vscode.commands.registerCommand("testify.generateTest", (uri) => __awaiter(this, void 0, void 0, function* () {
        var _a;
        let filePath = (uri === null || uri === void 0 ? void 0 : uri.fsPath) || ((_a = vscode.window.activeTextEditor) === null || _a === void 0 ? void 0 : _a.document.fileName);
        if (!filePath) {
            vscode.window.showWarningMessage("No file selected or open.");
            return;
        }
        if (!process.env.LLM_API_KEY) {
            vscode.window.showInformationMessage("API key is not found please add it to your .env file");
            return;
        }
        try {
            yield vscode.window.withProgress({
                location: vscode.ProgressLocation.Window,
                title: "Generating test file...",
                cancellable: false,
            }, (progress, token) => __awaiter(this, void 0, void 0, function* () {
                if (token.isCancellationRequested) {
                    vscode.window.showWarningMessage("Operation cancelled");
                    return;
                }
                progress.report({ message: "Sending code to LLM..." });
                yield (0, testFileGenerator_1.generateTestFile)(filePath);
            }));
        }
        catch (error) {
            if (error instanceof Error) {
                vscode.window.showErrorMessage("Error generating test: " + error.message);
            }
        }
        // generate the test file
    }));
    // Add the command to subscriptions
    context.subscriptions.push(generateTestCommand);
}
function deactivate() { }
