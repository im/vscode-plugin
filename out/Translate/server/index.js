"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_languageserver_1 = require("vscode-languageserver");
let connection = vscode_languageserver_1.createConnection(vscode_languageserver_1.ProposedFeatures.all);
let documents = new vscode_languageserver_1.TextDocuments();
// connection.onInitialize((params: InitializeParams) => {
//     let capabilities = params.capabilities;
//     console.log('capabilities: ', capabilities);
// });
documents.listen(connection);
// Listen on the connection
connection.listen();
