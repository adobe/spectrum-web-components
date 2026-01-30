/* eslint-disable @typescript-eslint/no-var-requires */
/**
 * Copyright 2026 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

const esbuild = require('esbuild');
const path = require('path');

esbuild
    .build({
        entryPoints: [path.join(__dirname, 'src', 'client', 'extension.ts')],
        bundle: true,
        platform: 'node',
        target: ['node16'], // match VS Code Electron version
        outfile: path.join(__dirname, 'out', 'client', 'extension.js'),
        sourcemap: true,
        external: ['vscode'], // vscode API must remain external
    })
    .catch(() => process.exit(1));

esbuild
    .build({
        entryPoints: [path.join(__dirname, 'src', 'server', 'server.ts')],
        bundle: true,
        platform: 'node',
        target: ['node16'],
        outfile: path.join(__dirname, 'out', 'server', 'server.js'),
        sourcemap: true,
        external: ['vscode'], // LSP server doesn't require vscode module
    })
    .catch(() => process.exit(1));
