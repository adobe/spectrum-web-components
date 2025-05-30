#!/usr/bin/env node

/*!
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

import path from 'path';
import fs from 'fs';
import fsp from 'fs/promises';
import { createRequire } from 'node:module';
import { promisify } from 'util';
import { deflate } from 'zlib';

import prettier from 'prettier';
import postcss from 'postcss';
import postcssrc from 'postcss-load-config';
import 'colors';

import { dirs, relativePrint, writeAndReport, log } from './utilities.js';

const gzip = promisify(deflate);

/**
 * Processes a CSS file using lightningcss, minifies it, and outputs a TypeScript module.
 * The output module includes license headers and wraps the CSS in a template literal.
 *
 * @param {string} input - Path to the CSS file to process
 * @param {string} output - Path to the output file
 * @param {object} options - Options for the process
 * @param {boolean} options.minify - Whether to minify the CSS
 * @param {string} options.cwd - The current working directory
 * @returns {Promise<string>} A promise that resolves when processing is complete
 *
 */
export const processCSS = async (
    input,
    output,
    { minify = false, cwd = process.cwd() } = {}
) => {
    if (!input || !fs.existsSync(input)) {
        return Promise.reject(
            new Error(
                '[processCSS] An input file path must be provided to process'
            )
        );
    }

    const content = await fsp.readFile(input, { encoding: 'utf8' });

    if (!content) {
        return Promise.reject(
            new Error(
                `[processCSS] No content found for ${relativePrint(input, { cwd })}`
            )
        );
    }

    // If the output file is a minified file, force the minify flag to true
    if (output && path.basename(output, '.css').endsWith('.min')) minify = true;

    const { plugins, options } = await postcssrc(
        {
            cwd,
            env: process.env.NODE_ENV ?? 'development',
            file: output ?? input,
            from: input,
            to: output ?? input,
            verbose: false,
            minify,
        },
        join(dirs.root, 'postcss.config.js')
    );

    const result = await postcss(plugins).process(content, {
        from: input,
        to: output ?? input,
        ...options,
    });

    if (result.error) return Promise.reject(result.error);

    const logs = [];
    if (result.warnings().length > 0) {
        /** @todo, do we want to support a verbose mode that prints out the warnings during the build? */
        result.warnings().forEach((warning) => {
            logs.push(report.warning(warning.text));
        });
    }

    if (!result.css) return Promise.resolve(logs);

    const formatted = !minify
        ? await prettier.format(result.css, {
              parser: 'css',
              filepath: input,
              printWidth: 500,
              tabWidth: 2,
              useTabs: true,
          })
        : result.css;

    // If no output is provided, return the formatted content
    /** @todo how can we return the logs from this function if we're returning the content instead here? */
    if (!output) return Promise.resolve(formatted);

    /* Ensure the directory exists */
    const outputDir = path.dirname(output);
    if (!fs.existsSync(outputDir)) {
        await fsp.mkdir(outputDir, { recursive: true }).catch((err) => {
            if (!err) return;

            logs.push(
                report.failure(
                    `problem making the ${relativePrint(outputDir, { cwd })} directory`
                )
            );
            return Promise.reject([...logs, err]);
        });
    }

    const promises = [writeAndReport(formatted, output, { cwd })];

    if (minify) {
        promises.push(
            gzip(formatted).then((zipped) =>
                writeAndReport(zipped, `${output}.gz`, { cwd })
            )
        );
    }

    if (result.map) {
        promises.push(
            writeAndReport(result.map.toString().trimStart(), `${output}.map`, {
                cwd,
            })
        );
    }

    return Promise.all(promises).then((r) => [...r, ...logs]);
};
