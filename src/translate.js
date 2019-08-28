const vscode = require('vscode');

module.exports = function(context) {
    function updateTranslator () {

    }

    function translateon () {
    }

    function translateReplace () {
        console.log('translateReplace: ');
    }

    function changeTextEditorSelection( {textEditor, selections: [selection,] }) {
        console.log('selection: ', selection);
        console.log('textEditor: ', textEditor);
        console.log(textEditor.document.getText(selection))
    }

    context.subscriptions.push(
        vscode.workspace.onDidChangeConfiguration(updateTranslator),
        vscode.window.onDidChangeTextEditorSelection(changeTextEditorSelection),
        vscode.commands.registerCommand('extension.translateon', translateon),
        vscode.commands.registerCommand('extension.translateReplace', translateReplace)
    );
};