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

import fg from 'fast-glob';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectDir = path.resolve(__dirname, '..', '..', '..');
const targetDir = path.resolve(
    projectDir,
    'projects/documentation/content/_data'
);
const targetFile = path.resolve(targetDir, 'demoURLs.js');

export const gatherDemoURLs = async () => {
    const links = {};
    const packageNames = [];
    for (const readmePath of await fg([
        `../../packages/*/README.md`,
        `../../tools/*/README.md`,
    ])) {
        const packageName = readmePath.split('/').at(-2);
        packageNames.push(packageName);
        const readme = fs.readFileSync(readmePath, 'utf8');
        if (readme === null) {
            return;
        }

        // Updated pattern to match Stackblitz URLs
        const [url] =
            readme.match(/https:\/\/stackblitz\.com\/edit\/[^)]+/) || [];
        if (url) {
            links[packageName] = url;
        }
    }

    const data = `/**
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

export const urls = ${JSON.stringify(links, null, '    ')};
`;

    fs.writeFileSync(targetFile, data, 'utf8');

    return packageNames;
};
