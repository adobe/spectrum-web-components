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
import fsp from 'fs/promises';
import { bundleAsync } from 'lightningcss';
import { fileURLToPath } from 'url';
import { createRequire } from 'node:module';
import { stripIndent } from 'common-tags';
import 'colors';
import { ESLint } from 'eslint';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);

// Initialize ESLint with formatting rules enabled
const eslint = new ESLint({
    fix: true,
    useEslintrc: true,
    cwd: path.join(__dirname, '..'),
});

const log = {
    success: (message) => console.log(`${'✓'.green}  ${message}`),
    fail: (message) => console.log(`${'✗'.red}  ${message}`),
};

const wrapCSSResult = async (content, filePath) => {
    const formattedResults = await eslint.lintText(
        stripIndent`
import { css } from '@spectrum-web-components/base';
const styles = css\`
    ${content}
\`;
export default styles;
`,
        { filePath }
    );
    await ESLint.outputFixes(formattedResults);
    return formattedResults;
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
                    return require.resolve(specifier);
                }
            },
        },
    })
        .then(({ code }) => {
            log.success(cssPath.yellow + ' bundled successfully');

            return wrapCSSResult(code, cssPath).then((results) => {
                return fsp.writeFile(
                    `${cssPath}.ts`,
                    results?.[0]?.output ?? code,
                    'utf-8'
                );
            });
        })
        .catch((er) => {
            log.fail(cssPath.yellow + ' failed to bundle');
            console.error(er);
        });
};
