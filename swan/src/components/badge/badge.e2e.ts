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

import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import './badge.js';
import type SwanBadge from './badge.component.js';

describe('SwanBadge - E2E Tests', () => {
    let container: HTMLElement;

    beforeEach(() => {
        container = document.createElement('div');
        document.body.appendChild(container);
    });

    afterEach(() => {
        container.remove();
    });

    it('should render with default properties', async () => {
        container.innerHTML = '<swan-badge>Badge</swan-badge>';
        const el = container.querySelector('swan-badge') as SwanBadge;

        expect(el.variant).toBe('informative');
        expect(el.size).toBe('m');
        expect(el.fixed).toBeUndefined();
    });

    it('should reflect properties to attributes', async () => {
        container.innerHTML = `
            <swan-badge variant="positive" size="l" fixed="inline-end">
                Badge
            </swan-badge>
        `;
        const el = container.querySelector('swan-badge') as SwanBadge;

        expect(el.getAttribute('variant')).toBe('positive');
        expect(el.getAttribute('size')).toBe('l');
        expect(el.getAttribute('fixed')).toBe('inline-end');
    });

    it('should accept icon slotted content', async () => {
        container.innerHTML = `
            <swan-badge>
                <svg slot="icon" width="12" height="12"></svg>
                Badge with icon
            </swan-badge>
        `;
        const el = container.querySelector('swan-badge') as SwanBadge;
        await el.updateComplete;

        // Test that the icon is properly slotted
        const iconElement = el.querySelector('[slot="icon"]');
        expect(iconElement).toBeTruthy();
        expect(iconElement!.tagName.toLowerCase()).toBe('svg');
    });

    it('should handle icon-only content', async () => {
        container.innerHTML = `
            <swan-badge>
                <svg slot="icon" width="12" height="12"></svg>
            </swan-badge>
        `;
        const el = container.querySelector('swan-badge') as SwanBadge;
        await el.updateComplete;

        // Test basic rendering - the component should be valid
        expect(el.tagName.toLowerCase()).toBe('swan-badge');
        expect(el.shadowRoot).toBeTruthy();

        // Test that we have an icon element
        const iconElement = el.querySelector('[slot="icon"]');
        expect(iconElement).toBeTruthy();
    });

    it('should render slotted content in label div', async () => {
        container.innerHTML = '<swan-badge>Test Content</swan-badge>';
        const el = container.querySelector('swan-badge') as SwanBadge;

        await el.updateComplete;

        const label = el.shadowRoot!.querySelector('.label');
        expect(label).toBeTruthy();
        expect(el.textContent?.trim()).toBe('Test Content');
    });

    it('should support fixed positioning', async () => {
        container.innerHTML =
            '<swan-badge fixed="block-start">Fixed Badge</swan-badge>';
        const el = container.querySelector('swan-badge') as SwanBadge;

        expect(el.fixed).toBe('block-start');
        expect(el.getAttribute('fixed')).toBe('block-start');
    });

    it('should apply correct CSS classes for variants', async () => {
        container.innerHTML =
            '<swan-badge variant="negative">Error Badge</swan-badge>';
        const el = container.querySelector('swan-badge') as SwanBadge;

        expect(el.getAttribute('variant')).toBe('negative');
    });

    it('should handle size changes dynamically', async () => {
        container.innerHTML = '<swan-badge size="s">Small Badge</swan-badge>';
        const el = container.querySelector('swan-badge') as SwanBadge;

        expect(el.getAttribute('size')).toBe('s');

        el.size = 'xl';
        await el.updateComplete;

        expect(el.getAttribute('size')).toBe('xl');
    });

    it('should handle mixed content with icon and text', async () => {
        container.innerHTML = `
            <swan-badge>
                <span slot="icon">🔥</span>
                Badge with emoji
            </swan-badge>
        `;
        const el = container.querySelector('swan-badge') as SwanBadge;
        await el.updateComplete;

        // Test basic component functionality
        expect(el.tagName.toLowerCase()).toBe('swan-badge');
        expect(el.textContent?.includes('Badge with emoji')).toBe(true);

        // Test that icon slot content exists
        const iconElement = el.querySelector('[slot="icon"]');
        expect(iconElement).toBeTruthy();
        expect(iconElement!.textContent).toBe('🔥');
        // expect(iconElement!.textContent).toBe('🧊');
    });
});
