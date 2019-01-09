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
const readline = require('linebyline');

const splitCSS = (
    srcPath,
    dstPath,
    {
        selector = '',
        components = [],
        topLevelModules = ['alias', 'global', 'semantic'],
        license = '',
    }
) => {
    const regex = new RegExp(/\s+--spectrum-([a-z]+)-.*/i);

    // ensure output folder exists
    fs.mkdirpSync(dstPath);

    return new Promise((resolve, reject) => {
        const rl = readline(srcPath);

        let currentModuleName;
        let fd;

        let indexFd = fs.openSync(path.join(dstPath, 'all.css'), 'w');
        fs.writeSync(indexFd, `${license}\n`);

        rl.on('line', (line) => {
            const match = line.match(regex);
            if (!match) {
                // no matching result, continue to the next line
                return;
            }
            const moduleName = match[1];
            const isTopLevel = topLevelModules.includes(moduleName);
            const fileName = `${moduleName}.css`;

            // output to components subfolder unless this is a top level module
            let filePath;
            if (isTopLevel) {
                filePath = path.join(dstPath, fileName);
            } else {
                if (!components.includes(moduleName)) {
                    return;
                }
                filePath = path.join(dstPath, 'components', fileName);
                fs.mkdirpSync(path.join(dstPath, 'components'));
            }

            // did we change modules?
            if (moduleName !== currentModuleName) {
                // did we have a previous module?
                if (currentModuleName && fd) {
                    // we did, close it out
                    fs.writeSync(fd, '}\n');
                    fs.close(fd);
                }
                // we're starting a new module
                currentModuleName = moduleName;
                const relativePath = path.relative(dstPath, filePath);
                // write the import to the all.css file
                fs.writeSync(indexFd, `@import "${relativePath}";\n`);
                // open the new file
                fd = fs.openSync(filePath, 'w'); // overwrite existing files
                // write the root selector with optional selector
                fs.writeSync(fd, `${license}\n:root ${selector} {\n`);
            }
            // write the line to the file with appended newline
            fs.writeSync(fd, `${match[0]}\n`);
        });

        rl.on('close', () => {
            // did we have a previous module?
            if (currentModuleName && fd) {
                // we did, close it out
                fs.writeSync(fd, '}\n');
                fs.close(fd);
            }
            fs.close(indexFd);
            resolve(true);
        });

        rl.on('error', function(e) {
            // something went wrong
            console.error(e);
            reject(e);
        });
    });
};

// load our license file
const license = fs.readFileSync(
    path.join(__dirname, '..', 'config', 'license.js')
);
// where is spectrum-css?
// TODO: use resolve package to find node_modules
const spectrumPath = path.resolve(
    path.join(__dirname, '..', 'node_modules', '@adobe', 'spectrum-css', 'vars')
);

// sources to use from spectrum-css
const themes = [
    'light',
    'dark' /*'darkest', 'lightest', 'middark', 'midlight'*/,
];
const scales = ['medium' /* 'large' */];
const cores = ['global'];

// the components we should copy over
const components = ['banner', 'button', 'card'];

const processes = [];

themes.forEach(async (theme) => {
    const srcPath = path.join(spectrumPath, `spectrum-${theme}.css`);
    const dstPath = path.resolve(
        path.join(__dirname, '..', 'src', 'styles', `theme-${theme}`)
    );
    console.log(`processing theme ${srcPath}`);
    processes.push(
        splitCSS(srcPath, dstPath, {
            components,
            license,
        })
    );
});

scales.forEach(async (scale) => {
    const srcPath = path.join(spectrumPath, `spectrum-${scale}.css`);
    const dstPath = path.resolve(
        path.join(__dirname, '..', 'src', 'styles', `scale-${scale}`)
    );
    console.log(`processing scale  ${srcPath}`);
    processes.push(
        splitCSS(srcPath, dstPath, {
            components,
            license,
        })
    );
});

cores.forEach(async (core) => {
    const srcPath = path.join(spectrumPath, `spectrum-${core}.css`);
    const dstPath = path.resolve(
        path.join(__dirname, '..', 'src', 'styles', `core-${core}`)
    );
    console.log(`processing core ${srcPath}`);
    processes.push(
        splitCSS(srcPath, dstPath, {
            components,
            license,
        })
    );
});

Promise.all(processes).then(() => {
    console.log('complete.');
});
