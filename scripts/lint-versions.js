/* eslint-disable no-console */
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
import { existsSync, readdirSync, readFileSync, writeFileSync } from 'fs';
import { execSync } from 'child_process';
import path from 'path';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

const { fix } = yargs(hideBin(process.argv)).argv;

const getDirectories = (sourceDir) =>
    readdirSync(`./${sourceDir}`, { withFileTypes: true })
        .filter((pathMeta) => pathMeta.isDirectory())
        .map((pathMeta) => [sourceDir, pathMeta.name]);

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

function readPackageJsonName(filePath) {
    if (existsSync(filePath)) {
        const jsonData = JSON.parse(readFileSync(filePath, 'utf-8'));
        return jsonData.name;
    }
    return {};
}

function compareVersions(versionsA, versionsB) {
    let output = '';
    const newVersions = { ...versionsA };
    const dependencyNamesAndVersions = [];
    Object.keys(versionsB).forEach((dep) => {
        if (
            versionsA[dep] &&
            versionsB[dep] &&
            versionsA[dep] !== versionsB[dep]
        ) {
            dependencyNamesAndVersions.push([dep, versionsA[dep]]);
            output += `  - "${dep}" should be "${versionsA[dep]}" but is "${versionsB[dep]}"\n`;
        }
        if (!newVersions[dep]) {
            newVersions[dep] = versionsB[dep];
        }
    });

    return {
        dependencyNamesAndVersions,
        output,
        newVersions,
    };
}

let currentVersions = readPackageJsonDeps('./package.json');
let endReturn = 0;
let written = false;
const directories = [
    ...getDirectories('packages'),
    ...getDirectories('tools'),
    ...getDirectories('react'),
];

// find all versions in the monorepo
directories.forEach(([sourceDir, subPackage]) => {
    const filePath = path.normalize(
        `./${sourceDir}/${subPackage}/package.json`
    );
    currentVersions = {
        ...currentVersions,
        ...readPackageJsonNameVersion(filePath),
    };
});

// lint all versions in packages
directories.forEach(([sourceDir, subPackage]) => {
    const filePath = path.normalize(
        `./${sourceDir}/${subPackage}/package.json`
    );
    const subPackageVersions = readPackageJsonDeps(filePath);
    const packageName = readPackageJsonName(filePath);
    const { dependencyNamesAndVersions, output, newVersions } = compareVersions(
        currentVersions,
        subPackageVersions,
        packageName
    );
    currentVersions = { ...newVersions };
    if (output) {
        if (fix) {
            const jsonData = JSON.parse(readFileSync(filePath, 'utf-8'));
            dependencyNamesAndVersions.forEach(([dep, version]) => {
                if (jsonData.dependencies?.[dep]) {
                    jsonData.dependencies[dep] = version;
                }
                if (jsonData.devDependencies?.[dep]) {
                    jsonData.devDependencies[dep] = version;
                }
            });
            writeFileSync(filePath, JSON.stringify(jsonData));
            written = true;
        } else {
            console.log(`Version mismatches found in "${filePath}":`);
            console.log(output);
            console.log();
            endReturn = 1;
        }
    }
});

if (written) {
    execSync('yarn lint:packagejson');
    execSync('yarn --ignore-scripts');
}

if (endReturn === 0) {
    console.log('All versions are aligned 💪');
}

process.exit(endReturn);
