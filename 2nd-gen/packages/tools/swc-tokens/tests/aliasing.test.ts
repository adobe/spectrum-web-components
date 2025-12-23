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

import { describe, expect, it } from 'vitest';

import { __test__ } from '../utils.js';

describe('resolveAlias', () => {
    const { resolveAlias } = __test__;

    it('resolves a simple alias', () => {
        const lookup = {
            a: 'blue',
            b: 'red',
        };

        const result = resolveAlias(lookup, '{a}', 'test', new Set(), false);
        expect(result).toBe('blue');
    });

    it('returns resolved set for shallow set aliases', () => {
        const lookup = {
            color: {
                light: '{a}',
                dark: '{b}',
            },
            a: 'red',
            b: 'blue',
        };

        const result = resolveAlias(
            lookup,
            '{color}',
            'test',
            new Set(),
            false
        );
        expect(result).toEqual({
            light: 'red',
            dark: 'blue',
        });
    });
});

describe('normalizePrimitive – set alias protection', () => {
    const { normalizePrimitive } = __test__;

    it('preserves alias when alias resolves to a set inside a set', () => {
        const lookup = {
            base: {
                light: 'white',
                dark: 'black',
            },
        };

        const value = '{base}';

        const result = normalizePrimitive(value, {
            resolveAliases: true,
            lookup,
            prefix: 'test',
            debug: false,
            inSet: true,
        });

        expect(result).toBe('var(--test-base)');
    });
});
