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

import { equal } from 'node:assert';
import { test } from 'node:test';
import postcss from 'postcss';

import plugin from './index.js';

const prefix = 'swc';

async function run(input, output) {
    let result = await postcss([plugin({ prefix: prefix })]).process(input, {
        from: undefined,
    });
    equal(result.css, output);
    equal(result.warnings().length, 0);
}

test('outputs token() value', async () => {
    // Core color alias
    await run(`a { color: token('black'); }`, `a { color: rgb(0 0 0); }`);

    // Composite core color alias
    await run(
        `a { color: token('gray-700'); }`,
        `a { color: var(--swc-gray-700); }`
    );

    // Basic token alias
    await run(
        `a { color: token('overlay-color'); }`,
        `a { color: var(--${prefix}-black); }`
    );

    // Composite scale set
    await run(
        `a { font-size: token('illustrated-message-small-title-font-size'); }`,
        `a { font-size: var(--${prefix}-illustrated-message-small-title-font-size); }`
    );

    // Composite color set
    await run(
        `a { background-color: token('accent-background-color-default'); }`,
        `a { background-color: var(--${prefix}-accent-background-color-default); }`
    );

    // Partial value token() replacement
    await run(
        `a { min-block-size: var(--${prefix}-badge-height, token('component-height-100')); }`,
        `a { min-block-size: var(--${prefix}-badge-height, var(--${prefix}-component-height-100)); }`
    );
});
