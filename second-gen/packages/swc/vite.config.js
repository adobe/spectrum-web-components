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
import { defineConfig } from 'vite';
import { resolve } from 'path';
import { glob } from 'glob';
import dts from 'vite-plugin-dts';
import litCss from 'vite-plugin-lit-css';

export default defineConfig({
    plugins: [
        litCss(),
        dts({
            include: ['**/*.ts'],
            exclude: ['**/*.test.ts', '**/*.stories.ts'],
            outDir: 'dist',
            insertTypesEntry: true,
        }),
    ],
    resolve: {
        alias: {
            '@swc/core': resolve(__dirname, '../core'),
        },
    },
    build: {
        lib: {
            entry: glob
                .sync(resolve(__dirname, 'components/*/index.ts'))
                .reduce((entries, file) => {
                    const name = file
                        .replace(resolve(__dirname) + '/', '')
                        .replace('.ts', '');
                    entries[name] = file;
                    return entries;
                }, {}),
            formats: ['es'],
        },
        rollupOptions: {
            external: (id) => {
                return id === 'lit' || id.startsWith('@swc/core/');
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
    esbuild: {
        target: 'es2022',
    },
});
