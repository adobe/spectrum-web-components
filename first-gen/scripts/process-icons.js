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

import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const processIcon = (srcPath, fd) => {
    // get icon name from filename
    const iconName = path.basename(srcPath, path.extname(srcPath));
    // regex will extract width, height and svg content into $1, $2 and $3 respectively
    const regex = new RegExp(
        /<svg.*viewBox="(.*)">[\s|\n]*(.*?)[\s|\n]*<\/svg>/i
    );

    const content = fs.readFileSync(srcPath, 'utf8');

    const match = content.match(regex);

    if (!match) {
        // no matching result, bail
        return;
    }
    const viewBox = match[1];
    const svgContent = match[2];
    // append the content to the target file handle
    fs.writeSync(
        fd,
        `<symbol id="spectrum-icon-${iconName}" viewBox="${viewBox}">${svgContent}</symbol>`
    );
};

// where is spectrum-css?
// TODO: use resolve package to find node_modules
const spectrumIconsPath = path.resolve(
    path.join(
        __dirname,
        '..',
        '..',
        'node_modules',
        '@spectrum-css',
        'ui-icons',
        'dist'
    )
);

// process the scales
['medium', 'large'].forEach((scaleKey) => {
    console.log(`processing scale ${scaleKey}...`);

    const srcPath = path.join(spectrumIconsPath, scaleKey);
    const outputPath = path.join(
        __dirname,
        '..',
        'packages',
        'icons',
        'src',
        `icons-${scaleKey}.svg.ts`
    );
    let outputFd = fs.openSync(outputPath, 'w');

    fs.writeSync(
        outputFd,
        'import { svg } from \'@spectrum-web-components/base\'; export default svg`<svg xmlns="http://www.w3.org/2000/svg">'
    );

    fs.readdirSync(srcPath).forEach((iconFile) => {
        const srcIconPath = path.join(srcPath, iconFile);
        console.log(`\ticon ${iconFile}`);
        processIcon(srcIconPath, outputFd);
    });

    fs.writeSync(outputFd, '</svg>`;');
    fs.closeSync(outputFd);
});

console.log('complete.');
