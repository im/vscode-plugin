import {
	createConnection,
	TextDocuments,
	ProposedFeatures,
	InitializeParams,
	DidChangeConfigurationNotification,
	Hover,
} from 'vscode-languageserver';


let connection = createConnection(ProposedFeatures.all);

let documents: TextDocuments = new TextDocuments();

// connection.onInitialize((params: InitializeParams) => {
//     let capabilities = params.capabilities;
//     console.log('capabilities: ', capabilities);
// });



documents.listen(connection);

// Listen on the connection
connection.listen();