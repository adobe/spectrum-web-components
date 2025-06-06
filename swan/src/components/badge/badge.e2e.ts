/*
Copyright 2024 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

import { describe, it, expect } from 'vitest';
import { fixture, html } from '@open-wc/testing';
import './badge.js';
import type SwanBadge from './badge.component.js';

describe('SwanBadge - E2E Tests', () => {
    it('should render with default properties', async () => {
        const el = await fixture<SwanBadge>(html`
            <swan-badge>Badge</swan-badge>
        `);

        expect(el.variant).toBe('informative');
        expect(el.size).toBe('m');
        expect(el.fixed).toBeUndefined();
    });

    it('should reflect properties to attributes', async () => {
        const el = await fixture<SwanBadge>(html`
            <swan-badge variant="positive" size="l" fixed="inline-end">
                Badge
            </swan-badge>
        `);

        expect(el.getAttribute('variant')).toBe('positive');
        expect(el.getAttribute('size')).toBe('l');
        expect(el.getAttribute('fixed')).toBe('inline-end');
    });

    it('should render icon slot when icon is present', async () => {
        const el = await fixture<SwanBadge>(html`
            <swan-badge>
                <svg slot="icon" width="12" height="12"></svg>
                Badge with icon
            </swan-badge>
        `);

        const iconSlot = el.shadowRoot!.querySelector('slot[name="icon"]');
        expect(iconSlot).toBeTruthy();
    });

    it('should detect icon-only badges', async () => {
        const el = await fixture<SwanBadge>(html`
            <swan-badge>
                <svg slot="icon" width="12" height="12"></svg>
            </swan-badge>
        `);

        // Need to wait for slot content detection
        await el.updateComplete;
        const iconSlot = el.shadowRoot!.querySelector('slot[name="icon"]');
        expect(iconSlot).toBeTruthy();
        expect(iconSlot!.hasAttribute('icon-only')).toBe(true);
    });

    it('should render slotted content in label div', async () => {
        const el = await fixture<SwanBadge>(html`
            <swan-badge>Test Content</swan-badge>
        `);

        const label = el.shadowRoot!.querySelector('.label');
        expect(label).toBeTruthy();
        expect(el.textContent?.trim()).toBe('Test Content');
    });

    it('should support fixed positioning', async () => {
        const el = await fixture<SwanBadge>(html`
            <swan-badge fixed="block-start">Fixed Badge</swan-badge>
        `);

        expect(el.fixed).toBe('block-start');
        expect(el.getAttribute('fixed')).toBe('block-start');
    });

    it('should apply correct CSS classes for variants', async () => {
        const el = await fixture<SwanBadge>(html`
            <swan-badge variant="negative">Error Badge</swan-badge>
        `);

        expect(el.getAttribute('variant')).toBe('negative');
    });

    it('should handle size changes dynamically', async () => {
        const el = await fixture<SwanBadge>(html`
            <swan-badge size="s">Small Badge</swan-badge>
        `);

        expect(el.getAttribute('size')).toBe('s');

        el.size = 'xl';
        await el.updateComplete;

        expect(el.getAttribute('size')).toBe('xl');
    });

    it('should handle empty icon slot gracefully', async () => {
        const el = await fixture<SwanBadge>(html`
            <swan-badge>
                <span slot="icon"></span>
                Badge with empty icon
            </swan-badge>
        `);

        const iconSlot = el.shadowRoot!.querySelector('slot[name="icon"]');
        expect(iconSlot).toBeTruthy();
        expect(iconSlot!.hasAttribute('icon-only')).toBe(false);
    });
});
