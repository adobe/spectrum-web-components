#!/usr/bin/env node

/*!
 * Copyright 2020 Adobe. All rights reserved.
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
import fs from 'fs-extra';

import { transform } from 'lightningcss';
import fg from 'fast-glob';
import 'colors';

import {
    dirs,
    getBaseCSS,
    getPackagePath,
    log,
    printRelativePath,
} from '../tasks/css-tools.js';

const fsp = fs.promises;

/**
 * A utility to run the CSS through a selector transformation and remove unused custom properties
 * @param {string} data - The CSS content to process
 * @param {string} [identifier=':root'] - Any additional selectors to replace with :root/:host
 * @param {Set} [usedVariables=new Set()] - A set of custom properties used in the project
 * @returns {Promise<{ result: string, removedVariableDeclarations: number }>} The processed CSS result after transformation
 */
async function transformCSS(
    data,
    identifier = ':root',
    usedVariables = new Set()
) {
    let removedVariableDeclarations = 0;

    /**
     * @note lit-html is a JS literal, so `\` escapes by default.
     * for there to be unicode characters, the escape must escape itself
     */
    let result = data.replace(/\\/g, '\\\\');

    // possible additional selectors to replace beyond the global scope ones below
    const selector1 =
        identifier == ':root ' ? identifier : `.spectrum--${identifier}`;

    // Replace all global scope classes with a :root/:host selector
    if (data.indexOf(selector1) >= 0) {
        result = result.replace(selector1, ':root,\n:host');
    }

    // Replace all global scope classes with a :root/:host selector
    result = result.replaceAll(
        /(?:\.spectrum(--(?:express|light(?:est)?|dark(?:est)?|medium|large)?,?(\n|\s)*)?)+\s?(?={)/g,
        ':root,\n:host'
    );

    // Custom properties with these additional prefixes are preserved for downstream consumption
    const preserved = [
        // Manually include Spectrum Vars, for now...
        'global-',
        'alias-',
        'semantic',
        // Manually include Typography values, while we do not ship a "package" for these...
        'font',
        'heading',
        'body',
        'detail',
        'code',
    ];

    const transformedResult = transform({
        code: Buffer.from(result),
        visitor: {
            Declaration(declaration) {
                // Remove unused custom properties
                if (
                    // Check if the declaration is a custom property
                    declaration.property === 'custom' &&
                    // Check if the declaration is not a preserved custom property
                    !preserved.some((p) =>
                        declaration.value.name.startsWith(`--spectrum-${p}`)
                    ) &&
                    // Check if the declaration is not used in the project
                    !usedVariables?.has(declaration.value.name)
                ) {
                    removedVariableDeclarations += 1;
                    return [];
                }
            },
        },
    });

    return {
        result: transformedResult.code.toString(),
        removedVariableDeclarations,
    };
}

/**
 * A utility function to read in a CSS file, process it, and write it to a destination file
 * @param {string[]} paths - The source file path(s) to read the CSS content; if more than one, they will be concatenated
 * @param {string[]} destinationPaths - The destination file path(s) to write the processed CSS
 * @param {string} [identifier=':root']
 * @param {Set} [usedVariables=new Set()]
 * @returns {Promise<number>} - The number of removed custom property declarations
 */
async function processCSS(
    paths,
    destinationPaths,
    identifier = ':root',
    usedVariables = new Set()
) {
    const data = await Promise.all(
        paths.map(async (path) => {
            if (!fs.existsSync(path)) {
                log.warn(
                    `Could not find the core CSS asset for ${printRelativePath(path)}`
                );
                return Promise.resolve('');
            }

            const content = await fs.readFile(path, 'utf8');
            return Promise.resolve(content);
        })
    ).then((data) => data.join('\n\n'));

    // Pass the content to the transformCSS function to transform the CSS
    const { result, removedVariableDeclarations } = await transformCSS(
        data,
        identifier,
        usedVariables
    );

    return Promise.all(
        destinationPaths.map((dstPath) => writeCSSFile(dstPath, result))
    ).then(() => removedVariableDeclarations);
}

async function writeCSSFile(filePath, content) {
    // Ensure the directory exists
    await fsp.mkdir(path.dirname(filePath), { recursive: true });

    return fsp.writeFile(filePath, content, { encoding: 'utf8' });
}

/**
 * The entry point for the script that processes Spectrum CSS variables
 */
async function main() {
    const systems = ['spectrum', 'spectrum-two', 'express'];
    const processes = [];

    const foundVars = new Set();
    for (const cssPath of await fg(`./packages/*/src/*.css`)) {
        // Skip the styles and theme packages
        if (
            cssPath.includes('tools/styles') ||
            cssPath.includes('tools/theme')
        ) {
            continue;
        }
        const originCSS = fs.readFileSync(cssPath, 'utf8');
        for (const variable of originCSS.matchAll(/--spectrum-[^:,)\s]+/g)) {
            foundVars.add(variable[0]);
        }
    }

    systems.forEach((system) => {
        const packageDir = system !== 'spectrum' ? [system] : [];

        const varsPath = path.dirname(
            getPackagePath(
                `@spectrum-css/${system === 'express' ? 'expressvars' : 'vars'}`
            )
        );

        log.notice(`\nProcessing ${system.cyan} variables`);
        Object.entries({
            theme: ['lightest', 'light', 'dark', 'darkest'],
            scale: ['medium', 'large'],
            core: ['global'],
        }).forEach(([context, values]) => {
            values.forEach((value) => {
                if (
                    context === 'theme' &&
                    system !== 'spectrum' &&
                    ['lightest', 'darkest'].includes(value)
                ) {
                    return;
                }

                const srcPath = path.join(varsPath, `spectrum-${value}.css`);
                const dstPath = path.join(
                    dirs.styles,
                    ...packageDir,
                    `spectrum-${context}-${value}.css`
                );
                log.notice(
                    `- ${context}: ${value.yellow} ${`[src: ${printRelativePath(srcPath)}]`.gray}`
                );
                processes.push(
                    processCSS(
                        [srcPath],
                        [dstPath],
                        value,
                        context === 'scale' ? foundVars : undefined
                    )
                );
            });
        });
    });

    // Typography
    const typographyPath = path.dirname(
        getPackagePath('@spectrum-css/typography')
    );
    let baseSrcPath;
    try {
        baseSrcPath = getBaseCSS(typographyPath);
    } catch (error) {
        log.fail(error);
        return;
    }

    log.notice(
        `\nProcessing ${'typography'.cyan} ${`[src: ${printRelativePath(baseSrcPath)}]`.gray}\n`
    );
    processes.push(
        processCSS(
            [baseSrcPath, path.join(typographyPath, 'index-theme.css')],
            [
                path.join(dirs.styles, 'typography.css'),
                path.join(dirs.styles, 'fonts.css'),
            ],
            'typography'
        )
    );

    return Promise.all(processes)
        .then((results) => {
            // Sum the number of removed custom property declarations
            const removedVariableDeclarations = results.reduce((acc, curr) => {
                return acc + curr;
            }, 0);

            // Pretty format the removed variable count
            const formattedRemoved = new Intl.NumberFormat().format(
                removedVariableDeclarations
            );

            log.success(
                `Successfully processed. ${`${formattedRemoved}`.yellow.underline} custom property declarations were removed as unused.`
            );
            process.exit(0);
        })
        .catch((error) => {
            log.fail(error);
            process.exit(1);
        });
}

main();
