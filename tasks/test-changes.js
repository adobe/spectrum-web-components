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
import path from 'path';
import fs from 'fs';

const { browser = 'chrome' } = yargs(hideBin(process.argv)).argv;

// Define the packages to ignore
const ignorePackages = [
    '@swc-react/*',
    // Add any other packages you want to ignore here
];

// Function to determine if a file belongs to a workspace package
const belongsToPackage = (file, packageLocation) =>
    file.startsWith(packageLocation);

// Get the list of workspace packages
const getWorkspacePackages = () => {
    try {
        const workspacePackagesOutput = execSync(
            'yarn workspaces info --json'
        ).toString();
        if (!workspacePackagesOutput) {
            console.error(
                'No output from "yarn workspaces info --json" command'
            );
            return {};
        }
        let workspacePackages = JSON.parse(workspacePackagesOutput);
        if (workspacePackages.data) {
            // this condition will be true if the output is from yarn v2.x.x
            workspacePackages = workspacePackages.data;
        }
        return workspacePackages;
    } catch (error) {
        console.error(
            'Error running "yarn workspaces info --json" command:',
            error
        );
        return {};
    }
};

// Get the list of changed files since the specified commit
const getChangedFiles = () => {
    return execSync('git diff --name-only origin/main')
        .toString()
        .split('\n')
        .filter(Boolean);
};

const getChangedPackages = () => {
    const packagesInfo = getWorkspacePackages();
    const changedFiles = getChangedFiles();

    // Get the list of changed packages
    const changedPackages = Object.keys(packagesInfo).filter((pkgName) => {
        const packageLocation = packagesInfo[pkgName].location;
        return (
            changedFiles.some((file) =>
                belongsToPackage(file, packageLocation)
            ) &&
            !ignorePackages.some((ignore) =>
                new RegExp(ignore.replace('*', '.*')).test(pkgName)
            )
        );
    });

    // Filter and format the package list
    return changedPackages.reduce((acc, pkgName) => {
        const name = pkgName.replace('@spectrum-web-components/', '');
        const packageLocation = packagesInfo[pkgName].location;
        if (
            packageLocation.search('projects') === -1 && // No benchmarks available in this directory
            !name.startsWith('icons-') // Exclude icons-* tests in CI
        ) {
            acc.push(name);
        }
        return acc;
    }, []);
};

const testChangedPackages = () => {
    const packages = getChangedPackages();

    if (packages.length) {
        console.log(
            `Running tachometer on the following packages: ${packages.join(', ')}`
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
