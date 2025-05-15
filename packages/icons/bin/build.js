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
import { createRequire } from 'module';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);

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

/**
 * @returns {Promise<void}
 */
async function main() {
    const spectrumIconsPath = require.resolve('@spectrum-css/ui-icons', {
        paths: [
            path.join(__dirname, '..', 'node_modules'),
            path.join(__dirname, '..', '..', '..', 'node_modules'),
        ],
    });

    return Promise.all(
        ['medium', 'large'].map(async (scale) => {
            const srcPath = path.join(path.dirname(spectrumIconsPath), scale);
            const outputPath = path.join(
                __dirname,
                '..',
                'src',
                `icons-${scale}.svg.ts`
            );

            const outputFd = fs.openSync(outputPath, 'w');

            fs.writeSync(
                outputFd,
                'import { svg } from \'@spectrum-web-components/base\';\n\nexport default svg`<svg xmlns="http://www.w3.org/2000/svg">'
            );

            fs.readdirSync(srcPath).forEach((iconFile) => {
                processIcon(path.join(srcPath, iconFile), outputFd);
            });

            fs.writeSync(outputFd, '</svg>`;\n');
            fs.closeSync(outputFd);
        })
    ).catch((error) => {
        console.error('Error processing icons:', error);
    });
}

await main();
