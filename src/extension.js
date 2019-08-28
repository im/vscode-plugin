const vscode = require('vscode');
const helloWord = require('./helloword')
const translate = require('./translate')
const getCurrentFilePath = require('./get-current-file-path')
/**
 * 插件被激活时触发，所有代码总入口
 * @param {*} context 插件上下文
 */
function activate(context) {

    console.log('插件已被激活 !');

    helloWord(context);
    getCurrentFilePath(context);
    translate(context);

}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {
    console.log('插件被销毁 !');
}

module.exports = {
    activate,
    deactivate
}
