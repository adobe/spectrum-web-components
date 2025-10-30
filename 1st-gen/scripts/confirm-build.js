#!/usr/bin/env node

/**
 * Copyright 2025 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

import fs from 'fs';
import path from 'path';

import glob from 'fast-glob';
import 'colors';

async function verifyCustomElementsJson() {
    // Components that don't need their own custom-elements.json manifest
    const customElementsIgnoreList = new Set([
        'packages/modal',
        'packages/iconset',
        'packages/clear-button',
        'packages/close-button',
    ]);

    const packages = glob.sync('packages/*/', { onlyDirectories: true });
    const checks = packages.map(async (pkg) => {
        const pkgPath = pkg.replace(/\/$/, '');
        if (customElementsIgnoreList.has(pkgPath)) {
            return;
        }
        const customElementsPath = path.join(pkg, 'custom-elements.json');
        if (!fs.existsSync(customElementsPath)) {
            throw new Error(`Missing custom-elements.json in ${pkg}`);
        }
    });

    return Promise.all(checks);
}

function verifyVersionJs() {
    let basePackageJson;
    try {
        basePackageJson = JSON.parse(
            fs.readFileSync('tools/base/package.json', 'utf8')
        );
    } catch (error) {
        throw new Error('Failed to read tools/base/package.json');
    }
    const versionJsPath = 'tools/base/src/version.js';

    if (!fs.existsSync(versionJsPath)) {
        throw new Error('version.js file is missing');
    }

    const versionContent = fs.readFileSync(versionJsPath, 'utf8');
    const versionMatch = versionContent.match(/version = ['"]([^'"]+)['"]/);

    if (!versionMatch) {
        throw new Error('Could not find version in version.js');
    }

    const versionJs = versionMatch[1];
    if (versionJs !== basePackageJson.version) {
        throw new Error(
            `Version mismatch: version.js (${versionJs}) does not match tools/base/package.json (${basePackageJson.version})`
        );
    }
}

async function verifyBuildArtifacts() {
    const packages = glob.sync('packages/*/', { onlyDirectories: true });
    const requiredFilesIgnoreList = new Set([
        'packages/clear-button', // extends button
        'packages/close-button', // extends button
        'packages/search-button', // extends button
        'packages/icons-ui', // extends icon
        'packages/icons-workflow', // extends icon
        'packages/iconset', // extends icon
        'packages/modal', // extends dialog
    ]);

    // Required files for each package
    const requiredFiles = [
        ['src/index.js', 'main compiled JS file'],
        ['src/index.dev.js', 'dev build file'],
        ['src/*.d.ts', 'TypeScript declaration files'],
        ['sp-*.js', 'component definition file'],
        ['sp-*.dev.js', 'dev component definition file'],
        ['sp-*.d.ts', 'component definition type file'],
    ];

    const checks = packages.map(async (pkg) => {
        const pkgPath = pkg.replace(/\/$/, '');

        const srcPath = path.join(pkg, 'src');
        if (!fs.existsSync(srcPath)) {
            throw new Error(`Missing src directory in ${pkg}`);
        }

        // Check if src directory is empty
        const srcFiles = fs.readdirSync(srcPath);
        if (srcFiles.length === 0) {
            throw new Error(`src directory is empty in ${pkg}`);
        }

        if (requiredFilesIgnoreList.has(pkgPath)) {
            return;
        }

        // Verify all required files exist for this package
        for (const [filePattern, description] of requiredFiles) {
            const pattern = path.join(pkg, filePattern);
            const files = glob.sync(pattern);
            if (files.length === 0) {
                throw new Error(
                    `Missing ${description} in ${pkg} (pattern: ${filePattern})`
                );
            }
        }
    });
    await Promise.all(checks);
}

async function main() {
    try {
        console.log('Verifying custom-elements.json files...'.cyan);
        await verifyCustomElementsJson();

        console.log('Verifying version.js...'.cyan);
        verifyVersionJs();

        console.log('Verifying build artifacts...'.cyan);
        await verifyBuildArtifacts();

        console.log('All build artifacts verified successfully'.green.bold);
        process.exit(0);
    } catch (error) {
        console.error(
            'Build artifact verification failed:'.red.bold,
            error.message.red
        );
        process.exit(1);
    }
}

main();
