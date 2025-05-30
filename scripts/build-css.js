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
import fs from 'fs';

import { hideBin } from 'yargs/helpers';
import yargs from 'yargs';
import fg from 'fast-glob';
import { rimrafSync } from 'rimraf';
import 'colors';

import { processCSS } from './css-tools.js';
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
async function build({
    cwd = process.cwd(),
    clean = false,
    minify = false,
} = {}) {
    // Fetch all the CSS files in the workspace
    const files = await fg(['*.css', '**/*.css'], {
        cwd,
        ignore: ['**/node_modules/**', '**/dist/**', '**/test/**'],
    });

    // Nothing to do if there's no css files
    if (!files.length)
        return Promise.reject(
            log.fail(`No files found in ${relativePrint(cwd)}`, {
                throwError: true,
            })
        );

    // Clean the dist directory if the clean flag is set
    if (clean)
        files.forEach((filePath) =>
            rimrafSync(path.join(cwd, 'dist', filePath))
        );

    // Process each CSS file, outputting the CSS to the dist directory
    const promises = files.map((filePath) =>
        processCSS(path.join(cwd, filePath), path.join(cwd, 'dist', filePath), {
            minify: false,
        })
    );

    // If the minify flag is set, process the CSS files with the minify flag
    if (minify) {
        promises.push(
            ...files.map((filePath) =>
                processCSS(
                    path.join(cwd, filePath),
                    path.join(cwd, 'dist', filePath),
                    { minify: true }
                )
            )
        );
    }

    return Promise.all(promises);
}

/**
 * The main entry point for this tool; this builds a CSS component
 * @param {object} config
 * @param {string} [config.packageName=process.env.NX_TASK_TARGET_PROJECT] - Name of the component to build
 * @param {string} [config.cwd=] - Current working directory for the component being built
 * @param {boolean} [config.clean=false] - Should the built assets be cleaned before running the build
 * @returns Promise<void>
 */
async function main({
    packageName = process.env.NX_TASK_TARGET_PROJECT,
    cwd,
    clean = process.env.NODE_ENV === 'production',
    minify = process.env.NODE_ENV === 'production',
} = {}) {
    // If no cwd is provided, try to resolve it from the component name
    if (!cwd) {
        if (packageName) {
            cwd = await findPackagePath(packageName);
            if (!cwd) {
                return Promise.resolve(
                    log.fail(
                        `Component ${packageName.cyan} not found in workspace.`
                    )
                );
            }
        } else {
            return Promise.resolve(
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

    const key = `[build:css] ${packageName.cyan}`;
    console.time(key);

    const reports = [];
    const errors = [];

    await build({ cwd, clean, minify })
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
        } else {
            log.write('No assets created.\n'.gray);
        }
    }

    console.log(`${''.padStart(30, '-')}`);
    console.timeEnd(key);
    console.log('');

    if (errs && errs.length > 0)
        return Promise.reject(log.fail('Build failed', { throwError: true }));
    else return Promise.resolve();
}

// Parse command line arguments
const { _: components = getAllComponentNames() } = yargs(
    hideBin(process.argv)
).argv;

// Build multiple components
Promise.all(components.map((packageName) => main({ packageName })));
