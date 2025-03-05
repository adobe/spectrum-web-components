/*
Copyright 2022 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

import path from 'path';
import fs from 'fs';
import { bundleAsync } from 'lightningcss';
import { fileURLToPath } from 'url';
import { createRequire } from 'node:module';
import { stripIndent } from 'common-tags';
import 'colors';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);

/**
 * The local workspace directories to read and write content
 * @type {Object}
 * @property {string} tools - The directory containing the CSS tools packages
 * @property {string} styles - The directory containing the theme and typography CSS
 */
export const dirs = {
    root: path.resolve(__dirname, '..'),
    styles: path.resolve(__dirname, '..', 'tools', 'styles'),
};

export const printRelativePath = (filePath) => {
    return path.relative(dirs.root, filePath);
};

// eslint-disable no-console
/**
 * This utility logs messages to the console with a standardized format
 * @type {Object}
 * @property {Function} success - Logs a success message
 * @property {Function} fail - Logs a failure message
 */
export const log = {
    success: (message) => console.log(`${'✓'.green}  ${message}`),
    fail: (message) => console.log(`${'✗'.red}  ${message}`),
    warn: (message) => console.log(`${'⚠️'.yellow}  ${message}`),
    notice: (message) => console.log(`${message}`),
};
// eslint-enable no-console

/**
 * This utility function has a built-in escape hatch for local packages
 * but falls back to the standard require.resolve for dependencies. This returns
 * the full filepath to the provided package.
 * @param {string} packageName - The full name of the package (e.g. @spectrum-web-components/button)
 * @returns {string} The path to the package
 */
export const getPackagePath = (packageName) => {
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

/**
 * Determine the file path for the core CSS asset in a @spectrum-css component
 * @param {string} packageDirectory - The name of the package to resolve
 * @returns {string} The path to the core CSS asset
 */
export const getBaseCSS = (packageDirectory) => {
    // Start by checking for the existence of the `index-base.css` file;
    // this only exists if the component supports theming
    if (fs.existsSync(path.resolve(packageDirectory, 'index-base.css'))) {
        return path.resolve(packageDirectory, 'index-base.css');
    }

    // If the `index-base.css` file does not exist and the `index.css` file does not exist,
    // then we need to throw an error because the package is not a valid @spectrum-css component
    if (!fs.existsSync(path.resolve(packageDirectory, 'index.css'))) {
        const message = `Could not find the core CSS asset for ${packageDirectory}`;
        log.fail(message);
        return new Error(message);
    }

    return path.resolve(packageDirectory, 'index.css');
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

const licensePath = path.resolve(__dirname, '..', 'config', 'license.js');
let header = '';
if (fs.existsSync(licensePath)) {
    header = fs.readFileSync(licensePath, 'utf8');
    header = header.replace('<%= YEAR %>', new Date().getFullYear());
}

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
        .then(({ code }) => {
            log.success(cssPath.yellow + ' bundled successfully');

            fs.writeFileSync(
                `${cssPath}.ts`,
                header + wrapCSSResult(code),
                'utf-8'
            );
        })
        .catch((er) => {
            log.fail(cssPath.yellow + ' failed to bundle');
            console.error(er);
        });
};
