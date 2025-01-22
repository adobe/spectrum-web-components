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
 * 2. Locates the check-cem.js script for validation
 * 3. Executes check-cem.js in each package's directory
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
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getWorkspacePackages = (ignoredPackages) => {
    const workspaceInfo = execSync('yarn workspaces info --json').toString();
    const workspacePackages = JSON.parse(workspaceInfo);
    return Object.entries(workspacePackages)
        .filter(([pkgName]) => !ignoredPackages.includes(pkgName))
        .map(([pkgName, pkgDetails]) => ({
            name: pkgName,
            path: pkgDetails.location,
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

// Get the list of workspace packages
const allPackages = getWorkspacePackages(ignoredPackages);

// Execute check-cem.js for each package except the ignored ones
const checkCemPath = path.resolve(__dirname, 'check-cem.js'); //'../../tasks/check-cem.js';
allPackages.forEach((pkg) => {
    if (fs.existsSync(checkCemPath)) {
        console.log(`Running check-cem.js for ${pkg.name}`);
        try {
            execSync(`node ${checkCemPath}`, {
                stdio: 'inherit',
                cwd: pkg.path,
            });
        } catch (error) {
            console.error(`Error running check-cem.js for ${pkg.name}:`, error);
        }
    } else {
        console.warn(`check-cem.js not found for ${pkg.name}`);
    }
});
