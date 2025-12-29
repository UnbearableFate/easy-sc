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

function isVscodeUri(value: unknown): value is vscode.Uri {
	return (
		typeof value === 'object' &&
		value !== null &&
		typeof (value as { scheme?: unknown }).scheme === 'string' &&
		typeof (value as { fsPath?: unknown }).fsPath === 'string'
	);
}

function isRunnableUri(uri: unknown): uri is vscode.Uri {
	return isVscodeUri(uri) && (uri.scheme === 'file' || uri.scheme === 'vscode-remote');
}

function extractUri(value: unknown): vscode.Uri | undefined {
	if (isVscodeUri(value)) return value;
	if (typeof value !== 'object' || value === null) return undefined;
	const maybeResourceUri = (value as { resourceUri?: unknown }).resourceUri;
	if (isVscodeUri(maybeResourceUri)) return maybeResourceUri;
	const maybeUri = (value as { uri?: unknown }).uri;
	if (isVscodeUri(maybeUri)) return maybeUri;
	return undefined;
}

function getSelectedUris(args: unknown[], fallbackUri?: vscode.Uri): vscode.Uri[] {
	const listArg =
		(Array.isArray(args[1]) ? args[1] : undefined) ??
		(Array.isArray(args[0]) ? args[0] : undefined) ??
		(args[0] !== undefined ? [args[0]] : undefined) ??
		(fallbackUri ? [fallbackUri] : []);

	const uris = (listArg ?? [])
		.map(extractUri)
		.filter((u): u is vscode.Uri => !!u)
		.filter((u) => isRunnableUri(u));

	// Some invocation paths may not pass selected resources; fall back to the primary URI.
	if (uris.length === 0 && fallbackUri && isRunnableUri(fallbackUri)) return [fallbackUri];
	return uris;
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

	const qsubDisposable = vscode.commands.registerCommand('easy-sc.qsub', async (...args: unknown[]) => {
		const primaryUri = extractUri(args[0]) ?? vscode.window.activeTextEditor?.document.uri;
		const uris = getSelectedUris(args, primaryUri);

		if (uris.length === 0) {
			const schemeInfo = primaryUri ? ` (scheme: ${primaryUri.scheme})` : '';
			vscode.window.showErrorMessage(
				`qsub: Please run this command on local/remote files from Explorer${schemeInfo}.`,
			);
			return;
		}

		const terminal = vscode.window.createTerminal({ name: 'qsub' });
		terminal.show(true);
		const command = uris.map((u) => `qsub ${quoteForShell(u.fsPath)}`).join(' && ');
		terminal.sendText(command);
	});

	context.subscriptions.push(disposable, qsubDisposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
