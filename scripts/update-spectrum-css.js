#!/usr/bin/env node

/*
Copyright 2025 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

import fg from 'fast-glob';
import { readFileSync, writeFileSync } from 'fs';
import latestVersion from 'latest-version';

// What tag to target, defaults to `latest`
// Example: `node scripts/update-spectrum-css.js s2-foundations` will target the latest version of the s2-foundations tag
const targetTag = process.argv[2];

async function updateDependency(packageName, depType, packageJSON, targetTag) {
    if (packageName.startsWith('@spectrum-css')) {
        // We are skipping these packages because we have two different versions of them (latest and s2-foundations)
        // and targetting the s2-foundations tag will update the latest version of these packages
        // We have to update the version in the package.json manually for these packages
        if (
            packageName.includes('tokens') ||
            packageName.includes('ui-icons')
        ) {
            return false;
        }

        const currentVersion = packageJSON[depType][packageName];
        const targetVersion = await latestVersion(packageName, {
            version: targetTag || 'latest',
        });
        const targetRange = `${targetVersion}`;
        if (currentVersion.replace('^', '') !== targetVersion) {
            console.log(
                `updating ${packageName} from ${currentVersion} to ${targetRange}`
            );
            packageJSON[depType][packageName] = targetRange;
            return true;
        }
    }
    return false;
}

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

            for (const packageName in packageJSON.dependencies) {
                if (
                    await updateDependency(
                        packageName,
                        'dependencies',
                        packageJSON,
                        targetTag
                    )
                ) {
                    shouldUpdate = true;
                }
            }
            for (const packageName in packageJSON.devDependencies) {
                if (
                    await updateDependency(
                        packageName,
                        'devDependencies',
                        packageJSON,
                        targetTag
                    )
                ) {
                    shouldUpdate = true;
                }
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
