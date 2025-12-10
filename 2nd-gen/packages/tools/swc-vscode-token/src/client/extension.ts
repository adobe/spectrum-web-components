/**
 * Copyright 2025 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

import * as path from 'path';
import * as vscode from 'vscode';
import {
    LanguageClient,
    LanguageClientOptions,
    ServerOptions,
    TransportKind,
} from 'vscode-languageclient/node';

export function activate(ctx: vscode.ExtensionContext) {
    const serverModule = ctx.asAbsolutePath(
        path.join('out', 'server', 'server.js')
    );

    const serverOptions: ServerOptions = {
        run: { module: serverModule, transport: TransportKind.ipc },
        debug: { module: serverModule, transport: TransportKind.ipc },
    };

    const clientOptions: LanguageClientOptions = {
        documentSelector: [
            { language: 'css' },
            { language: 'scss' },
            { language: 'postcss' },
            { language: 'html' },
            { language: 'javascript' },
            { language: 'typescript' },
        ],
    };

    const client = new LanguageClient(
        'tokenIntellisense',
        'Token Intellisense',
        serverOptions,
        clientOptions
    );

    ctx.subscriptions.push(client, {
        dispose: () => client.stop(),
    });

    client.start();
    // .then(() => {
    //     console.log('Token LSP client started');
    // })
    // .catch((error) => {
    //     console.error('Token LSP client failed to start', error);
    // });

    // vscode.workspace.onDidOpenTextDocument((doc) => {
    //     console.log('Opened document:', doc.languageId, doc.uri.toString());
    // });

    // Optional: restart on config change
    vscode.workspace.onDidChangeConfiguration(() => client.restart());
}
