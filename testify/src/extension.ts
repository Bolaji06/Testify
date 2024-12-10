import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
  const disposable = vscode.commands.registerCommand(
    'testify.generateTest',
    () => {
      vscode.window.showInformationMessage('Testify is working!');
    }
  );

  context.subscriptions.push(disposable);
}

export function deactivate() {}
