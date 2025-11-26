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
import { gatherDemoURLs as gatherPackageNames } from './gather-wcd-urls.js';
import { gatherStorybookURLs } from './gather-storybook-urls.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectDir = path.resolve(__dirname, '..', '..', '..');
const targetDir = path.resolve(
    projectDir,
    'projects/documentation/content/_data'
);
const targetFile = path.resolve(targetDir, 'spectrumURLs.js');

const packageNameCorrections = {
    tag: 'tags',
};

/**
 * @todo Analyze and remove if not necessary. This currently returns nothing since Spectrum CSS does not use YAML files anymore.
 * Also with removing Spectrum CSS as a dependency this will need to be updated or removed.
 */
export const gatherUrls = async () => {
    const packageNames = await gatherPackageNames();
    const flatPackageNames = packageNames.map((name) => name.replace('-', ''));
    await gatherStorybookURLs(packageNames);
    const links = {};
    for (const readmePath of await fg([
        `../../node_modules/@spectrum-css/**/metadata/*.yml`,
    ])) {
        const cssPackageName = readmePath.split('/').at(-3);
        const packageName =
            packageNames[
                flatPackageNames.findIndex((name) => name === cssPackageName)
            ] ||
            packageNameCorrections[cssPackageName] ||
            cssPackageName;
        const readme = fs.readFileSync(readmePath, 'utf8');
        if (readme === null) {
            return;
        }
        const [url] =
            readme.match(/https:\/\/spectrum.adobe.com\/[^\n|\)]+/) || [];
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
};
