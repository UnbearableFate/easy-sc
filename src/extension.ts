// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

function quoteForShell(arg: string): string {
	// VS Code integrated terminal typically runs a POSIX shell on Linux/macOS.
	if (process.platform === 'win32') {
		return `"${arg.replace(/"/g, '\\"')}"`;
	}
	return `'${arg.replace(/'/g, `'\\''`)}'`;
}

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "easy-sc" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	const disposable = vscode.commands.registerCommand('easy-sc.helloWorld', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from easy-sc!');
	});

	const qsubDisposable = vscode.commands.registerCommand('easy-sc.qsub', async (uri?: vscode.Uri) => {
		const targetUri = uri ?? vscode.window.activeTextEditor?.document.uri;
		if (!targetUri || targetUri.scheme !== 'file') {
			vscode.window.showErrorMessage('qsub: Please run this command on a local file.');
			return;
		}

		const filePath = targetUri.fsPath;
		const terminal = vscode.window.createTerminal({ name: 'qsub' });
		terminal.show(true);
		terminal.sendText(`qsub ${quoteForShell(filePath)}`);
	});

	context.subscriptions.push(disposable, qsubDisposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
