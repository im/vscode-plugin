"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
const path = require("path");
const vscode_languageclient_1 = require("vscode-languageclient");
function init(context) {
    return __awaiter(this, void 0, void 0, function* () {
        let serverModule = context.asAbsolutePath(path.join('out', 'Translate', 'server', 'index.js'));
        let debugOptions = { execArgv: ['--nolazy', '--inspect=6009'] };
        let serverOptions = {
            run: { module: serverModule, transport: vscode_languageclient_1.TransportKind.ipc },
            debug: {
                module: serverModule,
                transport: vscode_languageclient_1.TransportKind.ipc,
                options: debugOptions
            }
        };
        let userLanguage = vscode_1.env.language; // 获取本地语言
        let clientOptions = {
            revealOutputChannelOn: 4,
            initializationOptions: {
                appRoot: vscode_1.env.appRoot, userLanguage
            },
            documentSelector: ['*'],
            synchronize: {}
        };
        exports.client = new vscode_languageclient_1.LanguageClient('TranslateServer', 'Translate Server', serverOptions, clientOptions);
        console.log('client: ', exports.client);
        exports.client.start();
        yield exports.client.onReady();
        let disposable = vscode_1.commands.registerCommand('translate.select', () => __awaiter(this, void 0, void 0, function* () {
            // window.showInformationMessage('translate.select!');
            let editor = vscode_1.window.activeTextEditor;
            console.log('editor: ', editor);
            console.log(editor.document.uri.toString());
            if (editor) {
                let hover = yield exports.client.sendRequest('lastHover', { uri: editor.document.uri.toString() });
                console.log('hover: ', hover);
            }
            vscode_1.window.showInformationMessage('translate.select!');
        }));
        context.subscriptions.push(disposable);
    });
}
exports.init = init;
