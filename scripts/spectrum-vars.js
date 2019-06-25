#!/usr/bin/env node

/*
Copyright 2018 Adobe. All rights reserved.
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
    fs.readFile(srcPath, 'utf8', function(err, data) {
        if (err) {
            return console.log(err);
        }

        let result = data.replace(`.spectrum--${identifier}`, ':root,\n :host');
        result = `${license}\n ${result}`;

        fs.writeFile(dstPath, result, 'utf8');
    });
};

// where is spectrum-css?
// TODO: use resolve package to find node_modules
const spectrumPath = path.resolve(
    path.join(
        __dirname,
        '..',
        'node_modules',
        '@adobe',
        'spectrum-css',
        'dist',
        'vars'
    )
);

// sources to use from spectrum-css
const themes = [
    'light',
    'dark',
    /*'darkest', 'lightest', 'middark', 'midlight'*/
];
const scales = [
    'medium',
    /* 'large' */
];
const cores = ['global'];
const processes = [];

themes.forEach(async (theme) => {
    const srcPath = path.join(spectrumPath, `spectrum-${theme}-unique.css`);
    const dstPath = path.resolve(
        path.join(__dirname, '..', 'styles', `theme-${theme}.css`)
    );

    console.log(`processing theme ${srcPath}`);
    processes.push(processCSS(srcPath, dstPath, theme));
});

scales.forEach(async (scale) => {
    const srcPath = path.join(spectrumPath, `spectrum-${scale}-unique.css`);
    const dstPath = path.resolve(
        path.join(__dirname, '..', 'styles', `scale-${scale}.css`)
    );
    console.log(`processing scale  ${srcPath}`);
    processes.push(processCSS(srcPath, dstPath, scale));
});

cores.forEach(async (core) => {
    const srcPath = path.join(spectrumPath, `spectrum-${core}.css`);
    const dstPath = path.resolve(
        path.join(__dirname, '..', 'styles', `core-${core}.css`)
    );
    console.log(`processing core ${srcPath}`);
    processes.push(processCSS(srcPath, dstPath, core));
});

Promise.all(processes).then(() => {
    console.log('complete.');
});
