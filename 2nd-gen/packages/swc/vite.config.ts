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

import postcssToken from '@adobe/postcss-token';
import autoprefixer from 'autoprefixer';
import { glob } from 'glob';
import { resolve } from 'path';
import postcssPresetEnv from 'postcss-preset-env';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import litCss from 'vite-plugin-lit-css';

export default defineConfig({
    plugins: [
        litCss({ exclude: ['./stylesheets/*.css'] }),
        dts({
            include: ['**/*.ts'],
            exclude: ['**/*.test.ts', '**/*.stories.ts'],
            outDir: 'dist',
            beforeWriteFile: (filePath, content) => {
                return {
                    filePath,
                    content: content
                        // @todo: figure out why this is needed (type imports are becoming
                        // relative instead of targeting the @spectrum-web-components/core package)
                        // this fixes it e.g. ../../../core/... or ../core/... -> @spectrum-web-components/core/...
                        .replace(
                            /(\.\.\/)+core\//g,
                            '@spectrum-web-components/core/'
                        ),
                };
            },
        }),
    ],
    css: {
        postcss: {
            plugins: [
                postcssToken({ prefix: 'swc' }),
                autoprefixer(),
                postcssPresetEnv({
                    stage: 2, // Use stage 2 features (stable)
                    features: {
                        'nesting-rules': true,
                        'custom-properties': false, // Let lit-css handle this
                        'light-dark-function': false,
                        'logical-properties-and-values': false,
                    },
                }),
            ],
        },
    },
    build: {
        lib: {
            entry: glob
                .sync(resolve(__dirname, 'components/*/index.ts'))
                .reduce(
                    (entries, file) => {
                        const name = file
                            .replace(resolve(__dirname) + '/', '')
                            .replace('.ts', '');
                        (entries as Record<string, string>)[name] = file;
                        return entries;
                    },
                    {} as Record<string, string>
                ),
            formats: ['es'],
        },
        rollupOptions: {
            external: (id) => {
                return (
                    id === 'lit' ||
                    id.startsWith('lit/') ||
                    id.startsWith('@lit/') ||
                    id.startsWith('@spectrum-web-components/core/')
                );
            },
            output: {
                preserveModules: true,
                preserveModulesRoot: '.',
                entryFileNames: '[name].js',
                chunkFileNames: '[name].js',
            },
        },
        target: 'es2018',
        sourcemap: true,
        emptyOutDir: true,
        outDir: 'dist',
    },
    resolve: {
        // Needed for Storybook to work
        alias: {
            '@spectrum-web-components/core': resolve(__dirname, '../core'),
            '@adobe/swc': resolve(__dirname, './components'),
            '@adobe/postcss-token': resolve(
                __dirname,
                '../tools/postcss-token'
            ),
            '@adobe/swc-tokens': resolve(__dirname, '../tools/swc-tokens'),
        },
    },
    esbuild: {
        target: 'es2018',
    },
});
