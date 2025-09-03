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
import dts from 'vite-plugin-dts';

export default defineConfig({
    plugins: [
        dts({
            include: ['**/*.ts'],
            exclude: ['**/*.test.ts', '**/*.stories.ts'],
            outDir: 'dist',
            insertTypesEntry: true,
        }),
    ],
    build: {
        lib: {
            entry: {
                index: resolve(__dirname, 'index.ts'),
                'components/badge/index': resolve(
                    __dirname,
                    'components/badge/index.ts'
                ),
                'components/progress-circle/index': resolve(
                    __dirname,
                    'components/progress-circle/index.ts'
                ),
                'shared/base/index': resolve(__dirname, 'shared/base/index.ts'),
                'shared/get-label-from-slot': resolve(
                    __dirname,
                    'shared/get-label-from-slot.ts'
                ),
                'shared/observe-slot-presence': resolve(
                    __dirname,
                    'shared/observe-slot-presence.ts'
                ),
                'shared/observe-slot-text': resolve(
                    __dirname,
                    'shared/observe-slot-text.ts'
                ),
            },
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
