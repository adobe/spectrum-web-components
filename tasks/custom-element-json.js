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
 * @fileoverview This task generates and updates custom elements manifest JSON files
 * for all workspace packages using the Custom Elements Manifest analyzer (CEM).
 *
 * @description
 * This script:
 * 1. Gets a list of all workspace packages excluding specified ignored packages
 * 2. Uses the Custom Elements Manifest analyzer to generate JSON documentation
 * 3. Processes each package using a custom configuration file
 * 4. Includes package.json data in the generated manifest
 *
 * @output
 * - Start: "Updating custom elements JSON files..."
 * - Success: "All custom elements JSON files have been updated successfully."
 * - Error: "Error executing custom-element-json command:" followed by error details
 */

import { execSync } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';

// Get a list of all packages except those you want to ignore
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

const __filename = dirname(fileURLToPath(import.meta.url));
const __dirname = dirname(__filename);
const configPath = path.resolve(
    __dirname,
    'custom-elements-manifest.config.js'
);

// Define the packages to ignore
const ignoredPackages = [
    '@spectrum-web-components/base',
    '@spectrum-web-components/bundle',
    '@spectrum-web-components/clear-button',
    '@spectrum-web-components/close-button',
    '@spectrum-web-components/modal',
    '@spectrum-web-components/iconset',
    '@spectrum-web-components/shared',
    '@spectrum-web-components/opacity-checkerboard',
    '@spectrum-web-components/styles',
    '@spectrum-web-components/custom-vars-viewer',
    '@spectrum-web-components/eslint-plugin',
    'stylelint-header',
    '@swc-react/*',
    'documentation',
    'example-project-rollup',
    'example-project-webpack',
    'swc-templates',
    '@types/swc',
];

// Use the function
const allPackages = getWorkspacePackages(ignoredPackages);
// Define the command to execute
const command = `cem analyze --config ${configPath} --packagejson`;

console.log(__dirname, 'Updating custom elements JSON files...');
allPackages.forEach((pkg) => {
    try {
        execSync(command, { cwd: pkg.path, stdio: 'inherit' });
    } catch (error) {
        console.error('Error executing custom-element-json command:', error);
        process.exit(1);
    }
});
console.log('All custom elements JSON files have been updated successfully.');
