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

import { readFileSync, writeFileSync } from 'fs';
import latestVersion from 'latest-version';
import fg from 'fast-glob';

const useLatest = process.argv[2] === '--latest';

async function update() {
    let updated = false;
    try {
        for (const packageJSONPath of await fg([`**/package.json`], {
            ignore: ['**/node_modules/**'],
        })) {
            let shouldUpdate = false;
            const packageJSON = JSON.parse(
                readFileSync(packageJSONPath, 'utf-8')
            );
            async function updateDependency(packageName, depType) {
                if (packageName.startsWith('@spectrum-css')) {
                    const currentVersion = packageJSON[depType][packageName];
                    const targetVersion = await latestVersion(packageName, {
                        version: useLatest ? 'latest' : currentVersion,
                    });
                    const targetRange = `^${targetVersion}`;
                    if (currentVersion.replace('^', '') !== targetVersion) {
                        console.log(
                            `updating ${packageName} from ${currentVersion} to ${targetRange}`
                        );
                        packageJSON[depType][packageName] = targetRange;
                        shouldUpdate = true;
                    }
                }
            }
            for (const packageName in packageJSON.dependencies) {
                await updateDependency(packageName, 'dependencies');
            }
            for (const packageName in packageJSON.devDependencies) {
                await updateDependency(packageName, 'devDependencies');
            }
            if (shouldUpdate) {
                writeFileSync(packageJSONPath, JSON.stringify(packageJSON));
                updated = true;
            }
        }
    } catch (error) {
        // Don't let errors above cause exit(>0), which triggers the install process.
    }
    if (updated) {
        console.log(
            '@spectrum-css dependencies are not on latest, installing...'
        );
        process.exit(1);
    } else {
        console.log(
            'All @spectrum-css dependencies are on their latest version 😎'
        );
    }
}

update();
