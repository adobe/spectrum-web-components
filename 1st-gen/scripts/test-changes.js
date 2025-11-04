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

import { execSync } from 'child_process';
import { existsSync, readdirSync, readFileSync } from 'fs';
import path from 'path';

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

const { browser = 'chrome' } = yargs(hideBin(process.argv)).argv;

/**
 * Get package names from changeset files that don't exist in the main branch
 * @returns {Array<string>} Array of package names without the @spectrum-web-components/ prefix
 */
export const getChangedPackages = () => {
    let changedPackages = [];
    const changesetDir = '../.changeset';

    try {
        // Check if .changeset directory exists
        if (!existsSync(changesetDir)) {
            console.log('No .changeset directory found');
            return [];
        }

        // 1. Get list of changeset files in main branch
        console.log('Fetching changeset files from main branch...');
        let mainChangesetFiles = [];
        try {
            // Make sure main branch is available
            execSync('git fetch origin main:main', { stdio: 'pipe' });

            // Get list of changeset files in main
            const mainChangesetOutput = execSync(
                'git ls-tree -r --name-only main .changeset/',
                { encoding: 'utf8' }
            );

            mainChangesetFiles = mainChangesetOutput
                .split('\n')
                .filter((file) => file.endsWith('.md'))
                .map((file) => path.basename(file));

            console.log(
                `Found ${mainChangesetFiles.length} changeset files in main branch.`
            );
        } catch (gitError) {
            console.warn(
                `Warning: Could not get changeset files from main: ${gitError.message}`
            );
            mainChangesetFiles = [];
        }

        // 2. Get all .md files in the current .changeset directory
        const currentChangesetFiles = readdirSync(changesetDir).filter(
            (file) => file.endsWith('.md') && file.toLowerCase() !== 'readme.md'
        );

        console.log(
            `Found ${currentChangesetFiles.length} changeset files in current branch.`
        );

        // 3. Filter out files that exist in main branch
        const newChangesetFiles = currentChangesetFiles.filter(
            (file) => !mainChangesetFiles.includes(file)
        );

        console.log(
            `Found ${newChangesetFiles.length} new changeset files not in main branch.`
        );

        // 4. Process each new changeset file
        const packages = new Set();

        newChangesetFiles.forEach((file) => {
            const filePath = path.join(changesetDir, file);
            try {
                const content = readFileSync(filePath, 'utf8');

                // Extract package names using regex
                const packageRegex =
                    /'@spectrum-web-components\/([a-z0-9-]+)'\s*:\s*(major|minor|patch)/g;
                let match;

                while ((match = packageRegex.exec(content)) !== null) {
                    const packageName = match[1];
                    // Filter out icons packages and projects
                    if (
                        !packageName.startsWith('icons-') &&
                        !packageName.includes('projects')
                    ) {
                        packages.add(packageName);
                    }
                }
            } catch (readError) {
                console.error(`Error reading ${file}:`, readError.message);
            }
        });

        changedPackages = Array.from(packages);
        console.log(
            `Found ${changedPackages.length} changed packages in new changesets.`
        );
    } catch (error) {
        console.error('Error processing changeset files:', error.message);
    }

    return changedPackages;
};

const testChangedPackages = () => {
    const packages = getChangedPackages();

    if (packages.length) {
        console.log(
            `Running tachometer on the following packages: ${packages.join(
                ', '
            )}`
        );

        execSync('yarn build:tests');

        execSync(
            `yarn test:bench --browser ${browser} -j -p ${packages.join(' ')}`,
            {
                stdio: 'inherit',
            }
        );
    } else {
        console.log('There are no packages with changes to test against.');
    }
};

testChangedPackages();
