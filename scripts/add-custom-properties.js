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
import globby from 'globby';
import { hideBin } from 'yargs/helpers';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const projectDir = path.resolve(__dirname, '..');
const { src } = yargs(hideBin(process.argv)).argv;

async function main() {
    const inputCEJPath = path.join(process.cwd(), src);
    try {
        let customElementJsonString = fs.readFileSync(inputCEJPath, 'utf8');
        const customElementJson = JSON.parse(customElementJsonString);
        const customVarsMap = new Map();
        for await (const path of globby.stream(
            `${projectDir}/packages/*/src/spectrum-vars.json`
        )) {
            const componentName = path.split('packages/')[1].split('/src')[0];
            const vars = fs.readFileSync(path, 'utf8');
            const varsJSON = JSON.parse(vars)['custom-properties'];
            const cssProperties = [];
            for (const [key, value] of Object.entries(varsJSON)) {
                cssProperties.push({
                    name: key,
                    default: value,
                });
            }
            customVarsMap.set(`sp-${componentName}`, cssProperties);
        }
        customElementJson.modules.map((jsModule) => {
            jsModule.declarations.map((declaration) => {
                const { tagName } = declaration;
                if (
                    !declaration.cssProperties &&
                    tagName &&
                    customVarsMap.has(tagName)
                ) {
                    declaration.cssProperties = customVarsMap.get(tagName);
                }
            });
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
