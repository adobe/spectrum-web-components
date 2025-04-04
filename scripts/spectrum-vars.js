#!/usr/bin/env node

/*
Copyright 2020 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

import path from 'path';
import fs from 'fs';
import { createRequire } from 'module';
import { fileURLToPath } from 'url';

import 'colors';

const require = createRequire(import.meta.url);
const fsp = fs.promises;
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const processCSSData = async (data, identifier) => {
    /* lit-html is a JS literal, so `\` escapes by default.
     * for there to be unicode characters, the escape must
     * escape itself...
     */
    let result = data.replace(/\\/g, '\\\\');

    // possible selectors to replace
    const selector1 =
        identifier == ':root ' ? identifier : `.spectrum--${identifier}`;

    if (data.indexOf(selector1) >= 0) {
        result = result.replace(selector1, ':root,\n:host');
    }

    return result.replaceAll(
        /(?:\.spectrum(--(?:light|dark|medium|large)?,?(\n|\s)*)?)+\s?(?={)/g,
        ':root,\n:host'
    );
};

async function processTypography() {
    const outputDir = path.join(__dirname, '..', 'tools', 'styles');

    // Typography
    const typographyPath = require.resolve('@spectrum-css/typography', {
        paths: [path.join(__dirname, '..', 'node_modules')],
    });

    return fsp.readFile(typographyPath, 'utf8').then(async (data) => {
        console.log('Processing Typography'.green);
        return processCSSData(data, 'typography').then((result) =>
            Promise.all([
                fsp.writeFile(
                    path.join(outputDir, 'typography.css'),
                    result,
                    'utf8'
                ),
                fsp.writeFile(
                    path.join(outputDir, 'fonts.css'),
                    result,
                    'utf8'
                ),
            ])
        );
    });
}

processTypography();
