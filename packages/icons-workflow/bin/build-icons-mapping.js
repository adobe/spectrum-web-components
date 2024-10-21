/* eslint-disable @typescript-eslint/explicit-function-return-type */
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

// builds and saves the icons mapping to a json file
const saveIconsMapping = async () => {
    // check if there is file with .csv extension in the bin folder
    const files = fs.readdirSync(path.join(__dirname, './'));
    let data = '';
    files.forEach((file) => {
        if (file.endsWith('.csv')) {
            data = fs.readFileSync(path.join(__dirname, file), 'utf8');
        }
    });

    if (!data) {
        throw new Error(
            'No csv file found in the src folder. Please make sure to have the csv file in the bin folder'
        );
    }

    const rows = data.split('\n');
    const mapping = {};
    rows.forEach((row) => {
        // if the third column says "name change"
        if (row.split(',')[2] === 'name change') {
            const columns = row.split(',');

            const oldName = getComponentName(columns[0]);
            const newName = getComponentName(columns[1]);

            // skip if the oldName is 123
            if (oldName === '123') {
                return;
            }

            mapping[oldName] = newName;
            mapping[newName] = oldName;
        }
    });

    // save icons mapping to a json file
    fs.writeFileSync(
        path.join(__dirname, './icons-mapping.json'),
        JSON.stringify(mapping),
        'utf8'
    );
};

await saveIconsMapping();
