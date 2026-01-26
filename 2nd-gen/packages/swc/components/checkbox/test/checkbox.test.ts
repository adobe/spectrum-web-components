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
import { beforeEach, describe, expect, test, vi } from 'vitest';

import type { Checkbox } from '@adobe/swc/checkbox';

import '@adobe/swc/checkbox';

import { fixture } from '../../../utils/test-utils.js';

describe('swc-checkbox', () => {
    beforeEach(() => {
        document.body.innerHTML = '';
    });

    // ──────────────────────────────────────────────────────────────
    // TEST: Defaults
    // ──────────────────────────────────────────────────────────────

    describe('defaults', () => {
        test('should render with shadow root', async () => {
            const checkbox = await fixture(html`
                <swc-checkbox>Label</swc-checkbox>
            `);

            expect(checkbox.shadowRoot).toBeTruthy();
            expect(
                checkbox.shadowRoot?.querySelector('.swc-Checkbox')
            ).toBeTruthy();
        });

        test('should have correct default property values', async () => {
            const checkbox = await fixture<Checkbox>(
                html`<swc-checkbox></swc-checkbox>`
            );

            expect(checkbox.checked).toBe(false);
            expect(checkbox.disabled).toBe(false);
            expect(checkbox.emphasized).toBe(false);
            expect(checkbox.indeterminate).toBe(false);
            expect(checkbox.invalid).toBe(false);
            expect(checkbox.readonly).toBe(false);
            expect(checkbox.name).toBeUndefined();
            expect(checkbox.size).toBe('m');
            expect(checkbox.tabIndex).toBe(0);
        });

        test('should render native input element', async () => {
            const checkbox = await fixture(html`<swc-checkbox></swc-checkbox>`);

            const input = checkbox.shadowRoot?.querySelector(
                'input[type="checkbox"]'
            );
            expect(input).toBeTruthy();
        });
    });

    // ──────────────────────────────────────────────────────────────
    // TEST: Properties / Attributes
    // ──────────────────────────────────────────────────────────────

    describe('properties and attributes', () => {
        test('should reflect checked property to attribute', async () => {
            const checkbox = await fixture<Checkbox>(
                html`<swc-checkbox></swc-checkbox>`
            );

            checkbox.checked = true;
            await checkbox.updateComplete;

            expect(checkbox.getAttribute('checked')).toBe('');
            const input = checkbox.shadowRoot?.querySelector(
                'input'
            ) as HTMLInputElement;
            expect(input.checked).toBe(true);
        });

        test('should set checked via attribute', async () => {
            const checkbox = await fixture<Checkbox>(html`
                <swc-checkbox checked></swc-checkbox>
            `);

            expect(checkbox.checked).toBe(true);
            const input = checkbox.shadowRoot?.querySelector(
                'input'
            ) as HTMLInputElement;
            expect(input.checked).toBe(true);
        });

        test('should reflect disabled property to attribute', async () => {
            const checkbox = await fixture<Checkbox>(
                html`<swc-checkbox></swc-checkbox>`
            );

            checkbox.disabled = true;
            await checkbox.updateComplete;

            expect(checkbox.hasAttribute('disabled')).toBe(true);
            const input = checkbox.shadowRoot?.querySelector(
                'input'
            ) as HTMLInputElement;
            expect(input.disabled).toBe(true);
        });

        test('should set disabled via attribute', async () => {
            const checkbox = await fixture<Checkbox>(html`
                <swc-checkbox disabled></swc-checkbox>
            `);

            expect(checkbox.disabled).toBe(true);
        });

        test('should reflect emphasized property to attribute', async () => {
            const checkbox = await fixture<Checkbox>(
                html`<swc-checkbox></swc-checkbox>`
            );

            checkbox.emphasized = true;
            await checkbox.updateComplete;

            expect(checkbox.hasAttribute('emphasized')).toBe(true);
            expect(
                checkbox.shadowRoot?.querySelector('.swc-Checkbox--emphasized')
            ).toBeTruthy();
        });

        test('should reflect indeterminate property to attribute and native input', async () => {
            const checkbox = await fixture<Checkbox>(
                html`<swc-checkbox></swc-checkbox>`
            );

            checkbox.indeterminate = true;
            await checkbox.updateComplete;

            expect(checkbox.hasAttribute('indeterminate')).toBe(true);
            const input = checkbox.shadowRoot?.querySelector(
                'input'
            ) as HTMLInputElement;
            expect(input.indeterminate).toBe(true);
        });

        test('should reflect invalid property to attribute and aria-invalid', async () => {
            const checkbox = await fixture<Checkbox>(
                html`<swc-checkbox></swc-checkbox>`
            );

            checkbox.invalid = true;
            await checkbox.updateComplete;

            expect(checkbox.hasAttribute('invalid')).toBe(true);
            const input = checkbox.shadowRoot?.querySelector(
                'input'
            ) as HTMLInputElement;
            expect(input.getAttribute('aria-invalid')).toBe('true');
        });

        test('should reflect readonly property to attribute', async () => {
            const checkbox = await fixture<Checkbox>(
                html`<swc-checkbox></swc-checkbox>`
            );

            checkbox.readonly = true;
            await checkbox.updateComplete;

            expect(checkbox.hasAttribute('readonly')).toBe(true);
            expect(
                checkbox.shadowRoot?.querySelector('.swc-Checkbox--readonly')
            ).toBeTruthy();
        });

        test('should handle name property', async () => {
            const checkbox = await fixture<Checkbox>(html`
                <swc-checkbox name="test-name"></swc-checkbox>
            `);

            expect(checkbox.name).toBe('test-name');
            const input = checkbox.shadowRoot?.querySelector(
                'input'
            ) as HTMLInputElement;
            expect(input.name).toBe('test-name');
        });

        test('should handle size property', async () => {
            const checkbox = await fixture<Checkbox>(
                html`<swc-checkbox></swc-checkbox>`
            );

            expect(checkbox.size).toBe('m');

            checkbox.size = 'l';
            await checkbox.updateComplete;

            expect(checkbox.getAttribute('size')).toBe('l');
        });
    });

    // ──────────────────────────────────────────────────────────────
    // TEST: Events
    // ──────────────────────────────────────────────────────────────

    describe('events', () => {
        test('should dispatch change event when clicked', async () => {
            const checkbox = await fixture<Checkbox>(html`
                <swc-checkbox>Label</swc-checkbox>
            `);

            const changeSpy = vi.fn();
            checkbox.addEventListener('change', changeSpy);

            const input = checkbox.shadowRoot?.querySelector(
                'input'
            ) as HTMLInputElement;
            input.click();
            await checkbox.updateComplete;

            expect(changeSpy).toHaveBeenCalledOnce();
            expect(checkbox.checked).toBe(true);
        });

        test('should toggle checked state on change', async () => {
            const checkbox = await fixture<Checkbox>(html`
                <swc-checkbox>Label</swc-checkbox>
            `);

            expect(checkbox.checked).toBe(false);

            const input = checkbox.shadowRoot?.querySelector(
                'input'
            ) as HTMLInputElement;
            input.click();
            await checkbox.updateComplete;

            expect(checkbox.checked).toBe(true);

            input.click();
            await checkbox.updateComplete;

            expect(checkbox.checked).toBe(false);
        });

        test('should clear indeterminate state when clicked', async () => {
            const checkbox = await fixture<Checkbox>(html`
                <swc-checkbox indeterminate>Label</swc-checkbox>
            `);

            expect(checkbox.indeterminate).toBe(true);

            const input = checkbox.shadowRoot?.querySelector(
                'input'
            ) as HTMLInputElement;
            input.click();
            await checkbox.updateComplete;

            expect(checkbox.indeterminate).toBe(false);
            expect(checkbox.checked).toBe(true);
        });

        test('should not dispatch change event when disabled', async () => {
            const checkbox = await fixture<Checkbox>(html`
                <swc-checkbox disabled>Label</swc-checkbox>
            `);

            const changeSpy = vi.fn();
            checkbox.addEventListener('change', changeSpy);

            checkbox.click();
            await checkbox.updateComplete;

            expect(changeSpy).not.toHaveBeenCalled();
        });

        test('should not change state when readonly', async () => {
            const checkbox = await fixture<Checkbox>(html`
                <swc-checkbox readonly>Label</swc-checkbox>
            `);

            expect(checkbox.checked).toBe(false);

            const input = checkbox.shadowRoot?.querySelector(
                'input'
            ) as HTMLInputElement;
            input.click();
            await checkbox.updateComplete;

            expect(checkbox.checked).toBe(false);
        });

        test('should allow event cancellation', async () => {
            const checkbox = await fixture<Checkbox>(html`
                <swc-checkbox>Label</swc-checkbox>
            `);

            checkbox.addEventListener('change', (event) => {
                event.preventDefault();
            });

            const input = checkbox.shadowRoot?.querySelector(
                'input'
            ) as HTMLInputElement;
            input.click();
            await checkbox.updateComplete;

            // When event is cancelled, the checked state should revert
            expect(checkbox.checked).toBe(false);
        });
    });

    // ──────────────────────────────────────────────────────────────
    // TEST: Slots
    // ──────────────────────────────────────────────────────────────

    describe('slots', () => {
        test('should render default slot content as label', async () => {
            const checkbox = await fixture(html`
                <swc-checkbox>Checkbox Label</swc-checkbox>
            `);

            expect(checkbox.textContent).toBe('Checkbox Label');
        });

        test('should render label element', async () => {
            const checkbox = await fixture(html`
                <swc-checkbox>Label</swc-checkbox>
            `);

            const label = checkbox.shadowRoot?.querySelector(
                '.swc-Checkbox-label'
            );
            expect(label).toBeTruthy();
            expect(label?.querySelector('slot')).toBeTruthy();
        });
    });

    // ──────────────────────────────────────────────────────────────
    // TEST: Rendering
    // ──────────────────────────────────────────────────────────────

    describe('rendering', () => {
        test('should render checkmark when checked', async () => {
            const checkbox = await fixture<Checkbox>(html`
                <swc-checkbox checked size="m">Label</swc-checkbox>
            `);

            const checkmark = checkbox.shadowRoot?.querySelector(
                '.swc-Checkbox-checkmark'
            );
            expect(checkmark).toBeTruthy();
        });

        test('should render dash when indeterminate', async () => {
            const checkbox = await fixture<Checkbox>(html`
                <swc-checkbox indeterminate size="m">Label</swc-checkbox>
            `);

            const dash = checkbox.shadowRoot?.querySelector(
                '.swc-Checkbox-partialCheckmark'
            );
            expect(dash).toBeTruthy();
        });

        test('should render appropriate icon size based on size property', async () => {
            const checkboxSmall = await fixture<Checkbox>(html`
                <swc-checkbox checked size="s">Label</swc-checkbox>
            `);
            const checkboxLarge = await fixture<Checkbox>(html`
                <swc-checkbox checked size="l">Label</swc-checkbox>
            `);

            expect(
                checkboxSmall.shadowRoot?.querySelector('sp-icon-checkmark75')
            ).toBeTruthy();
            expect(
                checkboxLarge.shadowRoot?.querySelector('sp-icon-checkmark200')
            ).toBeTruthy();
        });
    });

    // ──────────────────────────────────────────────────────────────
    // TEST: Focus Management
    // ──────────────────────────────────────────────────────────────

    describe('focus management', () => {
        test('should manage tabindex when disabled', async () => {
            const checkbox = await fixture<Checkbox>(html`
                <swc-checkbox>Label</swc-checkbox>
            `);

            expect(checkbox.tabIndex).toBe(0);

            checkbox.disabled = true;
            await checkbox.updateComplete;

            expect(checkbox.tabIndex).toBe(-1);

            checkbox.disabled = false;
            await checkbox.updateComplete;

            expect(checkbox.tabIndex).toBe(0);
        });

        test('should delegate focus to input', async () => {
            const checkbox = await fixture<Checkbox>(html`
                <swc-checkbox>Label</swc-checkbox>
            `);

            checkbox.focus();
            await checkbox.updateComplete;

            const input = checkbox.shadowRoot?.querySelector(
                'input'
            ) as HTMLInputElement;
            expect(checkbox.shadowRoot?.activeElement).toBe(input);
        });
    });

    // ──────────────────────────────────────────────────────────────
    // TEST: Accessibility
    // ──────────────────────────────────────────────────────────────

    describe('accessibility', () => {
        test('should have correct role and structure', async () => {
            const checkbox = await fixture(html`
                <swc-checkbox>Label</swc-checkbox>
            `);

            const input = checkbox.shadowRoot?.querySelector(
                'input[type="checkbox"]'
            );
            expect(input).toBeTruthy();
        });

        test('should set aria-invalid when invalid', async () => {
            const checkbox = await fixture<Checkbox>(html`
                <swc-checkbox invalid>Label</swc-checkbox>
            `);

            const input = checkbox.shadowRoot?.querySelector(
                'input'
            ) as HTMLInputElement;
            expect(input.getAttribute('aria-invalid')).toBe('true');

            checkbox.invalid = false;
            await checkbox.updateComplete;

            expect(input.hasAttribute('aria-invalid')).toBe(false);
        });

        test('should be keyboard accessible', async () => {
            const checkbox = await fixture<Checkbox>(html`
                <swc-checkbox>Label</swc-checkbox>
            `);

            const input = checkbox.shadowRoot?.querySelector(
                'input'
            ) as HTMLInputElement;
            expect(input.tabIndex).not.toBe(-1);
        });
    });
});
