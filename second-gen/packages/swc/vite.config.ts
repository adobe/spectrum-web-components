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

import autoprefixer from 'autoprefixer';
import { glob } from 'glob';
import { resolve } from 'path';
import postcssPresetEnv from 'postcss-preset-env';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import litCss from 'vite-plugin-lit-css';

export default defineConfig({
    plugins: [
        litCss({ exclude: ['./tokens/*.css'] }),
        dts({
            include: ['**/*.ts'],
            exclude: ['**/*.test.ts', '**/*.stories.ts', '.storybook/**/*.ts'],
            outDir: 'dist',
            beforeWriteFile: (filePath, content) => {
                return {
                    filePath,
                    content: content
                        // @todo: figure out why this is needed (type imports are becoming
                        // relative instead of targeting the @swc/core package)
                        // this fixes it e.g. ../../../core/... or ../core/... -> @swc/core/...
                        .replace(/(\.\.\/)+core\//g, '@swc/core/'),
                };
            },
        }),
    ],
    css: {
        postcss: {
            plugins: [
                autoprefixer(),
                postcssPresetEnv({
                    stage: 2, // Use stage 2 features (stable)
                    features: {
                        'nesting-rules': true,
                        'custom-properties': false, // Let lit-css handle this
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
                    id.startsWith('@lit-labs/') ||
                    id.startsWith('@swc/core/')
                );
            },
            output: {
                preserveModules: true,
                preserveModulesRoot: '.',
                entryFileNames: '[name].js',
                chunkFileNames: '[name].js',
            },
        },
        target: 'es2022',
        sourcemap: true,
        emptyOutDir: true,
        outDir: 'dist',
    },
    resolve: {
        // Needed for Storybook to work
        alias: {
            '@swc/core': resolve(__dirname, '../core'),
            '@swc/components': resolve(__dirname, './components'),
        },
    },
    esbuild: {
        target: 'es2022',
    },
});
