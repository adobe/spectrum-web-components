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
import { getChangedPackages } from './get-changed-packages.ts';

const { browser = 'chrome' } = yargs(hideBin(process.argv)).argv;

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
