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

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import fg from 'fast-glob';
import 'colors';

import { buildPackage } from './ts-tools.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, '..');
const taskName = 'build:ts';

async function buildTS({
    verbose = process.env.NX_VERBOSE_LOGGING === 'true',
} = {}) {
    // Check if we're running for a specific package via Nx
    const projectName = process.env.NX_TASK_TARGET_PROJECT;

    if (!projectName) {
        return Promise.reject(
            new Error(
                `[${taskName}] Could not determine project name from NX_TASK_TARGET_PROJECT`
            )
        );
    }

    // Run for a single package
    const key = `[${taskName}] ${`@spectrum-web-components/${projectName}`.cyan}`;
    console.time(key);

    let cwd;

    const files = (
        await Promise.all(
            ['packages', 'tools'].map(async (dir) => {
                if (fs.existsSync(path.join(rootDir, dir, projectName))) {
                    cwd = path.join(rootDir, dir, projectName);
                    return await fg([`**/!(*.d).ts`], {
                        cwd: path.join(rootDir, dir, projectName),
                        absolute: true,
                    });
                }
            })
        )
    )
        .flat()
        .filter(Boolean);

    if (!files) {
        return Promise.reject(
            new Error(
                `[${taskName}] No assets found for ${projectName}, skipping.`
            )
        );
    }

    if (verbose) {
        console.log(`\n\n${key} 🔨`);
        console.log(`${' '.padStart(30, '-')}`);
    }
    return buildPackage(files, { verbose, cwd })
        .then(() => {
            if (verbose) {
                console.log(`${' '.padStart(30, '-')}`);
                console.timeEnd(key);
                console.log('');
            }
        })
        .catch((error) => {
            console.error(`[${taskName}] Error processing`, error);
            process.exit(1);
        });
}

await buildTS();
