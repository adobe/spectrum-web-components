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

import path from 'path';
import { fileURLToPath } from 'url';
import { exec as execCallback } from 'child_process';
import { promisify } from 'util';
const exec = promisify(execCallback);

import fg from 'fast-glob';
import 'colors';

import { buildPackage } from './ts-tools.js';
import { generateIconWrapper } from './cem-plugin-react-wrapper.js';
import { getWorkspacePackages } from './cem-tools.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, '..');

async function main() {
    const allPackages = getWorkspacePackages();
    console.log(
        `\nGenerating React wrappers for ${allPackages.length} packages...`
    );
    await Promise.all(
        allPackages.map(async (pkg) => {
            return exec(
                `cem analyze --config ${path.join(rootDir, 'cem-react-wrapper.config.js')}`,
                { stdio: 'inherit', cwd: pkg.path }
            )
                .then(({ stderr }) => {
                    if (stderr) {
                        console.error(stderr);
                        return;
                    }

                    console.log(
                        `${'✓'.green}  ${`@swc-react/${pkg.path.split(path.sep).pop()}`.cyan}`
                    );
                })
                .catch((error) =>
                    console.error(
                        `Error running command in ${pkg.path}:`,
                        error
                    )
                );
        })
    );

    await Promise.all([
        generateIconWrapper('icons-ui').then(() => {
            console.log(`${'✓'.green}  ${'@swc-react/icons-ui'.cyan}`);
        }),
        generateIconWrapper('icons-workflow').then(() => {
            console.log(`${'✓'.green}  ${'@swc-react/icons-workflow'.cyan}`);
        }),
    ]);

    console.log(`\n🧹  Formatting generated files...`);
    await exec(
        `yarn eslint --fix --quiet ${path.join(rootDir, 'react/**/*.ts')}`,
        { stdio: 'inherit', cwd: rootDir }
    ).then(({ stdout, stderr }) => {
        if (stderr) {
            console.error(stderr);
        }
        console.log(stdout, `${'✓'.green}  Clean-up complete.`);
    });

    const files = await fg(['./react/**/!(*.d).ts']);
    console.log(`\n🔨  Building ${files.length} assets...`);
    return buildPackage(files).then(() => {
        console.log(` ${'✓'.green}  Success`);
        console.log(`\n🎉  React build complete!`);
        process.exit(0);
    });
}

main();
