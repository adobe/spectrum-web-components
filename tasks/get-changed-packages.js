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

export const getChangedPackages = () => {
    let changedPackages = [];

    try {
        // Use --json flag and add encoding option
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
            console.error('Error parsing JSON:', parseError.message);
            console.log('Raw output:', command);

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
        console.error('Error running changeset status:', error.message);
        if (error.stdout) {
            console.log('stdout:', error.stdout.toString());
        }

        // Additional fallback options could go here
    }

    return changedPackages;
};
