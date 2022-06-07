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

import fg from 'fast-glob';
import path from 'path';
import chalk from 'chalk';
import fs from 'fs-extra';
import postcss from 'postcss';
import { postCSSPlugins } from './css-processing.cjs';
import postcssSpectrumPlugin from './process-spectrum-postcss-plugin.js';
import reporter from 'postcss-reporter';
import postcssCustomProperties from 'postcss-custom-properties';
import { fileURLToPath, pathToFileURL } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const componentRoot = path.resolve(__dirname, '../packages');

async function processComponent(componentPath) {
    const configPath = path.join(componentPath, 'spectrum-config.js');
    const { default: spectrumConfig } = await import(pathToFileURL(configPath));
    if (Array.isArray(spectrumConfig)) {
        return Promise.all(
            spectrumConfig.map((config) => processConfig(config, componentPath))
        );
    }
    return processConfig(spectrumConfig, componentPath);
}

async function processConfig(spectrumConfig, componentPath) {
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
    // let inputCustomProperties = await fs.readFile(
    //     `node_modules/@spectrum-css/${spectrumConfig.spectrum}/dist/vars.css`,
    //     'utf8'
    // );
    // inputCustomProperties = inputCustomProperties.replace(
    //     /(.|\n)*\{/,
    //     ':root {'
    // );
    // eslint-disable-next-line no-console
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
            // const srcPath = `node_modules/@spectrum-css/${spectrumConfig.spectrum}/dist/vars.css`;
            // if (fs.existsSync(srcPath)) {
            //     await postcss([
            //         postcssCustomProperties({
            //             exportTo: [outputJsonPath],
            //         }),
            //     ]).process(inputCustomProperties, {
            //         from: srcPath,
            //     });
            // }
            // eslint-disable-next-line no-console
            console.log(chalk.bold.green(`  o ${component.name}`));

            let result = outputCss.css.replace(/\\/g, '\\\\');
            // await fs.writeFile(outputJsonPath, outputJson, { encoding: 'utf8' });
            return fs.writeFile(outputCssPath, result, {
                encoding: 'utf8',
            });
        })
    );
}

async function processComponents() {
    const promises = [];
    // eslint-disable-next-line no-console
    console.log(chalk.bold.green('Processing Spectrum Components'));
    for (const configPath of await fg(
        `${componentRoot}/*/src/spectrum-config.js`
    )) {
        promises.push(processComponent(path.join(configPath, '..')));
    }
    await Promise.all(promises);
    // eslint-disable-next-line no-console
    console.log(chalk.bold.green('Done'));
}

async function main() {
    await processComponents();
    process.exit(0);
}

main();
