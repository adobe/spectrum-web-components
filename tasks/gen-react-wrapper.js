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
 * @fileoverview This task generates React wrapper components for Spectrum Web Components
 * using the Custom Elements Manifest (CEM) analyzer.
 *
 * @description
 * This script:
 * 1. Removes any existing 'react' directory for clean generation
 * 2. Analyzes all workspace packages (except ignored ones) using CEM
 * 3. Generates React wrapper components using a custom configuration
 * 4. Creates icon-specific React wrappers using a separate script
 *
 * @output
 * - Info: "Removed react directory."
 * - Info: "Generated React wrapper."
 * - Error: "Error removing react directory:" followed by error details
 * - Error: "Error generating React wrapper:" followed by error details
 * - Error: "Error running command in [path]:" followed by error details
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

// Function to remove the 'react' directory
const removeReactDir = () => {
    try {
        fs.rmSync('react', { recursive: true, force: true });
        console.log('Removed react directory.');
    } catch (error) {
        console.error('Error removing react directory:', error);
    }
};

// Generate the React wrapper
const generateReactWrapper = () => {
    try {
        execSync('pwd && node ./scripts/generate-icon-react-wrapper.js', {
            stdio: 'inherit',
        });
        console.log('Generated React wrapper.');
    } catch (error) {
        console.error('Errrror generating React wrapper:', error);
    }
};

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

const __filename = dirname(fileURLToPath(import.meta.url));
const __dirname = dirname(__filename);
const configPath = path.resolve(__dirname, 'cem-react-wrapper.config.js');

console.log(configPath);
const command = `cem analyze --config ${configPath}`;

const runCemAnalyze = (packages) => {
    packages.forEach((pkg) => {
        //console.log(`Running ${command} in ${pkg.path}`);
        try {
            execSync(command, { stdio: 'inherit', cwd: pkg.path });
        } catch (error) {
            console.error(`Error running command in ${pkg.path}:`, error);
        }
    });
};

const main = () => {
    removeReactDir();
    const allPackages = getWorkspacePackages(ignoredPackages);
    runCemAnalyze(allPackages);
    generateReactWrapper();
};

main();
