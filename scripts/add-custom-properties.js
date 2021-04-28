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
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
const { src } = yargs(hideBin(process.argv)).argv;

async function main() {
    const inputCEJPath = path.join(process.cwd(), src);
    try {
        let customElementJsonString = fs.readFileSync(inputCEJPath, 'utf8');
        const customElementJson = JSON.parse(customElementJsonString);
        customElementJson.tags.map((tag) => {
            const varsPath = tag.path
                .replace('./../', '')
                .replace(/sp-[a-z-]*\.d\.ts/, 'src/spectrum-vars.json');
            try {
                const vars = fs.readFileSync(varsPath, 'utf8');
                const varsJSON = JSON.parse(vars);
                const properties = varsJSON['custom-properties'];
                const cssProperties = Object.keys(properties).map(
                    (property) => ({
                        name: property,
                        default: properties[property],
                        type: '',
                    })
                );
                tag.cssProperties = cssProperties;
                const sortAlpha = (a, b) => {
                    if (a.name > b.name) {
                        return 1;
                    }
                    if (a.name < b.name) {
                        return -1;
                    }
                    return 0;
                };
                tag.attributes && tag.attributes.sort(sortAlpha);
                tag.properties && tag.properties.sort(sortAlpha);
                tag.events && tag.events.sort(sortAlpha);
            } catch (error) {
                // Toggle the following commented logging for debuggering the processing herein:
                // console.log('Package level error:', tag.name, error);
            }
        });
        customElementJsonString = JSON.stringify(customElementJson);
        fs.writeFileSync(inputCEJPath, customElementJsonString, {
            encoding: 'utf8',
        });
    } catch (error) {
        // Toggle the following commented logging for debuggering the processing herein:
        // console.log('Top level error:', error);
    }
}

main();
