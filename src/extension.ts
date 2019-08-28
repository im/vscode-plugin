
import { ExtensionContext } from 'vscode';

import * as Translate from './Translate'
import * as HelloWorld from './HelloWorld'

export async function activate(context: ExtensionContext) {
    console.log('插件注册成功！~~');

    Translate.init(context)
    HelloWorld.init(context)
}

export function deactivate() {
    if (!Translate.client) {
        return undefined;
    }
    return Translate.client.stop()
}
