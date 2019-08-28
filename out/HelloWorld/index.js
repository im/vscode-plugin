"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
function init(context) {
    let disposable = vscode_1.commands.registerCommand('extension.helloWorld', () => {
        vscode_1.window.showInformationMessage('Hello World!');
    });
    context.subscriptions.push(disposable);
}
exports.init = init;
