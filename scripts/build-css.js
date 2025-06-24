#!/usr/bin/env node

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

import fg from 'fast-glob';
import 'colors';

import { processCSS } from './css-tools.js';

async function buildCSS() {
    const promises = [];

    // Check if we're running for a specific package via Nx
    const projectName = process.env.NX_PROJECT_NAME;
    const projectRoot = process.env.NX_PROJECT_ROOT;

    console.log('projectName', projectName);
    console.log('projectRoot', projectRoot);

    let cssPaths;

    if (projectName && projectRoot) {
        // Run for a single package
        console.log(`Building CSS for package: ${projectName.yellow}`);

        // Determine if this is a package or tool based on the project root
        if (projectRoot.includes('/packages/')) {
            cssPaths = await fg([`${projectRoot}/src/**/*.css`]);
        } else if (projectRoot.includes('/tools/')) {
            cssPaths = await fg([
                `${projectRoot}/src/*.css`,
                `${projectRoot}/src/**/*.css`,
            ]);
        } else {
            console.log(
                `Unknown project type for ${projectName}, skipping CSS build`
            );
            return;
        }
    } else {
        // Run for all packages (original behavior)
        console.log('Building CSS for all packages...');
        cssPaths = await fg([
            './packages/*/src/**/*.css',
            './tools/*/src/*.css',
            './tools/*/src/**/*.css',
        ]);
    }

    for (const cssPath of cssPaths) {
        promises.push(
            processCSS(cssPath)
                .then(() => console.log(`Processed ${cssPath.yellow}`))
                .catch((error) =>
                    console.error(`Error processing ${cssPath}`, error)
                )
        );
    }

    return Promise.all(promises);
}

await buildCSS();
