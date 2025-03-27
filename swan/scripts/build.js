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

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = resolve(__dirname, '..');

// Find all component files that need to be built
function findEntryPoints() {
    const componentsDir = resolve(rootDir, 'src/components');
    const entryPoints = [];
    // Walk through the components directory structure
    const componentFolders = readdirSync(componentsDir);
    for (const folder of componentFolders) {
        const folderPath = resolve(componentsDir, folder);
        if (statSync(folderPath).isDirectory()) {
            const files = readdirSync(folderPath);
            for (const file of files) {
                if (
                    file.endsWith('.ts') &&
                    !file.endsWith('.d.ts') &&
                    !file.endsWith('index.ts')
                ) {
                    entryPoints.push(`src/components/${folder}/${file}`);
                }
            }
        }
    }
    return entryPoints;
}

// Process each entry point individually to preserve structure
async function buildFiles(options) {
    const entryPoints = findEntryPoints();

    for (const entryPoint of entryPoints) {
        // Get the output path by replacing src with dist and .ts with .js
        const outputPath = entryPoint.replace('src/', '');

        await esbuild.build({
            entryPoints: [entryPoint],
            bundle: true,
            format: 'esm',
            sourcemap: true,
            platform: 'browser',
            external: ['@spectrum-web-components/*'],
            outfile: `dist/${outputPath.replace('.ts', options.outExtension || '.js')}`,
            absWorkingDir: rootDir,
            minify: options.minify || false,
            define: options.define || {},
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
