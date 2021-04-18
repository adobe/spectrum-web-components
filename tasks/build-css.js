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
import fs from 'fs';
import globby from 'globby';
import postcss from 'postcss';
import cssProcessing from '../scripts/css-processing.cjs';
import { fileURLToPath } from 'url';

const { postCSSPlugins, wrapCSSResult } = cssProcessing;
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const configPath = path.resolve(path.join(__dirname, '..', 'config'));
const header = fs.readFileSync(path.join(configPath, 'license.js'), 'utf8');

export const processCSS = async (cssPath) => {
    let wrappedCSS = header;
    const originCSS = fs.readFileSync(cssPath, 'utf8');
    const processedCSS = await postcss(postCSSPlugins(cssPath))
        .process(originCSS, {
            from: cssPath,
        })
        .then((result) => {
            return result;
        });
    wrappedCSS += wrapCSSResult(processedCSS);
    fs.writeFileSync(cssPath + '.ts', wrappedCSS, 'utf-8');
};

const buildCSS = async () => {
    for await (const cssPath of globby.stream(`./packages/*/src/*.css`)) {
        processCSS(cssPath);
    }
};

buildCSS();
