/*
Copyright 2022 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

import { build } from 'esbuild';
import { litCssPlugin } from 'esbuild-plugin-lit-css';
import postcss from 'postcss';
import postcssImport from 'postcss-import';
import postcssEnv from 'postcss-preset-env';
import cssnano from 'cssnano';

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
        outdir: './_site/src/',
        plugins: [
            litCssPlugin({
                transform: (css, { filePath }) => {
                    const processor = postcss(
                        postcssImport({ root: filePath }),
                        postcssEnv({
                            browsers: [
                                'last 2 Chrome versions',
                                'last 2 Firefox versions',
                                'last 2 Safari versions',
                                'last 2 iOS versions',
                            ],
                            stage: 2,
                            features: {
                                'nesting-rules': true,
                            },
                        }),
                        cssnano({
                            preset: [
                                'default',
                                {
                                    svgo: false,
                                    discardComments: true,
                                    uniqueSelectors: false,
                                },
                            ],
                        })
                    );
                    return processor
                        .process(css, { from: filePath })
                        .then((result) => result.css);
                },
            }),
        ],
        external: ['@spectrum-web-components/*'],
    });
    process.exit(0);
}

main();
