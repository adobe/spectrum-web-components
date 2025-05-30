/*!
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
import { dirs, relativePrint, log } from './utilities.js';

/**
 * Build React wrappers for a specific package
 * @param {object} config
 * @param {string} config.cwd - Current working directory for the package being built
 * @returns Promise<void>
 */
async function build({ cwd = process.cwd() } = {}) {
    const allPackages = getWorkspacePackages();
    log.write(
        `\nGenerating React wrappers for ${allPackages.length} packages...\n`
    );

    await Promise.all(
        allPackages.map(async (pkg) => {
            return exec(
                `cem analyze --config ${path.join(dirs.root, 'cem-react-wrapper.config.js')}`,
                { stdio: 'inherit', cwd: pkg.path }
            )
                .then(({ stderr }) => {
                    if (stderr) {
                        log.error(stderr);
                        return;
                    }

                    log.success(`@swc-react/${pkg.path.split(path.sep).pop()}`);
                })
                .catch((error) =>
                    log.fail(
                        `Error running command in ${relativePrint(pkg.path)}: ${error}`
                    )
                );
        })
    );

    await Promise.all([
        generateIconWrapper('icons-ui').then(() => {
            log.success('@swc-react/icons-ui');
        }),
        generateIconWrapper('icons-workflow').then(() => {
            log.success('@swc-react/icons-workflow');
        }),
    ]);

    log.write(`\n🧹  Formatting generated files...\n`);
    await exec(
        `yarn eslint --fix --quiet ${path.join(dirs.root, 'react/**/*.ts')}`,
        { stdio: 'inherit', cwd: dirs.root }
    ).then(({ stdout, stderr }) => {
        if (stderr) {
            log.error(stderr);
        }
        log.write(stdout);
        log.success('Clean-up complete.');
    });

    const files = await fg(['./react/**/!(*.d).ts']);
    log.write(`\n🔨  Building ${files.length} assets...\n`);
    return buildPackage(files).then(() => {
        log.success('Success');
        log.write(`\n🎉  React build complete!\n`);
        return Promise.resolve();
    });
}

/**
 * The main entry point for this tool; this builds React wrappers for components
 * @param {object} config
 * @param {string} [config.cwd=process.cwd()] - Current working directory
 * @returns Promise<void>
 */
async function buildReact({ cwd = process.cwd() } = {}) {
    const key = `[build] ${'@swc-react'.cyan}`;
    console.time(key);

    const reports = [];
    const errors = [];

    await build({ cwd })
        .then((report) => reports.push(report))
        .catch((err) => errors.push(err));

    const logs = reports.flat(Infinity).filter(Boolean);
    const errs = errors.flat(Infinity).filter(Boolean);

    console.log(`\n\n${key} 🔨`);
    console.log(`${''.padStart(30, '-')}`);

    if (errs && errs.length > 0) {
        errs.forEach((err) => log.fail(err));
    } else {
        if (logs && logs.length > 0) {
            logs.forEach((msg) => log.write(msg));
        } else log.write('No assets created.\n'.gray);
    }

    console.log(`${''.padStart(30, '-')}`);
    console.timeEnd(key);
    console.log('');

    if (errs && errs.length > 0)
        return Promise.reject(log.fail('Build failed', { throwError: true }));
    else return Promise.resolve();
}

await buildReact();
