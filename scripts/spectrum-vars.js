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
import { transform } from 'lightningcss';
import { fileURLToPath } from 'url';
import fg from 'fast-glob';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

let removedVariableDeclarations = 0;

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
    /* lit-html is a JS literal, so `\` escapes by default.
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

    ({ code: result } = transform({
        code: Buffer.from(result),
        visitor: {
            Declaration(declaration) {
                if (
                    declaration.property === 'custom' &&
                    // Manually include Spectrum Vars, for now...
                    !declaration.value.name.startsWith('--spectrum-global-') &&
                    !declaration.value.name.startsWith('--spectrum-alias-') &&
                    !declaration.value.name.startsWith('--spectrum-semantic') &&
                    // Manually include Typography values, while we do not ship a "package" for these...
                    !declaration.value.name.startsWith('--spectrum-font') &&
                    !declaration.value.name.startsWith('--spectrum-heading') &&
                    !declaration.value.name.startsWith('--spectrum-body') &&
                    !declaration.value.name.startsWith('--spectrum-detail') &&
                    !declaration.value.name.startsWith('--spectrum-code') &&
                    !usedVariables?.has(declaration.value.name)
                ) {
                    removedVariableDeclarations += 1;
                    return [];
                }
            },
        },
    }));

    return result;
};

const processCSS = async (
    srcPath,
    dstPath,
    identifier,
    from,
    usedVariables = undefined
) => {
    const data = fs.readFileSync(srcPath, 'utf8');
    const result = await processCSSData(data, identifier, from, usedVariables);
    fs.writeFileSync(dstPath, result, 'utf8');
};

const processTypography = async (
    baseSrcPath,
    overridesSrcPath,
    dstPath,
    identifier,
    from,
    usedVariables = undefined
) => {
    const baseData = fs.readFileSync(baseSrcPath, 'utf8');
    const overridesData = overridesSrcPath
        ? fs.readFileSync(overridesSrcPath, 'utf8')
        : '';
    const data = baseData + overridesData;
    const result = await processCSSData(data, identifier, from, usedVariables);
    fs.writeFileSync(dstPath, result, 'utf8');

    const fontPath = path.resolve(
        path.join(__dirname, '..', 'tools', 'styles', 'fonts.css')
    );
    fs.writeFileSync(fontPath, result, 'utf8');
};

const systems = ['spectrum', 'spectrum-two', 'express'];
const themes = ['lightest', 'light', 'dark', 'darkest'];
const scales = ['medium', 'large'];
const cores = ['global'];
const processes = [];

const foundVars = await findUsedVars();

systems.forEach((system) => {
    const varsPackage = system === 'express' ? 'expressvars' : 'vars';
    const varsPath = path
        .dirname(import.meta.resolve(`@spectrum-css/${varsPackage}`))
        .replace(/^file:/, '');
    const packageDir = ['styles'];
    if (system !== 'spectrum') {
        packageDir.push(system);
    }
    themes.forEach((theme) => {
        if (system !== 'spectrum' && ['lightest', 'darkest'].includes(theme)) {
            return;
        }
        const srcPath = path.join(varsPath, `spectrum-${theme}.css`);
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
        processes.push(processCSS(srcPath, dstPath, theme));
    });

    scales.forEach((scale) => {
        const srcPath = path.join(varsPath, `spectrum-${scale}.css`);
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
            processCSS(srcPath, dstPath, scale, undefined, foundVars)
        );
    });

    cores.forEach((core) => {
        const srcPath = path.join(varsPath, `spectrum-${core}.css`);
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
        processes.push(processCSS(srcPath, dstPath, core));
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
        let baseSrcPath = path.join(typographyPath, 'index-base.css');
        if (!fs.existsSync(baseSrcPath)) {
            baseSrcPath = baseSrcPath.replace('index-base.css', 'index.css');
        }

        let overridesSrcPath = path.join(typographyPath, 'index-theme.css');
        if (!fs.existsSync(overridesSrcPath)) {
            overridesSrcPath = undefined;
        }
        const dstPath = path.resolve(
            path.join(__dirname, '..', 'tools', 'styles', 'typography.css')
        );
        console.log(`processing typography`);
        processes.push(
            processTypography(
                baseSrcPath,
                overridesSrcPath,
                dstPath,
                'typography'
            )
        );
    }

    await Promise.all(processes).then(() => {
        console.log(
            `Spectrum Vars processed. ${removedVariableDeclarations} Custom Property declarations were removed as unused.`
        );
    });
}

processSpectrumVars();
