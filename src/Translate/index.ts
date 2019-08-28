

import { window, commands, env, extensions, Hover, ExtensionContext, workspace } from 'vscode';
import * as path from 'path';

import {
    LanguageClient,
    LanguageClientOptions,
    ServerOptions,
    TransportKind
} from 'vscode-languageclient';

export let client: LanguageClient;

export async function init(context: ExtensionContext) {

    let serverModule = context.asAbsolutePath(path.join('out', 'Translate', 'server', 'index.js'));

    let debugOptions = { execArgv: ['--nolazy', '--inspect=6009'] };

    let serverOptions: ServerOptions = {
        run: { module: serverModule, transport: TransportKind.ipc },
        debug: {
            module: serverModule,
            transport: TransportKind.ipc,
            options: debugOptions
        }
    };

    let userLanguage = env.language; // 获取本地语言

    let clientOptions: LanguageClientOptions = {
        revealOutputChannelOn: 4,
        initializationOptions: {
            appRoot: env.appRoot, userLanguage
        },
        documentSelector: ['*'],
        synchronize: {
        }
    };

    client = new LanguageClient(
        'TranslateServer',
        'Translate Server',
        serverOptions,
        clientOptions
    );
    console.log('client: ', client);

    client.start();

    await client.onReady();

    let disposable = commands.registerCommand('translate.select', async () => {
        // window.showInformationMessage('translate.select!');
        let editor: any = window.activeTextEditor;
        console.log('editor: ', editor);
        console.log(editor.document.uri.toString())
        if (editor) {
            let hover = await client.sendRequest<Hover>('lastHover', { uri: editor.document.uri.toString() });
            console.log('hover: ', hover);
        }

        window.showInformationMessage('translate.select!');
    });

    context.subscriptions.push(disposable);
}