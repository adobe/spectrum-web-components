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

import { build } from 'esbuild';
import { litCssPlugin } from 'esbuild-plugin-lit-css';
import { bundleAsync } from 'lightningcss';
import path from 'path';
import fs from 'fs-extra';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const nodeModulesDir = path.resolve(
    __dirname,
    '..',
    '..',
    '..',
    '..',
    'node_modules'
);

async function main() {
    await build({
        entryPoints: [
            './src/components.ts',
            './src/getting-started.ts',
            './src/index.ts',
        ],
        format: 'esm',
        target: ['es2020'],
        bundle: true,
        splitting: true,
        outdir: './_site/src/',
        plugins: [
            litCssPlugin({
                transform: async (css, { filePath }) => {
                    const { code } = await bundleAsync({
                        filename: filePath,
                        code: css,
                        minify: true,
                        errorRecovery: true,
                        resolver: {
                            read(readPath) {
                                const file = fs.readFileSync(readPath, 'utf8');
                                return file;
                            },
                            resolve(specifier, from) {
                                if (specifier.startsWith('./')) {
                                    const resolution = path.resolve(
                                        from,
                                        '..',
                                        specifier
                                    );
                                    return resolution;
                                } else {
                                    const resolution = path.resolve(
                                        nodeModulesDir,
                                        specifier
                                    );
                                    return resolution;
                                }
                            },
                        },
                    });
                    return code.toString();
                },
            }),
        ],
        external: [
            '@spectrum-web-components/*',
            'lit-html',
            'lit-element',
            'lit',
            '@lit/reactive-element',
        ],
    });
    process.exit(0);
}

main();
