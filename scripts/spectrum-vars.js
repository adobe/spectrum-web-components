#!/usr/bin/env node

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

import path from 'path';
import fs from 'fs-extra';
import postcss from 'postcss';
import { postCSSPlugins } from './css-processing.cjs';
import { fileURLToPath } from 'url';
import fg from 'fast-glob';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

let removedVariableDeclarations = 0;

/**
 * Use postcss to remove CSS Custom Properties that are not leveraged in the project
 *
 * @param { variables: string[] } options - list of CSS Custom Properties found to be used
 */
function postcssFilterVariableDeclarations(options) {
    options = options || {};

    var variables = options.variables;

    function filterDeclarations(root) {
        root.walk(function (rule) {
            if (rule.type === 'rule') {
                rule.each(function (decl, index) {
                    if (decl.variable) {
                        // always include global and alias vars
                        if (
                            decl.prop.startsWith('--spectrum-global-') ||
                            decl.prop.startsWith('--spectrum-alias-')
                        ) {
                            return;
                        }
                        // otherwise if the variable is not in the allowed list, remove it
                        if (!variables.has(decl.prop)) {
                            decl.remove();
                            removedVariableDeclarations += 1;
                        }
                    }
                });
            }
        });
    }

    return filterDeclarations;
}

const varRegex = /--spectrum-[^:,)\s]+/g;

/**
 * Construct an array of the all the CSS custom properties leveraged in packages
 * that ARE NOT the styles or theme packages.
 * @returns string[]
 */
const findUsedVars = async () => {
    const usedVariables = new Set();
    for (const cssPath of await fg(`./packages/*/src/*.css`)) {
        if (
            cssPath.includes('tools/styles') ||
            cssPath.includes('tools/theme')
        ) {
            continue;
        }
        const originCSS = fs.readFileSync(cssPath, 'utf8');
        const foundVars = originCSS.matchAll(varRegex);
        for (const variable of foundVars) {
            usedVariables.add(variable[0]);
        }
    }
    return usedVariables;
};

const processCSSData = async (
    data,
    identifier,
    from,
    usedVariables = undefined
) => {
    /* lit-html is a JS litteral, so `\` escapes by default.
     * for there to be unicode characters, the escape must
     * escape itself...
     */
    let result = data.replace(/\\/g, '\\\\');

    // possible selectors to replace
    const selector1 =
        identifier == ':root ' ? identifier : `.spectrum--${identifier}`;

    // new selector values
    const shadowSelector = ':root,\n:host';

    if (data.indexOf(selector1) >= 0) {
        result = result.replace(selector1, shadowSelector);
    }
    result = result.replaceAll(
        /(?:\.spectrum(--(?:express|light(?:est)?|dark(?:est)?|medium|large)?,?(\n|\s)*)?)+\s?(?={)/g,
        shadowSelector
    );

    const plugins = postCSSPlugins();
    if (usedVariables) {
        plugins.push(
            postcssFilterVariableDeclarations({
                variables: usedVariables,
            })
        );
    }
    result = await postcss(plugins)
        .process(result, {
            from,
        })
        .then((output) => output.css);

    return result;
};

const processCSS = async (
    srcPath,
    dstPath,
    identifier,
    from,
    usedVariables = undefined
) => {
    return new Promise((res) => {
        fs.readFile(srcPath, 'utf8', async function (error, data) {
            if (error) {
                return console.log(error);
            }

            let result = await processCSSData(
                data,
                identifier,
                from,
                usedVariables
            );
            fs.writeFileSync(dstPath, result, 'utf8');
            res();
        });
    });
};

// where is spectrum-css?
// TODO: use resolve package to find node_modules
const spectrumPaths = [
    path.resolve(
        path.join(
            __dirname,
            '..',
            'node_modules',
            '@spectrum-css',
            'vars',
            'dist'
        )
    ),
    path.resolve(
        path.join(
            __dirname,
            '..',
            'node_modules',
            '@spectrum-css',
            'expressvars',
            'dist'
        )
    ),
];

// sources to use from spectrum-css
const themes = [
    'lightest',
    'light',
    'dark',
    'darkest',
    /*'middark', 'midlight'*/
];
const scales = ['medium', 'large'];
const cores = ['global'];
const processes = [];

const foundVars = await findUsedVars();

spectrumPaths.forEach(async (spectrumPath, i) => {
    const packageDir = ['styles'];
    const isExpress = i === 1;
    if (isExpress) packageDir.push('express');
    themes.forEach(async (theme) => {
        if (isExpress && ['lightest', 'darkest'].includes(theme)) return;
        const srcPath = path.join(spectrumPath, `spectrum-${theme}.css`);
        const dstPath = path.resolve(
            path.join(
                __dirname,
                '..',
                'tools',
                ...packageDir,
                `spectrum-theme-${theme}.css`
            )
        );

        console.log(`processing theme ${srcPath}`);
        processes.push(await processCSS(srcPath, dstPath, theme));
    });

    scales.forEach(async (scale) => {
        const srcPath = path.join(spectrumPath, `spectrum-${scale}.css`);
        const dstPath = path.resolve(
            path.join(
                __dirname,
                '..',
                'tools',
                ...packageDir,
                `spectrum-scale-${scale}.css`
            )
        );
        console.log(`processing scale  ${srcPath}`);
        processes.push(
            await processCSS(srcPath, dstPath, scale, undefined, foundVars)
        );
    });

    cores.forEach(async (core) => {
        const srcPath = path.join(spectrumPath, `spectrum-${core}.css`);
        const dstPath = path.resolve(
            path.join(
                __dirname,
                '..',
                'tools',
                ...packageDir,
                `spectrum-core-${core}.css`
            )
        );
        console.log(`processing core ${srcPath}`);
        processes.push(await processCSS(srcPath, dstPath, core));
    });
});

async function processSpectrumVars() {
    {
        // Typography
        const typographyPath = path.join(
            __dirname,
            '..',
            'node_modules',
            '@spectrum-css',
            'typography',
            'dist'
        );
        const srcPath = path.join(typographyPath, 'index-vars.css');
        const dstPath = path.resolve(
            path.join(__dirname, '..', 'tools', 'styles', 'typography.css')
        );
        console.log(`processing typography`);
        processes.push(await processCSS(srcPath, dstPath, 'typography'));
    }

    Promise.all(processes).then(() => {
        console.log(
            `Spectrum Vars processed. ${removedVariableDeclarations} Custom Property declarations were removed as unused.`
        );
    });
}

processSpectrumVars();
