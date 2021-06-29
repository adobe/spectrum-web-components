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

const getChangedPackages = () => {
    let command;
    try {
        command = execSync(
            'yarn lerna ls --since origin/main --json --loglevel silent'
        );
    } catch (error) {
        console.log(error.message);
        console.log(error.stdout.toString());
        return [];
    }
    const json = command
        .toString()
        .split('✨')[0]
        .trim()
        .split('silent')[1]
        .trim();
    const packageList = JSON.parse(json).reduce((acc, item) => {
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
    return packageList;
};

const testChangedPackages = () => {
    const packages = getChangedPackages();
    console.log(
        `Running tachometer on the following packages: ${packages.join(', ')}`
    );
    if (packages.length) {
        execSync('yarn build:tests');
        execSync(`yarn test:bench -j -p ${packages.join(' ')}`, {
            stdio: 'inherit',
        });
    }
};

testChangedPackages();
