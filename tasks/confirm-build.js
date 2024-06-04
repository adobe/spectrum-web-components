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
import fs from 'fs';
import path from 'path';

// Define the directory where packages are located
const packagesDir = path.resolve(__dirname, 'packages');

// Get a list of all packages except those you want to ignore
const ignoredPackages = [
    '@spectrum-web-components/base',
    '@spectrum-web-components/bundle',
    // Add other packages you want to ignore here
];
const allPackages = fs
    .readdirSync(packagesDir)
    .filter((pkg) => !ignoredPackages.includes(pkg));

// Define the command to execute
const command = 'test -f src/index.js';

// Execute the command in each package directory
allPackages.forEach((pkg) => {
    const pkgDir = path.resolve(packagesDir, pkg);
    try {
        // Execute the command in the package directory
        execSync(command, { cwd: pkgDir, stdio: 'inherit' });
    } catch (error) {
        console.error(`Error executing command in package ${pkg}:`, error);
        process.exit(1);
    }
});

console.log('Build confirmation completed successfully for all packages.');
