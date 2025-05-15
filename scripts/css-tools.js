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

import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { createRequire } from 'node:module';

import fg from 'fast-glob';
import { bundleAsync } from 'lightningcss';
import eslint from 'eslint';
import { stripIndent } from 'common-tags';
import 'colors';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const fsp = fs.promises;
const require = createRequire(import.meta.url);

export const log = {
    success: (message) => console.log(`${'✓'.green}  ${message}`),
    fail: (message) => console.log(`${'✗'.red}  ${message}`),
};

const linter = new eslint.ESLint({
    fix: true,
});

const getPackagePath = (packageName) => {
    let filepath;

    // Escape hatch for local packages: @spectrum-web-components
    if (packageName.startsWith('@spectrum-web-components')) {
        return path.resolve(
            path.join(__dirname, '..', 'node_modules', packageName)
        );
    }

    try {
        filepath = require.resolve(packageName);
    } catch (er) {
        log.fail(`Could not find ${packageName} installed as a dependency`);
        return new Error(er);
    }

    return filepath;
};

const wrapCSSResult = (content) => {
    return stripIndent`
        import { css } from '@spectrum-web-components/base';
        const styles = css\`
            ${content}
        \`;
        export default styles;
    `;
};

/**
 * Processes a CSS file using lightningcss, minifies it, and outputs a TypeScript module.
 * The output module includes license headers and wraps the CSS in a template literal.
 *
 * @param {string} cssPath - Path to the CSS file to process
 * @returns {Promise<void>} A promise that resolves when processing is complete
 *
 */
export const processCSS = async (cssPath) => {
    return bundleAsync({
        filename: cssPath,
        minify: true,
        errorRecovery: true,
        resolver: {
            read(filePath) {
                const file = fs.readFileSync(filePath, 'utf8');
                return file;
            },
            resolve(specifier, from) {
                if (specifier.startsWith('./')) {
                    return path.resolve(from, '..', specifier);
                } else {
                    return getPackagePath(specifier);
                }
            },
        },
    })
        .then(async ({ code }) => {
            // Before writing, lint the new ts file
            const content = wrapCSSResult(code);
            const lintResult = await linter.lintText(content);

            if (!lintResult?.[0]?.output || lintResult.errorCount > 0) {
                if (lintResult.errorCount > 0) {
                    console.error(lintResult.results[0].messages);
                }

                return Promise.reject(new Error('Linting failed'));
            }

            return fsp.writeFile(`${cssPath}.ts`, lintResult[0].output);
        })
        .catch((er) => {
            console.error(er);
        });
};
