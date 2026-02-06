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

describe('extractTokenValues', () => {
    const { extractTokenValues } = __test__;

    it('ignores deprecated tokens and disallowed sets', () => {
        const json = {
            layout: {
                sets: {
                    desktop: { value: '8px' },
                    mobile: { value: '4px', deprecated: true },
                    tv: { value: '999px' },
                },
            },
        };
        const result = extractTokenValues(json, true, 'test');
        expect(result).toEqual({
            layout: {
                desktop: '8px',
            },
        });
    });

    it('respects skipResolution flag', () => {
        const json = {
            raw: {
                skipResolution: true,
                value: '{should-not-resolve}',
            },
        };
        const result = extractTokenValues(json, true, 'test');
        expect(result).toEqual({
            raw: 'var(--test-should-not-resolve)',
        });
    });

    it('extracts primitives and resolves aliases', () => {
        const json = {
            a: { value: 'red' },
            b: { value: '{a}' },
        };

        const result = extractTokenValues(json, true, 'test');
        expect(result).toEqual({
            a: 'red',
            b: 'red',
        });
    });

    it('resolves embedded aliases', () => {
        const json = {
            alpha: { value: '0.5' },
            bg: { value: 'rgba(0, 0, 0, {alpha})' },
        };
        const result = extractTokenValues(json, true, 'test');
        expect(result).toEqual({
            alpha: '0.5',
            bg: 'rgb(0 0 0 / 0.5)',
        });
    });

    it('handles multi-set tokens', () => {
        const json = {
            color: {
                sets: {
                    light: { value: 'white' },
                    dark: { value: 'black' },
                },
            },
        };

        const result = extractTokenValues(json, true, 'test');
        expect(result).toEqual({
            color: {
                light: 'white',
                dark: 'black',
            },
        });
    });

    it('follows primitive alias chain recursively', () => {
        const json = {
            a: { value: '{b}' },
            b: { value: '{c}' },
            c: { value: 'rgb(255, 0, 0)' },
        };
        const result = extractTokenValues(json, true, 'test');
        expect(result).toEqual({
            a: 'var(--test-b)',
            b: 'rgb(255 0 0)',
            c: 'rgb(255 0 0)',
        });
    });

    it('prevents aliases inside sets expanding into objects', () => {
        const json = {
            base: {
                sets: {
                    light: { value: '#eee' },
                    dark: { value: '#111' },
                },
            },
            surface: {
                sets: {
                    light: { value: '{base}' },
                    dark: { value: '{base}' },
                },
            },
        };
        const result = extractTokenValues(json, true, 'test');
        expect(result).toEqual({
            base: {
                light: '#eee',
                dark: '#111',
            },
            surface: {
                light: 'var(--test-base)',
                dark: 'var(--test-base)',
            },
        });
    });

    it('primitive alias resolution works inside sets', () => {
        const json = {
            gray: { value: '#ccc' },
            background: {
                sets: {
                    light: { value: '{gray}' },
                    dark: { value: '{gray}' },
                },
            },
        };
        const result = extractTokenValues(json, true, 'test');
        expect(result).toEqual({
            gray: '#ccc',
            background: {
                light: '#ccc',
                dark: '#ccc',
            },
        });
    });
});

describe('buildRawLookup', () => {
    const { buildRawLookup } = __test__;

    it('extracts value tokens directly', () => {
        const json = {
            foo: { value: 'red' },
        };
        expect(buildRawLookup(json)).toEqual({
            foo: 'red',
        });
    });

    it('filters allowed sets only', () => {
        const json = {
            bar: {
                sets: {
                    light: { value: 'white' },
                    dark: { value: 'black' },
                    tablet: { value: 'ignored' },
                },
            },
        };
        expect(buildRawLookup(json)).toEqual({
            bar: { light: 'white', dark: 'black' },
        });
    });
});
