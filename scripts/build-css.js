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

import fg from 'fast-glob';
import 'colors';

import { processCSS } from './css-tools.js';

async function buildCSS() {
    const promises = [];
    for (const cssPath of await fg([
        './packages/*/src/**/*.css',
        './tools/*/src/*.css',
        './tools/*/src/**/*.css',
    ])) {
        promises.push(
            processCSS(cssPath)
                .then(() => console.log(`Processed ${cssPath.yellow}`))
                .catch((error) =>
                    console.error(`Error processing ${cssPath}`, error)
                )
        );
    }

    return Promise.all(promises);
}

await buildCSS();
