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

/** @todo Could generate this from CSS packages that have @spectrum-css/tokens as a dependency */
const tokenPackages = [
    'accordion',
    'actionbar',
    'actionbutton',
    'actiongroup',
    'alertbanner',
    'alertdialog',
    'asset',
    'avatar',
    'badge',
    'button',
    'buttongroup',
    'breadcrumb',
    'checkbox',
    'card',
    'clearbutton',
    'closebutton',
    'coachindicator',
    'coachmark',
    'colorarea',
    'colorfield',
    'colorhandle',
    'colorloupe',
    'colorslider',
    'colorwheel',
    'combobox',
    'contextualhelp',
    'dialog',
    'divider',
    'dropzone',
    'fieldgroup',
    'fieldlabel',
    'helptext',
    'illustratedmessage',
    'icon',
    'infieldbutton',
    'link',
    'menu',
    'meter',
    'modal',
    'numberfield',
    'picker',
    'pickerbutton',
    'popover',
    'progressbar',
    'progresscircle',
    'radio',
    'search',
    'sidenav',
    'slider',
    'splitview',
    'statuslight',
    'stepper',
    'swatch',
    'swatchgroup',
    'opacitycheckerboard',
    'switch',
    'table',
    'tabs',
    'tag',
    'taggroup',
    'textfield',
    'thumbnail',
    'toast',
    'tooltip',
    'topnav',
    'tray',
    'underlay',
    'typography',
];

const packagePaths = tokenPackages
    .map((packageName) => getPackagePath(packageName))
    .map((filepath) => {
        if (!filepath) {
            return;
        }

        const themeFolder = path.join(filepath, 'dist', 'themes');
        if (fs.existsSync(themeFolder)) {
            return themeFolder;
        }

        return;
    })
    .filter(Boolean);

const spectrumThemeSelectorRegExp =
    /(?:\.spectrum(--(?:express|light(?:est)?|dark(?:est)?|medium|large|legacy)?,?(\n|\s)*)?)+\s?\{/g;

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
 * to be used by the sp-theme
 * @param {'spectrum'|'spectrum-two'} spectrumVersion
 * @param {Object} options
 * @param {boolean} options.clean - Whether to clean the output directory before writing
 * @returns {Promise}
 */
export async function generateTokensWrapper(
    spectrumVersion,
    { clean = true } = {}
) {
    const isSpectrumOne = spectrumVersion === 'spectrum';
    const tokenPaths = ['tokens', 'tokens-v2'];
    const pathIdx = isSpectrumOne ? 0 : 1;
    const tokenPackageName = tokenPaths[pathIdx];

    let tokenSourcePath = getPackagePath(tokenPackageName);
    if (tokenSourcePath) {
        tokenSourcePath = path.join(tokenSourcePath, 'dist', 'css');
    }

    const outputPath = path.join(__dirname, '..', 'tools', 'styles');

    /**
     * @TODO
     * These assets are not provided by the tokens or tokens-v2 packages;
     * they are deprecated and should be removed from the output directory
     * in the next major release.
     */
    const deprecatedAssets = isSpectrumOne
        ? [
              'express/custom-dark-vars.css',
              'express/custom-darkest-vars.css',
              'express/custom-light-vars.css',
              'express/custom-large-vars.css',
              'express/custom-medium-vars.css',
              'express/custom-vars.css',
              'spectrum/custom-dark-vars.css',
              'spectrum/custom-darkest-vars.css',
              'spectrum/custom-light-vars.css',
              'spectrum/custom-large-vars.css',
              'spectrum/custom-medium-vars.css',
              'spectrum/custom-vars.css',
          ]
        : [
              'spectrum/custom-dark-vars.css',
              'spectrum/custom-darkest-vars.css',
              'spectrum/custom-large-vars.css',
              'spectrum/custom-light-vars.css',
              'spectrum/custom-medium-vars.css',
              'spectrum/custom-vars.css',
          ];

    // If clean is true, remove the existing directory before writing
    if (clean) {
        rimrafSync(path.join(outputPath, tokenPackageName), {
            // do not remove the deprecated token files
            filter: (file, dirent) =>
                dirent.isFile() &&
                !deprecatedAssets.includes(
                    path.relative(path.join(outputPath, tokenPackageName), file)
                ),
        });
    }

    // Only create express directory for tokens not tokens-v2
    if (isSpectrumOne) {
        ['spectrum', 'express'].forEach((folder) => {
            // Create the directories if they don't exist
            fs.mkdirSync(path.join(outputPath, tokenPackageName, folder), {
                recursive: true,
            });
        });
    } else {
        fs.mkdirSync(path.join(outputPath, tokenPackageName), {
            recursive: true,
        });
    }

    /**
     * copies @spectrum-css/dist/css/*.css and @spectrum-css/dist/css/**\/*.css
     * replaces classes with :root, :host, and pastes them into
     * corresponding /tools/styles/*.css and /tools/styles/tokens/**\/*.css
     */
    const themeTokens = await Promise.all([
        fg(['*.css', 'spectrum/*.css', 'express/*.css'], {
            cwd: tokenSourcePath,
        }),
        // S1 has their index.css file outside of the css directory
        fg(['../index.css'], {
            cwd: tokenSourcePath,
        }),
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
                    tokenPackageName,
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

    await Promise.all([promises]);

    // Write the following empty files to the directory as a temporary
    // placeholder for erroneous / orphaned files that do not exist in the
    // tokens packages

    fs.mkdirSync(path.join(outputPath, tokenPackageName, 'spectrum'), {
        recursive: true,
    });

    return processComponentThemes(outputPath);
}

/**
 * Every component package with a dist/themes folder
 * needs to be processed and concatenated into a single file
 * - spectrum-two.css files are written to tokens-v2/system-theme-bridge.css
 * - express.css files are written to tokens/express/system-theme-bridge.css
 * - spectrum.css files are written to tokens/spectrum/system-theme-bridge.css
 *
 * @param {string} outputPath
 * @returns {Promise}
 */
async function processComponentThemes(outputPath) {
    const filename = 'system-theme-bridge.css';
    const writeOptions = { encoding: 'utf-8' };
    const onFinished = async (outputPath) => {
        if (!fs.existsSync(outputPath)) {
            log.fail(`${relativePath(outputPath)} no written`);
            return;
        }

        log.success(`${relativePath(outputPath).yellow} written`);

        // Format, combine, & prettify content
        const content = await fsp.readFile(outputPath);

        const { code } = await transform({
            filename: outputPath,
            minify: true,
            code: Buffer.from(content),
        });

        const formatted = await prettier.format(
            targetHost(code.toString()),
            prettierSettings
        );

        return fsp.writeFile(outputPath, formatted, { encoding: 'utf8' });
    };

    // Create three write streams for the three different types of themes
    const streams = {
        spectrum: fs
            .createWriteStream(
                path.join(outputPath, 'tokens', 'spectrum', filename),
                writeOptions
            )
            .on('finish', async () => {
                return onFinished(
                    path.join(outputPath, 'tokens', 'spectrum', filename)
                );
            }),
        express: fs
            .createWriteStream(
                path.join(outputPath, 'tokens', 'express', filename),
                writeOptions
            )
            .on('finish', async () => {
                return onFinished(
                    path.join(outputPath, 'tokens', 'express', filename)
                );
            }),
        'spectrum-two': fs
            .createWriteStream(
                path.join(outputPath, 'tokens-v2', filename),
                writeOptions
            )
            .on('finish', async () => {
                return onFinished(path.join(outputPath, 'tokens-v2', filename));
            }),
    };

    /* Iterate over each component package and concatenate the theme CSS */
    for (const filepath of packagePaths) {
        const themes = fg.sync(['*.css'], { cwd: filepath, absolute: true });

        for (const themePath of themes) {
            const theme = path.basename(themePath, '.css');
            const stream = streams[theme];

            // check if path exists
            if (!fs.existsSync(themePath)) {
                continue;
            }

            const content = fs.readFileSync(themePath, { encoding: 'utf8' });

            // If the content is empty, return
            if (!content) {
                continue;
            }

            stream.write(content);
        }
    }

    Object.values(streams).forEach((stream) => stream.end());
}
