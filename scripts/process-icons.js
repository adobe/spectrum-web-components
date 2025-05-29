#!/usr/bin/env node

/*!
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

import { createRequire } from 'node:module';
import path from 'node:path';
import fs from 'node:fs';
import fsp from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

import 'colors';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);

/**
 * Process an icon file and return the SVG content as a string.
 * @param {string} srcPath - The path to the icon file.
 * @returns {string} - The SVG content as a string.
 */
function processIcon(srcPath) {
    // get icon name from filename
    const iconName = path.basename(srcPath, path.extname(srcPath));

    // regex will extract width, height and svg content into $1, $2 and $3 respectively
    const regex = new RegExp(
        /<svg.*viewBox="(.*)">[\s|\n]*(.*?)[\s|\n]*<\/svg>/i
    );

    const content = fs.readFileSync(srcPath, 'utf8');

    const match = content.match(regex);
    if (!match) return;

    // append the content to the target file handle
    return `<symbol id="spectrum-icon-${iconName}" viewBox="${match[1]}">${match[2]}</symbol>`;
}

/**
 * Main function to process the icons.
 * @param {Object} options - The options for the main function.
 * @param {boolean} options.debug - Whether to enable debug mode.
 * @returns {Promise<void>} - A promise that resolves when the icons are processed.
 */
async function main({ debug = false } = {}) {
    // Capture the ui-icons package path
    const spectrumIconsPath = path.dirname(
        require.resolve('@spectrum-css/ui-icons')
    );

    if (debug) console.log(`🔍  source: ${spectrumIconsPath}`);

    if (!spectrumIconsPath) {
        return Promise.reject(
            new Error('@spectrum-css/ui-icons package not found')
        );
    }

    const folders = fs
        .readdirSync(spectrumIconsPath, { withFileTypes: true })
        .filter((dirent) => dirent.isDirectory())
        .map((dirent) => dirent.name);
    if (debug) {
        // list all folders in the spectrumIconsPath
        console.log(`🔍  folders: ${folders.join(', ')}`);
    }

    // remove the combined folder from the list of folders
    await Promise.all(
        folders
            .filter((folder) => folder !== 'combined')
            .map(async (scaleKey) => {
                const srcPath = path.join(spectrumIconsPath, scaleKey);
                const outputPath = path.join(
                    __dirname,
                    '..',
                    'packages',
                    'icons',
                    'src',
                    `icons-${scaleKey}.svg.ts`
                );

                const content = [
                    "import { svg } from '@spectrum-web-components/base';",
                    'export default svg`<svg xmlns="http://www.w3.org/2000/svg">',
                ];

                const icons = await Promise.all(
                    fs
                        .readdirSync(srcPath)
                        .map(async (iconFile) =>
                            processIcon(path.join(srcPath, iconFile))
                        )
                );

                content.push(
                    ...icons.filter(Boolean).map((icon) => `\t${icon}`),
                    '</svg>`;'
                );

                return fsp.writeFile(outputPath, content.join('\n'));
            })
    );
}

main({ debug: true })
    .then(() => {
        console.log(`${'✓'.green}  successfully generated icons`);
    })
    .catch(console.error);
