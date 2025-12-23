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

import postcss from 'postcss';
import { describe, expect, it } from 'vitest';

import plugin from './index.js';

const prefix = 'swc';

async function run(input, output) {
    const result = await postcss([plugin({ prefix })]).process(input, {
        from: undefined,
    });

    expect(result.css).toBe(output);
    expect(result.warnings().length).toBe(0);
}

describe('postcss-token plugin', () => {
    it('resolves a core color alias', async () => {
        await run(`a { color: token('black'); }`, `a { color: rgb(0 0 0); }`);
    });

    it('resolves a composite core color alias to a var()', async () => {
        await run(
            `a { color: token('gray-700'); }`,
            `a { color: var(--${prefix}-gray-700); }`
        );
    });

    it('resolves a basic token alias', async () => {
        await run(
            `a { color: token('overlay-color'); }`,
            `a { color: var(--${prefix}-black); }`
        );
    });

    it('resolves a composite scale set token', async () => {
        await run(
            `a { font-size: token('illustrated-message-small-title-font-size'); }`,
            `a { font-size: var(--${prefix}-illustrated-message-small-title-font-size); }`
        );
    });

    it('resolves an aliased typography token', async () => {
        await run(
            `a { font-family: token('detail-sans-serif-font-family'); }`,
            `a { font-family: var(--${prefix}-sans-serif-font-family); }`
        );
    });

    it('resolves a composite color set token', async () => {
        await run(
            `a { background-color: token('accent-background-color-default'); }`,
            `a { background-color: var(--${prefix}-accent-background-color-default); }`
        );
    });

    it('replaces token() inside a partial value', async () => {
        await run(
            `a { min-block-size: var(--${prefix}-badge-height, token('component-height-100')); }`,
            `a { min-block-size: var(--${prefix}-badge-height, var(--${prefix}-component-height-100)); }`
        );
    });

    it('does not duplicate light/dark keys when resolving a color set alias', async () => {
        await run(
            `a { background-color: token('background-layer-2-color'); }`,
            `a { background-color: var(--${prefix}-background-layer-2-color); }`
        );
    });

    it('resolves token() inside calc()', async () => {
        await run(
            `a { padding: calc(token('spacing-100') * 2); }`,
            `a { padding: calc(8px * 2); }`
        );
    });

    it('resolves multiple token() calls in a single value', async () => {
        await run(
            `a {
                margin: calc(
                    token('spacing-100')
                    + token('spacing-200')
                );
            }`,
            `a {
                margin: calc(
                    8px
                    + 12px
                );
            }`.trim()
        );
    });

    it('does not wrap already-resolved var() values', async () => {
        await run(
            `a { color: var(--${prefix}-gray-700); }`,
            `a { color: var(--${prefix}-gray-700); }`
        );
    });

    it('throws when token does not exist', async () => {
        await expect(
            postcss([plugin({ prefix })]).process(
                `a { color: token('this-token-does-not-exist'); }`,
                { from: undefined }
            )
        ).rejects.toThrow(`token() not found: 'this-token-does-not-exist'`);
    });
});
