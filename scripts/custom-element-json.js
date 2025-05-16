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
import { fileURLToPath } from 'url';
import { dirname } from 'path';

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { customElementJson, getWorkspacePackages } from './cem-tools.js';
import 'colors';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, '..');

async function main(options = {}) {
    const config = path.join(
        rootDir,
        options.config ?? 'custom-elements-manifest.config.js'
    );

    // Check that the config file exists, and return an error if it doesn't
    if (!fs.existsSync(config)) {
        return Promise.reject(
            new Error(
                `Config file ${path.relative(rootDir, config).yellow} does not exist`
            )
        );
    }

    // Log the config file path
    console.log(
        `\nLoading config from ${path.relative(rootDir, config).yellow}`
    );

    const allPackages = getWorkspacePackages();
    console.log(
        `Updating custom elements manifest files for ${allPackages.length} packages...\n`
    );
    return Promise.all(
        allPackages.map(async (pkg) => customElementJson(pkg, options))
    )
        .then(() => {
            console.log(
                `\n${'✓'.green}  All ${allPackages.length} custom elements manifest files have been updated successfully.`
            );
        })
        .catch((error) => {
            console.error(
                `${'❌'.red}  Error executing custom-element-json command:`,
                error
            );
        });
}

// Import the custom element config from arguments if provided using yargs
const args = yargs(hideBin(process.argv))
    .option('config', {
        type: 'string',
        description: 'Path to the custom elements manifest config file',
    })
    .parse();

await main(args);
