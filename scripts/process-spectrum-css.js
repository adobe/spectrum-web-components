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

const Walker = require('walker');
const path = require('path');
const chalk = require('chalk');
const fs = require('fs-extra');
const postcss = require('postcss');
const postcssSpectrumPlugin = require('./process-spectrum-postcss-plugin');
const reporter = require('postcss-reporter');

const componentRoot = path.resolve(__dirname, '../packages');

async function processComponent(componentPath) {
    const configPath = path.join(componentPath, 'spectrum-config.js');
    const spectrumConfig = require(configPath);
    const inputCssPath = require.resolve(
        `@adobe/spectrum-css/dist/components/${
            spectrumConfig.spectrum
        }/index-vars.css`
    );
    const inputCss = await fs.readFile(inputCssPath);
    console.log(chalk.bold.green(`- ${spectrumConfig.spectrum}`));
    return Promise.all(
        spectrumConfig.components.map(async (component) => {
            const outputCssPath = path.join(
                componentPath,
                `spectrum-${component.name}.css`
            );
            const outputCss = await postcss([
                postcssSpectrumPlugin({ component }),
                reporter(),
            ]).process(inputCss, {
                from: inputCssPath,
                to: outputCssPath,
            });
            console.log(chalk.bold.green(`  o ${component.name}`));
            return fs.writeFile(outputCssPath, outputCss, { encoding: 'utf8' });
        })
    );
}

function processComponents() {
    return new Promise((resolve, reject) => {
        const promises = [];

        console.log(chalk.bold.green('Processing Spectrum Components'));

        Walker(componentRoot)
            .on('file', function(filePath, stat) {
                const parsedPath = path.parse(filePath);
                if (parsedPath.base === 'spectrum-config.js') {
                    promises.push(processComponent(parsedPath.dir));
                }
            })
            .on('error', function(error, entry, stat) {
                reject(error);
            })
            .on('end', function() {
                resolve(Promise.all(promises));
            });
    }).then((result) => {
        console.log(chalk.bold.green('Done'));
        return result;
    });
}

async function main() {
    await processComponents();
}

main();
