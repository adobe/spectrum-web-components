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
import { readdirSync, statSync } from 'fs';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Automatically discover entry points
function getEntries() {
    const entries = {};

    // Find all components/*/index.ts
    try {
        const componentsDir = resolve(__dirname, 'components');
        const componentDirs = readdirSync(componentsDir);
        for (const dir of componentDirs) {
            const dirPath = resolve(componentsDir, dir);
            if (statSync(dirPath).isDirectory()) {
                const indexPath = resolve(dirPath, 'index.ts');
                try {
                    statSync(indexPath);
                    entries[`components/${dir}/index`] = indexPath;
                } catch {
                    // index.ts doesn't exist, skip
                }
            }
        }
    } catch {
        // components directory doesn't exist
    }

    // Find all shared/*.ts files (excluding directories)
    try {
        const sharedDir = resolve(__dirname, 'shared');
        const sharedItems = readdirSync(sharedDir);
        for (const item of sharedItems) {
            const itemPath = resolve(sharedDir, item);
            if (statSync(itemPath).isFile() && item.endsWith('.ts')) {
                const entryName = `shared/${item.replace('.ts', '')}`;
                entries[entryName] = itemPath;
            }
        }
    } catch {
        // shared directory doesn't exist
    }

    // Find all shared/*/index.ts
    try {
        const sharedDir = resolve(__dirname, 'shared');
        const sharedItems = readdirSync(sharedDir);
        for (const item of sharedItems) {
            const itemPath = resolve(sharedDir, item);
            if (statSync(itemPath).isDirectory()) {
                const indexPath = resolve(itemPath, 'index.ts');
                try {
                    statSync(indexPath);
                    entries[`shared/${item}/index`] = indexPath;
                } catch {
                    // index.ts doesn't exist, skip
                }
            }
        }
    } catch {
        // shared directory doesn't exist
    }

    return entries;
}

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
            entry: getEntries(),
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
        target: 'es2022',
        sourcemap: true,
        emptyOutDir: true,
        outDir: 'dist',
    },
    esbuild: {
        target: 'es2022',
    },
});
