#!/usr/bin/env node

/**
 * Copyright 2025 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

/* eslint-disable no-console */

// TODO:
// context switching
// add READMEs
// add docs guide
// create custom property style guide

import fs from 'node:fs';
import path from 'node:path';
import prettier from 'prettier';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

import { allTokens, createLogger, generateCSS } from './utils.js';

const argv = yargs(hideBin(process.argv))
    .option('out', {
        alias: 'o',
        type: 'string',
        describe: 'Output path for the generated stylesheet',
    })
    .option('prefix', {
        alias: 'p',
        type: 'string',
        describe: 'Prefix for CSS custom properties',
        default: '',
    })
    .option('debug', {
        alias: 'd',
        type: 'boolean',
        describe: 'Output token processing debug log',
        default: false,
    })
    .option('outputType', {
        choices: ['stylesheet', 'tokens'],
        describe: 'Command output type',
        demandOption: true,
    })
    .help().argv;

const out = argv.out?.trim();
const prefix = argv.prefix?.trim();
const outputType = argv.outputType?.trim();
const debug = argv.debug;
const debugFile = 'debug-tokens.txt';

fs.mkdirSync(path.dirname(out), { recursive: true });

const log = debug && createLogger(`./${debugFile}`);

if (outputType === 'stylesheet') {
    const prettierConfig = await prettier.resolveConfig(process.cwd());

    const css = await generateCSS(prefix, log);
    const formattedCss = await prettier.format(css, {
        ...prettierConfig,
        parser: 'css',
    });

    await fs.promises.writeFile(out, formattedCss, 'utf8');

    console.log(`✔ Stylesheet written to ${out}`);
} else {
    fs.writeFileSync(
        out,
        JSON.stringify(await allTokens(prefix, log), '', 4) + '\n',
        'utf8'
    );

    console.log(`✔ Debug log written to ${debugFile}`);
    console.log(`✔ Tokens written to ${out}`);
}
