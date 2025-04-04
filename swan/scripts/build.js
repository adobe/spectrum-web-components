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

import esbuild from 'esbuild';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import { readdirSync, statSync } from 'fs';
import { extensionRewritePlugin } from './extension-rewrite-plugin.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = resolve(__dirname, '..');

// Function to properly check if a file is an index.ts file
function isIndexFile(filename) {
    return filename === 'index.ts';
}

// Function to check if a file is a valid TypeScript source file
function isValidSourceFile(filename) {
    return (
        filename.endsWith('.ts') &&
        !filename.endsWith('.d.ts') &&
        !isIndexFile(filename)
    );
}

// Recursively scan a directory for valid TypeScript files
function scanDirectory(dirPath, basePath = rootDir) {
    const entryPoints = [];
    if (!statSync(dirPath).isDirectory()) {
        return entryPoints;
    }

    const files = readdirSync(dirPath);
    for (const file of files) {
        const fullPath = resolve(dirPath, file);
        const relativePath = fullPath.replace(`${basePath}/`, '');

        if (statSync(fullPath).isDirectory()) {
            // Recursively scan subdirectories
            entryPoints.push(...scanDirectory(fullPath, basePath));
        } else if (isValidSourceFile(file)) {
            entryPoints.push(relativePath);
        }
    }

    return entryPoints;
}

// Find all component files that need to be built
function findEntryPoints() {
    const srcDir = resolve(rootDir, 'src');
    return scanDirectory(srcDir);
}

// Process each entry point individually to preserve structure
async function buildFiles(options) {
    const entryPoints = findEntryPoints();

    // Create the extension rewrite plugin with the correct output extension
    const extensionPlugin = extensionRewritePlugin({
        outExtension: options.outExtension || '.js',
    });

    // Add our plugin to the plugins array
    const plugins = [extensionPlugin].concat(options.plugins || []);

    for (const entryPoint of entryPoints) {
        // Get the output path by replacing src with dist and .ts with .js
        const outputPath = entryPoint.replace('src/', '');

        await esbuild.build({
            entryPoints: [entryPoint],
            bundle: true,
            format: 'esm',
            sourcemap: true,
            platform: 'browser',
            // Externalize everything in node_modules
            external: ['*'],
            outfile: `dist/${outputPath.replace('.ts', options.outExtension || '.js')}`,
            absWorkingDir: rootDir,
            minify: options.minify || false,
            define: options.define || {},
            plugins,
        });
    }
}

async function build() {
    // Production build
    await buildFiles({
        minify: true,
        define: {
            'process.env.NODE_ENV': '"production"',
            'window.__swc.DEBUG': 'false',
        },
    });

    // Development build with additional checks and warnings
    await buildFiles({
        outExtension: '.dev.js',
        minify: false,
        define: {
            'process.env.NODE_ENV': '"development"',
            'window.__swc.DEBUG': 'true',
        },
    });

    // eslint-disable-next-line no-console
    console.log('✓ Build completed');
}

build().catch((error) => {
    // eslint-disable-next-line no-console
    console.error('Build failed:', error);
    process.exit(1);
});
