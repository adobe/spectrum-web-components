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
import { fileURLToPath } from 'url';

import glob from 'fast-glob';
import 'colors';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function verifyVersionJs() {
    // If that file is missing, we can't verify the version
    // (also something is probably broken...)
    if (!fs.existsSync(path.join(__dirname, '..', 'tools/base/package.json'))) {
        return Promise.reject(
            `❌  Failed to find the ${'tools/base/package.json'.cyan} file`
        );
    }

    const basePackageJson = await import('../tools/base/package.json', {
        with: { type: 'json' },
    }).catch((error) => {
        if (error.code === 'ERR_MODULE_NOT_FOUND') {
            return Promise.reject(
                `❌  Failed to find the ${'tools/base/package.json'.cyan} file`
            );
        }

        return Promise.reject(
            `❌  Failed to load the ${'tools/base/package.json'.cyan} file`
        );
    });

    // If that file is missing, we can't verify the version
    // (also something is probably broken...)
    if (
        !fs.existsSync(path.join(__dirname, '..', 'tools/base/src/version.js'))
    ) {
        return Promise.reject(
            `❌  Failed to find the ${'tools/base/src/version.js'.cyan} file`
        );
    }

    // Fetching our "source-of-truth" version (managed by genversion tool)
    const { version } = await import('../tools/base/src/version.js').catch(
        (error) => {
            if (error.code === 'ERR_MODULE_NOT_FOUND') {
                return Promise.reject(
                    `❌  Failed to find the ${'tools/base/src/version.js'.cyan} file`
                );
            }

            return Promise.reject(
                `❌  Failed to load the ${'tools/base/src/version.js'.cyan} file`
            );
        }
    );

    if (!version || typeof version !== 'string') {
        return Promise.reject(
            `❌  Invalid or missing version in ${'tools/base/src/version.js'.cyan}`
        );
    }

    if (version !== basePackageJson?.version) {
        return Promise.reject(
            `❌  Version mismatch: version.js (${version}) does not match ${'tools/base/package.json'.cyan} (${basePackageJson.version})`
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
    return Promise.all([
        verifyVersionJs()
            .catch((error) => {
                console.error(
                    'Version.js verification failed:'.red.bold,
                    error.message
                );
                process.exit(1);
            })
            .then(() => {
                console.log('✅  Version.js verified successfully'.green.bold);
            }),
        verifyBuildArtifacts()
            .catch((error) => {
                console.error(
                    'Build artifact verification failed:'.red.bold,
                    error.message.red
                );
                process.exit(1);
            })
            .then(() => {
                console.log(
                    '✅  Build artifacts verified successfully'.green.bold
                );
            }),
    ])
        .catch((error) => {
            console.error(
                'An error occurred during verification:'.red.bold,
                error.message.red
            );
            process.exit(1);
        })
        .then(() => {
            console.log(
                '✅  All verifications completed successfully'.green.bold
            );
            process.exit(0);
        });
}

main();
