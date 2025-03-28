#!/usr/bin/env node

/*
Copyright 2024 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
import { execSync } from 'child_process';
import { existsSync, readdirSync, readFileSync } from 'fs';
import path from 'path';

/**
 * Get changed packages by directly reading .changeset files
 * This avoids using 'yarn changeset status' which can have formatting issues
 * @returns {Array<string>} Array of package names without the @spectrum-web-components/ prefix
 */
export const getChangedPackages = () => {
    let changedPackages = [];
    const changesetDir = '.changeset';

    try {
        // Method 1: Read changeset files directly
        if (existsSync(changesetDir)) {
            const packages = new Set();

            // Get all .md files that are not README.md
            const files = readdirSync(changesetDir).filter(
                (file) =>
                    file.endsWith('.md') && file.toLowerCase() !== 'readme.md'
            );

            // Process each file
            files.forEach((file) => {
                const filePath = path.join(changesetDir, file);
                try {
                    const content = readFileSync(filePath, 'utf8');

                    // Extract package names using regex
                    const packageRegex =
                        /'@spectrum-web-components\/([a-z0-9-]+)'\s*:\s*(major|minor|patch)/g;
                    let match;

                    while ((match = packageRegex.exec(content)) !== null) {
                        const packageName = match[1];
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

            if (packages.size > 0) {
                changedPackages = Array.from(packages);
                return changedPackages;
            }
        }

        // Method 2 (Fallback): Try using changeset status command
        console.log(
            'No changeset files found, trying changeset status command...'
        );
        const command = execSync('yarn changeset status --json', {
            encoding: 'utf8',
            stdio: ['pipe', 'pipe', 'ignore'], // Suppress stderr
        });

        try {
            // Parse JSON output
            const changesets = JSON.parse(command);
            changedPackages = changesets.reduce((acc, item) => {
                // Remove the '@spectrum-web-components/' prefix from the package name
                const name = item.name.replace('@spectrum-web-components/', '');
                if (
                    // Exclude packages located in the 'projects' directory as here are no benchmarks available
                    item.location.search('projects') === -1 &&
                    // Exclude packages that start with 'icons-' as they are long-running tests
                    !name.startsWith('icons-')
                ) {
                    acc.push(name);
                }
                return acc;
            }, []);
        } catch (parseError) {
            console.error(
                'Error parsing changeset output:',
                parseError.message
            );

            // Extract package names using regex as fallback
            const packageRegex = /@spectrum-web-components\/([a-z-]+)/g;
            let match;
            const packages = new Set();

            while ((match = packageRegex.exec(command)) !== null) {
                if (!match[1].startsWith('icons-')) {
                    packages.add(match[1]);
                }
            }

            changedPackages = Array.from(packages);
        }
    } catch (error) {
        console.error('Error getting changed packages:', error.message);
        // Additional fallback options could go here
    }

    return changedPackages;
};
