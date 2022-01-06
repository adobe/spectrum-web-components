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
import fg from 'fast-glob';

const buildPackage = (paths, options) => {
    const args = ['tsc', '--build', ...paths];
    try {
        if (options.watch) {
            args.push('-w');
        } else if (options.clean) {
            execSync(`yarn ${args.join(' ')} --clean`);
        }
        execSync(`yarn ${args.join(' ')}`);
    } catch (error) {
        if (error.stdout) {
            console.log(error.stdout.toString('utf8'));
        }
    }
};

export const buildPackages = async (options) => {
    const paths = [];
    for (const config of await fg(`./packages/*/tsconfig.json`)) {
        paths.push(config);
    }
    paths.push('.storybook/tsconfig.json');
    buildPackage(paths, options);
};

buildPackages();
