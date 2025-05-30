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

import fs from 'node:fs';
import path from 'node:path';

import { hideBin } from 'yargs/helpers';
import yargs from 'yargs';
import fg from 'fast-glob';
import 'colors';

import { buildTSFiles } from './ts-tools.js';
import {
    log,
    relativePrint,
    findPackagePath,
    getAllComponentNames,
} from './utilities.js';

/**
 * The builder for the main entry point
 * @param {object} config
 * @param {string} config.cwd - Current working directory for the component being built
 * @param {boolean} config.clean - Should the built assets be cleaned before running the build
 * @returns Promise<void>
 */
async function build({ cwd = process.cwd() } = {}) {
    const files = await fg(['*/!(*.d).ts', '**/!(*.d).ts'], {
        cwd,
        absolute: true,
        ignore: ['**/node_modules/**', '**/dist/**'],
    });

    if (!files.length) {
        return Promise.reject(
            log.fail(`No files found in ${relativePrint(cwd)}`, {
                throwError: true,
            })
        );
    }

    return buildTSFiles(files).then(
        () =>
            files
                .map((file) =>
                    log.success(`${relativePrint(file)}`, { messageOnly: true })
                )
                .join('\n\r') + '\n\r'
    );
}

/**
 * The main entry point for this tool; this builds TypeScript files
 * @param {object} config
 * @param {string} [config.packageName] - Name of the package to build
 * @param {string} [config.cwd=process.cwd()] - Current working directory
 * @returns Promise<void>
 */
async function main({
    packageName = process.env.NX_TASK_TARGET_PROJECT,
    cwd,
} = {}) {
    // If no cwd is provided, try to resolve it from the component name
    if (!cwd) {
        if (packageName) {
            cwd = await findPackagePath(packageName);
            if (!cwd) {
                return Promise.reject(
                    log.fail(
                        `Component ${packageName.cyan} not found in workspace.`
                    )
                );
            }
        } else {
            return Promise.reject(
                log.fail('No component name or working directory provided.')
            );
        }
    }

    // Verify the directory exists
    if (!fs.existsSync(cwd)) {
        return Promise.resolve(
            log.fail(`Component directory not found at ${relativePrint(cwd)}`)
        );
    }

    // Get package.json to determine the full package name
    const packageJsonPath = path.join(cwd, 'package.json');
    if (fs.existsSync(packageJsonPath)) {
        const packageJson = JSON.parse(
            fs.readFileSync(packageJsonPath, 'utf8')
        );
        packageName = packageJson.name;
    }

    const key = `[build:ts] ${packageName.cyan}`;
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
        return Promise.reject(log.fail('Build failed', { throwError: true }));
    }

    if (logs && logs.length > 0) {
        logs.forEach((msg) => log.write(msg));
    } else {
        log.write('No assets created.\n'.gray);
    }

    console.log(`${''.padStart(30, '-')}`);
    console.timeEnd(key);
    console.log('');
    return Promise.resolve();
}

// Parse command line arguments and get all component names if no specific packages provided
const { _: packages = getAllComponentNames() } = yargs(
    hideBin(process.argv)
).argv;

// Build all specified packages
Promise.all(packages.map((packageName) => main({ packageName })));
