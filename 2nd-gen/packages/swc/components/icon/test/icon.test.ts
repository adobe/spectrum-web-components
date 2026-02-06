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
import { html } from 'lit';
import { beforeEach, describe, expect, test } from 'vitest';

import type { Icon } from '@adobe/swc/icon';

import '@adobe/swc/icon';

import { fixture } from '../../../utils/test-utils.js';

const iconSvg = html`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
        <path
            d="M14.5 13.09 11.41 10a6 6 0 1 0-1.41 1.41l3.09 3.09a1 1 0 0 0 1.41-1.41zM3 7a4 4 0 1 1 8 0 4 4 0 0 1-8 0z"
        />
    </svg>
`;
const iconSrc =
    "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'><path d='M14.5 13.09 11.41 10a6 6 0 1 0-1.41 1.41l3.09 3.09a1 1 0 0 0 1.41-1.41zM3 7a4 4 0 1 1 8 0 4 4 0 0 1-8 0z'/></svg>";

describe('swc-icon', () => {
    beforeEach(() => {
        document.body.innerHTML = '';
    });

    // ──────────────────────────────────────────────────────────────
    // TEST: Defaults
    // ──────────────────────────────────────────────────────────────

    describe('defaults', () => {
        test('should render with shadow root', async () => {
            const icon = await fixture(html`<swc-icon></swc-icon>`);

            expect(icon.shadowRoot).toBeTruthy();
        });

        test('should have correct default property values', async () => {
            const icon = await fixture<Icon>(html`<swc-icon></swc-icon>`);

            expect(icon.src).toBeUndefined();
            expect(icon.label).toBe('');
        });
    });

    // ──────────────────────────────────────────────────────────────
    // TEST: Properties / Attributes
    // ──────────────────────────────────────────────────────────────

    describe('properties and attributes', () => {
        test('should set src via attribute', async () => {
            const icon = await fixture<Icon>(html`
                <swc-icon src=${iconSrc} label="Search"></swc-icon>
            `);

            expect(icon.src).toBe(iconSrc);
            expect(icon.shadowRoot?.querySelector('img')).toBeTruthy();
        });

        test('should render svg when slotted', async () => {
            const icon = await fixture<Icon>(
                html`<swc-icon label="Search">${iconSvg}</swc-icon>`
            );

            await icon.updateComplete;

            const svg = icon.querySelector('svg');
            expect(svg).toBeTruthy();
            expect(svg?.getAttribute('role')).toBe('img');
            expect(svg?.getAttribute('aria-label')).toBe('Search');
        });

        test('should mark svg as decorative when label is empty', async () => {
            const icon = await fixture<Icon>(
                html`<swc-icon>${iconSvg}</swc-icon>`
            );

            await icon.updateComplete;

            const svg = icon.querySelector('svg');
            expect(svg).toBeTruthy();
            expect(svg?.getAttribute('aria-hidden')).toBe('true');
        });
    });

    // ──────────────────────────────────────────────────────────────
    // TEST: Rendering
    // ──────────────────────────────────────────────────────────────

    describe('rendering', () => {
        test('should prefer src over slotted svg when both are set', async () => {
            const icon = await fixture<Icon>(
                html`<swc-icon src=${iconSrc} label="Search">
                    ${iconSvg}
                </swc-icon>`
            );

            await icon.updateComplete;

            expect(icon.shadowRoot?.querySelector('img')).toBeTruthy();
            expect(icon.shadowRoot?.querySelector('slot')).toBeFalsy();
        });
    });

    // ──────────────────────────────────────────────────────────────
    // TEST: Accessibility
    // ──────────────────────────────────────────────────────────────
    // @TODO: Add accessibility tests with axe-core / playwright

    describe('accessibility', () => {
        test('should apply alt text for image sources', async () => {
            const icon = await fixture<Icon>(html`<swc-icon></swc-icon>`);

            icon.src = iconSrc;
            icon.label = 'Search';
            await icon.updateComplete;

            const img = icon.shadowRoot?.querySelector('img');
            expect(img?.getAttribute('alt')).toBe('Search');
        });
    });
});
