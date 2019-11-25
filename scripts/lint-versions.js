/* eslint-disable no-console */
/*
Copyright 2019 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
const { readdirSync, existsSync, readFileSync } = require('fs');
const path = require('path');

const getDirectories = (source) =>
    readdirSync(source, { withFileTypes: true })
        .filter((pathMeta) => pathMeta.isDirectory())
        .map((pathMeta) => pathMeta.name);

function readPackageJsonDeps(filePath) {
    if (existsSync(filePath)) {
        const jsonData = JSON.parse(readFileSync(filePath, 'utf-8'));
        const merged = {
            ...jsonData.dependencies,
            ...jsonData.devDependencies,
        };
        const result = {};
        Object.keys(merged).forEach((dep) => {
            if (merged[dep] && !merged[dep].includes('file:')) {
                result[dep] = merged[dep];
            }
        });
        return result;
    }
    return {};
}

function readPackageJsonNameVersion(filePath) {
    if (existsSync(filePath)) {
        const jsonData = JSON.parse(readFileSync(filePath, 'utf-8'));
        const result = {};
        result[jsonData.name] = `^${jsonData.version}`;
        return result;
    }
    return {};
}

function compareVersions(versionsA, versionsB) {
    let output = '';
    const newVersions = { ...versionsA };
    Object.keys(versionsB).forEach((dep) => {
        if (
            versionsA[dep] &&
            versionsB[dep] &&
            versionsA[dep] !== versionsB[dep]
        ) {
            output += `  - "${dep}" should be "${versionsA[dep]}" but is "${versionsB[dep]}"\n`;
        }
        if (!newVersions[dep]) {
            newVersions[dep] = versionsB[dep];
        }
    });

    return {
        output,
        newVersions,
    };
}

let currentVersions = readPackageJsonDeps('./package.json');
let endReturn = 0;

// find all versions in the monorepo
getDirectories('./packages').forEach((subPackage) => {
    const filePath = path.normalize(`./packages/${subPackage}/package.json`);
    currentVersions = {
        ...currentVersions,
        ...readPackageJsonNameVersion(filePath),
    };
});

// lint all versions in packages
getDirectories('./packages').forEach((subPackage) => {
    const filePath = path.normalize(`./packages/${subPackage}/package.json`);
    const subPackageVersions = readPackageJsonDeps(filePath);
    const { output, newVersions } = compareVersions(
        currentVersions,
        subPackageVersions
    );
    currentVersions = { ...newVersions };
    if (output) {
        console.log(`Version mismatches found in "${filePath}":`);
        console.log(output);
        console.log();
        endReturn = 1;
    }
});

if (endReturn === 0) {
    console.log('All versions are aligned 💪');
}

process.exit(endReturn);
