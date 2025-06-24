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

import { buildPackage } from './ts-tools.js';
import fg from 'fast-glob';

// Check if we're running for a specific package via Nx
const projectName = process.env.NX_PROJECT_NAME;
const projectRoot = process.env.NX_PROJECT_ROOT;

let files;

if (projectName && projectRoot) {
    // Run for a single package
    console.log(`Building TypeScript for package: ${projectName.yellow}`);

    // Determine if this is a package or tool based on the project root
    if (projectRoot.includes('/packages/')) {
        files = await fg([`${projectRoot}/**/!(*.d).ts`]);
    } else if (projectRoot.includes('/tools/')) {
        files = await fg([`${projectRoot}/**/!(*.d).ts`]);
    } else {
        console.log(
            `Unknown project type for ${projectName}, skipping TypeScript build`
        );
        return;
    }
} else {
    // Run for all packages (original behavior)
    console.log('Building TypeScript for all packages...');
    files = await fg([
        './packages/**/!(*.d).ts',
        './tools/**/!(*.d).ts',
        './test/plugins/**/!(*.d).ts',
        './projects/story-decorator/**/!(*.d).ts',
        './projects/vrt-compare/**/!(*.d).ts',
        './test/lit-helpers.ts',
        './test/testing-helpers.ts',
        './test/testing-helpers-a11y.ts',
        './test/visual/test.ts',
    ]);
}

return buildPackage(files);
