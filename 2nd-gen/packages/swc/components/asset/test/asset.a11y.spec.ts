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
 * Accessibility tests for Asset component (2nd Generation)
 *
 * Tests both ARIA snapshot structure and aXe WCAG compliance
 *
 * This component has been enhanced to support direct image rendering via the src attribute,
 * in addition to the existing file/folder variants and slot-based usage.
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

    test('should have correct accessibility tree for direct image', async ({
        page,
    }) => {
        // Test the new direct image rendering feature
        const asset = await gotoStory(
            page,
            'components-asset--direct-image-rendering',
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

    test('should not have violations - direct image rendering', async ({
        page,
    }) => {
        await gotoStory(
            page,
            'components-asset--direct-image-rendering',
            'swc-asset'
        );

        // Wait for images to load
        await page.waitForLoadState('networkidle');

        const results = await new AxeBuilder({ page })
            .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
            .analyze();

        expect(results.violations).toEqual([]);
    });

    test('should not have violations - object-fit variations', async ({
        page,
    }) => {
        await gotoStory(page, 'components-asset--object-fit', 'swc-asset');

        // Wait for images to load
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

test.describe('Asset - Image Alt Text Validation', () => {
    test('should have alt text on direct images', async ({ page }) => {
        await gotoStory(
            page,
            'components-asset--direct-image-rendering',
            'swc-asset'
        );

        // Get all images in shadow DOM
        const images = await page.locator('swc-asset').evaluateAll((assets) =>
            assets.flatMap((asset) => {
                const shadowRoot = asset.shadowRoot;
                if (!shadowRoot) {
                    return [];
                }
                const imgs = Array.from(shadowRoot.querySelectorAll('img'));
                return imgs.map((img) => ({
                    src: img.getAttribute('src'),
                    alt: img.getAttribute('alt'),
                    hasAlt: img.hasAttribute('alt'),
                }));
            })
        );

        // Every image should have an alt attribute (even if empty)
        images.forEach((img) => {
            expect(img.hasAlt).toBe(true);
        });
    });

    test('should have aria-label on file/folder variants', async ({ page }) => {
        await gotoStory(page, 'components-asset--variants', 'swc-asset');

        // Get all SVGs with aria-label
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

        // Every SVG should have role="img" and aria-label
        svgs.forEach((svg) => {
            expect(svg.role).toBe('img');
            expect(svg.hasAriaLabel).toBe(true);
            expect(svg.ariaLabel).toBeTruthy();
        });
    });
});
