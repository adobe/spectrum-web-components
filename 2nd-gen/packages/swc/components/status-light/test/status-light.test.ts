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

import { html } from 'lit';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';

import type { StatusLight } from '@adobe/swc/status-light';

import '@adobe/swc/status-light';

import { fixture } from '../../../utils/test-utils.js';

describe('swc-status-light', () => {
    beforeEach(() => {
        document.body.innerHTML = '';
    });

    // ──────────────────────────────────────────────────────────────
    // TEST: Defaults
    // ──────────────────────────────────────────────────────────────

    describe('defaults', () => {
        test('should render with shadow root', async () => {
            const statusLight = await fixture(html`
                <swc-status-light>Test Status</swc-status-light>
            `);

            expect(statusLight.shadowRoot).toBeTruthy();
            expect(
                statusLight.shadowRoot?.querySelector('.spectrum-StatusLight')
            ).toBeTruthy();
        });

        test('should have correct default property values', async () => {
            const statusLight = await fixture<StatusLight>(
                html`<swc-status-light></swc-status-light>`
            );

            expect(statusLight.variant).toBe('info');
            expect(statusLight.size).toBe('m');
        });
    });

    // ──────────────────────────────────────────────────────────────
    // TEST: Properties / Attributes
    // ──────────────────────────────────────────────────────────────

    describe('properties and attributes', () => {
        test('should reflect variant property to attribute', async () => {
            const statusLight = await fixture<StatusLight>(
                html`<swc-status-light></swc-status-light>`
            );

            statusLight.variant = 'positive';
            await statusLight.updateComplete;

            expect(statusLight.getAttribute('variant')).toBe('positive');
            expect(
                statusLight.shadowRoot?.querySelector(
                    '.spectrum-StatusLight--positive'
                )
            ).toBeTruthy();
        });

        test('should set variant via attribute', async () => {
            const statusLight = await fixture<StatusLight>(html`
                <swc-status-light variant="negative"></swc-status-light>
            `);

            expect(statusLight.variant).toBe('negative');
            expect(
                statusLight.shadowRoot?.querySelector(
                    '.spectrum-StatusLight--negative'
                )
            ).toBeTruthy();
        });

        test('should handle semantic variants', async () => {
            const variants = [
                'neutral',
                'info',
                'positive',
                'negative',
                'notice',
            ] as const;

            for (const variant of variants) {
                const statusLight = await fixture<StatusLight>(html`
                    <swc-status-light variant=${variant}></swc-status-light>
                `);

                expect(statusLight.variant).toBe(variant);
                expect(
                    statusLight.shadowRoot?.querySelector(
                        `.spectrum-StatusLight--${variant}`
                    )
                ).toBeTruthy();
            }
        });

        test('should handle color variants', async () => {
            const colorVariants = [
                'fuchsia',
                'indigo',
                'magenta',
                'purple',
                'seafoam',
                'yellow',
                'chartreuse',
                'celery',
                'cyan',
                'pink',
                'turquoise',
                'brown',
                'cinnamon',
                'silver',
            ] as const;

            for (const variant of colorVariants) {
                const statusLight = await fixture<StatusLight>(html`
                    <swc-status-light variant=${variant}></swc-status-light>
                `);

                expect(statusLight.variant).toBe(variant);
                expect(
                    statusLight.shadowRoot?.querySelector(
                        `.spectrum-StatusLight--${variant}`
                    )
                ).toBeTruthy();
            }
        });

        test('should handle size property', async () => {
            const statusLight = await fixture<StatusLight>(
                html`<swc-status-light></swc-status-light>`
            );

            expect(statusLight.size).toBe('m');

            statusLight.size = 's';
            await statusLight.updateComplete;

            expect(statusLight.getAttribute('size')).toBe('s');
            expect(
                statusLight.shadowRoot?.querySelector(
                    '.spectrum-StatusLight--sizeS'
                )
            ).toBeTruthy();
        });
    });

    // ──────────────────────────────────────────────────────────────
    // TEST: Slots
    // ──────────────────────────────────────────────────────────────

    describe('slots', () => {
        test('should render default slot content', async () => {
            const statusLight = await fixture(html`
                <swc-status-light>Status Label</swc-status-light>
            `);

            expect(statusLight.textContent).toBe('Status Label');
        });
    });

    // ──────────────────────────────────────────────────────────────
    // TEST: Events
    // ──────────────────────────────────────────────────────────────

    describe.skip('events', () => {
        // StatusLight component does not dispatch custom events
    });

    // ──────────────────────────────────────────────────────────────
    // TEST: Accessibility
    // ──────────────────────────────────────────────────────────────
    // @TODO: Add accessibility tests with axe-core / playwright
    describe('accessibility', () => {
        test('should be accessible to screen readers', async () => {
            const statusLight = await fixture(html`
                <swc-status-light variant="positive">Approved</swc-status-light>
            `);

            const statusLightElement = statusLight.shadowRoot?.querySelector(
                '.spectrum-StatusLight'
            );
            expect(statusLightElement).toBeTruthy();
            expect(statusLight.textContent).toBe('Approved');
        });
    });

    // ──────────────────────────────────────────────────────────────
    // TEST: Dev Mode Warnings
    // ──────────────────────────────────────────────────────────────

    describe('dev mode warnings', () => {
        let originalWarn: typeof window.__swc.warn;
        let originalDebug: boolean;

        beforeEach(() => {
            // Create __swc if it doesn't exist
            window.__swc = window.__swc || { warn: () => {} };
            // Store original warn function and debug state
            originalWarn = window.__swc.warn;
            originalDebug = window.__swc.DEBUG ?? false;
            // Reset issued warnings to avoid dedupe interference
            window.__swc.issuedWarnings = new Set();
            // Enable debug guard
            window.__swc.DEBUG = true;
        });

        afterEach(() => {
            // Restore original warn function and debug state
            window.__swc.warn = originalWarn;
            window.__swc.DEBUG = originalDebug;
        });

        test('should warn when unsupported variant is used', async () => {
            const warnSpy = vi.fn();
            window.__swc.warn = warnSpy as unknown as typeof window.__swc.warn;

            const statusLight = await fixture<StatusLight>(html`
                <swc-status-light variant="accent"></swc-status-light>
            `);

            await statusLight.updateComplete;

            expect(warnSpy).toHaveBeenCalled();
            expect(warnSpy.mock.calls[0][0]).toBe(statusLight);
            expect(warnSpy.mock.calls[0][1]).toBe(
                `<${statusLight.localName}> element expects the "variant" attribute to be one of the following:`
            );
        });

        test('should warn when disabled attribute is used', async () => {
            const warnSpy = vi.fn();
            window.__swc.warn = warnSpy as unknown as typeof window.__swc.warn;

            const statusLight = await fixture<StatusLight>(html`
                <swc-status-light
                    variant="positive"
                    disabled
                ></swc-status-light>
            `);

            await statusLight.updateComplete;

            expect(warnSpy).toHaveBeenCalled();
            expect(warnSpy.mock.calls[0][0]).toBe(statusLight);
            expect(warnSpy.mock.calls[0][1]).toContain(
                'does not support the disabled state'
            );
        });
    });
});
