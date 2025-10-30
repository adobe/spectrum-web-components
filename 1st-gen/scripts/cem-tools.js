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

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

import { rimraf } from 'rimraf';
import { cli } from '@custom-elements-manifest/analyzer/cli.js';
import 'colors';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, '..');

// Get a list of all packages except those you want to ignore
export function getWorkspacePackages(
    ignoredPackages = [
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
    ]
) {
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
                pkg.name !== '@spectrum-web-components/1st-gen' &&
                pkg.name !== '@spectrum-web-components/2nd-gen'
        )
        .map((pkg) => ({
            name: pkg.name,
            path: pkg.location,
        }));
}

export async function customElementJson(
    pkg,
    { config = 'custom-elements-manifest.config.js', ...options } = {}
) {
    await rimraf(path.join(pkg.path, 'custom-elements.json'));
    if (!fs.existsSync(path.join(rootDir, config))) {
        return Promise.reject(
            new Error(
                `Config file ${path.relative(rootDir, config).yellow} does not exist`
            )
        );
    }
    return cli({
        argv: [
            'analyze',
            '--config',
            path.join(rootDir, config),
            ...Object.entries(options)
                .filter(
                    ([key, value]) =>
                        key !== '_' && key !== '$0' && value !== undefined
                )
                .map(([key, value]) => [`--${key}`, value])
                .flat(),
        ],
        cwd: path.join(rootDir, pkg.path),
    })
        .then(async () => {
            const outdir = options.outdir ?? pkg.path;
            // Check if the custom-elements.json file exists
            if (fs.existsSync(path.join(outdir, 'custom-elements.json'))) {
                console.log(
                    `${'✓'.green}  ${pkg.name.cyan} has a custom-elements.json file`
                );
            } else {
                console.log(
                    `${'❌'.red}  ${pkg.name.cyan} does not have a custom-elements.json file`
                );
            }
        })
        .catch((error) => {
            console.error(
                'Error executing custom-element-json command:',
                error
            );
        });
}
