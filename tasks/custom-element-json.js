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
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import path from 'path';

// Get a list of all packages except those you want to ignore
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
        // Execute the command using Change Sets
        execSync(command, { cwd: pkg.path, stdio: 'inherit' });
    } catch (error) {
        console.error('Error executing custom-element-json command:', error);
        process.exit(1);
    }
});
console.log('All custom elements JSON files have been updated successfully.');
