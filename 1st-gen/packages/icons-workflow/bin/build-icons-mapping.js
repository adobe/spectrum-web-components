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

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import { getComponentName } from './build.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/*
 * You can run this script by running the `build-icons-mapping ` on `packages/icons-workflow/package.json`,
 * which generates the icons mapping from an internal CSV file.
 * This is a manual step and should only be run when the icons team provides updates.
 * Place the CSV file under the `packages/icons-workflow/bin` folder and run the script to generate the new JSON mapping file.
 * This JSON mapping should be committed to the repository.
 */
const saveIconsMapping = async () => {
    // check if there is file with .csv extension in the bin folder
    const files = fs.promises.readdir(__dirname);
    let data = '';
    try {
        const fileNames = await files;
        const csvFile = fileNames.find((file) => file.endsWith('.csv'));
        if (csvFile) {
            data = await fs.promises.readFile(
                path.join(__dirname, csvFile),
                'utf8'
            );
        }
    } catch (error) {
        throw new Error(`Error reading the bin directory: ${error.message}`);
    }

    if (!data) {
        throw new Error(
            'No csv file found in the src folder. Please make sure you have the csv file in the "packages/icons-workflow/bin" folder'
        );
    }

    const rows = data.split('\n');
    const mapping = {};
    rows.forEach((row) => {
        const columns = row.split(',');
        // if the third column says "name change"
        if (columns.length >= 3 && columns[2] === 'name change') {
            const oldName = getComponentName(columns[0]);
            const newName = getComponentName(columns[1]);

            // skip if the old or new name is a number
            if (
                !Number.isNaN(Number(oldName)) ||
                !Number.isNaN(Number(newName))
            ) {
                return;
            }

            mapping[oldName] = newName;
            mapping[newName] = oldName;
        }
    });

    if (Object.keys(mapping).length === 0) {
        console.warn('No valid name changes found in the CSV file.');
    }

    const outputPath = path.join(__dirname, './icons-mapping.json');
    try {
        await fs.promises.writeFile(
            outputPath,
            JSON.stringify(mapping),
            'utf8'
        );
    } catch (error) {
        throw new Error(`Error saving the icons mapping: ${error.message}`);
    }
};

await saveIconsMapping();
