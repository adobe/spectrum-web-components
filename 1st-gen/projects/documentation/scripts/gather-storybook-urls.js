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
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectDir = path.resolve(__dirname, '..', '..', '..');
const targetDir = path.resolve(
    projectDir,
    'projects/documentation/content/_data'
);
const targetFile = path.resolve(targetDir, 'storybookURLs.js');

export const gatherStorybookURLs = async (flatPackageNames) => {
    const links = {};

    const skipPackages = [
        'base',
        'bundle',
        'opacity-checkerboard',
        'reactive-controllers',
        'shared',
        'styles',
        'theme',
    ];

    // Get the storybook URLs for each package
    flatPackageNames.forEach((packageName) => {
        if (skipPackages.includes(packageName)) {
            return;
        }
        const storybookURL = `https://opensource.adobe.com/spectrum-web-components/storybook/index.html?path=/story/${packageName}/`;
        links[packageName] = storybookURL;
    });

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
};
