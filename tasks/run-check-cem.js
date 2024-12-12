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
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { getWorkspacePackages } from './getWorkspacePackages.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Get the list of workspace packages
const allPackages = getWorkspacePackages();

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
