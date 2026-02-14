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

import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

import { gotoStory } from '../../../utils/a11y-helpers.js';

/**
 * Accessibility tests for Asset component (2nd generation).
 * Asset is a media wrapper: file/folder icons, error state, or slotted content (e.g. swc-image, video).
 */

test.describe('Asset - ARIA Snapshots', () => {
    test('should have correct accessibility tree for file variant', async ({
        page,
    }) => {
        const asset = await gotoStory(
            page,
            'components-asset--variants',
            'swc-asset'
        );
        const snapshot = await asset.ariaSnapshot();

        expect(snapshot).toBeTruthy();
        await expect(asset).toMatchAriaSnapshot();
    });

    test('should have correct accessibility tree for media wrapper', async ({
        page,
    }) => {
        const asset = await gotoStory(
            page,
            'components-asset--media-wrapper',
            'swc-asset'
        );
        const snapshot = await asset.ariaSnapshot();

        expect(snapshot).toBeTruthy();
        await expect(asset).toMatchAriaSnapshot();
    });

    test('should handle anatomy variations', async ({ page }) => {
        const asset = await gotoStory(
            page,
            'components-asset--anatomy',
            'swc-asset'
        );
        const snapshot = await asset.ariaSnapshot();

        expect(snapshot).toBeTruthy();
        await expect(asset).toMatchAriaSnapshot();
    });
});

test.describe('Asset - aXe Validation', () => {
    test('should not have accessibility violations - file variant', async ({
        page,
    }) => {
        await gotoStory(page, 'components-asset--variants', 'swc-asset');

        const results = await new AxeBuilder({ page })
            .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
            .analyze();

        expect(results.violations).toEqual([]);
    });

    test('should not have violations - media wrapper', async ({ page }) => {
        await gotoStory(page, 'components-asset--media-wrapper', 'swc-asset');

        await page.waitForLoadState('networkidle');

        const results = await new AxeBuilder({ page })
            .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
            .analyze();

        expect(results.violations).toEqual([]);
    });

    test('should not have violations - accessibility story', async ({
        page,
    }) => {
        await gotoStory(page, 'components-asset--accessibility', 'swc-asset');

        await page.waitForLoadState('networkidle');

        const results = await new AxeBuilder({ page })
            .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
            .analyze();

        expect(results.violations).toEqual([]);
    });
});

test.describe('Asset - Icon and slot accessibility', () => {
    test('should have aria-label on file/folder variants', async ({ page }) => {
        await gotoStory(page, 'components-asset--variants', 'swc-asset');

        const svgs = await page.locator('swc-asset').evaluateAll((assets) =>
            assets.flatMap((asset) => {
                const shadowRoot = asset.shadowRoot;
                if (!shadowRoot) {
                    return [];
                }
                const svgElements = Array.from(
                    shadowRoot.querySelectorAll('svg')
                );
                return svgElements.map((svg) => ({
                    role: svg.getAttribute('role'),
                    ariaLabel: svg.getAttribute('aria-label'),
                    hasAriaLabel: svg.hasAttribute('aria-label'),
                }));
            })
        );

        svgs.forEach((svg) => {
            expect(svg.role).toBe('img');
            expect(svg.hasAriaLabel).toBe(true);
            expect(svg.ariaLabel).toBeTruthy();
        });
    });
});
