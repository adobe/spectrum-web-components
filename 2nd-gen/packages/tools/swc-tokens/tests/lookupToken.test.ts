/**
 * Copyright 2026 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

import { describe, expect, it } from 'vitest';

import { __test__ } from '../utils.js';

const prefix = 'test';

describe('lookupToken', () => {
    const { lookupToken } = __test__;

    it('Core color alias', async () => {
        const result = await lookupToken('black', prefix);

        expect(result).toBe('rgb(0 0 0)');
    });

    it('Composite core color alias', async () => {
        const result = await lookupToken('gray-700', prefix);

        expect(result).toBe(`var(--${prefix}-gray-700)`);
    });

    it('Basic token alias', async () => {
        const result = await lookupToken('overlay-color', prefix);

        expect(result).toBe(`var(--${prefix}-black)`);
    });

    it('Composite scale set', async () => {
        const result = await lookupToken(
            'illustrated-message-small-title-font-size',
            prefix
        );

        expect(result).toBe(
            `var(--${prefix}-illustrated-message-small-title-font-size)`
        );
    });

    it('Aliased typography token', async () => {
        const result = await lookupToken(
            'detail-sans-serif-font-family',
            prefix
        );

        expect(result).toBe(`var(--${prefix}-sans-serif-font-family)`);
    });

    it('Composite color set', async () => {
        const result = await lookupToken(
            'accent-background-color-default',
            prefix
        );

        expect(result).toBe(`var(--${prefix}-accent-background-color-default)`);
    });

    it('Returns custom token value', async () => {
        const result = await lookupToken('animation-duration-300', prefix);

        expect(result).toBe('190ms');
    });

    it('Returns custom token value var() when skipResolution', async () => {
        const result = await lookupToken('serif-font', prefix);

        expect(result).toBe(`var(--${prefix}-serif-font-family-stack)`);
    });
});
