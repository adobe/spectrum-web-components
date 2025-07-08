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

const fsp = fs.promises;
const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function main() {
    const srcPath = path.resolve(__dirname, '../src/color-palette.json');
    const contents = fs.readFileSync(srcPath, { encoding: 'utf8' });
    const outputPath = path.resolve(__dirname, '../src/parsed-data.ts');

    const varsJSON = JSON.parse(contents);
    let colorArray = [];
    let exportString = '';

    [
        'gray',
        'blue',
        'red',
        'orange',
        'yellow',
        'chartreuse',
        'celery',
        'green',
        'seafoam',
        'cyan',
        'indigo',
        'purple',
        'fuchsia',
        'magenta',
        'silver',
        'brown',
        'cinnamon',
        'turquoise',
        'pink'
    ].forEach((colour) => {
        for (const [key, info] of Object.entries(varsJSON)) {
            const colourSubstring = key.search(colour);
            if (colourSubstring === -1) continue;

            colorArray.push({
                prop: info.prop,
                light: info?.light?.value ?? info.value,
                dark: info?.dark?.value ?? info.value,
            });
        }

        exportString = exportString.concat(
            ...`export const ${colour}Values: Item[] = ${JSON.stringify(
                colorArray,
                undefined,
                '  '
            )};\n`
        );
        colorArray = [];
    });

    return fsp.writeFile(
        outputPath,
        `import { Item } from './CssTable.js';

    ${exportString}`,
        { encoding: 'utf8' }
    );
}

main();
