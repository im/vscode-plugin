

import { window, commands, ExtensionContext } from 'vscode';


export function init (context: ExtensionContext) {
    let disposable = commands.registerCommand('extension.helloWorld', () => {
		window.showInformationMessage('Hello World!');
	});
	context.subscriptions.push(disposable);
}