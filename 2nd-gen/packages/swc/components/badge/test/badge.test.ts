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

import type { Badge } from '@adobe/spectrum-wc/badge';

import '@adobe/spectrum-wc/badge';

import { fixture } from '../../../utils/test-utils.js';

describe('swc-badge', () => {
    beforeEach(() => {
        document.body.innerHTML = '';
    });

    // ──────────────────────────────────────────────────────────────
    // TEST: Defaults
    // ──────────────────────────────────────────────────────────────

    describe('defaults', () => {
        test('should render with shadow root', async () => {
            const badge = await fixture(html`
                <swc-badge>Test Badge</swc-badge>
            `);

            expect(badge.shadowRoot).toBeTruthy();
            expect(badge.shadowRoot?.querySelector('.swc-Badge')).toBeTruthy();
        });

        test('should have correct default property values', async () => {
            const badge = await fixture<Badge>(html`<swc-badge></swc-badge>`);

            expect(badge.variant).toBe('informative');
            expect(badge.subtle).toBe(false);
            expect(badge.outline).toBe(false);
            expect(badge.fixed).toBeUndefined();
            expect(badge.size).toBe('m');
        });
    });

    // ──────────────────────────────────────────────────────────────
    // TEST: Properties / Attributes
    // ──────────────────────────────────────────────────────────────

    describe('properties and attributes', () => {
        test('should reflect variant property to attribute', async () => {
            const badge = await fixture<Badge>(html`<swc-badge></swc-badge>`);

            badge.variant = 'positive';
            await badge.updateComplete;

            expect(badge.getAttribute('variant')).toBe('positive');
            expect(
                badge.shadowRoot?.querySelector('.swc-Badge--positive')
            ).toBeTruthy();
        });

        test('should set variant via attribute', async () => {
            const badge = await fixture<Badge>(html`
                <swc-badge variant="negative"></swc-badge>
            `);

            expect(badge.variant).toBe('negative');
            expect(
                badge.shadowRoot?.querySelector('.swc-Badge--negative')
            ).toBeTruthy();
        });

        test('should reflect subtle property to attribute', async () => {
            const badge = await fixture<Badge>(html`<swc-badge></swc-badge>`);

            badge.subtle = true;
            await badge.updateComplete;

            expect(badge.hasAttribute('subtle')).toBe(true);
            expect(
                badge.shadowRoot?.querySelector('.swc-Badge--subtle')
            ).toBeTruthy();
        });

        test('should set subtle via attribute', async () => {
            const badge = await fixture<Badge>(html`
                <swc-badge subtle></swc-badge>
            `);

            expect(badge.subtle).toBe(true);
        });

        test('should reflect outline property to attribute', async () => {
            const badge = await fixture<Badge>(html`<swc-badge></swc-badge>`);

            badge.outline = true;
            await badge.updateComplete;

            expect(badge.hasAttribute('outline')).toBe(true);
            expect(
                badge.shadowRoot?.querySelector('.swc-Badge--outline')
            ).toBeTruthy();
        });

        test('should set outline via attribute', async () => {
            const badge = await fixture<Badge>(html`
                <swc-badge outline></swc-badge>
            `);

            expect(badge.outline).toBe(true);
        });

        test('should handle fixed property', async () => {
            const badge = await fixture<Badge>(html`<swc-badge></swc-badge>`);

            badge.fixed = 'inline-start';
            await badge.updateComplete;

            expect(badge.getAttribute('fixed')).toBe('inline-start');
            expect(
                badge.shadowRoot?.querySelector(
                    '.swc-Badge--fixed-inline-start'
                )
            ).toBeTruthy();
        });

        test('should handle size property', async () => {
            const badge = await fixture<Badge>(html`<swc-badge></swc-badge>`);

            expect(badge.size).toBe('m');

            badge.size = 'l';
            await badge.updateComplete;

            expect(badge.getAttribute('size')).toBe('l');
            expect(
                badge.shadowRoot?.querySelector('.swc-Badge--sizeL')
            ).toBeTruthy();
        });
    });

    // ──────────────────────────────────────────────────────────────
    // TEST: Slots
    // ──────────────────────────────────────────────────────────────

    describe('slots', () => {
        test('should render default slot content', async () => {
            const badge = await fixture(html`
                <swc-badge>Badge Label</swc-badge>
            `);

            expect(badge.textContent).toBe('Badge Label');
        });

        test('should accept icon slot', async () => {
            const badge = await fixture(html`
                <swc-badge>
                    <div slot="icon">✓</div>
                    With Icon
                </swc-badge>
            `);

            // Verify slotted icon is present in light DOM
            const slottedIcon = badge.querySelector('[slot="icon"]');
            expect(slottedIcon).toBeTruthy();
            expect(slottedIcon?.textContent).toBe('✓');
        });
    });

    // ──────────────────────────────────────────────────────────────
    // TEST: Events
    // ──────────────────────────────────────────────────────────────

    describe.skip('events', () => {
        // Badge component does not dispatch custom events
    });

    // ──────────────────────────────────────────────────────────────
    // TEST: Accessibility
    // ──────────────────────────────────────────────────────────────
    // @TODO: Add accessibility tests with axe-core / playwright
    describe('accessibility', () => {
        test('should be accessible to screen readers', async () => {
            const badge = await fixture(html`<swc-badge>New</swc-badge>`);

            const badgeElement = badge.shadowRoot?.querySelector('.swc-Badge');
            expect(badgeElement).toBeTruthy();
            expect(badge.textContent).toBe('New');
        });
    });
});
