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

import { execSync } from 'child_process';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

const { browser = 'chrome' } = yargs(hideBin(process.argv)).argv;

// Duplicated from `tasks/build-preview-urls-comments.cjs` because GitHub Actions and CJS. 🤦
const getChangedPackages = () => {
    let command;
    try {
        command = execSync(
            'yarn --silent lerna ls --json --loglevel silent --ignore "@swc-react/*"'
        );
    } catch (error) {
        console.log(error.message);
        console.log(error.stdout.toString());
        return [];
    }
    let packageList;
    try {
        packageList = JSON.parse(command.toString()).reduce((acc, item) => {
            const name = item.name.replace('@spectrum-web-components/', '');
            if (
                // There are no benchmarks available in this directory.
                item.location.search('projects') === -1 &&
                // The icons-* tests are particular and long, exclude in CI.
                !name.startsWith('icons-')
            ) {
                acc.push(name);
            }
            return acc;
        }, []);
    } catch (error) {
        packageList = [];
    }
    return packageList;
};

const testChangedPackages = () => {
    const packages = getChangedPackages();
    if (packages.length) {
        console.log(
            `Running tachometer on the following packages: ${packages.join(
                ', '
            )}`
        );
        execSync('yarn build:tests');
        execSync(
            `yarn test:bench --browser ${browser} -j -p ${packages.join(' ')}`,
            {
                stdio: 'inherit',
            }
        );
    } else {
        console.log('There are no packages with changes to test against.');
    }
};

testChangedPackages();
