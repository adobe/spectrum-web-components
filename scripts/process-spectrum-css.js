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

import Walker from 'walker';
import path from 'path';
import chalk from 'chalk';
import fs from 'fs-extra';
import postcss from 'postcss';
import { postCSSPlugins } from './css-processing.cjs';
import postcssSpectrumPlugin from './process-spectrum-postcss-plugin.js';
import reporter from 'postcss-reporter';
import postcssCustomProperties from 'postcss-custom-properties';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const componentRoot = path.resolve(__dirname, '../packages');

async function processComponent(componentPath) {
    const configPath = path.join(componentPath, 'spectrum-config.js');
    const { default: spectrumConfig } = await import(configPath);
    const inputCssPath = `node_modules/@spectrum-css/${spectrumConfig.spectrum}/dist/index-vars.css`;
    let packageCss = false;
    if (fs.existsSync(inputCssPath)) {
        packageCss = true;
    } else {
        console.error(
            chalk.bold.red(
                `!!! '${spectrumConfig.spectrum}' does not have a local Spectrum CSS dependency !!!`
            )
        );
        process.exit(1);
    }
    const inputCss = await fs.readFile(inputCssPath);
    let inputCustomProperties = await fs.readFile(
        `node_modules/@spectrum-css/${spectrumConfig.spectrum}/dist/vars.css`,
        'utf8'
    );
    inputCustomProperties = inputCustomProperties.replace(
        /(.|\n)*\{/,
        ':root{'
    );
    console.log(chalk.bold.green(`- ${spectrumConfig.spectrum}`));
    return Promise.all(
        spectrumConfig.components.map(async (component) => {
            const outputCssPath = path.join(
                componentPath,
                `spectrum-${component.name}.css`
            );
            const outputJsonPath = path.join(
                componentPath,
                `spectrum-vars.json`
            );
            const outputCss = await postcss([
                ...(packageCss ? postCSSPlugins() : []),
                postcssSpectrumPlugin({ component }),
                reporter(),
            ]).process(inputCss, {
                from: inputCssPath,
                to: outputCssPath,
            });
            await postcss([postcssCustomProperties]).process(
                inputCustomProperties,
                {
                    from: `node_modules/@spectrum-css/${spectrumConfig.spectrum}/dist/vars.css`,
                },
                {
                    exportTo: [outputJsonPath],
                }
            );
            console.log(chalk.bold.green(`  o ${component.name}`));
            // await fs.writeFile(outputJsonPath, outputJson, { encoding: 'utf8' });
            return fs.writeFile(outputCssPath, outputCss.css, {
                encoding: 'utf8',
            });
        })
    );
}

function processComponents() {
    return new Promise((resolve, reject) => {
        const promises = [];

        console.log(chalk.bold.green('Processing Spectrum Components'));

        Walker(componentRoot)
            .on('file', function (filePath, stat) {
                const parsedPath = path.parse(filePath);
                if (parsedPath.base === 'spectrum-config.js') {
                    promises.push(processComponent(parsedPath.dir));
                }
            })
            .on('error', function (error, entry, stat) {
                reject(error);
            })
            .on('end', function () {
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
