/*
Copyright 2022 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

/**
 * @fileoverview This task runs the check-cem.js validation script across all workspace
 * packages to verify their Custom Elements Manifest (CEM) files.
 *
 * @description
 * This script:
 * 1. Gets a list of all workspace packages excluding specified ignored packages
 * 2. Fetches the custom-elements.json file for each package, if it exists
 * 3. Checks for the presence of the "tagName" property in the custom-elements.json file
 * 4. If the "tagName" property is not found, it logs a warning and exits with a non-zero status
 * 5. If the "tagName" property is found, it logs a success message
 * 4. Continues processing even if individual package checks fail
 *
 * @output
 * - Info: "Running check-cem.js for [package-name]"
 * - Warning: "check-cem.js not found for [package-name]"
 * - Error: "Error running check-cem.js for [package-name]:" followed by error details
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import 'colors';

const getWorkspacePackages = (ignoredPackages) => {
    const workspaceInfo = execSync('yarn workspaces list --json').toString();
    // Parse the JSON lines since yarn 4 outputs one JSON object per line
    const workspacePackages = workspaceInfo
        .trim()
        .split('\n')
        .map((line) => JSON.parse(line));
    return workspacePackages
        .filter(
            (pkg) =>
                !ignoredPackages.includes(pkg.name) &&
                pkg.name !== '@adobe/spectrum-web-components'
        )
        .map((pkg) => ({
            name: pkg.name,
            path: pkg.location,
        }));
};

// Define the packages to ignore
const ignoredPackages = [
    '@spectrum-web-components/base',
    '@spectrum-web-components/bundle',
    '@spectrum-web-components/clear-button',
    '@spectrum-web-components/close-button',
    '@spectrum-web-components/iconset',
    '@spectrum-web-components/modal',
    '@spectrum-web-components/shared',
    '@spectrum-web-components/opacity-checkerboard',
    '@spectrum-web-components/styles',
    '@spectrum-web-components/custom-vars-viewer',
    '@spectrum-web-components/reactive-controllers',
    '@spectrum-web-components/vrt-compare',
    '@spectrum-web-components/eslint-plugin',
    'stylelint-header',
    '@swc-react/*',
    'documentation',
    'example-project-rollup',
    'example-project-webpack',
    'swc-templates',
    '@types/swc',
];

async function checkCEM(pkg) {
    // Check if the package is an object and has a name and path
    if (typeof pkg !== 'object' || !pkg.name || !pkg.path) {
        return Promise.resolve(`⚠️  Invalid package format identified`, pkg);
    }

    const pkgName = pkg.name.replace('@spectrum-web-components/', '');

    // Check if the custom-elements.json file exists
    const cemPath = path.join(pkg.path, 'custom-elements.json');
    if (!fs.existsSync(cemPath)) {
        return Promise.resolve(
            `⚠️  ${pkgName.yellow}: custom-elements.json not found at ${pkg.path.cyan}`
        );
    }

    // Read in the custom-elements.json file as a string
    const cem = fs.readFileSync(cemPath, 'utf8');
    const character = cem.search('"tagName"');
    const found = character > -1;
    if (!found) {
        return Promise.reject(
            `⚠️  ${pkgName.yellow}: ${'tagName'.cyan} not found in custom-elements.json`,
            cem
        );
    }

    return Promise.resolve(`✅  ${pkgName.yellow}`);
}

async function main() {
    // Get the list of workspace packages
    const allPackages = getWorkspacePackages(ignoredPackages) ?? [];

    if (allPackages.length === 0) {
        console.warn('No packages found to check.');
        return Promise.resolve(`⚠️  No packages found to check.`);
    }

    console.log(
        `\nFound ${allPackages.length} packages that should include a manifest.\n`
    );

    // Check for the custom-elements.json for each package except the ignored ones
    return Promise.all(allPackages.map(checkCEM))
        .then((results) => {
            const hasWarning = results.some((result) => result?.includes('⚠️'));
            results.forEach((result) => {
                if (result?.includes('⚠️')) {
                    console.warn(result);
                } else {
                    console.log(result);
                }
            });

            if (hasWarning) {
                console.error(
                    '\nPlease ensure that the custom-elements.json file exists and contains the "tagName" property.'
                );
                console.error(
                    'If you are using a custom build process, please ensure that the custom-elements.json file is generated correctly.'
                );

                process.exit(1);
            } else {
                console.log(
                    'All packages have a valid custom-elements.json file.'
                );
            }
        })
        .catch((error) => {
            if (typeof error === 'string') {
                console.error(error);
            } else {
                console.error(error.message);
            }

            process.exit(1);
        });
}

await main();
