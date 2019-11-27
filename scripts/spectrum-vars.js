#!/usr/bin/env node

/*
Copyright 2019 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

const path = require('path');
const fs = require('fs-extra');

// load our license file
const license = fs.readFileSync(
    path.join(__dirname, '..', 'config', 'license.js')
);

const processCSS = (srcPath, dstPath, identifier) => {
    fs.readFile(srcPath, 'utf8', function(error, data) {
        if (error) {
            return console.log(error);
        }

        /* lit-html is a JS litteral, so `\` escapes by default.
         * for there to be unicode characters, the escape must
         * escape itself...
         */
        let result = data.replace(/\\/g, '\\\\');

        // possible selectors to replace
        const selector1 = `.spectrum--${identifier}`;
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

        result = `${license}\n/* stylelint-disable */\n${result}\n/* stylelint-enable */`;

        fs.writeFile(dstPath, result, 'utf8');
    });
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
    /*'darkest', 'lightest', 'middark', 'midlight'*/
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
    processes.push(processCSS(srcPath, dstPath, theme));
});

scales.forEach(async (scale) => {
    const srcPath = path.join(spectrumPath, `spectrum-${scale}.css`);
    const dstPath = path.resolve(
        path.join(__dirname, '..', 'packages', 'styles', `scale-${scale}.css`)
    );
    console.log(`processing scale  ${srcPath}`);
    processes.push(processCSS(srcPath, dstPath, scale));
});

cores.forEach(async (core) => {
    const srcPath = path.join(spectrumPath, `spectrum-${core}.css`);
    const dstPath = path.resolve(
        path.join(__dirname, '..', 'packages', 'styles', `core-${core}.css`)
    );
    console.log(`processing core ${srcPath}`);
    processes.push(processCSS(srcPath, dstPath, core));
});

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
    processes.push(processCSS(srcPath, dstPath, 'typography'));
}

Promise.all(processes).then(() => {
    console.log('complete.');
});
