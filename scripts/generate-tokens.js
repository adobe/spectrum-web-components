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

import fg from 'fast-glob';
import { transform } from 'lightningcss';
import prettier from 'prettier';
import { rimrafSync } from 'rimraf';
import 'colors';

import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'node:module';

const fsp = fs.promises;
const require = createRequire(import.meta.url);
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const rootDir = path.join(__dirname, '..');

/** @todo should we align this with the prettier settings used by CSS? */
const prettierSettings = {
    parser: 'css',
    printWidth: 80,
    tabWidth: 4,
    semi: true,
    singleQuote: true,
    trailingComma: 'es5',
    bracketSpacing: true,
    arrowParens: 'always',
    htmlWhitespaceSensitivity: 'ignore',
};

const log = {
    info: (message) => console.log(`${'ℹ'.cyan}  ${message}`),
    success: (message) => console.log(`${'✓'.green}  ${message}`),
    warn: (message) => console.log(`${'⚠️'.yellow}  ${message}`),
    fail: (message) => console.log(`${'✗'.red}  ${message}`),
};

const relativePath = (from) => path.relative(rootDir, from);

const getPackagePath = (packageName, namespace = '@spectrum-css/') => {
    let filepath;
    try {
        filepath = require.resolve(`${namespace}${packageName}/package.json`);
    } catch (er) {
        log.warn(`Could not find package ${namespace.cyan}${packageName.cyan}`);
        return;
    }

    return path.dirname(filepath);
};

const spectrumThemeSelectorRegExp =
    /(?:\.spectrum(--(?:light|dark|medium|large)?,?(\n|\s)*)?)+\s?\{/g;

const targetHost = (css) => {
    /** @note Could use this regex to more permissive of class names */
    // return css.replaceAll(/(?:\.spectrum(--[a-z]+,?(\n|\s)*)?)+ \{/g, ':host,\n:root {');

    /**
     * @note ...Or this to lock down expected class names
     *
     * A few helpful regex hints:
     *   (?:...) - non-capturing group
     *   \s - whitespace
     *   \n - newline
     *   (...)? - 0 or 1
     *   \g - global
     **/
    return css.replaceAll(spectrumThemeSelectorRegExp, ':host,\n:root {');
};

/**
 * Core entry function for generating tokens from Spectrum CSS packages
 * to be used by the sp-theme package.
 * @param {Object} options
 * @param {boolean} options.clean - Whether to clean the output directory before writing
 * @returns {Promise}
 */
export async function generateTokensWrapper({ clean = true } = {}) {
    let tokenSourcePath = getPackagePath('tokens');
    if (tokenSourcePath) {
        tokenSourcePath = path.join(tokenSourcePath, 'dist', 'css');
    }

    const outputPath = path.join(__dirname, '..', 'tools', 'styles');
    // If clean is true, remove the existing directory before writing
    if (clean) {
        rimrafSync(path.join(outputPath, 'tokens'), {
            // do not remove the deprecated token files
            filter: (_, dirent) => dirent.isFile(),
        });
    }

    fs.mkdirSync(path.join(outputPath, 'tokens'), {
        recursive: true,
    });

    /**
     * copies @spectrum-css/dist/css/*.css
     * replaces classes with :root, :host, and pastes them into
     * corresponding /tools/styles/*.css
     */
    const themeTokens = await Promise.all([
        fg('*.css', { cwd: tokenSourcePath }),
    ]).then(([files, indexFiles]) => [...files, ...indexFiles]);

    const promises = themeTokens.map(async (fileName) =>
        fsp
            .readFile(path.join(tokenSourcePath, fileName), 'utf8')
            .then(async (content) => {
                /* If the file is empty, return */
                if (!content) {
                    return;
                }

                const output = path.join(
                    outputPath,
                    'tokens',
                    fileName.replace(/\.\.\//, '')
                );

                const { code } = await transform({
                    filename: path.join(tokenSourcePath, fileName),
                    minify: true,
                    code: Buffer.from(content),
                });

                const formatted = await prettier.format(
                    targetHost(code.toString()),
                    prettierSettings
                );

                return fs
                    .writeFile(output, formatted, {
                        encoding: 'utf8',
                    })
                    .then(() => {
                        log.success(`${relativePath(output).yellow} written`);
                    });
            })
    );

    return Promise.all([promises]);
}
