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

const path = require('path');
const fs = require('fs');
const { src } = require('yargs').argv;

async function main() {
    const inputCEJPath = path.join(process.cwd(), src);
    try {
        let customElementJsonString = fs.readFileSync(inputCEJPath, 'utf8');
        const customElementJson = JSON.parse(customElementJsonString);
        customElementJson.tags.map((tag) => {
            const varsPath = tag.path
                .replace('./../', '')
                .replace('index.ts', 'spectrum-vars.json');
            try {
                const vars = fs.readFileSync(varsPath, 'utf8');
                const properties = JSON.parse(vars)['custom-properties'];
                const cssProperties = Object.keys(properties).map(
                    (property) => ({
                        name: property,
                        default: properties[property],
                        type: '',
                    })
                );
                tag.cssProperties = cssProperties;
            } catch (error) {}
        });
        customElementJsonString = JSON.stringify(customElementJson);
        fs.writeFileSync(inputCEJPath, customElementJsonString, {
            encoding: 'utf8',
        });
    } catch (error) {}
}

main();
