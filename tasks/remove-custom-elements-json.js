/*
Copyright 2022 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

// Define the packages to ignore
const ignorePackages = [
    '@spectrum-web-components/base',
    '@spectrum-web-components/bundle',
    '@spectrum-web-components/iconset',
    '@spectrum-web-components/modal',
    '@spectrum-web-components/shared',
    '@spectrum-web-components/opacity-checkerboard',
    '@spectrum-web-components/styles',
    '@spectrum-web-components/custom-vars-viewer',
    '@spectrum-web-components/reactive-controllers',
    '@spectrum-web-components/eslint-plugin',
    'stylelint-header',
    '@swc-react/*',
    'documentation',
    'example-project-rollup',
    'example-project-webpack',
    'swc-templates',
    '@types/swc',
];

// Get the list of workspace packages
const workspacePackages = JSON.parse(
    execSync('yarn workspaces info --json').toString()
);
const packagesInfo = JSON.parse(workspacePackages.data);

// Remove custom-elements.json for each package except the ignored ones
Object.keys(packagesInfo).forEach((pkgName) => {
    if (
        !ignorePackages.some((ignore) =>
            new RegExp(ignore.replace('*', '.*')).test(pkgName)
        )
    ) {
        const packageLocation = packagesInfo[pkgName].location;
        const customElementsJsonPath = path.join(
            packageLocation,
            'custom-elements.json'
        );

        if (fs.existsSync(customElementsJsonPath)) {
            console.log(`Removing custom-elements.json for ${pkgName}`);
            fs.unlinkSync(customElementsJsonPath);
        } else {
            console.warn(`custom-elements.json not found for ${pkgName}`);
        }
    } else {
        console.log(`Ignoring package ${pkgName}`);
    }
});
