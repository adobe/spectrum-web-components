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

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// load our license file
const license = fs.readFileSync(
    path.join(__dirname, '..', 'config', 'license.js')
);

const processCSSData = async (data, identifier) => {
    /* lit-html is a JS litteral, so `\` escapes by default.
     * for there to be unicode characters, the escape must
     * escape itself...
     */
    let result = data.replace(/\\/g, '\\\\');

    // possible selectors to replace
    const selector1 =
        identifier == ':root ' ? identifier : `.spectrum--${identifier}`;
    const selector2 = '.spectrum';

    // new selector values
    const shadowSelector = ':root,\n:host';

    if (data.indexOf(selector1) >= 0) {
        result = result.replace(selector1, shadowSelector);
    } else if (data.indexOf(selector2) >= 0) {
        result = result.replace(selector2, shadowSelector);
        result = result.replace(
            `.spectrum--medium,
.spectrum--large`,
            shadowSelector
        );
        result = result.replace(
            `.spectrum--darkest,
.spectrum--dark,
.spectrum--light,
.spectrum--lightest`,
            shadowSelector
        );
    }

    result = await postcss(postCSSPlugins())
        .process(result, {
            from: undefined,
        })
        .then((output) => output.css);

    return result;
};

const writeProcessedCSSToFile = (dstPath, contents) => {
    const result = `${license}\n/* stylelint-disable */\n${contents}\n/* stylelint-enable */`;
    fs.writeFile(dstPath, result, 'utf8');
};

const processCSS = async (srcPath, dstPath, identifier) => {
    fs.readFile(srcPath, 'utf8', async function (error, data) {
        if (error) {
            return console.log(error);
        }

        let result = await processCSSData(data, identifier);
        writeProcessedCSSToFile(dstPath, result);
    });
};

// For fonts.css we need to combine 2 source files into 1
const processMultiSourceCSS = async (srcPaths, dstPath, identifier) => {
    let result = '';

    for (const srcPath of srcPaths) {
        let data = fs.readFileSync(srcPath, 'utf8');
        result = `${result}\n${await processCSSData(data, identifier)}`;
    }

    writeProcessedCSSToFile(dstPath, result);
};

// where is spectrum-css?
// TODO: use resolve package to find node_modules
const spectrumPath = path.resolve(
    path.join(__dirname, '..', 'node_modules', '@spectrum-css', 'vars', 'dist')
);

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

themes.forEach(async (theme) => {
    const srcPath = path.join(spectrumPath, `spectrum-${theme}.css`);
    const dstPath = path.resolve(
        path.join(__dirname, '..', 'packages', 'styles', `theme-${theme}.css`)
    );

    console.log(`processing theme ${srcPath}`);
    processes.push(await processCSS(srcPath, dstPath, theme));
});

scales.forEach(async (scale) => {
    const srcPath = path.join(spectrumPath, `spectrum-${scale}.css`);
    const dstPath = path.resolve(
        path.join(__dirname, '..', 'packages', 'styles', `scale-${scale}.css`)
    );
    console.log(`processing scale  ${srcPath}`);
    processes.push(await processCSS(srcPath, dstPath, scale));
});

cores.forEach(async (core) => {
    const srcPath = path.join(spectrumPath, `spectrum-${core}.css`);
    const dstPath = path.resolve(
        path.join(__dirname, '..', 'packages', 'styles', `core-${core}.css`)
    );
    console.log(`processing core ${srcPath}`);
    processes.push(await processCSS(srcPath, dstPath, core));
});

(async () => {
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
            path.join(__dirname, '..', 'packages', 'styles', 'typography.css')
        );
        console.log(`processing typography`);
        processes.push(await processCSS(srcPath, dstPath, 'typography'));
    }

    {
        // Typography
        const typographyPath = path.join(
            __dirname,
            '..',
            'node_modules',
            '@spectrum-css',
            'typography'
        );

        // Commons
        const commonsPath = path.join(
            __dirname,
            '..',
            'node_modules',
            '@spectrum-css',
            'commons'
        );

        // typography.css
        {
            const srcPath = path.join(typographyPath, 'dist', 'index-vars.css');
            const dstPath = path.resolve(
                path.join(
                    __dirname,
                    '..',
                    'packages',
                    'styles',
                    'typography.css'
                )
            );
            console.log(`processing typography`);
            processes.push(await processCSS(srcPath, dstPath, 'typography'));
        }

        // fonts.css (2 sources so a little tricky)
        {
            // const srcPath1 = path.join(commonsPath, 'fonts.css');
            const srcPath2 = path.join(typographyPath, 'font.css');
            const dstPath = path.resolve(
                path.join(__dirname, '..', 'packages', 'styles', 'fonts.css')
            );
            console.log(`processing fonts from commons & typography`);
            processes.push(
                processMultiSourceCSS([srcPath2], dstPath, ':root ')
            );
        }
    }

    Promise.all(processes).then(() => {
        console.log('complete.');
    });
})();
