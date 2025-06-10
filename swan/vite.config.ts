/*
Copyright 2024 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { glob } from 'glob';
import { resolve } from 'path';

// Function to dynamically generate input entries
function generateInputs(mode: string) {
    const inputs: Record<string, string> = {
        index: 'src/index.ts',
        'components/index': 'src/components/index.ts',
    };

    // Find all component TypeScript files (excluding tests and stories)
    const componentFiles = glob.sync('src/components/**/*.ts', {
        ignore: ['**/*.test.ts', '**/*.stories.ts'],
    });

    componentFiles.forEach((filePath) => {
        // Convert file path to entry key
        // e.g., 'src/components/badge/badge.ts' -> 'components/badge/badge'
        const relativePath = filePath.replace('src/', '').replace('.ts', '');
        inputs[relativePath] = filePath;
    });

    // Optional: Log discovered files in development mode
    if (mode === 'development') {
        // eslint-disable-next-line no-console
        console.log(`📦 Discovered ${componentFiles.length} component files:`);
        // eslint-disable-next-line no-console
        componentFiles.forEach((file) => console.log(`  - ${file}`));
    }

    return inputs;
}

export default defineConfig(({ mode }) => ({
    resolve: {
        alias: {
            '@core': resolve(__dirname, '../core/src'),
        },
    },
    plugins: [
        dts({
            include: ['src/**/*'],
            exclude: ['src/**/*.test.ts', '**/*.stories.ts'],
            outDir: 'dist',
        }),
    ],
    test: {
        include: ['src/**/*.test.ts'],
        exclude: ['src/**/*.e2e.ts'],
        coverage: {
            provider: 'v8',
            include: ['src/**/*.ts'],
            exclude: [
                'src/**/*.test.ts',
                'src/**/*.e2e.ts',
                'src/**/*.stories.ts',
                'src/**/*.d.ts',
                'src/**/stories/**',
                'src/**/__tests__/**',
                'src/**/__stories__/**',
            ],
            reporter: ['text', 'json', 'html'],
        },
    },
    build: {
        target: 'es2022',
        minify: false,
        sourcemap: mode === 'development',
        rollupOptions: {
            external: [
                'lit',
                'lit/decorators.js',
                'lit/directives/class-map.js',
            ],
            input: generateInputs(mode),
            output: {
                format: 'es',
                dir: 'dist',
                entryFileNames: '[name].js',
                preserveModules: false,
            },
        },
    },
    esbuild: {
        target: 'es2022',
    },
}));
